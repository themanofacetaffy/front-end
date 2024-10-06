import axios from "axios";
import {UseTokenStore} from "@/stores/token.js";

const baseURL = "/api";
const instance = axios.create({ baseURL });
instance.interceptors.request.use(
    (config)=>{
        const tokenStore = UseTokenStore()
        if(tokenStore.token){
            config.headers.Authorization = tokenStore.token
        }
        return config
    },
    error=>{
        return Promise.reject(error)
    }
)


instance.interceptors.request.use(
    result=>{
        if(result.data.base.code===200){
            return result.data
        }
        return Promise.reject(result.data)
    },
    error=>{
        return Promise.reject(error)
    }
)
export default instance