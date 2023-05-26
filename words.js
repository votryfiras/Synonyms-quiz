const WORDS = [
  {
    word: "buy",
    def: ["to get something by giving money for it"],
    syns: [{
      word: "purchase",
      def: ['buying something'],
      languageLevel: 'A1',
      examples: ['Example 1', 'Example 2'],
      additionalSyns: []
    },
    {
      word: "acquire",
      def: ['buying something'],
      languageLevel: 'A1',
      examples: ['Example 1', 'Example 2'],
      additionalSyns: ['get', 'receive', 'gain', 'earn',]
    },
    {
      word: "obtain",
      def: ['buying something'],
      languageLevel: 'A1',
      examples: ['Example 1', 'Example 2'],
      additionalSyns: ['get', 'gain', 'earn', 'derive', 'pick up', 'procure', 'secure']
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
        def: ['basin but not as basin as a basin'],
        languageLevel: 'A1',
        examples: ['Example 1', 'Example 2'],
        additionalSyns: ['plate', 'pot', 'crock'],
      },
      {
        word: "dish",
        def: ['basin but not as basin as a basin'],
        languageLevel: 'A1',
        examples: ['Example 1', 'Example 2'],
        additionalSyns: ['plate', 'platter', 'salver'],
      },
      {
        word: "pan",
        def: ['basin but not as basin as a basin'],
        languageLevel: 'A1',
        examples: ['Example 1', 'Example 2'],
        additionalSyns: ['saucepan', 'frying pan', 'pot'],
      },
      {
        word: 'container',
        def: ['basin but not as basin as a basin'],
        languageLevel: 'A1',
        examples: ['Example 1', 'Example 2'],
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
      def: ['Damage caused to water, air, etc by harmful substances or waste.'],
      languageLevel: 'B1',
      examples: ['The book shows simple things you can do to reduce pollution from your car.', 'the level of pollution in the air is rising', "the companies that cause pollution should pay for the damage", 'As industrial production has fallen so have associated negative externalities, leading to reductions in air, water, soil, and noise pollution.'],
      additionalSyns: []
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
    syns: [{
      word: "eat",
      def: ['eating something'],
      languageLevel: "A1",
      examples: ['Exaxaxmaple, Another example'],
      additionalSyns: ['ingest'],

    }, {
      word: "devour",
      def: ['to actually eat'],
      languageLevel: "A1",
      examples: ['Exaxaxmaple, Another example'],
      additionalSyns: [],

    }, {
      word: "swallow",
      def: ['to actually eat'],
      languageLevel: "A1",
      examples: ['Exaxaxmaple, Another example'],
      additionalSyns: [],

    }, {
      word: "absorb",
      def: ['to actually eat'],
      languageLevel: "A1",
      examples: ['Exaxaxmaple, Another example'],
      additionalSyns: [],

    }],
    languageLevel: "B1",
    examples: ["Our high living standards cause our current population to consume 25 percent of the world's oil.", 'Most of their manufactured products are consumed domestically.', 'The software consumes huge amounts of internet bandwidth.', "He consumes huge amounts of bread with every meal."]
  },
]

function getSentences(str) {
  let sentence = ''
  const exmpls = []
  for (const i in str) {
    const letter = str[i]
    if (letter !== '.') { sentence = sentence + letter }
    else { exmpls.push(sentence.trim() + '.'); sentence = "" }
  }
  console.log(exmpls)
}

function stringToArray(string) {
  const trimmedString = string.trim();
  const wordArray = trimmedString.split(/\s+/);

  console.log(wordArray);
}

export default WORDS