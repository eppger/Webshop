import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { Navigate, Outlet } from "react-router-dom";

function RequireAuth() {
    const {isLoggedIn} = useContext(AuthContext);

    if (isLoggedIn === false) {
        return <Navigate to="/login" />
    }

    return (
    < Outlet/>
  )
}

export default RequireAuth