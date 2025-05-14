import React, { useState } from 'react';
import { User, Lock, Mail, AlertCircle, Save, ChevronRight, Settings, Activity, Award, UserCog } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'settings' | 'activity'>('profile');
  
  // Profile form state
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [bio, setBio] = useState('Eco-conscious individual trying to make a difference!');
  
  // Password form state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Handle profile update
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // API call would go here
    alert('Profile updated successfully!');
  };
  
  // Handle password update
  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    // API call would go here
    alert('Password updated successfully!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="animate-fade-in">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h2>
            
            <form onSubmit={handleProfileUpdate}>
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input"
                    disabled
                  />
                  <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                </div>
                
                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                  <textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={4}
                    className="input"
                    placeholder="Tell us about yourself..."
                  />
                </div>
                
                <div>
                  <h3 className="text-md font-medium text-gray-800 mb-3">Change Password</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                      <input
                        id="currentPassword"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="input"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                      <input
                        id="newPassword"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="input"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                      <input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="input"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="pt-2">
                  <button type="submit" className="btn-primary flex items-center">
                    <Save className="h-5 w-5 mr-2" />
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        );
      
      case 'settings':
        return (
          <div className="animate-fade-in">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Account Settings</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-md font-medium text-gray-800 mb-3">Notifications</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Email Notifications</p>
                      <p className="text-xs text-gray-500">Receive email updates about your carbon footprint</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Achievement Alerts</p>
                      <p className="text-xs text-gray-500">Get notified when you earn new achievements</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Weekly Reports</p>
                      <p className="text-xs text-gray-500">Receive a weekly summary of your progress</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                    </label>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-md font-medium text-gray-800 mb-3">Privacy</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Show on Leaderboard</p>
                      <p className="text-xs text-gray-500">Allow your profile to appear on the public leaderboard</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Share Progress</p>
                      <p className="text-xs text-gray-500">Allow others to see your achievements and progress</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                    </label>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-md font-medium text-gray-800 mb-3">Data & Export</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <button className="btn btn-outline flex items-center justify-center">
                    Export My Data
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </button>
                  
                  <button className="btn btn-outline flex items-center justify-center text-error-500 border-error-500 hover:bg-error-50">
                    Delete Account
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'activity':
        return (
          <div className="animate-fade-in">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
            
            <div className="border-l-2 border-gray-200 ml-3 pb-1">
              {[
                { date: 'Today', text: 'Logged transportation emissions', icon: <Bike className="h-5 w-5 text-primary-500" /> },
                { date: 'Today', text: 'Achieved "Week Streak" badge', icon: <Award className="h-5 w-5 text-warning-500" /> },
                { date: 'Yesterday', text: 'Updated diet preferences to vegetarian', icon: <Salad className="h-5 w-5 text-success-500" /> },
                { date: '2 days ago', text: 'Logged energy consumption', icon: <Lightbulb className="h-5 w-5 text-accent-500" /> },
                { date: '1 week ago', text: 'Created account', icon: <User className="h-5 w-5 text-gray-500" /> },
              ].map((activity, index) => (
                <div key={index} className="relative mb-6">
                  <div className="absolute -left-[23px] mt-1.5 w-10 h-10 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center">
                    {activity.icon}
                  </div>
                  <div className="ml-6">
                    <h3 className="text-sm font-medium text-gray-800">{activity.text}</h3>
                    <time className="text-xs text-gray-500">{activity.date}</time>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Profile & Settings</h1>
        <p className="text-gray-600 mt-1">Manage your account information and preferences.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="card p-5">
            <div className="flex flex-col items-center mb-6">
              <div className="h-20 w-20 rounded-full bg-primary-100 flex items-center justify-center text-primary-500 text-2xl font-medium mb-3">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <h2 className="text-lg font-semibold text-gray-800">{user?.name}</h2>
              <p className="text-sm text-gray-600">{user?.email}</p>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <nav className="space-y-2">
                <button 
                  onClick={() => setActiveTab('profile')}
                  className={`flex items-center w-full px-3 py-2 text-sm rounded-lg transition-colors ${
                    activeTab === 'profile' ? 'bg-primary-50 text-primary-500' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <User className="h-5 w-5 mr-2" />
                  Personal Information
                </button>
                
                <button 
                  onClick={() => setActiveTab('settings')}
                  className={`flex items-center w-full px-3 py-2 text-sm rounded-lg transition-colors ${
                    activeTab === 'settings' ? 'bg-primary-50 text-primary-500' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Settings className="h-5 w-5 mr-2" />
                  Account Settings
                </button>
                
                <button 
                  onClick={() => setActiveTab('activity')}
                  className={`flex items-center w-full px-3 py-2 text-sm rounded-lg transition-colors ${
                    activeTab === 'activity' ? 'bg-primary-50 text-primary-500' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Activity className="h-5 w-5 mr-2" />
                  Activity History
                </button>
              </nav>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="card p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;