/**
 * Would You Rather - Party Dilemmas Game
 * Main Game Logic with linear scale voting and cute animal tokens
 */

const Game = {
    // Cute animal tokens for each player
    ANIMALS: ['🐱', '🐶', '🐰', '🦊', '🐻', '🐼', '🐨', '🦁'],

    // Game state
    state: {
        currentScreen: 'welcome',
        playerCount: 4,
        questionCount: 10,
        currentQuestion: 0,
        questions: [],
        // Player data: { position: 0-100 (50 = center), locked: boolean }
        players: [],
        currentPlayerIndex: 0,
        activePointerId: null,
        revealVotes: false,
        // Stats
        unanimousCount: 0,
        splitCount: 0
    },

    // DOM elements
    elements: {},

    /**
     * Initialize
     */
    init() {
        this.cacheElements();
        this.initScaleInteraction();
        this.updateSetupPreview();
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
                question: document.getElementById('screen-question'),
                gameover: document.getElementById('screen-gameover')
            },
            playerCount: document.getElementById('player-count'),
            questionCount: document.getElementById('question-count'),
            setupPreview: document.getElementById('setup-preview'),
            questionNumber: document.getElementById('question-number'),
            questionTotal: document.getElementById('question-total'),
            optionAText: document.getElementById('option-a-text'),
            optionBText: document.getElementById('option-b-text'),
            scaleTokens: document.getElementById('scale-tokens'),
            scaleTrack: document.getElementById('scale-track'),
            votesCount: document.getElementById('votes-count'),
            votesTotal: document.getElementById('votes-total'),
            nextBtn: document.getElementById('next-btn'),
            currentPlayerAnimal: document.getElementById('current-player-animal'),
            currentPlayerLabel: document.getElementById('current-player-label'),
            lockBtn: document.getElementById('lock-btn'),
            statQuestions: document.getElementById('stat-questions'),
            statUnanimous: document.getElementById('stat-unanimous'),
            statSplit: document.getElementById('stat-split')
        };
    },

    /**
     * Show screen
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
        }
    },

    /**
     * Navigation
     */
    showWelcome() {
        this.showScreen('welcome');
    },

    showSetup() {
        this.showScreen('setup');
    },

    /**
     * Adjust player count
     */
    adjustPlayers(delta) {
        const newCount = this.state.playerCount + delta;
        if (newCount >= 2 && newCount <= 8) {
            this.state.playerCount = newCount;
            this.elements.playerCount.textContent = newCount;
            this.updateSetupPreview();
        }
    },

    /**
     * Adjust question count
     */
    adjustQuestions(delta) {
        const newCount = this.state.questionCount + delta;
        if (newCount >= 5 && newCount <= 30) {
            this.state.questionCount = newCount;
            this.elements.questionCount.textContent = newCount;
        }
    },

    /**
     * Update setup preview - show animal tokens
     */
    updateSetupPreview() {
        const preview = this.elements.setupPreview;
        preview.innerHTML = '';

        for (let i = 0; i < this.state.playerCount; i++) {
            const token = document.createElement('div');
            token.className = 'preview-token';
            token.innerHTML = `
                <span class="token-animal">${this.ANIMALS[i]}</span>
                <span class="token-label">Player ${i + 1}</span>
            `;
            preview.appendChild(token);
        }
    },

    /**
     * Start game
     */
    startGame() {
        // Shuffle and select questions
        this.state.questions = shuffleQuestions().slice(0, this.state.questionCount);
        this.state.currentQuestion = 0;
        this.state.unanimousCount = 0;
        this.state.splitCount = 0;

        this.showQuestion();
    },

    /**
     * Show current question
     */
    showQuestion() {
        const q = this.state.questions[this.state.currentQuestion];

        // Update question display
        this.elements.questionNumber.textContent = this.state.currentQuestion + 1;
        this.elements.questionTotal.textContent = this.state.questionCount;
        this.elements.optionAText.textContent = q.a;
        this.elements.optionBText.textContent = q.b;

        // Reset players
        this.state.players = [];
        for (let i = 0; i < this.state.playerCount; i++) {
            this.state.players.push({
                position: 50, // Start in the middle
                locked: false
            });
        }
        this.state.currentPlayerIndex = 0;
        this.state.activePointerId = null;
        this.state.revealVotes = false;

        // Setup UI
        this.setupScaleTokens();
        this.beginPlayerTurn(0);
        this.updateVoteStatus();

        // Disable next button initially
        this.elements.nextBtn.disabled = true;
        this.elements.nextBtn.textContent =
            this.state.currentQuestion >= this.state.questionCount - 1
                ? 'See Results'
                : 'Next Question';

        this.showScreen('question');
    },

    /**
     * Setup scale tokens (animal tokens on the gradient)
     */
    setupScaleTokens() {
        const container = this.elements.scaleTokens;
        container.innerHTML = '';

        for (let i = 0; i < this.state.playerCount; i++) {
            const token = document.createElement('div');
            token.className = 'scale-token pending';
            token.id = `token-${i}`;
            token.textContent = this.ANIMALS[i];
            token.style.left = '50%';
            container.appendChild(token);
        }
    },

    /**
     * Setup pointer/touch controls for the shared scale
     */
    initScaleInteraction() {
        const track = this.elements.scaleTrack;
        if (!track) return;

        track.addEventListener('pointerdown', (e) => this.handleScalePointerDown(e));
        track.addEventListener('pointermove', (e) => this.handleScalePointerMove(e));
        track.addEventListener('pointerup', (e) => this.handleScalePointerUp(e));
        track.addEventListener('pointercancel', (e) => this.handleScalePointerUp(e));
        track.addEventListener('pointerleave', (e) => this.handleScalePointerUp(e));
    },

    hasActivePlayer() {
        const player = this.state.players[this.state.currentPlayerIndex];
        return Boolean(player && !player.locked);
    },

    handleScalePointerDown(e) {
        if (this.state.currentScreen !== 'question' || !this.hasActivePlayer()) return;
        e.preventDefault();
        const track = this.elements.scaleTrack;
        if (!track) return;

        this.state.activePointerId = e.pointerId;
        track.setPointerCapture?.(e.pointerId);
        this.updateCurrentPlayerPositionFromClientX(e.clientX);
    },

    handleScalePointerMove(e) {
        if (this.state.activePointerId !== e.pointerId) return;
        e.preventDefault();
        this.updateCurrentPlayerPositionFromClientX(e.clientX);
    },

    handleScalePointerUp(e) {
        if (this.state.activePointerId !== e.pointerId) return;
        e.preventDefault();
        const track = this.elements.scaleTrack;
        track?.releasePointerCapture?.(e.pointerId);
        this.state.activePointerId = null;
        this.updateCurrentPlayerPositionFromClientX(e.clientX);
    },

    updateCurrentPlayerPositionFromClientX(clientX) {
        const track = this.elements.scaleTrack;
        if (!track) return;
        const rect = track.getBoundingClientRect();
        if (!rect.width) return;

        let percent = ((clientX - rect.left) / rect.width) * 100;
        percent = Math.max(0, Math.min(100, percent));
        this.setCurrentPlayerPosition(percent);
    },

    setCurrentPlayerPosition(percent) {
        const player = this.state.players[this.state.currentPlayerIndex];
        if (!player || player.locked) return;

        player.position = percent;
        this.updateTokenStates();
    },

    /**
     * Begin the current player's turn
     */
    beginPlayerTurn(playerIndex) {
        if (playerIndex < 0 || playerIndex >= this.state.playerCount) return;
        this.state.currentPlayerIndex = playerIndex;
        const player = this.state.players[playerIndex];
        if (!player) return;

        player.position = 50;
        this.updateTurnIndicator();
        this.updateTokenStates();
    },

    updateTurnIndicator() {
        const { currentPlayerIndex, playerCount } = this.state;
        const animal = this.ANIMALS[currentPlayerIndex];

        if (this.elements.currentPlayerAnimal && animal) {
            this.elements.currentPlayerAnimal.textContent = animal;
        }
        if (this.elements.currentPlayerLabel) {
            this.elements.currentPlayerLabel.textContent = `Player ${currentPlayerIndex + 1} of ${playerCount}, take your turn.`;
        }
        if (this.elements.lockBtn) {
            this.elements.lockBtn.disabled = false;
            this.elements.lockBtn.textContent =
                currentPlayerIndex === playerCount - 1 ? 'Lock & Finish' : 'Lock & Pass';
        }
    },

    updateTokenPosition(playerIndex) {
        const player = this.state.players[playerIndex];
        const token = document.getElementById(`token-${playerIndex}`);
        if (token && player) {
            token.style.left = `${player.position}%`;
        }
    },

    updateTokenStates() {
        this.state.players.forEach((player, index) => {
            const token = document.getElementById(`token-${index}`);
            if (!token) return;

            this.updateTokenPosition(index);
            const isCurrentPlayer = index === this.state.currentPlayerIndex && !player.locked;
            const shouldRevealVotes = this.state.revealVotes;
            const shouldShowToken = shouldRevealVotes || isCurrentPlayer;

            token.classList.toggle('hidden-vote', !shouldShowToken);
            token.classList.toggle('active', isCurrentPlayer && shouldShowToken);
            token.classList.toggle('pending', !player.locked && !isCurrentPlayer && shouldShowToken);
            token.classList.toggle('locked', player.locked && shouldRevealVotes);
        });
    },

    /**
     * Lock the current player's vote and advance
     */
    lockCurrentPlayer() {
        const player = this.state.players[this.state.currentPlayerIndex];
        if (!player || player.locked) return;

        player.locked = true;
        this.updateTokenStates();
        this.updateVoteStatus();

        if (this.state.players.every(p => p.locked)) {
            if (this.elements.currentPlayerLabel) {
                this.elements.currentPlayerLabel.textContent = 'All players are locked in!';
            }
            return;
        }

        const nextIndex = this.state.currentPlayerIndex + 1;
        this.beginPlayerTurn(nextIndex);
    },

    /**
     * Update vote status display
     */
    updateVoteStatus() {
        const lockedCount = this.state.players.filter(p => p.locked).length;
        this.elements.votesCount.textContent = lockedCount;
        this.elements.votesTotal.textContent = this.state.playerCount;

        // Enable next button when all locked
        if (lockedCount === this.state.playerCount) {
            this.state.revealVotes = true;
            this.elements.nextBtn.disabled = false;
            if (this.elements.lockBtn) {
                this.elements.lockBtn.disabled = true;
                this.elements.lockBtn.textContent = 'All votes in!';
            }
            this.trackStats();
        } else {
            this.elements.nextBtn.disabled = true;
        }

        this.updateTokenStates();
    },

    /**
     * Track stats for this question
     */
    trackStats() {
        // Count A vs B based on position (< 50 = A, >= 50 = B)
        let countA = 0;
        let countB = 0;

        this.state.players.forEach(p => {
            if (p.position < 50) {
                countA++;
            } else {
                countB++;
            }
        });

        // Check for unanimous (all same side)
        if (countA === this.state.playerCount || countB === this.state.playerCount) {
            this.state.unanimousCount++;
        }

        // Check for 50/50 split (only possible with even player count)
        if (countA === countB && this.state.playerCount % 2 === 0) {
            this.state.splitCount++;
        }
    },

    /**
     * Next question
     */
    nextQuestion() {
        this.state.currentQuestion++;

        if (this.state.currentQuestion >= this.state.questionCount) {
            this.showGameOver();
        } else {
            this.showQuestion();
        }
    },

    /**
     * Show game over
     */
    showGameOver() {
        this.elements.statQuestions.textContent = this.state.questionCount;
        this.elements.statUnanimous.textContent = this.state.unanimousCount;
        this.elements.statSplit.textContent = this.state.splitCount;

        this.showScreen('gameover');
    },

    /**
     * Play again
     */
    playAgain() {
        this.startGame();
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => Game.init());
