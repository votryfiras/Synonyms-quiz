import WORDS from "../shared/words.js";
import { getRandomItem } from "../utils/utils.js";
import { resetAnswerGradeInfo } from "../utils/gradeUtils.js";

const CORRECT_PHRASES = ['Good job!', "You've got it made!", 'Super!', 'Excellent!', 'Good work!', "You've got that down pat.", "Perfect!", "Fantastic!", "Tremendous!", "Great!", "Nice job!", "I'm impressed!", "Marvelous!", "You've got the hang of it!", "Super-Duper!", "Out of sight!", "You've got your brain in gear today."];
const WRONG_PHRASES = ["You must have been a scavenger...", "You certainly did well today.", "Not bad.", "You are learning a lot though.", "Don't be upset, everything is okay!", "You did a lot of work today.", "Don't jump ship just yet.", "Never give up.", "Don't throw in the towel just yet.", "Keep the faith a while longer.", "Ah, what a loser!"];
const WARN_PHRASES = ["Oops! It appears that there was an issue with your quiz submission. Can you please provide your solutions?", "Oh no! It appears that we're missing your response. Could you please provide your solutions?", "Oops! It seems that there was an issue with your submission. Can you please provide your solution?", "Hold on a moment! We need your answers to proceed further. please share your answer. Your input is highly appreciated!", "Uh-oh! It looks like we're missing something important—your answers! Feel free to provide any responses!", "Roses are red, violets are blue, dear client, we have no clue!", "Enigmas to unravel, responses yet unknown, we're in a bind, can you help us own?", "Quizzes are puzzling, answers are key, we're scratching our heads, can you help us see?", "Puzzles are confusing, answers are lost, we're feeling puzzled, can you bridge the cost?", "Quizzes pose questions, answers are awaited, we're eagerly anticipating your input.", "Puzzles need solutions, your insights would be greatly appreciated.", "Can you shed some light on the quiz? We're struggling to find the answers.", "Your input is invaluable, as we're currently clueless about the quiz."]

const questionPrompt = document.querySelector('.question__prompt');
const answerGradeSegment = document.querySelector(".answer-grade-segment__bg");
const answerGradeTextElem = document.querySelector(".answer-grade__text");
const toggleInfoButton = document.querySelector('.answer-grade__toggle-info');
const wordInfo = document.querySelector('.word-info');

export function motivatingGrade() {
  const motivationalPhrase = getRandomItem(CORRECT_PHRASES);
  answerGradeTextElem.textContent = motivationalPhrase;
  answerGradeSegment.classList.add("correct");
  answerGradeSegment.classList.remove("wrong", "warn");
}

export function wrongGrade() {
  const wrongPhrase = getRandomItem(WRONG_PHRASES);
  answerGradeTextElem.textContent = wrongPhrase;
  answerGradeSegment.classList.remove("correct", "warn");
  answerGradeSegment.classList.add("wrong");
}

export function warnGrade() {
  const warnPhrase = getRandomItem(WARN_PHRASES);
  answerGradeTextElem.textContent = warnPhrase;
  answerGradeSegment.classList.add("warn");
  answerGradeSegment.classList.remove("correct", "wrong");
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

  const toggleInfoButtonImage = toggleInfoButton.querySelector('.answer-grade__toggle-info__image')
  wordInfo.classList.toggle('visible');
  if (wordInfo.classList.contains('visible')) {
    const currentWordObject = getActualPromptObject(questionPrompt.textContent);
    const wordSpan = document.querySelector('.word-info__word__term');
    const levelSpan = document.querySelector('.word-info__level__level');
    const defSection = document.querySelector('.word-info__def');
    const exmSection = document.querySelector('.word-info__exm');

    toggleInfoButton.querySelector('span').textContent = "Minimize extra details";
    toggleInfoButtonImage.style.transform = "rotate(0deg)";

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
    toggleInfoButton.querySelector('span').textContent = "Reveal extra details";
    toggleInfoButtonImage.setAttribute('style', 'transform: rotate(-90deg)');
    resetAnswerGradeInfo();
  }
}
