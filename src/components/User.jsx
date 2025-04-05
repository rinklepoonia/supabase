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
    async function deleteUser(id) {
        try {
            const { data, error } = await supabase
                .from("user")
                .delete()
                .eq("id", id)
            if (!data) {
                alert("User deleted successfully!");
                setUserData(userData.filter(user => user.id !== id));
            }
        } catch (error) {
            console.error("Unexpected Error:", error);
            alert("Something went wrong while deleting.");
        }
    }


    return (
        <div className="container p-5 max-w-[1240px] mx-auto">
            <ul className="flex flex-col gap-3">
                {userData.map((obj, i) => (
                    <div key={i} className="grid grid-cols-4 gap-10">
                        <li className="max-w-[150px] text-ellipsis overflow-hidden">{obj.name}</li>
                        <li className="max-w-[150px] text-ellipsis overflow-hidden">{obj.LastName}</li>
                        <li className="max-w-[150px] text-ellipsis overflow-hidden">{obj.email}</li>
                        <button onClick={() => deleteUser(obj.id)}
                            className="py-2 px-4 bg-red-600 rounded-lg text-white"
                        >
                            Delete User with {obj.id}
                        </button>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default User;
