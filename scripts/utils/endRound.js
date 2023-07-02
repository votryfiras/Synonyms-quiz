import { stopStopwatch } from "./stopwatch.js";
import { getCorrectSynonyms } from "./utils.js";
import { disableTextbox, toggleChoicesAbility } from "./answerUtils.js";

export default function endRound(rounds) {
  function disableSubmitButtons() {
    const nextButton = document.querySelector(".next-button");
    const submitButton = document.querySelector(".submit-button");
    nextButton.setAttribute('disabled', '');
    submitButton.setAttribute('disabled', '');
  }
  function convertToSeconds(time) {
    const [minutes, secondsAndCentiseconds] = time.split(':');
    const [seconds, centiseconds] = secondsAndCentiseconds.split('.');
    const totalSeconds = parseInt(minutes) * 60 + parseInt(seconds) + parseInt(centiseconds) / 100;
    return parseFloat(totalSeconds.toFixed(2));
  }
  function resetRestartButton() {
    restartButtonElem.removeAttribute('data-end');
    restartButtonElem.querySelector('[data-restart-text]').textContent = 'Start Game';
  }
  function isRoundWon() {
    return currentRound.correctAnswerCount > (currentRound.wrongAnswerCount + currentRound.skippedAnswerCount);
  }
  function displayCongrats() {
    function setGradeTerm() {
      if (currentRound.isRoundWon) {
        congratsGradeTerm.textContent = 'WON! Well Done!';
        congratsGradeTerm.classList.add('won');
      }
      else {
        congratsGradeTerm.textContent = 'Lost. Better luck next time!';
        congratsGradeTerm.classList.add('lost');
      }
    }
    const ELLIPSIS_ANIMATION_DURATION = 3200;
    const CONGRATS_VISIBILITY_ANIMATION_DURATION = 10000;
    const congratsGradeTerm = document.querySelector('.congrats__grade__term');
    const congratsSegment = document.querySelector('.congrats-segment');

    congratsSegment.classList.add('visible');
    setTimeout(setGradeTerm, ELLIPSIS_ANIMATION_DURATION);
    setTimeout(() => {
      congratsSegment.classList.remove('visible');
      congratsGradeTerm.textContent = '';
    }, CONGRATS_VISIBILITY_ANIMATION_DURATION);
  }
  function pushRoundPromptObject() {
    const prompt = questionPromptElem.textContent;
    const choiceButtons = document.querySelectorAll('.choice__button');

    const choices = currentRound.mode === "multiplechoice"
      ? Array.from(choiceButtons).map(btn => btn.textContent)
      : [];
    const correctAnswers = currentRound.mode === 'multiplechoice' ?
      getCorrectSynonyms(prompt).filter(syn => choices.includes(syn))
      : getCorrectSynonyms(prompt);

    const promptRoundObject = {
      word: prompt,
      choices,
      selectedChoices: [],
      correctAnswers,
    };
    currentRound.prompts.push(promptRoundObject);
  }

  const modeSelectElem = document.querySelector('.mode-select');
  const optionsButton = document.querySelector('.function-button--options-button');
  const stopwatchDisplay = document.querySelector('.question-segment__stopwatch__display');
  const statsButton = document.querySelector('.function-button--stats-button');
  const restartButtonElem = document.querySelector('.function-button--restart-button');
  const restartSVGPath = restartButtonElem.querySelector('path');
  const questionPromptElem = document.querySelector('.question__prompt');
  const currentRound = rounds[rounds.length - 1];

  modeSelectElem.removeAttribute('disabled');
  optionsButton.removeAttribute('disabled');
  statsButton.removeAttribute('disabled');
  restartSVGPath.setAttribute("d", "M105.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L386.3 160H336c-17.7 0-32 14.3-32 32s14.3 32 32 32H463.5c0 0 0 0 0 0h.4c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32s-32 14.3-32 32v51.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM39 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1V448c0 17.7 14.3 32 32 32s32-14.3 32-32V396.9l17.6 17.5 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L125.6 352H176c17.7 0 32-14.3 32-32s-14.3-32-32-32H48.4c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z");
  currentRound.completionTime = convertToSeconds(stopwatchDisplay.textContent);
  if (!currentRound.terminatedAt) { // If round not terminated

    const nextButton = document.querySelector('.next-button');

    currentRound.isRoundWon = isRoundWon();
    nextButton.setAttribute('disabled', '');
    resetRestartButton();
    displayCongrats();
  }
  else {
    const prompt = questionPromptElem.textContent;
    if (currentRound.prompts[currentRound.prompts.length - 1].word !== prompt) {
      pushRoundPromptObject();
    }
    restartButtonElem.querySelector('[data-restart-text]').textContent = 'Start Game';
    if (currentRound.mode === "multiplechoice") {
      toggleChoicesAbility();
    }
    else if (currentRound.mode === "insert") {
      disableTextbox()
    }
  }

  disableSubmitButtons();
  stopStopwatch();
}