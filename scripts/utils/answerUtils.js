import WORDS from "../shared/words.js";
import { getRandomItem } from "./utils.js";

const answerTextbox = document.querySelector('#answer-textbox');

export function manipulateChoices(wordObject, newPrompt) {
  function pickRandomWordObject(prompt) {
    let newWordObject = getRandomItem(WORDS);
    const currentWordObject = WORDS.find(wordObject => {
      return (wordObject.syns.some(synObject => synObject.word === prompt)
        || wordObject.word === prompt);
    });

    if (newWordObject === currentWordObject) newWordObject = pickRandomWordObject(prompt);
    return newWordObject;
  }
  function pickRandomSynonym() {
    const randomWordObject = pickRandomWordObject(newPrompt);
    const randomSynonym = getRandomItem(randomWordObject.syns);
    return randomSynonym;
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

  const newChoices = [];

  for (let i = 0; i < 3; i++) {
    let randomSynonym = pickRandomSynonym();
    while (newChoices.some(syn => syn === randomSynonym.word)) {
      randomSynonym = pickRandomSynonym();
    }
    newChoices.push(randomSynonym.word);
  }

  if (wordObject.word !== newPrompt) {
    newChoices.push(wordObject.word);
  }
  else {
    let promptSynonym = getRandomItem(wordObject.syns);
    while (promptSynonym.word === newPrompt) {
      promptSynonym = getRandomItem(wordObject.syns);
    }
    newChoices.push(promptSynonym.word);
  }

  const choiceButtons = document.querySelectorAll('.choice__button');
  const shuffledChoices = shuffleArray(newChoices);
  for (let i = 0; i < 4; i++) {
    choiceButtons[i].textContent = shuffledChoices[i];
  }
}

export function toggleChoicesAbility(disable = true) {
  const choices = document.querySelectorAll('.choice');
  if (!disable) {
    choices.forEach(choice => {
      choice.classList.remove('disabled');
      choice.querySelector('.choice__button').removeAttribute('disabled', '');
    });
  }
  else {
    choices.forEach(choice => {
      choice.classList.add('disabled');
      choice.querySelector('.choice__button').setAttribute('disabled', '');
    });

  }
}

export function resetChoices() {
  const selectedChoice = document.querySelector('.selected-choice');
  if (selectedChoice) selectedChoice.classList.remove('selected-choice');
}

export function textboxPlaceholderToggle() {
  const answerTextboxContainer = document.querySelector('.answer-textbox-container');
  setTimeout(() => {
    if (answerTextbox.value) { answerTextboxContainer.classList.add('typing'); }
    else { answerTextboxContainer.classList.remove('typing'); }
  }, 0);
}

export function disableTextbox() {
  answerTextbox.setAttribute('disabled', '');
}

// Put to avoid putting in the utils.js file or creating a new file for such a function, Despite it not being appropriate.

export function enableSubmitButtons() {
  const nextButton = document.querySelector(".next-button");
  const submitButton = document.querySelector(".submit-button");
  submitButton.removeAttribute('disabled');
  nextButton.removeAttribute('disabled');
}
