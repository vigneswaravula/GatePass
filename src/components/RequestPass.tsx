import { useState } from 'react';
import { MapPin, Clock, CalendarDays, Send, XCircle } from 'lucide-react';
import PassQRCode from './PassQRCode';

type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error';

// Simulated student data (in a real app, this would come from authentication)
const MOCK_STUDENT = {
  id: "ST12345",
  name: "John Doe"
};

export default function RequestPass() {
  const [formData, setFormData] = useState({
    destination: '',
    date: '',
    time: '',
    reason: ''
  });

  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [error, setError] = useState('');
  const [showQR, setShowQR] = useState(false);
  const [passId, setPassId] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.destination || !formData.date || !formData.time || !formData.reason) {
      setError('Please fill in all fields');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate a unique pass ID (in real app, this would come from the backend)
      const newPassId = `PASS-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      setPassId(newPassId);
      
      setStatus('success');
      setShowQR(true);
    } catch {
      // Remove err to avoid eslint warning
      setStatus('error');
      setError('Failed to submit request. Please try again.');
    }
  };

  const handleCloseQR = () => {
    setShowQR(false);
    setFormData({
      destination: '',
      date: '',
      time: '',
      reason: ''
    });
    setStatus('idle');
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Request Gate Pass</h2>
        
        {status === 'error' && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
            <XCircle className="h-5 w-5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Destination</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                className="pl-10 w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Where are you going?"
                value={formData.destination}
                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                disabled={status === 'submitting'}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <div className="relative">
                <CalendarDays className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="date"
                  className="pl-10 w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  disabled={status === 'submitting'}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Time</label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="time"
                  className="pl-10 w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  disabled={status === 'submitting'}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Reason</label>
            <textarea
              className="w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              rows={3}
              placeholder="Please provide a reason for your gate pass request..."
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              disabled={status === 'submitting'}
            />
          </div>

          <button
            type="submit"
            className={`w-full py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors ${
              status === 'submitting'
                ? 'bg-indigo-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700'
            } text-white`}
            disabled={status === 'submitting'}
          >
            {status === 'submitting' ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="h-5 w-5" />
                Submit Request
              </>
            )}
          </button>
        </form>
      </div>

      {showQR && (
        <PassQRCode
          passId={passId}
          studentId={MOCK_STUDENT.id}
          studentName={MOCK_STUDENT.name}
          destination={formData.destination}
          date={formData.date}
          time={formData.time}
          onClose={handleCloseQR}
        />
      )}
    </>
  );
}
