import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../authcontext/AuthContext";
import { replace, useNavigate } from "react-router-dom";
import API from "../api/api";

export default function Navbar () {


    const {logout } = useContext(AuthContext);
    const navigate = useNavigate();
    
    
    const [isopen,setisopen] = useState(false);

    const [user,setuser] = useState({});
    const token = localStorage?.getItem("token");

    const id = localStorage?.getItem("id")

    const handlelogut = (e) => {
        e.preventDefault()
        logout();   
        navigate('/',{replace:true});
        window.location.reload();
    }
    useEffect(() => {
        if(token){
                API.get('/user',{
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem("token")}` 
                    }
                }).then(res => setuser(res.data))
        }
        
    },[id])

    return(
        <nav className="bg-black/95 fixed w-full z-20 top-0 start-0 border-b border-default print:hidden">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="/" className="flex cursor-pointer items-center space-x-3 rtl:space-x-reverse">
                <span className="self-center dark:text-white text-xl text-heading font-semibold whitespace-nowrap">Skill
                    <span className="text-blue-600">rade</span>
                </span>
            </a>
            <div className="flex items-center  md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                {user.username?.length > 0
                ?
                <button onClick={() => setisopen(!isopen)} type="button" className="flex text-sm bg-neutral-primary cursor-pointer rounded-full md:me-0 focus:ring-4 focus:ring-neutral-tertiary">
                    <span className="sr-only">Open user menu</span>
                    <img className="w-9 h-9 rounded-full" src={`${user.profilepic}`} alt="user photo" />
                </button>:""
                }
                {user.username?.length > 0
                ?
                    ""
                :<div>
                  <button onClick={e => navigate('/register',{replace:true})} className="bg-blue-500 ml-4 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">Signup</button>
                  <button onClick={e => navigate('/login',{replace:true})} className="bg-blue-500 ml-4 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">Login</button>
                  </div>}
                {
                  isopen && (
                    <div className="z-50 absolute top-16 right-10 mt-2 bg-gray-800 border border-default-medium rounded-base shadow-lg w-44">
                        <div className="px-4 py-3 text-sm border-b border-default text-white">
                        <span className="block text-heading font-medium">{user.username}</span>
                        <span className="block text-body truncate">{user.email?.length > 0 ? user.email:""}</span>
                        </div>
                        <ul className="p-2 text-sm text-body font-medium">
                        <li>
                            <a href="/" className="block p-2 text-white hover:bg-neutral-tertiary-medium rounded">Dashboard</a>
                        </li>
                        <li>
                            <a href={"/settings"} className="block p-2 text-white hover:bg-neutral-tertiary-medium rounded">Settings</a>
                        </li>
                        <li>
                            <button onClick={handlelogut} className=" hover:bg-red-600 text-white px-2 cursor-pointer py-2 rounded-lg">Logout</button>
                        </li>
                        </ul>
                    </div>
                    )

                }
                <button data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary" aria-controls="navbar-user" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="white" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h14"/></svg>
                </button>
            </div>
            <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
                <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-default rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">
                <li>
                    <a href="/" className="block py-2 px-3 text-white bg-brand rounded md:bg-transparent md:text-fg-brand md:p-0" aria-current="page">Dashboard</a>
                </li>
                <li>
                    <a href="/learn" className="block py-2 px-3 text-white/85 hover:text-white text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent">Learn</a>
                </li>
                <li>
                    <a href="/skills" className="block py-2 px-3 text-white/85 hover:text-white text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent">Skills</a>
                </li>
                <li>
                    <a href="/community" className="block py-2 px-3 text-white/85 hover:text-white text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent">Community</a>
                </li>
                <li>
                    <a href="/about" className="block py-2 px-3 text-white/85 hover:text-white text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent">About</a>
                </li>
                </ul>
            </div>
            </div>
        </nav>
    )
}