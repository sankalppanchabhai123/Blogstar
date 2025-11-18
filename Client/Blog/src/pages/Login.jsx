import React, { useEffect, useState } from 'react'
import { ShipWheelIcon } from "lucide-react"
import axios from 'axios'

function Login() {
    const [signinData, setsigninData] = useState({
        email: "",
        password: ""
    })
    const handelSignin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8000/user/login", signinData, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            console.log(res.data);
            alert("Login successful!");
            // Redirect or handle token
            window.location.href = "/";
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.error || "Login failed");
        }
    }

    return (
        <div className='h-screen flex items-center justify-center p-4 sm:p-6 md:p-8' data-theme="dark">
            <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100
            rounded-xl shadow-lg overflow-hidden">
                {/* signup side */}
                <div className='w-full lh:w-1/2 p-4 sm:p-8 flex flex-col'>
                    {/* Logo */}
                    <div className='mb-4 flex items-center justify-start gap-2'>
                        <ShipWheelIcon className="size-9 text-primary" />
                        <span className='text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary 
                        to-secondary tracking-wider'>
                            Blogify
                        </span>
                    </div>

                    {/* Error message if any */}
                    {/* {error && (
                        <div className='alert alert-error mb-4'>
                            <span>{error.response.data.message}</span>
                        </div>
                    )} */}
                    <div className='w-full'>
                        <form onSubmit={handelSignin}>
                            <div className='space-y-4'>
                                <div>
                                    <h2 className='text-xl font-semibold'>Login your Account</h2>
                                    <p className='text-sm opacity-70'>
                                        Join My Blogging App and start your jeourney with us!
                                    </p>
                                </div>
                                <div className='space-y-3'>
                                    <div className='font-control w-full'>
                                        <label className='lable'>
                                            <span className='lable-text'>Email</span>
                                        </label>
                                        <input type='email'
                                            placeholder="example@gmail.com"
                                            className='input input-bordered w-full'
                                            value={signinData.email}
                                            onChange={(e) => setsigninData({ ...signinData, email: e.target.value })}
                                            required />
                                        <label className='lable'>
                                            <span className='lable-text'>Password</span>
                                        </label>
                                        <input type='password'
                                            placeholder="************"
                                            className='input input-bordered w-full'
                                            value={signinData.password}
                                            onChange={(e) => setsigninData({ ...signinData, password: e.target.value })}
                                            required />
                                        <p className='text-x5 opacity-70 mt-1'>Password must be at last 6 characters long</p>
                                    </div>

                                    <button className='btn btn-primary w-full' type='submit'>
                                        Login
                                    </button>

                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                {/* image side */}
                <div className='hidden lg:flex lg:w-full lg:w-1/2 bg-primary/10 items-center justify-center'>
                    <div className='max-w-md p-8'>
                        <div className='relative aspect-square max-w-sn mx-auto'>
                            <img src='sigup.png' className='w-full h-full' />
                        </div>

                        <div className='text-center space-y-3 mt-6'>
                            <h2 className='text-xl font-semibold'>Connect with language partners worldwide</h2>
                            <p className='opacity-50'>
                                Practice conversation, make friends , and improve language skills together
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login