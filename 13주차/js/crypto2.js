//Crypto2.js
async function encryptAES256_GCM(plainText, keyString) {
    const encoder = new TextEncoder();
    const keyMaterial = await window.crypto.subtle.importKey(
        "raw", encoder.encode(keyString.padEnd(32)), "AES-GCM", false, ["encrypt"]
    );
    const iv = window.crypto.getRandomValues(new Uint8Array(12)); // GCM은 12바이트 IV 사용
    const encrypted = await window.crypto.subtle.encrypt(
        { name: "AES-GCM", iv: iv },
        keyMaterial,
        encoder.encode(plainText)
    );

    const resultBuffer = new Uint8Array(iv.byteLength + encrypted.byteLength);
    resultBuffer.set(iv, 0); // IV 앞부분
    resultBuffer.set(new Uint8Array(encrypted), iv.byteLength); // 암호문 뒤에

    return btoa(String.fromCharCode(...resultBuffer)); // Base64 인코딩 반환
}

// AES-256-GCM 복호화 함수
async function decryptAES256_GCM(encryptedBase64, keyString) {
    const data = Uint8Array.from(atob(encryptedBase64), c => c.charCodeAt(0));
    const iv = data.slice(0, 12);
    const encrypted = data.slice(12);

    const encoder = new TextEncoder();
    const keyMaterial = await window.crypto.subtle.importKey(
        "raw", encoder.encode(keyString.padEnd(32)), "AES-GCM", false, ["decrypt"]
    );

    const decrypted = await window.crypto.subtle.decrypt(
        { name: "AES-GCM", iv: iv },
        keyMaterial,
        encrypted
    );

    return new TextDecoder().decode(decrypted);
}
//Session_Storage_pass2
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