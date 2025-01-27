import React from 'react';
import Header from './components/Header';
import RequestPass from './components/RequestPass';
import PassCard from './components/PassCard';

function App() {
  const recentPasses = [
    {
      status: 'approved' as const,
      date: '2024-03-15',
      time: '14:30',
      reason: 'Doctor\'s Appointment',
      destination: 'City Hospital'
    },
    {
      status: 'pending' as const,
      date: '2024-03-16',
      time: '10:00',
      reason: 'Family Function',
      destination: 'Home'
    },
    {
      status: 'rejected' as const,
      date: '2024-03-14',
      time: '09:15',
      reason: 'Personal Work',
      destination: 'City Center'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Recent Passes</h2>
            <div className="space-y-4">
              {recentPasses.map((pass, index) => (
                <PassCard key={index} {...pass} />
              ))}
            </div>
          </div>
          
          <div className="lg:sticky lg:top-8">
            <RequestPass />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;