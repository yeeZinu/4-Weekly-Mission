import { ERROR_MESSAGES, REGEX } from "./constants/VALIDATION.js";
import {
  emailError,
  emailInput,
  pwError,
  pwInput,
  form,
  pwToggle,
  validateEmail,
  validatePw,
  eyeToggle,
  showError,
  hideError,
} from "./auth.js";
const handleSignInFail = () => {
  showError(emailError, emailInput, ERROR_MESSAGES.email_check);
  showError(pwError, pwInput, ERROR_MESSAGES.password_check);
};
const handleSignIn = (e) => {
  e.preventDefault();
  const emailValue = emailInput.value.trim();
  const pwValue = pwInput.value.trim();

  if (emailValue === "test@codeit.com" && pwValue === "codeit101") {
    alert("로그인 성공!");
    window.location.href = "folder.html";
  } else {
    alert("로그인 실패!");
    handleSignInFail();
  }
};
emailInput.addEventListener("focusout", validateEmail);
pwInput.addEventListener("focusout", validatePw);
form.addEventListener("submit", (e) => handleSignIn(e));
pwToggle.addEventListener("click", () => eyeToggle(pwInput, pwToggle));
