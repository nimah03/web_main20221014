1. 전체 실습과정 완료
• 기본 기능 동작
   이미지 반응형
    <img src="image/main1.jpg" width="1200" height="768" class="img-fluid">

   부트스트랩 테이블
   <table class="table">
   
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>John</td>
      <td>Doe</td>
      <td>@social</td>
    </tr>
  </tbody>
</table>
    js 검색창
    <script type="text/javascript" defer src="js/search.js"></script>


2. 응용 문제 풀기 / 연습문제 완료
• 추가 기능 동작
    네비게이션 바 메뉴에 하이퍼 링크 추가하기
    <li class="nav-item"> 
        <a class="nav-link" href="https://fconline.nexon.com/datacenter/dailysquad">데이터센터</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" href="https://fconline.nexon.com/pds/download">자료실</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" href="https://esports.fconline.nexon.com/FSL/Index">SPORTS</a>
    </li>
    • 네비게이션의 색상 변경하기
        <div class="container-fluid" style="background-color: blanchedalmond;">
    • 테이블에 색상 적용하기
    <table class="table-dark">...</table>
    search_button_msg
    
    document.getElementById("search_button_msg").addEventListener('click', search_message);
    function search_message(){
        alert("검색을 수행합니다!");
    }
                    
    index.html                
    <button class="btn btn-outline-success" type="submit" id=" search_button_msg">Search</button>

    같은함수 2개시
    오류가 뜨지않음
    나중에 정의된것만 실행

    let으로 실행행
    document.getElementById("search_btn").addEventListener('click', search_message);
    function search_message(){
        let message="검색을 수행합니다!";
        alert(message);
    }