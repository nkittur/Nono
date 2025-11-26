/**
 * Emposter - Prompts Database
 * Each prompt has a real word and an impostor variant (similar but different)
 */

const PROMPTS = {
    food: {
        name: "Food & Drinks",
        emoji: "🍕",
        items: [
            { real: "Pizza", impostor: "Italian Food" },
            { real: "Sushi", impostor: "Japanese Food" },
            { real: "Tacos", impostor: "Mexican Food" },
            { real: "Ice Cream Sundae", impostor: "Dessert" },
            { real: "Hot Dog", impostor: "Street Food" },
            { real: "Birthday Cake", impostor: "Celebration Food" },
            { real: "Popcorn at Movies", impostor: "Movie Snack" },
            { real: "Thanksgiving Turkey", impostor: "Holiday Dinner" },
            { real: "Peanut Butter & Jelly", impostor: "Sandwich" },
            { real: "Breakfast in Bed", impostor: "Morning Meal" },
            { real: "Coffee Shop", impostor: "Cafe" },
            { real: "BBQ Ribs", impostor: "Grilled Meat" },
            { real: "Chocolate Chip Cookies", impostor: "Baked Goods" },
            { real: "Bubble Tea", impostor: "Cold Drink" },
            { real: "Mac and Cheese", impostor: "Comfort Food" }
        ]
    },
    activities: {
        name: "Activities",
        emoji: "🎯",
        items: [
            { real: "Going to the Dentist", impostor: "Doctor Visit" },
            { real: "First Date", impostor: "Romantic Evening" },
            { real: "Job Interview", impostor: "Important Meeting" },
            { real: "Road Trip", impostor: "Travel" },
            { real: "Beach Vacation", impostor: "Summer Holiday" },
            { real: "Camping", impostor: "Outdoor Adventure" },
            { real: "Karaoke Night", impostor: "Night Out" },
            { real: "Going to the Gym", impostor: "Exercise" },
            { real: "Grocery Shopping", impostor: "Errands" },
            { real: "Waiting in Line", impostor: "Being Patient" },
            { real: "Taking a Selfie", impostor: "Photography" },
            { real: "Binge Watching TV", impostor: "Relaxing at Home" },
            { real: "Moving to New House", impostor: "Big Life Change" },
            { real: "Learning to Drive", impostor: "New Skill" },
            { real: "Baby's First Steps", impostor: "Milestone Moment" }
        ]
    },
    places: {
        name: "Places",
        emoji: "🗺️",
        items: [
            { real: "Haunted House", impostor: "Scary Place" },
            { real: "Amusement Park", impostor: "Fun Destination" },
            { real: "Hospital", impostor: "Medical Building" },
            { real: "Airport", impostor: "Transportation Hub" },
            { real: "Public Bathroom", impostor: "Restroom" },
            { real: "Las Vegas", impostor: "Party City" },
            { real: "School Cafeteria", impostor: "Eating Area" },
            { real: "Gym Locker Room", impostor: "Changing Area" },
            { real: "Grandma's House", impostor: "Family Home" },
            { real: "Movie Theater", impostor: "Entertainment Venue" },
            { real: "Elevator", impostor: "Small Space" },
            { real: "DMV", impostor: "Government Office" },
            { real: "Ikea", impostor: "Furniture Store" },
            { real: "Costco", impostor: "Big Store" },
            { real: "Disney World", impostor: "Theme Park" }
        ]
    },
    situations: {
        name: "Awkward Moments",
        emoji: "😅",
        items: [
            { real: "Waving Back at Someone Not Waving at You", impostor: "Embarrassing Mistake" },
            { real: "Forgetting Someone's Name", impostor: "Memory Fail" },
            { real: "Loud Stomach Growl in Quiet Room", impostor: "Body Noise" },
            { real: "Walking into Glass Door", impostor: "Clumsy Moment" },
            { real: "Sending Text to Wrong Person", impostor: "Phone Mistake" },
            { real: "Forgetting Your Wallet", impostor: "Left Something Behind" },
            { real: "Accidentally Liking Old Photo", impostor: "Social Media Fail" },
            { real: "Running into Your Ex", impostor: "Awkward Encounter" },
            { real: "Food Stuck in Teeth All Day", impostor: "Embarrassing Discovery" },
            { real: "Singing Wrong Lyrics Loudly", impostor: "Music Fail" },
            { real: "Tripping on Flat Ground", impostor: "Falling" },
            { real: "Calling Teacher Mom", impostor: "Wrong Name" },
            { real: "Laughing at Serious Moment", impostor: "Bad Timing" },
            { real: "Reply All Disaster", impostor: "Email Mistake" },
            { real: "Clogging Someone's Toilet", impostor: "Bathroom Emergency" }
        ]
    },
    movies: {
        name: "Movies & TV",
        emoji: "🎬",
        items: [
            { real: "Titanic", impostor: "Sad Movie" },
            { real: "The Lion King", impostor: "Disney Movie" },
            { real: "Jaws", impostor: "Scary Movie" },
            { real: "Home Alone", impostor: "Christmas Movie" },
            { real: "The Office", impostor: "Comedy Show" },
            { real: "Stranger Things", impostor: "Sci-Fi Show" },
            { real: "Friends", impostor: "Sitcom" },
            { real: "Game of Thrones", impostor: "Fantasy Show" },
            { real: "Star Wars", impostor: "Space Movie" },
            { real: "Frozen", impostor: "Animated Movie" },
            { real: "The Avengers", impostor: "Superhero Movie" },
            { real: "Jurassic Park", impostor: "Adventure Movie" },
            { real: "Harry Potter", impostor: "Magic Movie" },
            { real: "Finding Nemo", impostor: "Pixar Movie" },
            { real: "Breaking Bad", impostor: "Drama Series" }
        ]
    },
    emotions: {
        name: "Feelings",
        emoji: "💭",
        items: [
            { real: "Monday Morning", impostor: "Start of Week" },
            { real: "Friday Feeling", impostor: "End of Week" },
            { real: "Sunday Scaries", impostor: "Weekend Ending" },
            { real: "Hangry", impostor: "Bad Mood" },
            { real: "Food Coma", impostor: "Tired Feeling" },
            { real: "FOMO", impostor: "Left Out" },
            { real: "Butterflies in Stomach", impostor: "Nervous Feeling" },
            { real: "Love at First Sight", impostor: "Strong Attraction" },
            { real: "Jet Lag", impostor: "Exhaustion" },
            { real: "Stage Fright", impostor: "Performance Anxiety" },
            { real: "Brain Freeze", impostor: "Head Pain" },
            { real: "Nostalgia", impostor: "Thinking of Past" },
            { real: "Hangover", impostor: "Feeling Rough" },
            { real: "Exam Stress", impostor: "Academic Pressure" },
            { real: "Homesick", impostor: "Missing Something" }
        ]
    },
    celebrities: {
        name: "Famous People",
        emoji: "⭐",
        items: [
            { real: "Taylor Swift", impostor: "Pop Star" },
            { real: "Dwayne The Rock Johnson", impostor: "Action Star" },
            { real: "Beyoncé", impostor: "R&B Singer" },
            { real: "Elon Musk", impostor: "Tech Billionaire" },
            { real: "Oprah", impostor: "Talk Show Host" },
            { real: "LeBron James", impostor: "Basketball Player" },
            { real: "Kim Kardashian", impostor: "Reality Star" },
            { real: "Tom Hanks", impostor: "Famous Actor" },
            { real: "Lady Gaga", impostor: "Eccentric Singer" },
            { real: "Michael Jordan", impostor: "Sports Legend" },
            { real: "Ariana Grande", impostor: "Young Singer" },
            { real: "Gordon Ramsay", impostor: "Celebrity Chef" },
            { real: "Ellen DeGeneres", impostor: "TV Personality" },
            { real: "Drake", impostor: "Rapper" },
            { real: "Billie Eilish", impostor: "Gen Z Artist" }
        ]
    },
    animals: {
        name: "Animals",
        emoji: "🦁",
        items: [
            { real: "Cat Knocking Things Off Table", impostor: "Mischievous Pet" },
            { real: "Dog at the Vet", impostor: "Nervous Pet" },
            { real: "Squirrel Stealing Bird Food", impostor: "Sneaky Animal" },
            { real: "Penguin Sliding on Ice", impostor: "Cute Animal" },
            { real: "Sloth Moving Slowly", impostor: "Lazy Animal" },
            { real: "Parrot Repeating Words", impostor: "Talking Bird" },
            { real: "Puppy Learning to Walk", impostor: "Baby Animal" },
            { real: "Cat in a Box", impostor: "Cat Being Cat" },
            { real: "Dog Chasing Tail", impostor: "Silly Pet" },
            { real: "Goldfish in Bowl", impostor: "Pet Fish" },
            { real: "Hamster on Wheel", impostor: "Small Pet" },
            { real: "Owl at Night", impostor: "Night Bird" },
            { real: "Monkey Eating Banana", impostor: "Primate" },
            { real: "Shark in Ocean", impostor: "Sea Predator" },
            { real: "Bee Making Honey", impostor: "Busy Insect" }
        ]
    },
    internet: {
        name: "Internet & Tech",
        emoji: "📱",
        items: [
            { real: "Netflix and Chill", impostor: "Streaming Service" },
            { real: "Going Viral", impostor: "Popular Online" },
            { real: "Getting Rick Rolled", impostor: "Internet Prank" },
            { real: "Doom Scrolling", impostor: "Phone Addiction" },
            { real: "Online Shopping at 2am", impostor: "Late Night Purchase" },
            { real: "Zoom Call", impostor: "Video Meeting" },
            { real: "WiFi Going Out", impostor: "Tech Problem" },
            { real: "Phone Dying at 1%", impostor: "Low Battery" },
            { real: "Autocorrect Fail", impostor: "Typing Error" },
            { real: "Unread Email Anxiety", impostor: "Digital Stress" },
            { real: "Forgot Password", impostor: "Login Problem" },
            { real: "Blue Screen of Death", impostor: "Computer Crash" },
            { real: "Instagram vs Reality", impostor: "Social Media Life" },
            { real: "Waiting for Package Delivery", impostor: "Online Order" },
            { real: "Cancel Subscription", impostor: "Stopping Service" }
        ]
    },
    holidays: {
        name: "Holidays & Events",
        emoji: "🎉",
        items: [
            { real: "Christmas Morning", impostor: "Holiday Celebration" },
            { real: "New Year's Eve Countdown", impostor: "End of Year Party" },
            { real: "Trick or Treating", impostor: "Halloween Activity" },
            { real: "Fourth of July Fireworks", impostor: "Summer Holiday" },
            { real: "Thanksgiving Dinner", impostor: "Family Meal" },
            { real: "Valentine's Day Date", impostor: "Romantic Holiday" },
            { real: "Birthday Party", impostor: "Celebration" },
            { real: "Wedding Day", impostor: "Big Event" },
            { real: "Graduation Ceremony", impostor: "Achievement Day" },
            { real: "Super Bowl Party", impostor: "Sports Event" },
            { real: "Black Friday Shopping", impostor: "Big Sale" },
            { real: "Spring Break", impostor: "School Vacation" },
            { real: "St. Patrick's Day", impostor: "Green Holiday" },
            { real: "Mother's Day", impostor: "Family Holiday" },
            { real: "Prom Night", impostor: "School Dance" }
        ]
    }
};

// Export for use in game
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PROMPTS;
}
