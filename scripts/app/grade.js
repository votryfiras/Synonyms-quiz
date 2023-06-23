import WORDS from "../shared/words.js";
import { getRandomItem } from "../utils/utils.js";
import { resetAnswerGradeInfo } from "../utils/gradeUtils.js";

const CORRECT_PHRASES = ['Good job!', "You've got it made!", 'Super!', 'Excellent!', 'Good work!', "You've got that down pat.", "Perfect!", "Fantastic!", "Tremendous!", "Great!", "Nice job!", "I'm impressed!", "Marvelous!", "You've got the hang of it!", "Super-Duper!", "Out of sight!", "You've got your brain in gear today."];
const WRONG_PHRASES = ["You must have been a scavenger...", "You certainly did well today.", "Not bad.", "You are learning a lot though.", "Don't be upset, everything is okay!", "You did a lot of work today.", "Don't jump ship just yet.", "Never give up.", "Don't throw in the towel just yet.", "Keep the faith a while longer.", "Ah, what a loser!"];
const questionPrompt = document.querySelector('.question__prompt');
const answerGradeSegment = document.querySelector(".answer-grade-segment__bg");
const answerGradeTextElem = document.querySelector(".answer-grade__text");
const toggleInfoButton = document.querySelector('.answer-grade__toggle-info');
const wordInfo = document.querySelector('.word-info');

export function motivatingGrade() {
  const motivationalPhrase = getRandomItem(CORRECT_PHRASES);
  answerGradeTextElem.textContent = motivationalPhrase;
  answerGradeSegment.classList.add("correct");
  answerGradeSegment.classList.remove("wrong");
}

export function wrongGrade() {
  const wrongPhrase = getRandomItem(WRONG_PHRASES);
  answerGradeTextElem.textContent = wrongPhrase;
  answerGradeSegment.classList.remove("correct");
  answerGradeSegment.classList.add("wrong");
}

export function displayWordInfo() {
  function getActualPromptObject(prompt) { // Gets word object for both normal and synonym words
    for (const wordObj of WORDS) {
      if (wordObj.word === prompt) { return wordObj; }
      for (const synonymObject of wordObj.syns) {
        if (synonymObject.word === prompt) { return synonymObject; }
      }
    }
  }

  wordInfo.classList.toggle('visible');
  if (wordInfo.classList.contains('visible')) {
    const currentWordObject = getActualPromptObject(questionPrompt.textContent);
    const wordSpan = document.querySelector('.word-info__word__term');
    const levelSpan = document.querySelector('.word-info__level__level');
    const defSection = document.querySelector('.word-info__def');
    const exmSection = document.querySelector('.word-info__exm');

    toggleInfoButton.querySelector('span').textContent = "Hide";
    toggleInfoButton.querySelector('img').setAttribute('style', 'transform: rotate(0deg)');

    wordSpan.textContent = currentWordObject.word.charAt(0).toUpperCase() + currentWordObject.word.slice(1);
    levelSpan.textContent = currentWordObject.languageLevel;

    for (const def of currentWordObject.def) {
      const defListItem = document.createElement('li');
      defListItem.className = "word-info__def__definition";
      defListItem.textContent = def;
      defSection.querySelector('ul').appendChild(defListItem);
    }

    for (const exm of currentWordObject.examples) {
      const exmListItem = document.createElement('li');
      exmListItem.className = "word-info__exm__example";
      exmListItem.textContent = exm;
      exmSection.querySelector('ul').appendChild(exmListItem);
    }

  }
  else {
    toggleInfoButton.querySelector('span').textContent = "More about the word";
    toggleInfoButton.querySelector('img').setAttribute('style', 'transform: rotate(-90deg)');
    resetAnswerGradeInfo();
  }
}
