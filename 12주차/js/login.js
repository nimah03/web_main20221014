import { session_set, session_get, session_check } from './session.js';
import { encrypt_text, decrypt_text } from './crypto.js';
import { generateJWT, checkAuth } from './jwt_token.js';
// 전역 변수 추가, 맨 위 위치
const idsave_check = document.getElementById('idSaveCheck');



function setCookie(name, value, expiredays) {
    var date = new Date();
    date.setDate(date.getDate() + expiredays);
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + ";expires=" + date.toUTCString() + "; path=/";
}

function getCookie(name) {
    var cookie = document.cookie;
    console.log("쿠키를 요청합니다.");
    if (cookie !== "") {
        var cookie_array = cookie.split("; ");
        for (var index in cookie_array) {
            var cookie_name = cookie_array[index].split("=");
            if (cookie_name[0] === decodeURIComponent(name)) {
                return decodeURIComponent(cookie_name[1]);
            }
        }
    }
    return null;
}



const check_input = () => {
    const c = '아이디, 패스워드를 체크합니다';
    const loginForm = document.getElementById('login_form');
    const loginBtn = document.getElementById('login_btn');
    const emailInput = document.getElementById('typeEmailX');
    const passwordInput = document.getElementById('typePasswordX');
    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value.trim();
    const payload = {
        id: emailValue,
        exp: Math.floor(Date.now() / 1000) + 3600 // 1시간 (3600초)
    };
    const jwtToken = generateJWT(payload);
    alert(c);
    if (emailValue === '') {
        alert('이메일을 입력하세요.');
        login_failed();
        return false;
    }
    else if (passwordValue === '') {
        alert('비밀번호를 입력하세요.');
        login_failed();
        return false;
    }

    else if (emailValue.length < 5 ) {
        alert('아이디는 최소 5글자 이상 최대 10글자 이하로 입력해야 합니다.');
        login_failed();
        return false;
    }
    else if (passwordValue.length < 12 ) {
        alert('비밀번호는 반드시 12글자 이상 최대 15글자 이하로 입력해야 합니다.');
        login_failed();
        return false;
    }
    // const hasSpecialChar = passwordValue.match(/[!,@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/) !== null;
    // if (!hasSpecialChar) {
    //     alert('패스워드는 특수문자를 1개 이상 포함해야 합니다.');
    //     return false;
    // }
    const hasUpperCase = passwordValue.match(/[A-Z]+/) !== null;
    const hasLowerCase = passwordValue.match(/[a-z]+/) !== null;
    if (!hasUpperCase || !hasLowerCase) {
        alert('패스워드는 대소문자를 1개 이상 포함해야 합니다.');
        login_failed();
        return false;
    }
    // 같은 문자가 3번 이상 반복되는 경우 
    const repeatCharPattern = /(.{1,})\1{2,}/;
    // 연속된 숫자 패턴이 반복되는 경우
    const repeatNumberPattern = /(\d{2,})\1+/;

    if (repeatCharPattern.test(emailValue)) {
        alert("같은 단어나 문자를 3번 이상 반복할 수 없습니다.");
        login_failed();
        return false;
    }

    else if (repeatNumberPattern.test(emailValue)) {
        alert("2자리 이상 연속된 숫자 패턴이 반복되면 사용할 수 없습니다.");
        login_failed();
        return false;
    }
    console.log('이메일:', emailValue);
    console.log('비밀번호:', passwordValue);

    const sanitizedEmail = check_xss(emailValue);      
    const sanitizedPassword = check_xss(passwordValue); 
    if (!sanitizedEmail) {
        // Sanitize된 비밀번호 사용
        login_failed();
        return false;
    }
    else if (!sanitizedPassword) {
        // Sanitize된 비밀번호 사용
        login_failed();
        return false;
    }
    



    // 검사 마무리 단계 쿠키 저장, 최하단 submit 이전

    if(idsave_check.checked == true) { // 아이디 체크 o
        alert("쿠키를 저장합니다.", emailValue);
        setCookie("id", emailValue, 1); // 1일 저장
        alert("쿠키 값 :" + emailValue);
    }
    else{ // 아이디 체크 x
        setCookie("id", emailValue, 0); //날짜를 0 - 쿠키 삭제
    }
    session_set();
    localStorage.setItem('jwt_token', jwtToken);
    loginForm.submit();
};

const check_xss = (input) => {

    // DOMPurify 라이브러리 로드 (CDN 사용)
    const DOMPurify = window.DOMPurify;
    // 입력 값을 DOMPurify로 sanitize
    const sanitizedInput = DOMPurify.sanitize(input);
    console.log('원본 입력값:', input);
    console.log('Sanitized 결과:', sanitizedInput);
    // Sanitized된 값과 원본 입력 값 비교
    if (sanitizedInput !== input) {
        // XSS 공격 가능성 발견 시 에러 처리
        alert('XSS 공격 가능성이 있는 입력값을 발견했습니다.');
        return false;
    }
    // Sanitized된 값 반환
    return sanitizedInput;
};

function init(){ // 로그인 폼에 쿠키에서 가져온 아이디 입력
    const emailInput = document.getElementById('typeEmailX');
    const idsave_check = document.getElementById('idSaveCheck');
    let get_id = getCookie("id");
    if(get_id) {
        emailInput.value = get_id;
        idsave_check.checked = true;
    }
    session_check();
}



function login_count() {
    let count = getCookie("login_cnt");
    count = count ? parseInt(count) + 1 : 1;
    setCookie("login_cnt", count, 1);
    console.log("로그인 횟수:", count);
}

function logout_count() {
    let count = getCookie("logout_cnt");
    count = count ? parseInt(count) + 1 : 1;
    setCookie("logout_cnt", count, 1); 
    console.log("로그아웃 횟수:", count);
}
function session_del() {//세션 삭제
        if (sessionStorage) {
            sessionStorage.removeItem("Session_Storage_test");
            alert('로그아웃 버튼 클릭 확인 : 세션 스토리지를 삭제합니다.');
        } 
        else {
            alert("세션 스토리지 지원 x");
        }
    }
function logout() {
    session_del(); // 세션 삭제
    localStorage.removeItem('jwt_token'); // 토큰 삭제
    location.href = '../index.html'; // 페이지 이동도 이 안에서 처리
}
function login_failed() {
    let failCnt = getCookie("login_fail_cnt");
    if (!failCnt) failCnt = 0;

    failCnt = parseInt(failCnt) + 1;
    setCookie("login_fail_cnt", failCnt, 1); // 1일간 유지

    const statusDiv = document.getElementById("login_status");

    if (failCnt >= 3) {
        alert(`로그인 실패가 ${failCnt}회 발생했습니다. 더 이상 로그인할 수 없습니다.`);
        const loginBtn = document.getElementById("login_btn");
        if (loginBtn) loginBtn.disabled = true;
        if (statusDiv) statusDiv.innerText = `로그인 제한 중 (실패 ${failCnt}회)`;
    } else {
        alert(`로그인 실패 횟수: ${failCnt}회`);
        if (statusDiv) statusDiv.innerText = `실패 ${failCnt}회 (3회 이상 시 제한)`;
    }
}


function init_logined(){
    if(sessionStorage){
        decrypt_text(); // 복호화 함수
    }
    else{
        alert("세션 스토리지 지원 x");
    }
}
document.addEventListener('DOMContentLoaded', () => {
    init();
});

document.getElementById("login_btn").addEventListener('click', check_input);