import WORDS from './words.js';

const TOTAL_QUESTION_COUNT = 10 // Temporary
const CORRECT_PHRASES = ['Good job!', "You've got it made!", 'Super!', 'Excellent!', 'Good work!', "You've got that down pat.", "Perfect!", "Fantastic!", "Tremendous!", "Great!", "Nice job!", "I'm impressed!", "Marvelous!", "You've got the hang of it!", "Super-Duper!", "Out of sight!", "You've got your brain in gear today."]
const WRONG_PHRASES = ["You must have been a scavenger...", "You certainly did well today.", "Not bad.", "You are learning a lot though.", "Don't be upset, everything is okay!", "You did a lot of work today.", "Don't jump ship just yet.", "Never give up.", "Don't throw in the towel just yet.", "Keep the faith a while longer.", "Ah, what a loser!"]

class Round {
  constructor(roundNumber, totalQuestionCount, type) {
    this.roundNumber = roundNumber
    this.totalQuestionCount = totalQuestionCount
    this.type = type
    this.correctAnswerCount = 0
    this.wrongAnswerCount = 0
    this.skippedAnswerCount = 0
    this.terminatedAt = null
    this.isRoundWon = null
    this.bestStreak = null
    this.streaks = []
    this.prompts = []

  }
}

const rounds = [
  /*
    {
      roundNumber: 1,
      correctAnswerCount: 3,
      wrongAnswerCount: 4,
      skippedAnswerCount: 1,
      totalQuestionCount: 10,
      terminatedAt: 8 (correntAnswerCount + wrongAnswerCount + skippedAnswerCount),
      isRoundWon: false (correctAnswerCount > ( wrongAnswerCount + skippedAnswerCount ) ),
      type: choice,
      bestStreak: 2,
      streaks: [1, 2],
      prompts: [
        {
          word: buy,
          choices: [pollution, container, acquire, bowl]
          correctChoice: ["acquire"]
        }
        {
          word: buy,
          choices: [pollution, container, purchase, bowl],
          correctChoice: ["purchase"] // Put into an array for the insert case
        }
      ]
    }
  */
]

const app = document.querySelector('.app')
const modeSelect = document.querySelector('.mode-select')
const questionElement = document.querySelector('.question-segment__question')
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
const restartButton = document.querySelector('.restart-button')

function initChoices(initialPrompt) {
  questionCounter.textContent = 1
  const initialPromptObj = WORDS.find(wordObj => {
    return (wordObj.word === initialPrompt) || (wordObj.syns.find(synObject => synObject.word === initialPrompt))
  })
  manipulateChoices(initialPromptObj, initialPrompt)
}

function getRandomItem(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  const wordObject = arr[randomIndex]
  return wordObject
}

function pickRandomWordObject(prompt) {
  let newWordObject = getRandomItem(WORDS);
  const currentWordObject = WORDS.find(
    wordObject => wordObject.syns.some(synObject => synObject.word === prompt)
      || wordObject.word === prompt
  )

  if (newWordObject === currentWordObject) newWordObject = pickRandomWordObject()
  return newWordObject;
}

function getPossiblePrompts() {
  const synonymObjects = WORDS.map(wordObject => { return wordObject.syns })
  const possiblePrompts = []
  synonymObjects.forEach(synsArray => { synsArray.forEach(synonym => possiblePrompts.push(synonym.word)) })
  WORDS.forEach(wordObject => possiblePrompts.push(wordObject.word))
  return possiblePrompts;
}

function manipulateChoices(wordObject, newPrompt) {
  function pickRandomSynonym() {
    const randomWordObject = pickRandomWordObject(newPrompt)
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
    newChoices.push(randomSynonym.word)
  }

  if (wordObject.word !== newPrompt) {
    newChoices.push(wordObject.word)
  }
  else {
    let promptSynonym = getRandomItem(wordObject.syns)
    while (promptSynonym.word === newPrompt) {
      promptSynonym = getRandomItem(wordObject.syns)
    }
    newChoices.push(promptSynonym.word)
  }

  const shuffledChoices = shuffleArray(newChoices)
  for (let i = 0; i < 4; i++) {
    choiceButtons[i].textContent = shuffledChoices[i]
  }
}

