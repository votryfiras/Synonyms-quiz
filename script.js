const WORDS = [{
  word: 'buy',
  synonyms: ['purchase'],
  antonyms: ['sell'],
  languageLevel: 'A1',
  sentences: ['When buying and selling in the marketplace they scrutinize and carefully choose every single coin.', 'As was mentioned earlier, newcomers who buy supplemental insurance must bear a waiting period, which is expected to discourage moves.', 'In this new luxury market paradigm a great number of people can buy luxury goods.']
}]

const choices = document.querySelectorAll('.choice')
const modeSelect = document.querySelector('.mode-select')
const answerSegment = document.querySelector('.answer-segment')
const answerTextbox = document.querySelector('.answer-textbox')

function selectChoice(e) {
  const selectedChoice = document.querySelector('.selected-choice')
  selectedChoice?.classList.remove('selected-choice')
  e.target.classList.add('selected-choice')
}

function switchMode(e) {
  answerSegment.classList.toggle('choice-mode')
  answerSegment.classList.toggle('insert-mode')
}

function textboxPlaceholderToggle(e) {
  setTimeout(() => {
    if (e.target.value) e.target.offsetParent.classList.add('typing')
    else e.target.offsetParent.classList.remove('typing')
  }, 0)
}

choices.forEach((choice => {
  choice.addEventListener('click', selectChoice)
}))

modeSelect.addEventListener('change', switchMode)

answerTextbox.addEventListener('keydown', textboxPlaceholderToggle)