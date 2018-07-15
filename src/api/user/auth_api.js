// 登录模块接口
import http from '../../utils/axios-config'

/**
 * 验证登录
 * @returns {*}
 */
export function checkLogin() {
  return http.post('/api/auth/checkLogin.do', {});
}

/**
 * 登录
 * @param account 账号
 * @param password 密码
 * @returns {Promise<T> | *}
 */
export function login(account, password) {
  return http.post( '/api/auth/login.do', {
    account: account,
    password: password
  });
}

/**
 * 退出登录
 * @returns {Promise<T> | *}
 */
export function logout() {
  return http.get( '/api/auth/logout.do', {});
}


