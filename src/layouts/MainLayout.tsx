import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  LayoutDashboard, 
  LineChart, 
  Award, 
  Users, 
  User, 
  LogOut, 
  Menu, 
  X,
  Leaf
} from 'lucide-react';

const MainLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = [
    { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
    { path: '/emissions', label: 'Track Emissions', icon: <LineChart className="h-5 w-5" /> },
    { path: '/achievements', label: 'Achievements', icon: <Award className="h-5 w-5" /> },
    { path: '/leaderboard', label: 'Leaderboard', icon: <Users className="h-5 w-5" /> },
    { path: '/profile', label: 'Profile', icon: <User className="h-5 w-5" /> },
  ];

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex md:flex-col md:w-64 bg-white shadow-md">
        <div className="flex items-center justify-center h-16 border-b">
          <Link to="/dashboard" className="flex items-center text-primary-500">
            <Leaf className="h-7 w-7 mr-2" />
            <span className="text-xl font-bold">EcoStep</span>
          </Link>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-2 px-3">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors
                    ${location.pathname === link.path
                      ? 'bg-primary-50 text-primary-500'
                      : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  {link.icon}
                  <span className="ml-3">{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 w-full text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span className="ml-3">Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile menu sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 md:hidden ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between h-16 border-b px-4">
          <Link to="/dashboard" className="flex items-center text-primary-500" onClick={closeMobileMenu}>
            <Leaf className="h-6 w-6 mr-2" />
            <span className="text-lg font-bold">EcoStep</span>
          </Link>
          <button onClick={closeMobileMenu} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-2 px-3">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors
                    ${location.pathname === link.path
                      ? 'bg-primary-50 text-primary-500'
                      : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  onClick={closeMobileMenu}
                >
                  {link.icon}
                  <span className="ml-3">{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 w-full text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span className="ml-3">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top header */}
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-4 md:px-6">
          <div className="flex items-center md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <Menu className="h-6 w-6" />
            </button>
            <Link to="/dashboard" className="ml-3 text-primary-500 font-semibold flex items-center">
              <Leaf className="h-5 w-5 mr-1" />
              <span>EcoStep</span>
            </Link>
          </div>
          
          <div className="flex-1 md:flex md:items-center md:justify-between md:px-4 hidden">
            <h1 className="text-xl font-semibold text-gray-800">
              {navLinks.find(link => link.path === location.pathname)?.label || 'Dashboard'}
            </h1>
          </div>
          
          <div className="flex items-center">
            <span className="hidden md:block text-sm text-gray-700 mr-4">
              Hello, {user?.name || 'User'}
            </span>
            <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-500 font-medium">
              {user?.name?.charAt(0) || 'U'}
            </div>
          </div>
        </header>
        
        {/* Page content */}
        <main className="flex-1 overflow-auto bg-gray-50 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;