import { QRCodeSVG } from 'qrcode.react';
import { Clock, Calendar, MapPin, User } from 'lucide-react';

interface PassQRCodeProps {
  passId: string;
  studentId: string;
  studentName: string;
  destination: string;
  date: string;
  time: string;
  onClose: () => void;
}

export default function PassQRCode({
  passId,
  studentId,
  studentName,
  destination,
  date,
  time,
  onClose
}: PassQRCodeProps) {
  const passData = JSON.stringify({
    passId,
    studentId,
    studentName,
    destination,
    date,
    time,
    timestamp: new Date().toISOString()
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full print-section">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800">Gate Pass QR Code</h3>
          <p className="text-gray-600 mt-1">Show this to the security guard</p>
        </div>

        <div className="flex justify-center mb-6">
          <div className="p-4 bg-white rounded-lg shadow-inner">
            <QRCodeSVG
              value={passData}
              size={200}
              level="H"
              includeMargin={true}
            />
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2 text-gray-600">
            <User className="h-5 w-5" />
            <span className="font-medium">{studentName}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="h-5 w-5" />
            <span>{destination}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="h-5 w-5" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="h-5 w-5" />
            <span>{time}</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 print:hidden">
          <button
            onClick={() => window.print()}
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Print Pass
          </button>
          <button
            onClick={onClose}
            className="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}