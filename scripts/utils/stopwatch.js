let startTime;
let stopwatchInterval;
let elapsedTime = 0;
export let currentFormattedTimeValue = '00:00.00';

function updateStopwatch(mechanism, isStopwatchOn) {
  return function () {
    const currentTime = Date.now();
    const totalElapsedTime = elapsedTime + (currentTime - startTime);
    const centiseconds = Math.floor(totalElapsedTime / 10);
    const seconds = Math.floor(centiseconds / 100);
    const minutes = Math.floor(seconds / 60);


    const formattedCentiseconds = mechanism !== 'deciseconds' ? padNumber(centiseconds % 100) :
      (centiseconds % 100).toString().charAt(0);
    const formattedSeconds = padNumber(seconds % 60);
    const formattedMinutes = padNumber(minutes);

    currentFormattedTimeValue = `${formattedMinutes}:${formattedSeconds}${mechanism !== 'seconds' ? '.' + formattedCentiseconds : ''}`;
    if (isStopwatchOn) {
      document.querySelector('.question-segment__stopwatch__display').textContent = currentFormattedTimeValue;
    }
  };
}

function padNumber(number) {
  return number.toString().padStart(2, '0');
}

export function startStopwatch(mechanism, isStopwatchOn) {
  const timeout = mechanism === 'centiseconds' ? 10 : (mechanism === 'deciseconds' ? 100 : 1000);
  startTime = Date.now();
  stopwatchInterval = setInterval(updateStopwatch(mechanism, isStopwatchOn), timeout);
}

export function stopStopwatch() {
  clearInterval(stopwatchInterval);
  elapsedTime += Date.now() - startTime;
}

export function resetStopwatch(mechanism = 'centiseconds') {
  clearInterval(stopwatchInterval);
  startTime = Date.now();
  elapsedTime = 0;
  document.querySelector('.question-segment__stopwatch__display').textContent =
    `00:00${mechanism !== 'seconds' ? (mechanism === 'centiseconds' ? '.00' : '.0') : ''}`;
}

export function continueStopwatch(mechanism = 'centiseconds', isStopwatchOn) {
  const timeout = mechanism === 'centiseconds' ? 10 : (mechanism === 'deciseconds' ? 100 : 1000);
  startTime = Date.now();
  stopwatchInterval = setInterval(updateStopwatch(mechanism, isStopwatchOn), timeout);
}
