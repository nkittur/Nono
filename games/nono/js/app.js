/**
 * Nono - Word Guessing Game
 * Main Game Logic
 */

const Game = {
    // Game State
    state: {
        currentScreen: 'welcome',
        selectedDecks: [],
        targetScore: 25,
        timerDuration: 60,
        score: 0,
        turnNumber: 0,
        turnPoints: 0,
        currentCards: [],
        currentCardIndex: 0,
        timerInterval: null,
        timeRemaining: 0,
        isTimerRunning: false
    },

    // DOM Elements (cached for performance)
    elements: {},

    /**
     * Initialize the game
     */
    init() {
        this.cacheElements();
        this.renderDeckSelection();
        this.loadSavedSettings();
        this.showScreen('welcome');
    },

    /**
     * Cache DOM elements for faster access
     */
    cacheElements() {
        this.elements = {
            // Screens
            screens: {
                welcome: document.getElementById('screen-welcome'),
                setup: document.getElementById('screen-setup'),
                ready: document.getElementById('screen-ready'),
                game: document.getElementById('screen-game'),
                summary: document.getElementById('screen-summary'),
                victory: document.getElementById('screen-victory')
            },
            // Setup
            deckSelection: document.getElementById('deck-selection'),
            targetScore: document.getElementById('target-score'),
            timerOptions: document.querySelectorAll('.timer-options .btn-option'),
            // Ready Screen
            readyScore: document.getElementById('ready-score'),
            readyTarget: document.getElementById('ready-target'),
            readyTurn: document.getElementById('ready-turn'),
            // Game Screen
            timerText: document.getElementById('timer-text'),
            timerProgress: document.getElementById('timer-progress'),
            turnPoints: document.getElementById('turn-points'),
            cardWord: document.getElementById('card-word'),
            tabooList: document.getElementById('taboo-list'),
            // Summary Screen
            summaryIcon: document.getElementById('summary-icon'),
            summaryTitle: document.getElementById('summary-title'),
            summaryTurnPoints: document.getElementById('summary-turn-points'),
            summaryTotal: document.getElementById('summary-total'),
            summaryProgress: document.getElementById('summary-progress'),
            summaryProgressLabel: document.getElementById('summary-progress-label'),
            // Victory Screen
            victoryScore: document.getElementById('victory-score'),
            victoryTurns: document.getElementById('victory-turns')
        };
    },

    /**
     * Load saved settings from localStorage
     */
    loadSavedSettings() {
        try {
            const saved = localStorage.getItem('nono-settings');
            if (saved) {
                const settings = JSON.parse(saved);
                if (settings.targetScore) {
                    this.state.targetScore = settings.targetScore;
                    this.elements.targetScore.textContent = settings.targetScore;
                }
                if (settings.timerDuration) {
                    this.state.timerDuration = settings.timerDuration;
                    this.updateTimerOptionUI();
                }
                if (settings.selectedDecks && settings.selectedDecks.length > 0) {
                    this.state.selectedDecks = settings.selectedDecks.filter(id => DECKS[id]);
                    this.updateDeckSelectionUI();
                }
            }
        } catch (e) {
            console.log('Could not load saved settings');
        }
    },

    /**
     * Save settings to localStorage
     */
    saveSettings() {
        try {
            localStorage.setItem('nono-settings', JSON.stringify({
                targetScore: this.state.targetScore,
                timerDuration: this.state.timerDuration,
                selectedDecks: this.state.selectedDecks
            }));
        } catch (e) {
            console.log('Could not save settings');
        }
    },

    /**
     * Show a specific screen
     */
    showScreen(screenName) {
        // Hide all screens
        Object.values(this.elements.screens).forEach(screen => {
            screen.classList.remove('active');
        });

        // Show target screen
        const screen = this.elements.screens[screenName];
        if (screen) {
            screen.classList.add('active');
            this.state.currentScreen = screenName;

            // Scroll to top of screen
            window.scrollTo(0, 0);
            screen.scrollTop = 0;
        }
    },

    /**
     * Navigation methods
     */
    showWelcome() {
        this.resetGame();
        this.showScreen('welcome');
    },

    showSetup() {
        this.showScreen('setup');
    },

    /**
     * Render deck selection options
     */
    renderDeckSelection() {
        const container = this.elements.deckSelection;
        container.innerHTML = '';

        Object.values(DECKS).forEach(deck => {
            const option = document.createElement('div');
            option.className = 'deck-option';
            option.dataset.deckId = deck.id;
            option.innerHTML = `
                <span class="deck-icon">${deck.icon}</span>
                <span class="deck-name">${deck.name}</span>
                <span class="deck-count">${deck.cards.length} cards</span>
            `;
            option.addEventListener('click', () => this.toggleDeck(deck.id));
            container.appendChild(option);
        });
    },

    /**
     * Toggle deck selection
     */
    toggleDeck(deckId) {
        const index = this.state.selectedDecks.indexOf(deckId);
        if (index > -1) {
            this.state.selectedDecks.splice(index, 1);
        } else {
            this.state.selectedDecks.push(deckId);
        }
        this.updateDeckSelectionUI();
    },

    /**
     * Update deck selection UI
     */
    updateDeckSelectionUI() {
        const options = this.elements.deckSelection.querySelectorAll('.deck-option');
        options.forEach(option => {
            const deckId = option.dataset.deckId;
            if (this.state.selectedDecks.includes(deckId)) {
                option.classList.add('selected');
            } else {
                option.classList.remove('selected');
            }
        });
    },

    /**
     * Update timer option UI
     */
    updateTimerOptionUI() {
        this.elements.timerOptions.forEach(btn => {
            const time = parseInt(btn.dataset.time);
            if (time === this.state.timerDuration) {
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
        if (newTarget >= 5 && newTarget <= 100) {
            this.state.targetScore = newTarget;
            this.elements.targetScore.textContent = newTarget;
        }
    },

    /**
     * Set timer duration
     */
    setTimer(duration) {
        this.state.timerDuration = duration;
        this.updateTimerOptionUI();
    },

    /**
     * Start the game
     */
    startGame() {
        // Validate deck selection
        if (this.state.selectedDecks.length === 0) {
            this.showToast('Please select at least one deck!');
            return;
        }

        // Save settings
        this.saveSettings();

        // Reset game state
        this.state.score = 0;
        this.state.turnNumber = 0;

        // Prepare cards
        this.prepareCards();

        // Show ready screen
        this.prepareReadyScreen();
        this.showScreen('ready');
    },

    /**
     * Prepare cards from selected decks
     */
    prepareCards() {
        this.state.currentCards = [];
        this.state.selectedDecks.forEach(deckId => {
            const deck = DECKS[deckId];
            if (deck) {
                this.state.currentCards.push(...deck.cards);
            }
        });
        // Shuffle cards
        this.shuffleArray(this.state.currentCards);
        this.state.currentCardIndex = 0;
    },

    /**
     * Fisher-Yates shuffle
     */
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    },

    /**
     * Prepare ready screen with current stats
     */
    prepareReadyScreen() {
        this.elements.readyScore.textContent = this.state.score;
        this.elements.readyTarget.textContent = this.state.targetScore;
        this.elements.readyTurn.textContent = this.state.turnNumber + 1;
    },

    /**
     * Start a turn
     */
    startTurn() {
        this.state.turnNumber++;
        this.state.turnPoints = 0;
        this.state.timeRemaining = this.state.timerDuration;

        // Show game screen
        this.showScreen('game');

        // Show first card
        this.showNextCard();

        // Start timer
        this.startTimer();
    },

    /**
     * Show the next card
     */
    showNextCard() {
        // Check if we need to reshuffle (ran out of cards)
        if (this.state.currentCardIndex >= this.state.currentCards.length) {
            this.shuffleArray(this.state.currentCards);
            this.state.currentCardIndex = 0;
        }

        const card = this.state.currentCards[this.state.currentCardIndex];
        this.state.currentCardIndex++;

        // Update UI
        this.elements.cardWord.textContent = card.word;
        this.elements.tabooList.innerHTML = card.taboo
            .map(word => `<li>${word}</li>`)
            .join('');
        this.elements.turnPoints.textContent = this.state.turnPoints;

        // Animate card entrance
        const cardEl = document.querySelector('.game-card');
        cardEl.style.animation = 'none';
        cardEl.offsetHeight; // Trigger reflow
        cardEl.style.animation = 'cardIn 0.25s ease';
    },

    /**
     * Handle correct guess
     */
    correctGuess() {
        if (!this.state.isTimerRunning) return;

        this.state.turnPoints++;
        this.state.score++;

        // Check for victory
        if (this.state.score >= this.state.targetScore) {
            this.stopTimer();
            this.showVictory();
            return;
        }

        // Show next card
        this.showNextCard();
    },

    /**
     * Handle skip
     */
    skipCard() {
        if (!this.state.isTimerRunning) return;
        this.showNextCard();
    },

    /**
     * Start the timer
     */
    startTimer() {
        this.state.isTimerRunning = true;
        this.updateTimerDisplay();

        // Calculate the circumference for the progress ring
        const circumference = 2 * Math.PI * 45; // radius = 45
        this.elements.timerProgress.style.strokeDasharray = circumference;
        this.elements.timerProgress.style.strokeDashoffset = 0;

        this.state.timerInterval = setInterval(() => {
            this.state.timeRemaining--;

            if (this.state.timeRemaining <= 0) {
                this.endTurn();
            } else {
                this.updateTimerDisplay();
            }
        }, 1000);
    },

    /**
     * Update timer display
     */
    updateTimerDisplay() {
        const time = this.state.timeRemaining;
        this.elements.timerText.textContent = time;

        // Update progress ring
        const circumference = 2 * Math.PI * 45;
        const progress = time / this.state.timerDuration;
        const offset = circumference * (1 - progress);
        this.elements.timerProgress.style.strokeDashoffset = offset;

        // Update color based on time remaining
        const progressEl = this.elements.timerProgress;
        progressEl.classList.remove('warning', 'danger');

        if (time <= 5) {
            progressEl.classList.add('danger');
        } else if (time <= 10) {
            progressEl.classList.add('warning');
        }
    },

    /**
     * Stop the timer
     */
    stopTimer() {
        this.state.isTimerRunning = false;
        if (this.state.timerInterval) {
            clearInterval(this.state.timerInterval);
            this.state.timerInterval = null;
        }
    },

    /**
     * End the current turn
     */
    endTurn() {
        this.stopTimer();
        this.showSummary();
    },

    /**
     * Show turn summary
     */
    showSummary() {
        // Update summary UI
        const turnPoints = this.state.turnPoints;

        // Set icon and title based on performance
        if (turnPoints === 0) {
            this.elements.summaryIcon.textContent = '😅';
            this.elements.summaryTitle.textContent = 'Tough Round!';
        } else if (turnPoints === 1) {
            this.elements.summaryIcon.textContent = '👍';
            this.elements.summaryTitle.textContent = 'Nice!';
        } else if (turnPoints <= 3) {
            this.elements.summaryIcon.textContent = '👏';
            this.elements.summaryTitle.textContent = 'Great Turn!';
        } else {
            this.elements.summaryIcon.textContent = '🔥';
            this.elements.summaryTitle.textContent = 'On Fire!';
        }

        this.elements.summaryTurnPoints.textContent = `+${turnPoints}`;
        this.elements.summaryTotal.textContent = this.state.score;

        // Update progress bar
        const progressPercent = Math.min(100, (this.state.score / this.state.targetScore) * 100);
        this.elements.summaryProgress.style.width = `${progressPercent}%`;
        this.elements.summaryProgressLabel.textContent = `${this.state.score} / ${this.state.targetScore}`;

        this.showScreen('summary');
    },

    /**
     * Proceed to next turn
     */
    nextTurn() {
        this.prepareReadyScreen();
        this.showScreen('ready');
    },

    /**
     * Show victory screen
     */
    showVictory() {
        this.elements.victoryScore.textContent = this.state.score;
        this.elements.victoryTurns.textContent = this.state.turnNumber;
        this.showScreen('victory');
    },

    /**
     * Play again with same settings
     */
    playAgain() {
        this.state.score = 0;
        this.state.turnNumber = 0;
        this.prepareCards();
        this.prepareReadyScreen();
        this.showScreen('ready');
    },

    /**
     * Reset game state
     */
    resetGame() {
        this.stopTimer();
        this.state.score = 0;
        this.state.turnNumber = 0;
        this.state.turnPoints = 0;
        this.state.currentCardIndex = 0;
    },

    /**
     * Show a toast message
     */
    showToast(message) {
        // Create toast element if it doesn't exist
        let toast = document.getElementById('toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'toast';
            toast.style.cssText = `
                position: fixed;
                bottom: 100px;
                left: 50%;
                transform: translateX(-50%);
                background: #334155;
                color: white;
                padding: 12px 24px;
                border-radius: 8px;
                font-size: 14px;
                z-index: 1000;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            document.body.appendChild(toast);
        }

        toast.textContent = message;
        toast.style.opacity = '1';

        setTimeout(() => {
            toast.style.opacity = '0';
        }, 2500);
    }
};

// Initialize game when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    Game.init();
});

// Prevent accidental back navigation
window.addEventListener('beforeunload', (e) => {
    if (Game.state.isTimerRunning || Game.state.score > 0) {
        e.preventDefault();
        e.returnValue = '';
    }
});
