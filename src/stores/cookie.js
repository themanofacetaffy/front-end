// 引入js-cookie
import Cookies from 'js-cookie';
import {UseTokenStore} from "@/stores/token.js";

const useTokenStore = UseTokenStore()

// 存储第一个账号的token
export const saveTokenForAccount1 = () => {
    const token1 = 'user1_token_value';
    Cookies.set('token_account1', useTokenStore.token, {path: '/mainPage', expires: 1}); // 设置cookie，有效期为7天
}

// 存储第二个账号的token
export const saveTokenForAccount2 = () => {
    const token2 = 'user2_token_value';
    Cookies.set('token_account2', useTokenStore.token, {path: '/MainPage_s', expires: 1}); // 设置cookie，有效期为7天
}

// 获取第一个账号的token
export const getTokenForAccount1 = () => {
    return Cookies.get('token_account1');
}

// 获取第二个账号的token
export const getTokenForAccount2 = () => {
    return Cookies.get('token_account2');
}