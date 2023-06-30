export function resetAnswerGradeInfo() {
  const definitionSection = document.querySelector('.word-info__def');
  const exampleSection = document.querySelector('.word-info__exm');
  exampleSection.querySelectorAll('li').forEach(liElem => liElem.remove());
  definitionSection.querySelectorAll('li').forEach(liElem => liElem.remove());
}

export function hideAnswerGrade() {
  const answerGradeSegment = document.querySelector(".answer-grade-segment__bg");
  const answerGradeText = document.querySelector(".answer-grade__text");
  const wordInfo = document.querySelector('.word-info');
  const toggleInfoButton = document.querySelector('.answer-grade__toggle-info');
  answerGradeSegment.classList.remove('correct', 'wrong', 'warn');
  answerGradeText.textContent = '';
  toggleInfoButton.querySelector('span').textContent = "More about the word";
  toggleInfoButton.querySelector('.answer-grade__toggle-info__image').style.transform = "rotate(-90deg)"
  wordInfo.classList.remove('visible');
}
