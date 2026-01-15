import { useState,useEffect } from "react"
import api from "../../api/axios"
import StudentLayout from "../../layouts/StudentLayout"

export default function Certificates(){
  const id="S101"
  const [certs,setCerts]=useState([])
  const [form,setForm]=useState({studentId:id})

  useEffect(()=>{
    api.get(`/student/${id}/certificates`).then(r=>setCerts(r.data))
  },[])

  const submit=()=>{
    api.post("/student/certificate",form).then(()=>alert("Uploaded"))
  }

  return(
    <StudentLayout>
      <h1 className="text-xl font-bold mb-4">Certificates & Activities</h1>

      <div className="bg-white p-4 rounded shadow mb-4">
        <input placeholder="Event Type" onChange={e=>setForm({...form,eventType:e.target.value})} className="input"/>
        <input placeholder="Title" onChange={e=>setForm({...form,title:e.target.value})} className="input mt-2"/>
        <input placeholder="Year" onChange={e=>setForm({...form,year:e.target.value})} className="input mt-2"/>
        <input placeholder="Role" onChange={e=>setForm({...form,role:e.target.value})} className="input mt-2"/>
        <button onClick={submit} className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">Add</button>
      </div>

      {certs.map(c=>(
        <div key={c._id} className="bg-white p-3 mb-2 rounded shadow">
          <p className="font-semibold">{c.title}</p>
          <p>{c.eventType} - {c.year} ({c.role})</p>
        </div>
      ))}
    </StudentLayout>
  )
}
