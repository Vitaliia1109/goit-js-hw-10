import"./assets/styles-69cf9f29.js";import{i}from"./assets/vendor-77e16229.js";const o=document.querySelector(".form");o.addEventListener("submit",s=>{s.preventDefault();const t=Number(o.querySelector('input[name="delay"]').value),r=o.querySelector('input[name="state"]:checked').value;new Promise((e,m)=>{setTimeout(()=>{r==="fulfilled"?e(t):m(t)},t)}).then(e=>{i.success({title:"✅ Fulfilled promise",message:`Затримка: ${e}мс`,position:"topRight"})}).catch(e=>{i.error({title:"❌ Rejected promise",message:`Затримка: ${e}мс`,position:"topRight"})})});
//# sourceMappingURL=commonHelpers2.js.map