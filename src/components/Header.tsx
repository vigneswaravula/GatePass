import { School, Bell, User } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-indigo-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <School className="h-8 w-8" />
            <h1 className="text-2xl font-bold">VNR Gate Pass</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative p-2 hover:bg-indigo-700 rounded-full">
              <Bell className="h-6 w-6" />
              <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs flex items-center justify-center">2</span>
            </button>
            <button className="flex items-center space-x-2 bg-indigo-700 px-4 py-2 rounded-lg hover:bg-indigo-800">
              <User className="h-5 w-5" />
              <span>Profile</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}