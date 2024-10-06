import axios from "axios";
import request from "@/utils/request.js";
export async function AddUser(users) {
    const params = new URLSearchParams();
    for(let key in users){
        params.append(key,users[key])
    }
    return await request.post('/class/addusers',user)
}
export async function AddUsers(users) {
    return await request.post('/class/adduser',user)
}
export async function GetUserList() {
    return await request.get('/class/auth/student-list')
}
export async function AddPoint() {
    return await request.get('/user/addpoint')
}
export async function MinusPoint() {
    return await request.get('/user/minuspoint')
}
export async function GetStuStatus() {//获取已签到或未签到的状态
    return await request.get('/user/status')
}
export async function Login(loginData) {
    const params = new URLSearchParams();
    for(let key in loginData){
        params.append(key,loginData[key])
    }
    return await request.post('/user/login',params)
}
