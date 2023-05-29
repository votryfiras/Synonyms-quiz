let startTime;
let stopwatchInterval;

function updateStopwatch() {
  const elapsedTime = Date.now() - startTime;
  const centiseconds = Math.floor(elapsedTime / 10);
  const seconds = Math.floor(centiseconds / 100);
  const minutes = Math.floor(seconds / 60);

  const formattedCentiseconds = padNumber(centiseconds % 100);
  const formattedSeconds = padNumber(seconds % 60);
  const formattedMinutes = padNumber(minutes);

  document.querySelector('.question-segment__stopwatch__display').textContent = `${formattedMinutes}:${formattedSeconds}:${formattedCentiseconds}`;
}

function padNumber(number) {
  return number.toString().padStart(2, '0');
}

export function startStopwatch() {
  startTime = Date.now();
  stopwatchInterval = setInterval(updateStopwatch, 10);
}

export function stopStopwatch() {
  clearInterval(stopwatchInterval);
}

export function resetStopwatch() {
  clearInterval(stopwatchInterval);
  document.querySelector('.question-segment__stopwatch__display').textContent = '00:00:00.00';
}
