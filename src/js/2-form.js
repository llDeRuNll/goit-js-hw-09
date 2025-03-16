const form = document.querySelector('.feedback-form');
let formData = {};

const pageLoad = function () {
  const persistData = JSON.parse(localStorage.getItem('feedback-form-state'));
  if (!persistData) return;
  Object.entries(persistData).forEach(([key, value]) => {
    form.elements[key].value = value;
  });
  formData = persistData;
};
pageLoad();

const handleInput = function (event) {
  const { name, value } = event.target;
  formData[name] = value.trim();
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
};

const clearForm = function (event) {
  event.preventDefault();
  const { email, message } = event.target;
  if (email.value === '' || message.value === '') {
    alert('Please fill in all fields.');
  } else {
    console.log({ email: email.value, message: message.value });
    localStorage.removeItem('feedback-form-state');
    event.currentTarget.reset();
  }
};

form.addEventListener('input', handleInput);
form.addEventListener('submit', clearForm);
