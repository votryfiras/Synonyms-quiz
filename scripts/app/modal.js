const backdrop = document.querySelector(".backdrop");
const modal = document.querySelector(".modal");

function convertToFormattedTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  const centiseconds = Math.floor((seconds % 1) * 100);

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");
  const formattedCentiseconds = String(centiseconds).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}.${formattedCentiseconds}`;
}

export function displayStats(rounds) {
  if (rounds.length === 0) {
    const noStatsMessage = document.createElement("div");
    const noStatsMessageText = document.createElement("p");
    const noStatsMessageImageContainer = document.createElement("div");

    noStatsMessage.className = "modal__no-stats-message";
    noStatsMessageText.className = "modal__no-stats-message__text";
    noStatsMessageImageContainer.className = "modal__no-stats-message__image-container";
    noStatsMessageText.textContent = "Oops! You gotta play rounds to see your performance here.";

    noStatsMessageImageContainer.innerHTML = '<svg version="1.0" xmlns="http://www.w3.org/2000/svg" class="modal__no-stats-message__image" viewBox="0 0 699.000000 1280.000000" fill="currentColor" preserveAspectRatio="xMidYMid meet"> <metadata> Created by potrace 1.15, written by Peter Selinger 2001-2017 </metadata> <g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)"> <path d="M3625 12784 c-16 -8 -34 -19 -39 -24 -5 -5 -19 -5 -32 1 -43 16 -177 21 -256 10 -43 -6 -106 -22 -140 -36 -35 -14 -101 -33 -148 -41 -164 -28 -264 -97 -366 -251 -32 -48 -79 -111 -104 -139 -25 -29 -57 -73 -73 -99 -30 -51 -63 -69 -321 -175 -71 -29 -140 -63 -155 -76 l-26 -22 20 -22 c24 -27 111 -71 180 -93 28 -8 114 -27 193 -42 l142 -28 0 -248 0 -248 -137 65 c-76 37 -153 72 -170 80 l-33 14 0 -42 c0 -24 9 -164 20 -313 11 -148 20 -282 20 -296 0 -21 -27 -48 -142 -145 -79 -65 -166 -139 -194 -164 -28 -25 -115 -99 -194 -165 -79 -66 -175 -147 -213 -180 -38 -33 -92 -77 -118 -98 -41 -31 -49 -43 -49 -70 0 -51 -38 -268 -71 -407 -17 -71 -84 -288 -150 -482 -67 -194 -145 -427 -175 -517 -54 -165 -124 -452 -124 -508 0 -17 16 -62 36 -102 46 -92 169 -218 408 -417 99 -82 188 -161 198 -175 35 -46 71 -340 99 -799 17 -290 24 -1068 10 -1190 -30 -259 -134 -697 -376 -1585 -47 -170 -112 -419 -145 -553 -33 -134 -79 -293 -101 -355 -22 -62 -52 -143 -65 -182 -14 -38 -64 -157 -111 -265 -46 -107 -91 -211 -98 -232 -18 -47 -215 -467 -344 -732 -71 -146 -98 -211 -90 -217 6 -4 29 -10 50 -13 35 -6 39 -9 39 -34 0 -98 -47 -249 -146 -472 -40 -91 -85 -205 -99 -255 -29 -99 -42 -231 -31 -318 l7 -57 1132 2 1132 3 38 112 c137 408 50 658 -228 656 -70 0 -100 -7 -235 -53 -141 -48 -163 -53 -245 -54 -49 0 -108 5 -131 12 -50 15 -130 67 -151 98 -15 23 -14 26 23 67 34 37 60 83 78 139 5 15 12 14 63 -15 32 -18 70 -38 85 -44 l28 -12 26 87 c15 48 71 231 126 407 364 1174 459 1469 620 1925 55 157 145 413 201 570 140 400 249 703 256 717 7 14 11 9 276 -331 318 -410 502 -677 632 -916 78 -144 105 -215 152 -405 44 -174 137 -478 328 -1075 123 -384 333 -1024 338 -1028 1 -1 41 7 89 19 48 12 88 20 90 18 2 -2 18 -197 35 -434 17 -237 34 -454 37 -482 l5 -53 386 0 385 0 117 49 c497 209 916 363 1238 456 17 6 43 99 50 181 12 145 -48 308 -157 427 -110 120 -184 126 -396 32 -151 -67 -248 -94 -360 -102 -117 -8 -145 9 -240 152 l-74 110 49 45 48 45 -14 35 c-8 19 -78 184 -155 365 -77 182 -190 447 -250 590 -61 143 -150 352 -198 465 -48 113 -138 324 -200 470 -61 146 -129 306 -150 355 -21 50 -66 176 -99 280 -152 477 -208 655 -271 860 -145 473 -189 622 -204 685 -16 71 -100 314 -323 940 -121 337 -224 681 -268 890 -27 129 -66 470 -53 470 2 0 55 -29 117 -64 142 -80 248 -117 361 -123 131 -8 125 -14 210 199 40 100 117 319 172 484 l99 302 50 47 c163 152 250 303 314 541 23 83 28 127 32 269 5 164 1 208 -34 385 -3 19 14 59 64 150 126 227 266 483 280 510 l13 27 99 -5 c81 -4 111 -1 167 16 229 70 424 300 490 579 22 91 22 249 -1 333 -37 142 -124 259 -233 312 -64 32 -71 33 -188 33 l-121 0 -89 -44 c-73 -36 -105 -60 -180 -135 -105 -105 -158 -191 -205 -336 -40 -121 -50 -286 -25 -394 19 -80 84 -211 125 -250 l29 -28 -39 -69 c-21 -37 -39 -71 -39 -74 0 -3 -38 -71 -84 -153 -46 -81 -98 -176 -115 -211 l-33 -64 -41 41 c-53 50 -76 62 -122 62 -92 0 -151 -58 -205 -202 -22 -58 -71 -184 -110 -279 -74 -182 -233 -615 -314 -854 -26 -77 -51 -144 -56 -149 -10 -10 -101 19 -153 49 -54 32 -141 118 -172 171 -76 130 -114 329 -122 641 l-6 222 27 11 c15 5 83 10 151 10 68 0 130 3 139 6 37 14 9 59 -119 194 -129 136 -170 196 -213 311 -41 108 -133 304 -174 374 l-24 40 90 95 c175 183 298 352 377 520 23 47 42 87 44 88 10 10 190 -56 259 -96 93 -52 261 -132 280 -132 38 0 31 25 -45 171 -44 82 -79 153 -79 157 0 4 -16 34 -36 66 l-35 59 19 52 c19 48 19 57 6 116 -16 78 -18 206 -3 300 10 66 9 71 -15 114 -48 81 -147 199 -256 305 -87 85 -109 112 -114 141 -9 50 -58 114 -105 139 -48 24 -115 26 -156 4z"/> </g> </svg>';

    noStatsMessage.appendChild(noStatsMessageImageContainer);
    noStatsMessage.appendChild(noStatsMessageText);
    modal.appendChild(noStatsMessage);
    backdrop.classList.add("visible");
    return;
  }

  function addStatElements() {
    const modalHeader = document.createElement("header");
    const modalHeaderTitle = document.createElement("h2");
    const modalPortionContainer = document.createElement("div");

    modalHeaderTitle.textContent = "🎯 Round Stats";

    modal.classList.add("modal--stats");
    modalHeader.classList.add("modal__header");
    modalHeaderTitle.classList.add("modal__header__title");
    modalPortionContainer.classList.add("modal__portion-container");

    modalHeader.appendChild(modalHeaderTitle);
    modal.appendChild(modalHeader);
    modal.appendChild(modalPortionContainer);
  }
  function createModalPortion(round) {
    function createStatElement(statTitle, statValue) {
      if (!Array.isArray(statValue)) {
        const modalPortionStatListItem = document.createElement("li");
        const modalPortionStatListItemTitle = document.createElement("span");
        const modalPortionStatListItemValue = document.createElement("span");

        modalPortionStatListItemTitle.textContent = statTitle;
        modalPortionStatListItemValue.textContent = statValue;

        modalPortionStatList.classList.add("modal__portion__stat-list");
        modalPortionStatListItem.classList.add("modal__portion__stat-list__item");
        modalPortionStatListItemValue.classList.add("modal__portion__stat-list__item__value");

        modalPortion.appendChild(modalPortionStatList);
        modalPortionStatList.appendChild(modalPortionStatListItem);
        modalPortionStatListItem.appendChild(modalPortionStatListItemTitle);
        modalPortionStatListItem.appendChild(modalPortionStatListItemValue);
      } else {
        const modalPortionStatListItem = document.createElement("li");
        const modalPortionStatListItemToggler = document.createElement("div");
        const modalPortionStatListItemTitle = document.createElement("p");
        const modalPortionSublist = document.createElement("ul");

        modalPortionStatListItem.classList.add("modal__portion__stat-list__item--sublist-container");
        modalPortionStatListItemToggler.classList.add("modal__portion__stat-list__item--sublist-container__toggler");
        modalPortionStatListItemTitle.classList.add("modal__portion__stat-list__item--sublist-container__title");
        modalPortionSublist.classList.add("modal__portion__stat-list__item--sublist-container__sublist");

        modalPortionStatListItemTitle.textContent = statTitle;
        modalPortionStatListItemToggler.innerHTML = '<svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11.178 19.569a.998.998 0 0 0 1.644 0l9-13A.999.999 0 0 0 21 5H3a1.002 1.002 0 0 0-.822 1.569l9 13z"></path></svg>';

        modalPortionStatListItemToggler.addEventListener("click", () => toggleModalList(modalPortionSublist, modalPortionStatListItemToggler));

        statValue.forEach((subStatValue, i) => {
          const modalPortionSublistItem = document.createElement("li");
          const modalPortionSublistItemTitle = document.createElement("span");
          const SUBLIST_ITEM_CLASS = "modal__portion__stat-list__item--sublist-container__sublist__item";

          modalPortionSublistItemTitle.textContent = (i + 1).toString() + "-";
          modalPortionSublistItemTitle.classList.add(SUBLIST_ITEM_CLASS + "__title");
          modalPortionSublistItem.appendChild(modalPortionSublistItemTitle);

          if (typeof subStatValue !== "object") {
            const modalPortionSublistItemValue = document.createElement("span");
            modalPortionSublistItem.classList.add(SUBLIST_ITEM_CLASS);
            modalPortionSublistItemValue.classList.add(SUBLIST_ITEM_CLASS + "__value");
            modalPortionSublistItemValue.textContent = subStatValue;
            modalPortionSublistItem.appendChild(modalPortionSublistItemValue);
          } else {
            const modalPortionSublistItemToggler = document.createElement("div");
            const modalPortionNestedSublist = document.createElement("ul");

            modalPortionSublistItem.classList.add(SUBLIST_ITEM_CLASS + "--nested-sublist-container");
            modalPortionSublistItemToggler.classList.add(SUBLIST_ITEM_CLASS + "--nested-sublist-container__toggler");
            modalPortionNestedSublist.classList.add(SUBLIST_ITEM_CLASS + "--nested-sublist-container__sublist");

            modalPortionSublistItemToggler.innerHTML = '<svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11.178 19.569a.998.998 0 0 0 1.644 0l9-13A.999.999 0 0 0 21 5H3a1.002 1.002 0 0 0-.822 1.569l9 13z"></path></svg>';
            modalPortionSublistItemToggler.addEventListener("click", () => toggleModalList(modalPortionNestedSublist, modalPortionSublistItemToggler));

            for (const prop in subStatValue) {
              const modalPortionNestedSublistItem = document.createElement("li");
              const modalPortionNestedSublistItemTitle = document.createElement("span");
              const modalPortionNestedSublistItemValue = document.createElement("span");

              modalPortionNestedSublistItem.classList.add(SUBLIST_ITEM_CLASS + "--nested-sublist-container__sublist__item");
              modalPortionNestedSublistItemValue.classList.add(SUBLIST_ITEM_CLASS + "--nested-sublist-container__sublist__item__value");
              modalPortionNestedSublistItemTitle.classList.add(SUBLIST_ITEM_CLASS + "--nested-sublist-container__sublist__item__title");

              modalPortionNestedSublistItemTitle.textContent = prop;
              modalPortionNestedSublistItemValue.textContent = !Array.isArray(subStatValue[prop]) ? subStatValue[prop] : subStatValue[prop].join(" - ");

              modalPortionNestedSublistItem.appendChild(modalPortionNestedSublistItemTitle);
              modalPortionNestedSublistItem.appendChild(modalPortionNestedSublistItemValue);
              modalPortionNestedSublist.appendChild(modalPortionNestedSublistItem);
            }
            modalPortionSublistItem.appendChild(modalPortionSublistItemToggler);
            modalPortionSublistItem.appendChild(modalPortionNestedSublist);
          }

          modalPortionSublist.appendChild(modalPortionSublistItem);
        });

        modalPortionStatListItem.appendChild(modalPortionStatListItemToggler);
        modalPortionStatListItem.appendChild(modalPortionStatListItemTitle);
        modalPortionStatListItem.appendChild(modalPortionSublist);
        modalPortionStatList.appendChild(modalPortionStatListItem);
      }
    }
    function toggleModalList(list, toggler) {
      list.classList.toggle("invisible");
      toggler.classList.toggle("rotated");
    }
    function camelToNormalCase(camelCase) {
      const words = camelCase
        .replace(/([A-Z])/g, " $1")
        .trim()
        .split(" ");
      return words
        .map((word, index) => {
          if (index === 0) {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
          } else {
            return word.toLowerCase();
          }
        })
        .join(" ");
    }
    function cloneDeep(obj) {
      if (obj === null || typeof obj !== "object") {
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

    const modalPortion = document.createElement("div");
    const modalPortionToggler = document.createElement("div");
    const modalPortionTitle = document.createElement("div");
    const modalPortionTitleText = document.createElement("h3");
    const modalPortionStatList = document.createElement("ul");

    modalPortion.classList.add("modal__portion");
    modalPortionToggler.classList.add("modal__portion__toggler");
    modalPortionTitle.classList.add("modal__portion__title");
    modalPortionTitleText.classList.add("modal__portion__title__text");

    modalPortionTitleText.textContent = "Round " + round.roundNumber.toString();
    modalPortionToggler.innerHTML = '<svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11.178 19.569a.998.998 0 0 0 1.644 0l9-13A.999.999 0 0 0 21 5H3a1.002 1.002 0 0 0-.822 1.569l9 13z"></path></svg>';

    modalPortionToggler.addEventListener("click", () => toggleModalList(modalPortionStatList, modalPortionToggler));

    modalPortionTitle.appendChild(modalPortionTitleText);
    modalPortion.appendChild(modalPortionToggler);
    modalPortion.appendChild(modalPortionTitle);

    const modalPortionContainer = document.querySelector(".modal__portion-container");
    modalPortionContainer.appendChild(modalPortion);

    createStatElement("Mode", round.mode === "multiplechoice" ? "Multiple Choice" : "Insert");
    createStatElement("Question count", round.totalQuestionCount.toString());
    createStatElement("Correct answers", round.correctAnswerCount.toString());
    createStatElement("Wrong answers", round.wrongAnswerCount.toString());
    createStatElement("Skipped answers", round.skippedAnswerCount.toString());
    createStatElement("Terminated at question", round.terminatedAt ? round.terminatedAt.toString() : "Not terminated");
    createStatElement("Completion time", convertToFormattedTime(round.completionTime));
    createStatElement("Best streak", round.bestStreak ? round.bestStreak.toString() : "N/A");
    createStatElement("Streaks", JSON.stringify(round.streaks) !== JSON.stringify([0]) ? round.streaks : "N/A");

    const statedPromptsArray = cloneDeep(round.prompts);
    statedPromptsArray.forEach((promptObject) => {
      for (const prop in promptObject) {
        const hasValue = promptObject[prop] && Object.keys(promptObject[prop]).length !== 0;
        const newPropName = camelToNormalCase(prop);
        promptObject[newPropName] = hasValue ? promptObject[prop] : "N/A";
        delete promptObject[prop];
      }

      const selectedChoices = promptObject[camelToNormalCase("selectedChoices")];
      promptObject["Initial answer"] = Array.isArray(selectedChoices) ? selectedChoices[0] : selectedChoices;
      delete promptObject[camelToNormalCase("selectedChoices")];
    });

    createStatElement("Prompts", statedPromptsArray);
  }

  addStatElements();
  rounds.forEach((round) => createModalPortion(round));
  backdrop.classList.add("visible");
}

export function openOptionsEditor(options) {
  function addOptionElements() {
    function applyOptions() {
      function displaySuccessMessage() {
        const successMessage = document.createElement("div");
        const successMessageImageContainer = document.createElement("div");
        const successMessageTextContent = document.createElement("p");

        successMessage.className = "modal__success-message";
        successMessageImageContainer.className = "modal__success-message__image-container";
        successMessageTextContent.className = "modal__success-message__text-content";

        successMessageImageContainer.innerHTML = '<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>';
        successMessageTextContent.textContent = "Successfully applied.";

        if (document.querySelector(".modal__success-message")) {
          document.querySelector(".modal__success-message").remove();
        }

        successMessage.appendChild(successMessageImageContainer);
        successMessage.appendChild(successMessageTextContent);
        document.querySelector(".modal").appendChild(successMessage);

        const timeoutId = setTimeout(() => successMessage.remove(), 3975);
        successMessage.addEventListener("click", () => {
          setTimeout(() => successMessage.remove(), 0);
          clearTimeout(timeoutId);
        });
      }

      const modalPortions = document.querySelectorAll(".modal__portion");
      for (const modalPortion of modalPortions) {
        const modalPortionTitle = modalPortion.querySelector(".modal__portion__fieldset__legend").textContent;
        const modalPortionInput = modalPortion.querySelector(".modal__portion__input").value;

        if (modalPortionTitle === questionCountText) {
          const questionTotal = document.querySelector(".question-segment__banner__question-total");
          options.questionCount = parseInt(modalPortionInput);
          questionTotal.textContent = options.questionCount;
        } else if (modalPortionTitle === isStopwatchOnText) {
          options.isStopwatchOn = modalPortionInput === "On";
          const stopwatchElem = document.querySelector(".question-segment__stopwatch");
          if (options.isStopwatchOn) {
            stopwatchElem.classList.add("visible");
          } else {
            stopwatchElem.classList.remove("visible");
          }
        } else if (modalPortionTitle === stopwatchTimingMechanismText) {
          options.stopwatchTimingMechanism = modalPortionInput.toLowerCase();
        } else if (modalPortionTitle === stopwatchWhileGradingText) {
          options.stopwatchWhileGrading = modalPortionInput === "On";
        }
      }
      displaySuccessMessage();
    }
    const modalHeader = document.createElement("header");
    const modalHeaderTitle = document.createElement("h2");
    const modalCloseButton = document.createElement("button");
    const modalPortionContainer = document.createElement("div");
    const modalForm = document.createElement("form");
    const modalButtonContainer = document.createElement("div");
    const modalApplyButton = document.createElement("button");

    modalHeaderTitle.textContent = "⚙️ Options";
    modalCloseButton.innerHTML = "&times;";
    modalApplyButton.textContent = "Apply";

    modal.classList.add("modal--options");
    modalHeader.classList.add("modal__header");
    modalHeaderTitle.classList.add("modal__header__title");
    modalCloseButton.classList.add("modal__close-button");
    modalPortionContainer.classList.add("modal__portion-container");
    modalButtonContainer.classList.add("modal__button-container");
    modalApplyButton.classList.add("modal__apply-button");
    modalForm.id = "modal__form";

    modalApplyButton.type = "submit";
    modalApplyButton.setAttribute("form", "modal__form");
    modalCloseButton.setAttribute("data-close-button", "");

    modalCloseButton.addEventListener("click", closeModal);
    modalApplyButton.addEventListener("click", applyOptions);
    modalForm.addEventListener("submit", (e) => e.preventDefault());

    modalHeader.appendChild(modalHeaderTitle);
    modalPortionContainer.appendChild(modalForm);
    modalButtonContainer.appendChild(modalApplyButton);

    modal.appendChild(modalHeader);
    modal.appendChild(modalCloseButton);
    modal.appendChild(modalPortionContainer);
    modal.appendChild(modalButtonContainer);
  }
  function createModalPortion(option, inputType, inputProps = [], inputEvents = []) {
    const modalPortion = document.createElement("div");
    const modalPortionInputContainer = document.createElement("div");
    const modalPortionInputFieldset = document.createElement("fieldset");
    const modalPortionFieldsetLegend = document.createElement("legend");

    if (inputType !== "select") {
      const modalPortionInput = document.createElement("input");
      modalPortionInput.type = inputType;
      for (const propObject of inputProps) {
        modalPortionInput.setAttribute(propObject.name, propObject.value);
        modalPortionInput.setAttribute("value", 10);
      }
      for (const eventObject of inputEvents) {
        modalPortionInput.addEventListener(eventObject.name, eventObject.handler);
      }
      modalPortionInput.classList.add("modal__portion__input");
      modalPortionInputFieldset.appendChild(modalPortionInput);
    } else {
      const modalPortionInput = document.createElement("select");
      for (const option of inputProps) {
        const modalPortionInputOption = document.createElement("option");
        modalPortionInputOption.textContent = option;
        modalPortionInput.appendChild(modalPortionInputOption);
      }
      modalPortionInput.classList.add("modal__portion__input");
      modalPortionInputFieldset.appendChild(modalPortionInput);
    }

    modalPortion.classList.add("modal__portion");
    modalPortionInputFieldset.classList.add("modal__portion__fieldset");
    modalPortionFieldsetLegend.classList.add("modal__portion__fieldset__legend");
    modalPortionInputContainer.classList.add("modal__portion__input-container");

    modalPortionFieldsetLegend.textContent = option;

    modalPortionInputFieldset.appendChild(modalPortionFieldsetLegend);
    modalPortionInputContainer.appendChild(modalPortionInputFieldset);

    modalPortion.appendChild(modalPortionInputContainer);

    const modalForm = document.querySelector("#modal__form");
    modalForm.appendChild(modalPortion);
  }
  function setModalPortionInputValues() {
    const modalPortions = document.querySelectorAll(".modal__portion");
    for (const modalPortion of modalPortions) {
      const modalPortionTitle = modalPortion.querySelector(".modal__portion__fieldset__legend").textContent;
      const modalPortionInput = modalPortion.querySelector(".modal__portion__input");

      if (modalPortionTitle === questionCountText) {
        modalPortionInput.value = options.questionCount;
      } else if (modalPortionTitle === isStopwatchOnText) {
        modalPortionInput.value = options.isStopwatchOn ? "On" : "Off";
      } else if (modalPortionTitle === stopwatchTimingMechanismText) {
        const timingMechanism = options.stopwatchTimingMechanism;
        modalPortionInput.value = timingMechanism.charAt(0).toUpperCase() + timingMechanism.slice(1);
      } else if (modalPortionTitle === stopwatchWhileGradingText) {
        modalPortionInput.value = options.stopwatchElementWhileGrading ? "On" : "Off";
      }
    }
  }
  function enforceValidValue(e) {
    const modalPortionInput = document.querySelector(".modal__portion__input");

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
      modalPortionInput.value = modalPortionInput.value.replace(e.data, "");
    }
  }

  const questionCountText = "Question Count";
  const isStopwatchOnText = "Stopwatch";
  const stopwatchTimingMechanismText = "Stopwatch Timing Mechanism";
  const stopwatchWhileGradingText = "Stopwatch While Answer Grading";

  addOptionElements();
  backdrop.classList.add("visible");

  createModalPortion(
    questionCountText,
    "number",
    [
      { name: "max", value: "30" },
      { name: "min", value: "3" },
      { name: "value", value: "10" },
    ],
    [
      { name: "input", handler: enforceValidValue },
      { name: "click", handler: (e) => e.target.select() },
    ]
  );
  createModalPortion(isStopwatchOnText, "select", ["On", "Off"]);
  createModalPortion(stopwatchTimingMechanismText, "select", ["Centiseconds", "Deciseconds", "Seconds"]);
  createModalPortion(stopwatchWhileGradingText, "select", ["On", "Off"]);
  setModalPortionInputValues();
}

export function closeModal(e) {
  e.stopPropagation();
  if (!e.target.closest(".modal") || "closeButton" in e.target.dataset) {
    modal.classList.remove("modal--options", "modal--stats");
    backdrop.classList.remove("visible");
    while (modal.firstChild) {
      modal.removeChild(modal.firstChild);
    }
  }
}
