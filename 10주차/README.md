1. 전체 실습과정 완료
• 기본 기능 동작
아이디 체크박스 추가
쿠키저장
if(idsave_check.checked == true) { // 아이디 체크 o
    alert("쿠키를 저장합니다.", emailValue);
    setCookie("id", emailValue, 1); // 1일 저장
    alert("쿠키 값 :" + emailValue);
}
else{ // 아이디 체크 x
    setCookie("id", emailValue.value, 0); //날짜를 0 - 쿠키 삭제
}

세션 저장
session.js 생성

세션 체크
function session_check() { //세션 검사
    if (sessionStorage.getItem("Session_Storage_test")) {
    alert("이미 로그인 되었습니다.");
    location.href='../login/index_login.html'; // 로그인된 페이지로 이동
    }
}

2. 응용 문제 풀기 / 연습문제 완료
세션 스토리지 로그아웃 구현하기
• Js 폴더의 login.js를 수정한다.
    세션 del 함수를 추가 구현한다
    function session_del() {//세션 삭제
        if (sessionStorage) {
            sessionStorage.removeItem("Session_Storage_test");
            alert('로그아웃 버튼 클릭 확인 : 세션 스토리지를 삭제합니다.');
        } 
        else {
            alert(＂세션 스토리지 지원 x");
        }
    }
로그아웃 페이지 열고 수정하기
    • Js 폴더의 login.js를 연동한다.
    • logout 함수를 작성하고 세션 삭제를 구현한다
    function logout(){
        session_del(); // 세션 삭제
        location.href='../index.html';
    }

