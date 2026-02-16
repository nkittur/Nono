/**
 * Veggie Slice - A multiplayer vegetable slicing game
 * Supports 1-4 simultaneous players with split-screen zones
 */

const PLAYER_COLORS = [
    { bg: '#22c55e', light: '#4ade80', name: 'Green' },
    { bg: '#3b82f6', light: '#60a5fa', name: 'Blue' },
    { bg: '#f59e0b', light: '#fbbf24', name: 'Amber' },
    { bg: '#ef4444', light: '#f87171', name: 'Red' }
];

const VEGETABLES = [
    {
        id: 'cucumber',
        name: 'Cucumber',
        weight: 4,
        points: 10,
        color: '#4ade80',
        darkColor: '#166534',
        radius: 28,
        draw(ctx, x, y, r, angle) {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle);
            // Body
            ctx.beginPath();
            ctx.ellipse(0, 0, r * 1.6, r * 0.55, 0, 0, Math.PI * 2);
            ctx.fillStyle = '#4ade80';
            ctx.fill();
            ctx.strokeStyle = '#166534';
            ctx.lineWidth = 2;
            ctx.stroke();
            // Stripes
            for (let i = -3; i <= 3; i++) {
                ctx.beginPath();
                ctx.moveTo(i * r * 0.35, -r * 0.4);
                ctx.lineTo(i * r * 0.35, r * 0.4);
                ctx.strokeStyle = 'rgba(22, 101, 52, 0.25)';
                ctx.lineWidth = 1.5;
                ctx.stroke();
            }
            // Highlight
            ctx.beginPath();
            ctx.ellipse(0, -r * 0.15, r * 1.1, r * 0.18, 0, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255,255,255,0.2)';
            ctx.fill();
            // Bumps
            for (let i = 0; i < 5; i++) {
                const bx = (i - 2) * r * 0.6;
                const by = -r * 0.35 + Math.sin(i * 1.5) * r * 0.1;
                ctx.beginPath();
                ctx.arc(bx, by, r * 0.07, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(22, 101, 52, 0.2)';
                ctx.fill();
            }
            ctx.restore();
        },
        drawHalf(ctx, x, y, r, angle, side) {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle);
            ctx.beginPath();
            if (side === 'left') {
                ctx.ellipse(-r * 0.2, 0, r * 0.9, r * 0.55, 0, 0, Math.PI * 2);
            } else {
                ctx.ellipse(r * 0.2, 0, r * 0.9, r * 0.55, 0, 0, Math.PI * 2);
            }
            ctx.fillStyle = '#4ade80';
            ctx.fill();
            ctx.strokeStyle = '#166534';
            ctx.lineWidth = 2;
            ctx.stroke();
            // Inner flesh
            ctx.beginPath();
            if (side === 'left') {
                ctx.ellipse(r * 0.15, 0, r * 0.35, r * 0.4, 0, 0, Math.PI * 2);
            } else {
                ctx.ellipse(-r * 0.15, 0, r * 0.35, r * 0.4, 0, 0, Math.PI * 2);
            }
            ctx.fillStyle = '#bbf7d0';
            ctx.fill();
            // Seeds
            const seedX = side === 'left' ? r * 0.15 : -r * 0.15;
            for (let i = 0; i < 4; i++) {
                const a = (i / 4) * Math.PI * 2;
                ctx.beginPath();
                ctx.ellipse(
                    seedX + Math.cos(a) * r * 0.18,
                    Math.sin(a) * r * 0.2,
                    r * 0.04, r * 0.06, a, 0, Math.PI * 2
                );
                ctx.fillStyle = '#86efac';
                ctx.fill();
            }
            ctx.restore();
        }
    },
    {
        id: 'carrot',
        name: 'Carrot',
        weight: 2,
        points: 15,
        color: '#fb923c',
        darkColor: '#9a3412',
        radius: 24,
        draw(ctx, x, y, r, angle) {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle);
            // Body
            ctx.beginPath();
            ctx.moveTo(0, -r * 1.4);
            ctx.quadraticCurveTo(r * 0.7, -r * 0.3, r * 0.35, r * 1.2);
            ctx.lineTo(0, r * 1.6);
            ctx.lineTo(-r * 0.35, r * 1.2);
            ctx.quadraticCurveTo(-r * 0.7, -r * 0.3, 0, -r * 1.4);
            ctx.fillStyle = '#fb923c';
            ctx.fill();
            ctx.strokeStyle = '#9a3412';
            ctx.lineWidth = 2;
            ctx.stroke();
            // Lines
            for (let i = 0; i < 4; i++) {
                const ly = -r * 0.6 + i * r * 0.55;
                ctx.beginPath();
                ctx.moveTo(-r * 0.25, ly);
                ctx.lineTo(r * 0.25, ly);
                ctx.strokeStyle = 'rgba(154, 52, 18, 0.3)';
                ctx.lineWidth = 1;
                ctx.stroke();
            }
            // Greens
            ctx.beginPath();
            ctx.moveTo(0, -r * 1.4);
            ctx.quadraticCurveTo(-r * 0.4, -r * 2.2, -r * 0.2, -r * 2.0);
            ctx.moveTo(0, -r * 1.4);
            ctx.quadraticCurveTo(r * 0.1, -r * 2.3, r * 0.3, -r * 1.9);
            ctx.moveTo(0, -r * 1.4);
            ctx.quadraticCurveTo(r * 0.5, -r * 2.0, r * 0.15, -r * 2.1);
            ctx.strokeStyle = '#4ade80';
            ctx.lineWidth = 2.5;
            ctx.stroke();
            ctx.restore();
        },
        drawHalf(ctx, x, y, r, angle, side) {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle);
            ctx.beginPath();
            ctx.ellipse(0, 0, r * 0.5, r * 0.9, 0, 0, Math.PI * 2);
            ctx.fillStyle = '#fb923c';
            ctx.fill();
            ctx.strokeStyle = '#9a3412';
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.beginPath();
            ctx.ellipse(0, 0, r * 0.3, r * 0.6, 0, 0, Math.PI * 2);
            ctx.fillStyle = '#fed7aa';
            ctx.fill();
            ctx.beginPath();
            ctx.arc(0, 0, r * 0.08, 0, Math.PI * 2);
            ctx.fillStyle = '#fdba74';
            ctx.fill();
            ctx.restore();
        }
    },
    {
        id: 'tomato',
        name: 'Tomato',
        weight: 2,
        points: 12,
        color: '#ef4444',
        darkColor: '#991b1b',
        radius: 24,
        draw(ctx, x, y, r, angle) {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle);
            // Body
            ctx.beginPath();
            ctx.arc(0, 0, r, 0, Math.PI * 2);
            ctx.fillStyle = '#ef4444';
            ctx.fill();
            ctx.strokeStyle = '#991b1b';
            ctx.lineWidth = 2;
            ctx.stroke();
            // Highlight
            ctx.beginPath();
            ctx.ellipse(-r * 0.3, -r * 0.3, r * 0.35, r * 0.2, -0.5, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255,255,255,0.25)';
            ctx.fill();
            // Stem
            ctx.beginPath();
            ctx.moveTo(-r * 0.3, -r * 0.8);
            ctx.quadraticCurveTo(0, -r * 1.1, r * 0.3, -r * 0.8);
            ctx.strokeStyle = '#4ade80';
            ctx.lineWidth = 2.5;
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(0, -r * 0.9, r * 0.08, 0, Math.PI * 2);
            ctx.fillStyle = '#166534';
            ctx.fill();
            ctx.restore();
        },
        drawHalf(ctx, x, y, r, angle, side) {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle);
            ctx.beginPath();
            ctx.arc(0, 0, r * 0.85, 0, Math.PI * 2);
            ctx.fillStyle = '#ef4444';
            ctx.fill();
            ctx.strokeStyle = '#991b1b';
            ctx.lineWidth = 2;
            ctx.stroke();
            // Inner
            ctx.beginPath();
            ctx.arc(0, 0, r * 0.55, 0, Math.PI * 2);
            ctx.fillStyle = '#fca5a5';
            ctx.fill();
            // Seeds
            for (let i = 0; i < 5; i++) {
                const a = (i / 5) * Math.PI * 2 + 0.3;
                ctx.beginPath();
                ctx.ellipse(
                    Math.cos(a) * r * 0.3,
                    Math.sin(a) * r * 0.3,
                    r * 0.05, r * 0.03, a, 0, Math.PI * 2
                );
                ctx.fillStyle = '#fde68a';
                ctx.fill();
            }
            ctx.restore();
        }
    },
    {
        id: 'eggplant',
        name: 'Eggplant',
        weight: 1,
        points: 20,
        color: '#7c3aed',
        darkColor: '#4c1d95',
        radius: 26,
        draw(ctx, x, y, r, angle) {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle);
            // Body
            ctx.beginPath();
            ctx.moveTo(0, -r * 1.3);
            ctx.quadraticCurveTo(r * 0.9, -r * 0.2, r * 0.6, r * 0.8);
            ctx.quadraticCurveTo(r * 0.3, r * 1.5, 0, r * 1.5);
            ctx.quadraticCurveTo(-r * 0.3, r * 1.5, -r * 0.6, r * 0.8);
            ctx.quadraticCurveTo(-r * 0.9, -r * 0.2, 0, -r * 1.3);
            ctx.fillStyle = '#7c3aed';
            ctx.fill();
            ctx.strokeStyle = '#4c1d95';
            ctx.lineWidth = 2;
            ctx.stroke();
            // Highlight
            ctx.beginPath();
            ctx.ellipse(r * 0.2, 0, r * 0.15, r * 0.8, 0.2, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255,255,255,0.12)';
            ctx.fill();
            // Cap
            ctx.beginPath();
            ctx.moveTo(-r * 0.4, -r * 1.1);
            ctx.quadraticCurveTo(0, -r * 1.6, r * 0.4, -r * 1.1);
            ctx.fillStyle = '#4ade80';
            ctx.fill();
            ctx.restore();
        },
        drawHalf(ctx, x, y, r, angle, side) {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle);
            ctx.beginPath();
            ctx.ellipse(0, 0, r * 0.55, r * 0.8, 0, 0, Math.PI * 2);
            ctx.fillStyle = '#7c3aed';
            ctx.fill();
            ctx.strokeStyle = '#4c1d95';
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.beginPath();
            ctx.ellipse(0, 0, r * 0.35, r * 0.55, 0, 0, Math.PI * 2);
            ctx.fillStyle = '#c4b5fd';
            ctx.fill();
            // Seeds
            for (let i = 0; i < 6; i++) {
                const a = (i / 6) * Math.PI * 2;
                ctx.beginPath();
                ctx.arc(Math.cos(a) * r * 0.2, Math.sin(a) * r * 0.25, r * 0.03, 0, Math.PI * 2);
                ctx.fillStyle = '#e9d5ff';
                ctx.fill();
            }
            ctx.restore();
        }
    },
    {
        id: 'bellpepper',
        name: 'Bell Pepper',
        weight: 1,
        points: 18,
        color: '#facc15',
        darkColor: '#854d0e',
        radius: 26,
        draw(ctx, x, y, r, angle) {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle);
            // Body (bell shape)
            ctx.beginPath();
            ctx.moveTo(0, -r * 0.9);
            ctx.bezierCurveTo(r * 1.0, -r * 0.7, r * 0.9, r * 0.8, r * 0.3, r);
            ctx.quadraticCurveTo(0, r * 1.2, -r * 0.3, r);
            ctx.bezierCurveTo(-r * 0.9, r * 0.8, -r * 1.0, -r * 0.7, 0, -r * 0.9);
            ctx.fillStyle = '#facc15';
            ctx.fill();
            ctx.strokeStyle = '#854d0e';
            ctx.lineWidth = 2;
            ctx.stroke();
            // Highlight
            ctx.beginPath();
            ctx.ellipse(-r * 0.2, -r * 0.2, r * 0.2, r * 0.5, -0.2, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255,255,255,0.2)';
            ctx.fill();
            // Crease
            ctx.beginPath();
            ctx.moveTo(0, -r * 0.6);
            ctx.quadraticCurveTo(r * 0.05, r * 0.2, 0, r * 0.9);
            ctx.strokeStyle = 'rgba(133, 77, 14, 0.2)';
            ctx.lineWidth = 1.5;
            ctx.stroke();
            // Stem
            ctx.beginPath();
            ctx.rect(-r * 0.08, -r * 1.3, r * 0.16, r * 0.45);
            ctx.fillStyle = '#4ade80';
            ctx.fill();
            ctx.restore();
        },
        drawHalf(ctx, x, y, r, angle, side) {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle);
            ctx.beginPath();
            ctx.ellipse(0, 0, r * 0.6, r * 0.7, 0, 0, Math.PI * 2);
            ctx.fillStyle = '#facc15';
            ctx.fill();
            ctx.strokeStyle = '#854d0e';
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.beginPath();
            ctx.ellipse(0, 0, r * 0.4, r * 0.5, 0, 0, Math.PI * 2);
            ctx.fillStyle = '#fef9c3';
            ctx.fill();
            for (let i = 0; i < 4; i++) {
                const a = (i / 4) * Math.PI * 2 + 0.4;
                ctx.beginPath();
                ctx.arc(Math.cos(a) * r * 0.22, Math.sin(a) * r * 0.28, r * 0.04, 0, Math.PI * 2);
                ctx.fillStyle = '#fde047';
                ctx.fill();
            }
            ctx.restore();
        }
    },
    {
        id: 'corn',
        name: 'Corn',
        weight: 1,
        points: 15,
        color: '#fbbf24',
        darkColor: '#92400e',
        radius: 26,
        draw(ctx, x, y, r, angle) {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle);
            // Body
            ctx.beginPath();
            ctx.ellipse(0, 0, r * 0.5, r * 1.4, 0, 0, Math.PI * 2);
            ctx.fillStyle = '#fbbf24';
            ctx.fill();
            ctx.strokeStyle = '#92400e';
            ctx.lineWidth = 2;
            ctx.stroke();
            // Kernels grid
            for (let row = -4; row <= 4; row++) {
                for (let col = -1; col <= 1; col++) {
                    const kx = col * r * 0.22;
                    const ky = row * r * 0.25;
                    if (kx * kx / (r * 0.4 * r * 0.4) + ky * ky / (r * 1.2 * r * 1.2) < 0.8) {
                        ctx.beginPath();
                        ctx.ellipse(kx, ky, r * 0.08, r * 0.1, 0, 0, Math.PI * 2);
                        ctx.fillStyle = row % 2 === 0 ? '#fde047' : '#fbbf24';
                        ctx.fill();
                    }
                }
            }
            // Husk
            ctx.beginPath();
            ctx.moveTo(-r * 0.3, r * 1.1);
            ctx.quadraticCurveTo(-r * 0.7, r * 1.8, -r * 0.2, r * 2.0);
            ctx.moveTo(r * 0.3, r * 1.1);
            ctx.quadraticCurveTo(r * 0.7, r * 1.8, r * 0.2, r * 2.0);
            ctx.strokeStyle = '#4ade80';
            ctx.lineWidth = 3;
            ctx.stroke();
            ctx.restore();
        },
        drawHalf(ctx, x, y, r, angle, side) {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle);
            ctx.beginPath();
            ctx.ellipse(0, 0, r * 0.5, r * 0.9, 0, 0, Math.PI * 2);
            ctx.fillStyle = '#fbbf24';
            ctx.fill();
            ctx.strokeStyle = '#92400e';
            ctx.lineWidth = 2;
            ctx.stroke();
            // Kernels
            for (let row = -2; row <= 2; row++) {
                for (let col = -1; col <= 1; col++) {
                    ctx.beginPath();
                    ctx.arc(col * r * 0.2, row * r * 0.25, r * 0.08, 0, Math.PI * 2);
                    ctx.fillStyle = '#fde047';
                    ctx.fill();
                }
            }
            ctx.restore();
        }
    }
];

