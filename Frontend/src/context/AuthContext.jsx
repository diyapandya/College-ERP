import { createContext, useContext, useState } from "react"
import axios from "axios"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user")
    return saved ? JSON.parse(saved) : null
  })

  /* ================= LOGIN ================= */
  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData))
    setUser(userData)
  }

  /* ================= LOGOUT ================= */
  const logout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    setUser(null)
  }

  /* ================= REFRESH USER (IMPORTANT) ================= */
  const refreshUser = async () => {
    try {
      const token = localStorage.getItem("token")
      if (!token) return

      const res = await axios.get(
        "http://localhost:5000/api/auth/me",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )

      // 🔑 update auth state + localStorage
      localStorage.setItem("user", JSON.stringify(res.data))
      setUser(res.data)
    } catch (err) {
      console.error("Failed to refresh user", err)
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  )
}
