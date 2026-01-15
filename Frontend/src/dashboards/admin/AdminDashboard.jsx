import AdminLayout from "../../layouts/AdminLayout"

export default function AdminDashboard(){
  return(
    <AdminLayout>
      <h1 className="text-xl font-bold">Admin Control Panel</h1>
      <p className="mt-2">Manage master data and seed users</p>
    </AdminLayout>
  )
}
