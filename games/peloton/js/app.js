/**
 * Peloton Pulse - Team Cycling Game
 * Main Game Logic
 */

const Game = {
    // Game configuration
    config: {
        // Energy
        maxEnergy: 100,
        pedalEnergyCost: 5,
        baseEnergyRegen: 0.08, // per frame - very slow
        draftingEnergyRegen: 0.5, // per frame when drafting - much faster

        // Speed
        baseSpeed: 0.003, // radians per frame
        maxSpeed: 0.012,
        pedalBoost: 0.002, // speed added per pedal
        speedDecay: 0.97, // multiplier per frame
        draftingSpeedDecay: 0.99, // slower decay when drafting

        // Steering (rowing effect)
        lateralPush: 0.015, // how much pedals push sideways
        lateralDecay: 0.92, // lateral velocity decay
        maxLateralOffset: 0.3, // max lane offset (0 = center, ±0.3 = edges)

        // Drafting
        draftingDistance: 0.18, // must be within this angle behind (about 10 degrees)
        draftingLaneThreshold: 0.12, // must be in similar lane

        // Track
        trackOuterRadius: 0.42, // relative to canvas
        trackInnerRadius: 0.28,
        trackLanes: 3,

        // Visuals
        bikeRadius: 12,
        colors: {
            players: ['#ef4444', '#3b82f6', '#10b981', '#f59e0b'],
            track: '#374151',
            trackLines: '#4b5563',
            grass: '#166534'
        }
    },

    // Game state
    state: {
        currentScreen: 'welcome',
        playerCount: 2,
        raceLaps: 5,
        activeSides: ['bottom', 'top'],
        players: [],
        isPaused: false,
        isRunning: false,
        startTime: 0,
        currentLap: 1,
        finishedLaps: 0
    },

    // Canvas
    canvas: null,
    ctx: null,
    animationId: null,

    // DOM Elements
    elements: {},

    /**
     * Initialize the game
     */
    init() {
        this.cacheElements();
        this.setupEventListeners();
        this.showScreen('welcome');
    },

    /**
     * Cache DOM elements
     */
    cacheElements() {
        this.elements = {
            screens: {
                welcome: document.getElementById('screen-welcome'),
                setup: document.getElementById('screen-setup'),
                game: document.getElementById('screen-game'),
                gameover: document.getElementById('screen-gameover')
            },
            playerCountBtns: document.querySelectorAll('.player-count-options .btn-option'),
            raceLengthBtns: document.querySelectorAll('.race-length-options .btn-option'),
            positionSlots: document.querySelectorAll('.position-slot'),
            lapCounter: document.getElementById('lap-counter'),
            energyBars: document.getElementById('energy-bars'),
            pauseOverlay: document.getElementById('pause-overlay'),
            pauseIcon: document.getElementById('pause-icon'),
            touchZones: document.getElementById('touch-zones'),
            // Game over
            gameoverIcon: document.getElementById('gameover-icon'),
            gameoverTitle: document.getElementById('gameover-title'),
            gameoverSubtitle: document.getElementById('gameover-subtitle'),
            statLaps: document.getElementById('stat-laps'),
            statTime: document.getElementById('stat-time'),
            riderStats: document.getElementById('rider-stats')
        };

        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    },

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Keyboard controls
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
        document.addEventListener('keyup', (e) => this.handleKeyUp(e));

        // Window resize
        window.addEventListener('resize', () => {
            if (this.state.isRunning) {
                this.resizeCanvas();
            }
        });
    },

    /**
     * Show a specific screen
     */
    showScreen(screenName) {
        Object.values(this.elements.screens).forEach(screen => {
            screen.classList.remove('active');
        });

        const screen = this.elements.screens[screenName];
        if (screen) {
            screen.classList.add('active');
            this.state.currentScreen = screenName;

            window.scrollTo(0, 0);
            screen.scrollTop = 0;
        }
    },

    /**
     * Show welcome screen
     */
    showWelcome() {
        this.showScreen('welcome');
    },

    /**
     * Show setup screen
     */
    showSetup() {
        this.updatePositionUI();
        this.showScreen('setup');
    },

    /**
     * Set player count
     */
    setPlayerCount(count) {
        this.state.playerCount = count;

        // Update UI
        this.elements.playerCountBtns.forEach(btn => {
            const c = parseInt(btn.dataset.count);
            btn.classList.toggle('active', c === count);
        });

        // Reset sides based on count
        this.autoAssignSides();
        this.updatePositionUI();
    },

    /**
     * Set race length
     */
    setRaceLength(laps) {
        this.state.raceLaps = laps;

        this.elements.raceLengthBtns.forEach(btn => {
            btn.classList.toggle('active', parseInt(btn.dataset.laps) === laps);
        });
    },

    /**
     * Auto-assign sides based on player count
     */
    autoAssignSides() {
        const count = this.state.playerCount;
        if (count === 1) {
            this.state.activeSides = ['bottom'];
        } else if (count === 2) {
            this.state.activeSides = ['bottom', 'top'];
        } else if (count === 3) {
            this.state.activeSides = ['bottom', 'left', 'right'];
        } else {
            this.state.activeSides = ['bottom', 'top', 'left', 'right'];
        }
    },

    /**
     * Toggle a side
     */
    toggleSide(side) {
        const index = this.state.activeSides.indexOf(side);

        if (index > -1) {
            if (this.state.activeSides.length > 1) {
                this.state.activeSides.splice(index, 1);
            }
        } else {
            if (this.state.activeSides.length < this.state.playerCount) {
                this.state.activeSides.push(side);
            } else {
                this.state.activeSides.shift();
                this.state.activeSides.push(side);
            }
        }

        this.updatePositionUI();
    },

    /**
     * Update position selector UI
     */
    updatePositionUI() {
        const playerColors = ['player-1', 'player-2', 'player-3', 'player-4'];

        this.elements.positionSlots.forEach(slot => {
            const side = slot.dataset.side;
            const isActive = this.state.activeSides.includes(side);
            const playerIndex = this.state.activeSides.indexOf(side);

            slot.classList.remove('active', 'inactive', ...playerColors);

            if (isActive) {
                slot.classList.add('active', playerColors[playerIndex]);
                slot.querySelector('.position-player').textContent = `P${playerIndex + 1}`;
                slot.querySelector('.position-label').textContent = side.charAt(0).toUpperCase() + side.slice(1);
            } else {
                slot.classList.add('inactive');
                slot.querySelector('.position-player').textContent = '';
                slot.querySelector('.position-label').textContent = side.charAt(0).toUpperCase() + side.slice(1);
            }
        });
    },

    /**
     * Start the game
     */
    startGame() {
        while (this.state.activeSides.length < this.state.playerCount) {
            const available = ['top', 'right', 'bottom', 'left'].filter(
                s => !this.state.activeSides.includes(s)
            );
            if (available.length > 0) {
                this.state.activeSides.push(available[0]);
            }
        }

        this.showScreen('game');

        setTimeout(() => {
            this.initGame();
        }, 100);
    },

    /**
     * Initialize game state
     */
    initGame() {
        this.resizeCanvas();
        this.createPlayers();
        this.setupTouchZones();
        this.setupEnergyBars();

        this.state.isPaused = false;
        this.state.isRunning = true;
        this.state.startTime = Date.now();
        this.state.currentLap = 1;
        this.state.finishedLaps = 0;

        this.updateHUD();

        this.elements.pauseOverlay.classList.remove('visible');
        this.elements.pauseIcon.textContent = '⏸️';

        this.gameLoop();
    },

    /**
     * Resize canvas to fit screen
     */
    resizeCanvas() {
        const container = document.querySelector('.game-container');
        const size = Math.min(container.clientWidth, container.clientHeight);

        this.canvas.width = size;
        this.canvas.height = size;
    },

    /**
     * Create players
     */
    createPlayers() {
        this.state.players = [];
        const cfg = this.config;

        this.state.activeSides.forEach((side, index) => {
            // Spread players around the track start
            const startAngle = -Math.PI / 2 + (index * 0.1); // Start at top, spread slightly

            const player = {
                side: side,
                index: index,
                color: cfg.colors.players[index],

                // Position on track
                angle: startAngle, // Position around track (radians, -PI/2 = top)
                laneOffset: (index - (this.state.activeSides.length - 1) / 2) * 0.1, // Spread in lanes

                // Velocities
                angularVelocity: cfg.baseSpeed, // How fast moving around track
                lateralVelocity: 0, // Sideways movement

                // Energy
                energy: cfg.maxEnergy,
                isDrafting: false,
                isLeading: false,

                // Pedaling state
                leftPressed: false,
                rightPressed: false,
                lastPedal: null, // 'left' or 'right'
                pedalCount: 0,

                // Stats
                lapsCrossed: 0,
                totalPedals: 0
            };

            this.state.players.push(player);
        });
    },

    /**
     * Setup touch zones with pedal buttons
     */
    setupTouchZones() {
        this.elements.touchZones.innerHTML = '';

        this.state.players.forEach((player, index) => {
            const zone = document.createElement('div');
            zone.className = `touch-zone ${player.side} player-${index + 1}`;
            zone.dataset.playerIndex = index;

            // Create left pedal
            const leftPedal = document.createElement('button');
            leftPedal.className = 'pedal-btn left-pedal';
            leftPedal.textContent = 'L';
            leftPedal.dataset.pedal = 'left';

            // Create right pedal
            const rightPedal = document.createElement('button');
            rightPedal.className = 'pedal-btn right-pedal';
            rightPedal.textContent = 'R';
            rightPedal.dataset.pedal = 'right';

            // Touch events for pedals
            [leftPedal, rightPedal].forEach(pedal => {
                pedal.addEventListener('touchstart', (e) => {
                    e.preventDefault();
                    this.handlePedalDown(index, pedal.dataset.pedal);
                    pedal.classList.add('pressed');
                }, { passive: false });

                pedal.addEventListener('touchend', (e) => {
                    e.preventDefault();
                    this.handlePedalUp(index, pedal.dataset.pedal);
                    pedal.classList.remove('pressed');
                }, { passive: false });

                // Mouse events for desktop testing
                pedal.addEventListener('mousedown', (e) => {
                    e.preventDefault();
                    this.handlePedalDown(index, pedal.dataset.pedal);
                    pedal.classList.add('pressed');
                });

                pedal.addEventListener('mouseup', (e) => {
                    this.handlePedalUp(index, pedal.dataset.pedal);
                    pedal.classList.remove('pressed');
                });

                pedal.addEventListener('mouseleave', () => {
                    pedal.classList.remove('pressed');
                });
            });

            zone.appendChild(leftPedal);
            zone.appendChild(rightPedal);
            this.elements.touchZones.appendChild(zone);
        });
    },

    /**
     * Setup energy bar display
     */
    setupEnergyBars() {
        this.elements.energyBars.innerHTML = '';

        this.state.players.forEach((player, index) => {
            const item = document.createElement('div');
            item.className = `energy-bar-item player-${index + 1}`;
            item.id = `energy-bar-${index}`;
            item.innerHTML = `
                <div class="player-dot"></div>
                <div class="energy-bar-track">
                    <div class="energy-bar-fill" style="width: 100%"></div>
                </div>
                <span class="draft-indicator">💨</span>
            `;
            this.elements.energyBars.appendChild(item);
        });
    },

    /**
     * Handle pedal press
     */
    handlePedalDown(playerIndex, pedal) {
        if (!this.state.isRunning || this.state.isPaused) return;

        const player = this.state.players[playerIndex];
        if (!player) return;

        if (pedal === 'left') {
            player.leftPressed = true;
        } else {
            player.rightPressed = true;
        }

        // Only apply pedal effect once per press
        this.applyPedal(player, pedal);
    },

    /**
     * Handle pedal release
     */
    handlePedalUp(playerIndex, pedal) {
        const player = this.state.players[playerIndex];
        if (!player) return;

        if (pedal === 'left') {
            player.leftPressed = false;
        } else {
            player.rightPressed = false;
        }
    },

    /**
     * Apply pedal effect
     */
    applyPedal(player, pedal) {
        const cfg = this.config;

        // Check energy
        if (player.energy < cfg.pedalEnergyCost) return;

        // Consume energy
        player.energy -= cfg.pedalEnergyCost;

        // Add speed boost (bonus for alternating pedals)
        let boost = cfg.pedalBoost;
        if (player.lastPedal && player.lastPedal !== pedal) {
            boost *= 1.3; // 30% bonus for alternating
        }
        player.angularVelocity = Math.min(cfg.maxSpeed, player.angularVelocity + boost);

        // Apply lateral push (rowing effect - push opposite direction)
        if (pedal === 'left') {
            player.lateralVelocity += cfg.lateralPush; // Push right
        } else {
            player.lateralVelocity -= cfg.lateralPush; // Push left
        }

        player.lastPedal = pedal;
        player.totalPedals++;
    },

    /**
     * Handle keyboard input
     */
    handleKeyDown(e) {
        if (!this.state.isRunning) return;

        // Player 1: A/D, Player 2: J/L, Player 3: Arrow keys, Player 4: Numpad
        const keyMap = {
            'a': { player: 0, pedal: 'left' },
            'd': { player: 0, pedal: 'right' },
            'j': { player: 1, pedal: 'left' },
            'l': { player: 1, pedal: 'right' },
            'ArrowLeft': { player: 2, pedal: 'left' },
            'ArrowRight': { player: 2, pedal: 'right' },
            '4': { player: 3, pedal: 'left' },
            '6': { player: 3, pedal: 'right' },
            'Escape': { action: 'pause' }
        };

        const action = keyMap[e.key];
        if (!action) return;

        if (action.action === 'pause') {
            this.togglePause();
            return;
        }

        const player = this.state.players[action.player];
        if (!player) return;

        if (action.pedal === 'left' && !player.leftPressed) {
            player.leftPressed = true;
            this.applyPedal(player, 'left');
        } else if (action.pedal === 'right' && !player.rightPressed) {
            player.rightPressed = true;
            this.applyPedal(player, 'right');
        }
    },

    handleKeyUp(e) {
        if (!this.state.isRunning) return;

        const keyMap = {
            'a': { player: 0, pedal: 'left' },
            'd': { player: 0, pedal: 'right' },
            'j': { player: 1, pedal: 'left' },
            'l': { player: 1, pedal: 'right' },
            'ArrowLeft': { player: 2, pedal: 'left' },
            'ArrowRight': { player: 2, pedal: 'right' },
            '4': { player: 3, pedal: 'left' },
            '6': { player: 3, pedal: 'right' }
        };

        const action = keyMap[e.key];
        if (!action) return;

        const player = this.state.players[action.player];
        if (!player) return;

        if (action.pedal === 'left') {
            player.leftPressed = false;
        } else {
            player.rightPressed = false;
        }
    },

    /**
     * Toggle pause
     */
    togglePause() {
        if (!this.state.isRunning) return;

        this.state.isPaused = !this.state.isPaused;
        this.elements.pauseOverlay.classList.toggle('visible', this.state.isPaused);
        this.elements.pauseIcon.textContent = this.state.isPaused ? '▶️' : '⏸️';

        if (!this.state.isPaused) {
            this.gameLoop();
        }
    },

    /**
     * Quit game
     */
    quitGame() {
        this.state.isRunning = false;
        this.state.isPaused = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        this.showScreen('welcome');
    },

    /**
     * Main game loop
     */
    gameLoop() {
        if (!this.state.isRunning || this.state.isPaused) return;

        this.update();
        this.render();

        this.animationId = requestAnimationFrame(() => this.gameLoop());
    },

    /**
     * Update game state
     */
    update() {
        this.updatePlayers();
        this.checkDrafting();
        this.updateEnergy();
        this.checkLapCompletion();
        this.updateHUD();
    },

    /**
     * Update player positions
     */
    updatePlayers() {
        const cfg = this.config;

        this.state.players.forEach(player => {
            // Apply speed decay (air resistance)
            const decay = player.isDrafting ? cfg.draftingSpeedDecay : cfg.speedDecay;
            player.angularVelocity = Math.max(cfg.baseSpeed * 0.5, player.angularVelocity * decay);

            // Move around track
            player.angle += player.angularVelocity;

            // Wrap angle
            if (player.angle > Math.PI) {
                player.angle -= Math.PI * 2;
            }

            // Apply lateral movement
            player.laneOffset += player.lateralVelocity;
            player.lateralVelocity *= cfg.lateralDecay;

            // Clamp lane offset
            player.laneOffset = Math.max(-cfg.maxLateralOffset,
                Math.min(cfg.maxLateralOffset, player.laneOffset));
        });
    },

    /**
     * Check drafting status for each player
     */
    checkDrafting() {
        const cfg = this.config;
        const players = this.state.players;

        // Find who is in front
        let leader = players[0];
        players.forEach(p => {
            // Normalize angles for comparison
            const pAngle = ((p.angle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
            const leaderAngle = ((leader.angle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
            if (pAngle > leaderAngle ||
                (p.lapsCrossed > leader.lapsCrossed)) {
                leader = p;
            }
        });

        // Update drafting status
        players.forEach(player => {
            player.isDrafting = false;
            player.isLeading = (player === leader);

            // Check if drafting anyone
            players.forEach(other => {
                if (player === other) return;

                // Calculate angle difference (is player behind other?)
                let angleDiff = other.angle - player.angle;
                // Normalize to [-PI, PI]
                while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
                while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;

                // Check if player is behind other (other is ahead)
                if (angleDiff > 0 && angleDiff < cfg.draftingDistance) {
                    // Check if in similar lane
                    const laneDiff = Math.abs(player.laneOffset - other.laneOffset);
                    if (laneDiff < cfg.draftingLaneThreshold) {
                        player.isDrafting = true;
                    }
                }
            });
        });
    },

    /**
     * Update energy levels
     * Simple logic:
     * - Pedaling costs energy (handled in applyPedal)
     * - Slow regen normally
     * - Fast regen when drafting (close behind another bike)
     */
    updateEnergy() {
        const cfg = this.config;

        this.state.players.forEach((player, index) => {
            // Energy regeneration - simple: slow normally, fast when drafting
            const regen = player.isDrafting ? cfg.draftingEnergyRegen : cfg.baseEnergyRegen;

            player.energy = Math.min(cfg.maxEnergy, player.energy + regen);
            player.energy = Math.max(0, player.energy);

            // Update energy bar UI
            const barItem = document.getElementById(`energy-bar-${index}`);
            if (barItem) {
                const fill = barItem.querySelector('.energy-bar-fill');
                if (fill) {
                    fill.style.width = `${player.energy}%`;
                }
                barItem.classList.toggle('drafting', player.isDrafting);
            }
        });
    },

    /**
     * Check if any player completed a lap
     */
    checkLapCompletion() {
        // Finish line is at angle = -PI/2 (top of track)
        // Track when players cross from just before to just after

        this.state.players.forEach(player => {
            // Check if crossed finish line (going from around -PI/2 through the threshold)
            if (player.prevAngle !== undefined) {
                const finishAngle = -Math.PI / 2;
                const prevNorm = ((player.prevAngle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
                const currNorm = ((player.angle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);

                // Check for crossing the 3PI/2 mark (which is -PI/2 normalized)
                const finishNorm = (3 * Math.PI / 2);

                if (prevNorm < finishNorm && currNorm >= finishNorm) {
                    player.lapsCrossed++;
                }
            }
            player.prevAngle = player.angle;
        });

        // Check if all players have completed required laps
        const minLaps = Math.min(...this.state.players.map(p => p.lapsCrossed));
        this.state.currentLap = minLaps + 1;

        if (minLaps >= this.state.raceLaps) {
            this.endGame(true);
        }
    },

    /**
     * Update HUD display
     */
    updateHUD() {
        this.elements.lapCounter.textContent = `Lap ${Math.min(this.state.currentLap, this.state.raceLaps)}/${this.state.raceLaps}`;
    },

    /**
     * Render the game
     */
    render() {
        const ctx = this.ctx;
        const size = this.canvas.width;
        const center = size / 2;

        // Clear
        ctx.fillStyle = this.config.colors.grass;
        ctx.fillRect(0, 0, size, size);

        this.renderTrack(center, size);
        this.renderBikes(center, size);
        this.renderFinishLine(center, size);
    },

    /**
     * Render the oval track
     */
    renderTrack(center, size) {
        const ctx = this.ctx;
        const cfg = this.config;

        const outerRadius = size * cfg.trackOuterRadius;
        const innerRadius = size * cfg.trackInnerRadius;

        // Draw track surface
        ctx.beginPath();
        ctx.arc(center, center, outerRadius, 0, Math.PI * 2);
        ctx.fillStyle = cfg.colors.track;
        ctx.fill();

        // Draw inner grass
        ctx.beginPath();
        ctx.arc(center, center, innerRadius, 0, Math.PI * 2);
        ctx.fillStyle = cfg.colors.grass;
        ctx.fill();

        // Draw lane lines
        const laneWidth = (outerRadius - innerRadius) / cfg.trackLanes;
        ctx.strokeStyle = cfg.colors.trackLines;
        ctx.lineWidth = 2;
        ctx.setLineDash([10, 10]);

        for (let i = 1; i < cfg.trackLanes; i++) {
            ctx.beginPath();
            ctx.arc(center, center, innerRadius + laneWidth * i, 0, Math.PI * 2);
            ctx.stroke();
        }

        ctx.setLineDash([]);

        // Draw outer edge
        ctx.beginPath();
        ctx.arc(center, center, outerRadius, 0, Math.PI * 2);
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Draw inner edge
        ctx.beginPath();
        ctx.arc(center, center, innerRadius, 0, Math.PI * 2);
        ctx.stroke();
    },

    /**
     * Render finish line
     */
    renderFinishLine(center, size) {
        const ctx = this.ctx;
        const cfg = this.config;

        const outerRadius = size * cfg.trackOuterRadius;
        const innerRadius = size * cfg.trackInnerRadius;
        const finishAngle = -Math.PI / 2;

        // Draw checkered finish line
        const startX = center + Math.cos(finishAngle) * innerRadius;
        const startY = center + Math.sin(finishAngle) * innerRadius;
        const endX = center + Math.cos(finishAngle) * outerRadius;
        const endY = center + Math.sin(finishAngle) * outerRadius;

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 6;
        ctx.stroke();

        // Add checkered pattern
        const segments = 6;
        const dx = (endX - startX) / segments;
        const dy = (endY - startY) / segments;

        for (let i = 0; i < segments; i++) {
            if (i % 2 === 0) {
                ctx.fillStyle = '#000';
            } else {
                ctx.fillStyle = '#fff';
            }
            ctx.fillRect(startX + dx * i - 3, startY + dy * i - 3, 6, 6);
        }
    },

    /**
     * Render bikes on track
     */
    renderBikes(center, size) {
        const ctx = this.ctx;
        const cfg = this.config;

        const outerRadius = size * cfg.trackOuterRadius;
        const innerRadius = size * cfg.trackInnerRadius;
        const trackWidth = outerRadius - innerRadius;
        const trackCenter = innerRadius + trackWidth / 2;

        // Sort players by position (to draw back to front)
        const sortedPlayers = [...this.state.players].sort((a, b) => a.angle - b.angle);

        // Animate glow pulse
        const glowPulse = 0.5 + Math.sin(Date.now() / 200) * 0.5;

        sortedPlayers.forEach(player => {
            // Calculate position on track
            const laneRadius = trackCenter + player.laneOffset * trackWidth;
            const x = center + Math.cos(player.angle) * laneRadius;
            const y = center + Math.sin(player.angle) * laneRadius;
            const bikeAngle = player.angle + Math.PI / 2; // Bike faces direction of travel

            // Draw drafting energy glow (pulsing green aura when gaining energy)
            if (player.isDrafting) {
                const glowSize = 25 + glowPulse * 10;
                const gradient = ctx.createRadialGradient(x, y, 5, x, y, glowSize);
                gradient.addColorStop(0, 'rgba(34, 197, 94, 0.6)');
                gradient.addColorStop(0.5, 'rgba(34, 197, 94, 0.3)');
                gradient.addColorStop(1, 'rgba(34, 197, 94, 0)');
                ctx.beginPath();
                ctx.arc(x, y, glowSize, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();

                // Draw wind/draft lines behind the bike
                ctx.strokeStyle = 'rgba(34, 197, 94, 0.6)';
                ctx.lineWidth = 2;
                for (let i = 1; i <= 4; i++) {
                    const offset = i * 7;
                    const windX = x - Math.cos(player.angle) * offset;
                    const windY = y - Math.sin(player.angle) * offset;
                    ctx.beginPath();
                    ctx.moveTo(windX - 4, windY - 4);
                    ctx.lineTo(windX + 4, windY + 4);
                    ctx.stroke();
                }
            }

            // Draw bike shadow
            ctx.save();
            ctx.translate(x + 2, y + 2);
            ctx.rotate(bikeAngle);
            ctx.beginPath();
            ctx.ellipse(0, 0, 8, 14, 0, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            ctx.fill();
            ctx.restore();

            // Draw the bike (cyclist shape)
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(bikeAngle);

            // Bike frame color
            const bikeColor = player.color;

            // Back wheel
            ctx.beginPath();
            ctx.arc(0, 10, 6, 0, Math.PI * 2);
            ctx.fillStyle = '#1f2937';
            ctx.fill();
            ctx.strokeStyle = '#6b7280';
            ctx.lineWidth = 2;
            ctx.stroke();

            // Front wheel
            ctx.beginPath();
            ctx.arc(0, -10, 6, 0, Math.PI * 2);
            ctx.fillStyle = '#1f2937';
            ctx.fill();
            ctx.stroke();

            // Bike frame (triangle-ish shape)
            ctx.beginPath();
            ctx.moveTo(0, 10);    // Back wheel
            ctx.lineTo(-4, 0);    // Seat
            ctx.lineTo(0, -8);    // Handlebars
            ctx.lineTo(0, 10);    // Back to rear
            ctx.strokeStyle = bikeColor;
            ctx.lineWidth = 3;
            ctx.stroke();

            // Seat post
            ctx.beginPath();
            ctx.moveTo(-4, 0);
            ctx.lineTo(-6, -2);
            ctx.strokeStyle = bikeColor;
            ctx.lineWidth = 2;
            ctx.stroke();

            // Cyclist body (circle for head, line for body)
            ctx.beginPath();
            ctx.arc(-3, -6, 5, 0, Math.PI * 2); // Head/torso
            ctx.fillStyle = bikeColor;
            ctx.fill();
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 1;
            ctx.stroke();

            // Handlebars
            ctx.beginPath();
            ctx.moveTo(-3, -8);
            ctx.lineTo(3, -8);
            ctx.strokeStyle = '#9ca3af';
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.restore();

            // Draw player number on cyclist
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 10px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            const numX = x - Math.sin(bikeAngle) * 3;
            const numY = y + Math.cos(bikeAngle) * 3 - 6;
            ctx.fillText(`${player.index + 1}`, x, y - 6);

            // Draw energy ring around bike
            const energyAngle = (player.energy / cfg.maxEnergy) * Math.PI * 2;
            ctx.beginPath();
            ctx.arc(x, y, 18, -Math.PI / 2, -Math.PI / 2 + energyAngle);

            // Color based on state - simple: green if drafting, red if low, otherwise player color
            if (player.isDrafting) {
                // Bright green when drafting (energy boosting fast!)
                ctx.strokeStyle = '#22c55e';
                ctx.lineWidth = 4;
            } else if (player.energy < 20) {
                // Red when low energy - need to draft!
                ctx.strokeStyle = '#ef4444';
                ctx.lineWidth = 3;
            } else {
                // Normal - slow energy regen
                ctx.strokeStyle = player.color;
                ctx.lineWidth = 2;
            }
            ctx.stroke();
        });
    },

    /**
     * End the game
     */
    endGame(victory) {
        this.state.isRunning = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }

        const elapsed = Math.floor((Date.now() - this.state.startTime) / 1000);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;

        this.elements.gameoverIcon.textContent = victory ? '🏆' : '💨';
        this.elements.gameoverTitle.textContent = victory ? 'Race Complete!' : 'Race Ended';
        this.elements.gameoverSubtitle.textContent = victory ? 'Great teamwork!' : 'Better luck next time!';

        this.elements.statLaps.textContent = this.state.raceLaps;
        this.elements.statTime.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;

        // Show rider stats
        this.elements.riderStats.innerHTML = '';
        this.state.players.forEach((player, i) => {
            const item = document.createElement('div');
            item.className = `rider-stat-item player-${i + 1}`;
            item.innerHTML = `
                <span class="indicator"></span>
                <span class="name">P${i + 1}</span>
                <span class="stat-detail">${player.totalPedals} pedals</span>
            `;
            this.elements.riderStats.appendChild(item);
        });

        this.showScreen('gameover');
    },

    /**
     * Play again
     */
    playAgain() {
        this.startGame();
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => Game.init());

// Warn before leaving during active game
window.addEventListener('beforeunload', (e) => {
    if (Game.state.isRunning) {
        e.preventDefault();
        e.returnValue = '';
    }
});
