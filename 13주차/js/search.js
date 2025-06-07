document.getElementById("search_btn").addEventListener('click', search_message);
function search_message(){
    let message="검색을 수행합니다!";
    alert(message);
}

function googleSearch() {
    const searchTerm = document.getElementById("search_input").value; // 검색어로 설정
    const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchTerm)}`;
    if(searchTerm.length ==0){
         alert("검색어를 입력해주세요.");
        return;
    }
    if(searchTerm.includes("sibal")){
         alert("부적절한 단어가 포함되어 있습니다.");
        return;
    }
    // 새 창에서 구글 검색을 수행
    window.open(googleSearchUrl, "_blank"); // 새로운 창에서 열기.
    return false;
}

