import throttle from 'lodash.throttle';

const elements = {
  form: document.querySelector('.feedback-form'),
  emailForm: document.querySelector('input[name="email"]'),
  messageForm: document.querySelector('textarea[name="message"]'),
  LOCAL_STORAGE_KEY: 'feedback-form-state',
};

let dataForm = {};

elements.form.addEventListener('input', handlerForm);

elements.form.addEventListener('submit', handlerFormSubmit);

function handlerFormSubmit(e) {
  e.preventDefault();
  localStorage.removeItem(elements.LOCAL_STORAGE_KEY);
  elements.emailForm.value = '';
  elements.messageForm.value = '';
  console.log(dataForm);
  console.log(dataForm.email);
  console.log(dataForm.message);
}

const updateLocalStorage = throttle(() => {
  localStorage.setItem(elements.LOCAL_STORAGE_KEY, JSON.stringify(dataForm));
}, 500);

function handlerForm(e) {
  dataForm[e.target.name] = e.target.value;
  updateLocalStorage();
}


  const savedData = localStorage.getItem(elements.LOCAL_STORAGE_KEY);
  if (savedData) {
    dataForm = JSON.parse(savedData)

    if (dataForm.email) {
      elements.emailForm.value = dataForm.email;
    }
    if (dataForm.message) {
      elements.messageForm.value = dataForm.message;
    }
  }
   else {
    elements.emailForm.value = '';
    elements.messageForm.value = '';
  }
  

