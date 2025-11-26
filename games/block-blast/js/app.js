/**
 * Block Blast - Multiplayer Paddle Game
 * Main Game Logic
 */

const Game = {
    // Game configuration
    config: {
        initialBallSpeed: 4,
        maxBallSpeed: 12,
        speedIncreasePerBlock: 0.05,
        initialPaddleWidth: 80,
        minPaddleWidth: 40,
        paddleShrinkPerBlock: 0.5,
        paddleGrowthOnDeath: 20,
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

    // Game state
    state: {
        currentScreen: 'welcome',
        playerCount: 2,
        activeSides: ['bottom', 'top'],
        players: [],
        blocks: [],
        ball: null,
        isPaused: false,
        isRunning: false,
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
            positionSlots: document.querySelectorAll('.position-slot'),
            hudLives: document.getElementById('hud-lives'),
            pauseOverlay: document.getElementById('pause-overlay'),
            pauseIcon: document.getElementById('pause-icon'),
            touchZones: document.getElementById('touch-zones'),
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
            // Can't remove if it would leave us with fewer than playerCount
            if (this.state.activeSides.length > 1) {
                this.state.activeSides.splice(index, 1);
            }
        } else {
            // Can't add more than playerCount
            if (this.state.activeSides.length < this.state.playerCount) {
                this.state.activeSides.push(side);
            } else {
                // Replace oldest
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
        const sides = ['top', 'right', 'bottom', 'left'];
        const playerColors = ['player-1', 'player-2', 'player-3', 'player-4'];

        this.elements.positionSlots.forEach(slot => {
            const side = slot.dataset.side;
            const isActive = this.state.activeSides.includes(side);
            const playerIndex = this.state.activeSides.indexOf(side);

            // Remove all player classes
            slot.classList.remove('active', 'wall', ...playerColors);

            if (isActive) {
                slot.classList.add('active', playerColors[playerIndex]);
                slot.querySelector('.position-player').textContent = `P${playerIndex + 1}`;
            } else {
                slot.classList.add('wall');
                slot.querySelector('.position-player').textContent = '';
                slot.querySelector('.position-label').textContent = 'Wall';
            }

            // Reset label for active slots
            if (isActive) {
                slot.querySelector('.position-label').textContent = side.charAt(0).toUpperCase() + side.slice(1);
            }
        });
    },

    /**
     * Start the game
     */
    startGame() {
        // Ensure we have enough sides selected
        while (this.state.activeSides.length < this.state.playerCount) {
            const available = ['top', 'right', 'bottom', 'left'].filter(
                s => !this.state.activeSides.includes(s)
            );
            if (available.length > 0) {
                this.state.activeSides.push(available[0]);
            }
        }

        this.showScreen('game');

        // Small delay to ensure screen is visible
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
        this.createBall();
        this.setupTouchZones();
        this.updateHUD();

        this.state.isPaused = false;
        this.state.isRunning = true;
        this.state.startTime = Date.now();
        this.state.blocksDestroyed = 0;

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
                position: size / 2, // Center position along the paddle's axis
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

        const blockAreaSize = size * 0.5;
        const startX = (size - blockAreaSize) / 2;
        const startY = (size - blockAreaSize) / 2;

        const blockWidth = (blockAreaSize - (cfg.blockCols + 1) * cfg.blockPadding) / cfg.blockCols;
        const blockHeight = (blockAreaSize - (cfg.blockRows + 1) * cfg.blockPadding) / cfg.blockRows;

        for (let row = 0; row < cfg.blockRows; row++) {
            for (let col = 0; col < cfg.blockCols; col++) {
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
     * Create the ball
     */
    createBall() {
        const size = this.canvas.width;
        const angle = Math.random() * Math.PI * 2;

        this.state.ball = {
            x: size / 2,
            y: size / 2,
            vx: Math.cos(angle) * this.config.initialBallSpeed,
            vy: Math.sin(angle) * this.config.initialBallSpeed,
            radius: this.config.ballRadius,
            speed: this.config.initialBallSpeed
        };
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

            zone.addEventListener('touchstart', (e) => this.handleTouchStart(e, index));
            zone.addEventListener('touchmove', (e) => this.handleTouchMove(e, index));
            zone.addEventListener('touchend', (e) => this.handleTouchEnd(e, index));

            this.elements.touchZones.appendChild(zone);
        });
    },

    /**
     * Handle touch start
     */
    handleTouchStart(e, playerIndex) {
        e.preventDefault();
        const player = this.state.players[playerIndex];

        // Get the new touch(es) from changedTouches
        for (let i = 0; i < e.changedTouches.length; i++) {
            const touch = e.changedTouches[i];
            // Only track if this player doesn't already have a touch
            if (!player.touchId) {
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

        // Find the specific touch by identifier
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

        // Move based on side orientation
        if (player.side === 'top' || player.side === 'bottom') {
            player.position += deltaX * 1.5;
        } else {
            player.position += deltaY * 1.5;
        }

        // Clamp position
        const halfPaddle = player.paddleWidth / 2;
        player.position = Math.max(halfPaddle + this.config.wallThickness,
            Math.min(this.canvas.width - halfPaddle - this.config.wallThickness, player.position));

        player.lastTouch = { x: touch.clientX, y: touch.clientY };
    },

    /**
     * Handle touch end
     */
    handleTouchEnd(e, playerIndex) {
        const player = this.state.players[playerIndex];

        // Check if our tracked touch ended
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

        // Player 1 (bottom): A/D or Left/Right
        // Player 2 (top): J/L
        // Player 3 (left): W/S
        // Player 4 (right): I/K

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
            ' ': { action: 'pause' },
            'Escape': { action: 'pause' }
        };

        const action = keyMap[e.key];
        if (!action) return;

        if (action.action === 'pause') {
            this.togglePause();
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
        this.updateBall();
        this.checkCollisions();
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
            if (hasPlayer) return; // Will be handled by paddle collision

            // Check wall collision
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

            // Check if ball is in paddle zone
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
                // Add some angle based on where it hit the paddle
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

        // Normalize speed
        const currentSpeed = Math.sqrt(ball.vx * ball.vx + ball.vy * ball.vy);
        ball.vx = (ball.vx / currentSpeed) * ball.speed;
        ball.vy = (ball.vy / currentSpeed) * ball.speed;
    },

    /**
     * Player loses a life
     */
    playerLoseLife(player) {
        player.lives--;

        // Grow paddle as consolation
        player.paddleWidth = Math.min(150, player.paddleWidth + this.config.paddleGrowthOnDeath);

        this.updateHUD();

        // Reset ball to center
        this.resetBall();
    },

    /**
     * Reset ball to center
     */
    resetBall() {
        const size = this.canvas.width;
        const angle = Math.random() * Math.PI * 2;

        this.state.ball.x = size / 2;
        this.state.ball.y = size / 2;
        this.state.ball.vx = Math.cos(angle) * this.state.ball.speed;
        this.state.ball.vy = Math.sin(angle) * this.state.ball.speed;
    },

    /**
     * Check block collisions
     */
    checkBlockCollisions() {
        const ball = this.state.ball;

        this.state.blocks.forEach(block => {
            if (!block.alive) return;

            // Simple AABB collision
            if (ball.x + ball.radius > block.x &&
                ball.x - ball.radius < block.x + block.width &&
                ball.y + ball.radius > block.y &&
                ball.y - ball.radius < block.y + block.height) {

                block.alive = false;
                this.state.blocksDestroyed++;

                // Determine bounce direction
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

                // Speed up ball
                this.state.ball.speed = Math.min(
                    this.config.maxBallSpeed,
                    this.state.ball.speed + this.config.speedIncreasePerBlock
                );

                // Normalize velocity to new speed
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
        // Victory: all blocks destroyed
        const aliveBlocks = this.state.blocks.filter(b => b.alive).length;
        if (aliveBlocks === 0) {
            this.endGame(true);
            return;
        }

        // Defeat: all players dead
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

        // Update UI
        this.elements.gameoverIcon.textContent = victory ? '🎉' : '💥';
        this.elements.gameoverTitle.textContent = victory ? 'Victory!' : 'Game Over';
        this.elements.gameoverSubtitle.textContent = victory
            ? 'All blocks destroyed!'
            : 'Everyone ran out of lives!';

        this.elements.statBlocks.textContent = this.state.blocksDestroyed;
        this.elements.statTime.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;

        // Build survivor list
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

        // Clear
        ctx.fillStyle = '#1a1a2e';
        ctx.fillRect(0, 0, size, size);

        // Draw walls
        this.renderWalls();

        // Draw blocks
        this.renderBlocks();

        // Draw paddles
        this.renderPaddles();

        // Draw ball
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

            // Add slight 3D effect
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

            // Rounded ends
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

        // Glow effect
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
