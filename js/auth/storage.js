/**
 * accessToken을 로컬 스토리지에 저장
 * @param {string} accessToken - 저장할 accessToken
 */
export const saveAccessToken = (accessToken) => {
    localStorage.setItem('accessToken', accessToken);
  };
  
  /**
   * 로컬 스토리지에서 accessToken을 검색하여 반환
   * @returns {string|null} - 저장된 accessToken 반환하거나, 토큰이 없는 경우 null을 반환
   */
export const getAccessToken = () => {
    return localStorage.getItem('accessToken');
  };
