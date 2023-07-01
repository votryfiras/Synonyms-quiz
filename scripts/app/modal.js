const backdrop = document.querySelector('.backdrop');
const modal = document.querySelector('.modal');

function convertToFormattedTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  const centiseconds = Math.floor((seconds % 1) * 100);

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');
  const formattedCentiseconds = String(centiseconds).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}.${formattedCentiseconds}`;
}

export function displayStats(rounds) {
  function addStatElements() {
    const modalHeader = document.createElement("header");
    const modalHeaderTitle = document.createElement('h2');
    const modalPortionContainer = document.createElement('div');
    const modalButtonContainer = document.createElement('div');

    modalHeaderTitle.textContent = 'Round Stats';

    modalHeader.classList.add('modal__header');
    modalHeaderTitle.classList.add('modal__header__title');
    modalPortionContainer.classList.add('modal__portion-container');
    modalButtonContainer.classList.add('modal__button-container');

    modalHeader.appendChild(modalHeaderTitle);
    modal.appendChild(modalHeader);
    modal.appendChild(modalPortionContainer);
    modal.appendChild(modalButtonContainer);

  }
  function createModalPortion(round) {
    function createStatElement(statTitle, statValue) {
      if (!Array.isArray(statValue)) {
        const modalPortionStatListItem = document.createElement('li');
        const modalPortionStatListItemTitle = document.createElement('span');
        const modalPortionStatListItemValue = document.createElement('span');

        modalPortionStatListItemTitle.textContent = statTitle;
        modalPortionStatListItemValue.textContent = statValue;

        modalPortionStatList.classList.add('modal__portion__stat-list');
        modalPortionStatListItem.classList.add('modal__portion__stat-list__item');
        modalPortionStatListItemValue.classList.add('modal__portion__stat-list__item__value');

        modalPortion.appendChild(modalPortionStatList);
        modalPortionStatList.appendChild(modalPortionStatListItem);
        modalPortionStatListItem.appendChild(modalPortionStatListItemTitle);
        modalPortionStatListItem.appendChild(modalPortionStatListItemValue);
      }
      else {
        const modalPortionStatListItem = document.createElement('li');
        const modalPortionStatListItemTitle = document.createElement('p');
        const modalPortionSublist = document.createElement('ul');

        modalPortionStatListItem.classList.add('modal__portion__stat-list__item--sublist-container');
        modalPortionStatListItemTitle.classList.add('modal__portion__stat-list__item--sublist-container__title');
        modalPortionSublist.classList.add('modal__portion__stat-list__item--sublist-container__sublist');

        modalPortionStatListItemTitle.textContent = statTitle;

        statValue.forEach((subStatValue, i) => {
          const modalPortionSublistItem = document.createElement('li');
          const modalPortionSublistItemTitle = document.createElement('span');
          const SUBLIST_ITEM_CLASS = 'modal__portion__stat-list__item--sublist-container__sublist__item';

          modalPortionSublistItemTitle.textContent = (i + 1).toString() + "-";
          modalPortionSublistItemTitle.classList.add(SUBLIST_ITEM_CLASS + '__title');
          modalPortionSublistItem.appendChild(modalPortionSublistItemTitle);

          if (typeof subStatValue !== 'object') {
            const modalPortionSublistItemValue = document.createElement('span');
            modalPortionSublistItem.classList.add(SUBLIST_ITEM_CLASS);
            modalPortionSublistItemValue.classList.add(SUBLIST_ITEM_CLASS + '__value');
            modalPortionSublistItemValue.textContent = subStatValue;
            modalPortionSublistItem.appendChild(modalPortionSublistItemValue);
          }
          else {
            const modalPortionNestedSublist = document.createElement('ul');
            modalPortionSublistItem.classList.add(SUBLIST_ITEM_CLASS + '--nested-sublist-container');
            modalPortionNestedSublist.classList.add(SUBLIST_ITEM_CLASS + '--nested-sublist-container__nested-sublist');

            for (const prop in subStatValue) {
              const modalPortionNestedSublistItem = document.createElement('li');
              const modalPortionNestedSublistItemTitle = document.createElement('span');
              const modalPortionNestedSublistItemValue = document.createElement('span');

              modalPortionNestedSublistItem.classList.add(SUBLIST_ITEM_CLASS + '--nested-sublist-container__sublist__item');
              modalPortionNestedSublistItemValue.classList.add(SUBLIST_ITEM_CLASS + '--nested-sublist-container__sublist__item__value');
              modalPortionNestedSublistItemTitle.classList.add(SUBLIST_ITEM_CLASS + '--nested-sublist-container__sublist__item__title');

              modalPortionNestedSublistItemTitle.textContent = prop;
              modalPortionNestedSublistItemValue.textContent = subStatValue[prop];

              modalPortionNestedSublistItem.appendChild(modalPortionNestedSublistItemTitle);
              modalPortionNestedSublistItem.appendChild(modalPortionNestedSublistItemValue);
              modalPortionNestedSublist.appendChild(modalPortionNestedSublistItem);
            }
            modalPortionSublistItem.appendChild(modalPortionNestedSublist);
          }

          modalPortionSublist.appendChild(modalPortionSublistItem);
        });

        modalPortionStatListItem.appendChild(modalPortionStatListItemTitle);
        modalPortionStatListItem.appendChild(modalPortionSublist);
        modalPortionStatList.appendChild(modalPortionStatListItem);
      }
    }
    function camelToNormalCase(camelCase) {
      const words = camelCase.replace(/([A-Z])/g, ' $1').trim().split(' ');
      return words.map((word, index) => {
        if (index === 0) {
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        } else {
          return word.toLowerCase();
        }
      }).join(' ');
    }
    function cloneDeep(obj) {
      if (obj === null || typeof obj !== 'object') {
        return obj;
      }

      const clone = Array.isArray(obj) ? [] : {};

      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          clone[key] = cloneDeep(obj[key]);
        }
      }

      return clone;
    }

    const modalPortion = document.createElement('div');
    const modalPortionTitle = document.createElement('div');
    const modalPortionTitleHr = document.createElement('hr');
    const modalPortionTitleText = document.createElement('span');
    const modalPortionStatList = document.createElement('ul');

    modalPortion.classList.add('modal__portion');
    modalPortionTitle.classList.add('modal__portion__title');
    modalPortionTitleHr.classList.add('modal__portion__title__hr-line');
    modalPortionTitleText.classList.add('modal__portion__title__text');

    modalPortionTitleText.textContent = 'Round ' + round.roundNumber.toString();

    modalPortionTitle.appendChild(modalPortionTitleHr);
    modalPortionTitle.appendChild(modalPortionTitleText);
    modalPortion.appendChild(modalPortionTitle);

    const modalPortionContainer = document.querySelector('.modal__portion-container');
    modalPortionContainer.appendChild(modalPortion);
    createStatElement('Mode', round.mode === 'multiplechoice' ? 'Multiple Choice' : 'Insert');
    createStatElement('Question count', round.totalQuestionCount.toString());
    createStatElement('Correct answers', round.correctAnswerCount.toString());
    createStatElement('Wrong answers', round.wrongAnswerCount.toString());
    createStatElement('Skipped answers', round.skippedAnswerCount.toString());
    createStatElement('Terminated at question', round.terminatedAt ? round.terminatedAt.toString() : 'Not terminated');
    createStatElement('Completion time', convertToFormattedTime(round.completionTime));
    createStatElement('Best streak', round.bestStreak ? round.bestStreak.toString() : 'N/A');
    createStatElement('Streaks', JSON.stringify(round.streaks) !== JSON.stringify([0]) ? round.streaks : 'N/A');

    const statedPromptsArray = cloneDeep(round.prompts);
    statedPromptsArray.forEach(promptObject => {
      for (const prop in promptObject) {
        const hasValue = promptObject[prop] && Object.keys(promptObject[prop]).length !== 0;
        const newPropName = camelToNormalCase(prop);
        promptObject[newPropName] = hasValue ? promptObject[prop] : 'N/A';
        delete promptObject[prop];
      }

      const selectedChoices = promptObject[camelToNormalCase('selectedChoices')];
      promptObject['Initial answer'] = Array.isArray(selectedChoices) ? selectedChoices[0] : selectedChoices;
      delete promptObject[camelToNormalCase('selectedChoices')];
    });

    createStatElement('Test', statedPromptsArray);
  }

  addStatElements();
  rounds.forEach(round => createModalPortion(round));
  backdrop.classList.add('visible');
}

export function openOptionsEditor(options) {
  function addOptionElements() {
    function applyOptions() {
      const modalPortions = document.querySelectorAll(".modal__portion");
      for (const modalPortion of modalPortions) {
        const modalPortionTitle = modalPortion.querySelector('.modal__portion__fieldset__legend').textContent;
        const modalPortionInput = modalPortion.querySelector('.modal__portion__input').value;

        if (modalPortionTitle === questionCountText) {
          const questionTotal = document.querySelector('.question-segment__banner__question-total');
          options.questionCount = parseInt(modalPortionInput);
          questionTotal.textContent = options.questionCount;
        }
        else if (modalPortionTitle === isStopwatchOnText) {
          options.isStopwatchOn = modalPortionInput === 'On';
          const stopwatchElem = document.querySelector('.question-segment__stopwatch');
          if (options.isStopwatchOn) {
            stopwatchElem.classList.add('visible');
          }
          else {
            stopwatchElem.classList.remove('visible');
          }
        }
        else if (modalPortionTitle === stopwatchTimingMechanismText) {
          options.stopwatchTimingMechanism = modalPortionInput.toLowerCase();
        }
        else if (modalPortionTitle === stopwatchWhileGradingText) {
          options.stopwatchWhileGrading = modalPortionInput === 'On';
        }
      }
    }
    const modalHeader = document.createElement("header");
    const modalHeaderTitle = document.createElement('h2');
    const modalCloseButton = document.createElement('button')
    const modalPortionContainer = document.createElement('div');
    const modalForm = document.createElement('form');
    const modalButtonContainer = document.createElement('div');
    const modalApplyButton = document.createElement('button');

    modalHeaderTitle.textContent = 'Options';
    modalCloseButton.innerHTML = "&times;";
    modalApplyButton.textContent = 'Apply';

    modalHeader.classList.add('modal__header', 'modal__header--options-header');
    modalHeaderTitle.classList.add('modal__header__title');
    modalCloseButton.classList.add('modal__close-button');
    modalPortionContainer.classList.add('modal__portion-container');
    modalButtonContainer.classList.add('modal__button-container');
    modalApplyButton.classList.add('modal__apply-button');
    modalForm.id = ('modal__form')

    modalApplyButton.type = "submit"
    modalApplyButton.setAttribute('form', "modal__form")
    modalCloseButton.setAttribute('data-close-button', '')

    modalCloseButton.addEventListener('click', closeModal)
    modalApplyButton.addEventListener('click', applyOptions);
    modalForm.addEventListener('submit', e => e.preventDefault())

    modalHeader.appendChild(modalHeaderTitle);
    modalPortionContainer.appendChild(modalForm)
    modalButtonContainer.appendChild(modalApplyButton);

    modal.appendChild(modalHeader);
    modal.appendChild(modalCloseButton);
    modal.appendChild(modalPortionContainer);
    modal.appendChild(modalButtonContainer);
  }
  function createModalPortion(option, inputType, inputProps = [], inputEvents = []) {
    const modalPortion = document.createElement('div');
    const modalPortionInputContainer = document.createElement('div');
    const modalPortionInputFieldset = document.createElement('fieldset');
    const modalPortionFieldsetLegend = document.createElement('legend');

    if (inputType !== 'select') {
      const modalPortionInput = document.createElement('input');
      modalPortionInput.type = inputType;
      for (const propObject of inputProps) {
        modalPortionInput.setAttribute(propObject.name, propObject.value);
        modalPortionInput.setAttribute('value', 10);
      }
      for (const eventObject of inputEvents) {
        modalPortionInput.addEventListener(eventObject.name, eventObject.handler);
      }
      modalPortionInput.classList.add('modal__portion__input');
      modalPortionInputFieldset.appendChild(modalPortionInput);
    }
    else {
      const modalPortionInput = document.createElement('select');
      for (const option of inputProps) {
        const modalPortionInputOption = document.createElement('option');
        modalPortionInputOption.textContent = option;
        modalPortionInput.appendChild(modalPortionInputOption);
      }
      modalPortionInput.classList.add('modal__portion__input');
      modalPortionInputFieldset.appendChild(modalPortionInput);
    }

    modalPortion.classList.add('modal__portion');
    modalPortionInputFieldset.classList.add('modal__portion__fieldset');
    modalPortionFieldsetLegend.classList.add('modal__portion__fieldset__legend');
    modalPortionInputContainer.classList.add('modal__portion__input-container');

    modalPortionFieldsetLegend.textContent = option;

    modalPortionInputFieldset.appendChild(modalPortionFieldsetLegend)
    modalPortionInputContainer.appendChild(modalPortionInputFieldset);

    modalPortion.appendChild(modalPortionInputContainer);

    const modalForm = document.querySelector('#modal__form');
    modalForm.appendChild(modalPortion);
  }
  function setModalPortionInputValues() {
    const modalPortions = document.querySelectorAll(".modal__portion");
    for (const modalPortion of modalPortions) {
      const modalPortionTitle = modalPortion.querySelector('.modal__portion__fieldset__legend').textContent;
      const modalPortionInput = modalPortion.querySelector('.modal__portion__input');

      if (modalPortionTitle === questionCountText) {
        modalPortionInput.value = options.questionCount;
      }
      else if (modalPortionTitle === isStopwatchOnText) {
        modalPortionInput.value = options.isStopwatchOn ? 'On' : 'Off';
      }
      else if (modalPortionTitle === stopwatchTimingMechanismText) {
        const timingMechanism = options.stopwatchTimingMechanism;
        modalPortionInput.value = timingMechanism.charAt(0).toUpperCase() + timingMechanism.slice(1);
      }
      else if (modalPortionTitle === stopwatchWhileGradingText) {
        modalPortionInput.value = options.stopwatchElementWhileGrading ? 'On' : 'Off';
      }
    }
  }
  function enforceValidValue(e) {
    const modalPortionInput = document.querySelector(
      ".modal__portion__input"
    );

    const inputValue = parseFloat(modalPortionInput.value);
    const maxValue = parseFloat(modalPortionInput.max);
    const minValue = parseFloat(modalPortionInput.min);
    const NUMBERS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

    if (inputValue > maxValue) {
      modalPortionInput.value = maxValue;
    }
    if (inputValue < minValue) {
      modalPortionInput.value = minValue;
    }
    if (!NUMBERS.includes(e.data)) {
      modalPortionInput.value = modalPortionInput.value.replace(e.data, '');
    }
  }

  const questionCountText = 'Question Count';
  const isStopwatchOnText = 'Stopwatch';
  const stopwatchTimingMechanismText = 'Stopwatch Timing Mechanism';
  const stopwatchWhileGradingText = 'Stopwatch While Answer Grading';

  addOptionElements();
  backdrop.classList.add('visible');

  createModalPortion(questionCountText, 'number',
    [{ name: "max", value: "30" }, { name: "min", value: "1" }, { name: "value", value: "10" }],
    [{ name: "input", handler: enforceValidValue }, { name: 'click', handler: e => e.target.select() }]);
  createModalPortion(isStopwatchOnText, 'select', ['On', 'Off']);
  createModalPortion(stopwatchTimingMechanismText, 'select', ['Centiseconds', 'Deciseconds', 'Seconds']);
  createModalPortion(stopwatchWhileGradingText, 'select', ['On', 'Off']);
  setModalPortionInputValues();
}

export function closeModal(e) {
  e.stopPropagation();
  if (!e.target.closest('.modal') || "closeButton" in e.target.dataset) {
    backdrop.classList.remove('visible');
    while (modal.firstChild) {
      modal.removeChild(modal.firstChild);
    }
  }
}