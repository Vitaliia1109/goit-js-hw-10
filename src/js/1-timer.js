import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";



// Timer

const startBtnRef = document.querySelector('[data-start]');
const inputRef = document.getElementById('datetime-picker');
const daysRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minutesRef = document.querySelector('[data-minutes]');
const secondsRef = document.querySelector('[data-seconds]');

startBtnRef.disabled = true;

// Calendar creation

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        if (startBtnRef.dataset.start === 'active') { 
            startBtnRef.disabled = true;
            iziToast.warning({
                title: 'Warning',
                message: 'The counter is already active',
                position: 'topRight',
                color: 'red',
  
});
            return;
        }

        const date = Date.now();
        const deltaTime = selectedDates[0].getTime() - date;

        if (deltaTime <= 0) {
            iziToast.warning({
                title: 'Warning',
                message: 'Please choose a date in the future',
                position: 'topRight',
                color: 'red',
  
});
            return;
        }
        
        startBtnRef.disabled = false;
    },
};
flatpickr(inputRef, options);

startBtnRef.addEventListener('click', onClickStart)

function onClickStart() {
    startBtnRef.disabled = true;
    startBtnRef.dataset.start = 'active';

    const selectedDate = new Date(inputRef.value);
    
    const timerId = setInterval(() => {
        let currentDate = new Date();
        let deltaTime = selectedDate.getTime() - currentDate.getTime();


        if (deltaTime <= 0) {
            clearInterval(timerId);
            startBtnRef.dataset.start = 'not-active';
            iziToast.success({
                title: 'Success',
                message: 'Time is up!',
                position: 'topRight', 
                color: 'green', 
});
            return;
        };
        setTheTimer(deltaTime);
    }, 1000);

}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
};

function setTheTimer(deltaTime) {
    const { days, hours, minutes, seconds } = convertMs(deltaTime);
    daysRef.textContent = `${addLeadingZero(days)}`;
    hoursRef.textContent = `${addLeadingZero(hours)}`;
    minutesRef.textContent = `${addLeadingZero(minutes)}`;
    secondsRef.textContent = `${addLeadingZero(seconds)}`;
};