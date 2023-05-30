import WORDS from './words.js';
import { startStopwatch, stopStopwatch, resetStopwatch, continueStopwatch } from './stopwatch.js';

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
    this.isRoundWon = false
    this.bestStreak = null
    this.quizCompletionTime = 0
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

const DEFAULT_OPTIONS = {
  questionCount: 10,
  isStopwatchOn: true,
  stopwatchTimingMechanism: 'centiseconds',
  stopwatchWhileGrading: false,
}

const options = {}
Object.assign(options, DEFAULT_OPTIONS)

const congratsSegment = document.querySelector('.congrats-segment')
const backdrop = document.querySelector('.backdrop')
const modal = document.querySelector('.modal')
const modeSelect = document.querySelector('.mode-select')
const optionsButton = document.querySelector('.options-button')
// const statsButton = document.querySelector('.stats-button')
const restartButton = document.querySelector('.restart-button')
const questionElement = document.querySelector('.question-segment__question')
const questionCounter = document.querySelector('.question-segment__banner__question-counter')
const questionTotal = document.querySelector('.question-segment__banner__question-total')
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
    optionsButton.setAttribute('disabled', '')

    if (answerSegment.classList.contains('choice-mode')) {
      toggleChoicesAbility(false);
      initChoices(initialPrompt);
      resetChoices();
    }
    else { enableTextbox(); resetTextbox() }

    hideAnswerGrade()
    dependentSubmitButtonsEnable()
  }
  function generateRoundObject() {
    const round = new Round({
      roundNumber: rounds.length + 1,
      totalQuestionCount: options.questionCount,
      mode: modeSelect.value.toLowerCase().replace(/\s/g, ""), // Removes whitespace
    })

    rounds.push(round)
  }
  generateRoundObject()
  roundInit()
  resetStopwatch(options.stopwatchTimingMechanism)
  startStopwatch(options.stopwatchTimingMechanism)
}

