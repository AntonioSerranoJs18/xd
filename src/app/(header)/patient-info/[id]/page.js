'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { HiUser, HiPhone, HiOutlineIdentification, HiOutlineCalendar, HiOutlineUser, HiOutlineMail } from 'react-icons/hi';

const PatientInfo = () => {
    const { id } = useParams();
    const router = useRouter();
    const [patientData, setPatientData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:5156/api/Patient?Id=${id}`)
                .then(response => response.json())
                .then(data => {
                    setPatientData(data.Data[0] || {});
                })
                .catch(error => {
                    setError('Error fetching patient data');
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [id]);

    const handleUpdateClick = () => {
        router.push(`/edit-patient/${id}`);
    };

    if (loading) {
        return <div className="text-center py-4">Loading...</div>;
    }

    if (error) {
        return <div className="text-center py-4 text-red-600">{error}</div>;
    }

    if (!patientData) {
        return <div className="text-center py-4">No patient data found.</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 py-12 flex items-center justify-center">
            <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-8">
                <div className="flex items-center justify-center mb-6">
                    <HiUser className="text-blue-600 text-5xl mr-4" />
                    <h1 className="text-4xl font-bold text-gray-700">Patient Information</h1>
                </div>
                <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                        <HiOutlineUser className="text-gray-500 text-2xl" />
                        <div className="w-full">
                            <h2 className="text-2xl font-semibold text-gray-700">{patientData.FullName}</h2>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <HiOutlineIdentification className="text-gray-500 text-2xl" />
                        <div className="w-full">
                            <p className="text-lg text-gray-600"><strong>First Name:</strong> {patientData.FirstName}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <HiOutlineIdentification className="text-gray-500 text-2xl" />
                        <div className="w-full">
                            <p className="text-lg text-gray-600"><strong>Middle Name:</strong> {patientData.MiddleName}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <HiOutlineIdentification className="text-gray-500 text-2xl" />
                        <div className="w-full">
                            <p className="text-lg text-gray-600"><strong>Last Name:</strong> {patientData.LastName}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <HiPhone className="text-gray-500 text-2xl" />
                        <div className="w-full">
                            <p className="text-lg text-gray-600"><strong>Cell Phone:</strong> {patientData.CellPhone}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <HiOutlineMail className="text-gray-500 text-2xl" />
                        <div className="w-full">
                            <p className="text-lg text-gray-600"><strong>Gender:</strong> {patientData.GenderName}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <HiOutlineCalendar className="text-gray-500 text-2xl" />
                        <div className="w-full">
                            <p className="text-lg text-gray-600"><strong>Birth Date:</strong> {new Date(patientData.BirthDate).toLocaleDateString()}</p>
                        </div>
                    </div>
                    <div className="flex justify-center mt-8">
                        <button
                            onClick={handleUpdateClick}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-transform transform hover:scale-105"
                        >
                            Update Information
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientInfo;
