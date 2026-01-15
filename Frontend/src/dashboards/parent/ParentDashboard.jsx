import { useEffect,useState } from "react"
import api from "../../api/axios"
import ParentLayout from "../../layouts/ParentLayout"

export default function ParentDashboard(){
  const studentId="S101"
  const [summary,setSummary]=useState({})

  useEffect(()=>{
    api.get(`/parent/summary/${studentId}`).then(r=>setSummary(r.data))
  },[])

  return(
    <ParentLayout>
      <h1 className="text-xl font-bold mb-4">Monthly Academic Summary</h1>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <p>Avg Attendance</p>
          <p className="text-2xl">{summary.avgAtt}%</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p>Avg Marks</p>
          <p className="text-2xl">{summary.avgMarks}</p>
        </div>
      </div>
    </ParentLayout>
  )
}
