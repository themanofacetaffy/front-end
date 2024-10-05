import axios from "axios";
export async function AddUser(user) {
    return await axios.post("/api/user/register",user)
        .then(res=>{
        return console.log("注册成功")
    }).catch(err=>{
        return console.log(err)
        })
}
export async function GetUser() {
    return await axios.get("/api/class/auth/student-list")
        .then(res=>{
        return res.data
    }).catch(err=>{
        return console.log(err)
        })
}
export async function AddPoint() {
    return await axios.get("/api/class/auth/student-list")
        .then(res=>{
        return console.log("加分成功")
    }).catch(err=>{
        return console.log(err)
        })
}
export async function MinusPoint() {
    return await axios.get("/api/class/auth/student-list")
        .then(res=>{
        return console.log("减分成功")
    }).catch(err=>{
        return console.log(err)
        })
}
export async function GetStuStatus() {
    return await axios.get("/api/class/auth/student-list")
        .then(res=>{
        return res.data
    }).catch(err=>{
        return console.log(err)
        })
}
