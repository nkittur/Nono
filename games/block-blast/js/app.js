/**
 * Block Blast - Multiplayer Paddle Game
 * Main Game Logic
 */

const Game = {
    // Game configuration
    config: {
        initialBallSpeed: 5,
        maxBallSpeed: 14,
        speedIncreasePerBlock: 0.15, // Faster speed increase
        speedDecreaseOnDeath: 2, // Slow down on death instead of paddle growth
        initialPaddleWidth: 80,
        minPaddleWidth: 40,
        paddleShrinkPerBlock: 0.5,
        paddleThickness: 12,
        ballRadius: 8,
        blockRows: 4,
        blockCols: 6,
        blockPadding: 4,
        wallThickness: 12,
        initialLives: 3,
        colors: {
            players: ['#ef4444', '#3b82f6', '#10b981', '#f59e0b'],
            wall: '#4b5563',
            ball: '#ffffff',
            blocks: ['#ef4444', '#f59e0b', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6']
        }
    },

    // Block size presets
    blockSizes: {
        small: { rows: 6, cols: 8 },
        medium: { rows: 4, cols: 6 },
        large: { rows: 3, cols: 4 }
    },

    // Game state
    state: {
        currentScreen: 'welcome',
        playerCount: 2,
        blockSize: 'medium',
        activeSides: ['bottom', 'top'],
        players: [],
        blocks: [],
        ball: null,
        isPaused: false,
        isRunning: false,
        isLaunched: false, // Ball launched state
        launchPlayer: null, // Player who launches
        startTime: 0,
        blocksDestroyed: 0,
        totalBlocks: 0
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
            blockSizeBtns: document.querySelectorAll('.block-size-options .btn-option'),
            positionSlots: document.querySelectorAll('.position-slot'),
            hudLives: document.getElementById('hud-lives'),
            pauseOverlay: document.getElementById('pause-overlay'),
            pauseIcon: document.getElementById('pause-icon'),
            touchZones: document.getElementById('touch-zones'),
            launchOverlay: document.getElementById('launch-overlay'),
            launchPlayer: document.getElementById('launch-player'),
            // Game over
            gameoverIcon: document.getElementById('gameover-icon'),
            gameoverTitle: document.getElementById('gameover-title'),
            gameoverSubtitle: document.getElementById('gameover-subtitle'),
            statBlocks: document.getElementById('stat-blocks'),
            statTime: document.getElementById('stat-time'),
            survivorList: document.getElementById('survivor-list')
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

        // Canvas tap to launch
        if (this.canvas) {
            this.canvas.addEventListener('click', () => this.launchBall());
            this.canvas.addEventListener('touchstart', (e) => {
                if (!this.state.isLaunched) {
                    e.preventDefault();
                    this.launchBall();
                }
            });
        }
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
     * Set block size
     */
    setBlockSize(size) {
        this.state.blockSize = size;

        this.elements.blockSizeBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.size === size);
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

            slot.classList.remove('active', 'wall', ...playerColors);

            if (isActive) {
                slot.classList.add('active', playerColors[playerIndex]);
                slot.querySelector('.position-player').textContent = `P${playerIndex + 1}`;
            } else {
                slot.classList.add('wall');
                slot.querySelector('.position-player').textContent = '';
                slot.querySelector('.position-label').textContent = 'Wall';
            }

            if (isActive) {
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
        this.createBlocks();
        this.setupBallAtPaddle();
        this.setupTouchZones();
        this.updateHUD();

        this.state.isPaused = false;
        this.state.isRunning = true;
        this.state.isLaunched = false;
        this.state.startTime = Date.now();
        this.state.blocksDestroyed = 0;

        // Show launch overlay
        this.elements.launchOverlay.classList.add('visible');
        this.elements.launchPlayer.textContent = `P${this.state.launchPlayer.index + 1}`;
        this.elements.launchPlayer.style.color = this.state.launchPlayer.color;

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
     * Create players based on active sides
     */
    createPlayers() {
        this.state.players = [];
        const size = this.canvas.width;
        const cfg = this.config;

        this.state.activeSides.forEach((side, index) => {
            const player = {
                side: side,
                index: index,
                color: cfg.colors.players[index],
                lives: cfg.initialLives,
                paddleWidth: cfg.initialPaddleWidth,
                position: size / 2,
                velocity: 0,
                isMovingLeft: false,
                isMovingRight: false
            };

            this.state.players.push(player);
        });
    },

    /**
     * Create blocks in the center
     */
    createBlocks() {
        this.state.blocks = [];
        const size = this.canvas.width;
        const cfg = this.config;

        // Get block config based on selected size
        const blockConfig = this.blockSizes[this.state.blockSize];
        const rows = blockConfig.rows;
        const cols = blockConfig.cols;

        const blockAreaSize = size * 0.5;
        const startX = (size - blockAreaSize) / 2;
        const startY = (size - blockAreaSize) / 2;

        const blockWidth = (blockAreaSize - (cols + 1) * cfg.blockPadding) / cols;
        const blockHeight = (blockAreaSize - (rows + 1) * cfg.blockPadding) / rows;

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                this.state.blocks.push({
                    x: startX + cfg.blockPadding + col * (blockWidth + cfg.blockPadding),
                    y: startY + cfg.blockPadding + row * (blockHeight + cfg.blockPadding),
                    width: blockWidth,
                    height: blockHeight,
                    color: cfg.colors.blocks[(row + col) % cfg.colors.blocks.length],
                    alive: true
                });
            }
        }

        this.state.totalBlocks = this.state.blocks.length;
    },

    /**
     * Setup ball at a random player's paddle
     */
    setupBallAtPaddle() {
        const size = this.canvas.width;
        const cfg = this.config;

        // Pick random player
        const alivePlayers = this.state.players.filter(p => p.lives > 0);
        const randomPlayer = alivePlayers[Math.floor(Math.random() * alivePlayers.length)];
        this.state.launchPlayer = randomPlayer;

        // Position ball at player's paddle
        const paddle = this.getPaddleRect(randomPlayer);
        let ballX, ballY;

        if (randomPlayer.side === 'bottom') {
            ballX = randomPlayer.position;
            ballY = paddle.y - cfg.ballRadius - 2;
        } else if (randomPlayer.side === 'top') {
            ballX = randomPlayer.position;
            ballY = paddle.y + paddle.height + cfg.ballRadius + 2;
        } else if (randomPlayer.side === 'left') {
            ballX = paddle.x + paddle.width + cfg.ballRadius + 2;
            ballY = randomPlayer.position;
        } else {
            ballX = paddle.x - cfg.ballRadius - 2;
            ballY = randomPlayer.position;
        }

        this.state.ball = {
            x: ballX,
            y: ballY,
            vx: 0,
            vy: 0,
            radius: cfg.ballRadius,
            speed: cfg.initialBallSpeed
        };
    },

    /**
     * Launch the ball
     */
    launchBall() {
        if (this.state.isLaunched || !this.state.isRunning) return;

        const player = this.state.launchPlayer;
        const ball = this.state.ball;

        // Set velocity based on which side the player is on
        let angle;
        if (player.side === 'bottom') {
            angle = -Math.PI / 2 + (Math.random() - 0.5) * 0.8;
        } else if (player.side === 'top') {
            angle = Math.PI / 2 + (Math.random() - 0.5) * 0.8;
        } else if (player.side === 'left') {
            angle = (Math.random() - 0.5) * 0.8;
        } else {
            angle = Math.PI + (Math.random() - 0.5) * 0.8;
        }

        ball.vx = Math.cos(angle) * ball.speed;
        ball.vy = Math.sin(angle) * ball.speed;

        this.state.isLaunched = true;
        this.elements.launchOverlay.classList.remove('visible');
    },

    /**
     * Setup touch zones for each player
     */
    setupTouchZones() {
        this.elements.touchZones.innerHTML = '';

        this.state.players.forEach((player, index) => {
            const zone = document.createElement('div');
            zone.className = `touch-zone ${player.side}`;
            zone.dataset.playerIndex = index;

            zone.addEventListener('touchstart', (e) => this.handleTouchStart(e, index), { passive: false });
            zone.addEventListener('touchmove', (e) => this.handleTouchMove(e, index), { passive: false });
            zone.addEventListener('touchend', (e) => this.handleTouchEnd(e, index), { passive: false });

            this.elements.touchZones.appendChild(zone);
        });
    },

    /**
     * Handle touch start
     */
    handleTouchStart(e, playerIndex) {
        e.preventDefault();

        // Launch ball if not launched and this is the launch player
        if (!this.state.isLaunched && this.state.launchPlayer.index === playerIndex) {
            this.launchBall();
        }

        const player = this.state.players[playerIndex];

        for (let i = 0; i < e.changedTouches.length; i++) {
            const touch = e.changedTouches[i];
            if (player.touchId === undefined || player.touchId === null) {
                player.touchId = touch.identifier;
                player.lastTouch = {
                    x: touch.clientX,
                    y: touch.clientY
                };
                break;
            }
        }
    },

    /**
     * Handle touch move
     */
    handleTouchMove(e, playerIndex) {
        e.preventDefault();
        const player = this.state.players[playerIndex];
        if (player.touchId === undefined || player.touchId === null) return;

        let touch = null;
        for (let i = 0; i < e.changedTouches.length; i++) {
            if (e.changedTouches[i].identifier === player.touchId) {
                touch = e.changedTouches[i];
                break;
            }
        }

        if (!touch || !player.lastTouch) return;

        const deltaX = touch.clientX - player.lastTouch.x;
        const deltaY = touch.clientY - player.lastTouch.y;

        if (player.side === 'top' || player.side === 'bottom') {
            player.position += deltaX * 1.5;
        } else {
            player.position += deltaY * 1.5;
        }

        const halfPaddle = player.paddleWidth / 2;
        player.position = Math.max(halfPaddle + this.config.wallThickness,
            Math.min(this.canvas.width - halfPaddle - this.config.wallThickness, player.position));

        player.lastTouch = { x: touch.clientX, y: touch.clientY };

        // Move ball with paddle if not launched
        if (!this.state.isLaunched && this.state.launchPlayer.index === playerIndex) {
            if (player.side === 'top' || player.side === 'bottom') {
                this.state.ball.x = player.position;
            } else {
                this.state.ball.y = player.position;
            }
        }
    },

    /**
     * Handle touch end
     */
    handleTouchEnd(e, playerIndex) {
        const player = this.state.players[playerIndex];

        for (let i = 0; i < e.changedTouches.length; i++) {
            if (e.changedTouches[i].identifier === player.touchId) {
                player.touchId = null;
                player.lastTouch = null;
                break;
            }
        }
    },

    /**
     * Handle keyboard input
     */
    handleKeyDown(e) {
        if (!this.state.isRunning) return;

        const keyMap = {
            'ArrowLeft': { player: 0, dir: 'left' },
            'ArrowRight': { player: 0, dir: 'right' },
            'a': { player: 0, dir: 'left' },
            'd': { player: 0, dir: 'right' },
            'j': { player: 1, dir: 'left' },
            'l': { player: 1, dir: 'right' },
            'w': { player: 2, dir: 'left' },
            's': { player: 2, dir: 'right' },
            'i': { player: 3, dir: 'left' },
            'k': { player: 3, dir: 'right' },
            ' ': { action: 'launch' },
            'Enter': { action: 'launch' },
            'Escape': { action: 'pause' }
        };

        const action = keyMap[e.key];
        if (!action) return;

        if (action.action === 'pause') {
            this.togglePause();
            return;
        }

        if (action.action === 'launch') {
            this.launchBall();
            return;
        }

        const player = this.state.players[action.player];
        if (!player || player.lives <= 0) return;

        if (action.dir === 'left') {
            player.isMovingLeft = true;
        } else {
            player.isMovingRight = true;
        }
    },

    handleKeyUp(e) {
        if (!this.state.isRunning) return;

        const keyMap = {
            'ArrowLeft': { player: 0, dir: 'left' },
            'ArrowRight': { player: 0, dir: 'right' },
            'a': { player: 0, dir: 'left' },
            'd': { player: 0, dir: 'right' },
            'j': { player: 1, dir: 'left' },
            'l': { player: 1, dir: 'right' },
            'w': { player: 2, dir: 'left' },
            's': { player: 2, dir: 'right' },
            'i': { player: 3, dir: 'left' },
            'k': { player: 3, dir: 'right' }
        };

        const action = keyMap[e.key];
        if (!action) return;

        const player = this.state.players[action.player];
        if (!player) return;

        if (action.dir === 'left') {
            player.isMovingLeft = false;
        } else {
            player.isMovingRight = false;
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
        this.updatePaddles();
        if (this.state.isLaunched) {
            this.updateBall();
            this.checkCollisions();
        }
        this.checkGameEnd();
    },

    /**
     * Update paddle positions from keyboard
     */
    updatePaddles() {
        const speed = 8;

        this.state.players.forEach(player => {
            if (player.lives <= 0) return;

            let delta = 0;
            if (player.isMovingLeft) delta -= speed;
            if (player.isMovingRight) delta += speed;

            if (delta !== 0) {
                player.position += delta;
                const halfPaddle = player.paddleWidth / 2;
                player.position = Math.max(halfPaddle + this.config.wallThickness,
                    Math.min(this.canvas.width - halfPaddle - this.config.wallThickness, player.position));

                // Move ball with paddle if not launched
                if (!this.state.isLaunched && this.state.launchPlayer.index === player.index) {
                    if (player.side === 'top' || player.side === 'bottom') {
                        this.state.ball.x = player.position;
                    } else {
                        this.state.ball.y = player.position;
                    }
                }
            }
        });
    },

    /**
     * Update ball position
     */
    updateBall() {
        const ball = this.state.ball;
        ball.x += ball.vx;
        ball.y += ball.vy;
    },

    /**
     * Check all collisions
     */
    checkCollisions() {
        this.checkWallCollisions();
        this.checkPaddleCollisions();
        this.checkBlockCollisions();
    },

    /**
     * Check wall collisions
     */
    checkWallCollisions() {
        const ball = this.state.ball;
        const size = this.canvas.width;
        const wall = this.config.wallThickness;

        const sides = ['top', 'right', 'bottom', 'left'];

        sides.forEach(side => {
            const hasPlayer = this.state.activeSides.includes(side);
            if (hasPlayer) return;

            if (side === 'top' && ball.y - ball.radius < wall) {
                ball.y = wall + ball.radius;
                ball.vy = Math.abs(ball.vy);
            } else if (side === 'bottom' && ball.y + ball.radius > size - wall) {
                ball.y = size - wall - ball.radius;
                ball.vy = -Math.abs(ball.vy);
            } else if (side === 'left' && ball.x - ball.radius < wall) {
                ball.x = wall + ball.radius;
                ball.vx = Math.abs(ball.vx);
            } else if (side === 'right' && ball.x + ball.radius > size - wall) {
                ball.x = size - wall - ball.radius;
                ball.vx = -Math.abs(ball.vx);
            }
        });
    },

    /**
     * Check paddle collisions
     */
    checkPaddleCollisions() {
        const ball = this.state.ball;
        const size = this.canvas.width;
        const paddleThickness = this.config.paddleThickness;

        this.state.players.forEach(player => {
            if (player.lives <= 0) return;

            const paddle = this.getPaddleRect(player);

            let hitPaddle = false;
            let missedPaddle = false;

            if (player.side === 'bottom') {
                if (ball.y + ball.radius > size - paddleThickness) {
                    if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
                        hitPaddle = true;
                        ball.y = size - paddleThickness - ball.radius;
                        ball.vy = -Math.abs(ball.vy);
                    } else if (ball.y > size) {
                        missedPaddle = true;
                    }
                }
            } else if (player.side === 'top') {
                if (ball.y - ball.radius < paddleThickness) {
                    if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
                        hitPaddle = true;
                        ball.y = paddleThickness + ball.radius;
                        ball.vy = Math.abs(ball.vy);
                    } else if (ball.y < 0) {
                        missedPaddle = true;
                    }
                }
            } else if (player.side === 'left') {
                if (ball.x - ball.radius < paddleThickness) {
                    if (ball.y > paddle.y && ball.y < paddle.y + paddle.height) {
                        hitPaddle = true;
                        ball.x = paddleThickness + ball.radius;
                        ball.vx = Math.abs(ball.vx);
                    } else if (ball.x < 0) {
                        missedPaddle = true;
                    }
                }
            } else if (player.side === 'right') {
                if (ball.x + ball.radius > size - paddleThickness) {
                    if (ball.y > paddle.y && ball.y < paddle.y + paddle.height) {
                        hitPaddle = true;
                        ball.x = size - paddleThickness - ball.radius;
                        ball.vx = -Math.abs(ball.vx);
                    } else if (ball.x > size) {
                        missedPaddle = true;
                    }
                }
            }

            if (hitPaddle) {
                this.addPaddleSpin(player, paddle);
            }

            if (missedPaddle) {
                this.playerLoseLife(player);
            }
        });
    },

    /**
     * Get paddle rectangle
     */
    getPaddleRect(player) {
        const size = this.canvas.width;
        const thickness = this.config.paddleThickness;
        const halfWidth = player.paddleWidth / 2;

        if (player.side === 'bottom') {
            return {
                x: player.position - halfWidth,
                y: size - thickness,
                width: player.paddleWidth,
                height: thickness
            };
        } else if (player.side === 'top') {
            return {
                x: player.position - halfWidth,
                y: 0,
                width: player.paddleWidth,
                height: thickness
            };
        } else if (player.side === 'left') {
            return {
                x: 0,
                y: player.position - halfWidth,
                width: thickness,
                height: player.paddleWidth
            };
        } else {
            return {
                x: size - thickness,
                y: player.position - halfWidth,
                width: thickness,
                height: player.paddleWidth
            };
        }
    },

    /**
     * Add spin based on where ball hit paddle
     */
    addPaddleSpin(player, paddle) {
        const ball = this.state.ball;

        if (player.side === 'top' || player.side === 'bottom') {
            const hitPos = (ball.x - paddle.x) / paddle.width - 0.5;
            ball.vx += hitPos * 3;
        } else {
            const hitPos = (ball.y - paddle.y) / paddle.height - 0.5;
            ball.vy += hitPos * 3;
        }

        const currentSpeed = Math.sqrt(ball.vx * ball.vx + ball.vy * ball.vy);
        ball.vx = (ball.vx / currentSpeed) * ball.speed;
        ball.vy = (ball.vy / currentSpeed) * ball.speed;
    },

    /**
     * Player loses a life
     */
    playerLoseLife(player) {
        player.lives--;

        // Slow down ball instead of growing paddle
        this.state.ball.speed = Math.max(
            this.config.initialBallSpeed,
            this.state.ball.speed - this.config.speedDecreaseOnDeath
        );

        this.updateHUD();

        // Reset ball to a random alive player's paddle
        this.resetBallToPaddle();
    },

    /**
     * Reset ball to a random alive player's paddle
     */
    resetBallToPaddle() {
        const alivePlayers = this.state.players.filter(p => p.lives > 0);
        if (alivePlayers.length === 0) return;

        const randomPlayer = alivePlayers[Math.floor(Math.random() * alivePlayers.length)];
        this.state.launchPlayer = randomPlayer;

        const cfg = this.config;
        const paddle = this.getPaddleRect(randomPlayer);
        let ballX, ballY;

        if (randomPlayer.side === 'bottom') {
            ballX = randomPlayer.position;
            ballY = paddle.y - cfg.ballRadius - 2;
        } else if (randomPlayer.side === 'top') {
            ballX = randomPlayer.position;
            ballY = paddle.y + paddle.height + cfg.ballRadius + 2;
        } else if (randomPlayer.side === 'left') {
            ballX = paddle.x + paddle.width + cfg.ballRadius + 2;
            ballY = randomPlayer.position;
        } else {
            ballX = paddle.x - cfg.ballRadius - 2;
            ballY = randomPlayer.position;
        }

        this.state.ball.x = ballX;
        this.state.ball.y = ballY;
        this.state.ball.vx = 0;
        this.state.ball.vy = 0;
        this.state.isLaunched = false;

        // Show launch overlay
        this.elements.launchOverlay.classList.add('visible');
        this.elements.launchPlayer.textContent = `P${randomPlayer.index + 1}`;
        this.elements.launchPlayer.style.color = randomPlayer.color;
    },

    /**
     * Check block collisions
     */
    checkBlockCollisions() {
        const ball = this.state.ball;

        this.state.blocks.forEach(block => {
            if (!block.alive) return;

            if (ball.x + ball.radius > block.x &&
                ball.x - ball.radius < block.x + block.width &&
                ball.y + ball.radius > block.y &&
                ball.y - ball.radius < block.y + block.height) {

                block.alive = false;
                this.state.blocksDestroyed++;

                const overlapLeft = (ball.x + ball.radius) - block.x;
                const overlapRight = (block.x + block.width) - (ball.x - ball.radius);
                const overlapTop = (ball.y + ball.radius) - block.y;
                const overlapBottom = (block.y + block.height) - (ball.y - ball.radius);

                const minOverlapX = Math.min(overlapLeft, overlapRight);
                const minOverlapY = Math.min(overlapTop, overlapBottom);

                if (minOverlapX < minOverlapY) {
                    ball.vx = -ball.vx;
                } else {
                    ball.vy = -ball.vy;
                }

                // Speed up ball faster
                this.state.ball.speed = Math.min(
                    this.config.maxBallSpeed,
                    this.state.ball.speed + this.config.speedIncreasePerBlock
                );

                const currentSpeed = Math.sqrt(ball.vx * ball.vx + ball.vy * ball.vy);
                ball.vx = (ball.vx / currentSpeed) * this.state.ball.speed;
                ball.vy = (ball.vy / currentSpeed) * this.state.ball.speed;

                // Shrink all living player paddles
                this.state.players.forEach(p => {
                    if (p.lives > 0) {
                        p.paddleWidth = Math.max(
                            this.config.minPaddleWidth,
                            p.paddleWidth - this.config.paddleShrinkPerBlock
                        );
                    }
                });
            }
        });
    },

    /**
     * Check if game should end
     */
    checkGameEnd() {
        const aliveBlocks = this.state.blocks.filter(b => b.alive).length;
        if (aliveBlocks === 0) {
            this.endGame(true);
            return;
        }

        const alivePlayers = this.state.players.filter(p => p.lives > 0).length;
        if (alivePlayers === 0) {
            this.endGame(false);
            return;
        }
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

        this.elements.gameoverIcon.textContent = victory ? '🎉' : '💥';
        this.elements.gameoverTitle.textContent = victory ? 'Victory!' : 'Game Over';
        this.elements.gameoverSubtitle.textContent = victory
            ? 'All blocks destroyed!'
            : 'Everyone ran out of lives!';

        this.elements.statBlocks.textContent = this.state.blocksDestroyed;
        this.elements.statTime.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;

        this.elements.survivorList.innerHTML = '';
        this.state.players.forEach((player, i) => {
            const item = document.createElement('div');
            item.className = `survivor-item player-${i + 1} ${player.lives <= 0 ? 'eliminated' : ''}`;
            item.innerHTML = `
                <span class="indicator"></span>
                <span class="name">P${i + 1}</span>
                <span class="status">${player.lives > 0 ? `${player.lives} ❤️` : 'Out'}</span>
            `;
            this.elements.survivorList.appendChild(item);
        });

        this.showScreen('gameover');
    },

    /**
     * Update HUD lives display
     */
    updateHUD() {
        this.elements.hudLives.innerHTML = '';

        this.state.players.forEach((player, i) => {
            const div = document.createElement('div');
            div.className = `player-lives player-${i + 1} ${player.lives <= 0 ? 'dead' : ''}`;

            let hearts = '';
            for (let j = 0; j < this.config.initialLives; j++) {
                hearts += j < player.lives ? '❤️' : '🖤';
            }

            div.innerHTML = `
                <span class="player-indicator"></span>
                <span class="hearts">${hearts}</span>
            `;

            this.elements.hudLives.appendChild(div);
        });
    },

    /**
     * Render the game
     */
    render() {
        const ctx = this.ctx;
        const size = this.canvas.width;

        ctx.fillStyle = '#1a1a2e';
        ctx.fillRect(0, 0, size, size);

        this.renderWalls();
        this.renderBlocks();
        this.renderPaddles();
        this.renderBall();
    },

    /**
     * Render walls
     */
    renderWalls() {
        const ctx = this.ctx;
        const size = this.canvas.width;
        const wall = this.config.wallThickness;

        ctx.fillStyle = this.config.colors.wall;

        const sides = ['top', 'right', 'bottom', 'left'];
        sides.forEach(side => {
            if (this.state.activeSides.includes(side)) return;

            if (side === 'top') {
                ctx.fillRect(0, 0, size, wall);
            } else if (side === 'bottom') {
                ctx.fillRect(0, size - wall, size, wall);
            } else if (side === 'left') {
                ctx.fillRect(0, 0, wall, size);
            } else if (side === 'right') {
                ctx.fillRect(size - wall, 0, wall, size);
            }
        });
    },

    /**
     * Render blocks
     */
    renderBlocks() {
        const ctx = this.ctx;

        this.state.blocks.forEach(block => {
            if (!block.alive) return;

            ctx.fillStyle = block.color;
            ctx.fillRect(block.x, block.y, block.width, block.height);

            ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.fillRect(block.x, block.y, block.width, 3);
            ctx.fillRect(block.x, block.y, 3, block.height);
        });
    },

    /**
     * Render paddles
     */
    renderPaddles() {
        const ctx = this.ctx;

        this.state.players.forEach(player => {
            if (player.lives <= 0) return;

            const paddle = this.getPaddleRect(player);

            ctx.fillStyle = player.color;
            ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);

            ctx.beginPath();
            if (player.side === 'top' || player.side === 'bottom') {
                ctx.arc(paddle.x, paddle.y + paddle.height / 2, paddle.height / 2, 0, Math.PI * 2);
                ctx.arc(paddle.x + paddle.width, paddle.y + paddle.height / 2, paddle.height / 2, 0, Math.PI * 2);
            } else {
                ctx.arc(paddle.x + paddle.width / 2, paddle.y, paddle.width / 2, 0, Math.PI * 2);
                ctx.arc(paddle.x + paddle.width / 2, paddle.y + paddle.height, paddle.width / 2, 0, Math.PI * 2);
            }
            ctx.fill();
        });
    },

    /**
     * Render ball
     */
    renderBall() {
        const ctx = this.ctx;
        const ball = this.state.ball;

        ctx.fillStyle = this.config.colors.ball;
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowColor = this.config.colors.ball;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
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
