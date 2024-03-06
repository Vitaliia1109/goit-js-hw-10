import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


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