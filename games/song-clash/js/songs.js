/**
 * Song Clash - Song Database
 * Each song has emoji clues representing the title
 * Difficulty: easy (literal), medium (somewhat abstract), hard (requires knowledge)
 */

const SONGS = {
    decades: {
        '80s': {
            name: "80s",
            emoji: "📼",
            songs: [
                { title: "Beat It", artist: "Michael Jackson", emojis: "👊🏃", difficulty: "easy" },
                { title: "Purple Rain", artist: "Prince", emojis: "☔💜", difficulty: "easy" },
                { title: "Sweet Child O' Mine", artist: "Guns N' Roses", emojis: "🍬👶⛏️", difficulty: "medium" },
                { title: "Like a Virgin", artist: "Madonna", emojis: "❤️👰", difficulty: "medium" },
                { title: "Take On Me", artist: "a-ha", emojis: "✋👤", difficulty: "medium" },
                { title: "Every Breath You Take", artist: "The Police", emojis: "😤🫵✋", difficulty: "easy" },
                { title: "Billie Jean", artist: "Michael Jackson", emojis: "👩👖", difficulty: "medium" },
                { title: "Jump", artist: "Van Halen", emojis: "🦘⬆️", difficulty: "easy" },
                { title: "Girls Just Want to Have Fun", artist: "Cyndi Lauper", emojis: "👩👩👩🎉", difficulty: "easy" },
                { title: "Wake Me Up Before You Go-Go", artist: "Wham!", emojis: "⏰😴👋", difficulty: "medium" },
                { title: "Don't Stop Believin'", artist: "Journey", emojis: "🚫🛑🙏", difficulty: "medium" },
                { title: "Livin' on a Prayer", artist: "Bon Jovi", emojis: "🏠🙏", difficulty: "medium" },
                { title: "Material Girl", artist: "Madonna", emojis: "💎👧💰", difficulty: "easy" },
                { title: "Eye of the Tiger", artist: "Survivor", emojis: "👁️🐯", difficulty: "easy" },
                { title: "Sweet Dreams", artist: "Eurythmics", emojis: "🍬💭😴", difficulty: "easy" },
                { title: "I Love Rock 'n' Roll", artist: "Joan Jett", emojis: "❤️🎸🎶", difficulty: "easy" },
                { title: "Walk Like an Egyptian", artist: "The Bangles", emojis: "🚶🇪🇬", difficulty: "easy" },
                { title: "Time After Time", artist: "Cyndi Lauper", emojis: "⏰➡️⏰", difficulty: "medium" },
                { title: "Under Pressure", artist: "Queen & David Bowie", emojis: "⬇️😰💨", difficulty: "medium" },
                { title: "Hungry Like the Wolf", artist: "Duran Duran", emojis: "😋🐺", difficulty: "easy" }
            ]
        },
        '90s': {
            name: "90s",
            emoji: "💿",
            songs: [
                { title: "Smells Like Teen Spirit", artist: "Nirvana", emojis: "👃👦👻", difficulty: "hard" },
                { title: "Wannabe", artist: "Spice Girls", emojis: "🌶️👯‍♀️🙋‍♀️", difficulty: "medium" },
                { title: "...Baby One More Time", artist: "Britney Spears", emojis: "👶1️⃣➕⏰", difficulty: "medium" },
                { title: "I Will Always Love You", artist: "Whitney Houston", emojis: "👤❤️🫵♾️", difficulty: "easy" },
                { title: "Ice Ice Baby", artist: "Vanilla Ice", emojis: "🧊🧊👶", difficulty: "easy" },
                { title: "Black or White", artist: "Michael Jackson", emojis: "⬛⬜", difficulty: "easy" },
                { title: "Tears in Heaven", artist: "Eric Clapton", emojis: "😢☁️😇", difficulty: "easy" },
                { title: "Killing Me Softly", artist: "Fugees", emojis: "🔪🫠🎵", difficulty: "medium" },
                { title: "Waterfalls", artist: "TLC", emojis: "💧⬇️🏞️", difficulty: "easy" },
                { title: "Under the Bridge", artist: "Red Hot Chili Peppers", emojis: "⬇️🌉", difficulty: "easy" },
                { title: "Wonderwall", artist: "Oasis", emojis: "🤔🧱", difficulty: "medium" },
                { title: "Losing My Religion", artist: "R.E.M.", emojis: "📉⛪🙏", difficulty: "medium" },
                { title: "Basket Case", artist: "Green Day", emojis: "🧺💼", difficulty: "hard" },
                { title: "No Diggity", artist: "Blackstreet", emojis: "🚫⛏️", difficulty: "hard" },
                { title: "Creep", artist: "Radiohead", emojis: "🥷😬", difficulty: "medium" },
                { title: "Kiss from a Rose", artist: "Seal", emojis: "💋🌹", difficulty: "easy" },
                { title: "Gangsta's Paradise", artist: "Coolio", emojis: "🔫😎🏝️", difficulty: "easy" },
                { title: "MMMBop", artist: "Hanson", emojis: "Ⓜ️Ⓜ️Ⓜ️💥", difficulty: "medium" },
                { title: "Believe", artist: "Cher", emojis: "🙏✨💫", difficulty: "medium" },
                { title: "My Heart Will Go On", artist: "Celine Dion", emojis: "❤️🚢➡️", difficulty: "medium" }
            ]
        },
        '2000s': {
            name: "2000s",
            emoji: "📱",
            songs: [
                { title: "Crazy in Love", artist: "Beyoncé", emojis: "🤪❤️", difficulty: "easy" },
                { title: "Hot in Herre", artist: "Nelly", emojis: "🔥👇", difficulty: "easy" },
                { title: "In Da Club", artist: "50 Cent", emojis: "👉🪩", difficulty: "easy" },
                { title: "Gold Digger", artist: "Kanye West", emojis: "🥇⛏️", difficulty: "easy" },
                { title: "Toxic", artist: "Britney Spears", emojis: "☠️💚", difficulty: "medium" },
                { title: "Hey Ya!", artist: "OutKast", emojis: "👋🫵❗", difficulty: "easy" },
                { title: "Since U Been Gone", artist: "Kelly Clarkson", emojis: "⏰🫵👋", difficulty: "medium" },
                { title: "Umbrella", artist: "Rihanna", emojis: "☂️☔", difficulty: "easy" },
                { title: "Single Ladies", artist: "Beyoncé", emojis: "1️⃣👩💍", difficulty: "easy" },
                { title: "Poker Face", artist: "Lady Gaga", emojis: "🃏😐", difficulty: "easy" },
                { title: "I Gotta Feeling", artist: "Black Eyed Peas", emojis: "👤💭🎉", difficulty: "medium" },
                { title: "Beautiful Day", artist: "U2", emojis: "😍☀️📅", difficulty: "easy" },
                { title: "Hips Don't Lie", artist: "Shakira", emojis: "🫰🚫🤥", difficulty: "medium" },
                { title: "Mr. Brightside", artist: "The Killers", emojis: "👨☀️😊", difficulty: "medium" },
                { title: "Clocks", artist: "Coldplay", emojis: "⏰🕐🕑", difficulty: "easy" },
                { title: "Crazy", artist: "Gnarls Barkley", emojis: "🤪😜🌀", difficulty: "medium" },
                { title: "American Idiot", artist: "Green Day", emojis: "🇺🇸🤡", difficulty: "easy" },
                { title: "Bring Me to Life", artist: "Evanescence", emojis: "🫴👤➡️❤️", difficulty: "medium" },
                { title: "The Way You Move", artist: "OutKast", emojis: "🫵💃🕺", difficulty: "easy" },
                { title: "Drop It Like It's Hot", artist: "Snoop Dogg", emojis: "⬇️🔥", difficulty: "easy" }
            ]
        },
        '2010s': {
            name: "2010s",
            emoji: "📲",
            songs: [
                { title: "Rolling in the Deep", artist: "Adele", emojis: "🛞🌊⬇️", difficulty: "medium" },
                { title: "Call Me Maybe", artist: "Carly Rae Jepsen", emojis: "📞👤❓", difficulty: "easy" },
                { title: "Happy", artist: "Pharrell Williams", emojis: "😊😄🎉", difficulty: "easy" },
                { title: "Shake It Off", artist: "Taylor Swift", emojis: "🙅‍♀️💃🎵", difficulty: "easy" },
                { title: "Uptown Funk", artist: "Bruno Mars", emojis: "⬆️🏙️🕺", difficulty: "easy" },
                { title: "Bad Romance", artist: "Lady Gaga", emojis: "👎❤️📖", difficulty: "easy" },
                { title: "Firework", artist: "Katy Perry", emojis: "🎆🎇💥", difficulty: "easy" },
                { title: "Royals", artist: "Lorde", emojis: "👑👸🤴", difficulty: "easy" },
                { title: "Thinking Out Loud", artist: "Ed Sheeran", emojis: "🤔💭🔊", difficulty: "easy" },
                { title: "Wrecking Ball", artist: "Miley Cyrus", emojis: "🏗️⚫💥", difficulty: "easy" },
                { title: "Blank Space", artist: "Taylor Swift", emojis: "📝⬜", difficulty: "easy" },
                { title: "Let It Go", artist: "Idina Menzel", emojis: "🫳❄️👸", difficulty: "easy" },
                { title: "Diamonds", artist: "Rihanna", emojis: "💎💎💎", difficulty: "easy" },
                { title: "Chandelier", artist: "Sia", emojis: "💡🕯️✨", difficulty: "medium" },
                { title: "Sugar", artist: "Maroon 5", emojis: "🍬🍭🧁", difficulty: "easy" },
                { title: "Dark Horse", artist: "Katy Perry", emojis: "🌑🐴", difficulty: "easy" },
                { title: "Wake Me Up", artist: "Avicii", emojis: "⏰😴⬆️", difficulty: "easy" },
                { title: "Radioactive", artist: "Imagine Dragons", emojis: "📻☢️", difficulty: "easy" },
                { title: "Counting Stars", artist: "OneRepublic", emojis: "🔢⭐⭐⭐", difficulty: "easy" },
                { title: "Stay With Me", artist: "Sam Smith", emojis: "🏠👤❤️", difficulty: "medium" }
            ]
        },
        '2020s': {
            name: "2020s",
            emoji: "🎧",
            songs: [
                { title: "Blinding Lights", artist: "The Weeknd", emojis: "😵💡💡", difficulty: "easy" },
                { title: "Watermelon Sugar", artist: "Harry Styles", emojis: "🍉🍬", difficulty: "easy" },
                { title: "drivers license", artist: "Olivia Rodrigo", emojis: "🚗📄", difficulty: "easy" },
                { title: "Levitating", artist: "Dua Lipa", emojis: "🧘⬆️🌙", difficulty: "medium" },
                { title: "Save Your Tears", artist: "The Weeknd", emojis: "💾😢", difficulty: "easy" },
                { title: "Good 4 U", artist: "Olivia Rodrigo", emojis: "👍4️⃣🫵", difficulty: "easy" },
                { title: "Stay", artist: "The Kid LAROI & Justin Bieber", emojis: "🏠🚫🚶", difficulty: "easy" },
                { title: "Kiss Me More", artist: "Doja Cat", emojis: "💋👤➕", difficulty: "easy" },
                { title: "Peaches", artist: "Justin Bieber", emojis: "🍑🍑🍑", difficulty: "easy" },
                { title: "Montero", artist: "Lil Nas X", emojis: "😈🔥👠", difficulty: "hard" },
                { title: "Easy On Me", artist: "Adele", emojis: "😌👤", difficulty: "medium" },
                { title: "Heat Waves", artist: "Glass Animals", emojis: "🔥🌊", difficulty: "easy" },
                { title: "Bad Habits", artist: "Ed Sheeran", emojis: "👎🔄😬", difficulty: "easy" },
                { title: "As It Was", artist: "Harry Styles", emojis: "🔙⏰", difficulty: "medium" },
                { title: "Anti-Hero", artist: "Taylor Swift", emojis: "🚫🦸", difficulty: "easy" },
                { title: "Flowers", artist: "Miley Cyrus", emojis: "🌸🌺🌻💐", difficulty: "easy" },
                { title: "About Damn Time", artist: "Lizzo", emojis: "ℹ️🤬⏰", difficulty: "medium" },
                { title: "Running Up That Hill", artist: "Kate Bush", emojis: "🏃⬆️⛰️", difficulty: "easy" },
                { title: "Cold Heart", artist: "Elton John & Dua Lipa", emojis: "🥶❤️", difficulty: "easy" },
                { title: "Shivers", artist: "Ed Sheeran", emojis: "🥶😰💫", difficulty: "medium" }
            ]
        },
        'classics': {
            name: "Classics",
            emoji: "🎼",
            songs: [
                { title: "Bohemian Rhapsody", artist: "Queen", emojis: "👨🇨🇿🎭", difficulty: "hard" },
                { title: "Stairway to Heaven", artist: "Led Zeppelin", emojis: "🪜➡️😇", difficulty: "easy" },
                { title: "Imagine", artist: "John Lennon", emojis: "💭🌍☮️", difficulty: "medium" },
                { title: "Hotel California", artist: "Eagles", emojis: "🏨☀️🌴", difficulty: "easy" },
                { title: "Smells Like Teen Spirit", artist: "Nirvana", emojis: "👃👦👻", difficulty: "hard" },
                { title: "Let It Be", artist: "The Beatles", emojis: "🫳🐝", difficulty: "medium" },
                { title: "Hey Jude", artist: "The Beatles", emojis: "👋🧑", difficulty: "easy" },
                { title: "Thriller", artist: "Michael Jackson", emojis: "😱🧟👻", difficulty: "easy" },
                { title: "Like a Rolling Stone", artist: "Bob Dylan", emojis: "❤️🪨🎸", difficulty: "medium" },
                { title: "Dancing Queen", artist: "ABBA", emojis: "💃👸", difficulty: "easy" },
                { title: "Piano Man", artist: "Billy Joel", emojis: "🎹👨", difficulty: "easy" },
                { title: "We Will Rock You", artist: "Queen", emojis: "👤🪨🫵", difficulty: "easy" },
                { title: "Another One Bites the Dust", artist: "Queen", emojis: "1️⃣👄🌫️", difficulty: "medium" },
                { title: "Respect", artist: "Aretha Franklin", emojis: "🫡✊", difficulty: "medium" },
                { title: "Born to Run", artist: "Bruce Springsteen", emojis: "👶➡️🏃", difficulty: "easy" },
                { title: "American Pie", artist: "Don McLean", emojis: "🇺🇸🥧", difficulty: "easy" },
                { title: "Rocket Man", artist: "Elton John", emojis: "🚀👨", difficulty: "easy" },
                { title: "Space Oddity", artist: "David Bowie", emojis: "🌌🤔", difficulty: "medium" },
                { title: "Yesterday", artist: "The Beatles", emojis: "📅⬅️😢", difficulty: "easy" },
                { title: "Superstition", artist: "Stevie Wonder", emojis: "🪞🐈‍⬛🍀", difficulty: "hard" }
            ]
        }
    }
};

// Export for use in game
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SONGS;
}
