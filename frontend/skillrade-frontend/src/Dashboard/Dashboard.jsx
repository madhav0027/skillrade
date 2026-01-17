import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../authcontext/AuthContext";
import API from "../api/api";
import Card from "../Components/UI/card";

export default function Dashboard() {

    const user = localStorage?.getItem("user")

    const [skills,setskills] = useState([]);
    console.log(user);

    useEffect(() => {
        API.get('/skill/myskill')
            .then(res => 
                setskills(res.data))

        console.log(skills)

    },[])

    return(
        <div className="p-6 max-w-4xl mx-auto">
            <h1>
                Welcome, {user}
            </h1>

            <h2 className="text-2xl font-semibold mb-6">My Skills</h2>
            {
                skills.map(us => {
                    return(
                    <Card key={us._id}>
                        <h4 className="text-lg font-semibold">
                            {us.SkillId.name}
                        </h4>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-green-500 h-2 rounded-full"
                                style={{ width: `${us.progress}%` }}
                            />
                        </div>
                        <p className="text-sm mt-1">{us.progress}% completed</p>
                        <p>
                            status {us.status}
                        </p>
                    </Card>
                    )
                })
            }

        </div>
    );
}
