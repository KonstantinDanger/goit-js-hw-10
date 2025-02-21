import 'izitoast/dist/css/iziToast.min.css';
import iziToast from 'izitoast';
import iziToastOptions from './iziToastOptions';

const form = document.querySelector('.form');
const numberInput = document.querySelector('input[type="number"]');
numberInput.min = 0;

const onResolve = delay => {
  iziToast.show(
    iziToastOptions
      .withMessage(`✅ Fulfilled promise in ${delay}ms`)
      .withTitle('')
      .withColor('green')
  );
};

const onReject = delay => {
  iziToast.show(
    iziToastOptions
      .withMessage(`❌ Rejected promise in ${delay}ms`)
      .withTitle('')
      .withColor('red')
  );
};

const onFormSubmit = e => {
  const target = e.target;
  if (target.tagName === 'BUTTON') {
    e.preventDefault();

    const delayInMs = document.querySelector('input[type="number"]').value;

    if (!delayInMs) {
      iziToast.show(
        iziToastOptions
          .withMessage('Please, enter delay')
          .withColor('yellow')
          .withTitle('Warning!')
      );
      return;
    }

    const selectedStateValue = document.querySelector(
      'input[name="state"]:checked'
    ).value;

    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        selectedStateValue === 'fulfilled'
          ? resolve(delayInMs)
          : reject(delayInMs);
      }, delayInMs);
    });

    promise.then(onResolve).catch(onReject);
  }
};

form.addEventListener('click', onFormSubmit);
