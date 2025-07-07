import React, { useState } from 'react';
import { ArrowLeft, Calendar, Star, Award, MapPin } from 'lucide-react';
import BookingModal from '../components/BookingModal';
import type { Doctor } from '../types/Doctor';

interface DoctorDetailPageProps {
  doctor: Doctor;
  onBack: () => void;
  onBookSlot: (doctorName: string, day: string, time: string) => void;
}

const DoctorDetailPage: React.FC<DoctorDetailPageProps> = ({ doctor, onBack, onBookSlot }) => {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{ day: string; time: string } | null>(null);

  const handleSlotClick = (day: string, time: string) => {
    setSelectedSlot({ day, time });
    setShowBookingModal(true);
  };

  const handleBookingConfirm = () => {
    if (selectedSlot) {
      onBookSlot(doctor.name, selectedSlot.day, selectedSlot.time);
      setShowBookingModal(false);
      setSelectedSlot(null);
    }
  };

  const getAvailableSlots = (day: string) => {
    const daySchedule = doctor.schedule.find(schedule => schedule.day === day);
    return daySchedule?.slots.filter(slot => slot.available).length || 0;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors mr-4"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Doctors
          </button>
        </div>

        {/* Doctor Info */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
            <div className="flex-shrink-0">
              <img
                src={doctor.photo}
                alt={doctor.name}
                className="w-48 h-48 rounded-lg object-cover"
              />
            </div>
            
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{doctor.name}</h1>
              <p className="text-xl text-blue-600 mb-2">{doctor.degree}</p>
              <p className="text-lg text-gray-600 mb-4">{doctor.specialization}</p>
              
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-4">
                <div className="flex items-center text-gray-600">
                  <Award className="h-5 w-5 mr-2" />
                  <span>{doctor.experience} experience</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Star className="h-5 w-5 mr-2 text-yellow-500" />
                  <span>{doctor.rating} rating</span>
                </div>
                <div className="flex items-center">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    doctor.status === 'on-panel' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {doctor.status === 'on-panel' ? 'Available' : 'On Holiday'}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-center lg:justify-start text-gray-600">
                <MapPin className="h-5 w-5 mr-2" />
                <span>MedCare Medical Center</span>
              </div>
            </div>
          </div>
        </div>

        {/* Schedule */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Calendar className="h-6 w-6 mr-3" />
            Weekly Schedule
          </h2>

          {doctor.status === 'on-holiday' ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🏖️</div>
              <p className="text-xl text-gray-600 mb-2">Doctor is currently on holiday</p>
              <p className="text-gray-500">Please check back later or select another doctor</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {doctor.schedule.map((daySchedule) => (
                <div key={daySchedule.day} className="border rounded-lg p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{daySchedule.day}</h3>
                    <span className="text-sm text-gray-500">
                      {getAvailableSlots(daySchedule.day)} slots available
                    </span>
                  </div>
                  
                  {daySchedule.slots.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">Not available</p>
                  ) : (
                    <div className="grid grid-cols-3 gap-2">
                      {daySchedule.slots.map((slot, index) => (
                        <button
                          key={index}
                          onClick={() => slot.available && handleSlotClick(daySchedule.day, slot.time)}
                          disabled={!slot.available}
                          className={`p-2 rounded text-sm font-medium transition-all ${
                            slot.available
                              ? 'bg-blue-100 text-blue-800 hover:bg-blue-200 cursor-pointer'
                              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          {slot.time}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showBookingModal && selectedSlot && (
        <BookingModal
          doctor={doctor}
          day={selectedSlot.day}
          time={selectedSlot.time}
          onConfirm={handleBookingConfirm}
          onCancel={() => setShowBookingModal(false)}
        />
      )}
    </div>
  );
};

export default DoctorDetailPage;