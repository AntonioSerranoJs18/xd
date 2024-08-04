// components/AddAppointment.js
'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaMapMarkerAlt, FaUserMd } from 'react-icons/fa';

const AddAppointment = () => {
    const [patientName, setPatientName] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [description, setDescription] = useState('');
    const [doctor, setDoctor] = useState('');
    const [location, setLocation] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
       
        router.push('/dashboard');
    };

    return (
        <div className="bg-gray-100 min-h-screen p-6">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Schedule a New Appointment</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="patientName" className="block text-sm font-medium text-gray-700">Patient Name</label>
                            <input
                                id="patientName"
                                type="text"
                                value={patientName}
                                onChange={(e) => setPatientName(e.target.value)}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                            <input
                                id="date"
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
                            <input
                                id="time"
                                type="time"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="doctor" className="block text-sm font-medium text-gray-700">Doctor</label>
                            <select
                                id="doctor"
                                value={doctor}
                                onChange={(e) => setDoctor(e.target.value)}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Select Doctor</option>
                                
                            </select>
                        </div>
                        <div>
                            <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                            <input
                                id="location"
                                type="text"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Schedule Appointment
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddAppointment;
