/**
 * Would You Rather - Party Dilemmas Game
 * Main Game Logic with simultaneous voting
 */

const Game = {
    // Game state
    state: {
        currentScreen: 'welcome',
        playerCount: 4,
        questionCount: 10,
        currentQuestion: 0,
        questions: [],
        votes: [], // { choice: 'a' | 'b' | null, locked: false }
        // Touch tracking
        touches: {}, // touchId -> { playerIndex, startX, startY }
        // Stats
        unanimousCount: 0,
        splitCount: 0
    },

    // DOM elements
    elements: {},

    // Swipe threshold
    SWIPE_THRESHOLD: 50,

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
                reveal: document.getElementById('screen-reveal'),
                gameover: document.getElementById('screen-gameover')
            },
            playerCount: document.getElementById('player-count'),
            questionCount: document.getElementById('question-count'),
            setupPreview: document.getElementById('setup-preview'),
            questionNumber: document.getElementById('question-number'),
            questionTotal: document.getElementById('question-total'),
            optionAText: document.getElementById('option-a-text'),
            optionBText: document.getElementById('option-b-text'),
            votingArea: document.getElementById('voting-area'),
            votesCount: document.getElementById('votes-count'),
            votesTotal: document.getElementById('votes-total'),
            revealOptionA: document.getElementById('reveal-option-a'),
            revealOptionB: document.getElementById('reveal-option-b'),
            votersA: document.getElementById('voters-a'),
            votersB: document.getElementById('voters-b'),
            tallyA: document.getElementById('tally-a'),
            tallyB: document.getElementById('tally-b'),
            countA: document.getElementById('count-a'),
            countB: document.getElementById('count-b'),
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
     * Update setup preview
     */
    updateSetupPreview() {
        const preview = this.elements.setupPreview;
        preview.innerHTML = '';

        for (let i = 0; i < this.state.playerCount; i++) {
            const zone = document.createElement('div');
            zone.className = `preview-zone p${i + 1}`;
            zone.textContent = `Player ${i + 1}`;
            preview.appendChild(zone);
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

        // Reset votes
        this.state.votes = [];
        for (let i = 0; i < this.state.playerCount; i++) {
            this.state.votes.push({ choice: null, locked: false });
        }
        this.state.touches = {};

        // Setup voting zones
        this.setupVotingZones();

        // Update status
        this.elements.votesCount.textContent = '0';
        this.elements.votesTotal.textContent = this.state.playerCount;

        this.showScreen('question');
    },

    /**
     * Setup voting zones
     */
    setupVotingZones() {
        const area = this.elements.votingArea;
        area.innerHTML = '';
        area.className = `voting-area players-${this.state.playerCount}`;

        for (let i = 0; i < this.state.playerCount; i++) {
            const zone = document.createElement('div');
            zone.className = `player-zone p${i + 1}`;
            zone.dataset.playerIndex = i;

            zone.innerHTML = `
                <div class="zone-content">
                    <span class="player-label">P${i + 1}</span>
                    <span class="zone-hint">Swipe to choose</span>
                    <span class="zone-choice"></span>
                </div>
            `;

            // Touch events
            zone.addEventListener('touchstart', (e) => this.handleTouchStart(e, i), { passive: false });
            zone.addEventListener('touchmove', (e) => this.handleTouchMove(e, i), { passive: false });
            zone.addEventListener('touchend', (e) => this.handleTouchEnd(e, i), { passive: false });
            zone.addEventListener('touchcancel', (e) => this.handleTouchEnd(e, i), { passive: false });

            area.appendChild(zone);
        }
    },

    /**
     * Handle touch start
     */
    handleTouchStart(e, playerIndex) {
        e.preventDefault();
        const vote = this.state.votes[playerIndex];
        if (vote.locked) return;

        // Track new touches
        for (let i = 0; i < e.changedTouches.length; i++) {
            const touch = e.changedTouches[i];

            // Only track if this player doesn't have a touch yet
            if (!this.state.touches[touch.identifier]) {
                this.state.touches[touch.identifier] = {
                    playerIndex: playerIndex,
                    startX: touch.clientX,
                    startY: touch.clientY
                };

                const zone = e.currentTarget;
                zone.classList.add('touching');
                break; // Only one touch per player at a time
            }
        }
    },

    /**
     * Handle touch move
     */
    handleTouchMove(e, playerIndex) {
        e.preventDefault();
        const vote = this.state.votes[playerIndex];
        if (vote.locked) return;

        for (let i = 0; i < e.changedTouches.length; i++) {
            const touch = e.changedTouches[i];
            const trackingData = this.state.touches[touch.identifier];

            if (trackingData && trackingData.playerIndex === playerIndex) {
                const deltaX = touch.clientX - trackingData.startX;
                const zone = e.currentTarget;

                // Show which direction they're leaning
                zone.classList.remove('choosing-a', 'choosing-b');

                if (deltaX < -this.SWIPE_THRESHOLD) {
                    zone.classList.add('choosing-a');
                } else if (deltaX > this.SWIPE_THRESHOLD) {
                    zone.classList.add('choosing-b');
                }
            }
        }
    },

    /**
     * Handle touch end
     */
    handleTouchEnd(e, playerIndex) {
        e.preventDefault();
        const vote = this.state.votes[playerIndex];

        for (let i = 0; i < e.changedTouches.length; i++) {
            const touch = e.changedTouches[i];
            const trackingData = this.state.touches[touch.identifier];

            if (trackingData && trackingData.playerIndex === playerIndex) {
                if (!vote.locked) {
                    const deltaX = touch.clientX - trackingData.startX;
                    const zone = e.currentTarget;

                    zone.classList.remove('touching', 'choosing-a', 'choosing-b');

                    // Determine choice based on swipe
                    if (deltaX < -this.SWIPE_THRESHOLD) {
                        this.lockVote(playerIndex, 'a', zone);
                    } else if (deltaX > this.SWIPE_THRESHOLD) {
                        this.lockVote(playerIndex, 'b', zone);
                    }
                }

                // Clear tracking
                delete this.state.touches[touch.identifier];
            }
        }
    },

    /**
     * Lock in a vote
     */
    lockVote(playerIndex, choice, zone) {
        const vote = this.state.votes[playerIndex];
        vote.choice = choice;
        vote.locked = true;

        // Update zone appearance
        zone.classList.add('locked', `chose-${choice}`);
        zone.querySelector('.zone-choice').textContent = choice.toUpperCase();

        // Update vote count
        const lockedCount = this.state.votes.filter(v => v.locked).length;
        this.elements.votesCount.textContent = lockedCount;

        // Check if all voted
        if (lockedCount === this.state.playerCount) {
            setTimeout(() => this.showReveal(), 500);
        }
    },

    /**
     * Show reveal screen
     */
    showReveal() {
        const q = this.state.questions[this.state.currentQuestion];

        // Set question text
        this.elements.revealOptionA.textContent = q.a;
        this.elements.revealOptionB.textContent = q.b;

        // Count votes
        let countA = 0;
        let countB = 0;

        this.elements.votersA.innerHTML = '';
        this.elements.votersB.innerHTML = '';

        this.state.votes.forEach((vote, i) => {
            const badge = document.createElement('span');
            badge.className = `voter-badge p${i + 1}`;
            badge.textContent = `P${i + 1}`;

            if (vote.choice === 'a') {
                countA++;
                this.elements.votersA.appendChild(badge);
            } else {
                countB++;
                this.elements.votersB.appendChild(badge);
            }
        });

        // Update counts
        this.elements.countA.textContent = countA;
        this.elements.countB.textContent = countB;

        // Update tally bar
        const total = countA + countB;
        const percentA = total > 0 ? (countA / total) * 100 : 50;
        const percentB = total > 0 ? (countB / total) * 100 : 50;

        this.elements.tallyA.style.width = `${percentA}%`;
        this.elements.tallyB.style.width = `${percentB}%`;

        // Track stats
        if (countA === this.state.playerCount || countB === this.state.playerCount) {
            this.state.unanimousCount++;
        }
        if (countA === countB && this.state.playerCount % 2 === 0) {
            this.state.splitCount++;
        }

        // Update button text
        if (this.state.currentQuestion >= this.state.questionCount - 1) {
            this.elements.nextBtn.textContent = 'See Results';
        } else {
            this.elements.nextBtn.textContent = 'Next Question';
        }

        this.showScreen('reveal');
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
