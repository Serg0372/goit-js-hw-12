import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const input = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');
const timerDays = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]');

let userSelectedDate = 0;
btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate < new Date()) {
      iziToast.error({
        position: 'topRight',
        title: 'Error',
        message: 'Please choose a date in the future',
      });
      btnStart.disabled = true;
    } else {
      btnStart.disabled = false;
      input.disabled = true;
     }
  },
};

flatpickr(input, options);

btnStart.addEventListener('click', startTimer);

let intervalId = 0;

function startTimer() {
  btnStart.disabled = true; 
  input.disabled = true;
  intervalId = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = userSelectedDate - currentTime;

    if (deltaTime <= 0) {
      clearInterval(intervalId);
      return;
    }

    const time = convertMs(deltaTime);
    updateTimer(time);
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor((ms % hour) / minute);
  const seconds = Math.floor((ms % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateTimer({ days, hours, minutes, seconds }) {
  timerDays.textContent = String(days).padStart(2, '0');
  timerHours.textContent = String(hours).padStart(2, '0');
  timerMinutes.textContent = String(minutes).padStart(2, '0');
  timerSeconds.textContent = String(seconds).padStart(2, '0');
}
