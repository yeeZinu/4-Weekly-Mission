const emailInput = document.querySelector('#signup-email')
const errorEmail = document.querySelector('#errorEmail')
const passwordInput = document.querySelector('#signup-password')
const errorPassword = document.querySelector('#errorPassword')

import { isEmailValid, isInputEmpty, showError, clearError } from './sign-error.js'
import { passwordRegex } from './constants.js'

/////////////////////////////////////

/**
 * 이메일 중복 확인 함수
 * @param {*} input 확인할 이메일
 * @returns 중복 여부 불린값
 */
const isEmailUsed = (input) => {
    const codeit = { email: 'test@codeit.com' }
    return input === codeit.email
}

/**
 * 비밀번호 유효성 확인
 * 8자 이상이며 문자와 숫자의 혼용 여부 확인
 * @param {*} input 확인할 비밀번호
 * @returns 위 사항을 동시에 만족하는지에 대한 불린값
 */
const isPasswordValid = (input) => {
    const minPasswordLength = 8
    return passwordRegex.test(input) && input.length >= minPasswordLength
}

/**이메일 확인 함수
 * 이메일 확인 후 error 메세지 출력
 */
const checkEmail = () => {
    const email = emailInput.value.trim()
    // 이메일 미입력 에러
    if (isInputEmpty(email)) {
        showError(emailInput, errorEmail, '이메일을 입력해 주세요.')
        return
    }
    // 이메일 형식 확인
    if (!isEmailValid(email)) {
        showError(emailInput, errorEmail, '올바른 이메일 주소가 아닙니다.')
        return
    }
    // 이메일 중복 확인
    if (isEmailUsed(email)) {
        showError(emailInput, errorEmail, '이미 사용 중인 이메일입니다.')
    }
}

/**
 * 비번 확인 함수
 * 빈 input 시 error 메세지 출력
 */
const checkPassword = () => {
    const password = passwordInput.value.trim()
    if (!isPasswordValid(password)) {
        showError(
            passwordInput,
            errorPassword,
            '비밀번호는 영문, 숫자 조합 8자 이상 입력해 주세요.'
        )
    }
}

/////////핸들러 함수///////

const handleEmailFocusout = () => {
    clearError(emailInput, errorEmail)
    checkEmail()
}
const handlePasswordFocusout = () => {
    clearError(passwordInput, errorPassword)
    checkPassword()
}

//////////////// 함수 사용////////////////////

// 이메일 이벤트 리스너 부여
emailInput.addEventListener('focusout', handleEmailFocusout)
// 비번 이벤트 리스너 부여
passwordInput.addEventListener('focusout', handlePasswordFocusout)
