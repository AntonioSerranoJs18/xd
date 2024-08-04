'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const EditPatient = () => {
    const { id } = useParams();
    const router = useRouter();
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:5156/api/Patient?Id=${id}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    setFormData(data.Data[0] || {});
                })
                .catch(err => {
                    console.error('Error fetching patient data:', err);
                    setError('Error fetching patient data');
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [id]);

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
            Gender: formData.Gender ? parseInt(formData.Gender, 10) : 0, // Aseguramos que sea un número
            BirthDate: formatDate(formData.BirthDate) || '', // Formateamos la fecha
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
                const errorText = await response.text();
                console.error('Server Error:', errorText);
                setError(`Error updating patient data: ${errorText}`);
                return;
            }

            const result = await response.json();
            console.log('Update result:', result);
            setSuccess('Patient data updated successfully');
            setTimeout(() => {
                router.push(`/patient-info/${id}`);
            }, 2000);
        } catch (err) {
            console.error('Fetch error:', err);
            setError('Error updating patient data');
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toISOString(); // Devuelve la fecha en formato completo ISO 8601
    };

    if (loading) {
        return <div className="text-center py-4">Loading...</div>;
    }

    return (
        <div className="p-6 py-20 bg-gray-100 min-h-screen">
            <div className="flex items-center justify-center mb-6">
                <h1 className="text-4xl font-bold text-gray-600">Edit Patient Information</h1>
            </div>
            <div className="bg-white border border-gray-300 rounded-lg shadow-md p-6">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-lg font-semibold mb-2" htmlFor="FirstName">First Name</label>
                        <input
                            type="text"
                            id="FirstName"
                            name="FirstName"
                            value={formData.FirstName || ''}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-lg font-semibold mb-2" htmlFor="MiddleName">Middle Name</label>
                        <input
                            type="text"
                            id="MiddleName"
                            name="MiddleName"
                            value={formData.MiddleName || ''}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-lg font-semibold mb-2" htmlFor="LastName">Last Name</label>
                        <input
                            type="text"
                            id="LastName"
                            name="LastName"
                            value={formData.LastName || ''}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-lg font-semibold mb-2" htmlFor="CellPhone">Cell Phone</label>
                        <input
                            type="text"
                            id="CellPhone"
                            name="CellPhone"
                            value={formData.CellPhone || ''}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-lg font-semibold mb-2" htmlFor="Gender">Gender</label>
                        <input
                            type="number"
                            id="Gender"
                            name="Gender"
                            value={formData.Gender || ''}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-lg font-semibold mb-2" htmlFor="BirthDate">Birth Date</label>
                        <input
                            type="date"
                            id="BirthDate"
                            name="BirthDate"
                            value={formData.BirthDate ? formatDate(formData.BirthDate).split('T')[0] : ''}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-lg font-semibold mb-2" htmlFor="Address1">Address 1</label>
                        <input
                            type="text"
                            id="Address1"
                            name="Address1"
                            value={formData.Address1 || ''}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-lg font-semibold mb-2" htmlFor="Address2">Address 2</label>
                        <input
                            type="text"
                            id="Address2"
                            name="Address2"
                            value={formData.Address2 || ''}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-lg font-semibold mb-2" htmlFor="Street">Street</label>
                        <input
                            type="text"
                            id="Street"
                            name="Street"
                            value={formData.Street || ''}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-lg font-semibold mb-2" htmlFor="ExternalNumber">External Number</label>
                        <input
                            type="text"
                            id="ExternalNumber"
                            name="ExternalNumber"
                            value={formData.ExternalNumber || ''}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-lg font-semibold mb-2" htmlFor="InternalNumber">Internal Number</label>
                        <input
                            type="text"
                            id="InternalNumber"
                            name="InternalNumber"
                            value={formData.InternalNumber || ''}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-lg font-semibold mb-2" htmlFor="ZipCode">Zip Code</label>
                        <input
                            type="text"
                            id="ZipCode"
                            name="ZipCode"
                            value={formData.ZipCode || ''}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
                {error && <div className="text-red-500 mt-4">{error}</div>}
                {success && <div className="text-green-500 mt-4">{success}</div>}
            </div>
        </div>
    );
};

export default EditPatient;
