'use client';

import React from 'react';
import { FaCalendarAlt, FaUserMd, FaUsers, FaClipboardList, FaCog } from 'react-icons/fa';
import { HiOutlineLogout } from 'react-icons/hi';
import Link from 'next/link';

const DoctorDashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <div className="bg-custom-blue text-white py-4 px-6">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-semibold">Doctor Dashboard</h1>
                    <Link href="/login">
                        <button className="flex items-center text-white hover:text-gray-300">
                            <HiOutlineLogout className="mr-2" />
                            Logout
                        </button>
                    </Link>
                </div>
            </div>
            <div className="container mx-auto py-8 px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Link href="/appointments" className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 hover:bg-gray-50 transition">
                    <FaCalendarAlt className="text-3xl text-custom-blue" />
                    <div>
                        <h2 className="text-xl font-semibold">My Appointments</h2>
                        <p className="text-gray-600">View and manage your appointments</p>
                    </div>
                </Link>
                <Link href="/patients" className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 hover:bg-gray-50 transition">
                    <FaUsers className="text-3xl text-custom-blue" />
                    <div>
                        <h2 className="text-xl font-semibold">Patients</h2>
                        <p className="text-gray-600">Manage patient information and records</p>
                    </div>
                </Link>
                <Link href="/prescriptions" className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 hover:bg-gray-50 transition">
                    <FaClipboardList className="text-3xl text-custom-blue" />
                    <div>
                        <h2 className="text-xl font-semibold">Prescriptions</h2>
                        <p className="text-gray-600">Create and manage prescriptions</p>
                    </div>
                </Link>
                <Link href="/settings" className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 hover:bg-gray-50 transition">
                    <FaCog className="text-3xl text-custom-blue" />
                    <div>
                        <h2 className="text-xl font-semibold">Settings</h2>
                        <p className="text-gray-600">Configure your account settings</p>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default DoctorDashboard;
