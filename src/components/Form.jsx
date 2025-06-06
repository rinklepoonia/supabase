"use client";
import React, { useState } from "react";
import { supabase } from "../../utils/supabase";
const Form = () => {
    const [formData, setFormData] = useState({ name: "", LastName: "", email: "" });
    async function handleSubmit(e) {
        e.preventDefault();
        const { name, email, LastName } = formData;
        try {
            //  Check if email already exists
            const { data: existingUsers, error: selectError } = await supabase
                .from("user")
                .select("email")
                .eq("email", email);

            if (existingUsers.length > 0) {
                alert("This email is already registered. Please use a different email.");
                return;
            }


            const { error } = await supabase.from("user").insert([{ name, LastName, email }]);
            if (error) {
                console.error("Supabase Error:", error);
                alert(`Error: ${error.message}`);
                return;
            }
            setFormData({ name: "", email: "", LastName: "" });
            alert("User added successfully!");
        } catch (error) {
            console.error("Unexpected Error:", error);
            alert("Something went wrong. Check the console.");
        }
    }
 

    return (
        <div className="container mx-auto pt-9 max-w-[900px]">
            <h1 className="text-black text-4xl pb-6 font-semibold text-center">User Form</h1>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="border border-solid border-black p-3 rounded-lg w-full outline-none"
                        required
                    />
                    <input
                        type="text"
                        placeholder="LastName"
                        value={formData.LastName}
                        onChange={(e) => setFormData({ ...formData, LastName: e.target.value })}
                        className="border border-solid border-black p-3 rounded-lg w-full outline-none"
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                        }
                        className="border border-solid border-black p-3 rounded-lg w-full outline-none"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="py-2 px-4 bg-blue-600 rounded-lg text-white mt-6"
                >
                    Submit
                </button>
            </form>
            {/* <div className="pt-6">
                <button
                    onClick={() => deleteUser(3)}
                    className="py-2 px-4 bg-red-600 rounded-lg text-white"
                >
                    Delete User with ID
                </button>
            </div> */}

        </div >
    );
};
export default Form;









