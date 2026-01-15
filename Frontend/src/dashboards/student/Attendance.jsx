import { useEffect,useState } from "react"
import api from "../../api/axios"
import StudentLayout from "../../layouts/StudentLayout"

export default function Attendance(){
  const id="S101"
  const [data,setData]=useState([])

  useEffect(()=>{
    api.get(`/student/${id}/attendance`).then(r=>setData(r.data))
  },[])

  return(
    <StudentLayout>
      <h1 className="text-xl font-bold mb-4">Attendance</h1>
      {data.map(a=>(
        <div key={a._id} className="bg-white p-3 mb-2 rounded shadow">
          {a.subject} - {a.percentage}% {a.risk && "⚠️"}
        </div>
      ))}
    </StudentLayout>
  )
}
