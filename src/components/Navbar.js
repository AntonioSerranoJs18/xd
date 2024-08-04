'use client'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { FaUser } from 'react-icons/fa';

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

const Navbar = () => {
    const [userEmail, setUserEmail] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        const token = Cookies.get('token'); 
        if (token) {
            const decodedToken = parseJwt(token);
            if (decodedToken) {
                const email = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];
                setUserEmail(email);
            }
        }
    }, []);

    const handleLogout = () => {
        Cookies.remove('token');
        window.location.href = '/login';
    };

    return (
        <nav className="bg-custom-button text-white p-4 flex items-center justify-between shadow-lg fixed top-0 w-full z-50">
            
            <div className="text-lg font-bold tracking-wide">
                MEDI-PLAN
            </div>

            
            <div className="flex space-x-8 flex-grow justify-center">
                <Link href="/" className="relative group">
                    <span className="relative text-base font-medium transition-colors duration-300 ease-in-out hover:text-blue-300">
                        Home
                        <span className="absolute inset-x-0 bottom-0 h-1 bg-blue-300 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
                    </span>
                </Link>
                <Link href="/appointments" className="relative group">
                    <span className="relative text-base font-medium transition-colors duration-300 ease-in-out hover:text-blue-300">
                        Appointments
                        <span className="absolute inset-x-0 bottom-0 h-1 bg-blue-300 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
                    </span>
                </Link>
                <Link href="/calendar" className="relative group">
                    <span className="relative text-base font-medium transition-colors duration-300 ease-in-out hover:text-blue-300">
                        Calendar
                        <span className="absolute inset-x-0 bottom-0 h-1 bg-blue-300 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
                    </span>
                </Link>
                <Link href="/history" className="relative group">
                    <span className="relative text-base font-medium transition-colors duration-300 ease-in-out hover:text-blue-300">
                        History
                        <span className="absolute inset-x-0 bottom-0 h-1 bg-blue-300 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
                    </span>
                </Link>
            </div>

           
            <div className="relative flex items-center space-x-2">
                <span className="text-sm font-medium truncate">{userEmail}</span>
                <div className="relative">
                    <FaUser
                        className="text-2xl hover:text-blue-300 transition-colors duration-300 ease-in-out cursor-pointer"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                    />
                    
                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 border border-gray-300 rounded-lg shadow-lg z-10">
                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-2 hover:bg-gray-200 transition-colors duration-300 ease-in-out"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;