import { checkAuth } from './jwt_token.js';
import { init_logined } from './crypto.js';  // 또는 crypto2.js에 있다면 그쪽에서 import

// DOMContentLoaded 이벤트 - 로그인 후 페이지에서 실행
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();       // JWT 유효성 검사
    init_logined();    // 세션 스토리지 복호화 및 사용자 표시 등
});