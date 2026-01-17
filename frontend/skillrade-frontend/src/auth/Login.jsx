import {React, useContext, useState} from "react";
import API from "../api/api";
import { AuthContext } from "../authcontext/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login () {

    const [email,setemail] = useState("");
    const [password,setpassword] = useState("")
    const {login} = useContext(AuthContext);
    const [error,seterror] = useState("");

    const navigate = useNavigate();

    const handlesubmit = async (e) => {
        e.preventDefault()
        
        try {
            const res = await API.post('/auth/login/',{
                email,password
            });
            seterror("");
            login(res.data);
            navigate('/',{replace:true})            
        } catch (error) {
            console.log(error.response)
            switch(error.response?.data?.code){
                case "EMAIL_NOT_VERIFIED":
                    navigate('/verify',{replace:true})
                    break;
                default:
                    seterror("Invalid Email or Password");
                    break;
            }
        }
        console.log(error.length)
            
    }

    return(
        <div className="min-h-screen flex items-center justify-center bg-black/15">
            <form className="bg-white p-6 rounded-xl shadow-lg w-80" onSubmit={handlesubmit}>
                {error.length > 0 ? <h2 className="text-md text-center text-red-600 transition ">{error}</h2> : ''}
                <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
                <input
                    className="w-full mb-3 p-2 border-2 border-blue-500 rounded"
                    type="email"
                    placeholder="Enter email" 
                    onChange={e => {setemail(e.target.value)}} />
                <input 
                    className="w-full mb-3 p-2 border-2 border-blue-500 rounded"
                    placeholder="Password" 
                    type="password" 
                    onChange={e => (setpassword(e.target.value))}/>
                <button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition cursor-pointer">
                    Login
                </button>
            </form>
        </div>
    )
}
