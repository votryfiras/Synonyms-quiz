import WORDS from './words.js';

const EXCLUDED_INSERT_PROMPTS = ['pollution', 'pan', 'carbon footprint']
const CORRECT_PHRASES = ['Good job!', "You've got it made!", 'Super!', 'Excellent!', 'Good work!', "You've got that down pat.", "Perfect!", "Fantastic!", "Tremendous!", "Great!", "Nice job!", "I'm impressed!", "Marvelous!", "You've got the hang of it!", "Super-Duper!", "Out of sight!", "You've got your brain in gear today."]
const WRONG_PHRASES = ["You must have been a scavenger...", "You certainly did well today.", "Not bad.", "You are learning a lot though.", "Don't be upset, everything is okay!", "You did a lot of work today.", "Don't jump ship just yet.", "Never give up.", "Don't throw in the towel just yet.", "Keep the faith a while longer.", "Ah, what a loser!"]

class Round {
  constructor(props) {
    this.roundNumber = props.roundNumber
    this.totalQuestionCount = props.totalQuestionCount
    this.mode = props.mode
    this.currentQuestionNumber = 1
    this.correctAnswerCount = 0
    this.wrongAnswerCount = 0
    this.skippedAnswerCount = 0
    this.terminatedAt = null
    this.isRoundWon = false
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
          choices: [pollution, container, acquire, bowl],
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

const congratsSegment = document.querySelector('.congrats-segment')
const modeSelect = document.querySelector('.mode-select')
const questionElement = document.querySelector('.question-segment__question')
const questionCounter = document.querySelector('.question-segment__banner__question-counter')
const questionScript = document.querySelector(".question__script")
const questionPrompt = document.querySelector('.question__prompt')
const choiceButtons = document.querySelectorAll('.choice__button')
const answerSegment = document.querySelector('.answer-segment')
const answerTextbox = document.querySelector('.answer-textbox')
const answerTextboxContainer = document.querySelector('.answer-textbox-container')
const nextButton = document.querySelector(".next-button")
const submitButton = document.querySelector(".submit-button")
const answerGradeSegment = document.querySelector(".answer-grade-segment__bg")
const answerGradeText = document.querySelector(".answer-grade__text")
const wordInfo = document.querySelector('.word-info')
const toggleInfoButton = document.querySelector('.answer-grade__toggle-info')
const restartButton = document.querySelector('.restart-button')

function startRound() {
  function roundInit() {
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
    restartButton.querySelector('[data-restart-text]').textContent = "Restart";
    modeSelect.setAttribute('disabled', '')


    if (answerSegment.classList.contains('choice-mode')) {
      toggleChoicesAbility(false);
      initChoices(initialPrompt);
      resetChoices();
    }
    else { enableTextbox(); resetTextbox() }

    hideAnswerGrade()
    enableSubmitButtons()
  }
  function generateRoundObject() {
    const round = new Round({
      roundNumber: rounds.length + 1,
      totalQuestionCount: 10,
      mode: modeSelect.value.toLowerCase().replace(/\s/g, ""), // Removes whitespace
    })

    rounds.push(round)
  }
  generateRoundObject()
  roundInit()
}

function endRound() {

}

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
  const currentWordObject = WORDS.find(wordObject => {
    return (wordObject.syns.some(synObject => synObject.word === prompt)
      || wordObject.word === prompt)
  })

  if (newWordObject === currentWordObject) newWordObject = pickRandomWordObject(prompt)
  return newWordObject;
}

function getPossiblePrompts() {
  let excludedPrompts = []
  if (answerSegment.classList.contains('insert-mode')) {
    excludedPrompts = EXCLUDED_INSERT_PROMPTS
  }
  const synonymObjects = WORDS.map(wordObject => { return wordObject.syns })
  const possiblePrompts = []
  synonymObjects.forEach(synsArray => {
    synsArray.forEach(synonymObject => {
      if (!excludedPrompts.includes(synonymObject.word)) { possiblePrompts.push(synonymObject.word) }
    })
  })
  WORDS.forEach(wordObject => {
    if (!excludedPrompts.includes(wordObject.word)) possiblePrompts.push(wordObject.word)
  })
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
    while (newChoices.some(syn => syn === randomSynonym.word)) {
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

function toggleChoicesAbility(disable = true) {
  const choices = Array.from(document.querySelectorAll('.choice'))
  if (!disable) {
    choices.forEach(btn => btn.classList.remove('disabled'))
  }
  else {
    choices.forEach(btn => btn.classList.add('disabled'))

  }
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

function textboxPlaceholderToggle() {
  setTimeout(() => {
    if (answerTextbox.value) answerTextboxContainer.classList.add('typing')
    else answerTextboxContainer.classList.remove('typing')
  }, 0)
}

function enableSubmitButtons() {
  const currentRound = rounds[rounds.length - 1]
  submitButton.removeAttribute('disabled')
  if (currentRound.currentQuestionNumber !== currentRound.totalQuestionCount) {
    nextButton.removeAttribute('disabled')
  }
  else { nextButton.setAttribute('disabled', '') }
}

function nextQuestion() {
  const currentRound = rounds[rounds.length - 1]
  const SURE_TEXT = 'Are You Sure?'
  const selectedChoice = document.querySelector('.selected-choice')
  if ((!selectedChoice || currentRound.correctAnswerCount + currentRound.wrongAnswerCount + currentRound.skippedAnswerCount !== currentRound.currentQuestionNumber) && nextButton.textContent !== SURE_TEXT) {
    nextButton.textContent = SURE_TEXT
    return;
  }

  function increaseCounter(currentRound) {
    const count = parseInt(questionCounter.textContent)
    if (count < currentRound.totalQuestionCount) questionCounter.textContent = count + 1
  }
  function enableTextbox() {
    answerTextbox.removeAttribute('disabled')
    textboxPlaceholderToggle()
  }
  function resetTextbox() {
    answerTextbox.value = ''
  }

  const newPrompt = getRandomItem(getPossiblePrompts())
  const newWordObject = WORDS.find(wordObj => {
    return (wordObj.word === newPrompt) || (wordObj.syns.find(synObject => synObject.word === newPrompt))
  })

  if (currentRound.correctAnswerCount + currentRound.wrongAnswerCount + currentRound.skippedAnswerCount < currentRound.currentQuestionNumber) { // Runs before currentQuestionNumber adiition, number of past question
    currentRound.skippedAnswerCount++
  }

  const NEXT_BUTTON_TEXT = 'Next Question'
  currentRound.currentQuestionNumber++
  questionPrompt.textContent = newPrompt;
  answerTextbox.textContent = '';
  nextButton.textContent = NEXT_BUTTON_TEXT


  if (answerSegment.classList.contains('choice-mode')) {
    manipulateChoices(newWordObject, newPrompt)
    resetChoices()
    toggleChoicesAbility(false)
  }
  else {
    resetTextbox()
    enableTextbox()
  }

  increaseCounter(currentRound)
  hideAnswerGrade()
  enableSubmitButtons()
  resetAnswerGradeInfo()
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
      for (const synonymObject of wordObj.syns) {
        if (synonymObject.word === prompt) { return wordObj };
      }
    }
  }
  function getCorrectSynonyms() {
    const prompt = questionPrompt.textContent;
    const promptObject = getPromptObject(prompt)
    const synonymSynonyms = !WORDS.some(wordObject => prompt === wordObject.word) ?
      promptObject.syns.find(synObject => synObject.word === prompt).additionalSyns : { additionalSyns: [] }

    return promptObject.syns
      .map(synObject => { return synObject.word })
      .concat(synonymSynonyms)
      .concat(promptObject.word)
  }
  function disableSubmitButton() {
    submitButton.setAttribute('disabled', '')
  }
  function isRoundWon() {
    return currentRound.correctAnswerCount > (currentRound.wrongAnswerCount + currentRound.skippedAnswerCount)
  }
  function displayCongrats() {
    congratsSegment.classList.add('visible')
  }

  const currentRound = rounds[rounds.length - 1]
  const correctSynonyms = getCorrectSynonyms()
  const selectedChoice = document.querySelector('.selected-choice')
  const selectedChoiceButton = selectedChoice ? selectedChoice.querySelector('.choice__button') : null
  const selectedChoiceText = selectedChoiceButton ? selectedChoiceButton.textContent : ''
  const writtenAnswer = answerTextbox.value

  if (!selectedChoiceText && !writtenAnswer) { return; }
  else if (currentRound.mode === 'multiplechoice') {
    if (correctSynonyms.includes(selectedChoiceText)) {
      motivatingGrade()
      toggleChoicesAbility()
      disableSubmitButton()
      if (currentRound.currentQuestionNumber === currentRound.totalQuestionCount) {
        displayCongrats()
        console.log(isRoundWon(), currentRound)
      }
      if (currentRound.correctAnswerCount + currentRound.wrongAnswerCount + currentRound.skippedAnswerCount !== currentRound.currentQuestionNumber) {
        currentRound.correctAnswerCount++
      }
      const NEXT_BUTTON_TEXT = 'Next Question';
      nextButton.textContent = NEXT_BUTTON_TEXT;
    }
    else {
      selectedChoice.classList.add('disabled')
      wrongGrade()
      resetChoices()
      if (currentRound.correctAnswerCount + currentRound.wrongAnswerCount + currentRound.skippedAnswerCount < currentRound.currentQuestionNumber) {
        currentRound.wrongAnswerCount++
      }
    }
  }
  else {
    if (correctSynonyms.includes(writtenAnswer.toLowerCase())) {
      motivatingGrade()
      answerTextbox.setAttribute('disabled', '')
      if (currentRound.correctAnswerCount + currentRound.wrongAnswerCount + currentRound.skippedAnswerCount === currentRound.currentQuestionNumber) {
        return;
      }
      else { currentRound.correctAnswerCount++ }
    }
    else {
      wrongGrade();
      if (currentRound.correctAnswerCount + currentRound.wrongAnswerCount + currentRound.skippedAnswerCount < currentRound.currentQuestionNumber) {
        currentRound.wrongAnswerCount++
      }
    }
  }

  if (document.querySelectorAll('.choice.disabled').length === 3) {
    const unselectedChoice = Array.from(document.querySelectorAll('.choice'))
      .find(choice => !choice.classList.contains('disabled'))

    unselectedChoice.classList.add('selected-choice')
    unselectedChoice.classList.add('disabled')
    disableSubmitButton()
    wrongGrade()
    displayCongrats()
  }

}

function displayWordInfo() {
  function getActualPromptObject(prompt) { // Gets word object for both normal and synonym words
    for (const wordObj of WORDS) {
      if (wordObj.word === prompt) { return wordObj }
      for (const synonymObject of wordObj.syns) {
        if (synonymObject.word === prompt) { return synonymObject };
      }
    }
  }

  wordInfo.classList.toggle('visible')
  if (wordInfo.classList.contains('visible')) {
    const currentWordObject = getActualPromptObject(questionPrompt.textContent)
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
    resetAnswerGradeInfo()
  }
}

function hideAnswerGrade() {
  answerGradeSegment.classList.remove('correct', 'wrong')
  answerGradeText.textContent = ''
  toggleInfoButton.querySelector('span').textContent = "More about the word"
  toggleInfoButton.querySelector('img').setAttribute('style', 'transform: rotate(-90deg)')
  wordInfo.classList.remove('visible')
}

function resetAnswerGradeInfo() {
  const definitionSection = document.querySelector('.word-info__def')
  const exampleSection = document.querySelector('.word-info__exm')
  exampleSection.querySelectorAll('li').forEach(liElem => liElem.remove())
  definitionSection.querySelectorAll('li').forEach(liElem => liElem.remove())
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
