import { useState,useEffect } from "react"
import api from "../../api/axios"
import StudentLayout from "../../layouts/StudentLayout"

export default function Messages(){
  const id="S101"
  const [list,setList]=useState([])
  const [form,setForm]=useState({fromId:id})

  useEffect(()=>{
    api.get(`/messages/conversation/${id}`).then(r=>setList(r.data))
  },[])

  const send=()=>{
    api.post("/messages/send",form).then(()=>alert("Sent"))
  }

  return(
    <StudentLayout>
      <h1 className="text-xl font-bold mb-4">Messages</h1>

      <div className="bg-white p-4 rounded shadow mb-4">
        <input placeholder="To (Faculty / Parent ID)" className="input" onChange={e=>setForm({...form,toId:e.target.value})}/>
        <textarea placeholder="Message" className="input mt-2" onChange={e=>setForm({...form,message:e.target.value})}/>
        <button onClick={send} className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">Send</button>
      </div>

      {list.map(m=>(
        <div key={m._id} className="bg-white p-3 mb-2 rounded shadow">
          <p className="text-sm text-gray-500">{m.fromId} → {m.toId}</p>
          <p>{m.message}</p>
        </div>
      ))}
    </StudentLayout>
  )
}
