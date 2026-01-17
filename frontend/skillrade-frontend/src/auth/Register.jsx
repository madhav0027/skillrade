import {React, useContext, useState} from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Register () {

    const [username,setusername] = useState("");
    const [email,setemail] = useState("");
    const [password,setpassword] = useState("")

    const navigate = useNavigate();

    const handlesubmit = async (e) => {
        e.preventDefault()
        const res = await API.post('/auth/register/',{
            username,
            email,password
        });
        console.log(res.status)

        if(res.status === 200)
            navigate('/verifyemail',{replace:true})            
    }

    return(
        <div className="min-h-screen flex items-center justify-center bg-black/15">
            <form className="bg-white p-6 rounded-xl shadow-lg w-100" onSubmit={handlesubmit}>
                <h2 className="text-2xl font-semibold mb-4 text-center">Create your account now</h2>
                <input
                    className="w-full mb-3 p-2 border-2 border-blue-500 rounded"
                    type="text"
                    placeholder="Enter Username" 
                    onChange={e => {setusername(e.target.value)}} />                
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
                <input 
                    className="w-full mb-3 p-2 border-2 border-blue-500 rounded"
                    placeholder="Verify Password" 
                    type="password" 
                    onChange={e => ((e.target.value === password) ? true : false)}/>    
                <button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition cursor-pointer">
                    Register
                </button>
            </form>
        </div>
    )
}
