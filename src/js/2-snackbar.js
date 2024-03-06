import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";



// const formRef = document.querySelector('.form');

// formRef.addEventListener('submit', onBtnSubmit);

// function onBtnSubmit(event) {
//   event.preventDefault();

//   const { elements: { delay, step, amount} } = event.currentTarget;
//   const dataForm = {
//     delay: Number(delay.value),
//     step: Number(step.value),
//     amount: Number(amount.value)
//   };

//   if (dataForm.delay < 0 || dataForm.step < 0 || dataForm.amount < 0) {
//       return
//     //   Notify.failure('Please, enter positive values', {
//     //   width: '400px',
//     //   position: 'center-center',
//     //   fontSize: '28px',
//     //   clickToClose: true
//     // });
//   };

//   let delayPromise = dataForm.delay;
//   for (let position = 1; position <= dataForm.amount; position++) {
//     createPromise(position, delayPromise)
//       .then(({ position, delayPromise }) => {
//         // Notify.success(`✅ Fulfilled promise ${position} in ${delayPromise}ms`, {
//         //   width: '400px',
//         //   timeout: 4000,
//         //   position: 'center-center',
//         //   fontSize: '28px',
//         //   clickToClose: true
//           // });
//           iziToast.success({
//             title: '✅ Fulfilled promise',
//             message: `Затримка: ${delayPromise}мс`,
//           });
//       })
//       .catch(({position, delayPromise}) => {
//         Notify.failure(`❌ Rejected promise ${position} in ${delayPromise}ms`, {
//           width: '400px',
//           timeout: 4000,
//           position: 'center-center',
//           fontSize: '28px',
//           clickToClose: true
//         });
//       });
//     delayPromise += dataForm.step;
//   };

//   event.currentTarget.reset();
// };

// function createPromise(position, delayPromise) {
//   return new Promise((resolve, reject) => {
//     const shouldResolve = Math.random() > 0.3;
//     setTimeout(() => {
//       if (shouldResolve) {
//         resolve({position, delayPromise})
//         // Fulfill
//       } else {
//         reject({position, delayPromise})
//         // Reject
//       }
//     }, delayPromise)
//   });
// };

const form = document.querySelector('.form');

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const delay = Number(form.querySelector('input[name="delay"]').value);
      const state = form.querySelector('input[name="state"]:checked').value;

      const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          if (state === 'fulfilled') {
            resolve(delay);
          } else {
            reject(delay);
          }
        }, delay);
      });

      promise
        .then((delay) => {
          iziToast.success({
            title: '✅ Fulfilled promise',
              message: `Затримка: ${delay}мс`,
            position: "topRight",
          });
        })
        .catch((delay) => {
          iziToast.error({
            title: '❌ Rejected promise',
              message: `Затримка: ${delay}мс`,
            position: "topRight",
          });
        });
    });