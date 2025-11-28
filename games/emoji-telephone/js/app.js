// Emoji Telephone - Party Game
// Pass emojis and guesses around the circle!

class EmojiTelephone {
    constructor() {
        this.state = {
            playerCount: 4,
            currentRound: 0,
            totalRounds: 0,
            currentPlayerIndex: 0,
            currentPhrase: '',
            chain: [], // Array of {player, type: 'phrase'|'emoji'|'guess', content}
            currentEmojis: '',
            starterIndex: 0
        };

        // Fun phrases to start with
        this.phrases = [
            "Dancing in the rain",
            "A cat eating pizza",
            "Crying at a wedding",
            "Aliens invading Earth",
            "Grandma lifting weights",
            "A shark wearing a hat",
            "Running late for work",
            "Dog driving a car",
            "Sleeping through an alarm",
            "Birthday party disaster",
            "First day at school",
            "Zombie apocalypse",
            "Winning the lottery",
            "Getting stuck in traffic",
            "A magic carpet ride",
            "Surfing a giant wave",
            "Robot falling in love",
            "Haunted house tour",
            "Camping in the woods",
            "Flying to the moon",
            "Chef burning dinner",
            "Baby's first steps",
            "Proposal gone wrong",
            "Superhero saving the day",
            "Monkey stealing bananas",
            "Beach volleyball game",
            "Snowman melting",
            "Dragon breathing fire",
            "Pirate finding treasure",
            "Unicorn rainbow party",
            "Ninja sneaking around",
            "Wizard casting spells",
            "Time travel adventure",
            "Dinosaur at the dentist",
            "Mermaid singing",
            "Ghost in the kitchen",
            "Vampire at the beach",
            "Cowboy riding a horse",
            "Astronaut eating tacos",
            "Penguin on vacation"
        ];

        // Common emojis organized by category
        this.emojis = [
            // Faces
            '😀', '😂', '🥹', '😍', '🤔', '😱', '😴', '🤮', '😭', '🥳',
            '😎', '🤯', '😤', '🙄', '😇', '🤡', '👻', '💀', '👽', '🤖',
            // People & Gestures
            '👶', '👦', '👧', '👨', '👩', '👴', '👵', '🧑‍🍳', '👮', '🦸',
            '🧙', '🧟', '🧛', '🧜', '👰', '🤵', '💃', '🕺', '🏃', '🚶',
            '🧘', '🏋️', '🤸', '🏊', '🧗', '👋', '👍', '👎', '👏', '🙏',
            '💪', '🦵', '🦶', '👀', '👁️', '👃', '👂', '🧠', '💔', '❤️',
            // Animals
            '🐶', '🐱', '🐭', '🐰', '🦊', '🐻', '🐼', '🐨', '🦁', '🐮',
            '🐷', '🐸', '🐵', '🐔', '🐧', '🦆', '🦅', '🦇', '🐺', '🐗',
            '🐴', '🦄', '🐝', '🐛', '🦋', '🐌', '🐙', '🦀', '🐠', '🦈',
            '🐊', '🐢', '🦎', '🐍', '🦖', '🦕', '🐘', '🦒', '🦘', '🦔',
            // Food
            '🍎', '🍕', '🍔', '🌮', '🍣', '🍜', '🍦', '🎂', '🍪', '🍩',
            '☕', '🍺', '🍷', '🥤', '🧃', '🍳', '🥓', '🥗', '🌽', '🥕',
            // Activities & Objects
            '⚽', '🏀', '🎾', '🎮', '🎲', '🎭', '🎨', '🎬', '🎤', '🎸',
            '🎹', '🎺', '📱', '💻', '📷', '🔫', '💣', '🔪', '💊', '🧪',
            '🔮', '🎁', '🎈', '🎉', '💰', '💎', '🏆', '🥇', '🎓', '👑',
            // Transport & Places
            '🚗', '🚕', '🚌', '🚑', '🚒', '✈️', '🚀', '🛸', '🚢', '⛵',
            '🏠', '🏢', '🏰', '⛪', '🗽', '🗼', '🌋', '🏔️', '🏖️', '🏕️',
            // Nature & Weather
            '🌸', '🌺', '🌻', '🌲', '🌴', '🍀', '🌈', '☀️', '🌙', '⭐',
            '🌧️', '⛈️', '❄️', '🔥', '💧', '🌊', '💨', '🌪️', '☁️', '⚡',
            // Symbols
            '❤️', '💕', '💯', '✅', '❌', '❓', '❗', '💤', '💢', '💥',
            '💫', '🎵', '🔔', '📢', '💬', '👁️‍🗨️', '🚫', '⏰', '🔑', '🗝️'
        ];

        this.usedPhrases = [];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.buildEmojiPicker();
    }

