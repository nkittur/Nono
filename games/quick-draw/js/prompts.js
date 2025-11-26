/**
 * Quick Draw - Drawing Prompts Database
 * Things to draw with limited strokes!
 */

const PROMPTS = {
    animals: {
        name: "Animals",
        emoji: "🐾",
        items: [
            { word: "Cat", difficulty: "easy" },
            { word: "Dog", difficulty: "easy" },
            { word: "Fish", difficulty: "easy" },
            { word: "Bird", difficulty: "easy" },
            { word: "Snake", difficulty: "easy" },
            { word: "Elephant", difficulty: "medium" },
            { word: "Giraffe", difficulty: "medium" },
            { word: "Butterfly", difficulty: "medium" },
            { word: "Spider", difficulty: "medium" },
            { word: "Penguin", difficulty: "medium" },
            { word: "Octopus", difficulty: "hard" },
            { word: "Kangaroo", difficulty: "hard" },
            { word: "Peacock", difficulty: "hard" },
            { word: "Lobster", difficulty: "hard" },
            { word: "Turtle", difficulty: "easy" },
            { word: "Rabbit", difficulty: "easy" },
            { word: "Horse", difficulty: "medium" },
            { word: "Pig", difficulty: "easy" },
            { word: "Cow", difficulty: "easy" },
            { word: "Shark", difficulty: "medium" }
        ]
    },
    food: {
        name: "Food & Drinks",
        emoji: "🍕",
        items: [
            { word: "Pizza", difficulty: "easy" },
            { word: "Burger", difficulty: "easy" },
            { word: "Ice Cream", difficulty: "easy" },
            { word: "Apple", difficulty: "easy" },
            { word: "Banana", difficulty: "easy" },
            { word: "Cake", difficulty: "easy" },
            { word: "Hot Dog", difficulty: "easy" },
            { word: "Donut", difficulty: "easy" },
            { word: "Taco", difficulty: "medium" },
            { word: "Sushi", difficulty: "medium" },
            { word: "Popcorn", difficulty: "medium" },
            { word: "Watermelon", difficulty: "medium" },
            { word: "Pineapple", difficulty: "medium" },
            { word: "Fried Egg", difficulty: "easy" },
            { word: "Cookie", difficulty: "easy" },
            { word: "Cupcake", difficulty: "medium" },
            { word: "Grapes", difficulty: "medium" },
            { word: "Sandwich", difficulty: "easy" },
            { word: "French Fries", difficulty: "easy" },
            { word: "Coffee Cup", difficulty: "easy" }
        ]
    },
    objects: {
        name: "Objects",
        emoji: "💡",
        items: [
            { word: "House", difficulty: "easy" },
            { word: "Car", difficulty: "easy" },
            { word: "Tree", difficulty: "easy" },
            { word: "Sun", difficulty: "easy" },
            { word: "Moon", difficulty: "easy" },
            { word: "Star", difficulty: "easy" },
            { word: "Heart", difficulty: "easy" },
            { word: "Phone", difficulty: "easy" },
            { word: "Book", difficulty: "easy" },
            { word: "Chair", difficulty: "easy" },
            { word: "Table", difficulty: "easy" },
            { word: "Lamp", difficulty: "easy" },
            { word: "Clock", difficulty: "medium" },
            { word: "Key", difficulty: "easy" },
            { word: "Umbrella", difficulty: "medium" },
            { word: "Scissors", difficulty: "medium" },
            { word: "Guitar", difficulty: "medium" },
            { word: "Camera", difficulty: "medium" },
            { word: "Glasses", difficulty: "easy" },
            { word: "Hat", difficulty: "easy" }
        ]
    },
    places: {
        name: "Places",
        emoji: "🏰",
        items: [
            { word: "Beach", difficulty: "medium" },
            { word: "Mountain", difficulty: "easy" },
            { word: "Island", difficulty: "medium" },
            { word: "Castle", difficulty: "medium" },
            { word: "School", difficulty: "medium" },
            { word: "Hospital", difficulty: "medium" },
            { word: "Church", difficulty: "medium" },
            { word: "Bridge", difficulty: "medium" },
            { word: "Lighthouse", difficulty: "medium" },
            { word: "Tent", difficulty: "easy" },
            { word: "Igloo", difficulty: "easy" },
            { word: "Pyramid", difficulty: "easy" },
            { word: "Volcano", difficulty: "medium" },
            { word: "Waterfall", difficulty: "medium" },
            { word: "Forest", difficulty: "medium" },
            { word: "City", difficulty: "hard" },
            { word: "Farm", difficulty: "medium" },
            { word: "Zoo", difficulty: "hard" },
            { word: "Airport", difficulty: "hard" },
            { word: "Park", difficulty: "medium" }
        ]
    },
    actions: {
        name: "Actions",
        emoji: "🏃",
        items: [
            { word: "Running", difficulty: "medium" },
            { word: "Sleeping", difficulty: "easy" },
            { word: "Dancing", difficulty: "medium" },
            { word: "Swimming", difficulty: "medium" },
            { word: "Reading", difficulty: "medium" },
            { word: "Cooking", difficulty: "medium" },
            { word: "Fishing", difficulty: "medium" },
            { word: "Flying", difficulty: "medium" },
            { word: "Crying", difficulty: "easy" },
            { word: "Laughing", difficulty: "medium" },
            { word: "Singing", difficulty: "medium" },
            { word: "Jumping", difficulty: "medium" },
            { word: "Climbing", difficulty: "medium" },
            { word: "Driving", difficulty: "medium" },
            { word: "Eating", difficulty: "medium" },
            { word: "Surfing", difficulty: "medium" },
            { word: "Skiing", difficulty: "medium" },
            { word: "Bowling", difficulty: "medium" },
            { word: "Painting", difficulty: "medium" },
            { word: "Waving", difficulty: "easy" }
        ]
    },
    sports: {
        name: "Sports",
        emoji: "⚽",
        items: [
            { word: "Soccer Ball", difficulty: "easy" },
            { word: "Basketball", difficulty: "easy" },
            { word: "Football", difficulty: "easy" },
            { word: "Baseball", difficulty: "easy" },
            { word: "Tennis Racket", difficulty: "medium" },
            { word: "Golf Club", difficulty: "medium" },
            { word: "Hockey Stick", difficulty: "medium" },
            { word: "Boxing Gloves", difficulty: "medium" },
            { word: "Skateboard", difficulty: "medium" },
            { word: "Bicycle", difficulty: "medium" },
            { word: "Surfboard", difficulty: "easy" },
            { word: "Bowling Pin", difficulty: "easy" },
            { word: "Trophy", difficulty: "medium" },
            { word: "Medal", difficulty: "easy" },
            { word: "Dumbbell", difficulty: "easy" },
            { word: "Swimming Pool", difficulty: "easy" },
            { word: "Goal Post", difficulty: "easy" },
            { word: "Helmet", difficulty: "medium" },
            { word: "Sneakers", difficulty: "medium" },
            { word: "Stopwatch", difficulty: "medium" }
        ]
    },
    nature: {
        name: "Nature",
        emoji: "🌸",
        items: [
            { word: "Flower", difficulty: "easy" },
            { word: "Cloud", difficulty: "easy" },
            { word: "Rainbow", difficulty: "easy" },
            { word: "Lightning", difficulty: "easy" },
            { word: "Rain", difficulty: "easy" },
            { word: "Snow", difficulty: "easy" },
            { word: "Leaf", difficulty: "easy" },
            { word: "Mushroom", difficulty: "easy" },
            { word: "Cactus", difficulty: "easy" },
            { word: "Palm Tree", difficulty: "medium" },
            { word: "Rose", difficulty: "medium" },
            { word: "Sunflower", difficulty: "medium" },
            { word: "River", difficulty: "easy" },
            { word: "Ocean Wave", difficulty: "medium" },
            { word: "Tornado", difficulty: "medium" },
            { word: "Campfire", difficulty: "medium" },
            { word: "Snowflake", difficulty: "medium" },
            { word: "Sunrise", difficulty: "medium" },
            { word: "Full Moon", difficulty: "easy" },
            { word: "Shooting Star", difficulty: "easy" }
        ]
    },
    vehicles: {
        name: "Vehicles",
        emoji: "🚗",
        items: [
            { word: "Car", difficulty: "easy" },
            { word: "Bus", difficulty: "easy" },
            { word: "Train", difficulty: "medium" },
            { word: "Airplane", difficulty: "medium" },
            { word: "Helicopter", difficulty: "medium" },
            { word: "Boat", difficulty: "easy" },
            { word: "Rocket", difficulty: "easy" },
            { word: "Motorcycle", difficulty: "medium" },
            { word: "Truck", difficulty: "easy" },
            { word: "Ambulance", difficulty: "medium" },
            { word: "Fire Truck", difficulty: "medium" },
            { word: "Police Car", difficulty: "medium" },
            { word: "Taxi", difficulty: "easy" },
            { word: "Submarine", difficulty: "medium" },
            { word: "Hot Air Balloon", difficulty: "medium" },
            { word: "Sailboat", difficulty: "medium" },
            { word: "Scooter", difficulty: "easy" },
            { word: "Tractor", difficulty: "medium" },
            { word: "UFO", difficulty: "easy" },
            { word: "Spaceship", difficulty: "medium" }
        ]
    },
    characters: {
        name: "Characters",
        emoji: "👻",
        items: [
            { word: "Robot", difficulty: "medium" },
            { word: "Ghost", difficulty: "easy" },
            { word: "Alien", difficulty: "medium" },
            { word: "Witch", difficulty: "medium" },
            { word: "Wizard", difficulty: "medium" },
            { word: "Pirate", difficulty: "medium" },
            { word: "Princess", difficulty: "medium" },
            { word: "Knight", difficulty: "medium" },
            { word: "Superhero", difficulty: "medium" },
            { word: "Ninja", difficulty: "medium" },
            { word: "Vampire", difficulty: "medium" },
            { word: "Zombie", difficulty: "medium" },
            { word: "Mermaid", difficulty: "medium" },
            { word: "Dragon", difficulty: "hard" },
            { word: "Unicorn", difficulty: "medium" },
            { word: "Monster", difficulty: "medium" },
            { word: "Angel", difficulty: "medium" },
            { word: "Devil", difficulty: "medium" },
            { word: "Clown", difficulty: "medium" },
            { word: "Snowman", difficulty: "easy" }
        ]
    },
    household: {
        name: "Household",
        emoji: "🏠",
        items: [
            { word: "Bed", difficulty: "easy" },
            { word: "Sofa", difficulty: "easy" },
            { word: "TV", difficulty: "easy" },
            { word: "Refrigerator", difficulty: "medium" },
            { word: "Microwave", difficulty: "medium" },
            { word: "Toilet", difficulty: "easy" },
            { word: "Bathtub", difficulty: "easy" },
            { word: "Shower", difficulty: "medium" },
            { word: "Mirror", difficulty: "easy" },
            { word: "Window", difficulty: "easy" },
            { word: "Door", difficulty: "easy" },
            { word: "Stairs", difficulty: "easy" },
            { word: "Fireplace", difficulty: "medium" },
            { word: "Fan", difficulty: "easy" },
            { word: "Vacuum", difficulty: "medium" },
            { word: "Toaster", difficulty: "easy" },
            { word: "Blender", difficulty: "medium" },
            { word: "Iron", difficulty: "easy" },
            { word: "Broom", difficulty: "easy" },
            { word: "Trash Can", difficulty: "easy" }
        ]
    }
};

// Stroke limits by difficulty
const DIFFICULTY_SETTINGS = {
    easy: {
        name: "Easy",
        strokes: 15,
        inkLimit: 3000, // pixels of ink
        time: 60
    },
    medium: {
        name: "Medium",
        strokes: 10,
        inkLimit: 2000,
        time: 45
    },
    hard: {
        name: "Hard",
        strokes: 6,
        inkLimit: 1200,
        time: 30
    }
};

// Export for use in game
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PROMPTS, DIFFICULTY_SETTINGS };
}
