1. 전체 실습과정 완료
• 기본 기능 동작
  데이터 타입
  let number = 5;
  let str = ‘문자열 입력’; // “ “도 묶음 가능
  let prime = 1.5123;
  let is_ok = true; // 참
  let is_not = false; // 거짓
  let undefi; // 변수 이름만, 초기화 x
  let empty = null; // 비어 있음
  console.log(undefi, empty); // 여러 개 출력
  const sym1 = Symbol('test'); // 심볼 함수로 값 생성
  let symbolVar1 = sym1; // 변수 초기화
  const airline = ["비행기", 320, "airbus", ["V1", true]];
  // 다양한 데이터 배열
  // 빈 객체 생성
  const obj1 = {};
  // 속성을 추가하여 객체 생성
  const obj2 = {
  name: "John Doe",
  age: 30,
  isMale: true,
  };
  console.log(symbolVar1.toString()); // 문자열 변환 출력
  console.log(obj1, obj2, airline); // 여러 개 출력
  const users = new Map(); // 사용자 정보 Map 객체 생성
  users.set("user1", { // 사용자 정보 추가
  id: 1, password: "password123",
  });
  users.set("user2", {
  id: 2, password: "password456",
  });
  // Map 객체의 모든 사용자 정보 반복 출력
  for (const [username, user] of users) {
  console.log(`사용자 이름: ${username}`, `ID: ${user.id}`);
  console.log(`비밀번호: ${user.password}`);
  }
  // Set 객체 활용 (예), 이름만 저장할 Set 객체 생성
  const usernames = new Set();
  usernames.add("user1"); // 사용자 이름 추가
  usernames.add("user2");
  // Set 객체의 모든 사용자 이름 반복 출력
  for (const username of usernames) {
  console.log(`사용자 이름: ${username}`);
  }
 구글검색
   <form class="d-flex" role="search" onsubmit="return googleSearch();">
        <input class="form-control me-2" id="search_input" name="q" type="search" placeholder="키워드 입력" aria-label="Search">
        <button class="btn btn-outline-success" id="search_btn" type="submit">검색하기</button>
      </form>

팝업
//html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>팝업창 테스트</title>
    </head>
    <body>
        <h1>팝업창 확인</h1>
    </body>
</html>
//script
function pop_up() {
    window.open("../popup/popup.html", "팝업테스트", "width=400, height=300, top=10, left=10");
}
//index
<body style="background-color: black;" onload="pop_up();">

이미지호버
//index
onmouseover="over(this)" onmouseout="out(this)"
//script
function over(obj) {
  obj.src="image/LOGO.png";
}
function out(obj) {
  obj.src="image/LOGO_2.png";
}

2. 응용 문제 풀기 / 연습문제 완료
• 추가 기능 동작
    검색창에 문자열을 검사한다.
    if(searchTerm.length ==0){
         alert("검색어를 입력해주세요.");
        return;
    }
    if(searchTerm.includes("sibal")){
         alert("부적절한 단어가 포함되어 있습니다.");
        return;
    }
    