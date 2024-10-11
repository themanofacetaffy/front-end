import axios from "axios";
import request from "@/utils/request.js";

export async function CallTheRoll(classInfo) {
    const params = new URLSearchParams();
    for (let key in classInfo) {
        params.append(key, classInfo[key])
    }
    console.log("classInfo:", classInfo)
    return await request.post('/call/auth/call-all-student', params)
}


export async function random_call(random_call_data) {
    const params = new URLSearchParams();
    for (let key in random_call_data) {
        params.append(key, random_call_data[key])
    }
    return await request.post('/call/auth/random-call', params)
}

export async function undo_call_event() {

    return await request.get('/call/auth/undo-call-events')
}