function resetChoices() {
  const selectedChoice = document.querySelector('.selected-choice')
  if (selectedChoice) selectedChoice.classList.remove('selected-choice')
}

function selectChoice(e) {
  if (!e.target.classList.contains('disabled')) {
    const selectedChoice = document.querySelector('.selected-choice')
    if (selectedChoice) selectedChoice.classList.remove('selected-choice')
    e.target.parentElement.classList.add('selected-choice')
  }
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
  function enableChoices() {
    answerSegment.classList.remove('disabled')
  }
  function resetTextbox() {
    answerTextbox.value = ''
  }

  const newPrompt = getRandomItem(getPossiblePrompts());
  const newWordObject = WORDS.find(wordObj => {
    return (wordObj.word === newPrompt) || (wordObj.syns.find(synObject => synObject.word === newPrompt))
  })

  questionPrompt.textContent = newPrompt;
  answerTextbox.textContent = '';
  increaseCounter()
  manipulateChoices(newWordObject, newPrompt)
  resetChoices()
  enableChoices()
  resetTextbox()
  hideAnswerGrade()
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
    answerGradeSegment.classList.remove("correct")
    answerGradeSegment.classList.add("wrong")
  }
  function getPromptObject(prompt) {
    for (const wordObj of WORDS) {
      if (wordObj.word === prompt) { return wordObj }
      for (const synonym of wordObj.syns) {
        if (synonym.word === prompt) { return wordObj };
      }
    }
  }
  function disableChoices() {
    answerSegment.classList.add('disabled')
  }

  const prompt = questionPrompt.textContent;
  const promptObject = getPromptObject(prompt)
  const synonymSynonyms = promptObject.syns.find(synObject => synObject.word === prompt).additionalSyns
  const correctSynonyms = promptObject.syns
    .map(synObject => { return synObject.word })
    .concat(synonymSynonyms)
    .concat(promptObject.word)

  console.log(correctSynonyms)

  const selectedChoiceText = document.querySelector('.selected-choice')?.firstChild.textContent
  const writtenAnswer = answerTextbox.value

  if (!selectedChoiceText && !writtenAnswer) { return; }
  else if (answerSegment.classList.contains("choice-mode")) {
    if (correctSynonyms.includes(selectedChoiceText)) {
      motivatingGrade()
      disableChoices()
    }
    else { wrongGrade() }
  }
  else {
    if (correctSynonyms.includes(writtenAnswer)) { motivatingGrade() }
    else { wrongGrade() }
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

function hideAnswerGrade() {
  answerGradeSegment.classList.remove('correct', 'wrong')
  answerGradeText.textContent = ''
}

function startRound() {
  function enableTextbox() {
    answerTextbox.removeAttribute('disabled')
  }
  function resetTextbox() {
    answerTextbox.value = ''
  }

  const possiblePrompts = getPossiblePrompts()
  const initialPrompt = getRandomItem(possiblePrompts)

  questionPrompt.textContent = initialPrompt;
  questionElement.classList.remove('disabled')
  answerSegment.classList.remove('disabled')
  restartButton.querySelector('[data-restart-text]').textContent = "Restart";


  if (answerSegment.classList.contains('choice-mode')) { initChoices(initialPrompt); resetChoices(); }
  else { enableTextbox(); resetTextbox() }

  hideAnswerGrade()
}

choiceButtons.forEach((choice => {
  choice.addEventListener('click', selectChoice)
}))

modeSelect.addEventListener('change', switchMode)
answerTextbox.addEventListener('keydown', textboxPlaceholderToggle)
nextButton.addEventListener('click', nextQuestion)
submitButton.addEventListener('click', checkAnswer)
toggleInfoButton.addEventListener('click', displayWordInfo)
restartButton.addEventListener('click', startRound)
