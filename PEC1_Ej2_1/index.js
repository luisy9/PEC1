const form = document.getElementById('miFormulario');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const userInput = document.getElementById('username');
  const msgErrorUser = document.getElementById('msgErrorUsername');

  const emailInput = document.getElementById('email');
  const msgErrorEmail = document.getElementById('msgErrorEmail');

  const PasswordInput = document.getElementById('password');
  const msgErrorPassword = document.getElementById('msgErrorPassword');

  const PasswordConfirmInput = document.getElementById('confirmPassword');
  const msgErrorPasswordConfirm = document.getElementById(
    'msgErrorPasswordConfirm'
  );

  const ageInput = document.getElementById('edad');
  const msgErrorAge = document.getElementById('msgErrorEdad');

  //Validaciones

  //Username validation
  const valor = userInput.value;
  if (valor.length < 3) {
    msgErrorUser.textContent = 'El nombre del usuario debe ser mayor de 3';
  } else {
    msgErrorUser.textContent = '';
  }

  //Email Validation
  const emailValidation = new RegExp(
    /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
    'gm'
  );
  const isValid = emailValidation.test(emailInput.value);
  if (!isValid) {
    msgErrorEmail.textContent = 'El email no es valido';
  } else {
    msgErrorEmail.textContent = '';
  }

  //Password validation
  const valorPassowrd = PasswordInput.value;
  if (valorPassowrd.length < 6) {
    msgErrorPassword.textContent = 'El password debe ser mayor de 6';
    const regex = new RegExp(/^(?=.*[A-Z])(?=.*[~!@#\$%\^&\*\(\)_\+\-=\{\}\|\[\]\\:";'<>?,./])(?=.*[a-z])(?=.*\d).{8,}$/);
    const isValidPassword = regex.test(valorPassowrd);

  } else {
    msgErrorPassword.textContent = '';
  }

  const password2 = PasswordConfirmInput.value;
  if (password2.length < 1) {
    msgErrorPasswordConfirm.textContent = 'El password2 es required';
  } else if (password2.length < 6) {
    msgErrorPasswordConfirm.textContent = 'El password2 debe ser mayor de 6';
  } else {
    msgErrorPasswordConfirm.textContent = '';
  }

  //age validation
  const age = ageInput.value;
  if(age.length >= 0 || age.length < 1000){
    msgErrorAge.textContent = '';
  } else {
    msgErrorAge.textContent = 'Tu edad debe estar entre 0 y 1000';
  }
});
