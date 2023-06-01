import WORDS from './words.js';
import { startStopwatch, stopStopwatch, resetStopwatch, continueStopwatch } from './stopwatch.js';

const EXCLUDED_INSERT_PROMPTS = ['pollution', 'pan', 'carbon footprint']
const CORRECT_PHRASES = ['Good job!', "You've got it made!", 'Super!', 'Excellent!', 'Good work!', "You've got that down pat.", "Perfect!", "Fantastic!", "Tremendous!", "Great!", "Nice job!", "I'm impressed!", "Marvelous!", "You've got the hang of it!", "Super-Duper!", "Out of sight!", "You've got your brain in gear today."]
const WRONG_PHRASES = ["You must have been a scavenger...", "You certainly did well today.", "Not bad.", "You are learning a lot though.", "Don't be upset, everything is okay!", "You did a lot of work today.", "Don't jump ship just yet.", "Never give up.", "Don't throw in the towel just yet.", "Keep the faith a while longer.", "Ah, what a loser!"]

class Round {
  constructor(props) {
    this.roundNumber = props.roundNumber
    this.totalQuestionCount = props.totalQuestionCount
    this.terminatedAt = null
    this.mode = props.mode
    this.currentQuestionNumber = 1
    this.correctAnswerCount = 0
    this.wrongAnswerCount = 0
    this.skippedAnswerCount = 0
    this.isRoundWon = false
    this.bestStreak = null
    this.completionTime = 0
    this.streaks = [0]
    this.prompts = []
    this.prompts.push(props.initialPromptObject)
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
          selectedChoice: ["container"],
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
const statsButton = document.querySelector('.stats-button')
const restartButton = document.querySelector('.restart-button')
const questionElement = document.querySelector('.question-segment__question')
const correctCounter = document.querySelector('[data-correct-counter]')
const streakCounter = document.querySelector('[data-streak-counter]')
const stopwatchDisplay = document.querySelector('.question-segment__stopwatch__display')
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

function convertToSeconds(time) {
  const [minutes, secondsAndCentiseconds] = time.split(':');
  const [seconds, centiseconds] = secondsAndCentiseconds.split('.');
  const totalSeconds = parseInt(minutes) * 60 + parseInt(seconds) + parseInt(centiseconds) / 100;
  return parseFloat(totalSeconds.toFixed(2));
}

function convertToFormattedTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  const centiseconds = Math.floor((seconds % 1) * 100);

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');
  const formattedCentiseconds = String(centiseconds).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}.${formattedCentiseconds}`;
}

function startRound() {
  if (restartButton.hasAttribute('data-end')) {
    const currentRound = rounds[rounds.length - 1]
    restartButton.removeAttribute('data-end')
    restartButton.querySelector('[data-restart-text]').textContent = 'Start Game'
    currentRound.terminatedAt = currentRound.currentQuestionNumber
    endRound()
    return;
  }
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
    restartButton.querySelector('[data-restart-text]').textContent = "End Game";
    restartButton.setAttribute('data-end', '')
    modeSelect.setAttribute('disabled', '')
    optionsButton.setAttribute('disabled', '')
    statsButton.setAttribute('disabled', '')

    if (modeSelect.value.toLowerCase().replace(/\s/g, "") === 'multiplechoice') {
      toggleChoicesAbility(false);
      initChoices(initialPrompt);
      resetChoices();
    }
    else { enableTextbox(); resetTextbox() }

    hideAnswerGrade()
  }
  function generateRoundObject() {
    const choices = modeSelect.value.toLowerCase().replace(/\s/g, "") === 'multiplechoice'
      ? Array.from(choiceButtons).map(btn => btn.textContent)
      : []
    const round = new Round({
      roundNumber: rounds.length + 1,
      totalQuestionCount: options.questionCount,
      mode: modeSelect.value.toLowerCase().replace(/\s/g, ""), // Removes whitespace
      initialPromptObject: {
        word: questionPrompt.textContent,
        choices: choices,
        selectedChoices: [],
        correctAnswers: modeSelect.value.toLowerCase().replace(/\s/g, "") === 'multiplechoice' ?
          getCorrectSynonyms(questionPrompt.textContent).filter(syn => choices.includes(syn))
          : getCorrectSynonyms(questionPrompt.textContent),
      }
    })

    rounds.push(round)
  }
  roundInit()
  generateRoundObject()
  enableSubmitButtons()
  resetStopwatch(options.stopwatchTimingMechanism)
  startStopwatch(options.stopwatchTimingMechanism)
}

function endRound() {
  function disableSubmitButtons() {
    nextButton.setAttribute('disabled', '')
    submitButton.setAttribute('disabled', '')
  }

  const currentRound = rounds[rounds.length - 1];
  modeSelect.removeAttribute('disabled');
  optionsButton.removeAttribute('disabled')
  statsButton.removeAttribute('disabled')
  currentRound.completionTime = convertToSeconds(stopwatchDisplay.textContent)
  if (!currentRound.terminatedAt) { // If round not terminated
    function resetRestartButton() {
      restartButton.removeAttribute('data-end')
      restartButton.querySelector('[data-restart-text]').textContent = 'Start Game'
    }
    function isRoundWon() {
      return currentRound.correctAnswerCount > (currentRound.wrongAnswerCount + currentRound.skippedAnswerCount)
    }
    function displayCongrats() {
      function setGradeTerm() {
        if (currentRound.isRoundWon) {
          congratsGradeTerm.textContent = 'WON! Well Done!'
          congratsGradeTerm.classList.add('won')
        }
        else {
          console.log(currentRound.isRoundWon)
          congratsGradeTerm.textContent = 'Lost. Better luck next time!'
          congratsGradeTerm.classList.add('lost')
        }
      }
      const ELLIPSIS_ANIMATION_DURATION = 3200
      const CONGRATS_VISIBILITY_ANIMATION_DURATION = 10000
      const congratsGradeTerm = document.querySelector('.congrats__grade__term')

      congratsSegment.classList.add('visible')
      setTimeout(setGradeTerm, ELLIPSIS_ANIMATION_DURATION)
      setTimeout(() => {
        congratsSegment.classList.remove('visible')
        congratsGradeTerm.textContent = ''
      }, CONGRATS_VISIBILITY_ANIMATION_DURATION)
    }
    currentRound.isRoundWon = isRoundWon();
    nextButton.setAttribute('disabled', '')
    resetRestartButton()
    displayCongrats();
  }
  else {
    function pushRoundPromptObject() {
      const choices = currentRound.mode === "multiplechoice"
        ? Array.from(choiceButtons).map(btn => btn.textContent)
        : []
      const correctAnswers = currentRound.mode === 'multiplechoice' ?
        getCorrectSynonyms(prompt).filter(syn => choices.includes(syn))
        : getCorrectSynonyms(prompt)

      const promptRoundObject = {
        word: prompt,
        choices,
        selectedChoices: [],
        correctAnswers,
      }
      currentRound.prompts.push(promptRoundObject)
    }

    const prompt = questionPrompt.textContent
    if (currentRound.prompts[currentRound.prompts.length - 1].word !== prompt) {
      pushRoundPromptObject()
    }
    restartButton.querySelector('[data-restart-text]').textContent = 'Start Game';
    toggleChoicesAbility();
  };
  disableSubmitButtons();
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

function getPossiblePrompts(additionalExcludedPrompts = []) {
  let excludedPrompts = []
  if (answerSegment.classList.contains('insert-mode')) {
    excludedPrompts = EXCLUDED_INSERT_PROMPTS
  }
  excludedPrompts = excludedPrompts.concat(additionalExcludedPrompts)

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
  const choices = document.querySelectorAll('.choice')
  if (!disable) {
    choices.forEach(choice => {
      choice.classList.remove('disabled')
      choice.querySelector('.choice__button').removeAttribute('disabled', '')
    })
  }
  else {
    choices.forEach(choice => {
      choice.classList.add('disabled')
      choice.querySelector('.choice__button').setAttribute('disabled', '')
    })

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

function displayStats() {
  function addOptionElements() {
    const modalHeader = document.createElement("header")
    const modalHeaderTitle = document.createElement('h2')
    const modalPortionContainer = document.createElement('div')
    const modalButtonContainer = document.createElement('div')

    modalHeaderTitle.textContent = 'Round Stats'

    modalHeader.classList.add('modal__header')
    modalHeaderTitle.classList.add('modal__header__title')
    modalPortionContainer.classList.add('modal__portion-container')
    modalButtonContainer.classList.add('modal__button-container')

    modalHeader.appendChild(modalHeaderTitle)
    modal.appendChild(modalHeader)
    modal.appendChild(modalPortionContainer)
    modal.appendChild(modalButtonContainer)

  }
  function createModalPortion(round) {
    function createStatElement(statTitle, statValue) {
      if (!Array.isArray(statValue)) {
        const modalPortionStatListItem = document.createElement('li')
        const modalPortionStatListItemTitle = document.createElement('span')
        const modalPortionStatListItemValue = document.createElement('span')

        modalPortionStatListItemTitle.textContent = statTitle
        modalPortionStatListItemValue.textContent = statValue

        modalPortionStatList.classList.add('modal__portion__stat-list')
        modalPortionStatListItem.classList.add('modal__portion__stat-list__item')
        modalPortionStatListItemValue.classList.add('modal__portion__stat-list__item__value')

        modalPortion.appendChild(modalPortionStatList)
        modalPortionStatList.appendChild(modalPortionStatListItem)
        modalPortionStatListItem.appendChild(modalPortionStatListItemTitle)
        modalPortionStatListItem.appendChild(modalPortionStatListItemValue)
      }
      else {
        const modalPortionStatListItem = document.createElement('li')
        const modalPortionStatListItemTitle = document.createElement('p')
        const modalPortionSubList = document.createElement('ul')

        modalPortionSubList.classList.add('modal__portion__stat-list__item--sublist-container__sublist')
        modalPortionStatListItem.classList.add('modal__portion__stat-list__item--sublist-container')
        modalPortionStatListItemTitle.classList.add('modal__portion__stat-list__item--sublist-container__title')

        modalPortionStatListItemTitle.textContent = statTitle

        statValue.forEach(subStatValue => {
          if (!Array.isArray(subStatValue)) {
            const modalPortionSubListItem = document.createElement('li')
            const modalPortionSubListItemValue = document.createElement('span')
            modalPortionSubListItem.classList.add('modal__portion__stat-list__item--sublist-container__sublist__item')
            modalPortionSubListItemValue.classList.add('modal__portion__stat-list__item--sublist-container__sublist__item__value')
            modalPortionSubListItemValue.textContent = subStatValue
            modalPortionSubListItem.appendChild(modalPortionSubListItemValue)
            modalPortionSubList.appendChild(modalPortionSubListItem)
          }
        })
        modalPortionStatListItem.appendChild(modalPortionStatListItemTitle)
        modalPortionStatListItem.appendChild(modalPortionSubList)
        modalPortionStatList.appendChild(modalPortionStatListItem)
      }
    }

    const modalPortion = document.createElement('div')
    const modalPortionTitle = document.createElement('div')
    const modalPortionTitleHr = document.createElement('hr')
    const modalPortionTitleText = document.createElement('span')
    const modalPortionStatList = document.createElement('ul')

    modalPortion.classList.add('modal__portion')
    modalPortionTitle.classList.add('modal__portion__title')
    modalPortionTitleHr.classList.add('modal__portion__title__hr-line')
    modalPortionTitleText.classList.add('modal__portion__title__text')

    modalPortionTitleText.textContent = 'Round ' + round.roundNumber.toString()

    modalPortionTitle.appendChild(modalPortionTitleHr)
    modalPortionTitle.appendChild(modalPortionTitleText)
    modalPortion.appendChild(modalPortionTitle)

    const modalPortionContainer = document.querySelector('.modal__portion-container')
    modalPortionContainer.appendChild(modalPortion)
    createStatElement('Mode', round.mode === 'multiplechoice' ? 'Multiple Choice' : 'Insert')
    createStatElement('Total question count', round.totalQuestionCount.toString())
    createStatElement('Correct answers', round.correctAnswerCount.toString())
    createStatElement('Wrong answers', round.wrongAnswerCount.toString())
    createStatElement('Skipped answers', round.skippedAnswerCount.toString())
    createStatElement('Terminated at question', round.terminatedAt ? round.terminatedAt.toString() : 'Not terminated')
    createStatElement('Completion time', convertToFormattedTime(round.completionTime))
    createStatElement('Streaks', round.streaks)
  }

  addOptionElements()
  rounds.forEach(round => createModalPortion(round))
  backdrop.classList.add('visible')
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
    const modalHeader = document.createElement("header")
    const modalHeaderTitle = document.createElement('h2')
    const modalPortionContainer = document.createElement('div')
    const modalButtonContainer = document.createElement('div')
    const modalApplyButton = document.createElement('button')

    modalHeaderTitle.textContent = 'Options'
    modalApplyButton.textContent = 'Apply'

    modalHeader.classList.add('modal__header')
    modalHeaderTitle.classList.add('modal__header__title', 'options-header')
    modalPortionContainer.classList.add('modal__portion-container')
    modalButtonContainer.classList.add('modal__button-container')
    modalApplyButton.classList.add('modal__apply-button')

    modalApplyButton.addEventListener('click', applyOptions);

    modalHeader.appendChild(modalHeaderTitle)
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

function enableSubmitButtons() {
  submitButton.removeAttribute('disabled')
  nextButton.removeAttribute('disabled')
}

function getCorrectSynonyms(prompt) {
  function getPromptObject() {
    for (const wordObj of WORDS) {
      if (wordObj.word === prompt) { return wordObj }
      for (const synonymObject of wordObj.syns) {
        if (synonymObject.word === prompt) { return wordObj };
      }
    }
  }
  const promptObject = getPromptObject()
  const synonymSynonyms = !WORDS.some(wordObject => prompt === wordObject.word) ?
    promptObject.syns.find(synObject => synObject.word === prompt).additionalSyns : { additionalSyns: [] }

  return promptObject.syns
    .map(synObject => { return synObject.word })
    .concat(synonymSynonyms)
    .concat(promptObject.word)
}

function nextQuestion() {
  function pushRoundPromptObject() {
    const choices = currentRound.mode === "multiplechoice"
      ? Array.from(choiceButtons).map(btn => btn.textContent)
      : []
    const correctAnswers = currentRound.mode === 'multiplechoice' ?
      getCorrectSynonyms(prompt).filter(syn => choices.includes(syn))
      : getCorrectSynonyms(prompt)

    const promptRoundObject = {
      word: prompt,
      choices,
      selectedChoices: [],
      correctAnswers,
    }
    currentRound.prompts.push(promptRoundObject)
  }
  function cutStreak() {
    const streaks = currentRound.streaks
    if (streaks[streaks.length - 1] !== 0) {
      streaks.push(0)
    }
  }

  const currentRound = rounds[rounds.length - 1];
  const NEXT_BUTTON_TEXT = 'Next Question'
  const SURE_TEXT = 'Are You Sure?';
  const SKIP_TEXT = 'Skip Question';
  const prompt = questionPrompt.textContent;
  const selectedChoice = document.querySelector('.selected-choice')
  if ((!selectedChoice && currentRound.mode === 'multiplechoice' || currentRound.correctAnswerCount + currentRound.wrongAnswerCount + currentRound.skippedAnswerCount !== currentRound.currentQuestionNumber) && nextButton.textContent !== SURE_TEXT) {
    nextButton.textContent = SURE_TEXT
    return;
  }
  if (nextButton.hasAttribute('data-skip')) {
    currentRound.skippedAnswerCount++
    nextButton.textContent = NEXT_BUTTON_TEXT
    nextButton.removeAttribute('data-skip')
    pushRoundPromptObject()
    toggleChoicesAbility()
    endRound()
    return;
  }

  function increaseCounter() {
    const count = parseInt(questionCounter.textContent)
    questionCounter.textContent = count + 1
  }
  function pickNewPrompt() {
    const currentPrompt = questionPrompt.textContent
    const excludedPrompts = currentRound.prompts.map(promptObject => promptObject.word)
    if (!excludedPrompts.includes(currentPrompt)) {
      excludedPrompts.push(currentPrompt)
    }
    const newPrompt = getRandomItem(getPossiblePrompts(excludedPrompts))
    return newPrompt
  }
  function enableTextbox() {
    answerTextbox.removeAttribute('disabled')
    textboxPlaceholderToggle()
  }
  function resetTextbox() {
    answerTextbox.value = ''
  }

  const newPrompt = pickNewPrompt()
  const newWordObject = WORDS.find(wordObj => {
    return (wordObj.word === newPrompt) || (wordObj.syns.find(synObject => synObject.word === newPrompt))
  })

  if (!(currentRound.correctAnswerCount + currentRound.wrongAnswerCount + currentRound.skippedAnswerCount < currentRound.currentQuestionNumber)) { // Runs before currentQuestionNumber adiition, number of past question
    const choices = document.querySelectorAll('.choice')
    const areChoiceButtonsDisabled = Array.from(choices).every(choice => {
      return choice.classList.contains('disabled')
    })
    if (!options.stopwatchWhileGrading && areChoiceButtonsDisabled) { // && Question not skipped
      continueStopwatch(options.stopwatchTimingMechanism)
    }
  }
  else {
    currentRound.skippedAnswerCount++;
    cutStreak();
    streakCounter.textContent = 0
  }

  currentRound.currentQuestionNumber++
  questionPrompt.textContent = newPrompt;
  answerTextbox.textContent = '';
  nextButton.textContent = NEXT_BUTTON_TEXT

  if (currentRound.prompts[currentRound.prompts.length - 1]) {
    const currentRoundWordObject = currentRound.prompts[currentRound.prompts.length - 1]
    if (currentRoundWordObject.word !== prompt) {
      pushRoundPromptObject()
    }
  }

  if (currentRound.mode === 'multiplechoice') {
    manipulateChoices(newWordObject, newPrompt)
    resetChoices()
    toggleChoicesAbility(false)
  }
  else {
    resetTextbox()
    enableTextbox()
  }

  if (currentRound.currentQuestionNumber === currentRound.totalQuestionCount) {
    nextButton.textContent = SKIP_TEXT
    nextButton.setAttribute('data-skip', '')
  }

  increaseCounter()
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
  function pushRoundPromptObject() {
    const choices = currentRound.mode === "multiplechoice"
      ? Array.from(choiceButtons).map(btn => btn.textContent)
      : []
    const correctAnswers = currentRound.mode === 'multiplechoice' ?
      getCorrectSynonyms(prompt).filter(syn => choices.includes(syn))
      : getCorrectSynonyms(prompt)

    const promptRoundObject = {
      word: prompt,
      choices,
      selectedChoices: [],
      correctAnswers,
    }
    currentRound.prompts.push(promptRoundObject)
  }
  function increaseStreak() {
    const streaks = currentRound.streaks
    streaks[streaks.length - 1]++
    const largestStreak = Math.max(...streaks)
    currentRound.bestStreak = largestStreak
  }
  function cutStreak() {
    const streaks = currentRound.streaks
    if (streaks[streaks.length - 1] !== 0) {
      streaks.push(0)
    }
  }
  function increaseCounters() {
    const correctCount = parseInt(correctCounter.textContent)
    const streakCount = parseInt(streakCounter.textContent)
    correctCounter.textContent = correctCount + 1
    streakCounter.textContent = streakCount + 1
  }
  function resetStreakCounter() {
    streakCounter.textContent = 0
  }
  function disableSubmitButton() {
    submitButton.setAttribute('disabled', '')
  }

  const currentRound = rounds[rounds.length - 1]
  const prompt = questionPrompt.textContent;
  const correctSynonyms = getCorrectSynonyms(prompt)
  const selectedChoice = document.querySelector('.selected-choice')
  const selectedChoiceButton = selectedChoice ? selectedChoice.querySelector('.choice__button') : null
  const selectedChoiceText = selectedChoiceButton ? selectedChoiceButton.textContent : ''
  const writtenAnswer = answerTextbox.value

  if (selectedChoice) {
    const currentRoundPromptsObject = currentRound.prompts[currentRound.prompts.length - 1]
    if (currentRoundPromptsObject && currentRoundPromptsObject.word === prompt) {
      currentRoundPromptsObject.selectedChoices.push(selectedChoiceButton.textContent)
    }
    else if (currentRoundPromptsObject) {
      pushRoundPromptObject()
      const updatedCurrentRoundPromptsObject = currentRound.prompts[currentRound.prompts.length - 1]
      updatedCurrentRoundPromptsObject.selectedChoices.push(selectedChoiceButton.textContent)
    }
  }

  if (!selectedChoiceText && !writtenAnswer) { return; }
  else if (currentRound.mode === 'multiplechoice') {
    if (correctSynonyms.includes(selectedChoiceText)) { // If correct answer
      motivatingGrade()
      toggleChoicesAbility()
      disableSubmitButton()
      if (currentRound.currentQuestionNumber === currentRound.totalQuestionCount) { // Round ended
        endRound()
      }
      if (currentRound.correctAnswerCount + currentRound.wrongAnswerCount + currentRound.skippedAnswerCount !== currentRound.currentQuestionNumber) {
        currentRound.correctAnswerCount++
        increaseStreak()
        increaseCounters()
      }
      if (!options.stopwatchWhileGrading) { stopStopwatch() }
      const NEXT_BUTTON_TEXT = 'Next Question';
      nextButton.textContent = NEXT_BUTTON_TEXT;
    }
    else {
      selectedChoice.classList.add('disabled')
      selectedChoiceButton.setAttribute('disabled', '')
      wrongGrade()
      cutStreak()
      resetStreakCounter()
      resetChoices()
      if (currentRound.correctAnswerCount + currentRound.wrongAnswerCount + currentRound.skippedAnswerCount < currentRound.currentQuestionNumber) {
        currentRound.wrongAnswerCount++
      }
    }
  }
  else {
    if (correctSynonyms.includes(writtenAnswer.toLowerCase())) { // If correct answer
      motivatingGrade()
      disableSubmitButton()
      increaseStreak()
      if (currentRound.currentQuestionNumber === currentRound.totalQuestionCount) { // Round ended
        endRound()
      }
      if (!options.stopwatchWhileGrading) { stopStopwatch() }
      answerTextbox.setAttribute('disabled', '')
      if (currentRound.correctAnswerCount + currentRound.wrongAnswerCount + currentRound.skippedAnswerCount === currentRound.currentQuestionNumber) {
        return;
      }
      currentRound.correctAnswerCount++
    }
    else { // If wrong answer
      wrongGrade();
      cutStreak()
      resetStreakCounter()
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
    unselectedChoice.querySelector('.choice__button').setAttribute('disabled', '')
    disableSubmitButton()
    wrongGrade()
    if (currentRound.currentQuestionNumber === currentRound.totalQuestionCount) {
      endRound()
    }
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
statsButton.addEventListener('click', displayStats)
optionsButton.addEventListener('click', openOptionsEditor)
backdrop.addEventListener('click', outsideClickCloser)
