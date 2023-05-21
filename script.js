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
    languageLevel: "C1",
    examples: ['To conserve electricity, we are cutting down on our heating.', 'The nationalists are very eager to conserve their customs and language.', "I'm not being lazy - I'm just conserving my energy/strength for later."],
  },
  {
    word: "consume",
    def: ["to use fuel, energy, time, or a product, especially in large amounts", "to eat or drink something"],
    syns: ["eat", "devour", "swallow", "absorb"],
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

const TOTAL_QUESTION_COUNT = 10
const CORRECT_PHRASES = ['Good job!', "You've got it made!", 'Super!', 'Excellent!', 'Good work!', "You've got that down pat.", "Perfect!", "Fantastic!", "Tremendous!", "Great!", "Nice job!", "I'm impressed!", "Marvelous!", "You've got the hang of it!", "Super-Duper!", "Out of sight!", "You've got your brain in gear today."]
const WRONG_PHRASES = ["You must have been a scavenger...", "You certainly did well today.", "Not bad.", "You are learning a lot though.", "Don't be upset, everything is okay!", "You did a lot of work today.", "Don't jump ship just yet.", "Never give up.", "Don't throw in the towel just yet.", "Keep the faith a while longer.", "Ah, what a loser!"]

const modeSelect = document.querySelector('.mode-select')
const questionCounter = document.querySelector('.question-segment__banner__question-counter')
const questionScript = document.querySelector(".question__script")
const questionPrompt = document.querySelector('.question__prompt')
const choiceButtons = document.querySelectorAll('.choice__button')
const answerSegment = document.querySelector('.answer-segment')
const answerTextbox = document.querySelector('.answer-textbox')
const nextButton = document.querySelector(".next-button")
const submitButton = document.querySelector(".submit-button")
const answerGradeSegment = document.querySelector(".answer-grade-segment__bg")
const answerGradeText = document.querySelector(".answer-grade__text")
const wordInfo = document.querySelector('.word-info')
const toggleInfoButton = document.querySelector('.answer-grade__toggle-info')

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
  const currentWordObject = WORDS.find(wordOject => wordOject.word === questionPrompt.textContent)
  newChoices.push(getRandomItem(wordObject.syns))
  const shuffledChoices = shuffleArray(newChoices)
  for (let i = 0; i < 4; i++) {
    choiceButtons[i].textContent = shuffledChoices[i]
  }
}

function selectChoice(e) {
  const selectedChoice = document.querySelector('.selected-choice')
  selectedChoice?.classList.remove('selected-choice')
  e.target.parentElement.classList.add('selected-choice')
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

function checkAnswer() {
  function motivatingGrade() {
    const motivationalPhrase = getRandomItem(CORRECT_PHRASES)
    answerGradeText.textContent = motivationalPhrase
    answerGradeSegment.classList.add("correct")
    answerGradeSegment.classList.remove("wrong")
  }
  function wrongGrade() {
    const wrongPhrase = getRandomItem(WRONG_PHRASES)
    answerGradeText.textContent = wrongPhrase
    //  + answerGradeText.textContent
    answerGradeSegment.classList.remove("correct")
    answerGradeSegment.classList.add("wrong")
  }

  const prompt = questionPrompt.textContent;
  const correctSynonyms = WORDS.find(wordObject => wordObject.word === prompt).syns
  const selectedChoice = document.querySelector('.selected-choice')?.firstChild.textContent
  const writtenAnswer = answerTextbox.textContent

  if (!selectedChoice && !writtenAnswer) { }
  else if (answerSegment.classList.contains("choice-mode")) {
    if (correctSynonyms.includes(selectedChoice)) { motivatingGrade() }
    else { wrongGrade() }
  }
  else {
    if (correctSynonyms.includes(writtenAnswer)) { motivatingGrade() }
  }
}

function displayWordInfo() {
  wordInfo.classList.toggle('visible')
  if (wordInfo.classList.contains('visible')) {
    const currentWordObject = WORDS.find(wordOject => wordOject.word === questionPrompt.textContent)
    const wordSpan = document.querySelector('.word-info__word__term')
    const levelSpan = document.querySelector('.word-info__level__level')
    const defSection = document.querySelector('.word-info__def')
    const exmSection = document.querySelector('.word-info__exm')

    toggleInfoButton.querySelector('span').textContent = "Hide"
    toggleInfoButton.querySelector('img').setAttribute('style', 'transform: rotate(0deg)')

    wordSpan.textContent = currentWordObject.word.charAt(0).toUpperCase() + currentWordObject.word.slice(1);
    levelSpan.textContent = currentWordObject.languageLevel

    for (const def of currentWordObject.def) {
      const defListItem = document.createElement('li')
      defListItem.className = "word-info__def__definition"
      defListItem.textContent = def
      defSection.querySelector('ul').appendChild(defListItem)
    }

    for (const exm of currentWordObject.examples) {
      const exmListItem = document.createElement('li')
      exmListItem.className = "word-info__exm__example"
      exmListItem.textContent = exm
      exmSection.querySelector('ul').appendChild(exmListItem)
    }

  }
  else {
    toggleInfoButton.querySelector('span').textContent = "More about the word"
    toggleInfoButton.querySelector('img').setAttribute('style', 'transform: rotate(-90deg)')
  }
}

choiceButtons.forEach((choice => {
  choice.addEventListener('click', selectChoice)
}))

const initialWord = getRandomItem(WORDS)
questionPrompt.textContent = initialWord.word;
manipulateChoices(initialWord)

modeSelect.addEventListener('change', switchMode)
answerTextbox.addEventListener('keydown', textboxPlaceholderToggle)
nextButton.addEventListener('click', nextQuestion)
submitButton.addEventListener('click', checkAnswer)
toggleInfoButton.addEventListener('click', displayWordInfo)