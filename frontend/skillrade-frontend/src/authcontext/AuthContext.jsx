import { createContext, useContext, useState } from "react";


export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user,setuser] = useState(localStorage.getItem("user"));
    const [isverified,setisverified] = useState(null);

    const login = async (data) => {
        localStorage.setItem("token",data.token);
        localStorage.setItem("user",data.Userexist.username);
        localStorage.setItem("id",data.Userexist.id)
        localStorage.setItem("credits",data.Userexist.credits);
        localStorage.setItem("profilepic",data.Userexist.profilepic)
        setuser(data.Userexist.username);
        cookieStore.set("username",data.Userexist.username)
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