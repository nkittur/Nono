/**
 * Wacky Telephone - Phrases and Transformations
 */

const PHRASES = [
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

// Canvas transformation types
const TRANSFORMATIONS = {
    mirror: {
        name: "Mirror Mode",
        emoji: "🪞",
        description: "Your strokes are horizontally flipped!"
    },
    rotate: {
        name: "Spin Mode",
        emoji: "🔄",
        description: "The canvas spins fast and randomly reverses!"
    },
    kaleidoscope: {
        name: "Kaleidoscope",
        emoji: "🔮",
        description: "Everything you draw is mirrored 4 ways!"
    },
    funhouse: {
        name: "Funhouse",
        emoji: "🌀",
        description: "Your strokes get wavy and distorted!"
    }
};

// Export for use in game
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PHRASES, TRANSFORMATIONS };
}
