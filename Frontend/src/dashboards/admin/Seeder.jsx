import { useState } from "react"
import api from "../../api/axios"
import AdminLayout from "../../layouts/AdminLayout"

export default function Seeder(){
  const [json,setJson]=useState("")

  const seed=()=>{
    try{
      const data = JSON.parse(json)
      api.post("/admin/seed/students",data).then(()=>alert("Students Seeded"))
    }catch{
      alert("Invalid JSON")
    }
  }

  return(
    <AdminLayout>
      <h1 className="text-xl font-bold mb-4">Seed Student Data</h1>
      <textarea placeholder='Paste JSON array of students...' className="input h-60" onChange={e=>setJson(e.target.value)}/>
      <button onClick={seed} className="mt-3 bg-slate-700 text-white px-4 py-2 rounded">Seed</button>
    </AdminLayout>
  )
}
