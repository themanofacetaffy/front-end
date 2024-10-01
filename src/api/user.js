import axios from "axios";
export async function AddUser(user) {
    return await axios.post("/api/user/register",user)
        .then(res=>{
        return console.log("注册成功")
    }).catch(err=>{
        return console.log(err)
        })
}