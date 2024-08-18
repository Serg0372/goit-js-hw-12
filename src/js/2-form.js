let formData = {
  email: '',
  message: '',
};

const formFeedback = document.querySelector('.feedback-form');

function loadFromLocalStorage() {
  const savedData = localStorage.getItem('feedback-form-state');
  if (savedData) {
    formData = JSON.parse(savedData);
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        formFeedback.elements[key].value = formData[key];
      }
    }
  }
}

loadFromLocalStorage();

formFeedback.addEventListener('input', event => {
  const { name, value } = event.target;
  formData[name] = value.trim();
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
});

formFeedback.addEventListener('submit', event => {
  event.preventDefault();
  const { email, message } = formData;

  if (email && message) {
    console.log(formData);
    localStorage.removeItem('feedback-form-state');
    formFeedback.reset();
    formData = { email: '', message: '' };
  } else {
    alert('Fill please all fields');
  }
});


