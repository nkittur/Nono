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
            // Track current ranking being built
            currentRanking: []
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
        document.getElementById('show-category-btn').addEventListener('click', () => this.showCategory());
        document.getElementById('start-guessing-btn').addEventListener('click', () => this.startGuessing());
        document.getElementById('submit-guess-btn').addEventListener('click', () => this.submitGuess());
        document.getElementById('next-guesser-btn').addEventListener('click', () => this.nextGuesser());
        document.getElementById('reveal-results-btn').addEventListener('click', () => this.revealResults());
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

    showCategory() {
        this.state.currentCategory = this.getRandomCategory();
        this.state.guesses = {};
        this.state.judgeRanking = [];

        document.getElementById('category-round-num').textContent = this.state.currentRound;
        document.getElementById('category-title').textContent = this.state.currentCategory.title;

        const itemsDisplay = document.getElementById('items-display');
        itemsDisplay.innerHTML = '';
        this.state.currentCategory.items.forEach(item => {
            const div = document.createElement('div');
            div.className = 'item-card';
            div.textContent = item;
            itemsDisplay.appendChild(div);
        });

        this.state.currentGuesserIndex = (this.state.currentJudgeIndex + 1) % this.state.playerCount;
        const firstGuesser = this.state.players[this.state.currentGuesserIndex];
        document.getElementById('first-guesser').textContent = firstGuesser.name;

        this.showScreen('category-screen');
    }

    startGuessing() {
        const guesser = this.state.players[this.state.currentGuesserIndex];
        const judge = this.state.players[this.state.currentJudgeIndex];

        document.getElementById('guesser-name').textContent = guesser.name;
        document.getElementById('judge-name-prompt').textContent = judge.name;
        document.getElementById('category-reminder').textContent = this.state.currentCategory.title;

        this.setupRankingGrid('ranking-grid', 'submit-guess-btn');
        this.showScreen('guess-screen');
    }

    setupRankingGrid(gridId, buttonId) {
        const grid = document.getElementById(gridId);
        const button = document.getElementById(buttonId);

        this.state.currentRanking = [];
        grid.innerHTML = '';
        button.disabled = true;

        // Shuffle items for display
        const shuffled = [...this.state.currentCategory.items].sort(() => Math.random() - 0.5);

        shuffled.forEach(item => {
            const div = document.createElement('div');
            div.className = 'rank-item';
            div.dataset.item = item;
            div.innerHTML = `<span class="item-text">${item}</span>`;

            div.addEventListener('click', () => this.toggleItemRank(item, gridId, buttonId));
            grid.appendChild(div);
        });
    }

    toggleItemRank(item, gridId, buttonId) {
        const grid = document.getElementById(gridId);
        const button = document.getElementById(buttonId);
        const itemEl = grid.querySelector(`[data-item="${item}"]`);

        const existingIndex = this.state.currentRanking.indexOf(item);

        if (existingIndex !== -1) {
            // Remove this item and all items ranked after it
            this.state.currentRanking = this.state.currentRanking.slice(0, existingIndex);
        } else if (this.state.currentRanking.length < 4) {
            // Add to ranking
            this.state.currentRanking.push(item);
        }

        // Update all item visuals
        grid.querySelectorAll('.rank-item').forEach(el => {
            const itemName = el.dataset.item;
            const rankIndex = this.state.currentRanking.indexOf(itemName);

            if (rankIndex !== -1) {
                el.classList.add('ranked');
                // Add or update badge
                let badge = el.querySelector('.rank-badge');
                if (!badge) {
                    badge = document.createElement('div');
                    badge.className = 'rank-badge';
                    el.appendChild(badge);
                }
                badge.textContent = rankIndex + 1;
            } else {
                el.classList.remove('ranked');
                const badge = el.querySelector('.rank-badge');
                if (badge) badge.remove();
            }
        });

        // Enable button when all 4 are ranked
        button.disabled = this.state.currentRanking.length !== 4;
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
            this.showJudgeRanking();
            return;
        }

        // Show pass screen
        this.state.currentGuesserIndex = nextGuesserIndex;
        const nextGuesser = this.state.players[nextGuesserIndex];
        document.getElementById('next-player-name').textContent = nextGuesser.name;
        this.showScreen('pass-screen');
    }

    nextGuesser() {
        const guesser = this.state.players[this.state.currentGuesserIndex];
        const judge = this.state.players[this.state.currentJudgeIndex];

        document.getElementById('guesser-name').textContent = guesser.name;
        document.getElementById('judge-name-prompt').textContent = judge.name;

        this.setupRankingGrid('ranking-grid', 'submit-guess-btn');
        this.showScreen('guess-screen');
    }

    showJudgeRanking() {
        const judge = this.state.players[this.state.currentJudgeIndex];
        document.getElementById('judge-name-final').textContent = judge.name;
        document.getElementById('judge-category-reminder').textContent = this.state.currentCategory.title;

        this.setupRankingGrid('judge-ranking-grid', 'reveal-results-btn');
        this.showScreen('judge-rank-screen');
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
        this.state.judgeRanking = [...this.state.currentRanking];

        document.getElementById('results-category').textContent = this.state.currentCategory.title;

        const container = document.getElementById('results-container');
        container.innerHTML = '';

        // Judge's ranking first
        const judgeRow = document.createElement('div');
        judgeRow.className = 'result-row';
        judgeRow.innerHTML = `
            <div class="result-header">
                <span class="result-player-name judge">${this.state.players[this.state.currentJudgeIndex].name} (Judge)</span>
                <span class="result-score">THE TRUTH</span>
            </div>
            <div class="result-ranking">
                ${this.state.judgeRanking.map((item, i) => `
                    <div class="result-item correct"><span class="rank-num">${i + 1}.</span> ${item}</div>
                `).join('')}
            </div>
        `;
        container.appendChild(judgeRow);

        // Calculate scores
        const roundScores = [];
        for (const [playerIndex, guess] of Object.entries(this.state.guesses)) {
            const idx = parseInt(playerIndex);
            const player = this.state.players[idx];
            const score = this.calculateScore(guess, this.state.judgeRanking);
            this.state.scores[idx] += score;
            roundScores.push({ player, score, guess });
        }

        roundScores.sort((a, b) => b.score - a.score);

        roundScores.forEach(({ player, score, guess }) => {
            const row = document.createElement('div');
            row.className = 'result-row';
            row.innerHTML = `
                <div class="result-header">
                    <span class="result-player-name">${player.name}</span>
                    <span class="result-score">+${score} pts</span>
                </div>
                <div class="result-ranking">
                    ${guess.map((item, i) => {
                        const isCorrect = item === this.state.judgeRanking[i];
                        return `<div class="result-item ${isCorrect ? 'correct' : 'wrong'}"><span class="rank-num">${i + 1}.</span> ${item}</div>`;
                    }).join('')}
                </div>
            `;
            container.appendChild(row);
        });

        // Winner
        const maxScore = roundScores[0]?.score || 0;
        const winners = roundScores.filter(r => r.score === maxScore);
        const winnerDiv = document.getElementById('winner-announcement');

        if (maxScore === 0) {
            winnerDiv.innerHTML = `<h3>No matches!</h3><p>Better luck next round</p>`;
        } else {
            const names = winners.map(w => w.player.name).join(' & ');
            winnerDiv.innerHTML = `<h3>Best Mind Reader${winners.length > 1 ? 's' : ''}!</h3><div class="winner-names">${names}</div>`;
        }

        // Running scores
        const scoresDiv = document.getElementById('scores-summary');
        scoresDiv.innerHTML = '<h4>Total Scores</h4>';
        const sorted = Object.entries(this.state.scores)
            .map(([idx, score]) => ({ player: this.state.players[idx], score }))
            .sort((a, b) => b.score - a.score);

        sorted.forEach(({ player, score }) => {
            const row = document.createElement('div');
            row.className = 'score-row';
            row.innerHTML = `<span class="name">${player.name}</span><span class="points">${score} pts</span>`;
            scoresDiv.appendChild(row);
        });

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
            currentRanking: []
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
