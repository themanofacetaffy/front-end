import axios from "axios";
import request from "@/utils/request.js";

export async function AddUsers(users) {
    const params = new URLSearchParams();
    for (let key in users) {
        params.append(key, users[key])
    }
    return await request.post('/class/addusers', params)
}

export async function AddUser(user) {
    const params = new URLSearchParams();
    for (let key in user) {
        params.append(key, user[key])
    }
    return await request.post('/user/register', params)
}

export async function GetUserList(class_id) {
    const params = new URLSearchParams();
    for (let key in class_id) {
        params.append(key, class_id[key])
    }
    return await request.post('/class/auth/student-list', params)
}

export async function ChangePoint(TheStudent) {
    const params = new URLSearchParams();
    for (let key in TheStudent) {
        params.append(key, TheStudent[key])
    }
    return await request.post('/class/auth/change-point', params)
}

export async function MinusPoint(TheStudent) {
    const params = new URLSearchParams();
    for (let key in TheStudent) {
        params.append(key, TheStudent[key])
    }
    return await request.post('/user/minuspoint', params)
}

export async function GetStuStatus() {//获取已签到或未签到的状态
    return await request.get('/user/status')
}

export async function Login(loginData) {
    const params = new URLSearchParams();
    for (let key in loginData) {
        params.append(key, loginData[key])
    }
    return await request.post('/user/login', params)
}

export async function ResponseCall(response) {
    const params = new URLSearchParams();
    for (let key in response) {
        params.append(key, response[key])
    }
    return await request.post('/call/auth/do-call-event', params)
}

export async function ChangePassword(changeData) {
    const params = new URLSearchParams();
    for (let key in changeData) {
        params.append(key, changeData[key])
    }
    return await request.post('/user/auth/change-password', params)
}

export async function GetVerifyCode(phoneNumber) {
    const params = new URLSearchParams();
    for (let key in phoneNumber) {
        params.append(key, phoneNumber[key])
    }
    return await request.post('/user/get-verifycode', params)
}

export async function GetPersonInfo() {

    return await request.get('/user/auth/info')
}


