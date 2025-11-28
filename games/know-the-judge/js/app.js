// Know the Judge - Party Game
// Guess how the judge would rank 4 things!

class KnowTheJudge {
    constructor() {
        this.state = {
            playerCount: 4,
            players: [],
            currentRound: 0,
            currentJudgeIndex: 0,
            currentGuesserIndex: 0,
            currentCategory: null,
            guesses: {},
            judgeRanking: [],
            scores: {},
            currentRanking: [],
            activeGridId: null,
            activeButtonId: null
        };

        this.categories = [
            { title: "Best way to spend a lazy Sunday", items: ["Binge-watching TV", "Sleeping until noon", "Having brunch", "Doing absolutely nothing"] },
            { title: "Worst thing to step on barefoot", items: ["A Lego brick", "A wet hairball", "Cold spaghetti", "A slug"] },
            { title: "Most embarrassing ringtone in a meeting", items: ["Baby Shark", "Sexy saxophone", "Your mom calling", "Fart sounds"] },
            { title: "Best pizza topping", items: ["Pepperoni", "Pineapple", "Anchovies", "Plain cheese"] },
            { title: "Worst first date movie", items: ["A 3-hour documentary", "Your ex's home videos", "Cats (2019)", "One you've seen 47 times"] },
            { title: "Best everyday superpower", items: ["Reading minds", "Teleportation", "Invisibility", "Never need sleep"] },
            { title: "Best excuse to cancel plans", items: ["Your pet looks sad", "New episode dropped", "It's raining", "Found good parking"] },
            { title: "Worst elevator companion", items: ["Someone eating tuna", "A close talker", "Movie spoiler person", "Speakerphone caller"] },
            { title: "Best comfort food when sad", items: ["Ice cream", "Mac and cheese", "Pizza", "An entire cake"] },
            { title: "Most suspicious 3am purchase", items: ["A single banana", "Duct tape and rope", "17 cans of beans", "A clown costume"] },
            { title: "Worst job interview answer", items: ["I'm a perfectionist", "What's the WiFi?", "My boss was an idiot", "When's lunch?"] },
            { title: "Best giant pet", items: ["Giant hamster", "Giant duck", "Giant cat", "Giant sloth"] },
            { title: "Most useful skill", items: ["Cooking well", "Fixing anything", "Making people laugh", "Sleep anywhere"] },
            { title: "Worst way to wake up", items: ["Ice water on face", "Earthquake", "Realizing you're late", "Alarm at max volume"] },
            { title: "Best part of being an adult", items: ["Dessert first", "No bedtime", "Your own rules", "Buy whatever"] },
            { title: "Worst household chore", items: ["Cleaning bathroom", "Doing dishes", "Folding laundry", "Trash in the rain"] },
            { title: "Best dinner guest celebrity", items: ["The Rock", "Keanu Reeves", "Oprah", "Gordon Ramsay"] },
            { title: "Most overrated thing", items: ["Avocado toast", "New Year's Eve", "Brunch", "The beach"] },
            { title: "Best era to live in", items: ["The 80s", "The 90s", "Medieval times", "Distant future"] },
            { title: "Worst thing to forget", items: ["Anniversary", "Someone's name mid-chat", "Pants", "Phone at home"] },
            { title: "Best pocket surprise", items: ["$20 bill", "A snack", "Chapstick you need", "Note from past you"] },
            { title: "Worst small talk topic", items: ["The weather", "How busy you are", "Traffic", "Your diet"] },
            { title: "Best free thing in life", items: ["Naps", "Hugs", "Sunshine", "Random compliments"] },
            { title: "Most impressive party trick", items: ["Card tricks", "Juggling", "Doing the splits", "Burping alphabet"] },
            { title: "Worst fashion trend", items: ["Crocs", "Jorts", "Mullets", "Socks with sandals"] },
            { title: "Best breakup excuse", items: ["It's not you, it's me", "Need to find myself", "Psychic said so", "Moving to Antarctica"] },
            { title: "Most relatable life goal", items: ["Financial stability", "True love", "Good sleep", "Being unbothered"] },
            { title: "Worst allergy to have", items: ["Dogs", "Chocolate", "The sun", "Your own sweat"] },
            { title: "Best work perk", items: ["Free food", "Work from home", "Nap rooms", "No meetings"] },
            { title: "Most questionable choice", items: ["Getting bangs", "Texting your ex", "DIY haircut", "Work email on vacation"] },
            { title: "Best fictional place to live", items: ["Hogwarts", "The Shire", "Wakanda", "Animal Crossing"] },
            { title: "Worst thing to run out of", items: ["Toilet paper", "Phone battery", "Hot water", "Patience"] }
        ];

        this.usedCategories = [];
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.querySelectorAll('.count-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.count-btn').forEach(b => b.classList.remove('selected'));
                e.target.classList.add('selected');
                this.state.playerCount = parseInt(e.target.dataset.count);
            });
        });

        document.getElementById('start-btn').addEventListener('click', () => this.startGame());
        document.getElementById('show-category-btn').addEventListener('click', () => this.showJudgeRanking());
        document.getElementById('judge-done-btn').addEventListener('click', () => this.submitJudgeRanking());
        document.getElementById('next-guesser-btn').addEventListener('click', () => this.nextGuesser());
        document.getElementById('submit-guess-btn').addEventListener('click', () => this.submitGuess());
        document.getElementById('next-round-btn').addEventListener('click', () => this.nextRound());
        document.getElementById('play-again-btn').addEventListener('click', () => this.resetGame());
    }

    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById(screenId).classList.add('active');
    }

    startGame() {
        this.state.players = [];
        for (let i = 0; i < this.state.playerCount; i++) {
            this.state.players.push({ name: `Player ${i + 1}`, index: i });
            this.state.scores[i] = 0;
        }
        this.state.currentRound = 1;
        this.state.currentJudgeIndex = 0;
        this.usedCategories = [];
        this.showJudgeScreen();
    }

    showJudgeScreen() {
        const judge = this.state.players[this.state.currentJudgeIndex];
        document.getElementById('round-num').textContent = this.state.currentRound;
        document.getElementById('judge-name').textContent = judge.name;
        this.showScreen('judge-screen');
    }

    getRandomCategory() {
        const available = this.categories.filter((_, i) => !this.usedCategories.includes(i));
        if (available.length === 0) {
            this.usedCategories = [];
            return this.categories[Math.floor(Math.random() * this.categories.length)];
        }
        const categoryIndex = this.categories.indexOf(available[Math.floor(Math.random() * available.length)]);
        this.usedCategories.push(categoryIndex);
        return this.categories[categoryIndex];
    }

    showJudgeRanking() {
        this.state.currentCategory = this.getRandomCategory();
        this.state.guesses = {};
        this.state.judgeRanking = [];

        const judge = this.state.players[this.state.currentJudgeIndex];
        document.getElementById('judge-name-rank').textContent = judge.name;
        document.getElementById('judge-category-title').textContent = this.state.currentCategory.title;

        this.setupRankingGrid('judge-ranking-grid', 'judge-done-btn');
        this.showScreen('judge-rank-screen');
    }

    submitJudgeRanking() {
        // Save judge's ranking
        this.state.judgeRanking = [...this.state.currentRanking];

        // Set up first guesser
        this.state.currentGuesserIndex = (this.state.currentJudgeIndex + 1) % this.state.playerCount;
        const firstGuesser = this.state.players[this.state.currentGuesserIndex];

        // Show pass screen
        document.getElementById('pass-title').textContent = 'Pass to:';
        document.getElementById('next-player-name').textContent = firstGuesser.name;
        document.getElementById('pass-subtitle').textContent = 'to guess the judge\'s ranking';
        this.showScreen('pass-screen');
    }

    setupRankingGrid(gridId, buttonId) {
        const grid = document.getElementById(gridId);
        const button = document.getElementById(buttonId);

        this.state.currentRanking = [];
        this.state.activeGridId = gridId;
        this.state.activeButtonId = buttonId;

        grid.innerHTML = '';
        button.disabled = true;

        const shuffled = [...this.state.currentCategory.items].sort(() => Math.random() - 0.5);

        shuffled.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'rank-item';
            div.dataset.index = index;
            div.dataset.item = item;
            div.innerHTML = `<span class="item-text">${item}</span>`;
            grid.appendChild(div);
        });

        grid.onclick = (e) => {
            const rankItem = e.target.closest('.rank-item');
            if (rankItem) {
                this.handleRankClick(rankItem);
            }
        };
    }

    handleRankClick(element) {
        const grid = document.getElementById(this.state.activeGridId);
        const button = document.getElementById(this.state.activeButtonId);
        const item = element.dataset.item;

        const existingIndex = this.state.currentRanking.indexOf(item);

        if (existingIndex !== -1) {
            this.state.currentRanking = this.state.currentRanking.slice(0, existingIndex);
        } else if (this.state.currentRanking.length < 4) {
            this.state.currentRanking.push(item);
        }

        const rankColors = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444'];

        grid.querySelectorAll('.rank-item').forEach(el => {
            const itemName = el.dataset.item;
            const rankIndex = this.state.currentRanking.indexOf(itemName);

            el.classList.remove('ranked', 'rank-1', 'rank-2', 'rank-3', 'rank-4');

            if (rankIndex !== -1) {
                el.classList.add('ranked', `rank-${rankIndex + 1}`);
                let badge = el.querySelector('.rank-badge');
                if (!badge) {
                    badge = document.createElement('div');
                    badge.className = 'rank-badge';
                    el.appendChild(badge);
                }
                badge.textContent = rankIndex + 1;
                badge.style.background = rankColors[rankIndex];
            } else {
                const badge = el.querySelector('.rank-badge');
                if (badge) badge.remove();
            }
        });

        button.disabled = this.state.currentRanking.length !== 4;
    }

    nextGuesser() {
        const guesser = this.state.players[this.state.currentGuesserIndex];
        const judge = this.state.players[this.state.currentJudgeIndex];

        document.getElementById('guesser-name').textContent = guesser.name;
        document.getElementById('judge-name-prompt').textContent = judge.name;
        document.getElementById('category-reminder').textContent = this.state.currentCategory.title;

        this.setupRankingGrid('ranking-grid', 'submit-guess-btn');
        this.showScreen('guess-screen');
    }

    submitGuess() {
        this.state.guesses[this.state.currentGuesserIndex] = [...this.state.currentRanking];

        // Find next guesser
        let nextGuesserIndex = (this.state.currentGuesserIndex + 1) % this.state.playerCount;
        let loopCount = 0;

        while (loopCount < this.state.playerCount) {
            if (nextGuesserIndex !== this.state.currentJudgeIndex &&
                this.state.guesses[nextGuesserIndex] === undefined) {
                break;
            }
            nextGuesserIndex = (nextGuesserIndex + 1) % this.state.playerCount;
            loopCount++;
        }

        // Check if all guessers are done
        const guessCount = Object.keys(this.state.guesses).length;
        if (guessCount >= this.state.playerCount - 1) {
            this.revealResults();
            return;
        }

        // Show pass screen
        this.state.currentGuesserIndex = nextGuesserIndex;
        const nextGuesser = this.state.players[nextGuesserIndex];
        document.getElementById('pass-title').textContent = 'Pass to:';
        document.getElementById('next-player-name').textContent = nextGuesser.name;
        document.getElementById('pass-subtitle').textContent = 'to guess the judge\'s ranking';
        this.showScreen('pass-screen');
    }

    calculateScore(guess, actual) {
        let score = 0;
        for (let i = 0; i < 4; i++) {
            if (guess[i] === actual[i]) {
                score += 3;
            } else {
                const actualPos = actual.indexOf(guess[i]);
                if (Math.abs(actualPos - i) === 1) {
                    score += 1;
                }
            }
        }
        return score;
    }

    revealResults() {
        document.getElementById('results-category').textContent = this.state.currentCategory.title;

        const container = document.getElementById('results-container');
        container.innerHTML = '';

        // Calculate scores first
        const roundScores = [];
        for (const [playerIndex, guess] of Object.entries(this.state.guesses)) {
            const idx = parseInt(playerIndex);
            const player = this.state.players[idx];
            const score = this.calculateScore(guess, this.state.judgeRanking);
            this.state.scores[idx] += score;
            roundScores.push({ player, score, guess, idx });
        }
        roundScores.sort((a, b) => b.score - a.score);

        // Judge's ranking (the truth)
        const judgeSection = document.createElement('div');
        judgeSection.className = 'result-section judge-result';
        judgeSection.innerHTML = `
            <div class="result-label">${this.state.players[this.state.currentJudgeIndex].name}'s Ranking (The Truth)</div>
            <div class="result-items">
                ${this.state.judgeRanking.map((item, i) => `<span class="result-chip rank-${i + 1}">${i + 1}. ${item}</span>`).join('')}
            </div>
        `;
        container.appendChild(judgeSection);

        // Winner announcement
        const maxScore = roundScores[0]?.score || 0;
        const winners = roundScores.filter(r => r.score === maxScore);
        if (maxScore > 0) {
            const winnerDiv = document.createElement('div');
            winnerDiv.className = 'winner-banner';
            const names = winners.map(w => w.player.name).join(' & ');
            winnerDiv.innerHTML = `<span class="winner-label">Best Mind Reader:</span> <span class="winner-name">${names}</span> <span class="winner-score">(+${maxScore})</span>`;
            container.appendChild(winnerDiv);
        }

        // All player guesses
        const guessesSection = document.createElement('div');
        guessesSection.className = 'all-guesses';

        roundScores.forEach(({ player, score, guess }) => {
            const row = document.createElement('div');
            row.className = 'guess-row';
            row.innerHTML = `
                <div class="guess-header">
                    <span class="guess-player">${player.name}</span>
                    <span class="guess-score">+${score}</span>
                </div>
                <div class="guess-items">
                    ${guess.map((item, i) => {
                        const isCorrect = item === this.state.judgeRanking[i];
                        return `<span class="guess-chip ${isCorrect ? 'correct' : ''}">${i + 1}. ${item}</span>`;
                    }).join('')}
                </div>
            `;
            guessesSection.appendChild(row);
        });
        container.appendChild(guessesSection);

        // Running scores
        const scoresSection = document.createElement('div');
        scoresSection.className = 'scores-section';
        scoresSection.innerHTML = '<div class="scores-title">Total Scores</div>';

        const sorted = Object.entries(this.state.scores)
            .map(([idx, score]) => ({ player: this.state.players[idx], score }))
            .sort((a, b) => b.score - a.score);

        const scoresGrid = document.createElement('div');
        scoresGrid.className = 'scores-grid';
        sorted.forEach(({ player, score }) => {
            scoresGrid.innerHTML += `<span class="score-name">${player.name}</span><span class="score-pts">${score}</span>`;
        });
        scoresSection.appendChild(scoresGrid);
        container.appendChild(scoresSection);

        // Update button text
        const btn = document.getElementById('next-round-btn');
        btn.textContent = this.state.currentRound >= this.state.playerCount ? 'Finish Game' : 'Next Round';

        this.showScreen('results-screen');
    }

    nextRound() {
        if (this.state.currentRound >= this.state.playerCount) {
            this.showGameOver();
            return;
        }
        this.state.currentRound++;
        this.state.currentJudgeIndex = (this.state.currentJudgeIndex + 1) % this.state.playerCount;
        this.showJudgeScreen();
    }

    showGameOver() {
        const scoresDiv = document.getElementById('final-scores');
        scoresDiv.innerHTML = '';

        const sorted = Object.entries(this.state.scores)
            .map(([idx, score]) => ({ player: this.state.players[idx], score }))
            .sort((a, b) => b.score - a.score);

        const medals = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'];

        sorted.forEach(({ player, score }, index) => {
            const row = document.createElement('div');
            row.className = `final-score-row ${index === 0 ? 'first' : ''}`;
            row.innerHTML = `
                <span class="position">${medals[index]}</span>
                <span class="name">${player.name}</span>
                <span class="points">${score} pts</span>
            `;
            scoresDiv.appendChild(row);
        });

        this.showScreen('gameover-screen');
    }

    resetGame() {
        this.state = {
            playerCount: 4,
            players: [],
            currentRound: 0,
            currentJudgeIndex: 0,
            currentGuesserIndex: 0,
            currentCategory: null,
            guesses: {},
            judgeRanking: [],
            scores: {},
            currentRanking: [],
            activeGridId: null,
            activeButtonId: null
        };
        this.usedCategories = [];

        document.querySelectorAll('.count-btn').forEach(b => b.classList.remove('selected'));
        document.querySelector('.count-btn[data-count="4"]').classList.add('selected');

        this.showScreen('setup-screen');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.game = new KnowTheJudge();
});
