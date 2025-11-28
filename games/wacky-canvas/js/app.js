/**
 * Wacky Canvas - Transformed Drawing Game
 * Main Game Logic
 */

const Game = {
    // Game State
    state: {
        currentScreen: 'welcome',
        playerCount: 4,
        selectedCategories: [],
        currentPlayerIndex: 0,
        currentWord: null,
        currentTransform: null,
        usedWords: [],
        // Drawings storage
        drawings: [], // {player, word, transform, strokes, imageData}
        // Guessing state
        guessIndex: 0,
        score: 0,
        // Drawing state
        strokes: [],
        currentStroke: null,
        canvasWidth: 0,
        canvasHeight: 0,
        isDrawing: false,
        rotationAngle: 0,
        rotationInterval: null,
        // Timers
        drawTime: 45,
        guessTime: 30,
        timeRemaining: 0,
        timerInterval: null
    },

    // Canvas
    canvas: null,
    ctx: null,
    displayCanvas: null,
    displayCtx: null,
    renderScale: 1,
    canvasResizeFrame: null,

    // DOM Elements
    elements: {},

    /**
     * Initialize the game
     */
    init() {
        this.cacheElements();
        this.renderCategories();
        this.setupPlayerCount();
        this.showScreen('welcome');
        window.addEventListener('resize', () => this.handleResize());
    },

    /**
     * Cache DOM elements
     */
    cacheElements() {
        this.elements = {
            screens: {
                welcome: document.getElementById('screen-welcome'),
                setup: document.getElementById('screen-setup'),
                pass: document.getElementById('screen-pass'),
                word: document.getElementById('screen-word'),
                draw: document.getElementById('screen-draw'),
                guessIntro: document.getElementById('screen-guess-intro'),
                guess: document.getElementById('screen-guess'),
                answer: document.getElementById('screen-answer'),
                results: document.getElementById('screen-results')
            },
            // Pass screen
            passPlayerName: document.getElementById('pass-player-name'),
            passRoundInfo: document.getElementById('pass-round-info'),
            // Word screen
            wordText: document.getElementById('word-text'),
            transformEmoji: document.getElementById('transform-emoji'),
            transformName: document.getElementById('transform-name'),
            transformDesc: document.getElementById('transform-desc'),
            // Draw screen
            drawPlayer: document.getElementById('draw-player'),
            drawTransform: document.getElementById('draw-transform'),
            drawTimer: document.getElementById('draw-timer'),
            canvasMessage: document.getElementById('canvas-message'),
            undoBtn: document.getElementById('undo-btn'),
            canvasContainer: document.querySelector('.canvas-container'),
            // Guess intro
            drawingsCount: document.getElementById('drawings-count'),
            // Guess screen
            guessArtist: document.getElementById('guess-artist'),
            guessTransform: document.getElementById('guess-transform'),
            guessTimer: document.getElementById('guess-timer'),
            // Answer screen
            answerIcon: document.getElementById('answer-icon'),
            answerTitle: document.getElementById('answer-title'),
            answerWord: document.getElementById('answer-word'),
            answerArtist: document.getElementById('answer-artist'),
            answerTransform: document.getElementById('answer-transform'),
            scoreText: document.getElementById('score-text'),
            nextGuessBtn: document.getElementById('next-guess-btn'),
            // Results
            resultsCorrect: document.getElementById('results-correct'),
            resultsTotal: document.getElementById('results-total'),
            resultsGrid: document.getElementById('results-grid')
        };

        // Canvas elements
        this.canvas = document.getElementById('draw-canvas');
        this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
        this.displayCanvas = document.getElementById('display-canvas');
        this.displayCtx = this.displayCanvas ? this.displayCanvas.getContext('2d') : null;
    },

    /**
     * Setup player count buttons
     */
    setupPlayerCount() {
        document.querySelectorAll('.count-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.count-btn').forEach(b => b.classList.remove('selected'));
                e.target.classList.add('selected');
                this.state.playerCount = parseInt(e.target.dataset.count);
            });
        });
    },

    /**
     * Show a specific screen
     */
    showScreen(screenName) {
        Object.values(this.elements.screens).forEach(screen => {
            if (screen) screen.classList.remove('active');
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
     * Navigation
     */
    showWelcome() {
        this.resetGame();
        this.showScreen('welcome');
    },

    showSetup() {
        this.showScreen('setup');
    },

    /**
     * Render category selection
     */
    renderCategories() {
        const grid = document.getElementById('category-grid');
        if (!grid) return;

        grid.innerHTML = '';

        Object.entries(PROMPTS).forEach(([id, category]) => {
            const option = document.createElement('div');
            option.className = 'category-option';
            option.dataset.categoryId = id;
            option.innerHTML = `
                <div class="category-emoji">${category.emoji}</div>
                <div class="category-name">${category.name}</div>
            `;
            option.addEventListener('click', () => this.toggleCategory(id));
            grid.appendChild(option);
        });
    },

    /**
     * Toggle category selection
     */
    toggleCategory(categoryId) {
        const index = this.state.selectedCategories.indexOf(categoryId);
        if (index > -1) {
            this.state.selectedCategories.splice(index, 1);
        } else {
            this.state.selectedCategories.push(categoryId);
        }
        this.updateCategoryUI();
    },

    /**
     * Update category UI
     */
    updateCategoryUI() {
        document.querySelectorAll('.category-option').forEach(option => {
            const id = option.dataset.categoryId;
            if (this.state.selectedCategories.includes(id)) {
                option.classList.add('selected');
            } else {
                option.classList.remove('selected');
            }
        });
    },

    /**
     * Start the game
     */
    startGame() {
        // Default to all categories if none selected
        if (this.state.selectedCategories.length === 0) {
            this.state.selectedCategories = Object.keys(PROMPTS);
            this.updateCategoryUI();
        }

        // Reset game state
        this.state.drawings = [];
        this.state.usedWords = [];
        this.state.currentPlayerIndex = 0;
        this.state.score = 0;

        // Start first player's turn
        this.showPassScreen();
    },

    /**
     * Show pass device screen
     */
    showPassScreen() {
        const playerNum = this.state.currentPlayerIndex + 1;
        this.elements.passPlayerName.textContent = `Player ${playerNum}`;
        this.elements.passRoundInfo.textContent = `Drawing ${playerNum} of ${this.state.playerCount}`;

        this.showScreen('pass');
    },

    /**
     * Pick a random word
     */
    pickWord() {
        let availableWords = [];

        this.state.selectedCategories.forEach(categoryId => {
            const category = PROMPTS[categoryId];
            if (category) {
                category.items.forEach(word => {
                    if (!this.state.usedWords.includes(word)) {
                        availableWords.push(word);
                    }
                });
            }
        });

        // Reset if all words used
        if (availableWords.length === 0) {
            this.state.usedWords = [];
            return this.pickWord();
        }

        const word = availableWords[Math.floor(Math.random() * availableWords.length)];
        this.state.usedWords.push(word);
        return word;
    },

    /**
     * Pick a random transformation
     */
    pickTransform() {
        const transforms = Object.keys(TRANSFORMATIONS);
        return transforms[Math.floor(Math.random() * transforms.length)];
    },

    /**
     * Show word to artist
     */
    showWord() {
        this.state.currentWord = this.pickWord();
        this.state.currentTransform = this.pickTransform();

        const transform = TRANSFORMATIONS[this.state.currentTransform];

        this.elements.wordText.textContent = this.state.currentWord;
        this.elements.transformEmoji.textContent = transform.emoji;
        this.elements.transformName.textContent = transform.name;
        this.elements.transformDesc.textContent = transform.description;

        this.showScreen('word');
    },

    /**
     * Start drawing phase
     */
    startDrawing() {
        // Reset drawing state
        this.state.strokes = [];
        this.state.currentStroke = null;
        this.state.isDrawing = false;
        this.state.rotationAngle = 0;

        // Show drawing screen and setup canvas
        this.showScreen('draw');

        const playerNum = this.state.currentPlayerIndex + 1;
        const transform = TRANSFORMATIONS[this.state.currentTransform];
        this.elements.drawPlayer.textContent = `Player ${playerNum}`;
        this.elements.drawTransform.textContent = `${transform.emoji} ${transform.name}`;

        this.queueCanvasSetup(false);
        this.elements.undoBtn.disabled = true;

        // Start rotation for rotate mode
        if (this.state.currentTransform === 'rotate') {
            this.startRotation();
        }

        // Start timer
        this.state.timeRemaining = this.state.drawTime;
        this.updateTimerDisplay(this.elements.drawTimer);
        this.startTimer(() => this.finishDrawing());
    },

    /**
     * Start rotation for rotate mode
     */
    startRotation() {
        this.stopRotation();
        this.state.rotationInterval = setInterval(() => {
            this.state.rotationAngle += 2; // degrees per interval
            if (this.state.rotationAngle >= 360) {
                this.state.rotationAngle -= 360;
            }
            this.redrawCanvas();
        }, 100);
    },

    /**
     * Stop rotation
     */
    stopRotation() {
        if (this.state.rotationInterval) {
            clearInterval(this.state.rotationInterval);
            this.state.rotationInterval = null;
        }
    },

    /**
     * Queue canvas setup (for after layout)
     */
    queueCanvasSetup(restoreDrawing = false) {
        if (this.state.currentScreen !== 'draw' && this.state.currentScreen !== 'guess') return;

        if (this.canvasResizeFrame) {
            cancelAnimationFrame(this.canvasResizeFrame);
        }

        this.canvasResizeFrame = requestAnimationFrame(() => {
            this.canvasResizeFrame = null;
            this.setupCanvas(restoreDrawing);
        });
    },

    /**
     * Handle resize
     */
    handleResize() {
        if (this.state.currentScreen === 'draw') {
            this.queueCanvasSetup(true);
        }
    },

    /**
     * Setup canvas
     */
    setupCanvas(restoreDrawing = false) {
        if (!this.canvas || !this.ctx) return;

        const container = this.elements.canvasContainer;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        if (rect.width < 10 || rect.height < 10) {
            this.queueCanvasSetup(restoreDrawing);
            return;
        }

        const width = Math.floor(rect.width);
        const height = Math.floor(rect.height);
        const scale = window.devicePixelRatio || 1;

        this.renderScale = scale;
        this.state.canvasWidth = width;
        this.state.canvasHeight = height;

        this.canvas.style.width = `${width}px`;
        this.canvas.style.height = `${height}px`;
        this.canvas.width = Math.round(width * scale);
        this.canvas.height = Math.round(height * scale);

        // Setup context
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.scale(scale, scale);
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        this.ctx.lineWidth = 4;
        this.ctx.strokeStyle = '#1f2937';

        if (restoreDrawing && this.state.strokes.length > 0) {
            this.redrawCanvas();
        } else {
            this.resetCanvasSurface();
        }

        // Setup events
        this.setupCanvasEvents();
    },

    /**
     * Reset canvas surface
     */
    resetCanvasSurface() {
        if (!this.ctx || !this.canvas) return;
        const width = this.state.canvasWidth;
        const height = this.state.canvasHeight;
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(0, 0, width, height);
    },

    /**
     * Setup canvas events
     */
    setupCanvasEvents() {
        this.canvas.onpointerdown = (e) => this.handlePointerDown(e);
        this.canvas.onpointermove = (e) => this.handlePointerMove(e);
        this.canvas.onpointerup = (e) => this.handlePointerUp(e);
        this.canvas.onpointerleave = (e) => this.handlePointerUp(e);
    },

    /**
     * Transform a point based on current transformation
     */
    transformPoint(x, y) {
        const cx = this.state.canvasWidth / 2;
        const cy = this.state.canvasHeight / 2;

        switch (this.state.currentTransform) {
            case 'mirror':
                // Horizontal flip
                return { x: this.state.canvasWidth - x, y: y };

            case 'rotate':
                // Rotate around center
                const angle = this.state.rotationAngle * Math.PI / 180;
                const dx = x - cx;
                const dy = y - cy;
                const rotatedX = dx * Math.cos(-angle) - dy * Math.sin(-angle);
                const rotatedY = dx * Math.sin(-angle) + dy * Math.cos(-angle);
                return { x: rotatedX + cx, y: rotatedY + cy };

            case 'funhouse':
                // Wave distortion
                const waveAmplitude = 20;
                const waveFrequency = 0.02;
                const distortedX = x + Math.sin(y * waveFrequency) * waveAmplitude;
                const distortedY = y + Math.sin(x * waveFrequency) * waveAmplitude;
                return { x: distortedX, y: distortedY };

            case 'kaleidoscope':
                // Return original - we'll draw multiple copies
                return { x, y };

            default:
                return { x, y };
        }
    },

    /**
     * Handle pointer down
     */
    handlePointerDown(e) {
        e.preventDefault();
        this.state.isDrawing = true;

        const pos = this.getPointerPos(e);
        const transformed = this.transformPoint(pos.x, pos.y);

        this.state.currentStroke = {
            points: [{ original: pos, transformed: transformed }]
        };
    },

    /**
     * Handle pointer move
     */
    handlePointerMove(e) {
        if (!this.state.isDrawing || !this.state.currentStroke) return;

        e.preventDefault();

        const pos = this.getPointerPos(e);
        const transformed = this.transformPoint(pos.x, pos.y);

        this.state.currentStroke.points.push({ original: pos, transformed: transformed });

        // Draw the stroke
        this.redrawCanvas();
    },

    /**
     * Handle pointer up
     */
    handlePointerUp(e) {
        if (!this.state.isDrawing) return;

        e.preventDefault();
        this.state.isDrawing = false;

        if (this.state.currentStroke && this.state.currentStroke.points.length > 1) {
            this.state.strokes.push(this.state.currentStroke);
            this.elements.undoBtn.disabled = false;
        }

        this.state.currentStroke = null;
    },

    /**
     * Get pointer position
     */
    getPointerPos(e) {
        const rect = this.canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    },

    /**
     * Draw a stroke with transformation
     */
    drawStroke(stroke) {
        if (stroke.points.length < 2) return;

        const cx = this.state.canvasWidth / 2;
        const cy = this.state.canvasHeight / 2;

        if (this.state.currentTransform === 'kaleidoscope') {
            // Draw 4 mirrored versions
            for (let i = 0; i < 4; i++) {
                this.ctx.save();
                this.ctx.translate(cx, cy);
                this.ctx.rotate(i * Math.PI / 2);
                this.ctx.translate(-cx, -cy);

                // Draw normal
                this.drawStrokePath(stroke, false);

                // Draw mirrored
                this.ctx.save();
                this.ctx.translate(cx, 0);
                this.ctx.scale(-1, 1);
                this.ctx.translate(-cx, 0);
                this.drawStrokePath(stroke, false);
                this.ctx.restore();

                this.ctx.restore();
            }
        } else if (this.state.currentTransform === 'rotate') {
            // For rotate mode, draw with current rotation
            this.ctx.save();
            this.ctx.translate(cx, cy);
            this.ctx.rotate(this.state.rotationAngle * Math.PI / 180);
            this.ctx.translate(-cx, -cy);
            this.drawStrokePath(stroke, true);
            this.ctx.restore();
        } else {
            this.drawStrokePath(stroke, true);
        }
    },

    /**
     * Draw stroke path
     */
    drawStrokePath(stroke, useTransformed) {
        this.ctx.beginPath();

        const points = stroke.points;
        const firstPoint = useTransformed ? points[0].transformed : points[0].original;
        this.ctx.moveTo(firstPoint.x, firstPoint.y);

        for (let i = 1; i < points.length; i++) {
            const point = useTransformed ? points[i].transformed : points[i].original;
            this.ctx.lineTo(point.x, point.y);
        }

        this.ctx.stroke();
    },

    /**
     * Redraw canvas
     */
    redrawCanvas() {
        this.resetCanvasSurface();

        this.ctx.strokeStyle = '#1f2937';
        this.ctx.lineWidth = 4;

        // Draw all completed strokes
        this.state.strokes.forEach(stroke => {
            this.drawStroke(stroke);
        });

        // Draw current stroke
        if (this.state.currentStroke && this.state.currentStroke.points.length > 1) {
            this.drawStroke(this.state.currentStroke);
        }
    },

    /**
     * Show canvas message
     */
    showCanvasMessage(msg) {
        this.elements.canvasMessage.textContent = msg;
        this.elements.canvasMessage.classList.add('visible');

        setTimeout(() => {
            this.elements.canvasMessage.classList.remove('visible');
        }, 1500);
    },

    /**
     * Undo last stroke
     */
    undoStroke() {
        if (this.state.strokes.length === 0) return;

        this.state.strokes.pop();
        this.redrawCanvas();
        this.elements.undoBtn.disabled = this.state.strokes.length === 0;
    },

    /**
     * Clear canvas
     */
    clearCanvas() {
        this.state.strokes = [];
        this.resetCanvasSurface();
        this.elements.undoBtn.disabled = true;
    },

    /**
     * Finish drawing
     */
    finishDrawing() {
        this.stopTimer();
        this.stopRotation();

        // For kaleidoscope and rotate, we need to save the final visual state
        // Temporarily disable rotation and redraw to get clean output
        const savedAngle = this.state.rotationAngle;
        if (this.state.currentTransform === 'rotate') {
            this.state.rotationAngle = savedAngle; // Keep final angle
        }
        this.redrawCanvas();

        // Save the drawing
        const imageData = this.canvas.toDataURL('image/png');

        this.state.drawings.push({
            player: this.state.currentPlayerIndex + 1,
            word: this.state.currentWord,
            transform: this.state.currentTransform,
            strokes: JSON.parse(JSON.stringify(this.state.strokes)),
            imageData: imageData,
            guessed: false
        });

        // Move to next player or start guessing
        this.state.currentPlayerIndex++;

        if (this.state.currentPlayerIndex < this.state.playerCount) {
            this.showPassScreen();
        } else {
            this.showGuessIntro();
        }
    },

    /**
     * Show guess intro screen
     */
    showGuessIntro() {
        this.elements.drawingsCount.textContent = this.state.drawings.length;
        this.showScreen('guessIntro');
    },

    /**
     * Start guessing phase
     */
    startGuessing() {
        this.state.guessIndex = 0;
        this.state.score = 0;
        this.showNextGuess();
    },

    /**
     * Show next guess
     */
    showNextGuess() {
        if (this.state.guessIndex >= this.state.drawings.length) {
            this.showResults();
            return;
        }

        const drawing = this.state.drawings[this.state.guessIndex];
        const transform = TRANSFORMATIONS[drawing.transform];

        this.elements.guessArtist.textContent = `Player ${drawing.player}'s drawing`;
        this.elements.guessTransform.textContent = `${transform.emoji} ${transform.name}`;

        // Setup display canvas
        this.showScreen('guess');
        this.setupDisplayCanvas(drawing.imageData);

        // Start timer
        this.state.timeRemaining = this.state.guessTime;
        this.updateTimerDisplay(this.elements.guessTimer);
        this.startTimer(() => this.markWrong());
    },

    /**
     * Setup display canvas with saved image
     */
    setupDisplayCanvas(imageData) {
        if (!this.displayCanvas || !this.displayCtx) return;

        const container = document.querySelector('.canvas-display');
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const size = Math.min(rect.width, rect.height);

        this.displayCanvas.style.width = `${size}px`;
        this.displayCanvas.style.height = `${size}px`;
        this.displayCanvas.width = size * (window.devicePixelRatio || 1);
        this.displayCanvas.height = size * (window.devicePixelRatio || 1);

        const img = new Image();
        img.onload = () => {
            const scale = window.devicePixelRatio || 1;
            this.displayCtx.setTransform(1, 0, 0, 1, 0, 0);
            this.displayCtx.scale(scale, scale);
            this.displayCtx.drawImage(img, 0, 0, size, size);
        };
        img.src = imageData;
    },

    /**
     * Start timer
     */
    startTimer(onTimeout) {
        this.stopTimer();

        this.state.timerInterval = setInterval(() => {
            this.state.timeRemaining--;
            const timerEl = this.state.currentScreen === 'draw'
                ? this.elements.drawTimer
                : this.elements.guessTimer;
            this.updateTimerDisplay(timerEl);

            if (this.state.timeRemaining <= 0) {
                this.stopTimer();
                if (onTimeout) onTimeout();
            }
        }, 1000);
    },

    /**
     * Stop timer
     */
    stopTimer() {
        if (this.state.timerInterval) {
            clearInterval(this.state.timerInterval);
            this.state.timerInterval = null;
        }
    },

    /**
     * Update timer display
     */
    updateTimerDisplay(element) {
        if (!element) return;

        const time = this.state.timeRemaining;
        element.textContent = time;

        element.classList.remove('warning', 'danger');
        if (time <= 5) {
            element.classList.add('danger');
        } else if (time <= 10) {
            element.classList.add('warning');
        }
    },

    /**
     * Mark correct guess
     */
    markCorrect() {
        this.stopTimer();
        this.state.score++;

        const drawing = this.state.drawings[this.state.guessIndex];
        drawing.guessed = true;

        this.showAnswerScreen(true, drawing);
    },

    /**
     * Mark wrong/skip
     */
    markWrong() {
        this.stopTimer();

        const drawing = this.state.drawings[this.state.guessIndex];
        drawing.guessed = false;

        this.showAnswerScreen(false, drawing);
    },

    /**
     * Show answer screen
     */
    showAnswerScreen(correct, drawing) {
        const transform = TRANSFORMATIONS[drawing.transform];

        this.elements.answerIcon.textContent = correct ? '🎉' : '😔';
        this.elements.answerTitle.textContent = correct ? 'Correct!' : 'Not quite!';
        this.elements.answerWord.textContent = drawing.word;
        this.elements.answerArtist.textContent = `Player ${drawing.player}`;
        this.elements.answerTransform.textContent = `using ${transform.name}`;
        this.elements.scoreText.textContent = `Score: ${this.state.score} / ${this.state.drawings.length}`;

        // Update button text
        if (this.state.guessIndex >= this.state.drawings.length - 1) {
            this.elements.nextGuessBtn.textContent = 'See Results';
        } else {
            this.elements.nextGuessBtn.textContent = 'Next Drawing';
        }

        this.showScreen('answer');
    },

    /**
     * Next guess
     */
    nextGuess() {
        this.state.guessIndex++;
        this.showNextGuess();
    },

    /**
     * Show results
     */
    showResults() {
        this.elements.resultsCorrect.textContent = this.state.score;
        this.elements.resultsTotal.textContent = this.state.drawings.length;

        // Build results grid
        this.elements.resultsGrid.innerHTML = '';

        this.state.drawings.forEach(drawing => {
            const transform = TRANSFORMATIONS[drawing.transform];

            const card = document.createElement('div');
            card.className = `result-card ${drawing.guessed ? 'correct' : 'wrong'}`;

            card.innerHTML = `
                <div class="result-thumb">
                    <canvas></canvas>
                </div>
                <div class="result-info">
                    <div class="result-word">${drawing.word}</div>
                    <div class="result-meta">Player ${drawing.player} - ${transform.name}</div>
                </div>
                <div class="result-status">${drawing.guessed ? '✓' : '✗'}</div>
            `;

            // Load thumbnail
            const thumbCanvas = card.querySelector('canvas');
            const thumbCtx = thumbCanvas.getContext('2d');
            thumbCanvas.width = 60;
            thumbCanvas.height = 60;

            const img = new Image();
            img.onload = () => {
                thumbCtx.drawImage(img, 0, 0, 60, 60);
            };
            img.src = drawing.imageData;

            this.elements.resultsGrid.appendChild(card);
        });

        this.showScreen('results');
    },

    /**
     * Play again
     */
    playAgain() {
        this.resetGame();
        this.showScreen('setup');
    },

    /**
     * Reset game
     */
    resetGame() {
        this.stopTimer();
        this.stopRotation();

        this.state.drawings = [];
        this.state.usedWords = [];
        this.state.strokes = [];
        this.state.currentPlayerIndex = 0;
        this.state.guessIndex = 0;
        this.state.score = 0;
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => Game.init());

// Warn before leaving during active game
window.addEventListener('beforeunload', (e) => {
    if (Game.state.drawings.length > 0 || Game.state.timerInterval) {
        e.preventDefault();
        e.returnValue = '';
    }
});
