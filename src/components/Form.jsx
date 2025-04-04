"use client";
import React, { useState } from "react";
import { supabase } from "../../utils/supabase";
const Form = () => {
    const [formData, setFormData] = useState({ name: "", LastName: "", email: "" });
    async function handleSubmit(e) {
        e.preventDefault();
        const { name, email, LastName } = formData;
        // if (!name || !email || !LastName) {
        //     alert("Please Fill Input");
        //     return;
        // }
        try {
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
                <div className="flex gap-4">
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
                    className="py-2 px-4 bg-green-600 rounded-lg text-white mt-6"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};
export default Form;









