"use client";

import { BlogHeader } from "@/components/blog-header";
import { Button } from "@/components/ui/button";
import { headers } from "next/headers";
import { useState, useEffect } from "react";

type User = {
    id: string;
    name: string;
    email: string;
};

type Blog = {
    id: string;
    title: string;
    content: string;
    published: boolean;
    createdAt: string;
};

export default function GetAllUser() {
    const [users, setUsers] = useState<User[]>([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);


    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [blogLoading, setBlogLoading] = useState(false);

    useEffect(() => {
        async function fetchUsers() {
            setLoading(true);
            setMessage("");

            const token = localStorage.getItem("token");
            if (!token) {
                setMessage(" Please sign in first");
                setLoading(false);
                return;
            }

            try {
                const res = await fetch("http://localhost:8787/api/v1/user/getAllUser", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (res.ok) {
                    const data = await res.json();
                    setUsers(data.users);
                    setMessage(` ${data.users.length} user(s) fetched successfully!`);
                } else {
                    setMessage(" Failed to fetch users");
                    setUsers([]);
                }
            } catch (error) {
                console.error(error);
                setMessage(" Network error");
            } finally {
                setLoading(false);
            }
        }

        fetchUsers();
    }, []);

    async function handleViewBlogs(user: User) {
        console.log("current choose user", user);
        setSelectedUser(user);
        setBlogLoading(true);
        setBlogs([]);

        const token = localStorage.getItem("token");

        try {
            console.log(user.id)
            const res = await fetch(
                `https://backend.blog-backend-imtiyaz.workers.dev/api/v1/blog/getByUser/${user.id}`,{ headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                }
                
            );
            if (res.ok) {
                const data = await res.json();
                setBlogs(data.blogs);
            } else {
                setBlogs([]);
            }
        } catch (err) {
            console.error(err);
            setBlogs([]);
        } finally {
            setBlogLoading(false);
        }
    }

    return (
        <div>
            <BlogHeader />
            <div className="p-6 max-w-6xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
                    All Users
                </h1>

                {loading ? (
                    <div className="flex justify-center py-10">
                        <div className="w-12 h-12 border-4 border-gray-600 border-dashed rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <>
                        {message && (
                            <p className="text-center text-sm mb-6 text-gray-700 dark:text-gray-300">
                                {/* {message} */}
                            </p>
                        )}

                        {users.length > 0 && (
                            <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-1 gap-6">
                                {users.map((user) => (
                                    <div
                                        key={user.id}
                                        className="flex justify-between border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow bg-gray-50 dark:bg-gray-800"
                                    >
                                        <div>
                                            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                                {user.name}
                                            </p>
                                            <p className="text-gray-600 dark:text-gray-400">
                                                {user.email}
                                            </p>
                                        </div>

                                        <div className="mt-4 flex gap-2">
                                            <Button
                                                className="bg-gray-600 hover:bg-gray-800 text-white"
                                                onClick={() => handleViewBlogs(user)}
                                            >
                                                View
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Blog Modal */}
            {selectedUser && (
                <div className="fixed inset-0 bg-gradient-to-r from-slate-600 to-stone-900 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-gradient-to-r from-zinc-50 to-zinc-400 dark:bg-gray-800 rounded-lg shadow-lg w-11/12 max-w-3xl p-6 relative">
                        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                            Blogs by {selectedUser.name}
                        </h2>

                        <Button
                            className="absolute top-2 right-2 bg-gray-600 hover:bg-gray-800 text-white"
                            onClick={() => setSelectedUser(null)}
                        >
                            Close
                        </Button>

                        {blogLoading ? (
                            <div className="flex justify-center py-10">
                                <div className="w-10 h-10 border-4 border-blue-600 border-dashed rounded-full animate-spin"></div>
                            </div>
                        ) : blogs.length > 0 ? (
                            <div className="space-y-4 max-h-96 overflow-y-auto">
                                {blogs.map((blog) => (
                                    <div
                                        key={blog.id}
                                        className="p-4 border rounded-lg shadow-sm bg-gray-50 dark:bg-gray-700"
                                    >
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                            {blog.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">
                                            {blog.content}
                                        </p>
                                        <p className="text-xs text-gray-400 mt-2">
                                            {new Date(blog.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-600 dark:text-gray-300">
                                No blogs found for this user.
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
