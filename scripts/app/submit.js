import WORDS from "../shared/words.js";
import { motivatingGrade, wrongGrade } from "./grade.js";
import { stopStopwatch, continueStopwatch } from "../utils/stopwatch.js";
import { getRandomItem, getPossiblePrompts, getCorrectSynonyms } from "../utils/utils.js";
import { manipulateChoices, toggleChoicesAbility, resetChoices, textboxPlaceholderToggle, enableSubmitButtons, disableTextbox } from "../utils/answerUtils.js";
import { hideAnswerGrade, resetAnswerGradeInfo } from "../utils/gradeUtils.js";
import endRound from '../utils/endRound.js';

const NEXT_BUTTON_TEXT = 'Next Question';
const questionPrompt = document.querySelector('.question__prompt');
const nextButton = document.querySelector(".next-button");
const streakCounter = document.querySelector('[data-streak-counter]');
const answerTextbox = document.querySelector('.answer-textbox');

function pushRoundPromptObject(prompt, currentRound) {
  const choiceButtons = document.querySelectorAll('.choice__button');
  const choices = currentRound.mode === "multiplechoice"
    ? Array.from(choiceButtons).map(btn => btn.textContent)
    : [];
  const correctAnswers = currentRound.mode === 'multiplechoice'
    ? getCorrectSynonyms(prompt).filter(syn => choices.includes(syn))
    : getCorrectSynonyms(prompt);

  const promptRoundObject = {
    word: prompt,
    choices,
    selectedChoices: [],
    correctAnswers,
  };
  currentRound.prompts.push(promptRoundObject);
}

export function submitClickHandle(rounds, options) {
  function increaseStreak() {
    const streaks = currentRound.streaks;
    streaks[streaks.length - 1]++;
    const largestStreak = Math.max(...streaks);
    currentRound.bestStreak = largestStreak;
  }
  function cutStreak() {
    const streaks = currentRound.streaks;
    if (streaks[streaks.length - 1] !== 0) {
      streaks.push(0);
    }
  }
  function increaseCounters() {
    const correctCounter = document.querySelector('[data-correct-counter]');
    const correctCount = parseInt(correctCounter.textContent);
    const streakCount = parseInt(streakCounter.textContent);
    correctCounter.textContent = correctCount + 1;
    streakCounter.textContent = streakCount + 1;
  }
  function resetStreakCounter() {
    streakCounter.textContent = 0;
  }
  function disableSubmitButton() {
    const submitButton = document.querySelector('.submit-button');
    submitButton.setAttribute('disabled', '');
  }

  const currentRound = rounds[rounds.length - 1];
  const currentPrompt = questionPrompt.textContent;
  const correctSynonyms = getCorrectSynonyms(currentPrompt);
  const selectedChoice = document.querySelector('.selected-choice');
  const selectedChoiceButton = selectedChoice ? selectedChoice.querySelector('.choice__button') : null;
  const selectedChoiceText = selectedChoiceButton ? selectedChoiceButton.textContent : '';
  const writtenAnswer = answerTextbox.value;

  if (selectedChoice) {
    const currentRoundPromptsObject = currentRound.prompts[currentRound.prompts.length - 1];
    if (currentRoundPromptsObject && currentRoundPromptsObject.word === currentPrompt) {
      currentRoundPromptsObject.selectedChoices.push(selectedChoiceButton.textContent);
    }
    else if (currentRoundPromptsObject) {
      pushRoundPromptObject(currentPrompt, currentRound);
      const updatedCurrentRoundPromptsObject = currentRound.prompts[currentRound.prompts.length - 1];
      updatedCurrentRoundPromptsObject.selectedChoices.push(selectedChoiceButton.textContent);
    }
  }

  if (!selectedChoiceText && !writtenAnswer) { return; }
  else if (currentRound.mode === 'multiplechoice') {
    if (correctSynonyms.includes(selectedChoiceText)) { // If correct answer
      motivatingGrade();
      toggleChoicesAbility();
      disableSubmitButton();
      if (currentRound.currentQuestionNumber === currentRound.totalQuestionCount) { // Round ended
        endRound(rounds);
      }
      if (currentRound.correctAnswerCount + currentRound.wrongAnswerCount + currentRound.skippedAnswerCount !== currentRound.currentQuestionNumber) {
        currentRound.correctAnswerCount++;
        increaseStreak();
        increaseCounters();
      }
      if (!options.stopwatchWhileGrading) { stopStopwatch(); }
      nextButton.textContent = NEXT_BUTTON_TEXT;
    }
    else {
      selectedChoice.classList.add('disabled');
      selectedChoiceButton.setAttribute('disabled', '');
      wrongGrade();
      cutStreak();
      resetStreakCounter();
      resetChoices();
      if (currentRound.correctAnswerCount + currentRound.wrongAnswerCount + currentRound.skippedAnswerCount < currentRound.currentQuestionNumber) {
        currentRound.wrongAnswerCount++;
      }
    }
  }
  else if (currentRound.mode === "insert") {
    if (correctSynonyms.includes(writtenAnswer.toLowerCase().trim())) { // If correct answer
      motivatingGrade();
      disableSubmitButton();
      increaseStreak();
      disableTextbox();

      if (currentRound.currentQuestionNumber === currentRound.totalQuestionCount) { // Round ended
        endRound(rounds);
      }
      if (!options.stopwatchWhileGrading) { stopStopwatch(); }
      if (currentRound.correctAnswerCount + currentRound.wrongAnswerCount + currentRound.skippedAnswerCount === currentRound.currentQuestionNumber) {
        return;
      }
      currentRound.correctAnswerCount++;
    }
    else { // If wrong answer
      wrongGrade();
      cutStreak();
      resetStreakCounter();
      if (currentRound.correctAnswerCount + currentRound.wrongAnswerCount + currentRound.skippedAnswerCount < currentRound.currentQuestionNumber) {
        currentRound.wrongAnswerCount++;
      }
    }
  }

  if (document.querySelectorAll('.choice.disabled').length === 3) {
    const unselectedChoice = Array.from(document.querySelectorAll('.choice'))
      .find(choice => !choice.classList.contains('disabled'));

    unselectedChoice.classList.add('selected-choice');
    unselectedChoice.classList.add('disabled');
    unselectedChoice.querySelector('.choice__button').setAttribute('disabled', '');
    disableSubmitButton();
    wrongGrade();
    if (currentRound.currentQuestionNumber === currentRound.totalQuestionCount) {
      endRound(rounds);
    }

  }
}

