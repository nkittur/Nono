/**
 * Emoji Clash - Content Packs
 * Guess from emoji clues! Content for teens and parents alike.
 */

const PACKS = {
    // ============================================
    // SONGS BY DECADE
    // ============================================
    'songs-80s': {
        name: "80s Hits",
        emoji: "📼",
        category: "songs",
        items: [
            { answer: "Beat It", hint: "Michael Jackson", emojis: "👊🏃", difficulty: "easy" },
            { answer: "Purple Rain", hint: "Prince", emojis: "💜🌧️", difficulty: "easy" },
            { answer: "Sweet Child O' Mine", hint: "Guns N' Roses", emojis: "🍬👶⛏️", difficulty: "medium" },
            { answer: "Like a Virgin", hint: "Madonna", emojis: "❤️👰", difficulty: "medium" },
            { answer: "Take On Me", hint: "a-ha", emojis: "✋👤", difficulty: "medium" },
            { answer: "Every Breath You Take", hint: "The Police", emojis: "😤👀🫵", difficulty: "easy" },
            { answer: "Billie Jean", hint: "Michael Jackson", emojis: "👩👖", difficulty: "medium" },
            { answer: "Jump", hint: "Van Halen", emojis: "🦘⬆️", difficulty: "easy" },
            { answer: "Girls Just Want to Have Fun", hint: "Cyndi Lauper", emojis: "👩👩👩🎉", difficulty: "easy" },
            { answer: "Don't Stop Believin'", hint: "Journey", emojis: "🚫🛑🙏", difficulty: "medium" },
            { answer: "Livin' on a Prayer", hint: "Bon Jovi", emojis: "🏠🙏", difficulty: "medium" },
            { answer: "Eye of the Tiger", hint: "Survivor", emojis: "👁️🐯", difficulty: "easy" },
            { answer: "Sweet Dreams", hint: "Eurythmics", emojis: "🍬💭😴", difficulty: "easy" },
            { answer: "I Love Rock 'n' Roll", hint: "Joan Jett", emojis: "❤️🎸🎶", difficulty: "easy" },
            { answer: "Walk Like an Egyptian", hint: "The Bangles", emojis: "🚶🇪🇬", difficulty: "easy" },
            { answer: "Time After Time", hint: "Cyndi Lauper", emojis: "⏰➡️⏰", difficulty: "medium" },
            { answer: "Under Pressure", hint: "Queen & David Bowie", emojis: "⬇️😰💨", difficulty: "medium" },
            { answer: "Hungry Like the Wolf", hint: "Duran Duran", emojis: "😋🐺", difficulty: "easy" },
            { answer: "Material Girl", hint: "Madonna", emojis: "💎👧💰", difficulty: "easy" },
            { answer: "Wake Me Up Before You Go-Go", hint: "Wham!", emojis: "⏰😴👋", difficulty: "medium" }
        ]
    },

    'songs-90s': {
        name: "90s Hits",
        emoji: "💿",
        category: "songs",
        items: [
            { answer: "Smells Like Teen Spirit", hint: "Nirvana", emojis: "👃👦👻", difficulty: "hard" },
            { answer: "Wannabe", hint: "Spice Girls", emojis: "🌶️👯‍♀️🙋‍♀️", difficulty: "medium" },
            { answer: "...Baby One More Time", hint: "Britney Spears", emojis: "👶1️⃣➕⏰", difficulty: "medium" },
            { answer: "I Will Always Love You", hint: "Whitney Houston", emojis: "👤❤️🫵♾️", difficulty: "easy" },
            { answer: "Ice Ice Baby", hint: "Vanilla Ice", emojis: "🧊🧊👶", difficulty: "easy" },
            { answer: "Black or White", hint: "Michael Jackson", emojis: "⬛⬜", difficulty: "easy" },
            { answer: "Waterfalls", hint: "TLC", emojis: "💧⬇️🏞️", difficulty: "easy" },
            { answer: "Under the Bridge", hint: "Red Hot Chili Peppers", emojis: "⬇️🌉", difficulty: "easy" },
            { answer: "Wonderwall", hint: "Oasis", emojis: "🤔🧱", difficulty: "medium" },
            { answer: "Losing My Religion", hint: "R.E.M.", emojis: "📉⛪", difficulty: "medium" },
            { answer: "Kiss from a Rose", hint: "Seal", emojis: "💋🌹", difficulty: "easy" },
            { answer: "Gangsta's Paradise", hint: "Coolio", emojis: "😎🔫🏝️", difficulty: "easy" },
            { answer: "MMMBop", hint: "Hanson", emojis: "Ⓜ️Ⓜ️Ⓜ️💥", difficulty: "medium" },
            { answer: "Believe", hint: "Cher", emojis: "🙏✨💫", difficulty: "medium" },
            { answer: "My Heart Will Go On", hint: "Celine Dion", emojis: "❤️🚢➡️", difficulty: "medium" },
            { answer: "Torn", hint: "Natalie Imbruglia", emojis: "📄✂️😢", difficulty: "medium" },
            { answer: "No Scrubs", hint: "TLC", emojis: "🚫🧽🚗", difficulty: "medium" },
            { answer: "Barbie Girl", hint: "Aqua", emojis: "👱‍♀️👧🎀", difficulty: "easy" },
            { answer: "Iris", hint: "Goo Goo Dolls", emojis: "👁️🌸", difficulty: "hard" },
            { answer: "Smooth", hint: "Santana ft. Rob Thomas", emojis: "🧈😎🎸", difficulty: "medium" }
        ]
    },

    'songs-2000s': {
        name: "2000s Hits",
        emoji: "📱",
        category: "songs",
        items: [
            { answer: "Crazy in Love", hint: "Beyoncé", emojis: "🤪❤️", difficulty: "easy" },
            { answer: "Hot in Herre", hint: "Nelly", emojis: "🔥👇", difficulty: "easy" },
            { answer: "In Da Club", hint: "50 Cent", emojis: "👉🪩", difficulty: "easy" },
            { answer: "Gold Digger", hint: "Kanye West", emojis: "🥇⛏️", difficulty: "easy" },
            { answer: "Toxic", hint: "Britney Spears", emojis: "☠️💚", difficulty: "medium" },
            { answer: "Hey Ya!", hint: "OutKast", emojis: "👋🫵❗", difficulty: "easy" },
            { answer: "Since U Been Gone", hint: "Kelly Clarkson", emojis: "⏰🫵👋", difficulty: "medium" },
            { answer: "Umbrella", hint: "Rihanna", emojis: "☂️☔", difficulty: "easy" },
            { answer: "Single Ladies", hint: "Beyoncé", emojis: "1️⃣👩💍", difficulty: "easy" },
            { answer: "Poker Face", hint: "Lady Gaga", emojis: "🃏😐", difficulty: "easy" },
            { answer: "I Gotta Feeling", hint: "Black Eyed Peas", emojis: "👤💭🎉", difficulty: "medium" },
            { answer: "Beautiful Day", hint: "U2", emojis: "😍☀️📅", difficulty: "easy" },
            { answer: "Hips Don't Lie", hint: "Shakira", emojis: "🫰🚫🤥", difficulty: "medium" },
            { answer: "Mr. Brightside", hint: "The Killers", emojis: "👨☀️😊", difficulty: "medium" },
            { answer: "Clocks", hint: "Coldplay", emojis: "⏰🕐🕑", difficulty: "easy" },
            { answer: "American Idiot", hint: "Green Day", emojis: "🇺🇸🤡", difficulty: "easy" },
            { answer: "Drop It Like It's Hot", hint: "Snoop Dogg", emojis: "⬇️🔥", difficulty: "easy" },
            { answer: "Bleeding Love", hint: "Leona Lewis", emojis: "🩸❤️", difficulty: "easy" },
            { answer: "Love Story", hint: "Taylor Swift", emojis: "❤️📖👸", difficulty: "easy" },
            { answer: "Viva la Vida", hint: "Coldplay", emojis: "🎉🌎👑", difficulty: "medium" }
        ]
    },

    'songs-2010s': {
        name: "2010s Hits",
        emoji: "📲",
        category: "songs",
        items: [
            { answer: "Rolling in the Deep", hint: "Adele", emojis: "🛞🌊⬇️", difficulty: "medium" },
            { answer: "Call Me Maybe", hint: "Carly Rae Jepsen", emojis: "📞👤❓", difficulty: "easy" },
            { answer: "Happy", hint: "Pharrell Williams", emojis: "😊😄🎉", difficulty: "easy" },
            { answer: "Shake It Off", hint: "Taylor Swift", emojis: "🙅‍♀️💃🎵", difficulty: "easy" },
            { answer: "Uptown Funk", hint: "Bruno Mars", emojis: "⬆️🏙️🕺", difficulty: "easy" },
            { answer: "Bad Romance", hint: "Lady Gaga", emojis: "👎❤️📖", difficulty: "easy" },
            { answer: "Firework", hint: "Katy Perry", emojis: "🎆🎇💥", difficulty: "easy" },
            { answer: "Royals", hint: "Lorde", emojis: "👑👸🤴", difficulty: "easy" },
            { answer: "Thinking Out Loud", hint: "Ed Sheeran", emojis: "🤔💭🔊", difficulty: "easy" },
            { answer: "Wrecking Ball", hint: "Miley Cyrus", emojis: "🏗️⚫💥", difficulty: "easy" },
            { answer: "Blank Space", hint: "Taylor Swift", emojis: "📝⬜", difficulty: "easy" },
            { answer: "Let It Go", hint: "Frozen", emojis: "🫳❄️👸", difficulty: "easy" },
            { answer: "Diamonds", hint: "Rihanna", emojis: "💎💎💎", difficulty: "easy" },
            { answer: "Chandelier", hint: "Sia", emojis: "💡🕯️✨", difficulty: "medium" },
            { answer: "Sugar", hint: "Maroon 5", emojis: "🍬🍭🧁", difficulty: "easy" },
            { answer: "Dark Horse", hint: "Katy Perry", emojis: "🌑🐴", difficulty: "easy" },
            { answer: "Wake Me Up", hint: "Avicii", emojis: "⏰😴⬆️", difficulty: "easy" },
            { answer: "Radioactive", hint: "Imagine Dragons", emojis: "📻☢️", difficulty: "easy" },
            { answer: "Counting Stars", hint: "OneRepublic", emojis: "🔢⭐⭐⭐", difficulty: "easy" },
            { answer: "Despacito", hint: "Luis Fonsi", emojis: "🐌💃🇵🇷", difficulty: "easy" }
        ]
    },

    'songs-2020s': {
        name: "2020s Hits",
        emoji: "🎧",
        category: "songs",
        items: [
            { answer: "Blinding Lights", hint: "The Weeknd", emojis: "😵💡💡", difficulty: "easy" },
            { answer: "Watermelon Sugar", hint: "Harry Styles", emojis: "🍉🍬", difficulty: "easy" },
            { answer: "drivers license", hint: "Olivia Rodrigo", emojis: "🚗📄", difficulty: "easy" },
            { answer: "Levitating", hint: "Dua Lipa", emojis: "🧘⬆️🌙", difficulty: "medium" },
            { answer: "Save Your Tears", hint: "The Weeknd", emojis: "💾😢", difficulty: "easy" },
            { answer: "Good 4 U", hint: "Olivia Rodrigo", emojis: "👍4️⃣🫵", difficulty: "easy" },
            { answer: "Stay", hint: "The Kid LAROI & Justin Bieber", emojis: "🏠🚫🚶", difficulty: "easy" },
            { answer: "Kiss Me More", hint: "Doja Cat", emojis: "💋👤➕", difficulty: "easy" },
            { answer: "Peaches", hint: "Justin Bieber", emojis: "🍑🍑🍑", difficulty: "easy" },
            { answer: "Easy On Me", hint: "Adele", emojis: "😌👤", difficulty: "medium" },
            { answer: "Heat Waves", hint: "Glass Animals", emojis: "🔥🌊", difficulty: "easy" },
            { answer: "Bad Habits", hint: "Ed Sheeran", emojis: "👎🔄😬", difficulty: "easy" },
            { answer: "As It Was", hint: "Harry Styles", emojis: "🔙⏰", difficulty: "medium" },
            { answer: "Anti-Hero", hint: "Taylor Swift", emojis: "🚫🦸", difficulty: "easy" },
            { answer: "Flowers", hint: "Miley Cyrus", emojis: "🌸🌺🌻💐", difficulty: "easy" },
            { answer: "About Damn Time", hint: "Lizzo", emojis: "ℹ️🤬⏰", difficulty: "medium" },
            { answer: "Running Up That Hill", hint: "Kate Bush", emojis: "🏃⬆️⛰️", difficulty: "easy" },
            { answer: "Cruel Summer", hint: "Taylor Swift", emojis: "😈☀️🏖️", difficulty: "easy" },
            { answer: "Vampire", hint: "Olivia Rodrigo", emojis: "🧛🩸🌙", difficulty: "easy" },
            { answer: "Dance The Night", hint: "Dua Lipa", emojis: "💃🌙✨", difficulty: "easy" }
        ]
    },

    'songs-classics': {
        name: "Classic Rock",
        emoji: "🎸",
        category: "songs",
        items: [
            { answer: "Bohemian Rhapsody", hint: "Queen", emojis: "👨🎭🎹", difficulty: "medium" },
            { answer: "Stairway to Heaven", hint: "Led Zeppelin", emojis: "🪜➡️😇", difficulty: "easy" },
            { answer: "Imagine", hint: "John Lennon", emojis: "💭🌍☮️", difficulty: "medium" },
            { answer: "Hotel California", hint: "Eagles", emojis: "🏨☀️🌴", difficulty: "easy" },
            { answer: "Let It Be", hint: "The Beatles", emojis: "🫳🐝", difficulty: "medium" },
            { answer: "Hey Jude", hint: "The Beatles", emojis: "👋🧑", difficulty: "easy" },
            { answer: "Thriller", hint: "Michael Jackson", emojis: "😱🧟👻", difficulty: "easy" },
            { answer: "Like a Rolling Stone", hint: "Bob Dylan", emojis: "❤️🪨🎸", difficulty: "medium" },
            { answer: "Dancing Queen", hint: "ABBA", emojis: "💃👸", difficulty: "easy" },
            { answer: "Piano Man", hint: "Billy Joel", emojis: "🎹👨", difficulty: "easy" },
            { answer: "We Will Rock You", hint: "Queen", emojis: "👤🪨🫵", difficulty: "easy" },
            { answer: "Another One Bites the Dust", hint: "Queen", emojis: "1️⃣👄🌫️", difficulty: "medium" },
            { answer: "Respect", hint: "Aretha Franklin", emojis: "🫡✊", difficulty: "medium" },
            { answer: "Born to Run", hint: "Bruce Springsteen", emojis: "👶➡️🏃", difficulty: "easy" },
            { answer: "American Pie", hint: "Don McLean", emojis: "🇺🇸🥧", difficulty: "easy" },
            { answer: "Rocket Man", hint: "Elton John", emojis: "🚀👨", difficulty: "easy" },
            { answer: "Space Oddity", hint: "David Bowie", emojis: "🌌🤔", difficulty: "medium" },
            { answer: "Yesterday", hint: "The Beatles", emojis: "📅⬅️😢", difficulty: "easy" },
            { answer: "Free Fallin'", hint: "Tom Petty", emojis: "🆓⬇️", difficulty: "easy" },
            { answer: "Don't Stop Me Now", hint: "Queen", emojis: "🚫🛑👤🏃", difficulty: "medium" }
        ]
    },

    // ============================================
    // COMMON SAYINGS & PHRASES
    // ============================================
    'sayings': {
        name: "Common Sayings",
        emoji: "💬",
        category: "phrases",
        items: [
            { answer: "Break a leg", hint: "Good luck!", emojis: "💔🦵", difficulty: "easy" },
            { answer: "Piece of cake", hint: "Very easy", emojis: "🍰✂️", difficulty: "easy" },
            { answer: "When pigs fly", hint: "Never gonna happen", emojis: "🐷✈️", difficulty: "easy" },
            { answer: "Raining cats and dogs", hint: "Heavy rain", emojis: "🌧️🐱🐕", difficulty: "easy" },
            { answer: "Break the ice", hint: "Start conversation", emojis: "💔🧊", difficulty: "easy" },
            { answer: "Hit the nail on the head", hint: "Exactly right", emojis: "👊🔨💅", difficulty: "medium" },
            { answer: "Spill the beans", hint: "Reveal a secret", emojis: "🫗🫘", difficulty: "easy" },
            { answer: "Cost an arm and a leg", hint: "Very expensive", emojis: "💰💪🦵", difficulty: "medium" },
            { answer: "Under the weather", hint: "Feeling sick", emojis: "⬇️🌧️😷", difficulty: "easy" },
            { answer: "Bite the bullet", hint: "Face difficulty", emojis: "🦷🔫", difficulty: "medium" },
            { answer: "Hit the hay", hint: "Go to sleep", emojis: "👊🌾😴", difficulty: "easy" },
            { answer: "Cold turkey", hint: "Quit suddenly", emojis: "🥶🦃", difficulty: "medium" },
            { answer: "Elephant in the room", hint: "Obvious problem ignored", emojis: "🐘🏠", difficulty: "easy" },
            { answer: "Kill two birds with one stone", hint: "Accomplish two things at once", emojis: "🔪🐦🐦🪨", difficulty: "medium" },
            { answer: "Let the cat out of the bag", hint: "Reveal a secret", emojis: "🐱👜➡️", difficulty: "medium" },
            { answer: "Once in a blue moon", hint: "Very rarely", emojis: "1️⃣🔵🌙", difficulty: "easy" },
            { answer: "The ball is in your court", hint: "Your turn to decide", emojis: "🏀🫵🎾", difficulty: "medium" },
            { answer: "Time flies", hint: "Time passes quickly", emojis: "⏰🪰✈️", difficulty: "easy" },
            { answer: "Walking on eggshells", hint: "Being very careful", emojis: "🚶🥚🥚", difficulty: "medium" },
            { answer: "A penny for your thoughts", hint: "What are you thinking?", emojis: "🪙💭❓", difficulty: "medium" }
        ]
    },

    'idioms': {
        name: "More Idioms",
        emoji: "🗣️",
        category: "phrases",
        items: [
            { answer: "Apple of my eye", hint: "Favorite person", emojis: "🍎👁️❤️", difficulty: "easy" },
            { answer: "Barking up the wrong tree", hint: "Wrong approach", emojis: "🐕🌲❌", difficulty: "medium" },
            { answer: "Beat around the bush", hint: "Avoid the topic", emojis: "👊🔄🌳", difficulty: "medium" },
            { answer: "Burning the midnight oil", hint: "Working late", emojis: "🔥🌙🛢️", difficulty: "medium" },
            { answer: "Cry over spilled milk", hint: "Regret past mistakes", emojis: "😢🥛💧", difficulty: "easy" },
            { answer: "Every cloud has a silver lining", hint: "Good in bad situations", emojis: "☁️🥈✨", difficulty: "medium" },
            { answer: "Fish out of water", hint: "Uncomfortable situation", emojis: "🐟👆💧", difficulty: "easy" },
            { answer: "Get out of hand", hint: "Lose control", emojis: "🚪✋❌", difficulty: "medium" },
            { answer: "Heart of gold", hint: "Very kind person", emojis: "❤️🥇", difficulty: "easy" },
            { answer: "In hot water", hint: "In trouble", emojis: "🔥💧😰", difficulty: "easy" },
            { answer: "Jump on the bandwagon", hint: "Follow trends", emojis: "🦘🎺🚐", difficulty: "hard" },
            { answer: "Keep your chin up", hint: "Stay positive", emojis: "👆😃⬆️", difficulty: "easy" },
            { answer: "Last straw", hint: "Final problem", emojis: "🔚🥤", difficulty: "medium" },
            { answer: "Money doesn't grow on trees", hint: "Money is hard to earn", emojis: "💰🚫🌳", difficulty: "easy" },
            { answer: "Out of the blue", hint: "Unexpectedly", emojis: "👆🔵❓", difficulty: "medium" },
            { answer: "Put all eggs in one basket", hint: "Risk everything", emojis: "🥚🥚🥚🧺", difficulty: "medium" },
            { answer: "Read between the lines", hint: "Find hidden meaning", emojis: "📖↔️📏", difficulty: "medium" },
            { answer: "Throw in the towel", hint: "Give up", emojis: "🤾🧻", difficulty: "easy" },
            { answer: "Under your nose", hint: "Right in front of you", emojis: "⬇️👃", difficulty: "easy" },
            { answer: "Wild goose chase", hint: "Pointless search", emojis: "🦆🏃❓", difficulty: "medium" }
        ]
    },

    // ============================================
    // CELEBRITIES
    // ============================================
    'celebrities': {
        name: "Famous People",
        emoji: "⭐",
        category: "people",
        items: [
            { answer: "Taylor Swift", hint: "Singer", emojis: "👩‍🎤🐍🎸13", difficulty: "easy" },
            { answer: "Dwayne Johnson", hint: "Actor/Wrestler", emojis: "🪨💪🎬", difficulty: "easy" },
            { answer: "Beyoncé", hint: "Singer", emojis: "🐝👑🎤", difficulty: "easy" },
            { answer: "Tom Hanks", hint: "Actor", emojis: "🧸🏐🚀", difficulty: "medium" },
            { answer: "Oprah Winfrey", hint: "TV Host", emojis: "📺👑🎁", difficulty: "easy" },
            { answer: "LeBron James", hint: "Basketball", emojis: "🏀👑🦁", difficulty: "easy" },
            { answer: "Adele", hint: "Singer", emojis: "👋🎤🇬🇧", difficulty: "easy" },
            { answer: "Will Smith", hint: "Actor", emojis: "👋✋🤴", difficulty: "medium" },
            { answer: "Lady Gaga", hint: "Singer", emojis: "👗🥩🎹", difficulty: "easy" },
            { answer: "Michael Jordan", hint: "Basketball", emojis: "🏀✈️23", difficulty: "easy" },
            { answer: "Ellen DeGeneres", hint: "TV Host", emojis: "💃📺😄", difficulty: "medium" },
            { answer: "Drake", hint: "Rapper", emojis: "🦢🇨🇦🎤", difficulty: "medium" },
            { answer: "Jennifer Lopez", hint: "Singer/Actress", emojis: "💃🇵🇷🍑", difficulty: "easy" },
            { answer: "Elon Musk", hint: "Entrepreneur", emojis: "🚗⚡🚀", difficulty: "easy" },
            { answer: "Rihanna", hint: "Singer", emojis: "☔💎🇧🇧", difficulty: "easy" },
            { answer: "Tom Brady", hint: "Football", emojis: "🏈🐐🏆", difficulty: "easy" },
            { answer: "Ariana Grande", hint: "Singer", emojis: "🐰👂☁️", difficulty: "easy" },
            { answer: "Morgan Freeman", hint: "Actor", emojis: "🎬🗣️😇", difficulty: "medium" },
            { answer: "Billie Eilish", hint: "Singer", emojis: "💚😴🕷️", difficulty: "easy" },
            { answer: "Serena Williams", hint: "Tennis", emojis: "🎾👑💪", difficulty: "easy" }
        ]
    },

    'legends': {
        name: "Legends",
        emoji: "🏆",
        category: "people",
        items: [
            { answer: "Michael Jackson", hint: "King of Pop", emojis: "👑🎤🧤🌙", difficulty: "easy" },
            { answer: "Elvis Presley", hint: "King of Rock", emojis: "👑🎸🕺", difficulty: "easy" },
            { answer: "Marilyn Monroe", hint: "Actress", emojis: "💋💨👗", difficulty: "easy" },
            { answer: "Muhammad Ali", hint: "Boxer", emojis: "🥊🦋🐝", difficulty: "medium" },
            { answer: "Albert Einstein", hint: "Scientist", emojis: "🧠⚛️📐", difficulty: "easy" },
            { answer: "Walt Disney", hint: "Animator", emojis: "🏰🐭✨", difficulty: "easy" },
            { answer: "Princess Diana", hint: "Royal", emojis: "👸🇬🇧❤️", difficulty: "easy" },
            { answer: "Bruce Lee", hint: "Martial Artist", emojis: "🥋🐉👊", difficulty: "easy" },
            { answer: "Audrey Hepburn", hint: "Actress", emojis: "👗☕💎", difficulty: "medium" },
            { answer: "John Lennon", hint: "Musician", emojis: "☮️🎹👓", difficulty: "easy" },
            { answer: "Madonna", hint: "Singer", emojis: "👑👧💃", difficulty: "easy" },
            { answer: "Robin Williams", hint: "Comedian/Actor", emojis: "🧞‍♂️😂🌈", difficulty: "easy" },
            { answer: "Bob Marley", hint: "Musician", emojis: "🇯🇲🎸☮️", difficulty: "easy" },
            { answer: "Freddie Mercury", hint: "Singer", emojis: "👑🎤🦷", difficulty: "easy" },
            { answer: "Martin Luther King Jr.", hint: "Civil Rights Leader", emojis: "✊💭🕊️", difficulty: "easy" },
            { answer: "Steve Jobs", hint: "Apple Founder", emojis: "🍎📱💡", difficulty: "easy" },
            { answer: "Kobe Bryant", hint: "Basketball", emojis: "🏀🐍💜24", difficulty: "easy" },
            { answer: "Prince", hint: "Musician", emojis: "💜🎸☔", difficulty: "easy" },
            { answer: "Whitney Houston", hint: "Singer", emojis: "🎤💕🇺🇸", difficulty: "easy" },
            { answer: "David Bowie", hint: "Musician", emojis: "⚡👨‍🎤🌟", difficulty: "medium" }
        ]
    },

    // ============================================
    // MOVIES
    // ============================================
    'movies': {
        name: "Movies",
        emoji: "🎬",
        category: "entertainment",
        items: [
            { answer: "Titanic", hint: "1997 Film", emojis: "🚢🧊❤️💔", difficulty: "easy" },
            { answer: "The Lion King", hint: "Disney", emojis: "🦁👑🌅", difficulty: "easy" },
            { answer: "Frozen", hint: "Disney", emojis: "❄️👸⛄", difficulty: "easy" },
            { answer: "Jurassic Park", hint: "Dinosaurs", emojis: "🦖🏞️🧬", difficulty: "easy" },
            { answer: "Finding Nemo", hint: "Pixar", emojis: "🔍🐠🌊", difficulty: "easy" },
            { answer: "The Wizard of Oz", hint: "Classic", emojis: "🧙‍♂️🌈🐕", difficulty: "easy" },
            { answer: "Star Wars", hint: "Sci-Fi", emojis: "⭐⚔️🌌", difficulty: "easy" },
            { answer: "Harry Potter", hint: "Fantasy", emojis: "⚡🧙‍♂️🦉", difficulty: "easy" },
            { answer: "Jaws", hint: "Thriller", emojis: "🦈🏊😱", difficulty: "easy" },
            { answer: "E.T.", hint: "Spielberg", emojis: "👽🚲🌙", difficulty: "easy" },
            { answer: "The Little Mermaid", hint: "Disney", emojis: "🧜‍♀️🐚🏰", difficulty: "easy" },
            { answer: "Beauty and the Beast", hint: "Disney", emojis: "🌹🦁👸", difficulty: "easy" },
            { answer: "Toy Story", hint: "Pixar", emojis: "🤠👨‍🚀🧸", difficulty: "easy" },
            { answer: "The Avengers", hint: "Marvel", emojis: "🦸‍♂️🦸‍♀️💥", difficulty: "easy" },
            { answer: "Spider-Man", hint: "Marvel", emojis: "🕷️🕸️🦸", difficulty: "easy" },
            { answer: "Shrek", hint: "DreamWorks", emojis: "👹🧅🏰", difficulty: "easy" },
            { answer: "The Godfather", hint: "Crime Drama", emojis: "🐴🛏️🇮🇹", difficulty: "medium" },
            { answer: "Forrest Gump", hint: "Tom Hanks", emojis: "🏃🍫🦐", difficulty: "easy" },
            { answer: "The Hunger Games", hint: "Dystopia", emojis: "🏹🔥🎪", difficulty: "easy" },
            { answer: "Avatar", hint: "James Cameron", emojis: "🔵👤🌳", difficulty: "easy" }
        ]
    },

    'movies2': {
        name: "More Movies",
        emoji: "🎥",
        category: "entertainment",
        items: [
            { answer: "Home Alone", hint: "Christmas", emojis: "🏠👦😱", difficulty: "easy" },
            { answer: "Ghostbusters", hint: "Comedy", emojis: "👻🚫🔫", difficulty: "easy" },
            { answer: "Back to the Future", hint: "Time Travel", emojis: "🔙⏰🚗", difficulty: "easy" },
            { answer: "The Matrix", hint: "Sci-Fi", emojis: "💊🕶️🥋", difficulty: "medium" },
            { answer: "Pirates of the Caribbean", hint: "Disney", emojis: "🏴‍☠️⚓🦜", difficulty: "easy" },
            { answer: "Mean Girls", hint: "Comedy", emojis: "👩‍👩‍👧💅🗓️", difficulty: "easy" },
            { answer: "Grease", hint: "Musical", emojis: "🛢️💃🚗", difficulty: "medium" },
            { answer: "The Notebook", hint: "Romance", emojis: "📓💕🦢", difficulty: "easy" },
            { answer: "Clueless", hint: "90s Comedy", emojis: "🤷‍♀️👛📱", difficulty: "medium" },
            { answer: "Up", hint: "Pixar", emojis: "🎈🏠👴", difficulty: "easy" },
            { answer: "Inside Out", hint: "Pixar", emojis: "😊😢😡🧠", difficulty: "easy" },
            { answer: "Moana", hint: "Disney", emojis: "🌊🐚🏝️", difficulty: "easy" },
            { answer: "Coco", hint: "Pixar", emojis: "🎸💀🌼", difficulty: "easy" },
            { answer: "Encanto", hint: "Disney", emojis: "🦋🏠🇨🇴", difficulty: "easy" },
            { answer: "The Incredibles", hint: "Pixar", emojis: "🦸‍♂️👨‍👩‍👧‍👦💪", difficulty: "easy" },
            { answer: "Ratatouille", hint: "Pixar", emojis: "🐀👨‍🍳🇫🇷", difficulty: "easy" },
            { answer: "Black Panther", hint: "Marvel", emojis: "🐆👑✊🏿", difficulty: "easy" },
            { answer: "Wonder Woman", hint: "DC", emojis: "👸⚔️🛡️", difficulty: "easy" },
            { answer: "The Breakfast Club", hint: "80s", emojis: "🥐👨‍🎓📚", difficulty: "medium" },
            { answer: "Dirty Dancing", hint: "80s", emojis: "💃🍉🏕️", difficulty: "medium" }
        ]
    },

    // ============================================
    // TV SHOWS
    // ============================================
    'tvshows': {
        name: "TV Shows",
        emoji: "📺",
        category: "entertainment",
        items: [
            { answer: "Friends", hint: "Sitcom", emojis: "☕🛋️👫", difficulty: "easy" },
            { answer: "Stranger Things", hint: "Netflix", emojis: "🙃🔦👾", difficulty: "easy" },
            { answer: "The Office", hint: "Sitcom", emojis: "📎🏢😐", difficulty: "easy" },
            { answer: "Game of Thrones", hint: "HBO", emojis: "🐉👑⚔️", difficulty: "easy" },
            { answer: "Breaking Bad", hint: "Drama", emojis: "🧪💎🏜️", difficulty: "easy" },
            { answer: "SpongeBob SquarePants", hint: "Cartoon", emojis: "🧽🍍🌊", difficulty: "easy" },
            { answer: "The Simpsons", hint: "Cartoon", emojis: "👨‍👩‍👧‍👦💛🍩", difficulty: "easy" },
            { answer: "Squid Game", hint: "Korean Drama", emojis: "🦑🔴🟢💰", difficulty: "easy" },
            { answer: "Grey's Anatomy", hint: "Medical Drama", emojis: "🏥💉❤️", difficulty: "easy" },
            { answer: "The Crown", hint: "Netflix", emojis: "👑🇬🇧👸", difficulty: "easy" },
            { answer: "Wednesday", hint: "Netflix", emojis: "🖤👧✋", difficulty: "easy" },
            { answer: "Ted Lasso", hint: "Apple TV+", emojis: "⚽🇺🇸🍪", difficulty: "medium" },
            { answer: "Bridgerton", hint: "Netflix", emojis: "💐👗🐝", difficulty: "medium" },
            { answer: "The Mandalorian", hint: "Disney+", emojis: "🪖👶💚", difficulty: "easy" },
            { answer: "Schitt's Creek", hint: "Comedy", emojis: "🌹🏨👨‍👩‍👧‍👦", difficulty: "medium" },
            { answer: "The Walking Dead", hint: "Horror", emojis: "🧟🚶💀", difficulty: "easy" },
            { answer: "How I Met Your Mother", hint: "Sitcom", emojis: "👩❓👦📖", difficulty: "medium" },
            { answer: "Brooklyn Nine-Nine", hint: "Comedy", emojis: "🚔9️⃣9️⃣", difficulty: "easy" },
            { answer: "Avatar: The Last Airbender", hint: "Animated", emojis: "🌊🔥🌬️🪨", difficulty: "easy" },
            { answer: "Yellowstone", hint: "Drama", emojis: "🤠🏔️🐎", difficulty: "medium" }
        ]
    },

    // ============================================
    // FOOD & DRINK
    // ============================================
    'food': {
        name: "Food & Drink",
        emoji: "🍔",
        category: "things",
        items: [
            { answer: "Peanut Butter and Jelly", hint: "Sandwich", emojis: "🥜🧈🍇", difficulty: "easy" },
            { answer: "Chocolate Chip Cookies", hint: "Dessert", emojis: "🍫🔘🍪", difficulty: "easy" },
            { answer: "Ice Cream Sundae", hint: "Dessert", emojis: "🍨☀️🍒", difficulty: "easy" },
            { answer: "Hot Dog", hint: "Fast Food", emojis: "🔥🐕", difficulty: "easy" },
            { answer: "French Fries", hint: "Side Dish", emojis: "🇫🇷🍟", difficulty: "easy" },
            { answer: "Apple Pie", hint: "Dessert", emojis: "🍎🥧", difficulty: "easy" },
            { answer: "Macaroni and Cheese", hint: "Comfort Food", emojis: "🍝🧀", difficulty: "easy" },
            { answer: "Grilled Cheese", hint: "Sandwich", emojis: "🔥🧀🥪", difficulty: "easy" },
            { answer: "Banana Split", hint: "Dessert", emojis: "🍌✂️🍨", difficulty: "easy" },
            { answer: "Root Beer Float", hint: "Drink", emojis: "🌳🍺🎈", difficulty: "medium" },
            { answer: "Fried Chicken", hint: "Fast Food", emojis: "🛢️🐔", difficulty: "easy" },
            { answer: "Birthday Cake", hint: "Celebration", emojis: "🎂🎁🎉", difficulty: "easy" },
            { answer: "Candy Corn", hint: "Halloween", emojis: "🍬🌽", difficulty: "easy" },
            { answer: "Cotton Candy", hint: "Fair Food", emojis: "🧵🍬☁️", difficulty: "easy" },
            { answer: "Scrambled Eggs", hint: "Breakfast", emojis: "🔀🥚🍳", difficulty: "easy" },
            { answer: "Fish and Chips", hint: "British Food", emojis: "🐟🍟🇬🇧", difficulty: "easy" },
            { answer: "Spaghetti and Meatballs", hint: "Italian", emojis: "🍝⚫🇮🇹", difficulty: "easy" },
            { answer: "Strawberry Shortcake", hint: "Dessert", emojis: "🍓👧🍰", difficulty: "medium" },
            { answer: "Buffalo Wings", hint: "Appetizer", emojis: "🦬🐔🔥", difficulty: "medium" },
            { answer: "Chicken Nuggets", hint: "Fast Food", emojis: "🐔🔶", difficulty: "easy" }
        ]
    },

    // ============================================
    // BRANDS & COMPANIES
    // ============================================
    'brands': {
        name: "Famous Brands",
        emoji: "🏪",
        category: "things",
        items: [
            { answer: "Apple", hint: "Tech Company", emojis: "🍎📱💻", difficulty: "easy" },
            { answer: "Amazon", hint: "Online Shopping", emojis: "📦🌳🏹", difficulty: "easy" },
            { answer: "Netflix", hint: "Streaming", emojis: "📺🔴▶️", difficulty: "easy" },
            { answer: "Nike", hint: "Sportswear", emojis: "✔️👟🏃", difficulty: "easy" },
            { answer: "McDonald's", hint: "Fast Food", emojis: "Ⓜ️🍟🍔", difficulty: "easy" },
            { answer: "Starbucks", hint: "Coffee", emojis: "☕⭐🧜‍♀️", difficulty: "easy" },
            { answer: "Disney", hint: "Entertainment", emojis: "🏰🐭✨", difficulty: "easy" },
            { answer: "Google", hint: "Tech", emojis: "🔍🌐🅾️", difficulty: "easy" },
            { answer: "Coca-Cola", hint: "Beverage", emojis: "🥤🔴🫧", difficulty: "easy" },
            { answer: "Tesla", hint: "Electric Cars", emojis: "⚡🚗🔋", difficulty: "easy" },
            { answer: "Instagram", hint: "Social Media", emojis: "📸🟪🔲", difficulty: "easy" },
            { answer: "YouTube", hint: "Video Platform", emojis: "▶️📹🔴", difficulty: "easy" },
            { answer: "Spotify", hint: "Music Streaming", emojis: "🎵🟢📱", difficulty: "easy" },
            { answer: "Target", hint: "Retail Store", emojis: "🎯🔴⚪", difficulty: "easy" },
            { answer: "Lego", hint: "Toys", emojis: "🧱🟨🏗️", difficulty: "easy" },
            { answer: "Uber", hint: "Rideshare", emojis: "🚗📱🗺️", difficulty: "easy" },
            { answer: "TikTok", hint: "Social Media", emojis: "⏰🎵🕺", difficulty: "easy" },
            { answer: "Snapchat", hint: "Social Media", emojis: "👻📱💛", difficulty: "easy" },
            { answer: "Pepsi", hint: "Beverage", emojis: "🥤🔵🔴", difficulty: "easy" },
            { answer: "Nintendo", hint: "Gaming", emojis: "🎮🍄🔴", difficulty: "easy" }
        ]
    },

    // ============================================
    // SPORTS
    // ============================================
    'sports': {
        name: "Sports",
        emoji: "🏅",
        category: "things",
        items: [
            { answer: "Slam Dunk", hint: "Basketball Move", emojis: "🏀💥🏀", difficulty: "easy" },
            { answer: "Home Run", hint: "Baseball", emojis: "🏠🏃⚾", difficulty: "easy" },
            { answer: "Touchdown", hint: "Football", emojis: "🏈⬇️🙌", difficulty: "easy" },
            { answer: "Hole in One", hint: "Golf", emojis: "🕳️1️⃣⛳", difficulty: "easy" },
            { answer: "Super Bowl", hint: "Championship", emojis: "🦸🥣🏈", difficulty: "easy" },
            { answer: "World Series", hint: "Baseball", emojis: "🌍📺⚾", difficulty: "easy" },
            { answer: "March Madness", hint: "Basketball", emojis: "3️⃣🤪🏀", difficulty: "medium" },
            { answer: "Hat Trick", hint: "3 Goals", emojis: "🎩🪄3️⃣", difficulty: "medium" },
            { answer: "Grand Slam", hint: "Tennis/Baseball", emojis: "👑💥🏟️", difficulty: "medium" },
            { answer: "Buzzer Beater", hint: "Last Second Shot", emojis: "🐝👊⏰", difficulty: "medium" },
            { answer: "Triple Crown", hint: "Horse Racing", emojis: "3️⃣👑🏇", difficulty: "medium" },
            { answer: "Hail Mary", hint: "Football Play", emojis: "🙋‍♀️👩🏈", difficulty: "medium" },
            { answer: "MVP", hint: "Award", emojis: "🏆⭐🥇", difficulty: "easy" },
            { answer: "Field Goal", hint: "Football/Soccer", emojis: "🏟️⚽🥅", difficulty: "easy" },
            { answer: "Free Throw", hint: "Basketball", emojis: "🆓🤾🏀", difficulty: "easy" },
            { answer: "Penalty Kick", hint: "Soccer", emojis: "🚔👟⚽", difficulty: "easy" },
            { answer: "Foul Ball", hint: "Baseball", emojis: "🐔⚾", difficulty: "medium" },
            { answer: "Overtime", hint: "Extra Time", emojis: "⏰➕🏃", difficulty: "easy" },
            { answer: "Knockout", hint: "Boxing", emojis: "👊😵💫", difficulty: "easy" },
            { answer: "Photo Finish", hint: "Close Race", emojis: "📸🏁🏃", difficulty: "medium" }
        ]
    }
};

// Export for use in game
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PACKS;
}
