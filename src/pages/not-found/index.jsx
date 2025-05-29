import React from 'react';
import { Frown } from 'lucide-react';

const NotFound = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center">
                <Frown className="w-16 h-16 mx-auto text-gray-500" />
                <h1 className="mt-4 text-4xl font-bold text-gray-800">404 - Page Not Found</h1>
                <p className="mt-2 text-lg text-gray-600">Sorry, the page you are looking for does not exist.</p>
                <a href="/auth/login" className="mt-6 inline-block px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition duration-300">
                    Go Back Home
                </a>
            </div>
        </div>
    );
};

export default NotFound;