export function nextClickHandle(rounds, options) {
  function cutStreak() {
    const streaks = currentRound.streaks;
    if (streaks[streaks.length - 1] !== 0) {
      streaks.push(0);
    }
  }

  const currentRound = rounds[rounds.length - 1];
  const NEXT_BUTTON_TEXT = 'Next Question';
  const SURE_TEXT = 'Are You Sure?';
  const SKIP_TEXT = 'Skip Question';
  const prompt = questionPrompt.textContent;
  const selectedChoice = document.querySelector('.selected-choice');

  if ((!selectedChoice && currentRound.mode === 'multiplechoice' || currentRound.correctAnswerCount + currentRound.wrongAnswerCount + currentRound.skippedAnswerCount !== currentRound.currentQuestionNumber) && nextButton.textContent !== SURE_TEXT) {
    nextButton.textContent = SURE_TEXT;
    return;
  }
  if (nextButton.hasAttribute('data-skip')) {
    currentRound.skippedAnswerCount++;
    nextButton.textContent = NEXT_BUTTON_TEXT;
    nextButton.removeAttribute('data-skip');
    pushRoundPromptObject(prompt, currentRound);
    toggleChoicesAbility();
    endRound(rounds);
    return;
  }

  function increaseCounter() {
    const questionCounter = document.querySelector('.question-segment__banner__question-counter');
    const count = parseInt(questionCounter.textContent);
    questionCounter.textContent = count + 1;
  }
  function pickNewPrompt() {
    const currentPrompt = currentRound.prompts[currentRound.prompts.length - 1].word;
    const excludedPrompts = currentRound.prompts.map(promptObject => promptObject.word);
    if (!excludedPrompts.includes(currentPrompt)) { excludedPrompts.push(currentPrompt); }
    const newPrompt = getRandomItem(getPossiblePrompts(excludedPrompts));
    return newPrompt;
  }
  function enableTextbox() {
    answerTextbox.removeAttribute('disabled');
    textboxPlaceholderToggle();
  }
  function resetTextbox() {
    answerTextbox.value = '';
  }

  const newPrompt = pickNewPrompt();
  const newWordObject = WORDS.find(wordObj => {
    return (wordObj.word === newPrompt) || (wordObj.syns.find(synObject => synObject.word === newPrompt));
  });

  if (!(currentRound.correctAnswerCount + currentRound.wrongAnswerCount + currentRound.skippedAnswerCount < currentRound.currentQuestionNumber)) { // Runs before currentQuestionNumber adiition, number of past question
    const choices = document.querySelectorAll('.choice');
    const areChoiceButtonsDisabled = Array.from(choices).every(choice => {
      return choice.classList.contains('disabled');
    });
    if (!options.stopwatchWhileGrading && areChoiceButtonsDisabled) { // && Question not skipped
      continueStopwatch(options.stopwatchTimingMechanism);
    }
  }
  else {
    currentRound.skippedAnswerCount++;
    cutStreak();
    streakCounter.textContent = 0;
  }

  currentRound.currentQuestionNumber++;
  questionPrompt.textContent = newPrompt;
  answerTextbox.textContent = '';
  nextButton.textContent = NEXT_BUTTON_TEXT;

  if (currentRound.prompts[currentRound.prompts.length - 1]) {
    const currentRoundWordObject = currentRound.prompts[currentRound.prompts.length - 1];
    if (currentRoundWordObject.word !== prompt) {
      pushRoundPromptObject(prompt, currentRound);
    }
  }

  if (currentRound.mode === 'multiplechoice') {
    manipulateChoices(newWordObject, newPrompt);
    resetChoices();
    toggleChoicesAbility(false);
  }
  else {
    resetTextbox();
    enableTextbox();
  }

  if (currentRound.currentQuestionNumber === currentRound.totalQuestionCount) {
    nextButton.textContent = SKIP_TEXT;
    nextButton.setAttribute('data-skip', '');
  }

  increaseCounter();
  enableSubmitButtons();
  hideAnswerGrade();
  resetAnswerGradeInfo();
}