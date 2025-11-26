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
        // Player data: { position: 0-100 (50 = center), locked: boolean, touchId: null }
        players: [],
        // Touch tracking
        touches: {}, // touchId -> { playerIndex, startX, zoneWidth }
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
            playerZones: document.getElementById('player-zones'),
            votesCount: document.getElementById('votes-count'),
            votesTotal: document.getElementById('votes-total'),
            nextBtn: document.getElementById('next-btn'),
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
                locked: false,
                touchId: null
            });
        }
        this.state.touches = {};

        // Setup UI
        this.setupScaleTokens();
        this.setupPlayerZones();
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
            token.className = 'scale-token hidden';
            token.id = `token-${i}`;
            token.textContent = this.ANIMALS[i];
            token.style.left = '50%';
            container.appendChild(token);
        }
    },

    /**
     * Setup player touch zones
     */
    setupPlayerZones() {
        const container = this.elements.playerZones;
        container.innerHTML = '';
        container.className = `player-zones players-${this.state.playerCount}`;

        for (let i = 0; i < this.state.playerCount; i++) {
            const zone = document.createElement('div');
            zone.className = `player-zone p${i + 1}`;
            zone.dataset.playerIndex = i;

            zone.innerHTML = `
                <div class="zone-content">
                    <span class="zone-animal">${this.ANIMALS[i]}</span>
                    <div>
                        <span class="zone-label">Player ${i + 1}</span>
                        <span class="zone-hint">Drag left or right</span>
                        <span class="zone-status">Locked in!</span>
                    </div>
                </div>
            `;

            // Touch events
            zone.addEventListener('touchstart', (e) => this.handleTouchStart(e, i), { passive: false });
            zone.addEventListener('touchmove', (e) => this.handleTouchMove(e, i), { passive: false });
            zone.addEventListener('touchend', (e) => this.handleTouchEnd(e, i), { passive: false });
            zone.addEventListener('touchcancel', (e) => this.handleTouchEnd(e, i), { passive: false });

            container.appendChild(zone);
        }
    },

    /**
     * Handle touch start
     */
    handleTouchStart(e, playerIndex) {
        e.preventDefault();
        const player = this.state.players[playerIndex];
        if (player.locked) return;

        const zone = e.currentTarget;

        // Track the first new touch for this player
        for (let i = 0; i < e.changedTouches.length; i++) {
            const touch = e.changedTouches[i];

            // Only track if this player doesn't have a touch yet
            if (player.touchId === null) {
                player.touchId = touch.identifier;
                this.state.touches[touch.identifier] = {
                    playerIndex: playerIndex,
                    startX: touch.clientX,
                    startPosition: player.position,
                    zoneWidth: zone.offsetWidth
                };

                zone.classList.add('touching');

                // Show the token (unhide)
                const token = document.getElementById(`token-${playerIndex}`);
                if (token) {
                    token.classList.remove('hidden');
                }
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
        if (player.locked || player.touchId === null) return;

        for (let i = 0; i < e.changedTouches.length; i++) {
            const touch = e.changedTouches[i];

            if (touch.identifier === player.touchId) {
                const trackingData = this.state.touches[touch.identifier];
                if (!trackingData) return;

                const deltaX = touch.clientX - trackingData.startX;
                // Calculate new position based on drag distance relative to zone width
                // Full zone width = 100% movement
                const deltaPercent = (deltaX / trackingData.zoneWidth) * 100;
                let newPosition = trackingData.startPosition + deltaPercent;

                // Clamp to 0-100
                newPosition = Math.max(0, Math.min(100, newPosition));
                player.position = newPosition;

                // Update token position
                this.updateTokenPosition(playerIndex);

                // Update zone visual feedback
                this.updateZoneFeedback(e.currentTarget, newPosition);
            }
        }
    },

    /**
     * Handle touch end
     */
    handleTouchEnd(e, playerIndex) {
        e.preventDefault();
        const player = this.state.players[playerIndex];

        for (let i = 0; i < e.changedTouches.length; i++) {
            const touch = e.changedTouches[i];

            if (touch.identifier === player.touchId) {
                const zone = e.currentTarget;
                zone.classList.remove('touching');
                this.clearZoneFeedback(zone);

                if (!player.locked) {
                    // Lock in the vote when finger lifts
                    this.lockVote(playerIndex, zone);
                }

                // Clear tracking
                delete this.state.touches[touch.identifier];
                player.touchId = null;
            }
        }
    },

    /**
     * Update token position on scale
     */
    updateTokenPosition(playerIndex) {
        const player = this.state.players[playerIndex];
        const token = document.getElementById(`token-${playerIndex}`);
        if (token) {
            token.style.left = `${player.position}%`;
        }
    },

    /**
     * Update zone visual feedback (pseudo-element indicators)
     */
    updateZoneFeedback(zone, position) {
        // Position 0 = full left (A), 100 = full right (B)
        const leftWidth = Math.max(0, 50 - position);
        const rightWidth = Math.max(0, position - 50);

        zone.style.setProperty('--left-indicator', `${leftWidth}%`);
        zone.style.setProperty('--right-indicator', `${rightWidth}%`);
    },

    /**
     * Clear zone feedback
     */
    clearZoneFeedback(zone) {
        zone.style.removeProperty('--left-indicator');
        zone.style.removeProperty('--right-indicator');
    },

    /**
     * Lock in a vote
     */
    lockVote(playerIndex, zone) {
        const player = this.state.players[playerIndex];
        player.locked = true;

        // Update zone appearance
        zone.classList.add('locked');

        // Add bounce animation to token
        const token = document.getElementById(`token-${playerIndex}`);
        if (token) {
            token.classList.add('locked');
            // Remove animation class after it completes
            setTimeout(() => token.classList.remove('locked'), 300);
        }

        this.updateVoteStatus();
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
            this.elements.nextBtn.disabled = false;
            this.trackStats();
        }
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
