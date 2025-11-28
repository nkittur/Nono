// Know the Judge - Party Game
// Guess how the judge would rank 4 things!

class KnowTheJudge {
    constructor() {
        // Game state
        this.state = {
            playerCount: 4,
            players: [],
            currentRound: 0,
            currentJudgeIndex: 0,
            currentGuesserIndex: 0,
            currentCategory: null,
            guesses: {}, // playerIndex -> [item rankings]
            judgeRanking: [],
            scores: {} // playerIndex -> total score
        };

        // Categories with 4 items each - funny and revealing!
        this.categories = [
            {
                title: "Best way to spend a lazy Sunday",
                items: ["Binge-watching TV", "Sleeping until noon", "Having brunch", "Doing absolutely nothing"]
            },
            {
                title: "Worst thing to step on barefoot",
                items: ["A Lego brick", "A wet hairball", "Cold spaghetti", "A slug"]
            },
            {
                title: "Most embarrassing ringtone to go off in a meeting",
                items: ["Baby Shark", "Sexy saxophone", "Your mom calling", "Fart sounds"]
            },
            {
                title: "Best pizza topping",
                items: ["Pepperoni", "Pineapple", "Anchovies", "Plain cheese"]
            },
            {
                title: "Worst movie to watch on a first date",
                items: ["A 3-hour documentary", "Your ex's home videos", "Cats (2019)", "A movie you've seen 47 times"]
            },
            {
                title: "Best superpower for everyday life",
                items: ["Reading minds", "Teleportation", "Invisibility", "Never needing sleep"]
            },
            {
                title: "Most acceptable reason to cancel plans",
                items: ["Your pet looks sad", "New episode of your show", "It's raining", "You found a good parking spot at home"]
            },
            {
                title: "Worst person to be stuck in an elevator with",
                items: ["Someone eating tuna", "A close talker", "Someone who spoils movies", "A person on speakerphone"]
            },
            {
                title: "Best comfort food when sad",
                items: ["Ice cream", "Mac and cheese", "Pizza", "An entire cake"]
            },
            {
                title: "Most suspicious thing to buy at 3am",
                items: ["A single banana", "Duct tape and rope", "17 cans of beans", "A clown costume"]
            },
            {
                title: "Worst thing to say at a job interview",
                items: ["I'm a perfectionist", "What's the WiFi password?", "My last boss was an idiot", "When's lunch?"]
            },
            {
                title: "Best animal to have as a giant pet",
                items: ["A giant hamster", "A giant duck", "A giant cat", "A giant sloth"]
            },
            {
                title: "Most useful skill to have",
                items: ["Cooking well", "Fixing anything", "Making people laugh", "Falling asleep anywhere"]
            },
            {
                title: "Worst way to wake up",
                items: ["Ice water on face", "Earthquake", "Realizing you're late", "Your alarm on max volume"]
            },
            {
                title: "Best thing about being an adult",
                items: ["Eating dessert first", "No bedtime", "Making your own rules", "Buying whatever you want"]
            },
            {
                title: "Worst household chore",
                items: ["Cleaning the bathroom", "Doing dishes", "Folding laundry", "Taking out trash in the rain"]
            },
            {
                title: "Best celebrity to have dinner with",
                items: ["Dwayne 'The Rock' Johnson", "Keanu Reeves", "Oprah", "Gordon Ramsay"]
            },
            {
                title: "Most overrated thing",
                items: ["Avocado toast", "New Year's Eve", "Brunch", "The beach"]
            },
            {
                title: "Best era to have lived in",
                items: ["The 80s", "The 90s", "Medieval times", "The distant future"]
            },
            {
                title: "Worst thing to forget",
                items: ["Your anniversary", "Someone's name mid-conversation", "Pants", "Your phone at home"]
            },
            {
                title: "Best thing to find in your pocket",
                items: ["$20 you forgot about", "A snack", "Chapstick when you need it", "A funny note from past you"]
            },
            {
                title: "Worst small talk topic",
                items: ["The weather", "How busy you are", "Traffic", "Your diet"]
            },
            {
                title: "Best free thing in life",
                items: ["Naps", "Hugs", "Sunshine", "Compliments from strangers"]
            },
            {
                title: "Most impressive party trick",
                items: ["Card tricks", "Juggling", "Doing the splits", "Burping the alphabet"]
            },
            {
                title: "Worst fashion trend",
                items: ["Crocs", "Jorts", "Mullets", "Socks with sandals"]
            },
            {
                title: "Best breakup excuse",
                items: ["It's not you, it's me", "I need to find myself", "My psychic said so", "I'm moving to Antarctica"]
            },
            {
                title: "Most relatable life goal",
                items: ["Financial stability", "Finding true love", "A good night's sleep", "Being unbothered"]
            },
            {
                title: "Worst thing to be allergic to",
                items: ["Dogs", "Chocolate", "The sun", "Your own sweat"]
            },
            {
                title: "Best workplace perk",
                items: ["Free food", "Work from home", "Nap rooms", "No meetings"]
            },
            {
                title: "Most questionable life choice",
                items: ["Getting bangs", "Texting your ex", "DIY haircut", "Checking work email on vacation"]
            },
            {
                title: "Best fictional place to live",
                items: ["Hogwarts", "The Shire", "Wakanda", "Animal Crossing island"]
            },
            {
                title: "Worst thing to run out of",
                items: ["Toilet paper", "Phone battery", "Hot water", "Patience"]
            }
        ];

        this.usedCategories = [];
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Player count selection
        document.querySelectorAll('.count-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.count-btn').forEach(b => b.classList.remove('selected'));
                e.target.classList.add('selected');
                this.state.playerCount = parseInt(e.target.dataset.count);
            });
        });

        // Start game
        document.getElementById('start-btn').addEventListener('click', () => this.startGame());

        // Show category
        document.getElementById('show-category-btn').addEventListener('click', () => this.showCategory());

        // Start guessing
        document.getElementById('start-guessing-btn').addEventListener('click', () => this.startGuessing());

        // Submit guess
        document.getElementById('submit-guess-btn').addEventListener('click', () => this.submitGuess());

        // Next guesser
        document.getElementById('next-guesser-btn').addEventListener('click', () => this.nextGuesser());

        // Reveal results
        document.getElementById('reveal-results-btn').addEventListener('click', () => this.revealResults());

        // Next round
        document.getElementById('next-round-btn').addEventListener('click', () => this.nextRound());

        // Play again
        document.getElementById('play-again-btn').addEventListener('click', () => this.resetGame());
    }

    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById(screenId).classList.add('active');
    }

    startGame() {
        // Initialize players
        this.state.players = [];
        for (let i = 0; i < this.state.playerCount; i++) {
            this.state.players.push({
                name: `Player ${i + 1}`,
                index: i
            });
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
        // Filter out used categories
        const available = this.categories.filter((_, i) => !this.usedCategories.includes(i));

        if (available.length === 0) {
            // Reset if we've used all categories
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

        // Find first guesser (skip the judge)
        this.state.currentGuesserIndex = (this.state.currentJudgeIndex + 1) % this.state.playerCount;
        const firstGuesser = this.state.players[this.state.currentGuesserIndex];
        document.getElementById('first-guesser').textContent = firstGuesser.name;

        this.showScreen('category-screen');
    }

    startGuessing() {
        this.setupGuessingScreen('guess-screen', 'rank-slots', 'items-pool', 'submit-guess-btn');
        const guesser = this.state.players[this.state.currentGuesserIndex];
        const judge = this.state.players[this.state.currentJudgeIndex];

        document.getElementById('guesser-name').textContent = guesser.name;
        document.getElementById('judge-name-prompt').textContent = judge.name;
        document.getElementById('category-reminder').textContent = this.state.currentCategory.title;

        this.showScreen('guess-screen');
    }

    setupGuessingScreen(screenId, slotsId, poolId, buttonId) {
        const slots = document.getElementById(slotsId);
        const pool = document.getElementById(poolId);
        const button = document.getElementById(buttonId);

        // Clear slots
        slots.querySelectorAll('.slot-content').forEach(slot => {
            slot.textContent = '';
            slot.dataset.item = '';
        });
        slots.querySelectorAll('.rank-slot').forEach(slot => {
            slot.classList.remove('filled');
        });

        // Create draggable items
        pool.innerHTML = '';
        const shuffledItems = [...this.state.currentCategory.items].sort(() => Math.random() - 0.5);

        shuffledItems.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'draggable-item';
            div.textContent = item;
            div.dataset.item = item;
            div.draggable = true;

            // Touch/click handling for mobile
            this.setupDragHandlers(div, slotsId, poolId, buttonId);

            pool.appendChild(div);
        });

        button.disabled = true;

        // Setup slot click handlers
        slots.querySelectorAll('.rank-slot').forEach(slot => {
            slot.addEventListener('click', (e) => {
                const slotContent = slot.querySelector('.slot-content');
                if (slotContent.dataset.item) {
                    // Return item to pool
                    const item = slotContent.dataset.item;
                    slotContent.textContent = '';
                    slotContent.dataset.item = '';
                    slot.classList.remove('filled');

                    // Create item back in pool
                    const div = document.createElement('div');
                    div.className = 'draggable-item';
                    div.textContent = item;
                    div.dataset.item = item;
                    this.setupDragHandlers(div, slotsId, poolId, buttonId);
                    pool.appendChild(div);

                    this.updateSubmitButton(slotsId, buttonId);
                }
            });

            // Drag over handling
            slot.addEventListener('dragover', (e) => {
                e.preventDefault();
                slot.classList.add('drag-over');
            });

            slot.addEventListener('dragleave', () => {
                slot.classList.remove('drag-over');
            });

            slot.addEventListener('drop', (e) => {
                e.preventDefault();
                slot.classList.remove('drag-over');
                const item = e.dataTransfer.getData('text/plain');
                this.placeItemInSlot(item, slot, poolId, buttonId);
            });
        });
    }

    setupDragHandlers(element, slotsId, poolId, buttonId) {
        let selectedItem = null;

        // Desktop drag
        element.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', element.dataset.item);
            element.classList.add('dragging');
        });

        element.addEventListener('dragend', () => {
            element.classList.remove('dragging');
        });

        // Touch/click for mobile - tap to select, tap slot to place
        element.addEventListener('click', (e) => {
            e.stopPropagation();

            // Clear any previous selection
            document.querySelectorAll('.draggable-item.selected').forEach(el => {
                el.classList.remove('selected');
                el.style.border = '';
            });

            // Select this item
            element.classList.add('selected');
            element.style.border = '2px solid #f39c12';

            // Setup temporary slot click handlers
            const slots = document.getElementById(slotsId);
            const slotClickHandler = (e) => {
                const slot = e.currentTarget;
                const slotContent = slot.querySelector('.slot-content');

                // If slot is empty, place item
                if (!slotContent.dataset.item || slotContent.dataset.item === '') {
                    this.placeItemInSlot(element.dataset.item, slot, poolId, buttonId);
                    element.remove();
                }

                // Remove all temporary handlers
                slots.querySelectorAll('.rank-slot').forEach(s => {
                    s.removeEventListener('click', slotClickHandler);
                });
            };

            slots.querySelectorAll('.rank-slot').forEach(slot => {
                slot.addEventListener('click', slotClickHandler, { once: true });
            });
        });
    }

    placeItemInSlot(item, slot, poolId, buttonId) {
        const slotContent = slot.querySelector('.slot-content');
        const pool = document.getElementById(poolId);

        // If slot already has an item, return it to pool
        if (slotContent.dataset.item) {
            const oldItem = slotContent.dataset.item;
            const div = document.createElement('div');
            div.className = 'draggable-item';
            div.textContent = oldItem;
            div.dataset.item = oldItem;
            this.setupDragHandlers(div, slot.closest('.rank-slots').id, poolId, buttonId);
            pool.appendChild(div);
        }

        // Place new item
        slotContent.textContent = item;
        slotContent.dataset.item = item;
        slot.classList.add('filled');

        // Remove from pool
        pool.querySelectorAll('.draggable-item').forEach(el => {
            if (el.dataset.item === item) {
                el.remove();
            }
        });

        this.updateSubmitButton(slot.closest('.rank-slots').id, buttonId);
    }

    updateSubmitButton(slotsId, buttonId) {
        const slots = document.getElementById(slotsId);
        const button = document.getElementById(buttonId);
        const filledSlots = slots.querySelectorAll('.rank-slot.filled').length;
        button.disabled = filledSlots < 4;
    }

    getRankingFromSlots(slotsId) {
        const slots = document.getElementById(slotsId);
        const ranking = [];
        slots.querySelectorAll('.rank-slot').forEach(slot => {
            const content = slot.querySelector('.slot-content');
            if (content.dataset.item) {
                ranking.push(content.dataset.item);
            }
        });
        return ranking;
    }

    submitGuess() {
        const ranking = this.getRankingFromSlots('rank-slots');
        this.state.guesses[this.state.currentGuesserIndex] = ranking;

        // Find next guesser
        let nextGuesserIndex = (this.state.currentGuesserIndex + 1) % this.state.playerCount;

        // Skip the judge and anyone who has already guessed
        while (nextGuesserIndex === this.state.currentJudgeIndex ||
               this.state.guesses[nextGuesserIndex] !== undefined) {
            nextGuesserIndex = (nextGuesserIndex + 1) % this.state.playerCount;

            // If we've looped around and everyone has guessed, move to judge ranking
            if (nextGuesserIndex === this.state.currentGuesserIndex) {
                this.showJudgeRanking();
                return;
            }
        }

        // Check if all non-judge players have guessed
        const nonJudgePlayers = this.state.players.filter((_, i) => i !== this.state.currentJudgeIndex);
        const allGuessed = nonJudgePlayers.every((_, i) => {
            const actualIndex = i >= this.state.currentJudgeIndex ? i + 1 : i;
            return this.state.guesses[actualIndex] !== undefined;
        });

        if (Object.keys(this.state.guesses).length >= this.state.playerCount - 1) {
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
        this.setupGuessingScreen('guess-screen', 'rank-slots', 'items-pool', 'submit-guess-btn');
        const guesser = this.state.players[this.state.currentGuesserIndex];
        const judge = this.state.players[this.state.currentJudgeIndex];

        document.getElementById('guesser-name').textContent = guesser.name;
        document.getElementById('judge-name-prompt').textContent = judge.name;

        this.showScreen('guess-screen');
    }

    showJudgeRanking() {
        const judge = this.state.players[this.state.currentJudgeIndex];
        document.getElementById('judge-name-final').textContent = judge.name;
        document.getElementById('judge-category-reminder').textContent = this.state.currentCategory.title;

        this.setupGuessingScreen('judge-rank-screen', 'judge-rank-slots', 'judge-items-pool', 'reveal-results-btn');
        this.showScreen('judge-rank-screen');
    }

    calculateScore(guess, actual) {
        let score = 0;
        for (let i = 0; i < 4; i++) {
            if (guess[i] === actual[i]) {
                score += 3; // Exact match
            } else {
                // Check if it's off by 1 position
                const actualPos = actual.indexOf(guess[i]);
                if (Math.abs(actualPos - i) === 1) {
                    score += 1; // Off by one
                }
            }
        }
        return score;
    }

    revealResults() {
        this.state.judgeRanking = this.getRankingFromSlots('judge-rank-slots');

        document.getElementById('results-category').textContent = this.state.currentCategory.title;

        const container = document.getElementById('results-container');
        container.innerHTML = '';

        // Show judge's ranking first
        const judgeRow = document.createElement('div');
        judgeRow.className = 'result-row';
        judgeRow.innerHTML = `
            <div class="result-header">
                <span class="result-player-name judge">${this.state.players[this.state.currentJudgeIndex].name} (Judge)</span>
                <span class="result-score">THE TRUTH</span>
            </div>
            <div class="result-ranking">
                ${this.state.judgeRanking.map((item, i) => `
                    <div class="result-item correct">
                        <span class="rank-num">${i + 1}.</span> ${item}
                    </div>
                `).join('')}
            </div>
        `;
        container.appendChild(judgeRow);

        // Calculate and show each guesser's result
        const roundScores = [];

        for (const [playerIndex, guess] of Object.entries(this.state.guesses)) {
            const idx = parseInt(playerIndex);
            const player = this.state.players[idx];
            const score = this.calculateScore(guess, this.state.judgeRanking);

            // Add to total score
            this.state.scores[idx] += score;
            roundScores.push({ player, score, guess });
        }

        // Sort by score descending
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
                        return `
                            <div class="result-item ${isCorrect ? 'correct' : 'wrong'}">
                                <span class="rank-num">${i + 1}.</span> ${item}
                            </div>
                        `;
                    }).join('')}
                </div>
            `;
            container.appendChild(row);
        });

        // Winner announcement
        const maxScore = roundScores[0].score;
        const winners = roundScores.filter(r => r.score === maxScore);
        const winnerDiv = document.getElementById('winner-announcement');

        if (maxScore === 0) {
            winnerDiv.innerHTML = `
                <h3>Nobody got any right!</h3>
                <p>Better luck next round!</p>
            `;
        } else {
            const winnerNames = winners.map(w => w.player.name).join(' & ');
            winnerDiv.innerHTML = `
                <h3>Best Mind Reader${winners.length > 1 ? 's' : ''}!</h3>
                <div class="winner-names">${winnerNames}</div>
            `;
        }

        // Show running scores
        const scoresDiv = document.getElementById('scores-summary');
        scoresDiv.innerHTML = '<h4>Running Scores</h4>';

        const sortedScores = Object.entries(this.state.scores)
            .map(([idx, score]) => ({ player: this.state.players[idx], score }))
            .sort((a, b) => b.score - a.score);

        sortedScores.forEach(({ player, score }) => {
            const row = document.createElement('div');
            row.className = 'score-row';
            row.innerHTML = `
                <span class="name">${player.name}</span>
                <span class="points">${score} pts</span>
            `;
            scoresDiv.appendChild(row);
        });

        this.showScreen('results-screen');
    }

    nextRound() {
        // Check if everyone has been judge
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

        const sortedScores = Object.entries(this.state.scores)
            .map(([idx, score]) => ({ player: this.state.players[idx], score }))
            .sort((a, b) => b.score - a.score);

        const positions = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'];
        const medals = ['🥇', '🥈', '🥉', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣'];

        sortedScores.forEach(({ player, score }, index) => {
            const row = document.createElement('div');
            row.className = `final-score-row ${index === 0 ? 'first' : ''}`;
            row.innerHTML = `
                <span class="position">${medals[index] || ''}</span>
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
            scores: {}
        };
        this.usedCategories = [];

        // Reset UI
        document.querySelectorAll('.count-btn').forEach(b => b.classList.remove('selected'));
        document.querySelector('.count-btn[data-count="4"]').classList.add('selected');

        this.showScreen('setup-screen');
    }
}

// Initialize game when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.game = new KnowTheJudge();
});
