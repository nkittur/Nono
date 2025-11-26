/**
 * Song Clash - Emoji Music Guessing Game
 * Main Game Logic
 */

const Game = {
    // Game State
    state: {
        currentScreen: 'welcome',
        selectedDecades: [],
        difficulty: 'mixed',
        targetScore: 15,
        timerDuration: 30,
        score: 0,
        roundNumber: 0,
        roundScore: 0,
        currentSongs: [],
        currentSongIndex: 0,
        currentSong: null,
        timerInterval: null,
        timeRemaining: 0,
        isTimerRunning: false
    },

    // DOM Elements
    elements: {},

    /**
     * Initialize the game
     */
    init() {
        this.cacheElements();
        this.renderDecadeSelection();
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
                ready: document.getElementById('screen-ready'),
                clue: document.getElementById('screen-clue'),
                answer: document.getElementById('screen-answer'),
                summary: document.getElementById('screen-summary'),
                victory: document.getElementById('screen-victory')
            },
            // Setup
            decadeSelection: document.getElementById('decade-selection'),
            targetScore: document.getElementById('target-score'),
            difficultyOptions: document.querySelectorAll('.difficulty-options .btn-option'),
            timerOptions: document.querySelectorAll('.timer-options .btn-option'),
            // Ready
            readyScore: document.getElementById('ready-score'),
            readyTarget: document.getElementById('ready-target'),
            readyRound: document.getElementById('ready-round'),
            // Clue
            timerText: document.getElementById('timer-text'),
            timerProgress: document.getElementById('timer-progress'),
            roundScore: document.getElementById('round-score'),
            roundTarget: document.getElementById('round-target'),
            clueEmojis: document.getElementById('clue-emojis'),
            clueHint: document.getElementById('clue-hint'),
            // Answer
            answerEmojis: document.getElementById('answer-emojis'),
            answerTitle: document.getElementById('answer-title'),
            answerArtist: document.getElementById('answer-artist'),
            // Summary
            summaryIcon: document.getElementById('summary-icon'),
            summaryTitle: document.getElementById('summary-title'),
            summaryRoundPoints: document.getElementById('summary-round-points'),
            summaryTotal: document.getElementById('summary-total'),
            summaryProgress: document.getElementById('summary-progress'),
            summaryProgressLabel: document.getElementById('summary-progress-label'),
            // Victory
            victoryScore: document.getElementById('victory-score'),
            victoryRounds: document.getElementById('victory-rounds')
        };
    },

    /**
     * Load saved settings
     */
    loadSettings() {
        try {
            const saved = localStorage.getItem('song-clash-settings');
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
                if (settings.difficulty) {
                    this.state.difficulty = settings.difficulty;
                    this.updateDifficultyUI();
                }
                if (settings.selectedDecades && settings.selectedDecades.length > 0) {
                    this.state.selectedDecades = settings.selectedDecades;
                    this.updateDecadeSelectionUI();
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
            localStorage.setItem('song-clash-settings', JSON.stringify({
                targetScore: this.state.targetScore,
                timerDuration: this.state.timerDuration,
                difficulty: this.state.difficulty,
                selectedDecades: this.state.selectedDecades
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
     * Render decade selection
     */
    renderDecadeSelection() {
        const container = this.elements.decadeSelection;
        container.innerHTML = '';

        Object.entries(SONGS.decades).forEach(([id, decade]) => {
            const option = document.createElement('div');
            option.className = 'decade-option';
            option.dataset.decadeId = id;
            option.innerHTML = `
                <span class="decade-emoji">${decade.emoji}</span>
                <span class="decade-name">${decade.name}</span>
            `;
            option.addEventListener('click', () => this.toggleDecade(id));
            container.appendChild(option);
        });
    },

    /**
     * Toggle decade selection
     */
    toggleDecade(decadeId) {
        const index = this.state.selectedDecades.indexOf(decadeId);
        if (index > -1) {
            this.state.selectedDecades.splice(index, 1);
        } else {
            this.state.selectedDecades.push(decadeId);
        }
        this.updateDecadeSelectionUI();
    },

    /**
     * Update decade selection UI
     */
    updateDecadeSelectionUI() {
        const options = this.elements.decadeSelection.querySelectorAll('.decade-option');
        options.forEach(option => {
            const decadeId = option.dataset.decadeId;
            if (this.state.selectedDecades.includes(decadeId)) {
                option.classList.add('selected');
            } else {
                option.classList.remove('selected');
            }
        });
    },

    /**
     * Set difficulty
     */
    setDifficulty(difficulty) {
        this.state.difficulty = difficulty;
        this.updateDifficultyUI();
    },

    /**
     * Update difficulty UI
     */
    updateDifficultyUI() {
        this.elements.difficultyOptions.forEach(btn => {
            const diff = btn.dataset.difficulty;
            if (diff === this.state.difficulty) {
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
        if (newTarget >= 5 && newTarget <= 50) {
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
     * Start the game
     */
    startGame() {
        // Default to all decades if none selected
        if (this.state.selectedDecades.length === 0) {
            this.state.selectedDecades = Object.keys(SONGS.decades);
            this.updateDecadeSelectionUI();
        }

        this.saveSettings();

        // Reset game state
        this.state.score = 0;
        this.state.roundNumber = 0;

        // Prepare songs
        this.prepareSongs();

        // Show ready screen
        this.prepareReadyScreen();
        this.showScreen('ready');
    },

    /**
     * Prepare songs from selected decades
     */
    prepareSongs() {
        this.state.currentSongs = [];

        this.state.selectedDecades.forEach(decadeId => {
            const decade = SONGS.decades[decadeId];
            if (decade) {
                let songs = [...decade.songs];

                // Filter by difficulty if not mixed
                if (this.state.difficulty !== 'mixed') {
                    songs = songs.filter(s => s.difficulty === this.state.difficulty);
                }

                this.state.currentSongs.push(...songs);
            }
        });

        // Shuffle songs
        this.shuffleArray(this.state.currentSongs);
        this.state.currentSongIndex = 0;
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
     * Prepare ready screen
     */
    prepareReadyScreen() {
        this.elements.readyScore.textContent = this.state.score;
        this.elements.readyTarget.textContent = this.state.targetScore;
        this.elements.readyRound.textContent = this.state.roundNumber + 1;
    },

    /**
     * Start a round
     */
    startRound() {
        this.state.roundNumber++;
        this.state.roundScore = 0;
        this.state.timeRemaining = this.state.timerDuration;

        // Update UI
        this.elements.roundScore.textContent = this.state.score;
        this.elements.roundTarget.textContent = this.state.targetScore;

        // Show first song
        this.showNextSong();

        // Show clue screen
        this.showScreen('clue');

        // Start timer
        this.startTimer();
    },

    /**
     * Show next song
     */
    showNextSong() {
        // Check if we need to reshuffle
        if (this.state.currentSongIndex >= this.state.currentSongs.length) {
            this.shuffleArray(this.state.currentSongs);
            this.state.currentSongIndex = 0;
        }

        this.state.currentSong = this.state.currentSongs[this.state.currentSongIndex];
        this.state.currentSongIndex++;

        // Update UI
        this.elements.clueEmojis.textContent = this.state.currentSong.emojis;
        this.elements.clueHint.textContent = '';

        // Animate card
        const card = document.querySelector('.clue-card');
        card.style.animation = 'none';
        card.offsetHeight;
        card.style.animation = 'cardIn 0.25s ease';
    },

    /**
     * They got it - mark as correct immediately
     */
    gotIt() {
        if (!this.state.isTimerRunning) return;

        this.state.roundScore++;
        this.state.score++;
        this.elements.roundScore.textContent = this.state.score;

        // Check for victory
        if (this.state.score >= this.state.targetScore) {
            this.stopTimer();
            this.showVictory();
            return;
        }

        // Show next song
        this.showNextSong();
    },

    /**
     * Skip song
     */
    skipSong() {
        if (!this.state.isTimerRunning) return;
        this.showNextSong();
    },

    /**
     * Reveal answer
     */
    revealAnswer() {
        this.stopTimer();

        // Update answer screen
        this.elements.answerEmojis.textContent = this.state.currentSong.emojis;
        this.elements.answerTitle.textContent = this.state.currentSong.title;
        this.elements.answerArtist.textContent = this.state.currentSong.artist;

        this.showScreen('answer');
    },

    /**
     * Mark as correct from answer screen
     */
    markCorrect() {
        this.state.roundScore++;
        this.state.score++;

        // Check for victory
        if (this.state.score >= this.state.targetScore) {
            this.showVictory();
            return;
        }

        // Continue round with new timer
        this.state.timeRemaining = this.state.timerDuration;
        this.showNextSong();
        this.showScreen('clue');
        this.startTimer();
    },

    /**
     * Mark as wrong from answer screen
     */
    markWrong() {
        // Continue round with new timer
        this.state.timeRemaining = this.state.timerDuration;
        this.showNextSong();
        this.showScreen('clue');
        this.startTimer();
    },

    /**
     * Start timer
     */
    startTimer() {
        this.state.isTimerRunning = true;
        this.updateTimerDisplay();

        const circumference = 2 * Math.PI * 45;
        this.elements.timerProgress.style.strokeDasharray = circumference;
        this.elements.timerProgress.style.strokeDashoffset = 0;

        this.state.timerInterval = setInterval(() => {
            this.state.timeRemaining--;

            if (this.state.timeRemaining <= 0) {
                this.endRound();
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

        const circumference = 2 * Math.PI * 45;
        const progress = time / this.state.timerDuration;
        const offset = circumference * (1 - progress);
        this.elements.timerProgress.style.strokeDashoffset = offset;

        // Update color
        const progressEl = this.elements.timerProgress;
        progressEl.classList.remove('warning', 'danger');

        if (time <= 5) {
            progressEl.classList.add('danger');
        } else if (time <= 10) {
            progressEl.classList.add('warning');
        }
    },

    /**
     * Stop timer
     */
    stopTimer() {
        this.state.isTimerRunning = false;
        if (this.state.timerInterval) {
            clearInterval(this.state.timerInterval);
            this.state.timerInterval = null;
        }
    },

    /**
     * End round
     */
    endRound() {
        this.stopTimer();
        this.showSummary();
    },

    /**
     * Show round summary
     */
    showSummary() {
        const roundScore = this.state.roundScore;

        // Set icon and title based on performance
        if (roundScore === 0) {
            this.elements.summaryIcon.textContent = '😅';
            this.elements.summaryTitle.textContent = 'Tough Crowd!';
        } else if (roundScore <= 2) {
            this.elements.summaryIcon.textContent = '🎵';
            this.elements.summaryTitle.textContent = 'Nice!';
        } else if (roundScore <= 4) {
            this.elements.summaryIcon.textContent = '🎤';
            this.elements.summaryTitle.textContent = 'Great Round!';
        } else {
            this.elements.summaryIcon.textContent = '🔥';
            this.elements.summaryTitle.textContent = 'On Fire!';
        }

        this.elements.summaryRoundPoints.textContent = `+${roundScore}`;
        this.elements.summaryTotal.textContent = this.state.score;

        // Update progress
        const progressPercent = Math.min(100, (this.state.score / this.state.targetScore) * 100);
        this.elements.summaryProgress.style.width = `${progressPercent}%`;
        this.elements.summaryProgressLabel.textContent = `${this.state.score} / ${this.state.targetScore}`;

        this.showScreen('summary');
    },

    /**
     * Next round
     */
    nextRound() {
        this.prepareReadyScreen();
        this.showScreen('ready');
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
        this.prepareSongs();
        this.prepareReadyScreen();
        this.showScreen('ready');
    },

    /**
     * Reset game
     */
    resetGame() {
        this.stopTimer();
        this.state.score = 0;
        this.state.roundNumber = 0;
        this.state.roundScore = 0;
        this.state.currentSongIndex = 0;
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => Game.init());

// Warn before leaving during active game
window.addEventListener('beforeunload', (e) => {
    if (Game.state.isTimerRunning || Game.state.score > 0) {
        e.preventDefault();
        e.returnValue = '';
    }
});
