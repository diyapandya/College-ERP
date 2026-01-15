import { useEffect,useState } from "react"
import api from "../../api/axios"
import StudentLayout from "../../layouts/StudentLayout"

export default function Marks(){
  const id="S101"
  const [data,setData]=useState([])

  useEffect(()=>{
    api.get(`/student/${id}/marks`).then(r=>setData(r.data))
  },[])

  return(
    <StudentLayout>
      <h1 className="text-xl font-bold mb-4">Internal Marks</h1>
      {data.map(m=>(
        <div key={m._id} className="bg-white p-4 rounded shadow mb-2">
          <p className="font-semibold">{m.subject}</p>
          <p>I1: {m.internal1} | I2: {m.internal2} | Assignment: {m.assignment}</p>
          <p className="font-bold">Total: {m.total}</p>
        </div>
      ))}
    </StudentLayout>
  )
}
