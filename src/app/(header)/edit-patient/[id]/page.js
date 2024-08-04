'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const EditPatient = () => {
    const { id } = useParams();
    const router = useRouter();
    const [formData, setFormData] = useState({
        FirstName: '',
        MiddleName: '',
        LastName: '',
        CellPhone: '',
        Gender: '',
        BirthDate: '',
        Address1: '',
        Address2: '',
        Street: '',
        ExternalNumber: '',
        InternalNumber: '',
        ZipCode: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = Cookies.get('token');

        if (!token) {
            setError('No token found.');
            return;
        }

        const patientData = {
            FirstName: formData.FirstName || '',
            MiddleName: formData.MiddleName || '',
            LastName: formData.LastName || '',
            CellPhone: formData.CellPhone || '',
            Gender: formData.Gender ? parseInt(formData.Gender, 10) : 0,
            BirthDate: formatDate(formData.BirthDate) || '',
            Address1: formData.Address1 || '',
            Address2: formData.Address2 || '',
            Street: formData.Street || '',
            ExternalNumber: formData.ExternalNumber || '',
            InternalNumber: formData.InternalNumber || '',
            ZipCode: formData.ZipCode || ''
        };

        try {
            const response = await fetch(`http://localhost:5156/api/Patient/${id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(patientData)
            });

            if (!response.ok) {
                setError('An error occurred while updating patient data. Please try again.');
                return;
            }

            const result = await response.json();
            setSuccess('Patient data updated successfully');

            // Indicar que los datos han cambiado
            localStorage.setItem('patientDataUpdated', 'true');

            setTimeout(() => {
                router.push(`/patient-info/${id}`);
            }, 2000);
        } catch (err) {
            setError('An error occurred while updating patient data. Please try again.');
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toISOString();
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl w-full space-y-8">
                <div>
                    <h1 className="text-center text-4xl font-extrabold text-gray-900">Edit Patient Information</h1>
                </div>
                <div className="bg-white p-8 shadow rounded-lg">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {Object.keys(formData).slice(0, 6).map((key) => (
                                <div key={key}>
                                    <label className="block text-sm font-medium text-gray-700" htmlFor={key}>
                                        {key.replace(/([A-Z])/g, ' $1').trim()}
                                    </label>
                                    <input
                                        type={key === 'BirthDate' ? 'date' : 'text'}
                                        id={key}
                                        name={key}
                                        value={formData[key] || ''}
                                        onChange={handleChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            {Object.keys(formData).slice(6).map((key) => (
                                <div key={key}>
                                    <label className="block text-sm font-medium text-gray-700" htmlFor={key}>
                                        {key.replace(/([A-Z])/g, ' $1').trim()}
                                    </label>
                                    <input
                                        type="text"
                                        id={key}
                                        name={key}
                                        value={formData[key] || ''}
                                        onChange={handleChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between items-center mt-8">
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4" role="alert">
                            <strong className="font-bold">Error:</strong>
                            <span className="block sm:inline"> {error}</span>
                        </div>
                    )}
                    {success && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4" role="alert">
                            <strong className="font-bold">Success:</strong>
                            <span className="block sm:inline"> {success}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditPatient;
