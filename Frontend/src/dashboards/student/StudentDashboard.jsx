import { useEffect,useState } from "react"
import api from "../../api/axios"
import StudentLayout from "../../layouts/StudentLayout"

export default function StudentDashboard(){
  const id="S101" // temp static

  const [health,setHealth]=useState({})
  const [elig,setElig]=useState({})

  useEffect(()=>{
    api.get(`/system/evaluate/health/${id}`).then(r=>setHealth(r.data))
    api.get(`/system/evaluate/eligibility/${id}`).then(r=>setElig(r.data))
  },[])

  return(
    <StudentLayout>
      <h1 className="text-xl font-bold mb-4">Academic Overview</h1>

      <div className="grid grid-cols-4 gap-4">

        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-500">Health Score</p>
          <p className="text-2xl">{health.score}</p>
          <p>{health.color}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-500">Eligibility</p>
          <p className="text-xl">{elig.status}</p>
        </div>

      </div>
    </StudentLayout>
  )
}
