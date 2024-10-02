import {createRouter,createWebHistory} from 'vue-router'
import mainPage from "@/mainPage.vue"
import  loginVue from '@/login.vue'

const routes =[
    {path:'/',component:mainPage},
    {path:'/login',component:loginVue}
]
const router =createRouter({
    history:createWebHistory(),
    routes:routes
})
export default router