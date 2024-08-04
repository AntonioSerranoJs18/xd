'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:5156/api/Login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                UserNameOrEmail: email,
                Password: password,
            }),
        });

        if (response.ok) {
            const data = await response.json();
            Cookies.set('token', data.token);  
            router.push('/doctorDashboard');  
        } else {
            console.error('Login failed');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="grid w-full min-h-screen lg:grid-cols-2">
            <div className="flex items-center justify-center p-6 lg:p-10 bg-custom-dark">
                <div className="mx-auto w-full max-w-[500px] space-y-8">
                    <div className="space-y-4 text-center">
                        <h1 className="text-3xl font-bold text-white">✨Welcome back✨</h1>
                        <p className="text-white">Enter your credentials to access your account</p>
                    </div>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium text-white">
                                Email
                            </label>
                            <div className="relative">
                                <input
                                    id="email"
                                    placeholder="m@example.com"
                                    required
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full rounded-md bg-custom-input text-white border-gray-300 text-base py-2 px-10"
                                />
                                <FiMail className="absolute top-1/2 left-3 transform -translate-y-1/2 text-custom-icon" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium text-white">
                                    Password
                                </label>
                                <a href="#" className="text-sm text-white underline">
                                    Forgot password?
                                </a>
                            </div>
                            <div className="relative">
                                <input
                                    id="password"
                                    placeholder="********"
                                    required
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full rounded-md bg-custom-input text-white border-gray-300 py-2 px-10 custom-password-input"
                                />
                                <FiLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-custom-icon" />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-custom-icon focus:outline-none"
                                >
                                    {showPassword ? <FiEyeOff className="text-white" /> : <FiEye className="text-white" />}
                                </button>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full rounded-md bg-custom-button py-2 px-4 text-base font-medium text-white shadow-sm"
                        >
                            Sign in
                        </button>
                    </form>
                    <p className="text-center text-sm text-white">
                        Don't have an account?{" "}
                        <Link href="/register" className="underline">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
            <div className="hidden lg:flex items-center justify-center bg-gray-50">
                <img
                    src="/img/A.jpg"
                    alt="Office"
                    className="w-full h-full object-cover shadow-lg"
                />
            </div>
        </div>
    );
};

export default Login;
