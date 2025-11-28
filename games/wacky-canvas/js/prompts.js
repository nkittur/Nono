/**
 * Wacky Canvas - Drawing Prompts Database
 * Fun things to draw with wacky transformations!
 */

const PROMPTS = {
    animals: {
        name: "Animals",
        emoji: "🐾",
        items: [
            "Cat", "Dog", "Fish", "Bird", "Snake", "Elephant", "Giraffe",
            "Butterfly", "Spider", "Penguin", "Octopus", "Turtle", "Rabbit",
            "Horse", "Pig", "Cow", "Shark", "Lion", "Bear", "Frog"
        ]
    },
    food: {
        name: "Food & Drinks",
        emoji: "🍕",
        items: [
            "Pizza", "Burger", "Ice Cream", "Apple", "Banana", "Cake",
            "Hot Dog", "Donut", "Taco", "Sushi", "Popcorn", "Cookie",
            "Cupcake", "Sandwich", "French Fries", "Coffee Cup", "Watermelon"
        ]
    },
    objects: {
        name: "Objects",
        emoji: "💡",
        items: [
            "House", "Car", "Tree", "Sun", "Moon", "Star", "Heart",
            "Phone", "Book", "Chair", "Table", "Lamp", "Clock", "Key",
            "Umbrella", "Scissors", "Guitar", "Camera", "Glasses", "Hat"
        ]
    },
    places: {
        name: "Places",
        emoji: "🏰",
        items: [
            "Beach", "Mountain", "Island", "Castle", "School", "Bridge",
            "Lighthouse", "Tent", "Igloo", "Pyramid", "Volcano", "Forest",
            "Farm", "Park", "City"
        ]
    },
    actions: {
        name: "Actions",
        emoji: "🏃",
        items: [
            "Running", "Sleeping", "Dancing", "Swimming", "Reading",
            "Cooking", "Fishing", "Flying", "Crying", "Laughing",
            "Singing", "Jumping", "Climbing", "Driving", "Eating"
        ]
    },
    nature: {
        name: "Nature",
        emoji: "🌸",
        items: [
            "Flower", "Cloud", "Rainbow", "Lightning", "Rain", "Snow",
            "Leaf", "Mushroom", "Cactus", "Palm Tree", "Rose", "Sunflower",
            "River", "Ocean Wave", "Campfire", "Snowflake"
        ]
    },
    vehicles: {
        name: "Vehicles",
        emoji: "🚗",
        items: [
            "Car", "Bus", "Train", "Airplane", "Helicopter", "Boat",
            "Rocket", "Motorcycle", "Truck", "Ambulance", "Fire Truck",
            "Taxi", "Submarine", "Hot Air Balloon", "Sailboat", "UFO"
        ]
    },
    characters: {
        name: "Characters",
        emoji: "👻",
        items: [
            "Robot", "Ghost", "Alien", "Witch", "Wizard", "Pirate",
            "Princess", "Knight", "Superhero", "Ninja", "Vampire",
            "Zombie", "Mermaid", "Dragon", "Unicorn", "Monster", "Snowman"
        ]
    }
};

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
    module.exports = { PROMPTS, TRANSFORMATIONS };
}
