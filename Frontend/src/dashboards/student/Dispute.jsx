import { useState,useEffect } from "react"
import api from "../../api/axios"
import StudentLayout from "../../layouts/StudentLayout"

export default function Dispute(){
  const id="S101"
  const [list,setList]=useState([])
  const [form,setForm]=useState({studentId:id})

  useEffect(()=>{
    api.get(`/dispute/student/${id}`).then(r=>setList(r.data))
  },[])

  const raise=()=>{
    api.post("/dispute/raise",form).then(()=>alert("Dispute Raised"))
  }

  return(
    <StudentLayout>
      <h1 className="text-xl font-bold mb-4">Raise Marks / Attendance Query</h1>

      <div className="bg-white p-4 rounded shadow mb-4">
        <input placeholder="Subject" className="input" onChange={e=>setForm({...form,subject:e.target.value})}/>
        <textarea placeholder="Explain issue..." className="input mt-2" onChange={e=>setForm({...form,issue:e.target.value})}/>
        <button onClick={raise} className="mt-2 bg-red-600 text-white px-4 py-2 rounded">Raise Query</button>
      </div>

      {list.map(d=>(
        <div key={d._id} className="bg-white p-3 mb-2 rounded shadow">
          <p><b>{d.subject}</b> - {d.status}</p>
          <p>{d.issue}</p>
          {d.remarks && <p className="text-green-600">Faculty: {d.remarks}</p>}
        </div>
      ))}
    </StudentLayout>
  )
}
