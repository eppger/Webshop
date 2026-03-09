import { useState } from "react";
import { AuthContext } from "./AuthContext";

export const AuthContextProvider = ({children}) => {
    const[isLoggedIn, setIsLoggedIn] = useState(false);

    function login() {
        setIsLoggedIn (true);
    }

    function logout() {
        setIsLoggedIn (false);
    }

    return(
        <AuthContext.Provider value={{isLoggedIn, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}