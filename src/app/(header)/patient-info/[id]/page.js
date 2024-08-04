'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { HiUser } from 'react-icons/hi'; // Ícono de paciente

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
        <div className="p-6 py-20 bg-gray-100 min-h-screen">
            <div className="flex items-center justify-center mb-6">
                <HiUser className="text-blue-600 text-4xl mr-4" />
                <h1 className="text-4xl font-bold text-gray-600">Patient Information</h1>
            </div>
            <div className="bg-white border border-gray-300 rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold mb-4">{patientData.FullName}</h2>
                <p className="text-lg mb-2"><strong>First Name:</strong> {patientData.FirstName}</p>
                <p className="text-lg mb-2"><strong>Middle Name:</strong> {patientData.MiddleName}</p>
                <p className="text-lg mb-2"><strong>Last Name:</strong> {patientData.LastName}</p>
                <p className="text-lg mb-2"><strong>Cell Phone:</strong> {patientData.CellPhone}</p>
                <p className="text-lg mb-2"><strong>Gender:</strong> {patientData.GenderName}</p>
                <p className="text-lg mb-2"><strong>Birth Date:</strong> {new Date(patientData.BirthDate).toLocaleDateString()}</p>
                <button
                    onClick={handleUpdateClick}
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Update
                </button>
            </div>
        </div>
    );
};

export default PatientInfo;