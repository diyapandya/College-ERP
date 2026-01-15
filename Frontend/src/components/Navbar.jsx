
import logo from "../assets/collegeerp.png"
import { useLocation } from "react-router-dom"

export default function Navbar(){
  const { pathname } = useLocation()

  return (
    <PillNav
      logo={logo}
      activeHref={pathname}
      items={[
        { label:"Home", href:"/" },
        { label:"Student", href:"/student" },
        { label:"Faculty", href:"/faculty" },
        { label:"Parent", href:"/parent" },
        { label:"Admin", href:"/admin" }
      ]}
    />
  )
}
