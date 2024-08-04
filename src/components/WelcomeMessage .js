'use client'
// components/WelcomeMessage.js
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaCalendarPlus } from 'react-icons/fa';

const WelcomeMessage = () => {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddAppointment = () => {
        
        router.push('/appointments/new'); 
    };

    return (
        <div className="bg-gradient-to-r from-teal-100 to-teal-50 p-8 rounded-lg shadow-lg max-w-lg mx-auto">
            <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back!</h1>
                <p className="text-gray-600">We're delighted to have you here. Ready to schedule a new appointment?</p>
            </div>
            <div className="flex justify-center">
                <button
                    onClick={handleAddAppointment}
                    className="flex items-center bg-teal-600 text-white py-3 px-6 rounded-lg hover:bg-teal-700 transition-colors duration-300 ease-in-out shadow-md transform hover:scale-105"
                >
                    <FaCalendarPlus className="mr-3 text-xl" />
                    <span className="font-semibold">Add New Appointment</span>
                </button>
            </div>
        </div>
    );
};

export default WelcomeMessage;
