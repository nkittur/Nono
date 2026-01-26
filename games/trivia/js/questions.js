/**
 * Trivia Showdown - Questions Database
 * Curated for 45-50 year olds (born 1975-1980)
 */

const QUESTIONS = {
    eighties: {
        id: 'eighties',
        name: '80s Nostalgia',
        icon: '📼',
        questions: [
            {
                question: 'What was the name of the DeLorean time machine\'s power source in "Back to the Future"?',
                answers: ['Flux Capacitor', 'Quantum Drive', 'Time Crystal', 'Plutonium Core'],
                correct: 'Flux Capacitor'
            },
            {
                question: 'Which 1984 movie featured the line "I ain\'t afraid of no ghosts"?',
                answers: ['Ghostbusters', 'Poltergeist', 'Gremlins', 'The Shining'],
                correct: 'Ghostbusters'
            },
            {
                question: 'What was the name of the mall in "Back to the Future"?',
                answers: ['Twin Pines Mall', 'Hill Valley Plaza', 'Clock Tower Mall', 'Lone Pine Mall'],
                correct: 'Twin Pines Mall'
            },
            {
                question: 'In "Ferris Bueller\'s Day Off", what kind of car did they "borrow"?',
                answers: ['Ferrari 250 GT', 'Porsche 911', 'Corvette Stingray', 'Lamborghini Countach'],
                correct: 'Ferrari 250 GT'
            },
            {
                question: 'What year did MTV first go on the air?',
                answers: ['1981', '1979', '1983', '1985'],
                correct: '1981'
            },
            {
                question: 'What was the first music video ever played on MTV?',
                answers: ['Video Killed the Radio Star', 'Thriller', 'Take On Me', 'Money for Nothing'],
                correct: 'Video Killed the Radio Star'
            },
            {
                question: 'Which actress starred in "Sixteen Candles" and "The Breakfast Club"?',
                answers: ['Molly Ringwald', 'Ally Sheedy', 'Demi Moore', 'Winona Ryder'],
                correct: 'Molly Ringwald'
            },
            {
                question: 'What was the name of the computer in the movie "WarGames"?',
                answers: ['WOPR', 'HAL 9000', 'SKYNET', 'ENIAC'],
                correct: 'WOPR'
            },
            {
                question: 'Which band performed the theme song for "The Breakfast Club"?',
                answers: ['Simple Minds', 'Tears for Fears', 'Duran Duran', 'The Cure'],
                correct: 'Simple Minds'
            },
            {
                question: 'What toy "came to life" in the 1988 movie "Big"?',
                answers: ['Zoltar fortune telling machine', 'Teddy Ruxpin', 'A Ouija board', 'A ventriloquist dummy'],
                correct: 'Zoltar fortune telling machine'
            },
            {
                question: 'What was the Rubik\'s Cube originally called when invented?',
                answers: ['Magic Cube', 'Puzzle Cube', 'Hungarian Cube', 'Color Cube'],
                correct: 'Magic Cube'
            },
            {
                question: 'Which 1985 movie featured the Goonies searching for pirate treasure?',
                answers: ['The Goonies', 'Stand By Me', 'The Lost Boys', 'Explorers'],
                correct: 'The Goonies'
            },
            {
                question: 'What was the name of He-Man\'s secret identity?',
                answers: ['Prince Adam', 'Prince Eric', 'Prince Charles', 'Prince David'],
                correct: 'Prince Adam'
            },
            {
                question: 'Which video game system was released by Nintendo in North America in 1985?',
                answers: ['NES', 'Super Nintendo', 'Game Boy', 'Nintendo 64'],
                correct: 'NES'
            },
            {
                question: 'What phrase did Mr. T\'s character B.A. Baracus frequently say on "The A-Team"?',
                answers: ['I pity the fool', 'Make my day', 'Hasta la vista', 'I\'ll be back'],
                correct: 'I pity the fool'
            },
            {
                question: 'Which singer released the album "Thriller" in 1982?',
                answers: ['Michael Jackson', 'Prince', 'Madonna', 'Whitney Houston'],
                correct: 'Michael Jackson'
            },
            {
                question: 'What was the name of the bar in "Cheers"?',
                answers: ['Cheers', 'The Bull & Finch', 'Gary\'s Old Town', 'Melville\'s'],
                correct: 'Cheers'
            },
            {
                question: 'Which 1986 movie featured Tom Cruise as a Navy fighter pilot?',
                answers: ['Top Gun', 'An Officer and a Gentleman', 'Iron Eagle', 'The Right Stuff'],
                correct: 'Top Gun'
            },
            {
                question: 'What was the name of the friendly alien in "E.T."?',
                answers: ['E.T.', 'Elliott', 'Yoda', 'Alf'],
                correct: 'E.T.'
            },
            {
                question: 'Which band sang "Take On Me" with its famous pencil-sketch music video?',
                answers: ['a-ha', 'Duran Duran', 'Depeche Mode', 'New Order'],
                correct: 'a-ha'
            }
        ]
    },

    nineties: {
        id: 'nineties',
        name: '90s Culture',
        icon: '💿',
        questions: [
            {
                question: 'What coffee shop did the "Friends" characters hang out at?',
                answers: ['Central Perk', 'The Coffee House', 'Java Joe\'s', 'Cup O\' Joe'],
                correct: 'Central Perk'
            },
            {
                question: 'Which 1994 movie had the famous line "Life is like a box of chocolates"?',
                answers: ['Forrest Gump', 'The Shawshank Redemption', 'Pulp Fiction', 'Philadelphia'],
                correct: 'Forrest Gump'
            },
            {
                question: 'What was the name of the ship in "Titanic"?',
                answers: ['RMS Titanic', 'HMS Titanic', 'SS Titanic', 'USS Titanic'],
                correct: 'RMS Titanic'
            },
            {
                question: 'Which TV show featured FBI agents Mulder and Scully?',
                answers: ['The X-Files', 'Twin Peaks', 'Millennium', 'Dark Skies'],
                correct: 'The X-Files'
            },
            {
                question: 'What was the best-selling video game console of the 1990s?',
                answers: ['PlayStation', 'Nintendo 64', 'Sega Saturn', 'Sega Genesis'],
                correct: 'PlayStation'
            },
            {
                question: 'Which grunge band released the album "Nevermind" in 1991?',
                answers: ['Nirvana', 'Pearl Jam', 'Soundgarden', 'Alice in Chains'],
                correct: 'Nirvana'
            },
            {
                question: 'What was the name of the dinosaur theme park in "Jurassic Park"?',
                answers: ['Jurassic Park', 'Dino World', 'Prehistoric Park', 'Isla Nublar Zoo'],
                correct: 'Jurassic Park'
            },
            {
                question: 'Which sitcom featured the Seinfeld gang\'s favorite diner?',
                answers: ['Monk\'s Café', 'Central Perk', 'The Peach Pit', 'Arnold\'s'],
                correct: 'Monk\'s Café'
            },
            {
                question: 'What year did the World Wide Web become publicly available?',
                answers: ['1991', '1989', '1993', '1995'],
                correct: '1991'
            },
            {
                question: 'Which 1999 movie featured the line "I see dead people"?',
                answers: ['The Sixth Sense', 'The Blair Witch Project', 'The Matrix', 'Fight Club'],
                correct: 'The Sixth Sense'
            },
            {
                question: 'What virtual pet toy became a massive craze in 1997?',
                answers: ['Tamagotchi', 'Furby', 'Giga Pet', 'Nano Baby'],
                correct: 'Tamagotchi'
            },
            {
                question: 'Which animated movie featured the song "Circle of Life"?',
                answers: ['The Lion King', 'Aladdin', 'Beauty and the Beast', 'Pocahontas'],
                correct: 'The Lion King'
            },
            {
                question: 'What was the name of the cloned sheep announced in 1997?',
                answers: ['Dolly', 'Molly', 'Polly', 'Holly'],
                correct: 'Dolly'
            },
            {
                question: 'Which boy band released "I Want It That Way" in 1999?',
                answers: ['Backstreet Boys', '*NSYNC', '98 Degrees', 'New Kids on the Block'],
                correct: 'Backstreet Boys'
            },
            {
                question: 'What was Neo\'s job before becoming "The One" in The Matrix?',
                answers: ['Computer programmer', 'Accountant', 'Teacher', 'Lawyer'],
                correct: 'Computer programmer'
            },
            {
                question: 'Which TV drama was set in the fictional Seattle Grace Hospital?',
                answers: ['ER', 'Grey\'s Anatomy', 'Chicago Hope', 'St. Elsewhere'],
                correct: 'ER'
            },
            {
                question: 'What was the name of the operating system Microsoft released in 1995?',
                answers: ['Windows 95', 'Windows 3.1', 'Windows 98', 'Windows NT'],
                correct: 'Windows 95'
            },
            {
                question: 'Which Quentin Tarantino film featured a non-linear storyline and a briefcase?',
                answers: ['Pulp Fiction', 'Reservoir Dogs', 'Jackie Brown', 'Kill Bill'],
                correct: 'Pulp Fiction'
            },
            {
                question: 'What was the name of Ross and Rachel\'s daughter on "Friends"?',
                answers: ['Emma', 'Emily', 'Ella', 'Eve'],
                correct: 'Emma'
            },
            {
                question: 'Which 1997 movie featured Will Smith fighting aliens?',
                answers: ['Men in Black', 'Independence Day', 'Wild Wild West', 'Enemy of the State'],
                correct: 'Men in Black'
            }
        ]
    },

    music: {
        id: 'music',
        name: 'Music Legends',
        icon: '🎸',
        questions: [
            {
                question: 'Which artist was known as the "King of Pop"?',
                answers: ['Michael Jackson', 'Prince', 'Elvis Presley', 'James Brown'],
                correct: 'Michael Jackson'
            },
            {
                question: 'What was Madonna\'s first #1 hit single?',
                answers: ['Like a Virgin', 'Material Girl', 'Holiday', 'Borderline'],
                correct: 'Like a Virgin'
            },
            {
                question: 'Which band was Freddie Mercury the lead singer of?',
                answers: ['Queen', 'The Police', 'Fleetwood Mac', 'Genesis'],
                correct: 'Queen'
            },
            {
                question: 'What was Prince\'s signature color?',
                answers: ['Purple', 'Red', 'Black', 'Gold'],
                correct: 'Purple'
            },
            {
                question: 'Which Eagles song became one of the best-selling singles of all time?',
                answers: ['Hotel California', 'Take It Easy', 'Desperado', 'Life in the Fast Lane'],
                correct: 'Hotel California'
            },
            {
                question: 'What was the name of U2\'s 1987 breakthrough album?',
                answers: ['The Joshua Tree', 'Achtung Baby', 'War', 'Rattle and Hum'],
                correct: 'The Joshua Tree'
            },
            {
                question: 'Which British band released "Wonderwall" in 1995?',
                answers: ['Oasis', 'Blur', 'Radiohead', 'Pulp'],
                correct: 'Oasis'
            },
            {
                question: 'Who sang "I Will Always Love You" in "The Bodyguard"?',
                answers: ['Whitney Houston', 'Mariah Carey', 'Celine Dion', 'Toni Braxton'],
                correct: 'Whitney Houston'
            },
            {
                question: 'Which Fleetwood Mac album became one of the best-selling of all time?',
                answers: ['Rumours', 'Tusk', 'Tango in the Night', 'Mirage'],
                correct: 'Rumours'
            },
            {
                question: 'What was Bon Jovi\'s biggest hit from the 1980s?',
                answers: ['Livin\' on a Prayer', 'You Give Love a Bad Name', 'Wanted Dead or Alive', 'Bad Medicine'],
                correct: 'Livin\' on a Prayer'
            },
            {
                question: 'Which artist released "Purple Rain" in 1984?',
                answers: ['Prince', 'Michael Jackson', 'Stevie Wonder', 'Lionel Richie'],
                correct: 'Prince'
            },
            {
                question: 'What was the name of Guns N\' Roses\' debut album?',
                answers: ['Appetite for Destruction', 'Use Your Illusion', 'Lies', 'The Spaghetti Incident'],
                correct: 'Appetite for Destruction'
            },
            {
                question: 'Which song by The Police begins with "Every breath you take"?',
                answers: ['Every Breath You Take', 'Roxanne', 'Message in a Bottle', 'Walking on the Moon'],
                correct: 'Every Breath You Take'
            },
            {
                question: 'Who performed the theme song for the James Bond film "A View to a Kill"?',
                answers: ['Duran Duran', 'a-ha', 'Sheena Easton', 'Tina Turner'],
                correct: 'Duran Duran'
            },
            {
                question: 'Which artist had a hit with "Like a Prayer" in 1989?',
                answers: ['Madonna', 'Janet Jackson', 'Paula Abdul', 'Debbie Gibson'],
                correct: 'Madonna'
            },
            {
                question: 'What was the name of Eric Clapton\'s tribute song to his son?',
                answers: ['Tears in Heaven', 'Wonderful Tonight', 'Layla', 'Change the World'],
                correct: 'Tears in Heaven'
            },
            {
                question: 'Which rock band\'s lead singer was Kurt Cobain?',
                answers: ['Nirvana', 'Pearl Jam', 'Soundgarden', 'Stone Temple Pilots'],
                correct: 'Nirvana'
            },
            {
                question: 'What 1985 charity single featured dozens of artists singing "We Are the World"?',
                answers: ['USA for Africa', 'Live Aid', 'Band Aid', 'Farm Aid'],
                correct: 'USA for Africa'
            },
            {
                question: 'Which female artist released the album "Jagged Little Pill" in 1995?',
                answers: ['Alanis Morissette', 'Sheryl Crow', 'Jewel', 'Sarah McLachlan'],
                correct: 'Alanis Morissette'
            },
            {
                question: 'What was the Spice Girls\' debut single?',
                answers: ['Wannabe', 'Say You\'ll Be There', '2 Become 1', 'Spice Up Your Life'],
                correct: 'Wannabe'
            }
        ]
    },

    history: {
        id: 'history',
        name: 'Historic Events',
        icon: '📰',
        questions: [
            {
                question: 'In what year did the Berlin Wall fall?',
                answers: ['1989', '1987', '1991', '1985'],
                correct: '1989'
            },
            {
                question: 'Who was the U.S. President during the Gulf War in 1991?',
                answers: ['George H.W. Bush', 'Ronald Reagan', 'Bill Clinton', 'George W. Bush'],
                correct: 'George H.W. Bush'
            },
            {
                question: 'What space shuttle tragically exploded in 1986?',
                answers: ['Challenger', 'Columbia', 'Discovery', 'Atlantis'],
                correct: 'Challenger'
            },
            {
                question: 'Which country hosted the 1984 Summer Olympics?',
                answers: ['USA', 'USSR', 'South Korea', 'Spain'],
                correct: 'USA'
            },
            {
                question: 'What year did the Soviet Union officially dissolve?',
                answers: ['1991', '1989', '1993', '1987'],
                correct: '1991'
            },
            {
                question: 'Who was released from prison in South Africa in 1990 after 27 years?',
                answers: ['Nelson Mandela', 'Desmond Tutu', 'Steve Biko', 'F.W. de Klerk'],
                correct: 'Nelson Mandela'
            },
            {
                question: 'What was the name of the oil tanker that caused a massive spill in Alaska in 1989?',
                answers: ['Exxon Valdez', 'BP Deepwater', 'Shell Horizon', 'Texaco Atlantic'],
                correct: 'Exxon Valdez'
            },
            {
                question: 'Which princess died in a car crash in Paris in 1997?',
                answers: ['Princess Diana', 'Princess Grace', 'Princess Margaret', 'Princess Anne'],
                correct: 'Princess Diana'
            },
            {
                question: 'What major trade agreement was signed between the US, Canada, and Mexico in 1994?',
                answers: ['NAFTA', 'TPP', 'GATT', 'WTO'],
                correct: 'NAFTA'
            },
            {
                question: 'Which U.S. President faced impeachment proceedings in 1998?',
                answers: ['Bill Clinton', 'George H.W. Bush', 'Richard Nixon', 'Ronald Reagan'],
                correct: 'Bill Clinton'
            },
            {
                question: 'What was the Y2K bug primarily concerned with?',
                answers: ['Computer date systems', 'Internet viruses', 'Power grid failures', 'Nuclear weapons'],
                correct: 'Computer date systems'
            },
            {
                question: 'Which U.S. city hosted the 1996 Summer Olympics?',
                answers: ['Atlanta', 'Los Angeles', 'Salt Lake City', 'New York'],
                correct: 'Atlanta'
            },
            {
                question: 'What major event occurred on September 11, 2001?',
                answers: ['Terrorist attacks on the US', 'Hurricane Katrina', 'Stock market crash', 'Space shuttle disaster'],
                correct: 'Terrorist attacks on the US'
            },
            {
                question: 'Who was the British Prime Minister who served from 1979 to 1990?',
                answers: ['Margaret Thatcher', 'John Major', 'Tony Blair', 'Harold Wilson'],
                correct: 'Margaret Thatcher'
            },
            {
                question: 'What was the name of the protest in Tiananmen Square in 1989?',
                answers: ['Pro-democracy protest', 'Worker\'s strike', 'Economic protest', 'Environmental protest'],
                correct: 'Pro-democracy protest'
            },
            {
                question: 'Which country was reunified in 1990?',
                answers: ['Germany', 'Korea', 'Vietnam', 'Yemen'],
                correct: 'Germany'
            },
            {
                question: 'What famous trial captivated America in 1995?',
                answers: ['O.J. Simpson trial', 'Rodney King trial', 'Ted Bundy trial', 'John Gotti trial'],
                correct: 'O.J. Simpson trial'
            },
            {
                question: 'Which war began with Iraq\'s invasion of Kuwait in 1990?',
                answers: ['Gulf War', 'Iraq War', 'Iran-Iraq War', 'Desert Storm'],
                correct: 'Gulf War'
            },
            {
                question: 'What was the name of the comet that crashed into Jupiter in 1994?',
                answers: ['Shoemaker-Levy 9', 'Halley\'s Comet', 'Hale-Bopp', 'Swift-Tuttle'],
                correct: 'Shoemaker-Levy 9'
            },
            {
                question: 'Which European currency was introduced in 1999?',
                answers: ['Euro', 'ECU', 'Euromark', 'Eurofranc'],
                correct: 'Euro'
            }
        ]
    },

    sports: {
        id: 'sports',
        name: 'Sports Moments',
        icon: '🏆',
        questions: [
            {
                question: 'How many NBA championships did Michael Jordan win with the Chicago Bulls?',
                answers: ['6', '5', '7', '4'],
                correct: '6'
            },
            {
                question: 'What was the "Dream Team" that dominated the 1992 Olympics?',
                answers: ['US Men\'s Basketball', 'US Men\'s Hockey', 'US Women\'s Gymnastics', 'US Track Team'],
                correct: 'US Men\'s Basketball'
            },
            {
                question: 'Which boxer bit off part of Evander Holyfield\'s ear in 1997?',
                answers: ['Mike Tyson', 'Lennox Lewis', 'George Foreman', 'Riddick Bowe'],
                correct: 'Mike Tyson'
            },
            {
                question: 'What year did Wayne Gretzky retire from the NHL?',
                answers: ['1999', '1997', '2001', '1995'],
                correct: '1999'
            },
            {
                question: 'Which team won Super Bowl XX in dominant fashion in 1986?',
                answers: ['Chicago Bears', 'San Francisco 49ers', 'New York Giants', 'Washington Redskins'],
                correct: 'Chicago Bears'
            },
            {
                question: 'Who hit 70 home runs in the 1998 MLB season?',
                answers: ['Mark McGwire', 'Sammy Sosa', 'Barry Bonds', 'Ken Griffey Jr.'],
                correct: 'Mark McGwire'
            },
            {
                question: 'Which country hosted the 1994 FIFA World Cup?',
                answers: ['USA', 'Mexico', 'France', 'Brazil'],
                correct: 'USA'
            },
            {
                question: 'What was Michael Jordan\'s jersey number with the Bulls?',
                answers: ['23', '45', '33', '12'],
                correct: '23'
            },
            {
                question: 'Which golfer won the 1997 Masters by 12 strokes at age 21?',
                answers: ['Tiger Woods', 'Phil Mickelson', 'Ernie Els', 'David Duval'],
                correct: 'Tiger Woods'
            },
            {
                question: 'What was the "Miracle on Ice" about?',
                answers: ['US hockey beating USSR in 1980', 'Olympic figure skating scandal', 'Hockey player comeback', 'Ice rink collapse'],
                correct: 'US hockey beating USSR in 1980'
            },
            {
                question: 'Which NFL quarterback led the San Francisco 49ers to 4 Super Bowl wins?',
                answers: ['Joe Montana', 'Steve Young', 'John Elway', 'Dan Marino'],
                correct: 'Joe Montana'
            },
            {
                question: 'Who was the youngest heavyweight champion in boxing history?',
                answers: ['Mike Tyson', 'Muhammad Ali', 'Floyd Patterson', 'George Foreman'],
                correct: 'Mike Tyson'
            },
            {
                question: 'Which team ended an 86-year championship drought in 2004?',
                answers: ['Boston Red Sox', 'Chicago Cubs', 'Cleveland Indians', 'Chicago White Sox'],
                correct: 'Boston Red Sox'
            },
            {
                question: 'What tennis rivalry dominated the 1980s between McEnroe and whom?',
                answers: ['Bjorn Borg', 'Jimmy Connors', 'Ivan Lendl', 'Boris Becker'],
                correct: 'Bjorn Borg'
            },
            {
                question: 'Which NBA team won 72 games in the 1995-96 season?',
                answers: ['Chicago Bulls', 'Los Angeles Lakers', 'Boston Celtics', 'Detroit Pistons'],
                correct: 'Chicago Bulls'
            },
            {
                question: 'Who won the 1999 Women\'s World Cup for the US with a penalty kick?',
                answers: ['Brandi Chastain', 'Mia Hamm', 'Michelle Akers', 'Julie Foudy'],
                correct: 'Brandi Chastain'
            },
            {
                question: 'What was Bo Jackson famous for?',
                answers: ['Playing two professional sports', 'Longest home run', 'Fastest 40-yard dash', 'Most touchdowns'],
                correct: 'Playing two professional sports'
            },
            {
                question: 'Which Formula 1 driver was tragically killed at Imola in 1994?',
                answers: ['Ayrton Senna', 'Alain Prost', 'Nigel Mansell', 'Michael Schumacher'],
                correct: 'Ayrton Senna'
            },
            {
                question: 'What was the name of the 1988 Calgary Olympics scandal involving figure skating?',
                answers: ['Battle of the Brians', 'Triple Axel Controversy', 'Ice Wars', 'Skating Scandal'],
                correct: 'Battle of the Brians'
            },
            {
                question: 'Which team did Magic Johnson play for his entire career?',
                answers: ['Los Angeles Lakers', 'Boston Celtics', 'Detroit Pistons', 'Chicago Bulls'],
                correct: 'Los Angeles Lakers'
            }
        ]
    },

    technology: {
        id: 'technology',
        name: 'Tech Evolution',
        icon: '💾',
        questions: [
            {
                question: 'What was the first commercially successful portable music player by Sony?',
                answers: ['Walkman', 'Discman', 'MiniDisc', 'Boombox'],
                correct: 'Walkman'
            },
            {
                question: 'What year was the first Apple Macintosh computer released?',
                answers: ['1984', '1982', '1986', '1980'],
                correct: '1984'
            },
            {
                question: 'What was the name of the first popular web browser released in 1993?',
                answers: ['Mosaic', 'Netscape', 'Internet Explorer', 'Mozilla'],
                correct: 'Mosaic'
            },
            {
                question: 'Which company created the Game Boy?',
                answers: ['Nintendo', 'Sega', 'Atari', 'Sony'],
                correct: 'Nintendo'
            },
            {
                question: 'What was AOL\'s famous catchphrase when you received email?',
                answers: ['You\'ve Got Mail', 'New Message Received', 'Mail Incoming', 'Check Your Inbox'],
                correct: 'You\'ve Got Mail'
            },
            {
                question: 'What type of storage did the original Macintosh use?',
                answers: ['3.5 inch floppy disk', '5.25 inch floppy disk', 'Hard drive', 'CD-ROM'],
                correct: '3.5 inch floppy disk'
            },
            {
                question: 'Which search engine was founded by Stanford students in 1998?',
                answers: ['Google', 'Yahoo', 'AltaVista', 'Lycos'],
                correct: 'Google'
            },
            {
                question: 'What did DVD originally stand for?',
                answers: ['Digital Versatile Disc', 'Digital Video Disc', 'Digital Visual Disc', 'Data Video Disc'],
                correct: 'Digital Versatile Disc'
            },
            {
                question: 'Which video game console featured the famous "Red Ring of Death" issue?',
                answers: ['Xbox 360', 'PlayStation 3', 'Nintendo Wii', 'Xbox'],
                correct: 'Xbox 360'
            },
            {
                question: 'What was the name of the first successful smartphone with a touchscreen in 2007?',
                answers: ['iPhone', 'BlackBerry Storm', 'Palm Pre', 'HTC Touch'],
                correct: 'iPhone'
            },
            {
                question: 'Which company introduced the first digital camera for consumers in 1990?',
                answers: ['Kodak', 'Canon', 'Nikon', 'Sony'],
                correct: 'Kodak'
            },
            {
                question: 'What was the maximum capacity of a standard CD?',
                answers: ['700 MB', '650 MB', '800 MB', '500 MB'],
                correct: '700 MB'
            },
            {
                question: 'What online service was popular for file sharing in 1999 before being shut down?',
                answers: ['Napster', 'LimeWire', 'Kazaa', 'BitTorrent'],
                correct: 'Napster'
            },
            {
                question: 'What was the name of Microsoft\'s first gaming console?',
                answers: ['Xbox', 'Windows Gaming System', 'Microsoft Game Station', 'MSX'],
                correct: 'Xbox'
            },
            {
                question: 'Which company made the Palm Pilot?',
                answers: ['Palm Inc.', 'Apple', 'Hewlett-Packard', 'Compaq'],
                correct: 'Palm Inc.'
            },
            {
                question: 'What year was the World Wide Web invented by Tim Berners-Lee?',
                answers: ['1989', '1991', '1987', '1993'],
                correct: '1989'
            },
            {
                question: 'What did people commonly use before GPS for directions in cars?',
                answers: ['Paper maps', 'Compass', 'Ask for directions', 'Memory'],
                correct: 'Paper maps'
            },
            {
                question: 'Which instant messaging service was most popular in the late 90s?',
                answers: ['AOL Instant Messenger', 'ICQ', 'MSN Messenger', 'Yahoo Messenger'],
                correct: 'AOL Instant Messenger'
            },
            {
                question: 'What was the name of the first major social networking site launched in 2003?',
                answers: ['MySpace', 'Facebook', 'Friendster', 'LinkedIn'],
                correct: 'MySpace'
            },
            {
                question: 'Which video game introduced the world to Mario and Donkey Kong?',
                answers: ['Donkey Kong', 'Super Mario Bros', 'Mario Bros', 'Jumpman'],
                correct: 'Donkey Kong'
            }
        ]
    },

    tvmovies: {
        id: 'tvmovies',
        name: 'TV & Movies',
        icon: '🎬',
        questions: [
            {
                question: 'What was the name of the family in "The Cosby Show"?',
                answers: ['Huxtable', 'Banks', 'Jefferson', 'Evans'],
                correct: 'Huxtable'
            },
            {
                question: 'Which 1994 film featured the quote "Get busy living, or get busy dying"?',
                answers: ['The Shawshank Redemption', 'Forrest Gump', 'Pulp Fiction', 'The Green Mile'],
                correct: 'The Shawshank Redemption'
            },
            {
                question: 'What was the profession of the main characters in "Magnum, P.I."?',
                answers: ['Private Investigator', 'Police Detective', 'FBI Agent', 'Lawyer'],
                correct: 'Private Investigator'
            },
            {
                question: 'Which TV show featured "The Soup Nazi"?',
                answers: ['Seinfeld', 'Friends', 'Frasier', 'Cheers'],
                correct: 'Seinfeld'
            },
            {
                question: 'Who directed "Schindler\'s List"?',
                answers: ['Steven Spielberg', 'Martin Scorsese', 'Francis Ford Coppola', 'Oliver Stone'],
                correct: 'Steven Spielberg'
            },
            {
                question: 'What hospital was the setting for "ER"?',
                answers: ['County General Hospital', 'Seattle Grace', 'Princeton-Plainsboro', 'Sacred Heart'],
                correct: 'County General Hospital'
            },
            {
                question: 'Which actor played the T-800 in "The Terminator"?',
                answers: ['Arnold Schwarzenegger', 'Sylvester Stallone', 'Jean-Claude Van Damme', 'Bruce Willis'],
                correct: 'Arnold Schwarzenegger'
            },
            {
                question: 'What was the name of Tony Soprano\'s psychiatrist?',
                answers: ['Dr. Jennifer Melfi', 'Dr. Laura Palmer', 'Dr. Sarah Mitchell', 'Dr. Catherine Wyatt'],
                correct: 'Dr. Jennifer Melfi'
            },
            {
                question: 'Which 1985 film featured a group of kids who find a treasure map?',
                answers: ['The Goonies', 'Stand By Me', 'The Lost Boys', 'Explorers'],
                correct: 'The Goonies'
            },
            {
                question: 'What animated series premiered with the episode "Simpsons Roasting on an Open Fire"?',
                answers: ['The Simpsons', 'Family Guy', 'South Park', 'King of the Hill'],
                correct: 'The Simpsons'
            },
            {
                question: 'Who played Hannibal Lecter in "The Silence of the Lambs"?',
                answers: ['Anthony Hopkins', 'Jack Nicholson', 'Robert De Niro', 'Al Pacino'],
                correct: 'Anthony Hopkins'
            },
            {
                question: 'Which TV show was set in the fictional town of Twin Peaks?',
                answers: ['Twin Peaks', 'Northern Exposure', 'Picket Fences', 'Eerie, Indiana'],
                correct: 'Twin Peaks'
            },
            {
                question: 'What was the name of the bar in "How I Met Your Mother" (and what 90s show inspired it)?',
                answers: ['MacLaren\'s (inspired by Cheers)', 'Puzzles (inspired by Friends)', 'The Alibi (inspired by Seinfeld)', 'Paddy\'s (inspired by Frasier)'],
                correct: 'MacLaren\'s (inspired by Cheers)'
            },
            {
                question: 'Which actress starred in "Pretty Woman"?',
                answers: ['Julia Roberts', 'Meg Ryan', 'Sandra Bullock', 'Cameron Diaz'],
                correct: 'Julia Roberts'
            },
            {
                question: 'What was the name of Al Bundy\'s shoe store in "Married... with Children"?',
                answers: ['Gary\'s Shoes', 'The Shoe Barn', 'Bundy\'s Footwear', 'New Market Mall Shoes'],
                correct: 'Gary\'s Shoes'
            },
            {
                question: 'Which 1997 movie featured a sinking ship and won 11 Academy Awards?',
                answers: ['Titanic', 'The English Patient', 'Braveheart', 'Forrest Gump'],
                correct: 'Titanic'
            },
            {
                question: 'What was Kramer\'s first name on "Seinfeld"?',
                answers: ['Cosmo', 'Keith', 'Karl', 'Kenneth'],
                correct: 'Cosmo'
            },
            {
                question: 'Which film featured the line "Here\'s looking at you, kid"?',
                answers: ['Casablanca', 'Gone with the Wind', 'The Godfather', 'Citizen Kane'],
                correct: 'Casablanca'
            },
            {
                question: 'Who created "The X-Files"?',
                answers: ['Chris Carter', 'David Lynch', 'J.J. Abrams', 'Joss Whedon'],
                correct: 'Chris Carter'
            },
            {
                question: 'What year did "The Simpsons" first air as a series?',
                answers: ['1989', '1987', '1991', '1990'],
                correct: '1989'
            }
        ]
    }
};
