import { createContext, useContext, useState } from "react";


export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user,setuser] = useState("");
    const [isverified,setisverified] = useState(null);

    const login = (data) => {
        localStorage.setItem("token",data.token);
        localStorage.setItem("user",data.Userexist.username);
        setuser(data.Userexist.username);
        setisverified(localStorage.getItem("isverified",data.isverifed))
    }

    const logout = () => {
        localStorage.clear();
        setuser(null);
    }

    return(
        <AuthContext.Provider value={{user,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}