// Build weighted spawn pool (more cucumbers)
const VEGGIE_POOL = [];
VEGETABLES.forEach(v => {
    for (let i = 0; i < v.weight; i++) {
        VEGGIE_POOL.push(v);
    }
});

const DIFFICULTY = {
    easy: { spawnRate: 1800, gravity: 0.18, maxActive: 6, missLimit: 5 },
    normal: { spawnRate: 1300, gravity: 0.22, maxActive: 10, missLimit: 3 },
    hard: { spawnRate: 900, gravity: 0.26, maxActive: 14, missLimit: 2 }
};

const Game = {
    state: {
        currentScreen: 'welcome',
        playerCount: 2,
        duration: 60,
        difficulty: 'normal',
        players: [],
        veggies: [],
        sliceHalves: [],
        particles: [],
        sliceTrails: {},
        timeLeft: 0,
        running: false,
        lastSpawn: 0,
        animFrame: null
    },

    canvas: null,
    ctx: null,
    width: 0,
    height: 0,
    dpr: 1,

    init() {
        this.cacheElements();
        this.showScreen('welcome');
        this.updatePlayerPreview();
    },

    cacheElements() {
        this.elements = {
            screens: {
                welcome: document.getElementById('screen-welcome'),
                setup: document.getElementById('screen-setup'),
                game: document.getElementById('screen-game'),
                results: document.getElementById('screen-results')
            },
            playerCount: document.getElementById('player-count'),
            playerPreview: document.getElementById('player-preview'),
            hud: document.getElementById('game-hud'),
            resultsBoard: document.getElementById('results-board')
        };
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
    },

    showScreen(name) {
        Object.values(this.elements.screens).forEach(s => s.classList.remove('active'));
        const screen = this.elements.screens[name];
        if (screen) {
            screen.classList.add('active');
            this.state.currentScreen = name;
        }
    },

    showWelcome() { this.showScreen('welcome'); },

    showSetup() {
        this.showScreen('setup');
        this.updatePlayerPreview();
    },

    adjustPlayers(delta) {
        this.state.playerCount = Math.min(4, Math.max(1, this.state.playerCount + delta));
        this.elements.playerCount.textContent = this.state.playerCount;
        this.updatePlayerPreview();
    },

    setDuration(seconds) {
        this.state.duration = seconds;
        document.querySelectorAll('#duration-options .btn-option').forEach(btn => {
            btn.classList.toggle('active', parseInt(btn.dataset.duration) === seconds);
        });
    },

    setDifficulty(diff) {
        this.state.difficulty = diff;
        document.querySelectorAll('#difficulty-options .btn-option').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.difficulty === diff);
        });
    },

    updatePlayerPreview() {
        const html = [];
        for (let i = 0; i < this.state.playerCount; i++) {
            html.push(`<div class="player-dot" style="background:${PLAYER_COLORS[i].bg}">P${i + 1}</div>`);
        }
        this.elements.playerPreview.innerHTML = html.join('');
    },

    // --- Game Zone Layout ---

    getZones() {
        const n = this.state.playerCount;
        const w = this.width;
        const h = this.height;
        const zones = [];

        if (n === 1) {
            zones.push({ x: 0, y: 0, w, h });
        } else if (n === 2) {
            // Top and bottom split
            zones.push({ x: 0, y: 0, w, h: h / 2 });
            zones.push({ x: 0, y: h / 2, w, h: h / 2 });
        } else if (n === 3) {
            // Top left, top right, bottom full
            zones.push({ x: 0, y: 0, w: w / 2, h: h / 2 });
            zones.push({ x: w / 2, y: 0, w: w / 2, h: h / 2 });
            zones.push({ x: 0, y: h / 2, w, h: h / 2 });
        } else {
            // 2x2 grid
            zones.push({ x: 0, y: 0, w: w / 2, h: h / 2 });
            zones.push({ x: w / 2, y: 0, w: w / 2, h: h / 2 });
            zones.push({ x: 0, y: h / 2, w: w / 2, h: h / 2 });
            zones.push({ x: w / 2, y: h / 2, w: w / 2, h: h / 2 });
        }

        return zones;
    },

    getZoneForPoint(px, py) {
        const zones = this.getZones();
        for (let i = 0; i < zones.length; i++) {
            const z = zones[i];
            if (px >= z.x && px < z.x + z.w && py >= z.y && py < z.y + z.h) {
                return i;
            }
        }
        return 0;
    },

    // --- Start / Stop ---

    startGame() {
        this.showScreen('game');
        this.resizeCanvas();

        const zones = this.getZones();
        this.state.players = [];
        for (let i = 0; i < this.state.playerCount; i++) {
            this.state.players.push({
                id: i,
                score: 0,
                combo: 0,
                misses: 0,
                alive: true,
                zone: zones[i],
                color: PLAYER_COLORS[i]
            });
        }

        this.state.veggies = [];
        this.state.sliceHalves = [];
        this.state.particles = [];
        this.state.sliceTrails = {};
        this.state.timeLeft = this.state.duration;
        this.state.running = true;
        this.state.lastSpawn = 0;

        this.buildHUD();
        this.bindInput();

        window.addEventListener('resize', this._onResize = () => this.resizeCanvas());

        this._timerInterval = setInterval(() => {
            if (!this.state.running) return;
            this.state.timeLeft--;
            this.updateTimerDisplay();
            if (this.state.timeLeft <= 0) {
                this.endGame();
            }
        }, 1000);

        this._lastFrame = performance.now();
        this.loop();
    },

    endGame() {
        this.state.running = false;
        if (this._timerInterval) clearInterval(this._timerInterval);
        if (this.state.animFrame) cancelAnimationFrame(this.state.animFrame);
        this.unbindInput();
        window.removeEventListener('resize', this._onResize);

        this.showResults();
    },

    // --- Canvas ---

    resizeCanvas() {
        this.dpr = window.devicePixelRatio || 1;
        const parent = this.canvas.parentElement;
        this.width = parent.clientWidth;
        this.height = parent.clientHeight;
        this.canvas.width = this.width * this.dpr;
        this.canvas.height = this.height * this.dpr;
        this.canvas.style.width = this.width + 'px';
        this.canvas.style.height = this.height + 'px';
        this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);

        // Update zones
        const zones = this.getZones();
        this.state.players.forEach((p, i) => {
            if (zones[i]) p.zone = zones[i];
        });
    },

    // --- HUD ---

    buildHUD() {
        this.elements.hud.innerHTML = `<div class="hud-timer" id="hud-timer">${this.state.timeLeft}</div>`;
        this._timerEl = document.getElementById('hud-timer');
    },

    updateTimerDisplay() {
        if (!this._timerEl) return;
        this._timerEl.textContent = this.state.timeLeft;
        this._timerEl.classList.toggle('warning', this.state.timeLeft <= 10);
    },

    // --- Input (multi-touch) ---

    bindInput() {
        this._pointers = {};

        this._onPointerDown = (e) => {
            e.preventDefault();
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            this._pointers[e.pointerId] = { x, y, lastX: x, lastY: y };
            this.state.sliceTrails[e.pointerId] = [{ x, y, time: performance.now() }];
        };

        this._onPointerMove = (e) => {
            e.preventDefault();
            if (!this._pointers[e.pointerId]) return;
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const prev = this._pointers[e.pointerId];

            // Check slicing
            this.checkSlice(prev.x, prev.y, x, y, e.pointerId);

            prev.lastX = prev.x;
            prev.lastY = prev.y;
            prev.x = x;
            prev.y = y;

            // Trail
            const trail = this.state.sliceTrails[e.pointerId];
            if (trail) {
                trail.push({ x, y, time: performance.now() });
                if (trail.length > 20) trail.shift();
            }
        };

        this._onPointerUp = (e) => {
            delete this._pointers[e.pointerId];
            delete this.state.sliceTrails[e.pointerId];
        };

        this.canvas.addEventListener('pointerdown', this._onPointerDown);
        this.canvas.addEventListener('pointermove', this._onPointerMove);
        this.canvas.addEventListener('pointerup', this._onPointerUp);
        this.canvas.addEventListener('pointercancel', this._onPointerUp);
        this.canvas.addEventListener('pointerleave', this._onPointerUp);
    },

    unbindInput() {
        if (this._onPointerDown) {
            this.canvas.removeEventListener('pointerdown', this._onPointerDown);
            this.canvas.removeEventListener('pointermove', this._onPointerMove);
            this.canvas.removeEventListener('pointerup', this._onPointerUp);
            this.canvas.removeEventListener('pointercancel', this._onPointerUp);
            this.canvas.removeEventListener('pointerleave', this._onPointerUp);
        }
    },

    // --- Slicing Detection ---

    checkSlice(x1, y1, x2, y2, pointerId) {
        const dx = x2 - x1;
        const dy = y2 - y1;
        const swipeLen = Math.sqrt(dx * dx + dy * dy);
        if (swipeLen < 5) return;

        for (let i = this.state.veggies.length - 1; i >= 0; i--) {
            const v = this.state.veggies[i];
            if (v.sliced) continue;

            if (this.lineCircleIntersect(x1, y1, x2, y2, v.x, v.y, v.type.radius * 1.2)) {
                v.sliced = true;
                const zone = this.getZoneForPoint(v.x, v.y);
                const player = this.state.players[zone];
                if (player && player.alive) {
                    player.combo++;
                    const comboBonus = Math.min(player.combo, 5);
                    player.score += v.type.points * comboBonus;
                    this.spawnSliceEffect(v, player, comboBonus);
                }
                this.spawnHalves(v, dx, dy);
                this.state.veggies.splice(i, 1);
            }
        }
    },

    lineCircleIntersect(x1, y1, x2, y2, cx, cy, r) {
        const dx = x2 - x1;
        const dy = y2 - y1;
        const fx = x1 - cx;
        const fy = y1 - cy;
        const a = dx * dx + dy * dy;
        const b = 2 * (fx * dx + fy * dy);
        const c = fx * fx + fy * fy - r * r;
        let disc = b * b - 4 * a * c;
        if (disc < 0) return false;
        disc = Math.sqrt(disc);
        const t1 = (-b - disc) / (2 * a);
        const t2 = (-b + disc) / (2 * a);
        return (t1 >= 0 && t1 <= 1) || (t2 >= 0 && t2 <= 1) || (t1 < 0 && t2 > 1);
    },

    spawnHalves(veggie, swipeDx, swipeDy) {
        const perpX = -swipeDy;
        const perpY = swipeDx;
        const perpLen = Math.sqrt(perpX * perpX + perpY * perpY) || 1;
        const nx = perpX / perpLen;
        const ny = perpY / perpLen;
        const speed = 2;

        this.state.sliceHalves.push({
            x: veggie.x,
            y: veggie.y,
            vx: veggie.vx + nx * speed,
            vy: veggie.vy - 1,
            angle: veggie.angle,
            spin: veggie.spin + 0.05,
            type: veggie.type,
            side: 'left',
            life: 1
        });
        this.state.sliceHalves.push({
            x: veggie.x,
            y: veggie.y,
            vx: veggie.vx - nx * speed,
            vy: veggie.vy - 1,
            angle: veggie.angle,
            spin: veggie.spin - 0.05,
            type: veggie.type,
            side: 'right',
            life: 1
        });
    },

    spawnSliceEffect(veggie, player, combo) {
        const count = 8 + combo * 2;
        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
            const speed = 1.5 + Math.random() * 3;
            this.state.particles.push({
                x: veggie.x,
                y: veggie.y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 1,
                life: 1,
                color: veggie.type.color,
                size: 3 + Math.random() * 4
            });
        }

        // Score popup
        this.state.particles.push({
            x: veggie.x,
            y: veggie.y - 20,
            vx: 0,
            vy: -1.5,
            life: 1,
            isText: true,
            text: combo > 1 ? `+${veggie.type.points * combo} x${combo}` : `+${veggie.type.points}`,
            color: combo > 2 ? '#fbbf24' : '#ffffff',
            size: combo > 2 ? 18 : 14
        });
    },

    // --- Spawning ---

    spawnVeggie(now) {
        const diff = DIFFICULTY[this.state.difficulty];
        if (now - this.state.lastSpawn < diff.spawnRate) return;
        if (this.state.veggies.length >= diff.maxActive) return;

        this.state.lastSpawn = now;
        const zones = this.getZones();

        // Spawn one veggie per zone (or randomly pick zones)
        const targetZone = zones[Math.floor(Math.random() * zones.length)];
        const type = VEGGIE_POOL[Math.floor(Math.random() * VEGGIE_POOL.length)];

        const margin = 40;
        const x = targetZone.x + margin + Math.random() * (targetZone.w - margin * 2);
        const launchFromBottom = true;

        const zoneBottom = targetZone.y + targetZone.h;
        const zoneHeight = targetZone.h;

        this.state.veggies.push({
            x,
            y: zoneBottom + 30,
            vx: (Math.random() - 0.5) * 2.5,
            vy: -(4.5 + Math.random() * 2.5) * (zoneHeight / 400),
            angle: Math.random() * Math.PI * 2,
            spin: (Math.random() - 0.5) * 0.08,
            type,
            sliced: false,
            zoneIndex: zones.indexOf(targetZone)
        });
    },

    // --- Game Loop ---

    loop() {
        if (!this.state.running) return;
        const now = performance.now();
        const dt = Math.min(now - this._lastFrame, 32) / 16;
        this._lastFrame = now;

        this.spawnVeggie(now);
        this.update(dt);
        this.draw();

        this.state.animFrame = requestAnimationFrame(() => this.loop());
    },

    update(dt) {
        const diff = DIFFICULTY[this.state.difficulty];
        const gravity = diff.gravity;
        const zones = this.getZones();

        // Update veggies
        for (let i = this.state.veggies.length - 1; i >= 0; i--) {
            const v = this.state.veggies[i];
            v.x += v.vx * dt;
            v.y += v.vy * dt;
            v.vy += gravity * dt;
            v.angle += v.spin * dt;

            // Check if fell out of its zone (below bottom)
            const zone = zones[v.zoneIndex] || zones[0];
            if (v.y > zone.y + zone.h + 50) {
                if (!v.sliced) {
                    const player = this.state.players[v.zoneIndex];
                    if (player && player.alive) {
                        player.misses++;
                        player.combo = 0;
                        if (player.misses >= diff.missLimit) {
                            player.alive = false;
                        }
                    }
                }
                this.state.veggies.splice(i, 1);
            }
        }

        // Update halves
        for (let i = this.state.sliceHalves.length - 1; i >= 0; i--) {
            const h = this.state.sliceHalves[i];
            h.x += h.vx * dt;
            h.y += h.vy * dt;
            h.vy += gravity * 1.2 * dt;
            h.angle += h.spin * dt;
            h.life -= 0.012 * dt;
            if (h.life <= 0 || h.y > this.height + 60) {
                this.state.sliceHalves.splice(i, 1);
            }
        }

        // Update particles
        for (let i = this.state.particles.length - 1; i >= 0; i--) {
            const p = this.state.particles[i];
            p.x += p.vx * dt;
            p.y += p.vy * dt;
            if (!p.isText) {
                p.vy += 0.08 * dt;
            }
            p.life -= (p.isText ? 0.02 : 0.025) * dt;
            if (p.life <= 0) {
                this.state.particles.splice(i, 1);
            }
        }

        // Check if all players eliminated
        const allDead = this.state.players.every(p => !p.alive);
        if (allDead && this.state.players.length > 0) {
            this.endGame();
        }
    },

    // --- Drawing ---

    draw() {
        const ctx = this.ctx;
        const w = this.width;
        const h = this.height;

        ctx.clearRect(0, 0, w, h);

        // Draw background
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, w, h);

        const zones = this.getZones();

        // Draw zone backgrounds
        this.state.players.forEach((player, i) => {
            const z = zones[i];
            if (!z) return;

            // Zone background tint
            ctx.fillStyle = player.alive
                ? `${player.color.bg}08`
                : 'rgba(239, 68, 68, 0.05)';
            ctx.fillRect(z.x, z.y, z.w, z.h);

            // Zone border
            ctx.strokeStyle = player.alive ? player.color.bg + '60' : '#ef444440';
            ctx.lineWidth = 2;
            ctx.strokeRect(z.x + 1, z.y + 1, z.w - 2, z.h - 2);

            // Player label
            ctx.fillStyle = player.alive ? player.color.light : '#ef444480';
            ctx.font = 'bold 14px -apple-system, BlinkMacSystemFont, sans-serif';
            ctx.textAlign = 'left';
            ctx.fillText(`P${i + 1}`, z.x + 10, z.y + 22);

            // Score
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 22px -apple-system, BlinkMacSystemFont, sans-serif';
            ctx.textAlign = 'right';
            ctx.fillText(player.score, z.x + z.w - 10, z.y + 26);

            // Miss indicators (X marks)
            const missLimit = DIFFICULTY[this.state.difficulty].missLimit;
            for (let m = 0; m < missLimit; m++) {
                const mx = z.x + 10 + m * 22;
                const my = z.y + 38;
                ctx.font = '16px sans-serif';
                ctx.textAlign = 'left';
                if (m < player.misses) {
                    ctx.fillStyle = '#ef4444';
                    ctx.fillText('X', mx, my);
                } else {
                    ctx.fillStyle = '#334155';
                    ctx.fillText('X', mx, my);
                }
            }

            // Combo indicator
            if (player.combo > 1 && player.alive) {
                ctx.fillStyle = '#fbbf24';
                ctx.font = 'bold 13px -apple-system, BlinkMacSystemFont, sans-serif';
                ctx.textAlign = 'left';
                ctx.fillText(`${player.combo}x combo`, z.x + 10, z.y + 56);
            }

            // Eliminated overlay
            if (!player.alive) {
                ctx.fillStyle = 'rgba(15, 23, 42, 0.6)';
                ctx.fillRect(z.x, z.y, z.w, z.h);
                ctx.fillStyle = '#ef4444';
                ctx.font = 'bold 24px -apple-system, BlinkMacSystemFont, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('OUT!', z.x + z.w / 2, z.y + z.h / 2);
                ctx.textBaseline = 'alphabetic';
            }
        });

        // Clip and draw per zone
        // Draw veggies (no clip needed, they belong to zones visually)
        this.state.veggies.forEach(v => {
            v.type.draw(ctx, v.x, v.y, v.type.radius, v.angle);
        });

        // Draw halves
        this.state.sliceHalves.forEach(h => {
            ctx.globalAlpha = h.life;
            h.type.drawHalf(ctx, h.x, h.y, h.type.radius, h.angle, h.side);
            ctx.globalAlpha = 1;
        });

        // Draw particles
        this.state.particles.forEach(p => {
            ctx.globalAlpha = p.life;
            if (p.isText) {
                ctx.fillStyle = p.color;
                ctx.font = `bold ${p.size}px -apple-system, BlinkMacSystemFont, sans-serif`;
                ctx.textAlign = 'center';
                ctx.fillText(p.text, p.x, p.y);
            } else {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();
            }
            ctx.globalAlpha = 1;
        });

        // Draw swipe trails
        Object.values(this.state.sliceTrails).forEach(trail => {
            if (trail.length < 2) return;
            const now = performance.now();
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';

            for (let i = 1; i < trail.length; i++) {
                const age = (now - trail[i].time) / 200;
                if (age > 1) continue;
                const alpha = (1 - age) * 0.7;
                const width = (1 - age) * 6 + 1;

                ctx.beginPath();
                ctx.moveTo(trail[i - 1].x, trail[i - 1].y);
                ctx.lineTo(trail[i].x, trail[i].y);
                ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
                ctx.lineWidth = width;
                ctx.stroke();
            }
        });

        // Draw zone divider lines on top
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.3)';
        ctx.lineWidth = 1;
        if (this.state.playerCount >= 2) {
            ctx.beginPath();
            ctx.moveTo(0, h / 2);
            ctx.lineTo(w, h / 2);
            ctx.stroke();
        }
        if (this.state.playerCount >= 3) {
            ctx.beginPath();
            ctx.moveTo(w / 2, 0);
            ctx.lineTo(w / 2, h / 2);
            ctx.stroke();
        }
        if (this.state.playerCount === 4) {
            ctx.beginPath();
            ctx.moveTo(w / 2, h / 2);
            ctx.lineTo(w / 2, h);
            ctx.stroke();
        }
    },

    // --- Results ---

    showResults() {
        this.showScreen('results');
        const sorted = [...this.state.players].sort((a, b) => b.score - a.score);
        const html = sorted.map((p, i) => {
            const rank = i === 0 ? '1st' : i === 1 ? '2nd' : i === 2 ? '3rd' : '4th';
            return `
                <div class="result-row">
                    <span class="result-rank">${rank}</span>
                    <span class="result-color" style="background:${p.color.bg}"></span>
                    <span class="result-name">Player ${p.id + 1}</span>
                    <span class="result-score">${p.score}</span>
                </div>
            `;
        }).join('');
        this.elements.resultsBoard.innerHTML = html;
    }
};

document.addEventListener('DOMContentLoaded', () => Game.init());

window.addEventListener('beforeunload', (e) => {
    if (Game.state.currentScreen === 'game') {
        e.preventDefault();
        e.returnValue = '';
    }
});
