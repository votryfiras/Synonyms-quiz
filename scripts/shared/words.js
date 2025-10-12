const WORDS = [
  {
    word: "buy",
    def: ["to get something by giving money for it"],
    syns: [
      {
        word: "purchase",
        def: ["To buy something.", "something that you buy."],
        languageLevel: "B2",
        examples: ["Tickets must be purchased two weeks in advance.", "the illegal purchase of guns", "something that you buy."],
        additionalSyns: ["pick up", "take", "secure", "come by", "grip", "attachment", "hold"],
      },
      {
        word: "acquire",
        def: ["to get something.", "to learn something."],
        languageLevel: "B2",
        examples: ["I managed to acquire a copy of the report.", "His family acquired (= bought) the property in 1985.", "to acquire knowledge/skill"],
        additionalSyns: ["get", "receive", "gain", "earn", "come by"],
      },
      {
        word: "obtain",
        def: ["to get something"],
        languageLevel: "B2",
        examples: ["to obtain permission", "He obtained a law degree from the University of California."],
        additionalSyns: ["get", "gain", "earn", "derive", "pick up", "secure"],
      },
      {
        word: "get",
        def: ["to receive somthing"],
        languageLevel: "A1",
        examples: ["I got a call from Dave this morning."],
        additionalSyns: ["receive", "gain", "earn", "win", "collect", "pick up", "gather", "grab"],
      },
    ],
    languageLevel: "A1",
    examples: ["Eventually she had saved enough money to buy a small car.", "He bought his mother some flowers/He bought some flowers for his mother.", "There are more people buying at this time of the year so prices are high.", "The company was set up to buy and sell shares on behalf of investors.", "I bought my camera from a friend of mine."],
  },

  {
    word: "basin",
    def: ["an open, round container shaped like a bowl with sloping sides, used for holding food or liquid", "a large, open bowl, or the amount such a container will hold"],
    syns: [
      {
        word: "bowl",
        def: ["a round, deep dish used for holding soup and other food."],
        languageLevel: "A2",
        examples: ["a bowl of rice/soup", "Put the chocolate, butter, and egg in a bowl and mix them all together.", "Combine nuts, sugar, and orange peel in a small bowl.", "I gave him a bowl of ice cream which he soon polished off.", "He emerged from the kitchen with a steaming bowl of soup.", "I was just about to tuck into a huge bowl of pasta."],
        additionalSyns: ["plate", "pot", "crock", "pan"],
      },
      {
        word: "dish",
        def: ["a curved container for eating or serving food from.", "food that is prepared in a particular way as part of a meal."],
        languageLevel: "A2",
        examples: ["a baking/serving dish", "Place alternate layers of pasta and meat sauce in a heatproof dish."],
        additionalSyns: ["plate", "platter", "salver"],
      },
      {
        word: "container",
        def: ["an object such as a box or a bottle that is used for holding something"],
        languageLevel: "B2",
        examples: ["a plastic container", "Food will last longer if kept in an airtight container.", " These women carry heavy containers of water over long distances."],
        additionalSyns: ["receptacle", "vessel", "holder", "repository", "canister", "box"],
      },
    ],
    languageLevel: "B1",
    examples: ["Run some water into the basin and wash your hands and face properly.", "When you have broken the eggs into a basin, whisk them together lightly with a fork.", "The basin in the upstairs bathroom has gold taps! …eaning fluids under the basin in the back toilet.", "In the auction there is a rather nice antique porcelain basin and jug.", "I left the napkins soaking in a basin."],
  },

  {
    word: "pollution",
    def: ["Damage caused to water, air, etc. by harmful substances or waste."],
    languageLevel: "B1",
    examples: ["The book shows simple things you can do to reduce pollution from your car.", "the level of pollution in the air is rising", "the companies that cause pollution should pay for the damage", "As industrial production has fallen so have associated negative externalities, leading to reductions in air, water, soil, and noise pollution."],
    syns: [
      {
        word: "carbon footprint",
        def: ["a measure of the amount of carbon dioxide released into the atmosphere as a result of the activities of a particular individual, organization, or community."],
        languageLevel: "B2",
        examples: ["The four main areas that determine your carbon foo…tural gas usage, car mileage, and airplane trips.", "We have partnered with nearby farms, hoping to reduce the carbon footprint of our delivery trucks."],
        additionalSyns: [],
      },
      {
        word: "dirtying",
        def: ["to make something dirty."],
        languageLevel: "N/A",
        examples: ["The four main areas that determine your carbon foo…tural gas usage, car mileage, and airplane trips.", "We have partnered with nearby farms, hoping to reduce the carbon footprint of our delivery trucks."],
        additionalSyns: [],
      },
      {
        word: "contamination",
        def: ["the process or fact of making a substance or place dirty or no longer pure by adding a substance that is dangerous or carries disease.", "the act of influencing people's ideas or attitudes in a bad way"],
        languageLevel: "C1",
        examples: ["radioactive contamination.", "Environmental contamination resulting from human activities is a major health concern."],
        additionalSyns: [],
      },
    ],
  },

  {
    word: "conserve",
    def: ["protect (something, especially something of environmental or cultural importance) from harm or destruction."],
    syns: [
      {
        word: "preserve",
        def: ["To keep something the same or prevent it from being damaged or destroyed"],
        languageLevel: "B2",
        examples: ["To preserve the environment", "To preserve peace", "I need to get out of the house from time to time just to preserve (= prevent me from losing) my mental health."],
        additionalSyns: ["protect", "maintain", "save", "safeguard", "keep"],
      },
    ],
    languageLevel: "C1",
    examples: ["To conserve electricity, we are cutting down on our heating.", "The nationalists are very eager to conserve their customs and language.", "I'm not being lazy - I'm just conserving my energy/strength for later."],
  },

  {
    word: "consume",
    def: ["to use fuel, energy, time, or a product, especially in large amounts", "to eat or drink something"],
    syns: [
      {
        word: "eat",
        def: ["to put food in your mouth, bite it and swallow it", "to have a meal"],
        languageLevel: "A1",
        examples: ["I was too nervous to eat", "to eat well/healthily", "to eat breakfast/lunch/dinner", "Where shall we eat tonight?", "We ate at a pizzeria.", "I never eat in the school cafeteria."],
        additionalSyns: ["ingest"],
      },
      {
        word: "devour",
        def: ["to eat all of something quickly, especially because you are very hungry"],
        languageLevel: "C1",
        examples: ["He devoured half of his burger in one bite.", "The animal quickly devoured its prey."],
        additionalSyns: ["gobble"],
      },
      {
        word: "swallow",
        def: ["to move your throat in order to make food or drink go down."],
        languageLevel: "B2",
        examples: ["These tablets are too big to swallow.", "The snake swallowed the bird whole."],
        additionalSyns: ["gulp"],
      },
      {
        word: "absorb",
        def: ["to take in a liquid, gas or other substance from the surface or space around", "to take something into the mind and learn or understand it", "to reduce the effect of a physical impact or movement.", "to interest somebody very much so that they pay no attention to anything else", "<em>'For more definitions check out: <a style='color: darkviolet' href = 'https://www.oxfordlearnersdictionaries.com/definition/english/absorb?q=absorb'> https://www.oxfordlearnersdictionaries.com/definition/english/absorb?q=absorb</a>'</em>"],
        languageLevel: "B2",
        examples: ["Plants absorb carbon dioxide from the air.", "Let the rice cook until it has absorbed all the water.", "It's a lot of information to absorb all at once.", "his tennis racket absorbs shock on impact.", "This work had absorbed him for several years."],
        additionalSyns: ["ingest"],
      },
    ],
    languageLevel: "B1",
    examples: ["Our high living standards cause our current population to consume 25 percent of the world's oil.", "Most of their manufactured products are consumed domestically.", "The software consumes huge amounts of internet bandwidth.", "He consumes huge amounts of bread with every meal."],
  },

  {
    word: "top",
    def: ["the highest part or point of something", "the upper flat surface of something"],
    syns: [
      {
        word: "summit",
        def: ["the highest point of something, especially the top of a mountain", "an official meeting or series of meetings between the leaders of two or more governments at which they discuss important matters"],
        languageLevel: "C1",
        examples: ["We reached the summit at noon.", "This path leads to the summit.", "the summit of his career", "a summit in Moscow"],
        additionalSyns: ["mountaintop", "apex"],
      },
      {
        word: "peak",
        def: ["the pointed top of a mountain; a mountain with a pointed top", "the point when somebody/something is best, most successful, strongest, etc."],
        languageLevel: "C1",
        examples: ["a mountain peak", "The climbers made camp halfway up the peak.", "Traffic reaches its peak between 8 and 9 in the morning.", "She's at the peak of her career."],
        additionalSyns: ["mountaintop", "apex"],
      },
      {
        word: "crest",
        def: ["the top part of a hill or wave", "the feathers that point upwards on a bird's head"],
        languageLevel: "C2",
        examples: ["surfers riding the crest of the wave", "The male is recognizable by its yellow crest.", "We stood on the crest of the hill."],
        additionalSyns: ["tuft", "plume", "apex"],
      },
      {
        word: "pinnacle",
        def: ["a high pointed piece of rock, especially at the top of a mountain", "the most important or successful part of something"],
        languageLevel: "C2",
        examples: ["he had reached the pinnacle of his career", "they climbed to the pinnacle of the rock"],
        additionalSyns: ["apex", "climax"],
      },
      {
        word: "tip",
        def: ["a small piece of advice about something practical <em>(A2)</em>", "a small amount of extra money that you give to somebody, for example somebody who serves you in a restaurant. <em>(B1)</em>", "the thin, pointed end of something <em>(C1)</em>"],
        languageLevel: "INCONSISTENT",
        examples: ["handy tips for buying a computer", "useful tips on how to save money", "to leave a tip", "He gave the waiter a generous tip.", "the tips of your fingers", "The cat was black except for a patch of white on the very tip of its tail."],
        additionalSyns: ["point", "end", "spike", "gratuity", "reward", "hint", "suggestion", "advice", "clue", "guideline", "recommendation"],
      },
      {
        word: "vertex",
        def: ["(geometry) a point where two lines meet to form an angle, especially the point of a triangle or cone opposite the base", "the highest point or top of something"],
        languageLevel: "N/A",
        examples: ["My cousin built his house on the vertex of the highest hill in the county.", "The vertex of my roof needs some serious repair."],
        additionalSyns: ["apex"],
      },
    ],
    languageLevel: "A2",
    examples: ["She was standing at the top of the stairs.", "The title is right at the top of the page.", " to the top He filled my glass to the top.", "We climbed to the very top of the hill.", "Can you polish the top of the table?"],
  },

  {
    word: "habitat",
    def: ["the place where a particular type of animal or plant is normally found"],
    syns: [
      {
        word: "home",
        def: ["the house or flat that you live in, especially with your family <em>(A1)</em>", "the town, district, country, etc. that you come from, or where you are living and that you feel you belong to", "the place where a plant or animal usually lives; the place where somebody/something can be found", "used to refer to a family living together, and the way it behaves", "<em>For more definitions check out: <a href='https://www.oxfordlearnersdictionaries.com/definition/english/home_1?q=home'>https://www.oxfordlearnersdictionaries.com/definition/english/home_1?q=home</a></em>"],
        languageLevel: "A1",
        examples: ["Old people prefer to stay in their own homes.", "Jane left England and made Greece her home.", "She came from a violent home.", "This region is the home of many species of wild flower."],
        additionalSyns: ["house", "apartment", "flat", "accommodation"],
      },
      {
        word: "environment",
        def: ["the natural world in which people, animals and plants live <em>(A2)</em>", "the natural world in which people, animals and plants live <em>(B1)</em>"],
        languageLevel: "INCONSISTENT",
        examples: ["The government should do more to protect the environment.", "a pleasant work/learning environment", "damage to the natural environment", "Hospitals have a duty to provide a safe working environment for all staff."],
        additionalSyns: ["nature", "wildlife", "conditions", "surroundings"],
      },
      {
        word: "territory",
        def: ["an area that one person, group, animal, etc. considers as their own and defends against others who try to enter it"],
        languageLevel: "B2",
        examples: ["Blackbirds will defend their territory against intruders.", "Each of these gangs has its own territory.", "They have refused to allow UN troops to be stationed in their territory.", "The plane was shot down while overflying enemy territory."],
        additionalSyns: ["area", "region", "land", "state", "country", "colony", "province", "domain"],
      },
      {
        word: "dwelling",
        def: ["a house, flat, etc. where a person lives"],
        languageLevel: "C2",
        examples: ["The development will consist of 66 dwellings and a number of offices.", "an application to convert the old barn into a dwelling", "ancient cliff dwellings"],
        additionalSyns: ["residence", "accommodation"],
      },
    ],
    languageLevel: "B2",
    examples: ["The panda's natural habitat is the bamboo forest.", "the destruction of wildlife habitat"],
  },

  {
    word: "emit",
    def: ["to send out something such as light, heat, sound, gas, etc."],
    syns: [
      {
        word: "discharge",
        def: ["when a gas or a liquid discharges or is discharged, or somebody discharges it, it flows somewhere", "to allow someone officially to leave somewhere, especially a hospital or a law court"],
        languageLevel: "C1",
        examples: ["He was discharged from the army following his injury.", "She was discharged from the police force for bad conduct.", "The river is diverted through the power station before discharging into the sea."],
        additionalSyns: ["send out", "eject", "flow"],
      },
      {
        word: "release",
        def: ["allow (something) to move, act, or flow freely.", "to let somebody come out of a place where they have been kept or stuck and unable to leave or move", "to make a film, recording or other product available to the public"],
        languageLevel: "B1",
        examples: ["to release a prisoner", "He was later released from police custody.", "They've released a new version of the original film."],
        additionalSyns: ["free", "let go", "let out", "liberate", "rescue", "ransom", "emancipate", "untie", "issue", "break", "announce"],
      },
    ],
    languageLevel: "C1",
    examples: ["The metal container began to emit a clicking sound.", "Sulphur gases were emitted by the volcano."],
  },

  {
    word: "incentive",
    def: ["something that encourages you to do something"],
    syns: [
      {
        word: "inducement",
        def: ["something that is given to somebody to persuade them to do something"],
        languageLevel: "C1",
        examples: ["There is little inducement for them to work harder.", "financial inducements to mothers to stay at home", "there is no financial inducement for them to improve"],
        additionalSyns: ["attraction", "temptation", "bait", "lure"]
      },
      {
        word: "motivation",
        def: ["the reason why somebody does something or behaves in a particular way", "the feeling of wanting to do something, especially something that involves hard work and effort"],
        languageLevel: "B2",
        examples: ["Financial incentives can be a strong motivation for employees.", "She lacks motivation to exercise regularly.", "He's intelligent enough but he lacks motivation."],
        additionalSyns: ["inspiration"]
      },
      {
        word: "motive",
        def: ["a reason for doing something"],
        languageLevel: "C1",
        examples: ["There seemed to be no motive for the murder."],
        additionalSyns: ["rationale", "cause"]
      },
      {
        word: "reason",
        def: ["a cause or an explanation for something that has happened or that somebody has done", "a fact that makes it right or fair to do something <em>(B2)</em>", " the power of the mind to think in a logical way, to understand and have opinions, etc. <em>(B2)</em>"],
        languageLevel:"A1",
        examples: ["He said no but he didn't give a reason.", "She gave no reasons for her decision.", "You have no reason to accuse him of laziness.", "She has good reason to be concerned.", "Only human beings are capable of reason (= of thinking in a logical way, etc.)."],
        additionalSyns: ["cause", "grounds", "ground", "basis", "rationale", "purpose", "aim", "objective", "goal", "rationality", "logic", "reasoning", "thought"]
      },
      {
        word: "encouragement",
        def: ["words or behaviour that give someone confidence to do something; the action of giving someone support, confidence, or hope."],
        languageLevel: "C1",
        examples: ["thank you for all your support and encouragement", "We were greatly encouraged by the positive response of the public.."],
        additionalSyns: ["heartening", "cheering", "inspiration", "uplifting", "rallying"],
      },
      {
        word: "stimulus",
        def: ["something that helps somebody/something to develop better or more quickly.", "something that produces a reaction in a human, an animal or a plant"],
        languageLevel: "C1",
        examples: ["The new tax policy served as a stimulus for economic growth.", "The loud noise provided a stimulus for the animals to react."],
        additionalSyns: [],
      },
      {
        word: "stimulant",
        def: ["a drug or substance that makes you feel more active and gives you more energy", "<strong>stimulant (to something)</strong> an event or activity that encourages more activity"],
        languageLevel: "C2",
        examples: ["Coffee and tea are mild stimulants."],
        additionalSyns: ["tonic", "restorative", "reviver", "energizer", "refresher", "antidepressant", "pep pill", "upper"]
      },
      {
        word: "impetus",
        def: ["something that encourages a process or activity to develop more quickly", "the force or energy with which something moves"],
        languageLevel: "N/A",
        examples: ["The debate seems to have lost much of its initial impetus.", "The Prime Minister’s support will give (an) added impetus to the campaign against crime.", "impetus for something His articles provided the main impetus for change."],
        additionalSyns: ["momentum", "propulsion", "impulsion", "energy" , "force", "power"]
      },
      {
        word: "incitement",
        def: ["the act of encouraging somebody to do something violent, illegal or unpleasant"],
        languageLevel: "N/A",
        examples: ["incitement to racial hatred", "incitement to murder"],
        additionalSyns: ["inspiration", "boost", "urging"]
      }
    ],
    languageLevel: "B2",
    examples: ["There is no incentive for people to save fuel.", "There is an added incentive for you to buy from our catalogue—a free gift with every purchase."],
  },

  {
    word: "browse",
    def: ["to look through or read something casually"],
    syns: [
      {
        word: "peruse",
        def: ["to read something, especially in a careful way"],
        languageLevel: "N/A",
        examples: ["Sometimes I peruse the magazines near the cash register while waiting to check out.", "Make sure you peruse the document before signing.", "A copy of the report is available for you to peruse at your leisure."],
        additionalSyns: [],
      },
      {
        word: "look around",
        def: ["to visit a place or building, walking around it to see what is there", "to turn your head so that you can see something"],
        languageLevel: "B1",
        examples: ["Let's look around the town this afternoon.", "People came out of their houses and looked around."],
        additionalSyns: []

      },
      {
        word: "look round",
        def: ["to visit a place or building, walking around it to see what is there", "to turn your head so that you can see something"],
        languageLevel: "B1",
        examples: ["Let's look around the town this afternoon.", "People came out of their houses and looked around."],
        additionalSyns: []

      },
      {
        word: "scan",
        def: ["to look quickly but not very carefully at a document, etc.", "to look at every part of something carefully, especially because you are looking for a particular thing or person", "to pass light over a picture or document using a scanner in order to copy it and put it in the memory of a computer <em>(B2)</em>"],
        languageLevel: "B1",
        examples: ["I scanned the list quickly for my name.", "We quickly scanned the menu.", "She scanned through the newspaper over breakfast.", "She scanned the room for an empty seat.", "She scanned his face anxiously.", "digitally scanned photographs", "This recognizes text in a scanned image."],
        additionalSyns: [],
      },
      {
        word: "skim",
        def: ["to read something quickly in order to find a particular point or the main points", "to remove fat, cream, etc. from the surface of a liquid", "to illegally copy electronic information from a credit card in order to use it without the owner's permission <em>(C2)</em>"],
        languageLevel: "N/A",
        examples:["He skimmed through the article trying to find his name.", "Skim the scum off the jam and let it cool.", ""],
        additionalSyns: []
      },
      {
        word: "glance",
        def: ["to look quickly at something/somebody", "to read something quickly and not carefully or completely"],
        languageLevel: "C1",
        examples: ["She glanced at her watch.", "I only had time to glance at my emails.", "He glanced briefly down the list of names."],
        additionalSyns: []
      },
      {
        word: "look",
        def: ["to turn your eyes in a particular direction", "to try to find somebody/something", "to pay attention to something", "to appear"],
        languageLevel: "A1",
        examples: ["Look closely and tell me what you see.", "Are you still looking for a job?", " I can't find my book—I've looked everywhere.", " Look at the time! We're going to be late.", "You look great!", "to seem likely to happen or be true <em>B1</em>"]
      },
    ],
    languageLevel: "B2",
    examples: ["She likes to browse magazines at the bookstore.", "He spent some time browsing online forums."],
  },

  {
    word: "extinct",
    def: ["no longer in existence"],
    syns: [
      {
        word: "vanished",
        def: ["disappeared or ceased to exist"],
        languageLevel: "B2",
        examples: ["The ancient civilization vanished without a trace.", "The species vanished from the wild due to hunting and habitat loss."],
        additionalSyns: ["gone"],
      },
      {
        word: "extinguished",
        def: ["completely put an end to something"],
        languageLevel: "B2",
        examples: ["The fire was quickly extinguished by the firefighters.", "The hope of reconciliation was extinguished after the heated argument."],
        additionalSyns: ["eliminated", "eradicated"],
      },
    ],
    languageLevel: "B2",
    examples: ["The dinosaur is an extinct species.", "The once flourishing civilization is now extinct."],
  },

  {
    word: "scientist",
    def: ["a person who studies and has expert knowledge of one or more branches of science"],
    syns: [
      {
        word: "researcher",
        def: ["a person who conducts research or investigation"],
        languageLevel: "B2",
        examples: ["The researcher conducted experiments to test the hypothesis.", "Scientists and researchers work together to advance scientific knowledge."],
        additionalSyns: ["scholar"],
      },
      {
        word: "expert",
        def: ["a person who has extensive knowledge or skill in a particular field"],
        languageLevel: "B2",
        examples: ["He is an expert in the field of genetics.", "The expert provided valuable insights into the matter."],
        additionalSyns: ["specialist", "authority"],
      },
    ],
    languageLevel: "B2",
    examples: ["The scientist made significant discoveries in the field of physics.", "Scientists are continuously seeking answers to complex questions."],
  },

  {
    word: "impressed",
    def: ["having a strong effect on the mind or feelings; eliciting admiration or respect"],
    syns: [
      {
        word: "awed",
        def: ["filled with awe; deeply impressed or respectful"],
        languageLevel: "B2",
        examples: ["The majestic mountain range left us awed.", "She was awed by the stunning performance."],
        additionalSyns: ["amazed", "astonished"],
      },
      {
        word: "inspired",
        def: ["filled with a positive and uplifting influence; motivated to create or achieve"],
        languageLevel: "B2",
        examples: ["The passionate speech inspired the audience.", "She felt inspired to write a song after witnessing the beauty of nature."],
        additionalSyns: ["encouraged", "enthused"],
      },
      {
        word: "captivated",
        def: ["completely fascinated or charmed"],
        languageLevel: "B2",
        examples: ["The captivating story held the audience's attention.", "She was captivated by the intricate artwork."],
        additionalSyns: ["enchanted", "spellbound"],
      },
    ],
    languageLevel: "B2",
    examples: ["I was impressed by her talent.", "The performance left a lasting impression on me."],
  },

  {
    word: "delighted",
    def: ["feeling or showing great pleasure or satisfaction"],
    syns: [
      {
        word: "joyful",
        def: ["feeling, expressing, or causing great pleasure and happiness"],
        languageLevel: "B2",
        examples: ["The children were joyful at the sight of presents.", "She had a joyful smile on her face."],
        additionalSyns: ["ecstatic", "thrilled"],
      },
      {
        word: "elated",
        def: ["extremely happy and excited"],
        languageLevel: "B2",
        examples: ["He was elated after winning the championship.", "They were elated by the news of their promotion."],
        additionalSyns: ["overjoyed", "exhilarated"],
      },
      {
        word: "gleeful",
        def: ["expressing or causing great pleasure or amusement"],
        languageLevel: "C1",
        examples: ["The children were gleeful as they opened their presents.", "She had a gleeful laugh at the funny joke."],
        additionalSyns: ["merry", "jubilant"],
      },
    ],
    languageLevel: "B2",
    examples: ["I was delighted to receive your invitation.", "She was delighted with the outcome of the project."],
  },

  {
    word: "species",
    def: ["a group of living organisms consisting of similar individuals capable of exchanging genes or interbreeding"],
    syns: [
      {
        word: "kind",
        def: ["a category of things distinguished by some common characteristic"],
        languageLevel: "B1",
        examples: ["There are different kinds of birds in the forest.", "What kind of music do you enjoy?"],
        additionalSyns: ["type", "sort"],
      },
      {
        word: "variety",
        def: ["a number of different types of things"],
        languageLevel: "B2",
        examples: ["The store offers a variety of fruits and vegetables.", "We saw a variety of birds during our trip."],
        additionalSyns: ["assortment", "range", "diversity", "different", "differece", "change"],
      },
    ],
    languageLevel: "B2",
    examples: ["The concept of species is central to the study of biology.", "The preservation of endangered species is crucial for biodiversity."],
  },

  {
    word: "as long as",
    def: ["provided that; on the condition that"],
    syns: [
      {
        word: "if",
        def: ["in the event that; on the condition that"],
        languageLevel: "A2",
        examples: ["You can join us if you want.", "If it rains, we'll stay indoors."],
        additionalSyns: ["providing", "assuming"],
      },
      {
        word: "while",
        def: ["during the time that; as long as"],
        languageLevel: "B1",
        examples: ["While I was studying, my friend called me.", "You can use my computer while I'm away."],
        additionalSyns: ["as you", "during"],
      },
      {
        word: "assuming",
        def: ["supposing that something is true without having evidence to confirm it"],
        languageLevel: "B2",
        examples: ["Assuming he'll be there, we can start the meeting.", "She made decisions based on assuming certain risks."],
        additionalSyns: ["presuming", "supposing"],
      },
      {
        word: "presuming",
        def: ["assuming something is true without evidence to confirm it"],
        languageLevel: "B2",
        examples: ["Presuming you agree, we can move forward with the plan.", "She acted on the project, presuming it would be approved."],
        additionalSyns: ["assuming", "supposing"],
      },
      {
        word: "providing",
        def: ["on the condition that; if"],
        languageLevel: "B2",
        examples: ["Providing you follow the rules, you can participate.", "The offer is valid, providing you sign the agreement."],
        additionalSyns: ["if", "as long as"],
      },
    ],
    languageLevel: "B2",
    examples: ["You can come with us as long as you promise to behave.", "I'll support you as long as you keep working hard."],
  },

  {
    word: "exquisite",
    def: ["extremely beautiful, carefully made, or pleasing in a delicate way"],
    syns: [
      {
        word: "elegant",
        def: ["gracefully stylish and sophisticated"],
        languageLevel: "B2",
        examples: ["She wore an elegant gown to the gala.", "The room was decorated in an elegant style."],
        additionalSyns: [],
      },
      {
        word: "lovely",
        def: ["attractive or beautiful, especially in a graceful way"],
        languageLevel: "B1",
        examples: ["She had a lovely smile.", "The garden was filled with lovely flowers."],
        additionalSyns: [],
      },
      {
        word: "gorgeous",
        def: ["extremely beautiful or attractive"],
        languageLevel: "B2",
        examples: ["She looked absolutely gorgeous in her evening dress.", "The sunset over the ocean was breathtakingly gorgeous."],
        additionalSyns: ["stunning", "beautiful"],
      },
    ],
    languageLevel: "B2",
    examples: ["The artwork displayed in the gallery was exquisite.", "She enjoyed an exquisite meal at the fine dining restaurant."],
  },

  {
    word: "customer",
    def: ["a person who buys goods or services from a business"],
    syns: [
      {
        word: "client",
        def: ["a person or organization that uses the services of a professional person or organization."],
        languageLevel: "B1",
        examples: ["The lawyer met with her client to discuss her case.", "The client was unhappy with the services they had received from the company.", "The company's clients are spread all over the world.", "The client is always right.", "We need to improve our customer satisfaction ratings."],
        additionalSyns: ["patron", "consumer"],
      },
      {
        word: "consumer",
        def: ["a person who purchases goods or services for personal use"],
        languageLevel: "B2",
        examples: ["The consumer reviews helped me make an informed decision.", "As a consumer, it is important to be aware of your rights."],
        additionalSyns: ["shopper"],
      },
      {
        word: "purchaser",
        def: ["a person who buys or acquires something"],
        languageLevel: "B2",
        examples: ["The purchaser of the artwork was thrilled with the piece.", "The company announced a special offer for purchasers of their product."],
        additionalSyns: [],
      },
      {
        word: "buyer",
        def: ["a person who buys something, especially something expensive", "a person whose job is to choose goods that will be sold in a large shop"],
        languageLevel: "B1",
        examples: ["Have you found a buyer for your house?"],
        additionalSyns: ["purchaser"],
      },
    ],
    languageLevel: "A1",
    examples: ["The store offers discounts to loyal customers.", "The customer service representative addressed the concerns of the customer."],
  },
];

export default WORDS;
