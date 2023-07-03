const WORDS = [
  {
    word: "buy",
    def: ["to get something by giving money for it"],
    syns: [
      {
        word: "purchase",
        def: ['To buy something.', 'something that you buy.'],
        languageLevel: 'B2',
        examples: ['Tickets must be purchased two weeks in advance.', 'the illegal purchase of guns', 'something that you buy.'],
        additionalSyns: ['pick up', 'take', 'secure', 'come by', 'grip', 'attachment', 'hold']
      },
      {
        word: "acquire",
        def: ['to get something.', 'to learn something.'],
        languageLevel: 'B2',
        examples: ['I managed to acquire a copy of the report.', 'His family acquired (= bought) the property in 1985.', 'to acquire knowledge/skill'],
        additionalSyns: ['get', 'receive', 'gain', 'earn', 'come by']
      },
      {
        word: "obtain",
        def: ['to get something'],
        languageLevel: 'B2',
        examples: ['to obtain permission', 'He obtained a law degree from the University of California.'],
        additionalSyns: ['get', 'gain', 'earn', 'derive', 'pick up', 'secure']
      }],
    languageLevel: "A1",
    examples: ['Eventually she had saved enough money to buy a small car.', 'He bought his mother some flowers/He bought some flowers for his mother.', 'There are more people buying at this time of the year so prices are high.', 'The company was set up to buy and sell shares on behalf of investors.', 'I bought my camera from a friend of mine.']
  },
  {
    word: "basin",
    def: ["an open, round container shaped like a bowl with sloping sides, used for holding food or liquid", "a large, open bowl, or the amount such a container will hold"],
    syns: [
      {
        word: "bowl",
        def: ['a round, deep dish used for holding soup and other food.'],
        languageLevel: 'A2',
        examples: ['a bowl of rice/soup', "Put the chocolate, butter, and egg in a bowl and mix them all together.", "Combine nuts, sugar, and orange peel in a small bowl.", "I gave him a bowl of ice cream which he soon polished off.", "He emerged from the kitchen with a steaming bowl of soup.", "I was just about to tuck into a huge bowl of pasta."],
        additionalSyns: ['plate', 'pot', 'crock', 'pan'],
      },
      {
        word: "dish",
        def: ['a curved container for eating or serving food from.', 'food that is prepared in a particular way as part of a meal.'],
        languageLevel: 'A2',
        examples: ['a baking/serving dish', 'Place alternate layers of pasta and meat sauce in a heatproof dish.'],
        additionalSyns: ['plate', 'platter', 'salver'],
      },
      {
        word: 'container',
        def: ['an object such as a box or a bottle that is used for holding something'],
        languageLevel: 'B2',
        examples: ['a plastic container', 'Food will last longer if kept in an airtight container.', ' These women carry heavy containers of water over long distances.'],
        additionalSyns: ['receptacle', 'vessel', 'holder', 'repository', 'canister', 'box'],
      }],
    languageLevel: "B1",
    examples: ['Run some water into the basin and wash your hands and face properly.', 'When you have broken the eggs into a basin, whisk them together lightly with a fork.', 'The basin in the upstairs bathroom has gold taps! …eaning fluids under the basin in the back toilet.', 'In the auction there is a rather nice antique porcelain basin and jug.', 'I left the napkins soaking in a basin.']
  },
  {
    word: "carbon footprint",
    def: ["a measure of the amount of carbon dioxide released into the atmosphere as a result of the activities of a particular individual, organization, or community."],
    syns: [{
      word: "pollution",
      def: ['Damage caused to water, air, etc. by harmful substances or waste.'],
      languageLevel: 'B1',
      examples: ['The book shows simple things you can do to reduce pollution from your car.', 'the level of pollution in the air is rising', "the companies that cause pollution should pay for the damage", 'As industrial production has fallen so have associated negative externalities, leading to reductions in air, water, soil, and noise pollution.'],
      additionalSyns: ['dirtying']
    }],
    languageLevel: "B2",
    examples: ['The four main areas that determine your carbon foo…tural gas usage, car mileage, and airplane trips.', 'We have partnered with nearby farms, hoping to reduce the carbon footprint of our delivery trucks.'],
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
        additionalSyns: ['protect', 'maintain', 'save', 'safeguard', 'keep']
      }],
    languageLevel: "C1",
    examples: ['To conserve electricity, we are cutting down on our heating.', 'The nationalists are very eager to conserve their customs and language.', "I'm not being lazy - I'm just conserving my energy/strength for later."],
  },
  {
    word: "consume",
    def: ["to use fuel, energy, time, or a product, especially in large amounts", "to eat or drink something"],
    syns: [
      {
        word: "eat",
        def: ['to put food in your mouth, bite it and swallow it', 'to have a meal'],
        languageLevel: "A1",
        examples: ['I was too nervous to eat', 'to eat well/healthily', 'to eat breakfast/lunch/dinner', 'Where shall we eat tonight?', 'We ate at a pizzeria.', 'I never eat in the school cafeteria.'],
        additionalSyns: ['ingest'],

      },
      {
        word: "devour",
        def: ['to eat all of something quickly, especially because you are very hungry'],
        languageLevel: "C1",
        examples: ['He devoured half of his burger in one bite.', 'The animal quickly devoured its prey.'],
        additionalSyns: ['gobble'],

      },
      {
        word: "swallow",
        def: ['to move your throat in order to make food or drink go down.'],
        languageLevel: "B2",
        examples: ['These tablets are too big to swallow.', 'The snake swallowed the bird whole.'],
        additionalSyns: [],

      },
      {
        word: "absorb",
        def: ['to take in a liquid, gas or other substance from the surface or space around', 'to take something into the mind and learn or understand it', 'to reduce the effect of a physical impact or movement.', 'to interest somebody very much so that they pay no attention to anything else', "<em>'For more definitions check out: <a style='color: darkviolet' href = 'https://www.oxfordlearnersdictionaries.com/definition/english/absorb?q=absorb'> https://www.oxfordlearnersdictionaries.com/definition/english/absorb?q=absorb</a>'</em>"],
        languageLevel: "B2",
        examples: ['Plants absorb carbon dioxide from the air.', 'Let the rice cook until it has absorbed all the water.', "It's a lot of information to absorb all at once.", 'his tennis racket absorbs shock on impact.', 'This work had absorbed him for several years.'],
        additionalSyns: [],
      }],
    languageLevel: "B1",
    examples: ["Our high living standards cause our current population to consume 25 percent of the world's oil.", 'Most of their manufactured products are consumed domestically.', 'The software consumes huge amounts of internet bandwidth.', "He consumes huge amounts of bread with every meal."]
  },
  {
    word: "top",
    def: ["the highest part or point of something", "the upper flat surface of something"],
    syns: [
      {
        word: 'summit',
        def: ['the highest point of something, especially the top of a mountain'],
        languageLevel: "C1",
        examples: ['We reached the summit at noon.', 'This path leads to the summit.', 'the summit of his career'],
        additionalSyns: ['mountaintop', 'apex']
      },
      {
        word: 'peak',
        def: ['the pointed top of a mountain; a mountain with a pointed top', 'the point when somebody/something is best, most successful, strongest, etc.'],
        languageLevel: "C1",
        examples: ['a mountain peak', 'The climbers made camp halfway up the peak.', 'Traffic reaches its peak between 8 and 9 in the morning.', "She's at the peak of her career."],
        additionalSyns: ['mountaintop', 'apex']
      },
      {
        word: 'crest',
        def: ['the top part of a hill or wave', "the feathers that point upwards on a bird's head"],
        languageLevel: "C2",
        examples: ['surfers riding the crest of the wave', 'The male is recognizable by its yellow crest.', 'We stood on the crest of the hill.'],
        additionalSyns: ['tuft', 'plume', 'apex']
      },
      {
        word: "pinnacle",
        def: ['a high pointed piece of rock, especially at the top of a mountain', 'the most important or successful part of something'],
        languageLevel: "C2",
        examples: ['he had reached the pinnacle of his career', 'they climbed to the pinnacle of the rock'],
        additionalSyns: ['apex', 'climax']
      },
      {
        word: "tip",
        def: ['a small piece of advice about something practical <em>(A2)</em>', 'a small amount of extra money that you give to somebody, for example somebody who serves you in a restaurant. <em>(B1)</em>', 'the thin, pointed end of something <em>(C1)</em>'],
        languageLevel: 'INCONSISTENT',
        examples: ['handy tips for buying a computer', 'useful tips on how to save money', 'to leave a tip', 'He gave the waiter a generous tip.', 'the tips of your fingers', 'The cat was black except for a patch of white on the very tip of its tail.'],
        additionalSyns: ['point', 'end', 'spike', 'gratuity', 'reward', 'hint', 'suggestion', 'advice', 'clue', 'guideline', 'recommendation']
      },
      {
        word: 'vertex',
        def: ['(geometry) a point where two lines meet to form an angle, especially the point of a triangle or cone opposite the base', 'the highest point or top of something'],
        languageLevel: 'N/A',
        examples: ['My cousin built his house on the vertex of the highest hill in the county.', 'The vertex of my roof needs some serious repair.'],
        additionalSyns: ['apex']
      }
    ],
    languageLevel: "A2",
    examples: ['She was standing at the top of the stairs.', 'The title is right at the top of the page.', ' to the top He filled my glass to the top.', 'We climbed to the very top of the hill.', 'Can you polish the top of the table?']
  },
  {
    word: "habitat",
    def: ["the place where a particular type of animal or plant is normally found"],
    syns: [
      {
        word: "home",
        def: ['the house or flat that you live in, especially with your family <em>(A1)</em>', 'the town, district, country, etc. that you come from, or where you are living and that you feel you belong to', 'the place where a plant or animal usually lives; the place where somebody/something can be found', 'used to refer to a family living together, and the way it behaves', "<em>For more definitions check out: <a href='https://www.oxfordlearnersdictionaries.com/definition/english/home_1?q=home'>https://www.oxfordlearnersdictionaries.com/definition/english/home_1?q=home</a></em>"],
        languageLevel: "A2",
        examples: ['Old people prefer to stay in their own homes.', 'Jane left England and made Greece her home.', 'She came from a violent home.', 'This region is the home of many species of wild flower.'],
        additionalSyns: ['house', 'apartment', 'flat', 'accommodation']
      },
      {
        word: "environment",
        def: ["the natural world in which people, animals and plants live <em>(A2)</em>", "the natural world in which people, animals and plants live <em>(B1)</em>"],
        languageLevel: "INCONSISTENT",
        examples: ['The government should do more to protect the environment.', 'a pleasant work/learning environment', 'damage to the natural environment', 'Hospitals have a duty to provide a safe working environment for all staff.'],
        additionalSyns: ['nature', 'wildlife', 'conditions', 'surroundings']
      },
      {
        word: 'territory',
        def: ['an area that one person, group, animal, etc. considers as their own and defends against others who try to enter it'],
        languageLevel: 'B2',
        examples: ['Blackbirds will defend their territory against intruders.', 'Each of these gangs has its own territory.', 'They have refused to allow UN troops to be stationed in their territory.', 'The plane was shot down while overflying enemy territory.'],
        additionalSyns: ['area', 'region', 'land', 'state', 'country', 'colony', 'province', 'domain']
      },
      {
        word: 'dwelling',
        def: ['a house, flat, etc. where a person lives'],
        languageLevel: 'C2',
        examples: ['The development will consist of 66 dwellings and a number of offices.', 'an application to convert the old barn into a dwelling'],
        additionalSyns: ['residence', 'accommodation']
      }
    ],
    languageLevel: "B2",
    examples: ["The panda's natural habitat is the bamboo forest.", 'the destruction of wildlife habitat']
  }
]

export default WORDS