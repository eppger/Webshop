import { useState } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export const AuthContextProvider = ({children}) => {
    const[isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem("token") === "token123");
    const navigate = useNavigate();

    function login() {
        setIsLoggedIn (true);
        sessionStorage.setItem("token", "token123");
        //päriselus backend ise genereerib
        navigate("/admin")
    }

    function logout() {
        setIsLoggedIn (false);
        sessionStorage.removeItem("token");
        navigate ("/");
    }

    return(
        <AuthContext.Provider value={{isLoggedIn, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}