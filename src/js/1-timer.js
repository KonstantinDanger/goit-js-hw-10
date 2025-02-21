import 'izitoast/dist/css/iziToast.min.css';
import 'flatpickr/dist/flatpickr.min.css';
import normalizeTimeText from './timeTextNormalizer';
import flatpickr from 'flatpickr';
import convertTime from './timeConverter';
import iziToast from 'izitoast';
import iziToastOptions from './iziToastOptions';

const dateInput = document.querySelector('#datetime-picker');
const selectButton = document.querySelector('button');

const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

let userSelectedDate = null;
selectButton.disabled = !userSelectedDate;

const updateTimerInterface = ({ seconds, minutes, hours, days }) => {
  dataSeconds.textContent = normalizeTimeText(seconds);
  dataMinutes.textContent = normalizeTimeText(minutes);
  dataHours.textContent = normalizeTimeText(hours);
  dataDays.textContent = normalizeTimeText(days);
};

const startReadout = () => {
  selectButton.disabled = true;
  dateInput.disabled = true;

  updateTimerInterface(convertTime(getRemainingTimeInMs()));

  let invervalId = setInterval(() => {
    let remainingTimeInMs = getRemainingTimeInMs();
    let ramainingTimeObj = convertTime(remainingTimeInMs);

    updateTimerInterface(ramainingTimeObj);

    if (remainingTimeInMs <= 0) {
      selectButton.disabled = false;
      dateInput.disabled = false;
      clearInterval(invervalId);
    }
  }, 1000);
};

const getRemainingTimeInMs = () => {
  let remainingTime = userSelectedDate - Date.now();
  return remainingTime <= 0 ? 0 : remainingTime;
};

selectButton.addEventListener('click', startReadout);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    let selectedDate = selectedDates[0];
    let currentDate = new Date();
    const selectedDateIsPastOrNow = selectedDate - currentDate <= 0;

    if (selectedDateIsPastOrNow) {
      selectButton.disabled = true;
      iziToast.show(iziToastOptions);
    } else {
      selectButton.disabled = false;
      userSelectedDate = selectedDate;
    }
  },
};

flatpickr(dateInput, options);
