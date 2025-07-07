import React, { useState } from 'react';
import { X, Calendar, Clock, User, Heart } from 'lucide-react';
import type { Doctor } from '../types/Doctor';

interface BookingModalProps {
  doctor: Doctor;
  day: string;
  time: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ doctor, day, time, onConfirm, onCancel }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleConfirm = () => {
    setIsAnimating(true);
    setTimeout(() => {
      onConfirm();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden">
        {!isAnimating ? (
          <>
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-xl font-semibold text-gray-900">Confirm Appointment</h3>
              <button
                onClick={onCancel}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-center mb-6">
                <img
                  src={doctor.photo}
                  alt={doctor.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{doctor.name}</h4>
                  <p className="text-blue-600">{doctor.specialization}</p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center text-gray-700">
                  <Calendar className="h-5 w-5 mr-3 text-blue-600" />
                  <span>{day}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Clock className="h-5 w-5 mr-3 text-blue-600" />
                  <span>{time}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <User className="h-5 w-5 mr-3 text-blue-600" />
                  <span>30 minute consultation</span>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <p className="text-sm text-blue-800">
                  <strong>Please note:</strong> Arrive 15 minutes early for your appointment. 
                  Bring a valid ID and insurance card if applicable.
                </p>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={onCancel}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Book Appointment
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="p-8 text-center">
            <div className="animate-pulse mb-4">
              <Heart className="h-16 w-16 text-red-500 mx-auto animate-bounce" />
            </div>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-lg font-semibold text-gray-900 mb-2">Booking Your Appointment...</p>
            <p className="text-gray-600">Please wait while we confirm your slot</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingModal;