/**
 * Wacky Telephone - Drawing Telephone with Transformations
 */

class WackyTelephone {
    constructor() {
        this.state = {
            playerCount: 4,
            currentRound: 0,
            totalRounds: 0,
            currentPlayerIndex: 0,
            currentPhrase: '',
            currentTransform: null,
            chain: [], // {player, type: 'phrase'|'drawing'|'guess', content, transform?, imageData?}
            starterIndex: 0,
            // Drawing state
            strokes: [],
            currentStroke: null,
            isDrawing: false,
            canvasWidth: 0,
            canvasHeight: 0,
            rotationAngle: 0,
            rotationDirection: 1,
            rotationInterval: null,
            // Timer
            drawTime: 45,
            timeRemaining: 0,
            timerInterval: null
        };

        this.usedPhrases = [];
        this.canvas = null;
        this.ctx = null;
        this.displayCanvas = null;
        this.displayCtx = null;
        this.renderScale = 1;

        this.init();
    }

    init() {
        this.cacheElements();
        this.setupEventListeners();
    }

    cacheElements() {
        this.canvas = document.getElementById('draw-canvas');
        this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
        this.displayCanvas = document.getElementById('display-canvas');
        this.displayCtx = this.displayCanvas ? this.displayCanvas.getContext('2d') : null;

        this.elements = {
            // Draw screen
            drawPlayer: document.getElementById('draw-player'),
            drawTransform: document.getElementById('draw-transform'),
            drawTimer: document.getElementById('draw-timer'),
            undoBtn: document.getElementById('undo-btn'),
            canvasContainer: document.querySelector('.canvas-container'),
            // Phrase screen
            phrasePlayer: document.getElementById('phrase-player'),
            phraseDisplay: document.getElementById('phrase-display'),
            phraseTransformEmoji: document.getElementById('phrase-transform-emoji'),
            phraseTransformName: document.getElementById('phrase-transform-name'),
            phraseTransformDesc: document.getElementById('phrase-transform-desc'),
            // Pass screen
            nextPlayerName: document.getElementById('next-player-name'),
            passTask: document.getElementById('pass-task'),
            // Guess screen
            guessPlayer: document.getElementById('guess-player'),
            guessInput: document.getElementById('guess-input'),
            submitGuessBtn: document.getElementById('submit-guess-btn'),
            // Next draw screen
            nextDrawPlayer: document.getElementById('next-draw-player'),
            nextDrawPhrase: document.getElementById('next-draw-phrase'),
            nextDrawTransformEmoji: document.getElementById('next-draw-transform-emoji'),
            nextDrawTransformName: document.getElementById('next-draw-transform-name'),
            nextDrawTransformDesc: document.getElementById('next-draw-transform-desc'),
            // Reveal
            chainContainer: document.getElementById('chain-container')
        };
    }

