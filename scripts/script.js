import { textboxPlaceholderToggle } from "./utils/answerUtils.js";
import { restartClickHandle } from './app/restart.js';
import { openOptionsEditor, outsideClickCloser } from './app/modal.js';
import { submitClickHandle, nextClickHandle } from './app/submit.js';
import { displayWordInfo } from './app/grade.js';

const rounds = [];

const DEFAULT_OPTIONS = {
  questionCount: 10,
  isStopwatchOn: true,
  stopwatchTimingMechanism: 'centiseconds',
  stopwatchWhileGrading: false,
};

const options = {};
Object.assign(options, DEFAULT_OPTIONS);

const backdrop = document.querySelector('.backdrop');
const modeSelect = document.querySelector('.mode-select');
const optionsButton = document.querySelector('.function-button--options-button');
// const statsButton = document.querySelector('.function-button--stats-button')
const restartButton = document.querySelector('.function-button--restart-button');
const questionScript = document.querySelector(".question__script");
const choiceButtons = document.querySelectorAll('.choice__button');
const answerSegment = document.querySelector('.answer-segment');
const answerTextbox = document.querySelector('#answer-textbox');
const nextButton = document.querySelector(".next-button");
const submitButton = document.querySelector(".submit-button");
const toggleInfoButton = document.querySelector('.answer-grade__toggle-info');

function selectChoice(e) {
  if (!e.target.classList.contains('disabled')) {
    const selectedChoice = document.querySelector('.selected-choice');
    if (selectedChoice) selectedChoice.classList.remove('selected-choice');
    e.target.parentElement.classList.add('selected-choice');
  }
}

function switchMode() {
  answerSegment.classList.toggle('choice-mode');
  answerSegment.classList.toggle('insert-mode');
  if (answerSegment.classList.contains("choice-mode")) questionScript.textContent = "Which of these is";
  else questionScript.textContent = "Write down";
}

choiceButtons.forEach((choice => {
  choice.addEventListener('click', selectChoice);
}));

modeSelect.addEventListener('change', switchMode);
answerTextbox.addEventListener('keydown', textboxPlaceholderToggle);
nextButton.addEventListener('click', () => nextClickHandle(rounds, options));
submitButton.addEventListener('click', () => submitClickHandle(rounds, options));
toggleInfoButton.addEventListener('click', displayWordInfo);
// statsButton.addEventListener('click', displayStats(rounds))
optionsButton.addEventListener('click', () => openOptionsEditor(options));
restartButton.addEventListener('click', () => restartClickHandle(rounds, options));
backdrop.addEventListener('click', outsideClickCloser);
