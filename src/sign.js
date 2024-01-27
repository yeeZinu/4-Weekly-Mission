import { MESSAGE, REGEX, ACTION, TEST_AUTH } from './constants/SIGN.js';

const emailInput = document.getElementById('email');
const emailError = document.getElementById('email-error');
const pwInput = document.getElementById('password');
const pwError = document.getElementById('password-error');
const pwCheckInput = document.getElementById('password-check');
const pwCheckError = document.getElementById('password-check-error');
const pwToggle = document.querySelector('.password-eye');
const pwCheckToggle = document.querySelector('.password-check-eye');
const signBtn = document.querySelector('.sign-normal__btn');

const applyErrorStyle = (el) => {
  el.style.border = '1px solid var(--red)';
};
const resetErrorStyle = (el) => {
  el.style.border = '';
};

const applyError = (errorEl, errorMsg, input) => {
  errorEl.innerText = errorMsg;
  applyErrorStyle(input);
};
const resetError = (errorEl, input) => {
  errorEl.innerText = '';
  resetErrorStyle(input);
};

const isValidFormat = (action, input) => {
  if (action === ACTION.EMAIL) return REGEX.EMAIL_REGEX.test(input);
  if (action === ACTION.PW) return REGEX.PW_REGEX.test(input);
};

const validateEmail = () => {
  if (emailInput.value === '') applyError(emailError, MESSAGE.REQUIRED_EMAIL, emailInput);
  else if (!isValidFormat(ACTION.EMAIL, emailInput.value))
    applyError(emailError, MESSAGE.INVALID_EMAIL_FORMAT, emailInput);
  else resetError(emailError, emailInput);
};

const validatePw = () => {
  if (pwInput.value === '') applyError(pwError, MESSAGE.REQUIRED_PASSWORD, pwInput);
  else if (!isValidFormat(ACTION.PW, pwInput.value)) applyError(pwError, MESSAGE.INVALID_PW_FORMAT, pwInput);
  else resetError(pwError, pwInput);
};

const handleClickPwToggle = (input, toggle) => {
  input.type = input.type === 'password' ? 'text' : 'password';
  toggle.src = input.type === 'password' ? 'public/images/eye-off.svg' : 'public/images/eye-on.svg';
};

const handleLoginFailure = () => {
  applyError(emailError, MESSAGE.CHECK_EMAIL, emailInput);
  applyError(pwError, MESSAGE.CHECK_PASSWORD, pwInput);
};

const handleLogin = () => {
  if (emailInput.value === 'test@codeit.com' && pwInput.value === 'codeit101') {
    window.location.href = 'folder.html';
  } else {
    handleLoginFailure();
  }
};

const handleEnterKey = (e) => {
  if (e.key === 'Enter') handleLogin();
};

const handleDuplicateEmail = () => {
  if (emailInput.value === TEST_AUTH.EMAIL) applyError(emailError, MESSAGE.DUPLICATE_EMAIL, emailInput);
  else validateEmail();
};

const handlePasswordMatch = () => {
  if (pwCheckInput.value !== pwInput.value) applyError(pwCheckError, MESSAGE.NOT_MATCH_PASSWORD, pwCheckInput);
  else resetError(pwCheckError, pwCheckInput);
};

emailInput.addEventListener('focusout', handleDuplicateEmail);
emailInput.addEventListener('keydown', handleEnterKey);

pwInput.addEventListener('focusout', validatePw);
pwInput.addEventListener('keydown', handleEnterKey);

pwCheckInput.addEventListener('focusout', handlePasswordMatch);

signBtn.addEventListener('click', handleLogin);
pwToggle.addEventListener('click', () => handleClickPwToggle(pwInput, pwToggle));
pwCheckToggle.addEventListener('click', () => handleClickPwToggle(pwCheckInput, pwCheckToggle));
