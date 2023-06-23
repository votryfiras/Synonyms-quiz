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
  const questionPromptElem = document.querySelector('.question__prompt');
  const restartButtonElem = document.querySelector('.function-button--restart-button');
  const currentRound = rounds[rounds.length - 1];

  modeSelectElem.removeAttribute('disabled');
  optionsButton.removeAttribute('disabled');
  statsButton.removeAttribute('disabled');
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