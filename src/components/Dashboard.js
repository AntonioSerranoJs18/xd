'use client';

import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { HiCalendar, HiClock, HiLocationMarker, HiUserGroup } from 'react-icons/hi';
import { AiOutlineHistory, AiOutlinePlusCircle } from 'react-icons/ai';
import Link from 'next/link';

const parseJwt = (token) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error('Invalid token', error);
        return null;
    }
};

const PatientDashboard = () => {
    const [patientName, setPatientName] = useState('');
    const [patientId, setPatientId] = useState(null); 

    useEffect(() => {
        const token = Cookies.get('token'); 
        if (token) {
            const decodedToken = parseJwt(token);
            if (decodedToken) {
                const name = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
                const id = decodedToken["PatientId"]; 
                setPatientName(name);
                setPatientId(id);
            }
        }
    }, []);

    return (
        <div className="bg-white min-h-screen flex flex-col pt-14">
            <div className="bg-custom-input text-white py-16 px-6 text-center">
                <h1 className="text-4xl font-extrabold mb-2">Welcome Back, {patientName}!</h1>
                <p className="text-xl">Manage your appointments and view important information here.</p>
            </div>
            <div className="flex-1 p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
               
                    <Link href="/schedule-appointment">
                        <div className="bg-white border border-gray-300 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl cursor-pointer">
                            <div className="p-6 flex items-center space-x-4">
                                <AiOutlinePlusCircle className="text-teal-500 text-5xl" />
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800">Schedule New Appointment</h3>
                                    <p className="text-sm text-gray-600">Book a new appointment with your preferred doctor.</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                   
                    <Link href="/appointments">
                        <div className="bg-white border border-gray-300 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl cursor-pointer">
                            <div className="p-6 flex items-center space-x-4">
                                <HiCalendar className="text-blue-400 text-5xl" />
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800">Upcoming Appointments</h3>
                                    <p className="text-sm text-gray-600">View your upcoming appointments and manage them.</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                 
                    <Link href="/appointment-history">
                        <div className="bg-white border border-gray-300 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl cursor-pointer">
                            <div className="p-6 flex items-center space-x-4">
                                <AiOutlineHistory className="text-gray-500 text-5xl" />
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800">Appointment History</h3>
                                    <p className="text-sm text-gray-600">Check your past appointments and related notes.</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                   
                    <Link href="/select-location">
                        <div className="bg-white border border-gray-300 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl cursor-pointer">
                            <div className="p-6 flex items-center space-x-4">
                                <HiLocationMarker className="text-green-500 text-5xl" />
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800">Select Location</h3>
                                    <p className="text-sm text-gray-600">Choose the location for your upcoming appointments.</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                 
                    <Link href={`/patient-info/${patientId}`}>
                        <div className="bg-white border border-gray-300 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl cursor-pointer">
                            <div className="p-6 flex items-center space-x-4">
                                <HiUserGroup className="text-gray-600 text-5xl" />
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800">Patient Information</h3>
                                    <p className="text-sm text-gray-600">View or update your personal information.</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                 
                    <Link href="/manage-time">
                        <div className="bg-white border border-gray-300 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl cursor-pointer">
                            <div className="p-6 flex items-center space-x-4">
                                <HiClock className="text-purple-500 text-5xl" />
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800">Manage Time</h3>
                                    <p className="text-sm text-gray-600">Adjust your time preferences for appointments.</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PatientDashboard;
