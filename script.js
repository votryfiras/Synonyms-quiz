const WORDS = [
  {
    word: "buy",
    def: ["to get something by giving money for it"],
    syns: ["purchase", "acquire", "obtain"],
    languageLevel: "A1",
    examples: ['Eventually she had saved enough money to buy a small car.', 'He bought his mother some flowers/He bought some flowers for his mother.', 'There are more people buying at this time of the year so prices are high.', 'The company was set up to buy and sell shares on behalf of investors.', 'I bought my camera from a friend of mine.']
  },
  {
    word: "basin",
    def: ["an open, round container shaped like a bowl with sloping sides, used for holding food or liquid", "a large, open bowl, or the amount such a container will hold"],
    syns: ["bowl", "dish", "pan", "pot", 'container'],
    languageLevel: "B1",
    examples: ['Run some water into the basin and wash your hands and face properly.', 'When you have broken the eggs into a basin, whisk them together lightly with a fork.', 'The basin in the upstairs bathroom has gold taps! …eaning fluids under the basin in the back toilet.', 'In the auction there is a rather nice antique porcelain basin and jug.', 'I left the napkins soaking in a basin.']
  },
  {
    word: "carbon footprint",
    def: ["a measure of the amount of carbon dioxide released into the atmosphere as a result of the activities of a particular individual, organization, or community."],
    syns: ["pollution"],
    languageLevel: "B2",
    examples: ['The four main areas that determine your carbon foo…tural gas usage, car mileage, and airplane trips.', 'We have partnered with nearby farms, hoping to reduce the carbon footprint of our delivery trucks.'],
  },
  {
    word: "conserve",
    def: ["protect (something, especially something of environmental or cultural importance) from harm or destruction."],
    syns: ["perserve"],
    languageLevel: "",
    examples: ['To conserve electricity, we are cutting down on our heating.', 'The nationalists are very eager to conserve their customs and language.', "I'm not being lazy - I'm just conserving my energy/strength for later."],
  },
  {
    word: "consume",
    def: ["to use fuel, energy, time, or a product, especially in large amounts", "to eat or drink something"],
    syns: ["eat", "devour", "swallow", "absorb"],
    languageLevel: "C1",
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

const TOTAL_QUESTION_COUNT = 10

const modeSelect = document.querySelector('.mode-select')
const questionCounter = document.querySelector('.question-segment__banner__question-counter')
const questionScript = document.querySelector(".question__script")
const questionPrompt = document.querySelector('.question__prompt')
const choices = document.querySelectorAll('.choice')
const answerSegment = document.querySelector('.answer-segment')
const answerTextbox = document.querySelector('.answer-textbox')
const nextButton = document.querySelector(".next-button")

function getRandomItem(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  const wordObject = arr[randomIndex]
  return wordObject
}

function pickRandomWordObject() {
  let newWordObject = getRandomItem(WORDS);
  const currentWordObject = WORDS.find(wordOject => wordOject.word === questionPrompt.textContent)

  if (newWordObject === currentWordObject) newWordObject = pickRandomWordObject()
  return newWordObject;
}

function manipulateChoices(wordObject) {
  function pickRandomSynonym() {
    const randomWordObject = pickRandomWordObject()
    const randomSynonym = getRandomItem(randomWordObject.syns)
    return randomSynonym
  }
  function shuffleArray(arr) {
    let currentIndex = arr.length, randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [arr[currentIndex], arr[randomIndex]] = [
        arr[randomIndex], arr[currentIndex]];
    }

    return arr;
  }

  const newChoices = []

  for (let i = 0; i < 3; i++) {
    let randomSynonym = pickRandomSynonym()
    while (newChoices.find(syn => syn === randomSynonym)) {
      randomSynonym = pickRandomSynonym()
    }
    newChoices.push(randomSynonym)
  }
  newChoices.push(pickRandomSynonym(wordObject.syns))

  const shuffledChoices = shuffleArray(newChoices)
  for (let i = 0; i < 4; i++) {
    choices[i].textContent = shuffledChoices[i]
  }
}

function selectChoice(e) {
  const selectedChoice = document.querySelector('.selected-choice')
  selectedChoice?.classList.remove('selected-choice')
  e.target.classList.add('selected-choice')
}

function switchMode() {
  answerSegment.classList.toggle('choice-mode')
  answerSegment.classList.toggle('insert-mode')
  if (answerSegment.classList.contains("choice-mode")) questionScript.textContent = "Which of these is"
  else questionScript.textContent = "Write"
}

function textboxPlaceholderToggle(e) {
  setTimeout(() => {
    if (e.target.value) e.target.offsetParent.classList.add('typing')
    else e.target.offsetParent.classList.remove('typing')
  }, 0)
}

function nextQuestion() {
  function increaseCounter() {
    const count = parseInt(questionCounter.textContent)
    if (count < TOTAL_QUESTION_COUNT) questionCounter.textContent = count + 1
  }

  const newWordObject = pickRandomWordObject()

  increaseCounter()
  manipulateChoices(newWordObject)
  questionPrompt.textContent = newWordObject.word
}

choices.forEach((choice => {
  choice.addEventListener('click', selectChoice)
}))

const initialWord = getRandomItem(WORDS)
questionPrompt.textContent = initialWord.word;
manipulateChoices(initialWord)

modeSelect.addEventListener('change', switchMode)
answerTextbox.addEventListener('keydown', textboxPlaceholderToggle)
nextButton.addEventListener('click', nextQuestion)
