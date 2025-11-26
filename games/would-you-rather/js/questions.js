/**
 * Would You Rather - Questions Database
 * Fun dilemmas that spark conversation!
 */

const QUESTIONS = [
    // Classic dilemmas
    { a: "Be able to fly", b: "Be able to read minds" },
    { a: "Have unlimited money", b: "Have unlimited time" },
    { a: "Live without music", b: "Live without movies" },
    { a: "Be famous", b: "Be the best friend of someone famous" },
    { a: "Travel to the past", b: "Travel to the future" },
    { a: "Always be cold", b: "Always be hot" },
    { a: "Never use social media again", b: "Never watch TV/movies again" },
    { a: "Have a rewind button for your life", b: "Have a pause button for your life" },
    { a: "Know how you will die", b: "Know when you will die" },
    { a: "Be invisible", b: "Be able to teleport" },

    // Food related
    { a: "Only eat pizza forever", b: "Never eat pizza again" },
    { a: "Give up cheese", b: "Give up chocolate" },
    { a: "Eat only spicy food", b: "Eat only bland food" },
    { a: "Never drink coffee again", b: "Never eat dessert again" },
    { a: "Only eat breakfast food", b: "Never eat breakfast food" },
    { a: "Have a personal chef", b: "Have a personal chauffeur" },
    { a: "Give up your phone for a month", b: "Give up your favorite food for a year" },

    // Social situations
    { a: "Always say what's on your mind", b: "Never speak again" },
    { a: "Have 1 best friend", b: "Have 10 good friends" },
    { a: "Be the funniest person", b: "Be the smartest person" },
    { a: "Always be overdressed", b: "Always be underdressed" },
    { a: "Have everyone know your secrets", b: "Know everyone's secrets" },
    { a: "Never be able to lie", b: "Never know if others are lying" },
    { a: "Be stuck in an elevator with your ex", b: "Be stuck in traffic for 8 hours" },

    // Life choices
    { a: "Work your dream job for minimum wage", b: "Work a boring job for great pay" },
    { a: "Live in the city", b: "Live in the countryside" },
    { a: "Be a kid your whole life", b: "Be an adult your whole life" },
    { a: "Have no responsibilities", b: "Have complete control of your life" },
    { a: "Know all languages", b: "Play all instruments" },
    { a: "Have a great memory", b: "Have great creativity" },
    { a: "Live 100 comfortable years", b: "Live 50 adventurous years" },

    // Silly/fun
    { a: "Have a tail", b: "Have wings that don't work" },
    { a: "Speak to animals", b: "Speak all human languages" },
    { a: "Have super strength", b: "Have super speed" },
    { a: "Be a wizard", b: "Be a superhero" },
    { a: "Fight 100 duck-sized horses", b: "Fight 1 horse-sized duck" },
    { a: "Have spaghetti for hair", b: "Sweat maple syrup" },
    { a: "Only whisper", b: "Only shout" },
    { a: "Have hands for feet", b: "Have feet for hands" },

    // Technology
    { a: "Give up your smartphone", b: "Give up your computer" },
    { a: "Have free WiFi everywhere", b: "Have free coffee everywhere" },
    { a: "Live without AC", b: "Live without heating" },
    { a: "Never use GPS again", b: "Never use autocorrect again" },
    { a: "Have a robot butler", b: "Have a flying car" },

    // Experiences
    { a: "Go to space", b: "Explore the deep ocean" },
    { a: "Meet your future self", b: "Meet your past self" },
    { a: "Relive your favorite day", b: "Undo your worst mistake" },
    { a: "Win the lottery", b: "Live twice as long" },
    { a: "Be famous on social media", b: "Be unknown but wealthy" },
    { a: "Have a perfect singing voice", b: "Be an amazing dancer" },
    { a: "Travel anywhere for free", b: "Eat anywhere for free" },

    // Family friendly challenges
    { a: "Have hiccups forever", b: "Feel like you need to sneeze forever" },
    { a: "Only wear one color", b: "Have to wear every color at once" },
    { a: "Be itchy forever", b: "Be sticky forever" },
    { a: "Have a pause button", b: "Have a skip button" },
    { a: "Be a great singer", b: "Be a great athlete" },
    { a: "Have more hours in a day", b: "Have more days in a week" },
    { a: "Always be 10 minutes late", b: "Always be 20 minutes early" },

    // Thought provoking
    { a: "Know the truth about everything", b: "Be blissfully ignorant" },
    { a: "Change the past", b: "See the future" },
    { a: "Have more time", b: "Have more money" },
    { a: "Be loved", b: "Be respected" },
    { a: "Have wisdom", b: "Have intelligence" },
    { a: "Be able to change one law", b: "Be immune to one law" },
    { a: "Never fail", b: "Never give up" },

    // Pop culture
    { a: "Live in the Harry Potter universe", b: "Live in the Marvel universe" },
    { a: "Be a Jedi", b: "Be a wizard" },
    { a: "Have dinner with any historical figure", b: "Have dinner with any fictional character" },
    { a: "Be in a sitcom", b: "Be in an action movie" },
    { a: "Have a theme song play when you enter", b: "Have a narrator describe your actions" },

    // More dilemmas
    { a: "Always win arguments", b: "Never get into arguments" },
    { a: "Have the power to heal others", b: "Have the power to heal yourself" },
    { a: "Remember everything you read", b: "Remember everything you hear" },
    { a: "Control fire", b: "Control water" },
    { a: "Be extremely lucky", b: "Be extremely skilled" },
    { a: "Have all your dreams come true", b: "Have all your nightmares disappear" },
    { a: "Be able to talk to your younger self", b: "Be able to talk to your older self" },

    // Daily life
    { a: "Never have to sleep", b: "Never have to eat" },
    { a: "Always have a full phone battery", b: "Always have a full tank of gas" },
    { a: "Have a pause button for your life", b: "Have a fast-forward button" },
    { a: "Never wait in line", b: "Never be stuck in traffic" },
    { a: "Have perfect teeth", b: "Have perfect skin" },
    { a: "Be able to remember every name", b: "Be able to remember every face" },
    { a: "Control your dreams", b: "Never need sleep" }
];

// Shuffle function
function shuffleQuestions() {
    const shuffled = [...QUESTIONS];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}
