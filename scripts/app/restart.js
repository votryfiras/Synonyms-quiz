import WORDS from '../shared/words.js';
import { startStopwatch, resetStopwatch } from '../utils/stopwatch.js';
import { getRandomItem, getPossiblePrompts, getCorrectSynonyms } from '../utils/utils.js';
import { manipulateChoices, toggleChoicesAbility, resetChoices, enableSubmitButtons, resetTextbox, textboxPlaceholderToggle } from '../utils/answerUtils.js';
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
  const restartSVGPath = restartButtonElem.querySelector('path');
  if (restartButtonElem.hasAttribute('data-end')) {
    const currentRound = rounds[rounds.length - 1];
    restartButtonElem.removeAttribute('data-end');
    restartButtonElem.querySelector('[data-restart-text]').textContent = 'Start Game';
    restartSVGPath.setAttribute("d", "M105.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L386.3 160H336c-17.7 0-32 14.3-32 32s14.3 32 32 32H463.5c0 0 0 0 0 0h.4c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32s-32 14.3-32 32v51.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM39 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1V448c0 17.7 14.3 32 32 32s32-14.3 32-32V396.9l17.6 17.5 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L125.6 352H176c17.7 0 32-14.3 32-32s-14.3-32-32-32H48.4c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z");
    currentRound.terminatedAt = currentRound.currentQuestionNumber;
    endRound(rounds);
    return;
  }
  function roundInit() {
    function enableTextbox() {
      answerTextboxElem.removeAttribute('disabled');
    }
    function resetStatCounters() {
      const correctCounter = document.querySelector('[data-correct-counter]');
      const streakCounter = document.querySelector('[data-streak-counter]');
      correctCounter.textContent = '0';
      streakCounter.textContent = '0';
    }
    function resetQuestionCounter() {
      const questionCounter = document.querySelector('.question-segment__banner__question-counter');
      questionCounter.textContent = 1;
    }

    const possiblePrompts = getPossiblePrompts();
    const initialPrompt = getRandomItem(possiblePrompts);
    const questionElement = document.querySelector('.question-segment__question');
    const statsContainer = document.querySelector('.question-segment__stats');

    questionPromptElem.textContent = initialPrompt;
    questionElement.classList.remove('disabled');
    statsContainer.classList.remove('disabled');
    restartButtonElem.querySelector('[data-restart-text]').textContent = "End Game";
    restartButtonElem.setAttribute('data-end', '');
    restartSVGPath.setAttribute("d", "M408.781 128.007C386.356 127.578 368 146.36 368 168.79V256h-8V79.79c0-22.43-18.356-41.212-40.781-40.783C297.488 39.423 280 57.169 280 79v177h-8V40.79C272 18.36 253.644-.422 231.219.007 209.488.423 192 18.169 192 40v216h-8V80.79c0-22.43-18.356-41.212-40.781-40.783C121.488 40.423 104 58.169 104 80v235.992l-31.648-43.519c-12.993-17.866-38.009-21.817-55.877-8.823-17.865 12.994-21.815 38.01-8.822 55.877l125.601 172.705A48 48 0 0 0 172.073 512h197.59c22.274 0 41.622-15.324 46.724-37.006l26.508-112.66a192.011 192.011 0 0 0 5.104-43.975V168c.001-21.831-17.487-39.577-39.218-39.993z");
    modeSelectElem.setAttribute('disabled', '');
    optionsButton.setAttribute('disabled', '');
    statsButton.setAttribute('disabled', '');

    if (modeSelectElem.value.toLowerCase().replace(/\s/g, "") === 'multiplechoice') { // replace() removes whitespace
      toggleChoicesAbility(false);
      initChoices(initialPrompt);
    }
    else { enableTextbox(); resetTextbox(); textboxPlaceholderToggle() }

    resetChoices();
    resetTextbox()
    hideAnswerGrade();
    resetQuestionCounter();
    resetStatCounters();
    enableSubmitButtons();
    resetStopwatch(options.stopwatchTimingMechanism);
    startStopwatch(options.stopwatchTimingMechanism);
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
}

function initChoices(initialPrompt) {
  const initialPromptObj = WORDS.find(wordObj => {
    return (wordObj.word === initialPrompt) || (wordObj.syns.find(synObject => synObject.word === initialPrompt));
  });
  manipulateChoices(initialPromptObj, initialPrompt);
}