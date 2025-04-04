"use client"
import React, { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";

const User = () => {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        detail();
    }, []);

    async function detail() {
        let { data: user, error } = await supabase
            .from('user')
            .select('*')

        setUserData(user);
    }

    return (
        <div className="container p-5 max-w-[1240px] mx-auto">

            <ul>
                {userData.map((obj, i) => (
                    <div key={i} className="flex  gap-10">
                        <li>{obj.name}</li>
                        <li>{obj.LastName}</li>
                        <li>{obj.email}</li>
                    </div>
                ))}
            </ul>
         
        </div>
    );
};

export default User;
