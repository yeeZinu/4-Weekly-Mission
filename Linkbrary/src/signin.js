import {
  setInputError,
  removeInputError,
  isEmailValid,
  togglePassword,
  TEST_USER,
} from "./utils.js";

const emailInput = document.querySelector("#email");
const emailErrorMessage = document.querySelector("#email-error-message");
emailInput.addEventListener("focusout", (event) => validateEmailInput(event.target.value));
function validateEmailInput(email) {
  if (email === "") {
    setInputError({ input: emailInput, errorMessage: emailErrorMessage }, "이메일을 입력해주세요.");
    return;
  }
  if (!isEmailValid(email)) {
    setInputError(
      { input: emailInput, errorMessage: emailErrorMessage },
      "올바른 이메일 주소가 아닙니다."
    );
    return;
  }
  removeInputError({ input: emailInput, errorMessage: emailErrorMessage });
}

const passwordInput = document.querySelector("#password");
const passwordErrorMessage = document.querySelector("#password-error-message");
passwordInput.addEventListener("focusout", (event) => validatePasswordInput(event.target.value));
function validatePasswordInput(password) {
  if (password === "") {
    setInputError(
      { input: passwordInput, errorMessage: passwordErrorMessage },
      "비밀번호를 입력해주세요."
    );
    return;
  }
  removeInputError({ input: passwordInput, errorMessage: passwordErrorMessage });
}

const passwordToggleButton = document.querySelector("#password-toggle");
passwordToggleButton.addEventListener("click", () =>
  togglePassword(passwordInput, passwordToggleButton)
);

function checkAccessToken() {
  if (localStorage.getItem('accessToken')) {
    location.href = './folder.html';
  }
}
window.onload = checkAccessToken();

const signForm = document.querySelector("#form");
signForm.addEventListener("submit", submitForm);
async function submitForm(event) {
  event.preventDefault();

  try {
    const response = await fetch("https://bootcamp-api.codeit.kr/api/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailInput.value,
        password: passwordInput.value,
      }),
    });

    if (response.ok) {
      location.href = "/folder";
      // 로그인 시 성공 응답으로 받은 accessToken을 로컬 스토리지에 저장
      localStorage.setItem('accessToken', result.data.accessToken);
      localStorage.setItem('refreshToken', result.data.refreshToken);
    } else {
      setInputError({ input: emailInput, errorMessage: emailErrorMessage }, "이메일을 확인해주세요.");
      setInputError(
        { input: passwordInput, errorMessage: passwordErrorMessage },
        "비밀번호를 확인해주세요."
      );
    }
  } catch (error) {
    console.error("로그인 중 오류 발생:", error);
  }
}
