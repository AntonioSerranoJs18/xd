'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff } from 'react-icons/fi';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const router = useRouter();

    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
    
        try {
            const response = await fetch('http://localhost:5156/api/UserAccount/Patient', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    UserName: username,
                    Password: password,
                    Email: email,
                }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to register');
            }
    
            setSuccess('Registration successful!');
            setError('');
    
            setTimeout(() => {
                router.push('/login'); 
            }, 1000); 
        } catch (error) {
            setError(error.message);
            setSuccess('');
        }
    };

    return (
        <div className="grid w-full min-h-screen lg:grid-cols-2">
            <div className="flex items-center justify-center p-6 lg:p-10 bg-custom-dark">
                <div className="mx-auto w-full max-w-[500px] space-y-8">
                    <div className="space-y-4 text-center">
                        <h1 className="text-3xl font-bold text-white">✨Create an Account✨</h1>
                        <p className="text-white">Fill in the details to create a new account</p>
                    </div>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {error && <p className="text-red-500 text-center">{error}</p>}
                        {success && <p className="text-green-500 text-center">{success}</p>}
                        <div className="space-y-2">
                            <label htmlFor="username" className="block text-sm font-medium text-white">
                                Username
                            </label>
                            <div className="relative">
                                <input
                                    id="username"
                                    placeholder="Your username"
                                    required
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="block w-full rounded-md bg-custom-input text-white border-gray-300 text-base py-2 px-10"
                                />
                                <FiUser className="absolute top-1/2 left-3 transform -translate-y-1/2 text-custom-icon" />
                            </div>
                        </div>
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
                            <label htmlFor="password" className="block text-sm font-medium text-white">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    placeholder="********"
                                    required
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full rounded-md bg-custom-input text-white border-gray-300 py-2 px-10"
                                />
                                <FiLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-custom-icon" />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-custom-icon"
                                >
                                    {showPassword ? <FiEyeOff /> : <FiEye />}
                                </button>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="confirm-password" className="block text-sm font-medium text-white">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    id="confirm-password"
                                    placeholder="********"
                                    required
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="block w-full rounded-md bg-custom-input text-white border-gray-300 py-2 px-10"
                                />
                                <FiLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-custom-icon" />
                                <button
                                    type="button"
                                    onClick={toggleConfirmPasswordVisibility}
                                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-custom-icon"
                                >
                                    {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                                </button>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full rounded-md bg-custom-button py-2 px-4 text-base font-medium text-white shadow-sm"
                        >
                            Register
                        </button>
                    </form>
                    <p className="text-center text-sm text-white">
                        Already have an account?{" "}
                        <Link href="/login" className="underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
            <div className="hidden lg:flex items-center justify-center bg-gray-50">
                <img
                    src="/img/C.jpg"
                    alt="Office"
                    className="w-full h-full object-cover shadow-lg"
                />
            </div>
        </div>
    );
};

export default Register;
