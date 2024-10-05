import {createRouter,createWebHistory} from 'vue-router'
import mainPage from "@/mainPage.vue"
import  loginVue from '@/login.vue'
import ManageClass from "@/manageClass.vue";
import Layout from "@/layout.vue";
import MainPage_s from "@/mainPage_s.vue";
import Layout_s from "@/layout_s.vue";
const routes =[
    {path:'/tea',component:Layout,redirect:'/mainPage',children:[
        {path:'/mainPage',component:mainPage},
        {path:'/manage',component:ManageClass}
        ]},
    {path:'/stu',component:Layout_s,redirect:'/MainPage_s',children: [
        {path:'/MainPage_s',component:MainPage_s}
        ]},
    {path:'/login',component:loginVue},
]
const router =createRouter({
    history:createWebHistory(),
    routes:routes
})
export default router