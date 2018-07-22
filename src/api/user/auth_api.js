// 登录模块接口
import http from '../../utils/axios-config'

const AUTH_SERVER_PRE = '/api/auth'

/**
 * 验证登录
 */
export function checkLogin() {
  return http.post(AUTH_SERVER_PRE + http.config.ANNO_PATH + 'checkLogin.do', {});
}

/**
 * 登录
 * @param account 账号
 * @param password 密码
 */
export function login(account, password) {
  return http.post(AUTH_SERVER_PRE + http.config.ANNO_PATH + 'login.do', {
    account: account,
    password: password,
    type: 'name'
  });
}

/**
 * 退出登录
 */
export function logout() {
  return http.get(AUTH_SERVER_PRE + http.config.ANNO_PATH + 'logout.do', {});
}


