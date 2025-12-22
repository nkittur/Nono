/**
 * 2 Truths and a Lie - Team Trivia Game
 * Main Game Logic
 */

const Game = {
    // Game configuration
    config: {
        totalRounds: 10,
        revealDelay: 300
    },

    // Game state
    state: {
        currentScreen: 'welcome',
        selectedTopic: null,
        currentRound: 0,
        score: 0,
        facts: [],
        currentFact: null,
        selectedAnswer: null,
        hasAnswered: false
    },

    // DOM elements
    elements: {},

    /**
     * Initialize the game
     */
    init() {
        this.cacheElements();
        this.renderTopicGrid();
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
                reveal: document.getElementById('screen-reveal'),
                results: document.getElementById('screen-results')
            },
            // Setup
            topicGrid: document.getElementById('topic-grid'),
            selectedTopicDisplay: document.getElementById('selected-topic-display'),
            startBtn: document.getElementById('start-btn'),
            // Game
            roundNumber: document.getElementById('round-number'),
            scoreDisplay: document.getElementById('score-display'),
            statementsContainer: document.getElementById('statements-container'),
            submitBtn: document.getElementById('submit-btn'),
            // Reveal
            revealContainer: document.getElementById('reveal-container'),
            revealResult: document.getElementById('reveal-result'),
            revealIcon: document.getElementById('reveal-icon'),
            revealText: document.getElementById('reveal-text'),
            sourceLink: document.getElementById('source-link'),
            currentScore: document.getElementById('current-score'),
            nextBtn: document.getElementById('next-btn'),
            // Results
            finalScore: document.getElementById('final-score'),
            scoreMessage: document.getElementById('score-message'),
            scoreBar: document.getElementById('score-bar')
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
     * Render topic selection grid
     */
    renderTopicGrid() {
        const topics = getTopics();
        const topicIcons = {
            animals: '🦁',
            science: '🔬',
            history: '📜',
            food: '🍕',
            human_body: '🫀',
            geography: '🌍',
            technology: '💻',
            pop_culture: '🎬',
            space: '🚀'
        };

        // Add "Mixed" option first
        let html = `
            <button class="topic-btn" data-topic="mixed">
                <span class="topic-icon">🎲</span>
                <span class="topic-name">Mixed</span>
            </button>
        `;

        topics.forEach(topic => {
            const icon = topicIcons[topic.id] || '❓';
            html += `
                <button class="topic-btn" data-topic="${topic.id}">
                    <span class="topic-icon">${icon}</span>
                    <span class="topic-name">${topic.name}</span>
                </button>
            `;
        });

        this.elements.topicGrid.innerHTML = html;

        // Add click handlers
        this.elements.topicGrid.querySelectorAll('.topic-btn').forEach(btn => {
            btn.addEventListener('click', () => this.selectTopic(btn.dataset.topic));
        });
    },

    /**
     * Select a topic
     */
    selectTopic(topicId) {
        this.state.selectedTopic = topicId;

        // Update UI
        this.elements.topicGrid.querySelectorAll('.topic-btn').forEach(btn => {
            btn.classList.toggle('selected', btn.dataset.topic === topicId);
        });

        const topicName = topicId === 'mixed' ? 'Mixed Topics' :
            topicId.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        this.elements.selectedTopicDisplay.textContent = topicName;
        this.elements.startBtn.disabled = false;
    },

    /**
     * Navigation
     */
    showWelcome() {
        this.showScreen('welcome');
    },

    showSetup() {
        this.state.selectedTopic = null;
        this.elements.startBtn.disabled = true;
        this.elements.selectedTopicDisplay.textContent = 'Choose a topic';
        this.elements.topicGrid.querySelectorAll('.topic-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
        this.showScreen('setup');
    },

    /**
     * Start the game
     */
    startGame() {
        if (!this.state.selectedTopic) return;

        // Get facts for selected topic
        if (this.state.selectedTopic === 'mixed') {
            this.state.facts = getMixedFacts(this.config.totalRounds);
        } else {
            this.state.facts = getFactsForTopic(this.state.selectedTopic, this.config.totalRounds);
        }

        // Reset state
        this.state.currentRound = 0;
        this.state.score = 0;

        this.showRound();
    },

    /**
     * Show current round
     */
    showRound() {
        const fact = this.state.facts[this.state.currentRound];
        this.state.currentFact = fact;
        this.state.selectedAnswer = null;
        this.state.hasAnswered = false;

        // Update header
        this.elements.roundNumber.textContent = this.state.currentRound + 1;
        this.elements.scoreDisplay.textContent = this.state.score;

        // Shuffle statements
        const shuffledStatements = [...fact.statements].sort(() => Math.random() - 0.5);
        this.state.currentFact.shuffledStatements = shuffledStatements;

        // Render statements
        this.renderStatements(shuffledStatements);

        // Reset submit button
        this.elements.submitBtn.disabled = true;
        this.elements.submitBtn.textContent = 'Which is the LIE?';

        this.showScreen('game');
    },

    /**
     * Render statement cards
     */
    renderStatements(statements) {
        const container = this.elements.statementsContainer;
        container.innerHTML = '';

        statements.forEach((statement, index) => {
            const card = document.createElement('button');
            card.className = 'statement-card';
            card.dataset.index = index;
            card.innerHTML = `
                <span class="statement-number">${index + 1}</span>
                <p class="statement-text">${statement.text}</p>
            `;
            card.addEventListener('click', () => this.selectStatement(index));
            container.appendChild(card);
        });
    },

    /**
     * Select a statement as the lie
     */
    selectStatement(index) {
        if (this.state.hasAnswered) return;

        this.state.selectedAnswer = index;

        // Update UI
        this.elements.statementsContainer.querySelectorAll('.statement-card').forEach((card, i) => {
            card.classList.toggle('selected', i === index);
        });

        this.elements.submitBtn.disabled = false;
        this.elements.submitBtn.textContent = 'Lock In Answer';
    },

    /**
     * Submit the answer
     */
    submitAnswer() {
        if (this.state.selectedAnswer === null || this.state.hasAnswered) return;

        this.state.hasAnswered = true;
        const selectedStatement = this.state.currentFact.shuffledStatements[this.state.selectedAnswer];
        const isCorrect = !selectedStatement.truth; // Correct if they selected the lie

        if (isCorrect) {
            this.state.score++;
        }

        this.showReveal(isCorrect, selectedStatement);
    },

    /**
     * Show the reveal screen
     */
    showReveal(isCorrect, selectedStatement) {
        const container = this.elements.revealContainer;
        container.innerHTML = '';

        // Render all statements with their true/false status
        this.state.currentFact.shuffledStatements.forEach((statement, index) => {
            const card = document.createElement('div');
            const wasSelected = index === this.state.selectedAnswer;
            card.className = `reveal-card ${statement.truth ? 'truth' : 'lie'} ${wasSelected ? 'selected' : ''}`;

            card.innerHTML = `
                <div class="reveal-card-header">
                    <span class="reveal-label ${statement.truth ? 'truth' : 'lie'}">
                        ${statement.truth ? 'TRUTH' : 'LIE'}
                    </span>
                    ${wasSelected ? '<span class="your-pick">Your pick</span>' : ''}
                </div>
                <p class="reveal-statement">${statement.text}</p>
                ${statement.truth && statement.source ? `
                    <a href="${statement.source}" target="_blank" rel="noopener" class="source-link">
                        View Source
                    </a>
                ` : ''}
            `;
            container.appendChild(card);
        });

        // Update result display
        this.elements.revealResult.className = `reveal-result ${isCorrect ? 'correct' : 'incorrect'}`;
        this.elements.revealIcon.textContent = isCorrect ? '🎉' : '😅';
        this.elements.revealText.textContent = isCorrect ? 'You found the lie!' : 'That was actually true!';
        this.elements.currentScore.textContent = `Score: ${this.state.score}/${this.state.currentRound + 1}`;

        // Update next button
        const isLastRound = this.state.currentRound >= this.config.totalRounds - 1;
        this.elements.nextBtn.textContent = isLastRound ? 'See Results' : 'Next Round';

        this.showScreen('reveal');
    },

    /**
     * Go to next round or results
     */
    nextRound() {
        this.state.currentRound++;

        if (this.state.currentRound >= this.config.totalRounds) {
            this.showResults();
        } else {
            this.showRound();
        }
    },

    /**
     * Show final results
     */
    showResults() {
        const score = this.state.score;
        const total = this.config.totalRounds;
        const percentage = Math.round((score / total) * 100);

        this.elements.finalScore.textContent = `${score}/${total}`;
        this.elements.scoreBar.style.width = `${percentage}%`;

        // Set message based on score
        let message = '';
        let barColor = '';

        if (percentage === 100) {
            message = 'Perfect! You\'re a lie-detecting genius!';
            barColor = 'var(--color-success)';
        } else if (percentage >= 80) {
            message = 'Excellent! You\'re a natural skeptic!';
            barColor = 'var(--color-success)';
        } else if (percentage >= 60) {
            message = 'Good job! You\'ve got sharp instincts!';
            barColor = 'var(--color-primary)';
        } else if (percentage >= 40) {
            message = 'Not bad! Some of those were tricky!';
            barColor = 'var(--color-warning)';
        } else if (percentage >= 20) {
            message = 'Those lies were convincing! Try again?';
            barColor = 'var(--color-warning)';
        } else {
            message = 'The truth is stranger than fiction!';
            barColor = 'var(--color-danger)';
        }

        this.elements.scoreMessage.textContent = message;
        this.elements.scoreBar.style.background = barColor;

        this.showScreen('results');
    },

    /**
     * Play again with same topic
     */
    playAgain() {
        this.startGame();
    },

    /**
     * Change topic
     */
    changeTopic() {
        this.showSetup();
    }
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => Game.init());
