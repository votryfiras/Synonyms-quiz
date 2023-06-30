import WORDS from '../shared/words.js';
import { startStopwatch, resetStopwatch } from '../utils/stopwatch.js';
import { getRandomItem, getPossiblePrompts, getCorrectSynonyms } from '../utils/utils.js';
import { manipulateChoices, toggleChoicesAbility, resetChoices, enableSubmitButtons } from '../utils/answerUtils.js';
import { hideAnswerGrade } from "../utils/gradeUtils.js";
import endRound from '../utils/endRound.js';

class Round {
  constructor(props) {
    this.roundNumber = props.roundNumber;
    this.totalQuestionCount = props.totalQuestionCount;
    this.terminatedAt = null;
    this.mode = props.mode;
    this.currentQuestionNumber = 1;
    this.correctAnswerCount = 0;
    this.wrongAnswerCount = 0;
    this.skippedAnswerCount = 0;
    this.isRoundWon = false;
    this.bestStreak = null;
    this.completionTime = 0;
    this.streaks = [0];
    this.prompts = [];
    this.prompts.push(props.initialPromptObject);
  }
}

const modeSelectElem = document.querySelector('.mode-select');
const optionsButton = document.querySelector('.function-button--options-button');
const statsButton = document.querySelector('.function-button--stats-button');
const restartButtonElem = document.querySelector('.function-button--restart-button');
const questionPromptElem = document.querySelector('.question__prompt');
const choiceButtons = document.querySelectorAll('.choice__button');
const answerTextboxElem = document.querySelector('#answer-textbox');

export function restartClickHandle(rounds, options) {
  if (restartButtonElem.hasAttribute('data-end')) {
    const currentRound = rounds[rounds.length - 1];
    restartButtonElem.removeAttribute('data-end');
    restartButtonElem.querySelector('[data-restart-text]').textContent = 'Start Game';
    currentRound.terminatedAt = currentRound.currentQuestionNumber;
    endRound(rounds);
    return;
  }
  function roundInit() {
    function enableTextbox() {
      answerTextboxElem.removeAttribute('disabled');
    }
    function resetTextbox() {
      answerTextboxElem.value = '';
    }
    function resetStatCounters() {
      const correctCounter = document.querySelector('[data-correct-counter]');
      const streakCounter = document.querySelector('[data-streak-counter]');
      correctCounter.textContent = '0';
      streakCounter.textContent = '0';
    }

    const possiblePrompts = getPossiblePrompts();
    const initialPrompt = getRandomItem(possiblePrompts);
    const questionElement = document.querySelector('.question-segment__question');

    questionPromptElem.textContent = initialPrompt;
    questionElement.classList.remove('disabled');
    restartButtonElem.querySelector('[data-restart-text]').textContent = "End Game";
    restartButtonElem.setAttribute('data-end', '');
    modeSelectElem.setAttribute('disabled', '');
    optionsButton.setAttribute('disabled', '');
    statsButton.setAttribute('disabled', '');

    if (modeSelectElem.value.toLowerCase().replace(/\s/g, "") === 'multiplechoice') {
      toggleChoicesAbility(false);
      initChoices(initialPrompt);
      resetChoices();
    }
    else { enableTextbox(); resetTextbox(); }

    hideAnswerGrade();
    resetStatCounters();
  }
  function generateRoundObject() {
    const choices = modeSelectElem.value.toLowerCase().replace(/\s/g, "") === 'multiplechoice'
      ? Array.from(choiceButtons).map(btn => btn.textContent)
      : [];
    const round = new Round({
      roundNumber: rounds.length + 1,
      totalQuestionCount: options.questionCount,
      mode: modeSelectElem.value.toLowerCase().replace(/\s/g, ""), // Removes whitespace
      initialPromptObject: {
        word: questionPromptElem.textContent,
        choices: choices,
        selectedChoices: [],
        correctAnswers: modeSelectElem.value.toLowerCase().replace(/\s/g, "") === 'multiplechoice' ?
          getCorrectSynonyms(questionPromptElem.textContent).filter(syn => choices.includes(syn))
          : getCorrectSynonyms(questionPromptElem.textContent),
      }
    });

    rounds.push(round);
  }

  roundInit();
  generateRoundObject();
  enableSubmitButtons();
  resetStopwatch(options.stopwatchTimingMechanism);
  startStopwatch(options.stopwatchTimingMechanism);
}

function initChoices(initialPrompt) {
  const questionCounter = document.querySelector('.question-segment__banner__question-counter');
  const initialPromptObj = WORDS.find(wordObj => {
    return (wordObj.word === initialPrompt) || (wordObj.syns.find(synObject => synObject.word === initialPrompt));
  });
  questionCounter.textContent = 1;
  manipulateChoices(initialPromptObj, initialPrompt);
}