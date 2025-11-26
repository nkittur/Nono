/**
 * Emposter - Find the Emoji Impostor!
 * Main Game Logic
 */

const Game = {
    // Game State
    state: {
        currentScreen: 'welcome',
        playerCount: 4,
        roundCount: 3,
        currentRound: 0,
        selectedCategories: [],
        currentPlayerIndex: 0,
        impostorIndex: -1,
        currentPrompt: null,
        playerEmojis: [],
        usedPrompts: []
    },

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
                prompt: document.getElementById('screen-prompt'),
                input: document.getElementById('screen-input'),
                reveal: document.getElementById('screen-reveal'),
                voting: document.getElementById('screen-voting'),
                result: document.getElementById('screen-result'),
                gameover: document.getElementById('screen-gameover')
            },
            // Setup
            playerCount: document.getElementById('player-count'),
            roundCount: document.getElementById('round-count'),
            categoryGrid: document.getElementById('category-grid'),
            // Pass
            currentPlayerName: document.getElementById('current-player-name'),
            // Prompt
            promptCard: document.getElementById('prompt-card'),
            promptLabel: document.getElementById('prompt-label'),
            promptWord: document.getElementById('prompt-word'),
            promptRole: document.getElementById('prompt-role'),
            // Input
            emojiInput: document.getElementById('emoji-input'),
            submitBtn: document.getElementById('submit-btn'),
            // Reveal
            emojiGallery: document.getElementById('emoji-gallery'),
            // Voting
            countdownContainer: document.getElementById('countdown-container'),
            countdownNumber: document.getElementById('countdown-number'),
            votingOptions: document.getElementById('voting-options'),
            revealBtn: document.getElementById('reveal-btn'),
            // Result
            resultIcon: document.getElementById('result-icon'),
            resultTitle: document.getElementById('result-title'),
            impostorName: document.getElementById('impostor-name'),
            realWord: document.getElementById('real-word'),
            impostorWord: document.getElementById('impostor-word'),
            roundStatus: document.getElementById('round-status'),
            nextRoundBtn: document.getElementById('next-round-btn'),
            // Game Over
            finalRounds: document.getElementById('final-rounds'),
            finalPlayers: document.getElementById('final-players')
        };
    },

    /**
     * Load saved settings
     */
    loadSettings() {
        try {
            const saved = localStorage.getItem('emposter-settings');
            if (saved) {
                const settings = JSON.parse(saved);
                if (settings.playerCount) {
                    this.state.playerCount = settings.playerCount;
                    this.elements.playerCount.textContent = settings.playerCount;
                }
                if (settings.roundCount) {
                    this.state.roundCount = settings.roundCount;
                    this.elements.roundCount.textContent = settings.roundCount;
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
            localStorage.setItem('emposter-settings', JSON.stringify({
                playerCount: this.state.playerCount,
                roundCount: this.state.roundCount,
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

            // Scroll to top of screen
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
     * Adjust player count
     */
    adjustPlayers(delta) {
        const newCount = this.state.playerCount + delta;
        if (newCount >= 3 && newCount <= 10) {
            this.state.playerCount = newCount;
            this.elements.playerCount.textContent = newCount;
        }
    },

    /**
     * Adjust round count
     */
    adjustRounds(delta) {
        const newCount = this.state.roundCount + delta;
        if (newCount >= 1 && newCount <= 10) {
            this.state.roundCount = newCount;
            this.elements.roundCount.textContent = newCount;
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
        this.state.currentRound = 0;
        this.state.usedPrompts = [];

        // Start first round
        this.startRound();
    },

    /**
     * Start a new round
     */
    startRound() {
        this.state.currentRound++;
        this.state.currentPlayerIndex = 0;
        this.state.playerEmojis = [];

        // Pick random impostor
        this.state.impostorIndex = Math.floor(Math.random() * this.state.playerCount);

        // Pick random prompt
        this.pickPrompt();

        // Show pass screen for first player
        this.showPassScreen();
    },

    /**
     * Pick a random prompt from selected categories
     */
    pickPrompt() {
        // Get all available prompts from selected categories
        let availablePrompts = [];
        this.state.selectedCategories.forEach(categoryId => {
            const category = PROMPTS[categoryId];
            if (category) {
                category.items.forEach((item, index) => {
                    const promptId = `${categoryId}-${index}`;
                    if (!this.state.usedPrompts.includes(promptId)) {
                        availablePrompts.push({
                            ...item,
                            id: promptId
                        });
                    }
                });
            }
        });

        // If all prompts used, reset
        if (availablePrompts.length === 0) {
            this.state.usedPrompts = [];
            return this.pickPrompt();
        }

        // Pick random prompt
        const randomIndex = Math.floor(Math.random() * availablePrompts.length);
        this.state.currentPrompt = availablePrompts[randomIndex];
        this.state.usedPrompts.push(this.state.currentPrompt.id);
    },

    /**
     * Show pass device screen
     */
    showPassScreen() {
        const playerNum = this.state.currentPlayerIndex + 1;
        this.elements.currentPlayerName.textContent = `Player ${playerNum}`;
        this.showScreen('pass');
    },

    /**
     * Show prompt to current player
     */
    showPrompt() {
        const isImpostor = this.state.currentPlayerIndex === this.state.impostorIndex;

        if (isImpostor) {
            this.elements.promptLabel.textContent = "Your word is:";
            this.elements.promptWord.textContent = this.state.currentPrompt.impostor;
            this.elements.promptRole.textContent = "🕵️ You are the IMPOSTOR!";
            this.elements.promptRole.className = 'prompt-role impostor';
            this.elements.promptCard.classList.add('impostor');
        } else {
            this.elements.promptLabel.textContent = "Your word is:";
            this.elements.promptWord.textContent = this.state.currentPrompt.real;
            this.elements.promptRole.textContent = "✓ You are NOT the impostor";
            this.elements.promptRole.className = 'prompt-role normal';
            this.elements.promptCard.classList.remove('impostor');
        }

        this.showScreen('prompt');
    },

    /**
     * Show emoji input screen
     */
    showInput() {
        this.elements.emojiInput.value = '';
        this.showScreen('input');

        // Focus input after animation
        setTimeout(() => {
            this.elements.emojiInput.focus();
        }, 300);
    },

    /**
     * Submit emojis for current player
     */
    submitEmojis() {
        const emojis = this.elements.emojiInput.value.trim();

        if (emojis.length === 0) {
            // Show validation
            this.elements.emojiInput.style.borderColor = 'var(--color-danger)';
            setTimeout(() => {
                this.elements.emojiInput.style.borderColor = '';
            }, 500);
            return;
        }

        // Store emojis
        this.state.playerEmojis.push({
            player: this.state.currentPlayerIndex + 1,
            emojis: emojis,
            isImpostor: this.state.currentPlayerIndex === this.state.impostorIndex
        });

        // Move to next player
        this.state.currentPlayerIndex++;

        if (this.state.currentPlayerIndex < this.state.playerCount) {
            // More players to go
            this.showPassScreen();
        } else {
            // All players done, show reveal
            this.showReveal();
        }
    },

    /**
     * Show emoji reveal screen
     */
    showReveal() {
        this.elements.emojiGallery.innerHTML = '';

        // Shuffle order for display (don't want impostor always in same position)
        const shuffledEmojis = [...this.state.playerEmojis];
        this.shuffleArray(shuffledEmojis);

        shuffledEmojis.forEach(entry => {
            const card = document.createElement('div');
            card.className = 'emoji-entry';
            card.innerHTML = `
                <div class="entry-player">Player ${entry.player}</div>
                <div class="entry-emojis">${entry.emojis}</div>
            `;
            this.elements.emojiGallery.appendChild(card);
        });

        this.showScreen('reveal');
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
     * Show voting screen
     */
    showVoting() {
        // Render voting options
        this.elements.votingOptions.innerHTML = '';
        for (let i = 1; i <= this.state.playerCount; i++) {
            const option = document.createElement('div');
            option.className = 'vote-option';
            option.textContent = `Player ${i}`;
            this.elements.votingOptions.appendChild(option);
        }

        // Reset countdown
        this.elements.countdownContainer.classList.remove('active');
        this.elements.revealBtn.style.display = 'none';
        document.querySelector('#screen-voting .btn-primary').style.display = '';

        this.showScreen('voting');
    },

    /**
     * Start countdown for voting
     */
    startCountdown() {
        document.querySelector('#screen-voting .btn-primary').style.display = 'none';
        this.elements.countdownContainer.classList.add('active');

        let count = 3;
        this.elements.countdownNumber.textContent = count;

        const interval = setInterval(() => {
            count--;
            if (count > 0) {
                this.elements.countdownNumber.textContent = count;
                this.elements.countdownNumber.style.animation = 'none';
                this.elements.countdownNumber.offsetHeight;
                this.elements.countdownNumber.style.animation = 'countPop 0.5s ease';
            } else {
                clearInterval(interval);
                this.elements.countdownNumber.textContent = "VOTE!";
                this.elements.countdownNumber.style.animation = 'none';
                this.elements.countdownNumber.offsetHeight;
                this.elements.countdownNumber.style.animation = 'countPop 0.5s ease';

                // Show reveal button
                setTimeout(() => {
                    this.elements.revealBtn.style.display = '';
                }, 2000);
            }
        }, 1000);
    },

    /**
     * Show result screen
     */
    showResult() {
        const impostorPlayerNum = this.state.impostorIndex + 1;

        this.elements.impostorName.textContent = `Player ${impostorPlayerNum}`;
        this.elements.realWord.textContent = this.state.currentPrompt.real;
        this.elements.impostorWord.textContent = this.state.currentPrompt.impostor;
        this.elements.roundStatus.textContent = `Round ${this.state.currentRound} of ${this.state.roundCount}`;

        // Update button text based on remaining rounds
        if (this.state.currentRound >= this.state.roundCount) {
            this.elements.nextRoundBtn.textContent = "See Final Results";
        } else {
            this.elements.nextRoundBtn.textContent = "Next Round";
        }

        this.showScreen('result');
    },

    /**
     * Start next round or end game
     */
    nextRound() {
        if (this.state.currentRound >= this.state.roundCount) {
            this.showGameOver();
        } else {
            this.startRound();
        }
    },

    /**
     * Show game over screen
     */
    showGameOver() {
        this.elements.finalRounds.textContent = this.state.roundCount;
        this.elements.finalPlayers.textContent = this.state.playerCount;
        this.showScreen('gameover');
    },

    /**
     * Play again
     */
    playAgain() {
        this.state.currentRound = 0;
        this.state.usedPrompts = [];
        this.startRound();
    },

    /**
     * Reset game
     */
    resetGame() {
        this.state.currentRound = 0;
        this.state.currentPlayerIndex = 0;
        this.state.playerEmojis = [];
        this.state.usedPrompts = [];
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => Game.init());

// Warn before leaving during active game
window.addEventListener('beforeunload', (e) => {
    if (Game.state.currentRound > 0 && Game.state.currentScreen !== 'gameover') {
        e.preventDefault();
        e.returnValue = '';
    }
});
