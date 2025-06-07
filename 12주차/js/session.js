import { encrypt_text, decrypt_text } from './crypto.js';


export function session_set() { //세션 저장
    let session_id = document.querySelector("#typeEmailX");
    let session_pass = document.querySelector("#typePasswordX"); // DOM 트리에서 pass 검색

    if (sessionStorage) {
        let en_text = encrypt_text(session_pass.value);
        sessionStorage.setItem("Session_Storage_id", session_id.value);
        sessionStorage.setItem("Session_Storage_pass", en_text);
    } 
    else {
        alert("로컬 스토리지 지원 x");
    }
}

export function session_get() { //세션 읽기
    if (sessionStorage) {
        return sessionStorage.getItem("Session_Storage_pass");
    } else {
        alert("세션 스토리지 지원 x");
    }
}

export function session_check() { //세션 검사
    if (sessionStorage.getItem("Session_Storage_id")) {
    alert("이미 로그인 되었습니다.");
    location.href='../login/index_login.html'; // 로그인된 페이지로 이동
    }
}

async function storeEncryptedSession(password) {
     const key = "client_secret_key"; // 32바이트로 padEnd 처리됨
    const encoder = new TextEncoder();

    // 키 생성
    const keyMaterial = await window.crypto.subtle.importKey(
        "raw", encoder.encode(key.padEnd(32)), "AES-GCM", false, ["encrypt", "decrypt"]
    );

    // 랜덤 IV 생성
    const iv = window.crypto.getRandomValues(new Uint8Array(12));

    // 암호화
    const encryptedBuffer = await window.crypto.subtle.encrypt(
        { name: "AES-GCM", iv: iv },
        keyMaterial,
        encoder.encode(password)
    );

    // IV + 암호문 합치기
    const resultBuffer = new Uint8Array(iv.byteLength + encryptedBuffer.byteLength);
    resultBuffer.set(iv, 0);
    resultBuffer.set(new Uint8Array(encryptedBuffer), iv.byteLength);

    const encryptedBase64 = btoa(String.fromCharCode(...resultBuffer));

    // 세션에 저장
    sessionStorage.setItem("Session_Storage_pass2", encryptedBase64);

    // 복호화 테스트
    const encryptedData = Uint8Array.from(atob(encryptedBase64), c => c.charCodeAt(0));
    const iv_dec = encryptedData.slice(0, 12);
    const ciphertext = encryptedData.slice(12);

    const decryptedBuffer = await window.crypto.subtle.decrypt(
        { name: "AES-GCM", iv: iv_dec },
        keyMaterial,
        ciphertext
    );
    const decrypted = new TextDecoder().decode(decryptedBuffer);

    console.log("복호화된 비밀번호:", decrypted);
}