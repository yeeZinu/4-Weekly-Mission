import {EMAIL_REGEX, USERS, VISIABLE_STATE} from './constant.js'
import { isEmptyString, isVisiable, makeInvisiable, makeVisiable, isValidEmail } from './functions/signFunction.js';


// ERROR_MESSAGE for email
const emailErrorMessage = document.getElementById('emailErrorMessage');
const emailFormatErrorMessage = document.getElementById('emailFormatErroMessage');
const emailCheckErrorMessage = document.getElementById('emailCheckErrorMessage');

// ERROR_MESSAGE for password
const passwordErrorMessage = document.getElementById('passwordErrorMessage');
const passwordCheckEMessage = document.getElementById('passwordCheckMessage');

//INPUT section
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

//Button section
const signInButton = document.getElementById('login-button');
const watchPassword = document.getElementById('eye-button');

const goToFolderhtml = '../folder.html';


emailInput.addEventListener('focusout', function(){
    const emailValue = emailInput.value.trim(); 
    if(!isEmptyString(emailValue)) {makeInvisiable(emailErrorMessage);return;}
    makeVisiable(emailErrorMessage);
});

passwordInput.addEventListener('focusout', function () {
    const passwordValue = passwordInput.value.trim();
    if(!isEmptyString(passwordValue)) {makeInvisiable(passwordErrorMessage);return;} 
    makeVisiable(passwordErrorMessage);
});

emailInput.addEventListener('focusout', function () {
    const emailValue = emailInput.value.trim();
    if (!isEmptyString(emailValue) && isValidEmail(emailValue)) {
        makeInvisiable(emailFormatErrorMessage); return;} 
    if (isEmptyString(emailValue)) {makeInvisiable(emailFormatErrorMessage); return;}
    makeVisiable(emailFormatErrorMessage);
});

signInButton.addEventListener('click', function (event) {
    event.preventDefault();
    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value.trim();
    if (USERS[0].id === emailValue && USERS[0].password === passwordValue) {
        window.location.href = goToFolderhtml;
    }
    makeVisiable(emailCheckErrorMessage);
    makeVisiable(passwordCheckMessage);
});

watchPassword.addEventListener('click', function () {
    if (passwordInput.type === 'text' ? true : false) {
        watchPassword.firstElementChild.src = VISIABLE_STATE.invisiable;
        passwordInput.type = 'password';
    } else {
        watchPassword.firstElementChild.src = VISIABLE_STATE.visiable;
        passwordInput.type = 'text';
    }
});

