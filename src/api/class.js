import axios from "axios";

export  async function CallTheRoll(class_id) {
    return await axios.post("/api/call/auth/call-all-student", class_id)
        .then(res=>{
            return res.data
        }).catch(err=>{
            return console.log(err)
        })
}
export  async function undo_call_events(class_id) {
    return await axios.post("/api/call/auth/undo-call-events", class_id)
        .then(res=>{
            return res.data
        }).catch(err=>{
            return console.log(err)
        })
}
export  async function random_call(random_call_data) {
    return await axios.post("/api/call/auth/undo-call-events", random_call_data)
        .then(res=>{
            return res.data
        }).catch(err=>{
            return console.log(err)
        })
}


