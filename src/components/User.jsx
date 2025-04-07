"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";

const User = () => {
    const [userData, setUserData] = useState([]);
    const [editData, setEditData] = useState({ id: null, name: "", LastName: "", email: "" })

    useEffect(() => {
        detail();
    }, []);

    async function detail() {
        let { data: user, error } = await supabase
            .from('user')
            .select('*');

        setUserData(user || []);
    }

    async function deleteUser(id) {
        try {
            const { data, error } = await supabase
                .from("user")
                .delete()
                .eq("id", id);

            if (error) {
                console.error("Delete Error:", error);
                alert("Failed to delete user.");
            } else {
                alert("User deleted successfully!");
                setUserData(userData.filter(user => user.id !== id));
            }
        } catch (error) {
            console.error("Unexpected Error:", error);
            alert("Something went wrong while deleting.");
        }
    }

    async function updateUser() {
        try {
            const { data, error } = await supabase
                .from("user")
                .update({
                    name: editData.name,
                    email: editData.email,
                    LastName: editData.LastName
                })
                .eq("id", editData.id);

            if (error) {
                console.error("Update Error:", error);
                alert("Failed to update user.");
            } else {
                alert("User updated successfully!");
                setEditData({ id: null, name: "", LastName: "", email: "" });
                detail();
            }
        } catch (error) {
            console.error("Unexpected Error:", error);
            alert("Something went wrong while updating.");
        }
    }

    function startEdit(user) {
        setEditData({
            id: user.id,
            name: user.name || "",
            LastName: user.LastName || "",
            email: user.email || ""
        });
    }

    function cancelEdit() {
        setEditData({ id: "null", name: "", email: "", LastName: "" });
    }

    return (
        <div className="container p-5 max-w-[1240px] mx-auto">
            <ul className="flex flex-col gap-5">
                {userData.map((user, i) => (
                    <div key={i} className="grid grid-cols-5 items-center gap-5">
                        {editData.id === user.id ? (
                            <>
                                <input
                                    type="text"
                                    value={editData.name}
                                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                                    className="border p-2 rounded"
                                    placeholder="Edit Name"
                                />
                                <input
                                    type="text"
                                    value={editData.LastName}
                                    onChange={(e) => setEditData({ ...editData, LastName: e.target.value })}
                                    className="border p-2 rounded"
                                    placeholder="Edit LastName"
                                />
                                <input
                                    type="email"
                                    value={editData.email}
                                    onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                                    className="border p-2 rounded"
                                    placeholder="Edit Email"
                                />
                                <button
                                    onClick={() => updateUser(user.id)}
                                    className="py-2 px-4 bg-green-600 text-white rounded-lg cursor-pointer"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={cancelEdit}
                                    className="py-2 px-4 bg-gray-500 text-white rounded-lg cursor-pointer"
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                <li className="max-w-[150px] text-ellipsis overflow-hidden">{user.name}</li>
                                <li className="max-w-[150px] text-ellipsis overflow-hidden">{user.LastName}</li>
                                <li className="max-w-[150px] text-ellipsis overflow-hidden">{user.email}</li>
                                <button
                                    onClick={() => deleteUser(user.id)}
                                        className="py-2 px-4 bg-red-600 text-white rounded-lg cursor-pointer"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => startEdit(user)}
                                    className="py-2 px-4 bg-blue-600 text-white rounded-lg cursor-pointer"
                                >
                                    Edit
                                </button>
                            </>
                        )}
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default User;
