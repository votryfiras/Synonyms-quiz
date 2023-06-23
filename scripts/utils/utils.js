import WORDS from "../shared/words.js";

// Mainly focusing on pure util functions

export function getRandomItem(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  const wordObject = arr[randomIndex];
  return wordObject;
}

export function getPossiblePrompts(additionalExcludedPrompts = []) {
  const EXCLUDED_INSERT_PROMPTS = ['pollution', 'pan', 'carbon footprint'];
  const answerSegment = document.querySelector('.answer-segment');
  let excludedPrompts = [];
  if (answerSegment.classList.contains('insert-mode')) {
    excludedPrompts = EXCLUDED_INSERT_PROMPTS;
  }
  excludedPrompts = excludedPrompts.concat(additionalExcludedPrompts);

  const synonymObjects = WORDS.map(wordObject => { return wordObject.syns; });
  const possiblePrompts = [];
  synonymObjects.forEach(synsArray => {
    synsArray.forEach(synonymObject => {
      if (!excludedPrompts.includes(synonymObject.word)) { possiblePrompts.push(synonymObject.word); }
    });
  });
  WORDS.forEach(wordObject => {
    if (!excludedPrompts.includes(wordObject.word)) possiblePrompts.push(wordObject.word);
  });
  return possiblePrompts;
}

export function getCorrectSynonyms(prompt) {
  function getPromptObject() {
    for (const wordObj of WORDS) {
      if (wordObj.word === prompt) { return wordObj; }
      for (const synonymObject of wordObj.syns) {
        if (synonymObject.word === prompt) { return wordObj; }
      }
    }
  }
  const promptObject = getPromptObject();
  const synonymSynonyms = !WORDS.some(wordObject => prompt === wordObject.word) ?
    promptObject.syns.find(synObject => synObject.word === prompt).additionalSyns : { additionalSyns: [] };

  return promptObject.syns
    .map(synObject => { return synObject.word; })
    .concat(synonymSynonyms)
    .concat(promptObject.word);
}
