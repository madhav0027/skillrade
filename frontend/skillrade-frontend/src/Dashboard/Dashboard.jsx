import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../authcontext/AuthContext";
import API from "../api/api";
import {FaArrowRight, FaPrint} from "react-icons/fa"
import { replace, useNavigate } from "react-router-dom";

export default function Dashboard() {

    const [user,setuser] = useState({});
    const token = localStorage.getItem("token");

    const [skills,setskills] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if(token){

            API.get('/skill/myskill')
            .then(res => 
                setskills(res.data))
                
                API.get('/user',{
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem("token")}` 
                    }
                }).then(res => setuser(res.data))
        }

    },[])


    const renderContent = (text) => {
        return text?.split(",").map((line,i) =>{
            return <h4 key={i} className="text-lg mb-4 font-small">{line}</h4>
            
        })
    }

    const handlequizskill = (skillname,skillid) => {
        navigate('/quiz',{
            state:{
                skillid:skillid,
                skillname:skillname
            }
        })
    }

    return(
        <div className="min-h-screen bg-gray-100 py-10">
        {/* Print Button */}
        <div className="fixed top-20 right-6 print:hidden">
            <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-blue-400 text-white rounded shadow hover:bg-blue-700"
            >
            <FaPrint color="black"/>
            </button>
        </div>

        {/* Resume Container */}
        <div className="bg-white max-w-3xl mx-auto p-10 shadow-lg rounded-lg">

        {/* Header */}
        <header className="mb-8 border-b pb-4 flex justify-between items-center">
        
        <div>
            <h1 className="text-3xl font-bold">
            {user.username?.length > 0 ? `Welcome, ${user.username}` : "Welcome"}
            </h1>

            <p className="text-gray-500 mt-1">
            {skills.length > 0
                ? "Skills Overview"
                : "Start building your skill profile"}
            </p>
            <p className="font-semibold">
                {
                    user.credits > 0 ? 
                    `Credits : ${user.credits}`:``
                }
            </p>
        </div>

        {/* Profile Photo */}
        <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gray-300">
            <img
            src={`${user.profilepic?.length > 0 ? user.profilepic : 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ffreesvg.org%2Fstorage%2Fimg%2Fthumb%2Fabstract-user-flat-3.png&f=1&nofb=1&ipt=2f3135430972f8005d82794b55b8a8d90dcf175db12f543fba391c27fd15e4d7'}`}
            alt="Profile"
            className="w-full h-full object-cover"
            />
        </div>

        </header>

            {/* Skills Section */}
            <section>
            <h2 className="text-xl font-semibold mb-6 uppercase tracking-wide">
                Skills
            </h2>

            {skills.length === 0 ? (
                /* Empty State */
                <div className="text-center py-16">
                <p className="text-lg font-medium text-gray-700">
                    No skills added yet
                </p>
                <p className="text-gray-500 mt-2">
                    Upgrade your skills now and track your progress 🚀
                </p>

                <button onClick={e => navigate('/login',{replace:true})} className="mt-6 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                    Start Now..
                </button>
                </div>
            ) : (
                /* Skills List */
                <div className="space-y-6">
                {skills.map(us => (
                    <div key={us._id}>
                    <div className="flex justify-between items-center mb-1">
                        <h4 className="text-lg font-medium">
                        {us.SkillId.name}
                        </h4>

                        <div className="flex items-center gap-2 text-sm text-gray-600 capitalize">
                        <span>{us.status}</span>
                        <button
                            onClick={() =>
                                navigate("/quiz", {
                                state: {
                                    skillId: us.SkillId._id,
                                    skillName: us.SkillId.name,
                                },
                                })
                            } 
                         className="bg-black p-1 rounded-full cursor-pointer">
                            <FaArrowRight color="white" />
                        </button>
                        </div>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${us.progress}%` }}
                        />
                    </div>

                    <p className="text-sm text-gray-500 mt-1">
                        {us.progress}% proficiency
                    </p>
                    </div>
                    
                ))}
                <button onClick={e => navigate('/skills')} className="print:hidden mt-6 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                    Add More Skills..
                </button>                
                </div>
            )}
            </section>
            {/* Qualification Section */}
            <section>
            <h2 className="text-xl mt-6 font-semibold mb-6 uppercase tracking-wide">
                Qualification
            </h2>

            {user.qualification?.length === 0 ? (
                /* Empty State */
                <div className="text-center py-16">
                <p className="text-lg font-medium text-gray-700">
                    No Qualifications are added
                </p>
                </div>
            ) : (
                /* Qaulification List */
                <div className="space-y-6">
                    <div className=" justify-between items-center ">
                        {renderContent(user.qualification)}
                    </div>
                </div>
            )}
                <button onClick={() => user.username?.length > 0 ? navigate('/settings'): navigate('/login')} className="print:hidden mt-6 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                    Add Qualification
                </button>                            
            </section>
        </div>
        </div>

    );
}
