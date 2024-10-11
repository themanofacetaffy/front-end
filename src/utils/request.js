import axios from "axios";
import {UseTokenStore} from "@/stores/token.js";
import router from "@/router";

const baseURL = "/api";
const instance = axios.create({baseURL});
instance.interceptors.request.use(
    (req) => {
        const useToken = UseTokenStore()

        if (useToken.token !== null) {
            req.headers.set("CallSystem-Token", useToken.token)
        }
        return req
    },
    error => {
        return Promise.reject(error)
    }
)

instance.interceptors.response.use(
    result => {
        console.log("ready to return")
        if (result.data.base.code === 1000 || result.data.base.code === 1001 || result.data.base.code === 1002) {

            alert("请重新登录")
            router.push('/login').then(() => {
                console.log("路由已跳转");
            });

        }
        if (result.data.base.code === 200) {

            return result
        }

        return result
    },
    error => {

        return Promise.reject(error)
    }
)
export default instance