    setupEventListeners() {
        // Player count
        document.querySelectorAll('.count-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.count-btn').forEach(b => b.classList.remove('selected'));
                e.target.classList.add('selected');
                this.state.playerCount = parseInt(e.target.dataset.count);
            });
        });

        // Buttons
        document.getElementById('start-btn').addEventListener('click', () => this.startGame());
        document.getElementById('ready-draw-btn').addEventListener('click', () => this.startDrawing());
        document.getElementById('ready-btn').addEventListener('click', () => this.nextTurn());
        document.getElementById('submit-guess-btn').addEventListener('click', () => this.submitGuess());
        document.getElementById('next-draw-btn').addEventListener('click', () => this.startDrawing());
        document.getElementById('next-round-btn').addEventListener('click', () => this.nextRound());
        document.getElementById('play-again-btn').addEventListener('click', () => this.resetGame());

        // Drawing controls
        document.getElementById('undo-btn').addEventListener('click', () => this.undoStroke());
        document.getElementById('clear-btn').addEventListener('click', () => this.clearCanvas());
        document.getElementById('done-btn').addEventListener('click', () => this.finishDrawing());

        // Guess input
        this.elements.guessInput.addEventListener('input', () => {
            this.elements.submitGuessBtn.disabled = this.elements.guessInput.value.trim() === '';
        });

        // Resize handler
        window.addEventListener('resize', () => this.handleResize());
    }

    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById(screenId).classList.add('active');
        window.scrollTo(0, 0);
    }

    getRandomPhrase() {
        const available = PHRASES.filter(p => !this.usedPhrases.includes(p));
        if (available.length === 0) {
            this.usedPhrases = [];
            return PHRASES[Math.floor(Math.random() * PHRASES.length)];
        }
        const phrase = available[Math.floor(Math.random() * available.length)];
        this.usedPhrases.push(phrase);
        return phrase;
    }

    getRandomTransform() {
        const transforms = Object.keys(TRANSFORMATIONS);
        return transforms[Math.floor(Math.random() * transforms.length)];
    }

    startGame() {
        this.state.currentRound = 1;
        this.state.totalRounds = this.state.playerCount;
        this.state.starterIndex = 0;
        this.startRound();
    }

    startRound() {
        this.state.currentPhrase = this.getRandomPhrase();
        this.state.currentTransform = this.getRandomTransform();
        this.state.chain = [{
            player: this.state.starterIndex + 1,
            type: 'phrase',
            content: this.state.currentPhrase
        }];
        this.state.currentPlayerIndex = this.state.starterIndex;

        const transform = TRANSFORMATIONS[this.state.currentTransform];

        this.elements.phrasePlayer.textContent = `Player ${this.state.starterIndex + 1}`;
        this.elements.phraseDisplay.textContent = this.state.currentPhrase;
        this.elements.phraseTransformEmoji.textContent = transform.emoji;
        this.elements.phraseTransformName.textContent = transform.name;
        this.elements.phraseTransformDesc.textContent = transform.description;

        this.showScreen('phrase-screen');
    }

    startDrawing() {
        // Reset drawing state
        this.state.strokes = [];
        this.state.currentStroke = null;
        this.state.isDrawing = false;
        this.state.rotationAngle = 0;

        const transform = TRANSFORMATIONS[this.state.currentTransform];
        this.elements.drawPlayer.textContent = `Player ${this.state.currentPlayerIndex + 1}`;
        this.elements.drawTransform.textContent = `${transform.emoji} ${transform.name}`;
        this.elements.undoBtn.disabled = true;

        this.showScreen('draw-screen');
        this.setupCanvas();

        // Start rotation for rotate mode
        if (this.state.currentTransform === 'rotate') {
            this.startRotation();
        }

        // Start timer
        this.state.timeRemaining = this.state.drawTime;
        this.updateTimerDisplay();
        this.startTimer();
    }

    setupCanvas() {
        if (!this.canvas || !this.ctx) return;

        const container = this.elements.canvasContainer;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        if (rect.width < 10 || rect.height < 10) {
            requestAnimationFrame(() => this.setupCanvas());
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

        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.scale(scale, scale);
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        this.ctx.lineWidth = 4;
        this.ctx.strokeStyle = '#1f2937';

        this.resetCanvasSurface();
        this.setupCanvasEvents();
    }

    handleResize() {
        const screen = document.querySelector('.screen.active');
        if (screen && screen.id === 'draw-screen') {
            this.setupCanvas();
            this.redrawCanvas();
        }
    }

    resetCanvasSurface() {
        if (!this.ctx) return;
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(0, 0, this.state.canvasWidth, this.state.canvasHeight);
    }

    setupCanvasEvents() {
        this.canvas.onpointerdown = (e) => this.handlePointerDown(e);
        this.canvas.onpointermove = (e) => this.handlePointerMove(e);
        this.canvas.onpointerup = (e) => this.handlePointerUp(e);
        this.canvas.onpointerleave = (e) => this.handlePointerUp(e);
    }

    transformPoint(x, y) {
        const cx = this.state.canvasWidth / 2;
        const cy = this.state.canvasHeight / 2;

        switch (this.state.currentTransform) {
            case 'mirror':
                return { x: this.state.canvasWidth - x, y: y };

            case 'rotate':
                const angle = this.state.rotationAngle * Math.PI / 180;
                const dx = x - cx;
                const dy = y - cy;
                const rotatedX = dx * Math.cos(-angle) - dy * Math.sin(-angle);
                const rotatedY = dx * Math.sin(-angle) + dy * Math.cos(-angle);
                return { x: rotatedX + cx, y: rotatedY + cy };

            case 'funhouse':
                const waveAmplitude = 20;
                const waveFrequency = 0.02;
                const distortedX = x + Math.sin(y * waveFrequency) * waveAmplitude;
                const distortedY = y + Math.sin(x * waveFrequency) * waveAmplitude;
                return { x: distortedX, y: distortedY };

            case 'kaleidoscope':
                return { x, y };

            default:
                return { x, y };
        }
    }

    handlePointerDown(e) {
        e.preventDefault();
        this.state.isDrawing = true;

        const pos = this.getPointerPos(e);
        const transformed = this.transformPoint(pos.x, pos.y);

        this.state.currentStroke = {
            points: [{ original: pos, transformed: transformed }]
        };
    }

    handlePointerMove(e) {
        if (!this.state.isDrawing || !this.state.currentStroke) return;

        e.preventDefault();

        const pos = this.getPointerPos(e);
        const transformed = this.transformPoint(pos.x, pos.y);

        this.state.currentStroke.points.push({ original: pos, transformed: transformed });
        this.redrawCanvas();
    }

    handlePointerUp(e) {
        if (!this.state.isDrawing) return;

        e.preventDefault();
        this.state.isDrawing = false;

        if (this.state.currentStroke && this.state.currentStroke.points.length > 1) {
            this.state.strokes.push(this.state.currentStroke);
            this.elements.undoBtn.disabled = false;
        }

        this.state.currentStroke = null;
    }

    getPointerPos(e) {
        const rect = this.canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }

    drawStroke(stroke) {
        if (stroke.points.length < 2) return;

        const cx = this.state.canvasWidth / 2;
        const cy = this.state.canvasHeight / 2;

        if (this.state.currentTransform === 'kaleidoscope') {
            for (let i = 0; i < 4; i++) {
                this.ctx.save();
                this.ctx.translate(cx, cy);
                this.ctx.rotate(i * Math.PI / 2);
                this.ctx.translate(-cx, -cy);

                this.drawStrokePath(stroke, false);

                this.ctx.save();
                this.ctx.translate(cx, 0);
                this.ctx.scale(-1, 1);
                this.ctx.translate(-cx, 0);
                this.drawStrokePath(stroke, false);
                this.ctx.restore();

                this.ctx.restore();
            }
        } else if (this.state.currentTransform === 'rotate') {
            this.ctx.save();
            this.ctx.translate(cx, cy);
            this.ctx.rotate(this.state.rotationAngle * Math.PI / 180);
            this.ctx.translate(-cx, -cy);
            this.drawStrokePath(stroke, true);
            this.ctx.restore();
        } else {
            this.drawStrokePath(stroke, true);
        }
    }

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
    }

    redrawCanvas() {
        this.resetCanvasSurface();

        this.ctx.strokeStyle = '#1f2937';
        this.ctx.lineWidth = 4;

        this.state.strokes.forEach(stroke => {
            this.drawStroke(stroke);
        });

        if (this.state.currentStroke && this.state.currentStroke.points.length > 1) {
            this.drawStroke(this.state.currentStroke);
        }
    }

    undoStroke() {
        if (this.state.strokes.length === 0) return;

        this.state.strokes.pop();
        this.redrawCanvas();
        this.elements.undoBtn.disabled = this.state.strokes.length === 0;
    }

    clearCanvas() {
        this.state.strokes = [];
        this.resetCanvasSurface();
        this.elements.undoBtn.disabled = true;
    }

    startRotation() {
        this.stopRotation();
        this.state.rotationDirection = Math.random() < 0.5 ? 1 : -1;
        this.state.rotationInterval = setInterval(() => {
            if (Math.random() < 0.02) {
                this.state.rotationDirection *= -1;
            }
            this.state.rotationAngle += 6 * this.state.rotationDirection;
            if (this.state.rotationAngle >= 360) {
                this.state.rotationAngle -= 360;
            } else if (this.state.rotationAngle < 0) {
                this.state.rotationAngle += 360;
            }
            this.redrawCanvas();
        }, 50);
    }

    stopRotation() {
        if (this.state.rotationInterval) {
            clearInterval(this.state.rotationInterval);
            this.state.rotationInterval = null;
        }
    }

    startTimer() {
        this.stopTimer();

        this.state.timerInterval = setInterval(() => {
            this.state.timeRemaining--;
            this.updateTimerDisplay();

            if (this.state.timeRemaining <= 0) {
                this.finishDrawing();
            }
        }, 1000);
    }

    stopTimer() {
        if (this.state.timerInterval) {
            clearInterval(this.state.timerInterval);
            this.state.timerInterval = null;
        }
    }

    updateTimerDisplay() {
        const time = this.state.timeRemaining;
        this.elements.drawTimer.textContent = time;

        this.elements.drawTimer.classList.remove('warning', 'danger');
        if (time <= 5) {
            this.elements.drawTimer.classList.add('danger');
        } else if (time <= 10) {
            this.elements.drawTimer.classList.add('warning');
        }
    }

    finishDrawing() {
        this.stopTimer();
        this.stopRotation();

        this.redrawCanvas();

        const imageData = this.canvas.toDataURL('image/png');
        const transform = TRANSFORMATIONS[this.state.currentTransform];

        this.state.chain.push({
            player: this.state.currentPlayerIndex + 1,
            type: 'drawing',
            content: imageData,
            transform: this.state.currentTransform,
            transformName: transform.name,
            transformEmoji: transform.emoji
        });

        // Move to next player
        this.state.currentPlayerIndex = (this.state.currentPlayerIndex + 1) % this.state.playerCount;

        // Check if round is complete
        if (this.state.currentPlayerIndex === this.state.starterIndex) {
            this.showReveal();
        } else {
            // Next player guesses
            this.elements.nextPlayerName.textContent = `Player ${this.state.currentPlayerIndex + 1}`;
            this.elements.passTask.textContent = 'to guess the drawing';
            this.showScreen('pass-screen');
        }
    }

    nextTurn() {
        const lastItem = this.state.chain[this.state.chain.length - 1];

        if (lastItem.type === 'drawing') {
            this.showGuessScreen(lastItem.content);
        } else {
            this.showNextDrawScreen(lastItem.content);
        }
    }

    showGuessScreen(imageData) {
        this.elements.guessPlayer.textContent = `Player ${this.state.currentPlayerIndex + 1}`;
        this.elements.guessInput.value = '';
        this.elements.submitGuessBtn.disabled = true;

        this.showScreen('guess-screen');
        this.setupDisplayCanvas(imageData);
    }

    setupDisplayCanvas(imageData) {
        if (!this.displayCanvas || !this.displayCtx) return;

        const container = document.querySelector('.drawing-display');
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const size = Math.min(rect.width, rect.height, 300);

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
    }

    submitGuess() {
        const guess = this.elements.guessInput.value.trim();

        this.state.chain.push({
            player: this.state.currentPlayerIndex + 1,
            type: 'guess',
            content: guess
        });

        // Move to next player
        this.state.currentPlayerIndex = (this.state.currentPlayerIndex + 1) % this.state.playerCount;

        // Check if round is complete
        if (this.state.currentPlayerIndex === this.state.starterIndex) {
            this.showReveal();
        } else {
            // Next player draws
            this.elements.nextPlayerName.textContent = `Player ${this.state.currentPlayerIndex + 1}`;
            this.elements.passTask.textContent = 'to draw the guess';
            this.showScreen('pass-screen');
        }
    }

    showNextDrawScreen(guess) {
        this.state.currentTransform = this.getRandomTransform();
        const transform = TRANSFORMATIONS[this.state.currentTransform];

        this.elements.nextDrawPlayer.textContent = `Player ${this.state.currentPlayerIndex + 1}`;
        this.elements.nextDrawPhrase.textContent = guess;
        this.elements.nextDrawTransformEmoji.textContent = transform.emoji;
        this.elements.nextDrawTransformName.textContent = transform.name;
        this.elements.nextDrawTransformDesc.textContent = transform.description;

        this.showScreen('next-draw-screen');
    }

    showReveal() {
        const container = this.elements.chainContainer;
        container.innerHTML = '';

        this.state.chain.forEach((item, index) => {
            if (index > 0) {
                const arrow = document.createElement('div');
                arrow.className = 'chain-arrow';
                arrow.textContent = '↓';
                container.appendChild(arrow);
            }

            const div = document.createElement('div');
            div.className = 'chain-item';

            if (index === 0) {
                div.classList.add('original');
            } else if (index === this.state.chain.length - 1) {
                div.classList.add('final');
            }

            const playerSpan = document.createElement('div');
            playerSpan.className = 'chain-player';

            if (item.type === 'phrase') {
                playerSpan.textContent = `Player ${item.player} (original)`;
            } else if (item.type === 'drawing') {
                playerSpan.textContent = `Player ${item.player} drew (${item.transformEmoji} ${item.transformName})`;
            } else {
                playerSpan.textContent = `Player ${item.player} guessed`;
            }

            div.appendChild(playerSpan);

            if (item.type === 'drawing') {
                const drawingDiv = document.createElement('div');
                drawingDiv.className = 'chain-drawing';

                const thumbCanvas = document.createElement('canvas');
                thumbCanvas.width = 150;
                thumbCanvas.height = 150;
                const thumbCtx = thumbCanvas.getContext('2d');

                const img = new Image();
                img.onload = () => {
                    thumbCtx.drawImage(img, 0, 0, 150, 150);
                };
                img.src = item.content;

                drawingDiv.appendChild(thumbCanvas);
                div.appendChild(drawingDiv);
            } else {
                const contentSpan = document.createElement('div');
                contentSpan.className = 'chain-content' + (item.type === 'phrase' ? ' phrase' : '');
                contentSpan.textContent = item.content;
                div.appendChild(contentSpan);
            }

            container.appendChild(div);
        });

        // Update button text
        const btn = document.getElementById('next-round-btn');
        if (this.state.currentRound >= this.state.totalRounds) {
            btn.textContent = 'Finish Game';
        } else {
            btn.textContent = 'Next Round';
        }

        this.showScreen('reveal-screen');
    }

    nextRound() {
        if (this.state.currentRound >= this.state.totalRounds) {
            this.showScreen('gameover-screen');
            return;
        }

        this.state.currentRound++;
        this.state.starterIndex = (this.state.starterIndex + 1) % this.state.playerCount;
        this.startRound();
    }

    resetGame() {
        this.stopTimer();
        this.stopRotation();

        this.state = {
            playerCount: 4,
            currentRound: 0,
            totalRounds: 0,
            currentPlayerIndex: 0,
            currentPhrase: '',
            currentTransform: null,
            chain: [],
            starterIndex: 0,
            strokes: [],
            currentStroke: null,
            isDrawing: false,
            canvasWidth: 0,
            canvasHeight: 0,
            rotationAngle: 0,
            rotationDirection: 1,
            rotationInterval: null,
            drawTime: 45,
            timeRemaining: 0,
            timerInterval: null
        };
        this.usedPhrases = [];

        document.querySelectorAll('.count-btn').forEach(b => b.classList.remove('selected'));
        document.querySelector('.count-btn[data-count="4"]').classList.add('selected');

        this.showScreen('setup-screen');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.game = new WackyTelephone();
});
