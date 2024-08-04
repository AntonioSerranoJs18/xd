'use client';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { HiUser, HiOfficeBuilding, HiStatusOnline, HiStatusOffline, HiClock, HiCalendar } from 'react-icons/hi';

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

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = Cookies.get('token'); // Reemplaza 'token' con el nombre de la cookie que almacena tu token JWT
        if (token) {
            const decodedToken = parseJwt(token);
            if (decodedToken) {
                const patientId = decodedToken["PatientId"];
                fetch(`http://localhost:5156/api/Appointment?PatientId=${patientId}`)
                    .then(response => response.json())
                    .then(data => {
                        setAppointments(data.Data);
                    })
                    .catch(error => {
                        console.error('Error fetching appointments', error);
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            }
        }
    }, []);

    if (loading) {
        return <div className="text-center py-4">Loading...</div>;
    }

    return (
        <div className="p-6 py-20 bg-gray-100 min-h-screen">
            <div className="flex items-center justify-center mb-6">
                <HiCalendar className="text-blue-600 text-4xl mr-4" />
                <h1 className="text-4xl font-bold text-blue-600">Your Appointments</h1>
            </div>
            {appointments.length === 0 ? (
                <div className="text-center text-gray-600">
                    <p>You don't have any appointments yet.</p>
                </div>
            ) : (
                <ul className="space-y-4">
                    {appointments.map((appointment) => (
                        <li key={appointment.Id} className="bg-white border border-gray-300 rounded-lg shadow-md p-6 flex items-start">
                            <div className="flex-grow ml-4">
                                <div className="flex items-center mb-2">
                                    <HiUser className="text-gray-600 text-xl mr-2" />
                                    <h2 className="text-xl font-semibold">{appointment.PatientFullName}</h2>
                                </div>
                                <p className="text-gray-700 mb-1 flex items-center">
                                    <HiClock className="text-gray-500 text-xl mr-2" />
                                    <span className="font-medium">Date:</span>
                                    <span className="ml-2">{new Date(appointment.AppoinmentDate).toLocaleDateString()} at {new Date(appointment.AppoinmentDate).toLocaleTimeString()}</span>
                                </p>
                                <p className="text-gray-700 mb-1 flex items-center">
                                    <HiUser className="text-gray-500 text-xl mr-2" />
                                    <span className="font-medium">Doctor:</span>
                                    <span className="ml-2">{appointment.DoctorFullName}</span>
                                </p>
                                <p className="text-gray-700 mb-1 flex items-center">
                                    <HiOfficeBuilding className="text-gray-500 text-xl mr-2" />
                                    <span className="font-medium">Consultory:</span>
                                    <span className="ml-2">{appointment.ConsultoryName}</span>
                                </p>
                                <p className="text-gray-700 flex items-center">
                                    {appointment.IsActive === 'Activo' ? (
                                        <>
                                            <HiStatusOnline className="text-green-500 text-xl mr-2" />
                                            <span className="font-medium">Status:</span>
                                            <span className="ml-2">{appointment.StatusName}</span>
                                        </>
                                    ) : (
                                        <>
                                            <HiStatusOffline className="text-red-500 text-xl mr-2" />
                                            <span className="font-medium">Status:</span>
                                            <span className="ml-2">{appointment.StatusName}</span>
                                        </>
                                    )}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Appointments;
