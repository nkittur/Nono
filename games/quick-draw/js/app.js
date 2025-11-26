/**
 * Quick Draw - Limited Stroke Drawing Game
 * Main Game Logic
 */

const Game = {
    // Game State
    state: {
        currentScreen: 'welcome',
        difficulty: 'medium',
        selectedCategories: [],
        targetScore: 15,
        score: 0,
        roundNumber: 0,
        currentWord: null,
        usedWords: [],
        // Drawing state
        strokes: [],
        currentStroke: null,
        strokeCount: 0,
        inkUsed: 0,
        maxStrokes: 7,
        maxInk: 1200,
        canvasWidth: 0,
        canvasHeight: 0,
        isDrawing: false,
        // Timers
        drawTime: 45,
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
        this.loadSettings();
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
                answer: document.getElementById('screen-answer'),
                victory: document.getElementById('screen-victory')
            },
            // Setup
            categoryGrid: document.getElementById('category-grid'),
            targetScore: document.getElementById('target-score'),
            difficultyBtns: document.querySelectorAll('.difficulty-options .btn-option'),
            // Pass
            passScore: document.getElementById('pass-score'),
            passTarget: document.getElementById('pass-target'),
            // Word
            wordText: document.getElementById('word-text'),
            previewStrokes: document.getElementById('preview-strokes'),
            previewTime: document.getElementById('preview-time'),
            // Draw
            strokeCount: document.getElementById('stroke-count'),
            inkFill: document.getElementById('ink-fill'),
            drawTimer: document.getElementById('draw-timer'),
            canvasMessage: document.getElementById('canvas-message'),
            undoBtn: document.getElementById('undo-btn'),
            canvasContainer: document.querySelector('.canvas-container'),
            // Answer
            answerIcon: document.getElementById('answer-icon'),
            answerTitle: document.getElementById('answer-title'),
            answerWord: document.getElementById('answer-word'),
            progressText: document.getElementById('progress-text'),
            progressFill: document.getElementById('progress-fill'),
            // Victory
            victoryScore: document.getElementById('victory-score'),
            victoryRounds: document.getElementById('victory-rounds')
        };

        // Canvas elements
        this.canvas = document.getElementById('draw-canvas');
        this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    },

    /**
     * Load saved settings
     */
    loadSettings() {
        try {
            const saved = localStorage.getItem('quick-draw-settings');
            if (saved) {
                const settings = JSON.parse(saved);
                if (settings.difficulty) {
                    this.state.difficulty = settings.difficulty;
                    this.updateDifficultyUI();
                }
                if (settings.targetScore) {
                    this.state.targetScore = settings.targetScore;
                    this.elements.targetScore.textContent = settings.targetScore;
                }
                if (settings.selectedCategories && settings.selectedCategories.length > 0) {
                    this.state.selectedCategories = settings.selectedCategories;
                    this.updateCategoryUI();
                }
            }
        } catch (e) {
            console.log('Could not load settings');
        }
    },

    /**
     * Save settings
     */
    saveSettings() {
        try {
            localStorage.setItem('quick-draw-settings', JSON.stringify({
                difficulty: this.state.difficulty,
                targetScore: this.state.targetScore,
                selectedCategories: this.state.selectedCategories
            }));
        } catch (e) {
            console.log('Could not save settings');
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

            // Scroll to top
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
        this.elements.categoryGrid.innerHTML = '';

        Object.entries(PROMPTS).forEach(([id, category]) => {
            const option = document.createElement('div');
            option.className = 'category-option';
            option.dataset.categoryId = id;
            option.innerHTML = `
                <div class="category-emoji">${category.emoji}</div>
                <div class="category-name">${category.name}</div>
            `;
            option.addEventListener('click', () => this.toggleCategory(id));
            this.elements.categoryGrid.appendChild(option);
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
     * Set difficulty
     */
    setDifficulty(diff) {
        this.state.difficulty = diff;
        this.updateDifficultyUI();
    },

    /**
     * Update difficulty UI
     */
    updateDifficultyUI() {
        this.elements.difficultyBtns.forEach(btn => {
            const d = btn.dataset.diff;
            if (d === this.state.difficulty) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    },

    /**
     * Adjust target score
     */
    adjustTarget(delta) {
        const newTarget = this.state.targetScore + delta;
        if (newTarget >= 5 && newTarget <= 30) {
            this.state.targetScore = newTarget;
            this.elements.targetScore.textContent = newTarget;
        }
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

        this.saveSettings();

        // Reset game state
        this.state.score = 0;
        this.state.roundNumber = 0;
        this.state.usedWords = [];

        // Apply difficulty settings
        const settings = DIFFICULTY_SETTINGS[this.state.difficulty];
        this.state.maxStrokes = settings.strokes;
        this.state.maxInk = settings.inkLimit;
        this.state.drawTime = settings.time;

        // Start first round
        this.nextRound();
    },

    /**
     * Next round
     */
    nextRound() {
        // Check for victory
        if (this.state.score >= this.state.targetScore) {
            this.showVictory();
            return;
        }

        this.state.roundNumber++;
        this.pickWord();

        // Update pass screen
        this.elements.passScore.textContent = this.state.score;
        this.elements.passTarget.textContent = this.state.targetScore;

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
                category.items.forEach(item => {
                    const wordId = `${categoryId}-${item.word}`;
                    if (!this.state.usedWords.includes(wordId)) {
                        availableWords.push({
                            ...item,
                            id: wordId,
                            category: categoryId
                        });
                    }
                });
            }
        });

        // Reset if all words used
        if (availableWords.length === 0) {
            this.state.usedWords = [];
            return this.pickWord();
        }

        const randomIndex = Math.floor(Math.random() * availableWords.length);
        this.state.currentWord = availableWords[randomIndex];
        this.state.usedWords.push(this.state.currentWord.id);
    },

    /**
     * Show word to artist
     */
    showWord() {
        this.elements.wordText.textContent = this.state.currentWord.word;
        this.elements.previewStrokes.textContent = this.state.maxStrokes;
        this.elements.previewTime.textContent = this.state.drawTime;

        this.showScreen('word');
    },

    /**
     * Start drawing phase
     */
    startDrawing() {
        // Reset drawing state
        this.state.strokes = [];
        this.state.currentStroke = null;
        this.state.strokeCount = 0;
        this.state.inkUsed = 0;
        this.state.isDrawing = false;

        // Show drawing screen and size canvas once layout is ready
        this.showScreen('draw');
        this.queueCanvasSetup(false);
        this.updateDrawUI();

        // Start timer
        this.state.timeRemaining = this.state.drawTime;
        this.updateTimerDisplay();
        this.startTimer();

    },

    queueCanvasSetup(restoreDrawing = false) {
        if (this.state.currentScreen !== 'draw') return;

        if (this.canvasResizeFrame) {
            cancelAnimationFrame(this.canvasResizeFrame);
        }

        this.canvasResizeFrame = requestAnimationFrame(() => {
            this.canvasResizeFrame = null;
            if (this.state.currentScreen !== 'draw') return;
            this.setupCanvas(restoreDrawing);
        });
    },

    handleResize() {
        if (this.state.currentScreen !== 'draw') return;
        this.queueCanvasSetup(true);
    },

    resetCanvasSurface() {
        if (!this.ctx || !this.canvas) return;
        const scale = this.renderScale || 1;
        const width = this.state.canvasWidth || (this.canvas.width / scale);
        const height = this.state.canvasHeight || (this.canvas.height / scale);
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(0, 0, width, height);
        this.ctx.beginPath();
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
     * Setup canvas events
     */
    setupCanvasEvents() {
        // Remove old listeners
        this.canvas.onpointerdown = null;
        this.canvas.onpointermove = null;
        this.canvas.onpointerup = null;
        this.canvas.onpointerleave = null;

        // Add new listeners
        this.canvas.onpointerdown = (e) => this.handlePointerDown(e);
        this.canvas.onpointermove = (e) => this.handlePointerMove(e);
        this.canvas.onpointerup = (e) => this.handlePointerUp(e);
        this.canvas.onpointerleave = (e) => this.handlePointerUp(e);
    },

    /**
     * Handle pointer down
     */
    handlePointerDown(e) {
        if (this.state.strokeCount >= this.state.maxStrokes) {
            this.showCanvasMessage('No more strokes!');
            return;
        }

        if (this.state.inkUsed >= this.state.maxInk) {
            this.showCanvasMessage('Out of ink!');
            return;
        }

        e.preventDefault();
        this.state.isDrawing = true;

        const pos = this.getPointerPos(e);
        this.state.currentStroke = {
            points: [pos],
            length: 0
        };

        this.ctx.beginPath();
        this.ctx.moveTo(pos.x, pos.y);
    },

    /**
     * Handle pointer move
     */
    handlePointerMove(e) {
        if (!this.state.isDrawing || !this.state.currentStroke) return;

        e.preventDefault();

        const pos = this.getPointerPos(e);
        const lastPos = this.state.currentStroke.points[this.state.currentStroke.points.length - 1];

        // Calculate distance
        const dx = pos.x - lastPos.x;
        const dy = pos.y - lastPos.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Check ink limit
        if (this.state.inkUsed + dist > this.state.maxInk) {
            this.handlePointerUp(e);
            this.showCanvasMessage('Out of ink!');
            return;
        }

        // Add point
        this.state.currentStroke.points.push(pos);
        this.state.currentStroke.length += dist;
        this.state.inkUsed += dist;

        // Draw
        this.ctx.lineTo(pos.x, pos.y);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.moveTo(pos.x, pos.y);

        // Update UI
        this.updateDrawUI();
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
            this.state.strokeCount++;
        }

        this.state.currentStroke = null;
        this.updateDrawUI();
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
     * Update drawing UI
     */
    updateDrawUI() {
        this.elements.strokeCount.textContent = `${this.state.strokeCount}/${this.state.maxStrokes}`;

        const inkPercent = Math.max(0, 100 - (this.state.inkUsed / this.state.maxInk * 100));
        this.elements.inkFill.style.width = `${inkPercent}%`;

        if (inkPercent < 20) {
            this.elements.inkFill.classList.add('low');
        } else {
            this.elements.inkFill.classList.remove('low');
        }

        // Update undo button
        this.elements.undoBtn.disabled = this.state.strokes.length === 0;
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

        const removed = this.state.strokes.pop();
        this.state.strokeCount--;
        this.state.inkUsed -= removed.length;

        // Redraw canvas
        this.redrawCanvas();
        this.updateDrawUI();
    },

    /**
     * Clear canvas
     */
    clearCanvas() {
        this.state.strokes = [];
        this.state.strokeCount = 0;
        this.state.inkUsed = 0;

        this.resetCanvasSurface();

        this.updateDrawUI();
    },

    /**
     * Redraw canvas from strokes
     */
    redrawCanvas() {
        this.resetCanvasSurface();

        this.ctx.strokeStyle = '#1f2937';
        this.ctx.lineWidth = 4;

        this.state.strokes.forEach(stroke => {
            if (stroke.points.length < 2) return;

            this.ctx.beginPath();
            this.ctx.moveTo(stroke.points[0].x, stroke.points[0].y);

            for (let i = 1; i < stroke.points.length; i++) {
                this.ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
            }

            this.ctx.stroke();
        });
    },

    /**
     * Finish drawing - time ran out without a guess
     */
    finishDrawing() {
        this.markWrong();
    },

    /**
     * Start timer
     */
    startTimer() {
        this.stopTimer();

        this.state.timerInterval = setInterval(() => {
            this.state.timeRemaining--;
            this.updateTimerDisplay();

            if (this.state.timeRemaining <= 0) {
                this.stopTimer();
                this.markWrong();
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
    updateTimerDisplay() {
        const time = this.state.timeRemaining;
        this.elements.drawTimer.textContent = time;

        this.elements.drawTimer.classList.remove('warning', 'danger');
        if (time <= 5) {
            this.elements.drawTimer.classList.add('danger');
        } else if (time <= 10) {
            this.elements.drawTimer.classList.add('warning');
        }
    },

    /**
     * Mark correct
     */
    markCorrect() {
        this.stopTimer();
        this.state.score++;

        this.elements.answerIcon.textContent = '🎉';
        this.elements.answerTitle.textContent = 'Correct!';
        this.elements.answerWord.textContent = this.state.currentWord.word;

        this.updateProgressUI();

        // Check victory
        if (this.state.score >= this.state.targetScore) {
            this.elements.answerTitle.textContent = 'You Win!';
            document.getElementById('next-btn').textContent = 'See Results';
        }

        this.showScreen('answer');
    },

    /**
     * Mark wrong
     */
    markWrong() {
        this.stopTimer();

        this.elements.answerIcon.textContent = '😔';
        this.elements.answerTitle.textContent = "Time's Up!";
        this.elements.answerWord.textContent = this.state.currentWord.word;

        this.updateProgressUI();
        this.showScreen('answer');
    },

    /**
     * Update progress UI
     */
    updateProgressUI() {
        this.elements.progressText.textContent = `${this.state.score} / ${this.state.targetScore}`;
        const percent = Math.min(100, (this.state.score / this.state.targetScore) * 100);
        this.elements.progressFill.style.width = `${percent}%`;
    },

    /**
     * Show victory
     */
    showVictory() {
        this.elements.victoryScore.textContent = this.state.score;
        this.elements.victoryRounds.textContent = this.state.roundNumber;
        this.showScreen('victory');
    },

    /**
     * Play again
     */
    playAgain() {
        this.state.score = 0;
        this.state.roundNumber = 0;
        this.state.usedWords = [];
        this.nextRound();
    },

    /**
     * Reset game
     */
    resetGame() {
        this.stopTimer();
        this.state.score = 0;
        this.state.roundNumber = 0;
        this.state.usedWords = [];
        this.state.strokes = [];
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => Game.init());

// Warn before leaving during active game
window.addEventListener('beforeunload', (e) => {
    if (Game.state.timerInterval || Game.state.score > 0) {
        e.preventDefault();
        e.returnValue = '';
    }
});
