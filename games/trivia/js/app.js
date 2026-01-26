/**
 * Trivia Showdown - Main Game Logic
 * Two teams compete to answer trivia questions
 */

const Game = {
    state: {
        currentScreen: 'welcome',
        team1Name: 'Team 1',
        team2Name: 'Team 2',
        team1Score: 0,
        team2Score: 0,
        targetScore: 10,
        currentTeam: 1,
        questionIndex: 0,
        totalQuestions: 0,
        correctAnswers: 0,
        selectedCategories: [],
        currentQuestions: [],
        currentQuestion: null,
        timerInterval: null,
        timeRemaining: 20,
        answered: false
    },

    elements: {},

    init() {
        this.cacheElements();
        this.setupEventListeners();
        this.loadSettings();
        this.populateCategories();
    },

    cacheElements() {
        this.elements.screens = {
            welcome: document.getElementById('screen-welcome'),
            setup: document.getElementById('screen-setup'),
            question: document.getElementById('screen-question'),
            result: document.getElementById('screen-result'),
            victory: document.getElementById('screen-victory')
        };

        this.elements.team1Name = document.getElementById('team1-name');
        this.elements.team2Name = document.getElementById('team2-name');
        this.elements.categoryGrid = document.getElementById('category-grid');
        this.elements.answersGrid = document.getElementById('answers-grid');
        this.elements.timerFill = document.getElementById('timer-fill');
    },

    setupEventListeners() {
        // Target score buttons
        document.querySelectorAll('[data-target]').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('[data-target]').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.state.targetScore = parseInt(btn.dataset.target);
            });
        });
    },

    populateCategories() {
        const grid = this.elements.categoryGrid;
        grid.innerHTML = '';

        Object.keys(QUESTIONS).forEach(categoryId => {
            const category = QUESTIONS[categoryId];
            const btn = document.createElement('button');
            btn.className = 'btn btn-option category-btn active';
            btn.dataset.category = categoryId;
            btn.innerHTML = `<span class="category-icon">${category.icon}</span><span class="category-name">${category.name}</span>`;
            btn.addEventListener('click', () => {
                btn.classList.toggle('active');
            });
            grid.appendChild(btn);
        });
    },

    showScreen(name) {
        Object.values(this.elements.screens).forEach(screen => {
            screen.classList.remove('active');
        });

        if (this.elements.screens[name]) {
            this.elements.screens[name].classList.add('active');
            this.state.currentScreen = name;
            window.scrollTo(0, 0);
        }
    },

    showWelcome() {
        this.showScreen('welcome');
    },

    showSetup() {
        this.showScreen('setup');
    },

    loadSettings() {
        try {
            const saved = localStorage.getItem('trivia-settings');
            if (saved) {
                const settings = JSON.parse(saved);
                this.state.targetScore = settings.targetScore || 10;
                this.state.team1Name = settings.team1Name || 'Team 1';
                this.state.team2Name = settings.team2Name || 'Team 2';

                // Update UI
                this.elements.team1Name.value = this.state.team1Name;
                this.elements.team2Name.value = this.state.team2Name;

                document.querySelectorAll('[data-target]').forEach(btn => {
                    btn.classList.toggle('active', parseInt(btn.dataset.target) === this.state.targetScore);
                });
            }
        } catch (e) {
            console.log('Could not load settings');
        }
    },

    saveSettings() {
        try {
            localStorage.setItem('trivia-settings', JSON.stringify({
                targetScore: this.state.targetScore,
                team1Name: this.state.team1Name,
                team2Name: this.state.team2Name
            }));
        } catch (e) {
            console.log('Could not save settings');
        }
    },

    startGame() {
        // Get team names
        this.state.team1Name = this.elements.team1Name.value.trim() || 'Team 1';
        this.state.team2Name = this.elements.team2Name.value.trim() || 'Team 2';

        // Get selected categories
        this.state.selectedCategories = [];
        document.querySelectorAll('.category-btn.active').forEach(btn => {
            this.state.selectedCategories.push(btn.dataset.category);
        });

        if (this.state.selectedCategories.length === 0) {
            alert('Please select at least one category!');
            return;
        }

        // Build question pool
        this.state.currentQuestions = [];
        this.state.selectedCategories.forEach(categoryId => {
            const category = QUESTIONS[categoryId];
            category.questions.forEach(q => {
                this.state.currentQuestions.push({
                    ...q,
                    category: category.name,
                    categoryIcon: category.icon
                });
            });
        });

        // Shuffle questions
        this.shuffleArray(this.state.currentQuestions);

        // Reset game state
        this.state.team1Score = 0;
        this.state.team2Score = 0;
        this.state.currentTeam = 1;
        this.state.questionIndex = 0;
        this.state.totalQuestions = 0;
        this.state.correctAnswers = 0;

        this.saveSettings();
        this.showQuestion();
    },

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    },

    showQuestion() {
        // Check if we've run out of questions
        if (this.state.questionIndex >= this.state.currentQuestions.length) {
            // Reshuffle and start over
            this.shuffleArray(this.state.currentQuestions);
            this.state.questionIndex = 0;
        }

        this.state.currentQuestion = this.state.currentQuestions[this.state.questionIndex];
        this.state.answered = false;
        this.state.totalQuestions++;

        // Update display
        document.getElementById('display-team1').textContent = this.state.team1Name;
        document.getElementById('display-team2').textContent = this.state.team2Name;
        document.getElementById('score-team1').textContent = this.state.team1Score;
        document.getElementById('score-team2').textContent = this.state.team2Score;
        document.getElementById('question-number').textContent = `Q${this.state.totalQuestions}`;
        document.getElementById('current-team').textContent = this.state.currentTeam === 1 ? this.state.team1Name : this.state.team2Name;
        document.getElementById('question-category').textContent = `${this.state.currentQuestion.categoryIcon} ${this.state.currentQuestion.category}`;
        document.getElementById('question-text').textContent = this.state.currentQuestion.question;

        // Highlight current team
        document.querySelector('.team1-score').classList.toggle('active-team', this.state.currentTeam === 1);
        document.querySelector('.team2-score').classList.toggle('active-team', this.state.currentTeam === 2);

        // Shuffle and display answers
        const answers = [...this.state.currentQuestion.answers];
        this.shuffleArray(answers);

        const grid = this.elements.answersGrid;
        grid.innerHTML = '';

        answers.forEach((answer, index) => {
            const btn = document.createElement('button');
            btn.className = 'btn answer-btn';
            btn.textContent = answer;
            btn.addEventListener('click', () => this.selectAnswer(answer));
            grid.appendChild(btn);
        });

        // Start timer
        this.startTimer();

        this.showScreen('question');
    },

    startTimer() {
        this.state.timeRemaining = 20;
        this.elements.timerFill.style.width = '100%';
        this.elements.timerFill.classList.remove('warning', 'danger');

        if (this.state.timerInterval) {
            clearInterval(this.state.timerInterval);
        }

        this.state.timerInterval = setInterval(() => {
            this.state.timeRemaining -= 0.1;
            const percent = (this.state.timeRemaining / 20) * 100;
            this.elements.timerFill.style.width = `${percent}%`;

            if (this.state.timeRemaining <= 5) {
                this.elements.timerFill.classList.add('danger');
            } else if (this.state.timeRemaining <= 10) {
                this.elements.timerFill.classList.add('warning');
            }

            if (this.state.timeRemaining <= 0) {
                clearInterval(this.state.timerInterval);
                if (!this.state.answered) {
                    this.timeUp();
                }
            }
        }, 100);
    },

    selectAnswer(answer) {
        if (this.state.answered) return;
        this.state.answered = true;

        clearInterval(this.state.timerInterval);

        const correct = answer === this.state.currentQuestion.correct;

        // Highlight answers
        document.querySelectorAll('.answer-btn').forEach(btn => {
            if (btn.textContent === this.state.currentQuestion.correct) {
                btn.classList.add('correct');
            } else if (btn.textContent === answer && !correct) {
                btn.classList.add('wrong');
            }
            btn.disabled = true;
        });

        // Update score
        if (correct) {
            this.state.correctAnswers++;
            if (this.state.currentTeam === 1) {
                this.state.team1Score++;
            } else {
                this.state.team2Score++;
            }
        }

        // Show result after brief delay
        setTimeout(() => this.showResult(correct), 1000);
    },

    timeUp() {
        this.state.answered = true;

        // Highlight correct answer
        document.querySelectorAll('.answer-btn').forEach(btn => {
            if (btn.textContent === this.state.currentQuestion.correct) {
                btn.classList.add('correct');
            }
            btn.disabled = true;
        });

        setTimeout(() => this.showResult(false, true), 1000);
    },

    showResult(correct, timeUp = false) {
        const resultIcon = document.getElementById('result-icon');
        const resultTitle = document.getElementById('result-title');
        const resultAnswer = document.getElementById('result-answer');

        if (correct) {
            resultIcon.textContent = '✓';
            resultIcon.className = 'result-icon correct';
            resultTitle.textContent = 'Correct!';
            resultTitle.className = 'result-title correct';
        } else if (timeUp) {
            resultIcon.textContent = '⏱';
            resultIcon.className = 'result-icon timeout';
            resultTitle.textContent = 'Time\'s Up!';
            resultTitle.className = 'result-title timeout';
        } else {
            resultIcon.textContent = '✗';
            resultIcon.className = 'result-icon wrong';
            resultTitle.textContent = 'Wrong!';
            resultTitle.className = 'result-title wrong';
        }

        resultAnswer.textContent = `The answer was: ${this.state.currentQuestion.correct}`;

        // Update scores display
        document.getElementById('result-team1').textContent = this.state.team1Name;
        document.getElementById('result-team2').textContent = this.state.team2Name;
        document.getElementById('result-score1').textContent = this.state.team1Score;
        document.getElementById('result-score2').textContent = this.state.team2Score;

        // Highlight leading team
        document.querySelector('.team1-result').classList.toggle('leading', this.state.team1Score > this.state.team2Score);
        document.querySelector('.team2-result').classList.toggle('leading', this.state.team2Score > this.state.team1Score);

        this.showScreen('result');
    },

    nextQuestion() {
        // Check for winner
        if (this.state.team1Score >= this.state.targetScore || this.state.team2Score >= this.state.targetScore) {
            this.showVictory();
            return;
        }

        // Switch teams
        this.state.currentTeam = this.state.currentTeam === 1 ? 2 : 1;
        this.state.questionIndex++;

        this.showQuestion();
    },

    showVictory() {
        const winner = this.state.team1Score >= this.state.targetScore ? this.state.team1Name : this.state.team2Name;

        document.getElementById('victory-title').textContent = `${winner} Wins!`;
        document.getElementById('final-team1').textContent = this.state.team1Name;
        document.getElementById('final-team2').textContent = this.state.team2Name;
        document.getElementById('final-score1').textContent = this.state.team1Score;
        document.getElementById('final-score2').textContent = this.state.team2Score;

        // Highlight winner
        document.querySelectorAll('.final-score').forEach((el, i) => {
            const isWinner = (i === 0 && this.state.team1Score > this.state.team2Score) ||
                           (i === 1 && this.state.team2Score > this.state.team1Score);
            el.classList.toggle('winner', isWinner);
        });

        // Stats
        document.getElementById('stat-questions').textContent = this.state.totalQuestions;
        const accuracy = this.state.totalQuestions > 0
            ? Math.round((this.state.correctAnswers / this.state.totalQuestions) * 100)
            : 0;
        document.getElementById('stat-accuracy').textContent = `${accuracy}%`;

        this.showScreen('victory');
    },

    playAgain() {
        // Keep same settings, restart
        this.state.team1Score = 0;
        this.state.team2Score = 0;
        this.state.currentTeam = 1;
        this.state.questionIndex = 0;
        this.state.totalQuestions = 0;
        this.state.correctAnswers = 0;

        this.shuffleArray(this.state.currentQuestions);
        this.showQuestion();
    }
};

document.addEventListener('DOMContentLoaded', () => Game.init());
