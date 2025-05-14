import React, { useState } from 'react';
import { Users, Award, TrendingUp, Filter, ChevronUp, ChevronDown, Search } from 'lucide-react';

const leaderboardData = [
  { id: 1, name: 'Emma Johnson', points: 2450, rank: 1, footprint: 125, joined: '4 months ago' },
  { id: 2, name: 'Liam Wilson', points: 2120, rank: 2, footprint: 142, joined: '6 months ago' },
  { id: 3, name: 'Olivia Taylor', points: 1940, rank: 3, footprint: 156, joined: '2 months ago' },
  { id: 4, name: 'Noah Brown', points: 1840, rank: 4, footprint: 180, joined: '5 months ago' },
  { id: 5, name: 'Sophia Davis', points: 1720, rank: 5, footprint: 165, joined: '3 months ago' },
  { id: 6, name: 'Jackson Martinez', points: 1690, rank: 6, footprint: 190, joined: '1 month ago' },
  { id: 7, name: 'Ava Rodriguez', points: 1580, rank: 7, footprint: 172, joined: '7 months ago' },
  { id: 8, name: 'Lucas Garcia', points: 1520, rank: 8, footprint: 188, joined: '4 months ago' },
  { id: 9, name: 'Mia Hernandez', points: 1450, rank: 9, footprint: 198, joined: '2 months ago' },
  { id: 10, name: 'Aiden Lee', points: 1390, rank: 10, footprint: 203, joined: '5 months ago' },
  { id: 11, name: 'Isabella Gonzalez', points: 1345, rank: 11, footprint: 210, joined: '3 months ago' },
  { id: 12, name: 'Current User', points: 1310, rank: 12, footprint: 215, joined: '2 months ago', isCurrentUser: true },
];

const LeaderboardPage: React.FC = () => {
  const [sortBy, setSortBy] = useState<'points' | 'footprint'>('points');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };
  
  const sortedData = [...leaderboardData]
    .sort((a, b) => {
      const compareA = sortBy === 'points' ? a.points : a.footprint;
      const compareB = sortBy === 'points' ? b.points : b.footprint;
      
      if (sortOrder === 'asc') {
        return compareA - compareB;
      } else {
        return compareB - compareA;
      }
    })
    .filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()));
  
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Leaderboard</h1>
        <p className="text-gray-600 mt-1">See how you stack up against other eco-conscious users.</p>
      </div>
      
      {/* Leaderboard Header */}
      <div className="card p-5 mb-6 bg-gradient-to-r from-primary-500 to-accent-500 text-white">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="rounded-full bg-white/20 p-3 mr-4">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Global Ranking</h3>
              <p className="text-primary-50">Compete with users worldwide</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <p className="text-xs text-primary-50">Your Rank</p>
              <p className="text-2xl font-bold">#12</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <p className="text-xs text-primary-50">Your Points</p>
              <p className="text-2xl font-bold">1,310</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Filter Controls */}
      <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search users..."
            className="input pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <button
            className={`btn ${sortBy === 'points' ? 'btn-primary' : 'btn-outline'} flex items-center`}
            onClick={() => setSortBy('points')}
          >
            <Award className="h-5 w-5 mr-2" />
            Points
            {sortBy === 'points' && (
              <span className="ml-1">
                {sortOrder === 'desc' ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
              </span>
            )}
          </button>
          
          <button
            className={`btn ${sortBy === 'footprint' ? 'btn-primary' : 'btn-outline'} flex items-center`}
            onClick={() => setSortBy('footprint')}
          >
            <TrendingUp className="h-5 w-5 mr-2" />
            Footprint
            {sortBy === 'footprint' && (
              <span className="ml-1">
                {sortOrder === 'desc' ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
              </span>
            )}
          </button>
          
          <button
            className="btn btn-outline flex items-center"
            onClick={toggleSortOrder}
          >
            <Filter className="h-5 w-5 mr-2" />
            {sortOrder === 'desc' ? 'Desc' : 'Asc'}
          </button>
        </div>
      </div>
      
      {/* Leaderboard Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rank
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Eco Points
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Carbon Footprint
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedData.map((user, index) => (
                <tr key={user.id} className={user.isCurrentUser ? 'bg-primary-50' : ''}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${index < 3 ? 'text-primary-500' : 'text-gray-900'}`}>
                      {index === 0 && <span className="text-yellow-500">🥇</span>}
                      {index === 1 && <span className="text-gray-400">🥈</span>}
                      {index === 2 && <span className="text-amber-700">🥉</span>}
                      {index > 2 && `#${index + 1}`}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-500 font-medium mr-3">
                        {user.name.charAt(0)}
                      </div>
                      <div className="text-sm font-medium text-gray-900 flex items-center">
                        {user.name}
                        {user.isCurrentUser && (
                          <span className="ml-2 px-2 py-0.5 text-xs bg-primary-100 text-primary-500 rounded-full">
                            You
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 font-medium">{user.points.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.footprint} kg CO₂</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.joined}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;