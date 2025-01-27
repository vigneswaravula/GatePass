import { Clock, Calendar, CheckCircle2, XCircle } from 'lucide-react';

interface PassCardProps {
  status: 'pending' | 'approved' | 'rejected';
  date: string;
  time: string;
  reason: string;
  destination: string;
}

export default function PassCard({ status, date, time, reason, destination }: PassCardProps) {
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800'
  };

  const StatusIcon = {
    pending: Clock,
    approved: CheckCircle2,
    rejected: XCircle
  }[status];

  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{destination}</h3>
          <p className="text-gray-600 mt-1">{reason}</p>
        </div>
        <span className={`${statusColors[status]} px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1`}>
          <StatusIcon className="h-4 w-4" />
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>
      <div className="flex items-center gap-4 text-gray-600">
        <div className="flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          <span>{time}</span>
        </div>
      </div>
    </div>
  );
}