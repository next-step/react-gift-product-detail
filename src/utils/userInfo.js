const KEY = 'userInfo';
/**
 * 로컬스토리지에 UserInfo 저장
 */
export function setUserInfo(info) {
    localStorage.setItem(KEY, JSON.stringify(info));
}
/**
 * 저장된 UserInfo 반환 (없으면 null)
 */
export function getUserInfo() {
    const json = localStorage.getItem(KEY);
    return json ? JSON.parse(json) : null;
}
/**
 * UserInfo 삭제
 */
export function clearUserInfo() {
    localStorage.removeItem(KEY);
}
