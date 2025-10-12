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
const restartButtonElemText= restartButtonElem.querySelector('[data-restart-text]')


function initChoices(initialPrompt) {
  const initialPromptObj = WORDS.find(wordObj => {
    return (wordObj.word === initialPrompt) || (wordObj.syns.find(synObject => synObject.word === initialPrompt));
  });
  manipulateChoices(initialPromptObj, initialPrompt);
}

export function restartClickHandle(rounds, options) {
  if (restartButtonElem.hasAttribute('data-end')) {
    const currentRound = rounds[rounds.length - 1];
    restartButtonElem.removeAttribute('data-end');
    restartButtonElemText.textContent = 'Start Game';
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
    const restartSVGPath = restartButtonElem.querySelector('path');
    const questionElement = document.querySelector('.question-segment__question');
    const statsContainer = document.querySelector('.question-segment__stats');

    questionPromptElem.textContent = initialPrompt;
    questionElement.classList.remove('disabled');
    statsContainer.classList.remove('disabled');
    restartButtonElemText.textContent = "End Game";
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
    startStopwatch(options.stopwatchTimingMechanism, options.isStopwatchOn);
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
