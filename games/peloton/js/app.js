const PelotonGame = {
    config: {
        minPlayers: 2,
        maxPlayers: 4,
        baseAngularSpeed: 0.55,
        spacingDegrees: 18,
        draftToleranceDegrees: 6,
        snapStrength: 4.5,
        steeringRate: 1.4,
        pedalImpulseStrength: 1.1,
        pedalImpulseDecay: 2.6,
        pedalLeanStrength: 0.6,
        pedalLeanDecay: 1.2,
        maxLean: 2,
        energyGainPerSecond: 9,
        energyLossPerSecond: 18,
        syncWindowMs: 420,
        syncEnergyBonus: 8,
        syncBoostDuration: 1.8,
        colors: ['#7dd3fc', '#fca5a5', '#6ee7b7', '#fde68a'],
        roles: ['Pace Lead', 'Shadow', 'Anchor', 'Shield'],
        controlBindings: [
            { leftPedal: 'a', rightPedal: 'd' },
            { leftPedal: 'j', rightPedal: 'l' },
            { leftPedal: 'f', rightPedal: 'h' },
            { leftPedal: 'ArrowLeft', rightPedal: 'ArrowRight' }
        ]
    },

    state: {
        playerCount: 4,
        players: [],
        currentScreen: 'welcome',
        isRunning: false,
        lastFrame: 0,
        syncBoostTimer: 0,
        canvas: null,
        ctx: null,
        rafId: null,
        playerCards: [],
        controlButtons: [],
        keyMap: {},
        message: 'Find your line…'
    },

    init() {
        this.config.spacingRad = this.degToRad(this.config.spacingDegrees);
        this.config.draftToleranceRad = this.degToRad(this.config.draftToleranceDegrees);
        this.cacheElements();
        this.attachEvents();
        this.buildKeyMap();
        this.renderRiderCount();
        this.resizeCanvas();
    },

    cacheElements() {
        this.elements = {
            screens: {
                welcome: document.getElementById('screen-welcome'),
                game: document.getElementById('screen-game')
            },
            riderCountDisplay: document.getElementById('rider-count-display'),
            teamEnergyFill: document.getElementById('team-energy-fill'),
            paceReadout: document.getElementById('pace-readout'),
            harmonyMessage: document.getElementById('harmony-message'),
            playerPanels: document.getElementById('player-panels'),
            touchControls: document.getElementById('pedal-strip'),
            toast: document.getElementById('toast')
        };

        this.state.canvas = document.getElementById('track-canvas');
        this.state.ctx = this.state.canvas ? this.state.canvas.getContext('2d') : null;
    },

    attachEvents() {
        window.addEventListener('resize', () => this.resizeCanvas());
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
    },

    buildKeyMap() {
        this.state.keyMap = {};
        this.config.controlBindings.forEach((binding, index) => {
            Object.entries(binding).forEach(([action, key]) => {
                if (!key || typeof key !== 'string') return;
                this.state.keyMap[key.toLowerCase()] = { player: index, action };
            });
        });
    },

    renderRiderCount() {
        if (!this.elements?.riderCountDisplay) return;
        this.elements.riderCountDisplay.textContent = `${this.state.playerCount} rider${this.state.playerCount === 1 ? '' : 's'}`;
    },

    adjustPlayerCount(delta) {
        const next = this.clamp(
            this.state.playerCount + delta,
            this.config.minPlayers,
            this.config.maxPlayers
        );
        this.state.playerCount = next;
        this.renderRiderCount();
    },

    startGame() {
        this.showScreen('game');
        this.setupRace();
    },

    setupRace() {
        this.stopLoop();
        this.createPlayers();
        this.renderPlayerPanels();
        this.renderTouchControls();

        this.state.isRunning = true;
        this.state.lastFrame = performance.now();
        this.state.syncBoostTimer = 0;
        this.state.message = 'Hold the line…';

        this.loop(this.state.lastFrame);
    },

    resetRace() {
        if (!this.state.isRunning) {
            this.startGame();
            return;
        }
        this.setupRace();
    },

    showScreen(name) {
        Object.values(this.elements.screens).forEach(screen => screen?.classList.remove('active'));
        const screen = this.elements.screens[name];
        if (screen) {
            screen.classList.add('active');
            this.state.currentScreen = name;
            window.scrollTo({ top: 0 });
            document.body.classList.toggle('peloton-immersive', name === 'game');
        }
    },

    showWelcome() {
        this.state.isRunning = false;
        this.stopLoop();
        this.showScreen('welcome');
    },

    createPlayers() {
        this.state.players = [];
        const { colors, roles } = this.config;
        const leaderAngle = 0;

        for (let i = 0; i < this.state.playerCount; i++) {
            const color = colors[i % colors.length];
            const role = roles[i] || 'Crew';
            const angle = this.normalizeAngle(leaderAngle - this.config.spacingRad * i);
            this.state.players.push({
                id: i,
                label: `Rider ${i + 1}`,
                role,
                color,
                angle,
                targetAngle: angle,
                steerBias: 0,
                pedalImpulse: 0,
                lastPedal: 0,
                energy: 75,
                drafting: true,
                lineError: 0
            });
        }
    },

    renderPlayerPanels() {
        if (!this.elements.playerPanels) return;
        this.elements.playerPanels.innerHTML = '';
        this.state.playerCards = [];

        this.state.players.forEach((player) => {
            const card = document.createElement('div');
            card.className = 'player-card';
            card.innerHTML = `
                <div class="card-header">
                    <span class="indicator" style="color:${player.color}"></span>
                    <div>
                        <h4>${player.label}</h4>
                        <div class="card-role">${player.role}</div>
                    </div>
                    <span class="card-energy">${player.energy.toFixed(0)}%</span>
                </div>
                <div class="energy-bar">
                    <span class="energy-fill"></span>
                </div>
                <div class="card-status">
                    <span class="status-text">Drafting</span>
                    <span class="energy-value">75%</span>
                </div>
            `;
            this.elements.playerPanels.appendChild(card);

            this.state.playerCards.push({
                fill: card.querySelector('.energy-fill'),
                status: card.querySelector('.status-text'),
                value: card.querySelector('.energy-value'),
                headerValue: card.querySelector('.card-energy')
            });
        });
    },

    renderTouchControls() {
        const container = this.elements.touchControls;
        if (!container) return;
        container.innerHTML = '';
        this.state.controlButtons = [];

        const iconMarkup = (side) => {
            if (side === 'left') {
                return `
                    <svg viewBox="0 0 48 48" class="pedal-svg" aria-hidden="true" focusable="false">
                        <circle cx="30" cy="24" r="12"></circle>
                        <rect x="6" y="21" width="18" height="6" rx="3"></rect>
                        <circle cx="10" cy="24" r="3"></circle>
                    </svg>
                `;
            }
            return `
                <svg viewBox="0 0 48 48" class="pedal-svg" aria-hidden="true" focusable="false">
                    <circle cx="18" cy="24" r="12"></circle>
                    <rect x="24" y="21" width="18" height="6" rx="3"></rect>
                    <circle cx="38" cy="24" r="3"></circle>
                </svg>
            `;
        };

        this.state.players.forEach((player, index) => {
            const pod = document.createElement('div');
            pod.className = 'pedal-pod';
            pod.style.setProperty('--pod-color', player.color || '#7dd3fc');

            const label = document.createElement('span');
            label.className = 'pedal-label';
            label.textContent = `P${index + 1}`;

            const pair = document.createElement('div');
            pair.className = 'pedal-icon-pair';

            const makeButton = (side) => {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'pedal-icon';
                btn.innerHTML = iconMarkup(side);
                btn.setAttribute('aria-label', `${side === 'left' ? 'Left' : 'Right'} pedal for ${player.label}`);
                btn.addEventListener('mousedown', () => this.handlePedal(index, side));
                btn.addEventListener('touchstart', (e) => {
                    e.preventDefault();
                    this.handlePedal(index, side);
                }, { passive: false });
                return btn;
            };

            const leftBtn = makeButton('left');
            const rightBtn = makeButton('right');

            pair.appendChild(leftBtn);
            pair.appendChild(rightBtn);

            pod.appendChild(label);
            pod.appendChild(pair);
            container.appendChild(pod);
            this.state.controlButtons.push({ left: leftBtn, right: rightBtn });
        });
    },

    handlePedal(playerIndex, pedalSide = 'right') {
        const player = this.state.players[playerIndex];
        if (!player) return;
        const now = performance.now();
        player.lastPedal = now;
        player.pedalImpulse = Math.min(player.pedalImpulse + this.config.pedalImpulseStrength, 2.5);
        const leanDir = pedalSide === 'left' ? -1 : 1; // left pedal pushes the bike right (clockwise)
        player.steerBias = this.clamp(
            player.steerBias + leanDir * this.config.pedalLeanStrength,
            -this.config.maxLean,
            this.config.maxLean
        );
        this.flashControlButton(playerIndex, pedalSide === 'left' ? 'left' : 'right');
        this.checkSync();
    },

    flashControlButton(playerIndex, action) {
        const btn = this.state.controlButtons[playerIndex]?.[action];
        if (!btn) return;
        btn.classList.add('active');
        setTimeout(() => btn.classList.remove('active'), 160);
    },

    handleKeyDown(event) {
        const binding = this.state.keyMap[event.key.toLowerCase()];
        if (!binding) return;
        event.preventDefault();
        if (binding.player >= this.state.playerCount) return;
        const action = binding.action;
        if (!action) return;
        if (action === 'pedal') {
            this.handlePedal(binding.player, 'right');
            return;
        }
        if (action === 'leftPedal' || action === 'left') {
            this.handlePedal(binding.player, 'left');
            return;
        }
        if (action === 'rightPedal' || action === 'right') {
            this.handlePedal(binding.player, 'right');
        }
    },

    handleKeyUp(event) {
        const binding = this.state.keyMap[event.key.toLowerCase()];
        if (!binding) return;
        if (binding.player >= this.state.playerCount) return;
        if (binding.action === 'pedal') return;
    },

    loop(timestamp) {
        if (!this.state.isRunning) return;
        const dt = Math.min((timestamp - this.state.lastFrame) / 1000 || 0, 0.05);
        this.state.lastFrame = timestamp;

        this.update(dt);
        this.render();

        this.state.rafId = requestAnimationFrame((nextTs) => this.loop(nextTs));
    },

    stopLoop() {
        if (this.state.rafId) {
            cancelAnimationFrame(this.state.rafId);
            this.state.rafId = null;
        }
    },

    update(dt) {
        const players = this.state.players;
        if (!players.length) return;

        const exhaustion = players.some((p) => p.energy <= 0.5);
        let avgEnergy = players.reduce((sum, p) => sum + p.energy, 0) / players.length;

        // Update leader angle and followers
        const leader = players[0];
        const baseSpeed = this.config.baseAngularSpeed * (0.6 + avgEnergy / 200);
        const syncBoost = this.state.syncBoostTimer > 0 ? 0.35 : 0;
        if (this.state.syncBoostTimer > 0) {
            this.state.syncBoostTimer = Math.max(0, this.state.syncBoostTimer - dt);
        }

        let teamSpeed = baseSpeed + syncBoost;
        if (exhaustion) {
            teamSpeed *= 0.4;
        }

        const leaderLean = leader.steerBias;
        leader.steerBias = this.decayTowardsZero(leader.steerBias, this.config.pedalLeanDecay * dt);
        leader.angle = this.normalizeAngle(
            leader.angle + (teamSpeed + leaderLean * this.config.steeringRate * 0.2 + leader.pedalImpulse * 0.15) * dt
        );
        leader.pedalImpulse = Math.max(0, leader.pedalImpulse - this.config.pedalImpulseDecay * dt);

        for (let i = 1; i < players.length; i++) {
            const player = players[i];
            const targetAngle = this.normalizeAngle(leader.angle - this.config.spacingRad * i);
            player.targetAngle = targetAngle;
            const error = this.smallestAngleDiff(targetAngle, player.angle);
            const lean = player.steerBias;
            player.steerBias = this.decayTowardsZero(player.steerBias, this.config.pedalLeanDecay * dt);
            const manual = lean * this.config.steeringRate + player.pedalImpulse * 0.2;
            player.angle = this.normalizeAngle(player.angle + (error * this.config.snapStrength + manual) * dt);
            player.pedalImpulse = Math.max(0, player.pedalImpulse - this.config.pedalImpulseDecay * dt);
        }

        // Energy + drafting state
        let draftingCount = 0;
        players.forEach((player, index) => {
            const targetAngle = index === 0
                ? leader.angle
                : this.normalizeAngle(leader.angle - this.config.spacingRad * index);
            const error = this.smallestAngleDiff(targetAngle, player.angle);
            player.lineError = error;
            player.drafting = Math.abs(error) < this.config.draftToleranceRad;
            if (player.drafting) {
                player.energy = this.clamp(player.energy + this.config.energyGainPerSecond * dt, 0, 100);
                draftingCount++;
            } else {
                player.energy = this.clamp(player.energy - this.config.energyLossPerSecond * dt, 0, 100);
            }
        });

        avgEnergy = players.reduce((sum, p) => sum + p.energy, 0) / players.length;
        this.state.message = exhaustion
            ? 'Recover the exhausted rider before the team stalls!'
            : draftingCount === players.length
                ? 'Full draft! Bank those watts.'
                : 'Close the gap and tuck in!';

        this.updateHUD(avgEnergy, teamSpeed, draftingCount === players.length);
    },

    updateHUD(avgEnergy, teamSpeed, fullDraft) {
        if (this.elements.teamEnergyFill) {
            this.elements.teamEnergyFill.style.width = `${avgEnergy.toFixed(1)}%`;
        }
        if (this.elements.paceReadout) {
            const pace = (teamSpeed * 40).toFixed(1);
            this.elements.paceReadout.textContent = `Pace: ${pace} m/s`;
        }
        if (this.elements.harmonyMessage) {
            this.elements.harmonyMessage.textContent = this.state.message;
            this.elements.harmonyMessage.style.color = fullDraft ? '#34d399' : '#7dd3fc';
        }

        this.state.players.forEach((player, index) => {
            const refs = this.state.playerCards[index];
            if (!refs) return;
            if (refs.fill) {
                refs.fill.style.width = `${player.energy}%`;
                refs.fill.style.background = player.drafting ? player.color : '#f87171';
            }
            if (refs.status) {
                refs.status.textContent = player.energy <= 0
                    ? 'Exhausted'
                    : player.drafting
                        ? 'Drafting'
                        : 'Wind Burn';
            }
            if (refs.value) {
                refs.value.textContent = `${player.energy.toFixed(0)}%`;
            }
            if (refs.headerValue) {
                refs.headerValue.textContent = `${player.energy.toFixed(0)}%`;
            }
        });
    },

    render() {
        const ctx = this.state.ctx;
        const canvas = this.state.canvas;
        if (!ctx || !canvas) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const center = { x: canvas.width / 2, y: canvas.height / 2 };
        const radius = Math.min(canvas.width, canvas.height) / 2 - 40;

        // Track base
        ctx.save();
        ctx.translate(center.x, center.y);
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.35)';
        ctx.lineWidth = 18;
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.stroke();

        ctx.lineWidth = 2;
        ctx.setLineDash([8, 12]);
        ctx.strokeStyle = 'rgba(94, 234, 212, 0.35)';
        ctx.beginPath();
        ctx.arc(0, 0, radius - 30, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);

        // Render riders
        this.state.players.forEach((player, index) => {
            const angle = player.angle;
            const x = Math.cos(angle) * (radius - 6);
            const y = Math.sin(angle) * (radius - 6);
            const drafting = player.drafting;

            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle + Math.PI / 2);

            ctx.fillStyle = drafting ? 'rgba(14, 165, 233, 0.08)' : 'rgba(248, 113, 113, 0.15)';
            ctx.beginPath();
            ctx.ellipse(0, 0, 26, 18, 0, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = player.color;
            ctx.shadowColor = player.color;
            ctx.shadowBlur = 12;
            ctx.fillRect(-12, -18, 24, 36);
            ctx.shadowBlur = 0;

            ctx.fillStyle = '#0f172a';
            ctx.beginPath();
            ctx.arc(0, -10, 4, 0, Math.PI * 2);
            ctx.arc(0, 10, 4, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#fff';
            ctx.font = 'bold 12px "Space Grotesk", sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(`P${index + 1}`, 0, 4);

            ctx.restore();
        });

        ctx.restore();
    },

    checkSync() {
        const now = performance.now();
        const allSynced = this.state.players.every(
            (player) => now - player.lastPedal < this.config.syncWindowMs
        );
        if (allSynced) {
            this.registerSync();
        }
    },

    registerSync() {
        this.state.syncBoostTimer = this.config.syncBoostDuration;
        this.state.players.forEach((player) => {
            player.energy = this.clamp(player.energy + this.config.syncEnergyBonus, 0, 100);
        });
        this.showToast('Perfect cadence!');
    },

    showToast(message) {
        if (!this.elements.toast) return;
        this.elements.toast.textContent = message;
        this.elements.toast.classList.add('visible');
        clearTimeout(this.toastTimeout);
        this.toastTimeout = setTimeout(() => {
            this.elements.toast.classList.remove('visible');
        }, 1800);
    },

    resizeCanvas() {
        const canvas = this.state.canvas;
        if (!canvas) return;
        const wrapper = canvas.parentElement;
        if (!wrapper) return;
        const rect = wrapper.getBoundingClientRect();
        const size = Math.max(320, Math.min(rect.width, rect.height));
        canvas.width = size;
        canvas.height = size;
    },

    decayTowardsZero(value, amount) {
        if (value > 0) {
            return Math.max(0, value - amount);
        }
        if (value < 0) {
            return Math.min(0, value + amount);
        }
        return 0;
    },

    degToRad(value) {
        return (value * Math.PI) / 180;
    },

    normalizeAngle(angle) {
        let a = angle % (Math.PI * 2);
        if (a < 0) a += Math.PI * 2;
        return a;
    },

    smallestAngleDiff(target, current) {
        let diff = target - current;
        while (diff < -Math.PI) diff += Math.PI * 2;
        while (diff > Math.PI) diff -= Math.PI * 2;
        return diff;
    },

    clamp(value, min, max) {
        return Math.min(max, Math.max(min, value));
    }
};

window.PelotonGame = PelotonGame;
document.addEventListener('DOMContentLoaded', () => PelotonGame.init());
window.addEventListener('beforeunload', (event) => {
    if (PelotonGame.state.isRunning) {
        event.preventDefault();
        event.returnValue = '';
    }
});
