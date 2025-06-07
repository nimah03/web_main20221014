1. 전체 실습과정 완료
• 기본 기능 동작
  화살표 함수
  const over=(obj) => {
    obj.src="../image/LOGO1.png";
};

const out= (obj)=> {
    obj.src="../image/LOGO2.png";
};
팝업 닫기
show_time(); // 실시간 시간 보여주기

et divClock = document.getElementById('Time');
divClock.innerText = close_time2; // 10초 삽입 시작
close_time2--; // 1초씩 감소
setTimeout(show_time, 1000); //1초마다 갱신

window.close(); // 윈도우 닫기

로그인 폼
login.html 만들기
부트스트랩에서 따오기
css 연동
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
get/post
<form method="get" action="/login/index_login.html">
공백확인
if (emailValue === '') 
인덱스_로그인 페이지 만들고 로그아웃 버튼 만들기

팝업 창에 체크박스 생성
체크박스 클릭시 get, set 함수를 통한 쿠키 생성
쿠키가 있을시 팝업 다시 뜨지 않음


2. 응용 문제 풀기 / 연습문제 완료
로그인 입력 길이제한 변경
    if (emailValue.length < 5 || emailValue.length > 10) {
            alert('아이디는 최소 5글자 이상 최대 10글자 이하로 입력해야 합니다.');
            return false;
        }
        if (passwordValue.length < 12 || passwordValue.length < 15 ) {
            alert('비밀번호는 반드시 12글자 이상 최대 15글자 이하로 입력해야 합니다.');
            return false;
        }
로그인 입력 제한(패턴식 활용)
const sanitizedPassword = check_xss(passwordInput);
    // check_xss 함수로 비밀번호 Sanitize
    const sanitizedEmail = check_xss(emailInput);
    // check_xss 함수로 비밀번호 Sanitize
    if (!sanitizedEmail) {
        // Sanitize된 비밀번호 사용
        return false;
    }
    if (!sanitizedPassword) {
        // Sanitize된 비밀번호 사용
        return false;
    }
