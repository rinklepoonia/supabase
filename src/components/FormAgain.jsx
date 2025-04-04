"use client"
import React, { useState } from 'react'
import { supabase } from '../../utils/supabase'

const FormAgain = () => {
    const [formData, setFormData] = useState({ name: "", LastName: "", email: "" })
    async function handleSubmit(e) {
        e.preventDefault();
        const { name, LastName, email } = formData
        if (!name || !email || !LastName) {
            alert("Please Fill Input");
            return;
        }
        try {
            const { error } = await supabase.from("user").insert([{ name, LastName, email }])
            if (error) {
                console.error("Supabase Error:", error);
                alert(`Error: ${error.message}`);
                return;
            }
            setFormData({ name: "", LastName: "", email: "" })
            alert("User added successfully!");
        } catch (error) {
            alert("Something went wrong. Check the console.");
        }
    }
    return (
        <div>
            <form onClick={handleSubmit} className='flex flex-col gap-5 max-w-[900px] mx-auto'>
                <input required type='text' value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder='FirstName' className='border border-solid border-black px-2 py-3 outline-none rounded' />
                <input required type='text' value={formData.LastName} onChange={(e) => setFormData({ ...formData, LastName: e.target.value })} placeholder='LastName' className='border border-solid border-black px-2 py-3 outline-none rounded' />
                <input required type='email' value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder='Email' className='border border-solid border-black px-2 py-3 outline-none rounded' />
                <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded'>Submit</button>
            </form>
        </div>
    )
}

export default FormAgain