"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";

const Delete = () => {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        detail();
    }, []);

    async function detail() {
        let { data: Profile, error } = await supabase
            .from("Profile")
            .select("*");

        setUserData(Profile);
    }

    // Function to call the drop_table SQL function
    const dropTable = async (tableName) => {
        const { data, error } = await supabase.rpc("drop_table", {
            table_name: tableName,
        });

        if (error) {
            console.error("Error while dropping table:", error);
            alert(`Failed to drop table: ${error.message}`);
        } else {
            alert(`Table ${tableName} dropped successfully!`);
        }
    };

    return (
        <div className="container p-5 max-w-[1240px] mx-auto">
            <ul className="flex flex-col gap-3">
                {userData.map((obj, i) => (
                    <div key={i} className="grid grid-cols-4 gap-10">
                        <li className="max-w-[150px] text-ellipsis overflow-hidden">
                            {obj.Name}
                        </li>
                        <li className="max-w-[150px] text-ellipsis overflow-hidden">
                            {obj.LastName}
                        </li>
                    </div>
                ))}
            </ul>

         
            <div className="mt-5">
                <button
                    onClick={() => dropTable("Profile")}
                    className="py-2 px-4 bg-red-600 rounded-lg text-white"
                >
                    Drop Profile Table
                </button>
            </div>
        </div>
    );
};

export default Delete;
