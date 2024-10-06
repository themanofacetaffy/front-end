import {defineStore} from "pinia";
import {ref} from 'vue'
export const UseTokenStore = defineStore("token",()=>{
    const token = ref("")

    const setToken = (new_token)=>{
        token.value=new_token
    }

    const removeToken = ()=>{
        token.value=""
    }
    return {token,setToken,removeToken}
})