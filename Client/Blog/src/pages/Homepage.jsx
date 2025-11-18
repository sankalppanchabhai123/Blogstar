import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { axiosInstance } from '../axios/url';

const Homepage = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axiosInstance.get("/blogs", {
                    withCredentials: true,
                    retry: false,
                });
                console.log("Blogs response:", response.data);
                console.log("First blog:", response.data.blogs[0]);
                setBlogs(response.data.blogs);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    if (loading) {
        return (
            <>
                {/* <Head />
                <Navbar /> */}
                <div className="container mx-auto mt-8 px-4">
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            {/* <Head /> */}
            <title>Blogging App</title>
            {/* <Navbar /> */}
            <div className="container mx-auto mt-8 px-4">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Latest Blogs</h1>

                {blogs.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No blogs found.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {blogs.map(blog => (
                            <div
                                key={blog._id}
                                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                            >
                                <div className="relative bg-gray-200">
                                    {blog.coverImageURL ? (
                                        <img
                                            src={`http://localhost:8000${blog.coverImageURL}`}
                                            className="w-full h-78 object-cover"
                                            alt={blog.title}
                                            onError={(e) => {
                                                e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="288" height="192"%3E%3Crect fill="%23ccc" width="288" height="192"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23666" font-family="sans-serif" font-size="14"%3ENo Image%3C/text%3E%3C/svg%3E';
                                            }}
                                        />
                                    ) : (
                                        <div className="w-full h-48 flex items-center justify-center bg-gray-300 text-gray-600">
                                            No Image Available
                                        </div>
                                    )}

                                    <div className="absolute top-0 left-0 bg-amber-600 text-white px-3 py-1 text-sm font-medium">
                                        Blog
                                    </div>
                                </div>

                                <div className="p-5">
                                    <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 leading-tight">
                                        {blog.title}
                                    </h3>

                                    <div className="flex justify-between items-center mt-4">
                                        {/* <Link
                                            to={`/blog/${blog._id}`}
                                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center"
                                        >
                                            Read More
                                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </Link> */}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {/* <Script /> */}
        </>
    );
};

export default Homepage;