    setupEventListeners() {
        // Player count
        document.querySelectorAll('.count-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.count-btn').forEach(b => b.classList.remove('selected'));
                e.target.classList.add('selected');
                this.state.playerCount = parseInt(e.target.dataset.count);
            });
        });

        // Buttons
        document.getElementById('start-btn').addEventListener('click', () => this.startGame());
        document.getElementById('ready-emoji-btn').addEventListener('click', () => this.showEmojiScreen());
        document.getElementById('submit-emoji-btn').addEventListener('click', () => this.submitEmojis());
        document.getElementById('ready-btn').addEventListener('click', () => this.nextTurn());
        document.getElementById('submit-guess-btn').addEventListener('click', () => this.submitGuess());
        document.getElementById('next-round-btn').addEventListener('click', () => this.nextRound());
        document.getElementById('play-again-btn').addEventListener('click', () => this.resetGame());

        // Emoji controls
        document.getElementById('clear-emoji-btn').addEventListener('click', () => this.clearEmojis());
        document.getElementById('backspace-btn').addEventListener('click', () => this.backspaceEmoji());

        // Guess input
        const guessInput = document.getElementById('guess-input');
        guessInput.addEventListener('input', () => {
            document.getElementById('submit-guess-btn').disabled = guessInput.value.trim() === '';
        });
    }

    buildEmojiPicker() {
        const picker = document.getElementById('emoji-picker');
        picker.innerHTML = '';

        this.emojis.forEach(emoji => {
            const btn = document.createElement('button');
            btn.className = 'emoji-btn';
            btn.textContent = emoji;
            btn.addEventListener('click', () => this.addEmoji(emoji));
            picker.appendChild(btn);
        });
    }

    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById(screenId).classList.add('active');
    }

    getRandomPhrase() {
        const available = this.phrases.filter(p => !this.usedPhrases.includes(p));
        if (available.length === 0) {
            this.usedPhrases = [];
            return this.phrases[Math.floor(Math.random() * this.phrases.length)];
        }
        const phrase = available[Math.floor(Math.random() * available.length)];
        this.usedPhrases.push(phrase);
        return phrase;
    }

    startGame() {
        this.state.currentRound = 1;
        this.state.totalRounds = this.state.playerCount;
        this.state.starterIndex = 0;
        this.startRound();
    }

    startRound() {
        this.state.currentPhrase = this.getRandomPhrase();
        this.state.chain = [{
            player: `Player ${this.state.starterIndex + 1}`,
            type: 'phrase',
            content: this.state.currentPhrase
        }];
        this.state.currentPlayerIndex = this.state.starterIndex;
        this.state.currentEmojis = '';

        document.getElementById('phrase-player').textContent = `Player ${this.state.starterIndex + 1}`;
        document.getElementById('phrase-display').textContent = this.state.currentPhrase;
        this.showScreen('phrase-screen');
    }

    showEmojiScreen() {
        document.getElementById('emoji-player').textContent = `Player ${this.state.currentPlayerIndex + 1}`;

        // Show what they're drawing for (only first player sees the original phrase)
        if (this.state.chain.length === 1) {
            document.getElementById('emoji-instruction').textContent = 'Draw emojis for the phrase';
        } else {
            document.getElementById('emoji-instruction').textContent = 'Draw emojis for what you guessed';
        }

        this.state.currentEmojis = '';
        this.updateEmojiDisplay();
        document.getElementById('submit-emoji-btn').disabled = true;
        this.showScreen('emoji-screen');
    }

    addEmoji(emoji) {
        this.state.currentEmojis += emoji;
        this.updateEmojiDisplay();
        document.getElementById('submit-emoji-btn').disabled = false;
    }

    clearEmojis() {
        this.state.currentEmojis = '';
        this.updateEmojiDisplay();
        document.getElementById('submit-emoji-btn').disabled = true;
    }

    backspaceEmoji() {
        // Remove last emoji (handling surrogate pairs)
        const arr = [...this.state.currentEmojis];
        arr.pop();
        this.state.currentEmojis = arr.join('');
        this.updateEmojiDisplay();
        document.getElementById('submit-emoji-btn').disabled = this.state.currentEmojis === '';
    }

    updateEmojiDisplay() {
        const display = document.getElementById('emoji-input-display');
        display.textContent = this.state.currentEmojis || '...';
    }

    submitEmojis() {
        this.state.chain.push({
            player: `Player ${this.state.currentPlayerIndex + 1}`,
            type: 'emoji',
            content: this.state.currentEmojis
        });

        // Move to next player
        this.state.currentPlayerIndex = (this.state.currentPlayerIndex + 1) % this.state.playerCount;

        // Check if round is complete (back to starter)
        if (this.state.currentPlayerIndex === this.state.starterIndex) {
            this.showReveal();
        } else {
            // Show pass screen for guessing
            document.getElementById('next-player-name').textContent = `Player ${this.state.currentPlayerIndex + 1}`;
            document.getElementById('pass-task').textContent = 'to guess what it means';
            this.showScreen('pass-screen');
        }
    }

    nextTurn() {
        // Determine if this player guesses or draws
        const lastItem = this.state.chain[this.state.chain.length - 1];

        if (lastItem.type === 'emoji') {
            // This player guesses
            this.showGuessScreen(lastItem.content);
        } else {
            // This player draws
            this.showEmojiScreen();
        }
    }

    showGuessScreen(emojis) {
        document.getElementById('guess-player').textContent = `Player ${this.state.currentPlayerIndex + 1}`;
        document.getElementById('emoji-to-guess').textContent = emojis;
        document.getElementById('guess-input').value = '';
        document.getElementById('submit-guess-btn').disabled = true;
        this.showScreen('guess-screen');
    }

    submitGuess() {
        const guess = document.getElementById('guess-input').value.trim();

        this.state.chain.push({
            player: `Player ${this.state.currentPlayerIndex + 1}`,
            type: 'guess',
            content: guess
        });

        // Move to next player
        this.state.currentPlayerIndex = (this.state.currentPlayerIndex + 1) % this.state.playerCount;

        // Check if round is complete
        if (this.state.currentPlayerIndex === this.state.starterIndex) {
            this.showReveal();
        } else {
            // Show pass screen for drawing emojis
            document.getElementById('next-player-name').textContent = `Player ${this.state.currentPlayerIndex + 1}`;
            document.getElementById('pass-task').textContent = 'to draw emojis';
            this.showScreen('pass-screen');
        }
    }

    showReveal() {
        const container = document.getElementById('chain-container');
        container.innerHTML = '';

        this.state.chain.forEach((item, index) => {
            // Add arrow between items
            if (index > 0) {
                const arrow = document.createElement('div');
                arrow.className = 'chain-arrow';
                arrow.textContent = '↓';
                container.appendChild(arrow);
            }

            const div = document.createElement('div');
            div.className = 'chain-item';

            if (index === 0) {
                div.classList.add('original');
            } else if (index === this.state.chain.length - 1) {
                div.classList.add('final');
            }

            const playerSpan = document.createElement('div');
            playerSpan.className = 'chain-player';
            playerSpan.textContent = item.player + (item.type === 'emoji' ? ' drew' : item.type === 'phrase' ? ' (original)' : ' guessed');

            const contentSpan = document.createElement('div');
            contentSpan.className = 'chain-content' + (item.type === 'emoji' ? ' emoji' : '');
            contentSpan.textContent = item.content;

            div.appendChild(playerSpan);
            div.appendChild(contentSpan);
            container.appendChild(div);
        });

        // Update button text
        const btn = document.getElementById('next-round-btn');
        if (this.state.currentRound >= this.state.totalRounds) {
            btn.textContent = 'Finish Game';
        } else {
            btn.textContent = 'Next Round';
        }

        this.showScreen('reveal-screen');
    }

    nextRound() {
        if (this.state.currentRound >= this.state.totalRounds) {
            this.showScreen('gameover-screen');
            return;
        }

        this.state.currentRound++;
        this.state.starterIndex = (this.state.starterIndex + 1) % this.state.playerCount;
        this.startRound();
    }

    resetGame() {
        this.state = {
            playerCount: 4,
            currentRound: 0,
            totalRounds: 0,
            currentPlayerIndex: 0,
            currentPhrase: '',
            chain: [],
            currentEmojis: '',
            starterIndex: 0
        };
        this.usedPhrases = [];

        document.querySelectorAll('.count-btn').forEach(b => b.classList.remove('selected'));
        document.querySelector('.count-btn[data-count="4"]').classList.add('selected');

        this.showScreen('setup-screen');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.game = new EmojiTelephone();
});
