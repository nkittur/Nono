/**
 * 2 Truths and a Lie - Facts Database
 * Each topic contains sets of 2 truths and 1 lie
 * Truths include source URLs for verification
 */

const FACTS_DATABASE = {
    animals: [
        {
            statements: [
                { text: "Octopuses have three hearts and blue blood", truth: true, source: "https://www.smithsonianmag.com/science-nature/ten-curious-facts-about-octopuses-7625828/" },
                { text: "A group of flamingos is called a 'flamboyance'", truth: true, source: "https://www.audubon.org/news/what-do-you-call-group-flamingos" },
                { text: "Dolphins sleep with both eyes closed to fully rest their brain", truth: false }
            ]
        },
        {
            statements: [
                { text: "Cows have best friends and get stressed when separated", truth: true, source: "https://www.bbc.com/future/article/20140805-do-cows-have-best-friends" },
                { text: "A shrimp's heart is located in its head", truth: true, source: "https://www.loc.gov/everyday-mysteries/zoology/item/where-is-a-shrimps-heart-located/" },
                { text: "Elephants are the only animals that can't produce tears", truth: false }
            ]
        },
        {
            statements: [
                { text: "Honey never spoils - 3000-year-old honey found in Egyptian tombs was still edible", truth: true, source: "https://www.smithsonianmag.com/science-nature/the-science-behind-honeys-eternal-shelf-life-1218690/" },
                { text: "Starfish don't have blood - they use filtered seawater instead", truth: true, source: "https://www.nationalgeographic.com/animals/invertebrates/facts/starfish" },
                { text: "Penguins can only taste salty and sour flavors because they evolved in cold climates", truth: false }
            ]
        },
        {
            statements: [
                { text: "A snail can sleep for up to 3 years", truth: true, source: "https://www.discoverwildlife.com/animal-facts/invertebrates/how-long-do-snails-sleep" },
                { text: "Koalas have fingerprints nearly identical to humans", truth: true, source: "https://www.science.org/content/article/koalas-have-humanlike-fingerprints" },
                { text: "Giraffes sleep standing up because they can't bend their knees", truth: false }
            ]
        },
        {
            statements: [
                { text: "Sea otters hold hands while sleeping to avoid drifting apart", truth: true, source: "https://www.seattleaquarium.org/blog/why-do-sea-otters-hold-hands" },
                { text: "Wombat poop is cube-shaped to prevent it from rolling away", truth: true, source: "https://www.nationalgeographic.com/animals/article/wombat-poop-cube-why-science" },
                { text: "Cats can only see in shades of blue and gray", truth: false }
            ]
        },
        {
            statements: [
                { text: "Butterflies taste with their feet", truth: true, source: "https://www.nationalgeographic.com/animals/invertebrates/facts/butterflies" },
                { text: "A group of porcupines is called a 'prickle'", truth: true, source: "https://www.merriam-webster.com/words-at-play/a-dray-of-squirrels" },
                { text: "Kangaroos can hop backwards but choose not to for safety", truth: false }
            ]
        },
        {
            statements: [
                { text: "Mantis shrimp can punch with the force of a bullet", truth: true, source: "https://www.nationalgeographic.com/animals/invertebrates/facts/mantis-shrimp" },
                { text: "Crows can recognize human faces and hold grudges", truth: true, source: "https://www.nationalgeographic.com/animals/article/crows-recognize-faces" },
                { text: "Bats are blind and rely entirely on echolocation to navigate", truth: false }
            ]
        },
        {
            statements: [
                { text: "Axolotls can regenerate their brain, heart, and limbs", truth: true, source: "https://www.nature.com/articles/d41586-021-01969-5" },
                { text: "Electric eels can produce enough electricity to power 10 light bulbs", truth: true, source: "https://www.smithsonianmag.com/science-nature/electric-eels-can-remotely-control-their-prey-180952801/" },
                { text: "Sloths are excellent swimmers and move three times faster in water than on land", truth: false }
            ]
        },
        {
            statements: [
                { text: "Platypuses glow blue-green under UV light", truth: true, source: "https://www.smithsonianmag.com/smart-news/platypuses-glow-under-uv-light-180976185/" },
                { text: "Hummingbirds are the only birds that can fly backwards", truth: true, source: "https://www.worldwildlife.org/stories/8-facts-about-hummingbirds" },
                { text: "Chameleons change color primarily to camouflage from predators", truth: false }
            ]
        },
        {
            statements: [
                { text: "Tardigrades can survive in the vacuum of space", truth: true, source: "https://www.nationalgeographic.com/animals/invertebrates/facts/tardigrades-water-bears" },
                { text: "Pigeons can do math at a level similar to monkeys", truth: true, source: "https://www.science.org/content/article/pigeons-can-learn-abstract-numerical-rules" },
                { text: "Dogs can only see in black and white", truth: false }
            ]
        }
    ],

    science: [
        {
            statements: [
                { text: "There are more trees on Earth than stars in the Milky Way", truth: true, source: "https://www.nature.com/articles/nature14967" },
                { text: "Hot water freezes faster than cold water under certain conditions", truth: true, source: "https://www.scientificamerican.com/article/is-it-true-that-hot-water-freezes-faster-than-cold-water/" },
                { text: "Sound travels faster through air than through water", truth: false }
            ]
        },
        {
            statements: [
                { text: "Bananas are slightly radioactive due to their potassium content", truth: true, source: "https://www.epa.gov/radtown/radioactivity-bananas" },
                { text: "A teaspoon of neutron star would weigh about 6 billion tons", truth: true, source: "https://www.nasa.gov/mission_pages/GLAST/science/neutron_stars.html" },
                { text: "Lightning never strikes the same place twice", truth: false }
            ]
        },
        {
            statements: [
                { text: "Humans share about 60% of their DNA with bananas", truth: true, source: "https://www.genome.gov/genetics-glossary/Homologous" },
                { text: "Glass is actually a liquid that flows very slowly", truth: false },
                { text: "Your stomach lining completely replaces itself every few days", truth: true, source: "https://www.ncbi.nlm.nih.gov/books/NBK534791/" }
            ]
        },
        {
            statements: [
                { text: "There's enough DNA in your body to stretch from the Sun to Pluto and back 17 times", truth: true, source: "https://www.sciencefocus.com/the-human-body/how-long-is-your-dna" },
                { text: "Venus is the only planet that spins clockwise", truth: false },
                { text: "Water can boil and freeze at the same time at the 'triple point'", truth: true, source: "https://www.scientificamerican.com/article/how-can-water-boil-and-fr/" }
            ]
        },
        {
            statements: [
                { text: "Honey is the only food that doesn't spoil", truth: true, source: "https://www.smithsonianmag.com/science-nature/the-science-behind-honeys-eternal-shelf-life-1218690/" },
                { text: "The human brain uses 20% of the body's total energy", truth: true, source: "https://www.brainfacts.org/brain-anatomy-and-function/anatomy/2019/how-much-energy-does-the-brain-use-020119" },
                { text: "Humans only use 10% of their brain capacity", truth: false }
            ]
        },
        {
            statements: [
                { text: "A day on Venus is longer than a year on Venus", truth: true, source: "https://www.nasa.gov/venus" },
                { text: "Diamonds can be made from peanut butter", truth: true, source: "https://www.bbc.com/future/article/20131106-the-man-who-makes-diamond-from-peanut-butter" },
                { text: "The Great Wall of China is visible from space with the naked eye", truth: false }
            ]
        },
        {
            statements: [
                { text: "Clouds can weigh over a million pounds", truth: true, source: "https://www.usgs.gov/special-topics/water-science-school/science/how-much-does-a-cloud-weigh" },
                { text: "There's a species of jellyfish that is biologically immortal", truth: true, source: "https://www.amnh.org/explore/news-blogs/on-exhibit-posts/the-immortal-jellyfish" },
                { text: "Goldfish have a 3-second memory", truth: false }
            ]
        },
        {
            statements: [
                { text: "Astronauts grow taller in space due to spinal decompression", truth: true, source: "https://www.nasa.gov/hrp/bodyinspace" },
                { text: "It rains diamonds on Saturn and Jupiter", truth: true, source: "https://www.bbc.com/news/science-environment-24477667" },
                { text: "The Sun is yellow when viewed from space", truth: false }
            ]
        },
        {
            statements: [
                { text: "Helium can become a superfluid that defies gravity", truth: true, source: "https://www.scientificamerican.com/article/superfluid-helium-escapes-its-container/" },
                { text: "Your body produces enough heat in 30 minutes to boil half a gallon of water", truth: true, source: "https://www.discovermagazine.com/the-sciences/20-things-you-didnt-know-about-body-heat" },
                { text: "Electrons are the smallest particles in the universe", truth: false }
            ]
        },
        {
            statements: [
                { text: "There's a planet made largely of diamonds twice the size of Earth", truth: true, source: "https://www.space.com/18011-super-earth-planet-diamond-world.html" },
                { text: "Photons from the Sun take 8 minutes to reach Earth but 100,000 years to escape the Sun", truth: true, source: "https://sunearthday.nasa.gov/2007/locations/ttt_sunlight.php" },
                { text: "Black holes are completely empty voids in space", truth: false }
            ]
        }
    ],

    history: [
        {
            statements: [
                { text: "Cleopatra lived closer in time to the Moon landing than to the building of the Great Pyramid", truth: true, source: "https://www.history.com/news/cleopatra-facts" },
                { text: "Oxford University is older than the Aztec Empire", truth: true, source: "https://www.ox.ac.uk/about/organisation/history" },
                { text: "Napoleon was unusually short for his time at 5'2\"", truth: false }
            ]
        },
        {
            statements: [
                { text: "The shortest war in history lasted only 38 minutes", truth: true, source: "https://www.britannica.com/event/Anglo-Zanzibar-War" },
                { text: "Vikings used to give kittens to new brides as wedding gifts", truth: true, source: "https://www.nationalgeographic.com/history/article/vikings-cats-clues-migration" },
                { text: "Medieval people thought the Earth was flat", truth: false }
            ]
        },
        {
            statements: [
                { text: "Ancient Romans used crushed mouse brains as toothpaste", truth: true, source: "https://www.smithsonianmag.com/smart-news/brief-history-toothpaste-180954469/" },
                { text: "Forks were once considered scandalously sinful by the Catholic Church", truth: true, source: "https://www.atlasobscura.com/articles/the-fork-that-scandalized-the-medieval-church" },
                { text: "The pyramids were built by slaves", truth: false }
            ]
        },
        {
            statements: [
                { text: "Abraham Lincoln is in the Wrestling Hall of Fame", truth: true, source: "https://nwhof.org/hall_of_fame/bio/2106" },
                { text: "Turkeys were once worshipped as gods by the Mayan people", truth: true, source: "https://www.smithsonianmag.com/science-nature/surprising-history-turkeys-180957310/" },
                { text: "Einstein failed math as a child", truth: false }
            ]
        },
        {
            statements: [
                { text: "A pig was once executed in France for murdering a child", truth: true, source: "https://www.theatlantic.com/technology/archive/2013/09/when-animals-were-put-on-trial/279628/" },
                { text: "Carrots being good for eyesight was WW2 British propaganda", truth: true, source: "https://www.smithsonianmag.com/arts-culture/a-wwii-propaganda-campaign-popularized-the-myth-that-carrots-help-you-see-in-the-dark-28812484/" },
                { text: "Thomas Edison invented the light bulb from scratch", truth: false }
            ]
        },
        {
            statements: [
                { text: "Ancient Egyptians used slabs of stone as pillows", truth: true, source: "https://www.metmuseum.org/art/collection/search/544229" },
                { text: "The Colosseum in Rome had a retractable roof made of sailcloth", truth: true, source: "https://www.britannica.com/topic/Colosseum" },
                { text: "Christopher Columbus discovered that the Earth was round", truth: false }
            ]
        },
        {
            statements: [
                { text: "In 1932, Australia lost a war against emus", truth: true, source: "https://www.australiangeographic.com.au/topics/wildlife/2016/10/the-great-emu-war/" },
                { text: "Ancient Greeks exercised naked at the gymnasium", truth: true, source: "https://www.britannica.com/sports/gymnasium-ancient-Greek-athletic-school" },
                { text: "George Washington had wooden teeth", truth: false }
            ]
        },
        {
            statements: [
                { text: "A molasses flood killed 21 people in Boston in 1919", truth: true, source: "https://www.history.com/news/the-great-boston-molasses-flood" },
                { text: "Ketchup was sold as medicine in the 1830s", truth: true, source: "https://www.smithsonianmag.com/smart-news/the-ketchup-that-was-once-a-medicine-180949680/" },
                { text: "Cowboys typically wore ten-gallon hats", truth: false }
            ]
        },
        {
            statements: [
                { text: "The dancing plague of 1518 caused hundreds of people to dance uncontrollably for days", truth: true, source: "https://www.history.com/news/what-was-the-dancing-plague-of-1518" },
                { text: "Pope Gregory IX declared cats were instruments of Satan", truth: true, source: "https://www.medievalists.net/2013/03/how-cats-survived-the-middle-ages/" },
                { text: "Vikings wore horned helmets into battle", truth: false }
            ]
        },
        {
            statements: [
                { text: "The Eiffel Tower was originally meant to be dismantled after 20 years", truth: true, source: "https://www.toureiffel.paris/en/the-monument/history" },
                { text: "Gladiators in Rome were often vegetarian", truth: true, source: "https://www.archaeology.org/issues/145-1411/features/2523-gladiator-diet" },
                { text: "The Salem witch trials burned witches at the stake", truth: false }
            ]
        }
    ],

    food: [
        {
            statements: [
                { text: "Apples, pears, and cherries are all part of the rose family", truth: true, source: "https://www.britannica.com/plant/Rosaceae" },
                { text: "Peanuts are not actually nuts - they're legumes", truth: true, source: "https://www.britannica.com/plant/peanut" },
                { text: "White chocolate is called chocolate because it contains cocoa butter", truth: false }
            ]
        },
        {
            statements: [
                { text: "Cucumbers are 96% water - more than watermelon", truth: true, source: "https://www.usda.gov/media/blog/2013/06/27/whats-cucumber" },
                { text: "Arachibutyrophobia is the fear of peanut butter sticking to the roof of your mouth", truth: true, source: "https://www.merriam-webster.com/dictionary/arachibutyrophobia" },
                { text: "Carrots were originally purple before being bred orange", truth: false }
            ]
        },
        {
            statements: [
                { text: "Ranch dressing is dyed with titanium dioxide, the same ingredient in sunscreen", truth: true, source: "https://www.fda.gov/food/food-additives-petitions/titanium-dioxide" },
                { text: "Cashews grow on the bottom of a fruit called a cashew apple", truth: true, source: "https://www.britannica.com/plant/cashew" },
                { text: "Bananas are technically berries but strawberries are not", truth: true }
            ]
        },
        {
            statements: [
                { text: "Nutmeg is poisonous if consumed in large quantities", truth: true, source: "https://www.poison.org/articles/nutmeg-164" },
                { text: "Ketchup was sold as medicine in the 1830s", truth: true, source: "https://www.smithsonianmag.com/smart-news/the-ketchup-that-was-once-a-medicine-180949680/" },
                { text: "Twinkies have an indefinite shelf life", truth: false }
            ]
        },
        {
            statements: [
                { text: "Honey is essentially bee vomit", truth: true, source: "https://www.britannica.com/story/is-honey-bee-vomit" },
                { text: "Almonds are members of the peach family", truth: true, source: "https://www.britannica.com/plant/almond" },
                { text: "Sushi means 'raw fish' in Japanese", truth: false }
            ]
        },
        {
            statements: [
                { text: "Worcestershire sauce is made from fermented anchovies", truth: true, source: "https://www.leaperrins.com/our-story" },
                { text: "Ripe cranberries bounce like rubber balls", truth: true, source: "https://www.oceanspray.com/About/History" },
                { text: "Fortune cookies were invented in China", truth: false }
            ]
        },
        {
            statements: [
                { text: "The red food dye carmine is made from crushed beetles", truth: true, source: "https://www.fda.gov/industry/color-additive-inventories/color-additive-status-list" },
                { text: "Cheese is the most stolen food in the world", truth: true, source: "https://time.com/4082629/the-most-stolen-food-item-in-the-world/" },
                { text: "Tomatoes are native to Italy", truth: false }
            ]
        },
        {
            statements: [
                { text: "One strand of spaghetti is called a 'spaghetto'", truth: true, source: "https://www.merriam-webster.com/dictionary/spaghetti" },
                { text: "Pineapples take about two years to grow", truth: true, source: "https://www.dole.com/pineapple-facts" },
                { text: "Caesar salad was named after Julius Caesar", truth: false }
            ]
        },
        {
            statements: [
                { text: "Lobsters were once considered 'poverty food' and fed to prisoners", truth: true, source: "https://www.history.com/news/a-taste-of-lobster-history" },
                { text: "The holes in Swiss cheese are caused by bacteria releasing gas", truth: true, source: "https://www.smithsonianmag.com/smart-news/were-finally-close-knowing-what-causes-holes-swiss-cheese-180955443/" },
                { text: "Chocolate is poisonous to dogs because they lack the enzyme to digest it", truth: false }
            ]
        },
        {
            statements: [
                { text: "Vanilla flavoring sometimes comes from beaver gland secretions", truth: true, source: "https://www.nationalgeographic.com/animals/article/beaver-butt-goo-vanilla-flavoring" },
                { text: "Grapes explode when microwaved due to plasma formation", truth: true, source: "https://www.pnas.org/doi/10.1073/pnas.1818350116" },
                { text: "Coffee beans are actually beans", truth: false }
            ]
        }
    ],

    human_body: [
        {
            statements: [
                { text: "Your nose can detect over 1 trillion different scents", truth: true, source: "https://www.science.org/doi/10.1126/science.1249168" },
                { text: "Humans are the only animals that blush", truth: true, source: "https://www.scientificamerican.com/article/why-do-we-blush/" },
                { text: "Humans have five senses", truth: false }
            ]
        },
        {
            statements: [
                { text: "Your brain uses the same amount of power as a 10-watt light bulb", truth: true, source: "https://www.scientificamerican.com/article/thinking-hard-calories/" },
                { text: "Babies are born with about 300 bones but adults have only 206", truth: true, source: "https://www.livescience.com/how-many-bones-do-babies-have" },
                { text: "Your fingernails and hair continue growing after you die", truth: false }
            ]
        },
        {
            statements: [
                { text: "The human body contains enough carbon to make 900 pencils", truth: true, source: "https://www.bbc.co.uk/programmes/articles/4yLCjWPG17qJyN6BwLBjhY1/what-is-the-human-body-made-of" },
                { text: "Your stomach acid is strong enough to dissolve razor blades", truth: true, source: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4991872/" },
                { text: "Blood is blue inside your body and turns red when exposed to oxygen", truth: false }
            ]
        },
        {
            statements: [
                { text: "Humans are bioluminescent, but the light is too dim to see", truth: true, source: "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0006256" },
                { text: "The acid in your stomach is completely replaced every few days", truth: true, source: "https://www.ncbi.nlm.nih.gov/books/NBK534791/" },
                { text: "You lose most of your body heat through your head", truth: false }
            ]
        },
        {
            statements: [
                { text: "Humans share 50% of their DNA with bananas", truth: true, source: "https://www.genome.gov/genetics-glossary/Homologous" },
                { text: "Your eyes can distinguish about 10 million different colors", truth: true, source: "https://www.pantone.com/articles/color-fundamentals/how-do-we-see-color" },
                { text: "Cracking your knuckles causes arthritis", truth: false }
            ]
        },
        {
            statements: [
                { text: "The human body has enough iron to make a 3-inch nail", truth: true, source: "https://www.usgs.gov/faqs/how-much-iron-human-body" },
                { text: "You produce about a liter of saliva per day", truth: true, source: "https://www.ncbi.nlm.nih.gov/books/NBK538511/" },
                { text: "Eating before swimming causes cramps", truth: false }
            ]
        },
        {
            statements: [
                { text: "Your small intestine is about 20 feet long", truth: true, source: "https://www.ncbi.nlm.nih.gov/books/NBK459366/" },
                { text: "Human teeth are just as strong as shark teeth", truth: true, source: "https://www.nature.com/articles/nature.2012.11440" },
                { text: "Shaving makes hair grow back thicker", truth: false }
            ]
        },
        {
            statements: [
                { text: "The cornea is the only part of the body with no blood supply", truth: true, source: "https://www.nei.nih.gov/learn-about-eye-health/healthy-vision/how-eyes-work" },
                { text: "Humans are the only mammals that can't swallow and breathe simultaneously", truth: true, source: "https://www.nature.com/scitable/blog/cognoculture/humans_are_unique_among_mammals/" },
                { text: "Reading in dim light damages your eyesight", truth: false }
            ]
        },
        {
            statements: [
                { text: "Your body contains about 37.2 trillion cells", truth: true, source: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4991869/" },
                { text: "The tongue is the strongest muscle in the body relative to its size", truth: true, source: "https://www.loc.gov/everyday-mysteries/item/is-the-tongue-the-strongest-muscle-in-the-body/" },
                { text: "We only use 10% of our brain", truth: false }
            ]
        },
        {
            statements: [
                { text: "Humans glow in the dark, but our eyes can't detect it", truth: true, source: "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0006256" },
                { text: "Your heartbeat syncs to the rhythm of music you're listening to", truth: true, source: "https://www.frontiersin.org/articles/10.3389/fpsyg.2015.01132/full" },
                { text: "Sugar makes children hyperactive", truth: false }
            ]
        }
    ],

    geography: [
        {
            statements: [
                { text: "Canada has more lakes than all other countries combined", truth: true, source: "https://www.canada.ca/en/environment-climate-change/services/water-overview/quantity/lakes.html" },
                { text: "Russia has a larger surface area than Pluto", truth: true, source: "https://www.nasa.gov/feature/new-horizons-spacecraft-displays-pluto-s-big-heart-0" },
                { text: "Mount Everest is the tallest mountain in the world", truth: false }
            ]
        },
        {
            statements: [
                { text: "There's a town in Norway called 'Hell' and it freezes over every winter", truth: true, source: "https://www.atlasobscura.com/places/hell-norway" },
                { text: "Australia is wider than the Moon", truth: true, source: "https://www.ga.gov.au/scientific-topics/national-location-information/dimensions/australias-size-compared" },
                { text: "The Amazon Rainforest produces 20% of the world's oxygen", truth: false }
            ]
        },
        {
            statements: [
                { text: "There's a lake in Australia that's bright pink", truth: true, source: "https://www.australiangeographic.com.au/topics/science-environment/2016/12/lake-hillier-australias-pink-lake/" },
                { text: "Istanbul is the only city located on two continents", truth: false },
                { text: "The driest place on Earth is in Antarctica, not a desert", truth: true, source: "https://www.nasa.gov/feature/goddard/nasa-study-shows-antarctica-is-the-driest-continent-on-earth" }
            ]
        },
        {
            statements: [
                { text: "Maine is the closest US state to Africa", truth: true, source: "https://www.usgs.gov/faqs/what-closest-point-united-states-africa" },
                { text: "Vatican City has the highest crime rate per capita in the world", truth: true, source: "https://www.economist.com/graphic-detail/2019/01/04/what-is-the-worlds-most-crime-ridden-country" },
                { text: "China only has one time zone despite spanning five", truth: true }
            ]
        },
        {
            statements: [
                { text: "There's a bridge between Denmark and Sweden that turns into a tunnel", truth: true, source: "https://www.oresundsbron.com/en/our-bridge" },
                { text: "More people live inside this circle (centered on Asia) than outside it", truth: true, source: "https://www.visualcapitalist.com/mapped-global-population-density/" },
                { text: "The Sahara Desert is the largest desert in the world", truth: false }
            ]
        },
        {
            statements: [
                { text: "San Marino is completely surrounded by Italy and has no airports", truth: true, source: "https://www.britannica.com/place/San-Marino" },
                { text: "There are vending machines on Mt. Fuji near the summit", truth: true, source: "https://www.japantimes.co.jp/life/2018/08/11/travel/fuji-vending-machine/" },
                { text: "Alaska is the westernmost, easternmost, and northernmost US state", truth: true }
            ]
        },
        {
            statements: [
                { text: "The shortest scheduled flight in the world lasts 57 seconds", truth: true, source: "https://www.guinnessworldrecords.com/world-records/shortest-scheduled-passenger-flight" },
                { text: "Monaco is smaller than Central Park in New York", truth: true, source: "https://www.britannica.com/place/Monaco" },
                { text: "The Great Wall of China can be seen from the Moon", truth: false }
            ]
        },
        {
            statements: [
                { text: "Lesotho is entirely surrounded by South Africa", truth: true, source: "https://www.britannica.com/place/Lesotho" },
                { text: "There's a town in Canada called 'Dildo'", truth: true, source: "https://www.townofdilidoprovision.ca/" },
                { text: "Mount Kilimanjaro is in Kenya", truth: false }
            ]
        },
        {
            statements: [
                { text: "France has the most time zones of any country (12)", truth: true, source: "https://www.britannica.com/topic/international-date-line" },
                { text: "Liechtenstein and Uzbekistan are the only double-landlocked countries", truth: true, source: "https://www.britannica.com/topic/landlocked-country" },
                { text: "Holland and the Netherlands are different countries", truth: false }
            ]
        },
        {
            statements: [
                { text: "The Dead Sea is so salty you can float without trying", truth: true, source: "https://www.britannica.com/place/Dead-Sea" },
                { text: "There's a river in Colombia with five colors called 'Rainbow River'", truth: true, source: "https://www.nationalgeographic.com/travel/article/colombias-five-color-river-draws-tourists" },
                { text: "Africa is a country with 54 states", truth: false }
            ]
        }
    ],

    technology: [
        {
            statements: [
                { text: "The first computer mouse was made of wood", truth: true, source: "https://www.computerhistory.org/revolution/input-output/14/350" },
                { text: "The QWERTY keyboard was designed to slow typists down", truth: true, source: "https://www.smithsonianmag.com/arts-culture/fact-of-fiction-the-legend-of-the-qwerty-keyboard-49863249/" },
                { text: "The first email was sent in 1995", truth: false }
            ]
        },
        {
            statements: [
                { text: "The first 1GB hard drive weighed 550 pounds and cost $40,000", truth: true, source: "https://www.computerhistory.org/timeline/memory-storage/" },
                { text: "More people in the world have mobile phones than toilets", truth: true, source: "https://www.un.org/development/desa/en/news/population/world-population-day-2017.html" },
                { text: "The @ symbol was invented for email", truth: false }
            ]
        },
        {
            statements: [
                { text: "Nintendo was founded in 1889 as a playing card company", truth: true, source: "https://www.nintendo.co.uk/Corporate/Nintendo-History/Nintendo-History-625945.html" },
                { text: "The first website is still online today", truth: true, source: "http://info.cern.ch/hypertext/WWW/TheProject.html" },
                { text: "The World Wide Web and the internet are the same thing", truth: false }
            ]
        },
        {
            statements: [
                { text: "Russia built a computer that ran on water in 1936", truth: true, source: "https://www.computerhistory.org/timeline/computers/" },
                { text: "The moon landing computers had less processing power than a modern calculator", truth: true, source: "https://www.computerweekly.com/feature/Apollo-11-The-computers-that-put-man-on-the-moon" },
                { text: "WiFi stands for 'Wireless Fidelity'", truth: false }
            ]
        },
        {
            statements: [
                { text: "The inventor of the Pringles can is buried in one", truth: true, source: "https://www.npr.org/templates/story/story.php?storyId=104858485" },
                { text: "Amazon's first book sold was in 1995", truth: true, source: "https://www.aboutamazon.com/our-company" },
                { text: "The first computer virus was created by hackers", truth: false }
            ]
        },
        {
            statements: [
                { text: "Google's first storage was made of LEGO bricks", truth: true, source: "https://www.google.com/about/our-story/" },
                { text: "The PlayStation was originally going to be a Nintendo product", truth: true, source: "https://www.theguardian.com/technology/2014/sep/23/how-nintendo-turned-playstation-sony" },
                { text: "The first smartphone was released by Apple", truth: false }
            ]
        },
        {
            statements: [
                { text: "The first alarm clock could only ring at 4 AM", truth: true, source: "https://www.smithsonianmag.com/innovation/who-invented-alarm-clock-180949719/" },
                { text: "A 'jiffy' is an actual unit of time in computing (1/100th of a second)", truth: true, source: "https://www.dictionary.com/browse/jiffy" },
                { text: "Bluetooth is named after a Danish king", truth: true }
            ]
        },
        {
            statements: [
                { text: "Samsung started as a noodle shop in 1938", truth: true, source: "https://www.samsung.com/global/ir/company-info/overview/" },
                { text: "The first webcam was invented to monitor a coffee pot", truth: true, source: "https://www.bbc.com/news/technology-20439301" },
                { text: "HTML is a programming language", truth: false }
            ]
        },
        {
            statements: [
                { text: "The original iPhone didn't have copy and paste functionality", truth: true, source: "https://www.wired.com/2007/01/apple-phone-does-not-have-copy-and-paste/" },
                { text: "There are more possible iterations of a chess game than atoms in the observable universe", truth: true, source: "https://www.sciencealert.com/chess-game-combinations-observable-universe-atoms" },
                { text: "5G causes health problems according to scientific studies", truth: false }
            ]
        },
        {
            statements: [
                { text: "The Firefox logo doesn't actually feature a fox - it's a red panda", truth: true, source: "https://blog.mozilla.org/opendesign/why-did-the-fox-change-color/" },
                { text: "Email existed before the World Wide Web", truth: true, source: "https://www.computerhistory.org/internethistory/1970s/" },
                { text: "Clearing your browser history deletes all traces of your activity", truth: false }
            ]
        }
    ],

    pop_culture: [
        {
            statements: [
                { text: "The voice actor for Mickey Mouse married the voice actor for Minnie Mouse", truth: true, source: "https://www.snopes.com/fact-check/mickey-and-minnie/" },
                { text: "The Beatles have more #1 songs in the UK than any other artist", truth: true, source: "https://www.officialcharts.com/chart-news/the-acts-with-the-most-number-1-singles-on-the-official-uk-chart/" },
                { text: "The 'Jaws' theme was originally intended to have lyrics", truth: false }
            ]
        },
        {
            statements: [
                { text: "The chainsaw was invented to help with childbirth", truth: true, source: "https://www.businessinsider.com/chainsaws-were-originally-invented-for-helping-childbirth-2018-6" },
                { text: "Mr. Rogers was a Navy SEAL before becoming a TV host", truth: false },
                { text: "The Mona Lisa was once stolen and kept in an apartment for 2 years", truth: true, source: "https://www.smithsonianmag.com/arts-culture/how-mona-lisa-became-a-celebrity-180964129/" }
            ]
        },
        {
            statements: [
                { text: "James Avery (Uncle Phil) was the voice of Shredder in Ninja Turtles", truth: true, source: "https://www.imdb.com/name/nm0002190/" },
                { text: "IKEA is an acronym that includes the founder's initials and childhood farm", truth: true, source: "https://www.ikea.com/us/en/this-is-ikea/about-us/the-ikea-vision-and-values-pub9aa779d0" },
                { text: "Walt Disney was cryogenically frozen after his death", truth: false }
            ]
        },
        {
            statements: [
                { text: "The actors who voiced Mickey and Minnie Mouse were married in real life", truth: true, source: "https://www.snopes.com/fact-check/mickey-and-minnie/" },
                { text: "Bubble wrap was originally invented as wallpaper", truth: true, source: "https://www.smithsonianmag.com/innovation/bubble-wrap-180964325/" },
                { text: "The hashtag symbol is officially called an 'octothorpe'", truth: true }
            ]
        },
        {
            statements: [
                { text: "Adidas and Puma were started by two feuding brothers", truth: true, source: "https://www.businessinsider.com/adidas-and-puma-founding-story-2018-10" },
                { text: "The first YouTube video was about elephants at a zoo", truth: true, source: "https://www.youtube.com/watch?v=jNQXAC9IVRw" },
                { text: "The Simpsons predicted 9/11", truth: false }
            ]
        },
        {
            statements: [
                { text: "Barbie's full name is Barbara Millicent Roberts", truth: true, source: "https://www.mattel.com/blogs/barbie/meet-barbie" },
                { text: "The Hollywood sign originally said 'Hollywoodland'", truth: true, source: "https://www.hollywoodsign.org/history/" },
                { text: "The 'Mona Lisa' has always been famous throughout history", truth: false }
            ]
        },
        {
            statements: [
                { text: "The word 'nerd' was first coined by Dr. Seuss", truth: true, source: "https://www.merriam-webster.com/words-at-play/the-uncertain-origins-of-the-word-nerd" },
                { text: "Monopoly was originally created to demonstrate the evils of capitalism", truth: true, source: "https://www.bbc.com/worklife/article/20170728-the-hidden-economics-of-monopoly" },
                { text: "The first James Bond movie featured Sean Connery", truth: true }
            ]
        },
        {
            statements: [
                { text: "The Pac-Man character was inspired by a pizza with a slice missing", truth: true, source: "https://www.wired.com/2010/05/pac-man-pizza/" },
                { text: "Play-Doh was originally designed as a wallpaper cleaner", truth: true, source: "https://www.smithsonianmag.com/innovation/brief-history-play-doh-180954914/" },
                { text: "SpongeBob SquarePants lives in a pineapple because sponges absorb juice", truth: false }
            ]
        },
        {
            statements: [
                { text: "The guy who voiced Bugs Bunny was allergic to carrots", truth: true, source: "https://www.mentalfloss.com/article/18044/quick-7-7-facts-about-carrots" },
                { text: "Froot Loops are all the same flavor despite different colors", truth: true, source: "https://time.com/3981331/kelloggs-froot-loops-same-flavor/" },
                { text: "The Michelin Star restaurant rating is unrelated to the tire company", truth: false }
            ]
        },
        {
            statements: [
                { text: "The Simpsons holds the record for the most celebrity guest appearances in a TV show", truth: true, source: "https://www.guinnessworldrecords.com/world-records/most-celebrity-guest-appearances-in-a-tv-series" },
                { text: "The Twitter bird has a name: Larry (named after Larry Bird)", truth: true, source: "https://www.businessinsider.com/twitter-bird-name-larry-2012-3" },
                { text: "Marilyn Monroe wore a size 16 dress by today's standards", truth: false }
            ]
        }
    ],

    space: [
        {
            statements: [
                { text: "A day on Mercury is longer than its year", truth: true, source: "https://www.nasa.gov/mercury" },
                { text: "There's a planet where it rains glass sideways", truth: true, source: "https://www.nasa.gov/mission_pages/hubble/science/hd-189733b.html" },
                { text: "The Sun is the largest star in the universe", truth: false }
            ]
        },
        {
            statements: [
                { text: "Neutron stars are so dense that a teaspoon would weigh 6 billion tons", truth: true, source: "https://www.nasa.gov/mission_pages/GLAST/science/neutron_stars.html" },
                { text: "There are more stars in the universe than grains of sand on Earth", truth: true, source: "https://www.universetoday.com/106725/are-there-more-grains-of-sand-than-stars/" },
                { text: "The Moon is slowly moving closer to Earth", truth: false }
            ]
        },
        {
            statements: [
                { text: "Olympus Mons on Mars is so tall, you can't see the base from the top", truth: true, source: "https://www.nasa.gov/feature/goddard/olympus-mons-mars-shield-volcano" },
                { text: "You could fit all other planets between Earth and the Moon", truth: true, source: "https://www.universetoday.com/115672/you-could-fit-all-the-planets-between-the-earth-and-the-moon/" },
                { text: "The dark side of the Moon is always dark", truth: false }
            ]
        },
        {
            statements: [
                { text: "There's a giant cloud of alcohol in space (enough to fill 400 trillion pints)", truth: true, source: "https://www.nasa.gov/vision/universe/starsgalaxies/alcohol_in_space.html" },
                { text: "Space is completely silent because there's no air to carry sound", truth: true, source: "https://www.nasa.gov/vision/universe/features/halloween_sounds.html" },
                { text: "Astronauts have never grown anything in space", truth: false }
            ]
        },
        {
            statements: [
                { text: "Venus has more volcanoes than any other planet in our solar system", truth: true, source: "https://www.nasa.gov/venus" },
                { text: "The footprints on the Moon will likely stay there for 100 million years", truth: true, source: "https://www.nasa.gov/mission_pages/apollo/missions/apollo11.html" },
                { text: "There is no gravity in space", truth: false }
            ]
        },
        {
            statements: [
                { text: "Saturn would float if you could find a bathtub big enough", truth: true, source: "https://www.nasa.gov/saturn" },
                { text: "The largest known star would take a plane 1,100 years to circle", truth: true, source: "https://www.nasa.gov/mission_pages/hubble/science/largest-star.html" },
                { text: "Black holes are holes in space", truth: false }
            ]
        },
        {
            statements: [
                { text: "There's a planet made of diamond twice the size of Earth", truth: true, source: "https://www.space.com/18011-super-earth-planet-diamond-world.html" },
                { text: "Astronauts' height increases in space due to spine decompression", truth: true, source: "https://www.nasa.gov/hrp/bodyinspace" },
                { text: "Mars is the closest planet to Earth", truth: false }
            ]
        },
        {
            statements: [
                { text: "A year on Pluto is 248 Earth years", truth: true, source: "https://www.nasa.gov/pluto" },
                { text: "The Great Red Spot on Jupiter is a storm that's lasted over 300 years", truth: true, source: "https://www.nasa.gov/feature/goddard/jupiter-s-great-red-spot-a-swirling-mystery" },
                { text: "Pluto was reclassified as a planet again in 2020", truth: false }
            ]
        },
        {
            statements: [
                { text: "One day on Venus is longer than one year on Venus", truth: true, source: "https://www.nasa.gov/venus" },
                { text: "The Voyager 1 spacecraft is the farthest human-made object from Earth", truth: true, source: "https://voyager.jpl.nasa.gov/mission/status/" },
                { text: "Shooting stars are actually stars falling from the sky", truth: false }
            ]
        },
        {
            statements: [
                { text: "Sunsets on Mars appear blue", truth: true, source: "https://www.nasa.gov/feature/jpl/what-does-a-sunrise-sunset-look-like-on-mars" },
                { text: "There's a hexagonal storm at Saturn's north pole", truth: true, source: "https://www.nasa.gov/feature/jpl/cassini-examines-saturn-hexagon-as-winter-arrives" },
                { text: "Light travels instantaneously through space", truth: false }
            ]
        }
    ]
};

/**
 * Get all available topics
 */
function getTopics() {
    return Object.keys(FACTS_DATABASE).map(key => ({
        id: key,
        name: key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    }));
}

/**
 * Get random fact sets for a specific topic
 */
function getFactsForTopic(topicId, count = 10) {
    const topicFacts = FACTS_DATABASE[topicId];
    if (!topicFacts) return [];

    // Shuffle and return requested number
    const shuffled = [...topicFacts].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, shuffled.length));
}

/**
 * Get random fact sets from all topics (mixed mode)
 */
function getMixedFacts(count = 10) {
    const allFacts = [];
    Object.values(FACTS_DATABASE).forEach(topicFacts => {
        allFacts.push(...topicFacts);
    });

    const shuffled = allFacts.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, shuffled.length));
}
