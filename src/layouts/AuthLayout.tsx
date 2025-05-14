import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';

const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500 via-primary-600 to-accent-600 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Link to="/" className="flex items-center text-white">
            <Leaf className="h-12 w-12 mr-2 animate-leaf-sway" />
            <span className="text-3xl font-bold">EcoStep</span>
          </Link>
        </div>
        <h2 className="mt-3 text-center text-2xl font-semibold text-white">
          Track your carbon footprint, make a difference
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 animate-fade-in">
          <Outlet />
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-primary-50">
            &copy; {new Date().getFullYear()} EcoStep. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;