function endRound() {
  function isRoundWon() {
    return currentRound.correctAnswerCount > (currentRound.wrongAnswerCount + currentRound.skippedAnswerCount)
  }
  function displayCongrats() {
    congratsSegment.classList.add('visible')
  }
  const currentRound = rounds[rounds.length - 1];
  modeSelect.removeAttribute('disabled');
  optionsButton.removeAttribute('disabled')
  currentRound.isRoundWon = isRoundWon();
  displayCongrats();
  stopStopwatch();
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

function outsideClickCloser(e) {
  e.stopPropagation()
  if (!e.target.closest('.modal')) {
    backdrop.classList.remove('visible')
    while (modal.firstChild) {
      modal.removeChild(modal.firstChild)
    }
  }
}

function switchMode() {
  answerSegment.classList.toggle('choice-mode')
  answerSegment.classList.toggle('insert-mode')
  if (answerSegment.classList.contains("choice-mode")) questionScript.textContent = "Which of these is"
  else questionScript.textContent = "Write"
}

function openOptionsEditor() {
  function addOptionElements() {
    function applyOptions() {
      const modalPortions = document.querySelectorAll(".modal__portion")
      for (const modalPortion of modalPortions) {
        const modalPortionTitle = modalPortion.querySelector('.modal__portion__title__text').textContent
        const modalPortionInput = modalPortion.querySelector('.modal__portion__input').value

        if (modalPortionTitle === questionCountText) {
          options.questionCount = parseInt(modalPortionInput)
          questionTotal.textContent = options.questionCount
        }
        else if (modalPortionTitle === isStopwatchOnText) {
          options.isStopwatchOn = modalPortionInput === 'On'
          const stopwatchElem = document.querySelector('.question-segment__stopwatch')
          if (options.isStopwatchOn) {
            stopwatchElem.classList.add('visible')
          }
          else {
            stopwatchElem.classList.remove('visible')
          }
        }
        else if (modalPortionTitle === stopwatchTimingMechanismText) {
          options.stopwatchTimingMechanism = modalPortionInput.toLowerCase()
        }
        else if (modalPortionTitle === stopwatchWhileGradingText) {
          options.stopwatchWhileGrading = modalPortionInput === 'On'
        }
      }
    }
    const modalHeader = document.createElement('h2')
    const modalPortionContainer = document.createElement('div')
    const modalButtonContainer = document.createElement('div')
    const modalApplyButton = document.createElement('button')

    modalHeader.textContent = 'Options'
    modalApplyButton.textContent = 'Apply'

    modalHeader.classList.add('modal__header')
    modalPortionContainer.classList.add('modal__portion-container')
    modalButtonContainer.classList.add('modal__button-container')
    modalApplyButton.classList.add('modal__apply-button')

    modalApplyButton.addEventListener('click', applyOptions);

    modal.appendChild(modalHeader)
    modal.appendChild(modalPortionContainer)
    modalButtonContainer.appendChild(modalApplyButton)
    modal.appendChild(modalButtonContainer)

  }
  function createModalPortion(option, inputType, inputProps = [], inputEvents = []) {
    const modalPortion = document.createElement('div')
    const modalPortionTitle = document.createElement('div')
    const modalPortionTitleHr = document.createElement('hr')
    const modalPortionTitleText = document.createElement('span')
    const modalPortionInputContainer = document.createElement('div')
    let modalPortionInput;
    if (inputType !== 'select') {
      modalPortionInput = document.createElement('input')
      modalPortionInput.type = inputType
      for (const propObject of inputProps) {
        modalPortionInput.setAttribute(propObject.name, propObject.value)
        modalPortionInput.setAttribute('value', 10)
      }
      for (const eventObject of inputEvents) {
        modalPortionInput.addEventListener(eventObject.name, eventObject.handler)
      }
    }
    else {
      modalPortionInput = document.createElement('select')
      for (const option of inputProps) {
        const modalPortionInputOption = document.createElement('option')
        modalPortionInputOption.textContent = option
        modalPortionInput.appendChild(modalPortionInputOption)
      }
    }

    modalPortion.classList.add('modal__portion')
    modalPortionTitle.classList.add('modal__portion__title')
    modalPortionTitleHr.classList.add('modal__portion__title__hr-line')
    modalPortionTitleText.classList.add('modal__portion__title__text')
    modalPortionInputContainer.classList.add('modal__portion__input-container')
    modalPortionInput.classList.add('modal__portion__input')

    modalPortionTitleText.textContent = option

    modalPortionTitle.appendChild(modalPortionTitleHr)
    modalPortionTitle.appendChild(modalPortionTitleText)

    modalPortionInputContainer.appendChild(modalPortionInput)

    modalPortion.appendChild(modalPortionTitle)
    modalPortion.appendChild(modalPortionInputContainer)

    const modalPortionContainer = document.querySelector('.modal__portion-container')
    modalPortionContainer.appendChild(modalPortion)
  }
  function setModalPortionInputValues() {
    const modalPortions = document.querySelectorAll(".modal__portion")
    for (const modalPortion of modalPortions) {
      const modalPortionTitle = modalPortion.querySelector('.modal__portion__title__text').textContent
      const modalPortionInput = modalPortion.querySelector('.modal__portion__input')

      if (modalPortionTitle === questionCountText) {
        modalPortionInput.value = options.questionCount
      }
      else if (modalPortionTitle === isStopwatchOnText) {
        modalPortionInput.value = options.isStopwatchOn ? 'On' : 'Off'
      }
      else if (modalPortionTitle === stopwatchTimingMechanismText) {
        const timingMechanism = options.stopwatchTimingMechanism
        modalPortionInput.value = timingMechanism.charAt(0).toUpperCase() + timingMechanism.slice(1)
      }
      else if (modalPortionTitle === stopwatchWhileGradingText) {
        modalPortionInput.value = options.stopwatchElementWhileGrading ? 'On' : 'Off'
      }
    }
  }
  function enforceValidValue(e) {
    const modalPortionInput = document.querySelector(
      ".modal__portion__input"
    );

    const inputValue = parseFloat(modalPortionInput.value);
    const maxValue = parseFloat(modalPortionInput.max);
    const minValue = parseFloat(modalPortionInput.min);
    const NUMBERS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

    if (inputValue > maxValue) {
      modalPortionInput.value = maxValue;
    }
    if (inputValue < minValue) {
      modalPortionInput.value = minValue;
    }
    if (!NUMBERS.includes(e.data)) {
      modalPortionInput.value = modalPortionInput.value.replace(e.data, '')
    }
  }

  const questionCountText = 'Question Count'
  const isStopwatchOnText = 'Stopwatch'
  const stopwatchTimingMechanismText = 'Stopwatch Timing Mechanism'
  const stopwatchWhileGradingText = 'Stopwatch While Answer Grading'

  addOptionElements()
  backdrop.classList.add('visible')

  createModalPortion(questionCountText, 'number',
    [{ name: "max", value: "30" }, { name: "min", value: "1" }, { name: "value", value: "10" }],
    [{ name: "input", handler: enforceValidValue }, { name: 'click', handler: e => e.target.select() }])
  createModalPortion(isStopwatchOnText, 'select', ['On', 'Off'])
  createModalPortion(stopwatchTimingMechanismText, 'select', ['Centiseconds', 'Deciseconds', 'Seconds'])
  createModalPortion(stopwatchWhileGradingText, 'select', ['On', 'Off'])
  setModalPortionInputValues()
}

function textboxPlaceholderToggle() {
  setTimeout(() => {
    if (answerTextbox.value) answerTextboxContainer.classList.add('typing')
    else answerTextboxContainer.classList.remove('typing')
  }, 0)
}

function dependentSubmitButtonsEnable() {
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
  if ((!selectedChoice && answerSegment.classList.contains('choice-mode') || currentRound.correctAnswerCount + currentRound.wrongAnswerCount + currentRound.skippedAnswerCount !== currentRound.currentQuestionNumber) && nextButton.textContent !== SURE_TEXT) {
    nextButton.textContent = SURE_TEXT
    return;
  }

  function increaseCounter() {
    const count = parseInt(questionCounter.textContent)
    questionCounter.textContent = count + 1
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

  if (!(currentRound.correctAnswerCount + currentRound.wrongAnswerCount + currentRound.skippedAnswerCount < currentRound.currentQuestionNumber)) { // Runs before currentQuestionNumber adiition, number of past question
    if (!options.stopwatchWhileGrading) { continueStopwatch(options.stopwatchTimingMechanism) }
  }
  else { currentRound.skippedAnswerCount++ }

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

  increaseCounter()
  hideAnswerGrade()
  dependentSubmitButtonsEnable()
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
      if (currentRound.currentQuestionNumber === currentRound.totalQuestionCount) { // Round ended
        endRound()
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
      disableSubmitButton()
      if (currentRound.currentQuestionNumber === currentRound.totalQuestionCount) { // Round ended
        endRound()
      }
      answerTextbox.setAttribute('disabled', '')
      if (currentRound.correctAnswerCount + currentRound.wrongAnswerCount + currentRound.skippedAnswerCount === currentRound.currentQuestionNumber) {
        return;
      }
      currentRound.correctAnswerCount++
    }
    else { // If wrong answer
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
    if (currentRound.currentQuestionNumber === currentRound.totalQuestionCount) {
      endRound()
    }
  }

  if (!options.stopwatchWhileGrading) { stopStopwatch() }
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
optionsButton.addEventListener('click', openOptionsEditor)
backdrop.addEventListener('click', outsideClickCloser)
