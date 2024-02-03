import {
  handleEmailInput,
  handlePasswordInput,
  handlePasswordCheckInput,
  handleEyeClick,
} from "../utils/input.js";
import {
  validateEmail,
  validatePassword,
  validatePasswordCheck,
} from "../utils/validation.js";

/**
 * 회원가입 폼 제출 이벤트 핸들러
 *
 * @param {event} event - submit event
 */
function handleSignFormSubmit(event) {
  event.preventDefault();

  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const passwordCheckInput = document.getElementById("password-check");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");
  const passwordCheckError = document.getElementById("passwordCheckError");

  const isEmailValid = validateEmail(emailInput.value, emailError, "signup");
  const isPasswordValid = validatePassword(passwordInput.value, passwordError);
  const isPasswordCheckValid = validatePasswordCheck(
    passwordInput.value,
    passwordCheckInput.value,
    passwordCheckError
  );

  // 이메일, 비밀번호, 비밀번호 확인 모두 입력되었을 때
  if (isEmailValid && isPasswordValid && isPasswordCheckValid) {
    fetch("https://bootcamp-api.codeit.kr/api/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailInput.value,
        password: passwordInput.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => data.data.accessToken)
      .then((accessToken) => {
        localStorage.setItem("accessToken", accessToken);
        window.location.href = "/folder";
      })
      .catch((err) => console.log(err));
  }

  //
}

// 이메일 입력 이벤트 등록
document
  .getElementById("email")
  .addEventListener("focusout", () => handleEmailInput("signup"));

// 비밀번호 입력 이벤트 등록
document
  .getElementById("password")
  .addEventListener("focusout", handlePasswordInput);

// 비밀번호 확인 입력 이벤트 등록
document
  .getElementById("password-check")
  .addEventListener("focusout", handlePasswordCheckInput);

// 회원가입 폼 제출 이벤트 등록
document
  .getElementById("sign-form")
  .addEventListener("submit", (e) => handleSignFormSubmit(e));

// 눈 아이콘 클릭 이벤트 등록
document
  .getElementById("eye1")
  .addEventListener("click", () => handleEyeClick("eye1"));

document
  .getElementById("eye2")
  .addEventListener("click", () => handleEyeClick("eye2"));

// 페이지 접근 시 로컬 스토리지에 accessToken이 있으면 /folder로 이동
document.addEventListener("DOMContentLoaded", () => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    window.location.href = "/folder";
  }
});
