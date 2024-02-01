import {isValidEmail} from './accountDataVerification.js'
import {accessTokenReturn} from './tokenHandle.js'

const ERROR_TYPE = {
   EMAIL_SECTION_BLANK : '이메일을 입력해 주세요.',
   EMAIL_MISMATCH_WITH_ACCOUNT : '이메일을 확인해 주세요.',
   EMAIL_IS_ALREADY_REGISTERED : '이미 사용중인 이메일입니다.',   
   EMAIL_IS_NOT_VALID : '올바른 이메일 주소가 아닙니다.',
   PW_MISMATCH_WITH_ACCOUNT : '비밀번호를 확인해 주세요.',
   PW_SECTION_BLANK : '비밀번호를 입력해 주세요.',
   PW_IS_NOT_VALID : '비밀번호는 영문, 숫자 조합 8자 이상 입력해 주세요.',
   PW_CHECK_MISMATCH_WITH_PASSWORD : '비밀번호가 일치하지 않아요.',
   ERROR_IS_NOT_IDENTIFIED : '식별되지 않은 로직 오류'
};

const errPrint = function (erredInput, msgSection, msg) {
   erredInput.classList.add('signErr');
   msgSection.textContent = msg;
};

// Focus
const focusToInput = function (e, errSection) {
   e.target.classList.remove('signErr');
   errSection.textContent = '';
};

// Blur - 별다른 조건이 없을 경우, input의 값 유무
const blurFromInput = function (e, errMsgSection, errMsg, customCondition = true, customConditionErr = ERROR_TYPE.ERROR_IS_NOT_IDENTIFIED) {
   const sectionValue = e.target.value;
   const isEmailSection = e.target.type == 'email';
   
   if (!sectionValue) {
      errPrint(e.target, errMsgSection, errMsg);
      return;
   }

   // Email Input인 경우의 형식 검사.
   if (isEmailSection && !isValidEmail(sectionValue)) {
      errPrint(e.target, errMsgSection, ERROR_TYPE.EMAIL_IS_NOT_VALID);
      return;
   }
   
   // customCondition 추가 검사. 기본적으로 Pass
   if (!customCondition) {
      errPrint(e.target, errMsgSection, customConditionErr);
   }
}


// 로그인 시도 성공여부의 Boolean값
const isThisLoginWasSuccessful =  async function (TriedAccountInformation) {
   const serverResponseAboutAccount = await fetch ('https://bootcamp-api.codeit.kr/api/sign-in', {
      method : 'POST',
         headers : {
            "Content-type": "application/json"
         }, 
      body : JSON.stringify(TriedAccountInformation)
   })
   const isLoginSuccess = serverResponseAboutAccount.status == 200

   // 성공시 로컬 스토리지에 accessToken을 기록
   if (isLoginSuccess) {
      const accountAccessToken = accessTokenReturn(serverResponseAboutAccount)
      localStorage.setItem('accessToken', accountAccessToken)
   }  
   return isLoginSuccess
}


// 회원가입 성공시 토큰 반환
const accountRegister = async (inputtedAccountData) => {
   const serverResponseAboutAccount = await fetch('https://bootcamp-api.codeit.kr/api/sign-up', {
      method : 'POST',
      headers : {
         "Content-type" : "application/json"},
      body : JSON.stringify(inputtedAccountData)
      })
   const accountAccessToken = accessTokenReturn(serverResponseAboutAccount)
   localStorage.setItem('accessToken', accountAccessToken)
}


export {focusToInput, blurFromInput, errPrint, isThisLoginWasSuccessful,accountRegister , ERROR_TYPE};