'use client';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation'; // Importar desde next/navigation

export default function Page() {
    const [doctorId, setDoctorId] = useState('');
    const [consultoryId, setConsultoryId] = useState('');
    const [appointmentDate, setAppointmentDate] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [doctors, setDoctors] = useState([]);
    const [consultories, setConsultories] = useState([]);
    const [patientId, setPatientId] = useState(null);
    const router = useRouter(); // Obtener el hook useRouter

    useEffect(() => {
        // Obtener el token de las cookies
        const token = Cookies.get('token');
        if (token) {
            const decodedToken = parseJwt(token);
            if (decodedToken) {
                setPatientId(decodedToken["PatientId"]);
            }
        }
    }, []);

    useEffect(() => {
        // Obtener los doctores
        fetch('http://localhost:5156/api/Doctor')
            .then(response => response.json())
            .then(data => {
                if (data && data.Data && Array.isArray(data.Data)) {
                    setDoctors(data.Data);
                } else {
                    console.error('Unexpected data format for doctors', data);
                }
            })
            .catch(error => {
                console.error('Error fetching doctors', error);
            });

        // Obtener los consultorios
        fetch('http://localhost:5156/api/Consultory')
            .then(response => response.json())
            .then(data => {
                if (data && data.Data && Array.isArray(data.Data)) {
                    setConsultories(data.Data);
                } else {
                    console.error('Unexpected data format for consultories', data);
                }
            })
            .catch(error => {
                console.error('Error fetching consultories', error);
            });
    }, []);

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = Cookies.get('token');
        if (!token || !patientId) {
            setError('No token found or patient ID not available.');
            return;
        }

        const appointmentData = {
            DoctorId: doctorId,
            PatientId: patientId,
            ConsultoryId: consultoryId,
            AppointmentDate: appointmentDate
        };

        try {
            const response = await fetch('http://localhost:5156/api/Appointment', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(appointmentData)
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error: ${errorText}`);
            }

            const result = await response.json();
            setMessage('Appointment created successfully!');
            console.log('Appointment result:', result);
            router.push('/');  // Redirigir a la página de inicio
        } catch (err) {
            setError(err.message);
            console.error('Fetch error:', err);
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">Create Appointment</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="doctorId">Select Doctor</label>
                        <select
                            id="doctorId"
                            value={doctorId}
                            onChange={(e) => setDoctorId(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        >
                            <option value="" disabled>Select a doctor</option>
                            {doctors.length > 0 ? (
                                doctors.map(doctor => (
                                    <option key={doctor.Id} value={doctor.Id}>
                                        {doctor.FullName}
                                    </option>
                                ))
                            ) : (
                                <option value="" disabled>No doctors available</option>
                            )}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="consultoryId">Select Consultory</label>
                        <select
                            id="consultoryId"
                            value={consultoryId}
                            onChange={(e) => setConsultoryId(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        >
                            <option value="" disabled>Select a consultory</option>
                            {consultories.length > 0 ? (
                                consultories.map(consultory => (
                                    <option key={consultory.Id} value={consultory.Id}>
                                        {consultory.Name}
                                    </option>
                                ))
                            ) : (
                                <option value="" disabled>No consultories available</option>
                            )}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="appointmentDate">Appointment Date</label>
                        <input
                            type="datetime-local"
                            id="appointmentDate"
                            value={appointmentDate}
                            onChange={(e) => setAppointmentDate(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Create Appointment
                    </button>
                </form>
                {message && <div className="mt-4 text-green-500 text-center">{message}</div>}
                {error && <div className="mt-4 text-red-500 text-center">{error}</div>}
            </div>
        </div>
    );
}
