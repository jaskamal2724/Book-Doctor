import React from 'react';
import { Star, Award, Clock } from 'lucide-react';
import type { Doctor } from '../types/Doctor';

interface DoctorCardProps {
  doctor: Doctor;
  onClick: () => void;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onClick }) => {
  const getAvailableSlots = () => {
    return doctor.schedule.reduce((total, day) => {
      return total + day.slots.filter(slot => slot.available).length;
    }, 0);
  };

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer transform hover:-translate-y-1 p-6"
    >
      <div className="flex items-center mb-4">
        <img
          src={doctor.photo}
          alt={doctor.name}
          className="w-16 h-16 rounded-full object-cover mr-4"
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
          <p className="text-blue-600 text-sm">{doctor.degree}</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
          doctor.status === 'on-panel' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {doctor.status === 'on-panel' ? 'Available' : 'On Holiday'}
        </div>
      </div>

      <div className="mb-4">
        <p className="text-gray-700 font-medium mb-2">{doctor.specialization}</p>
        <div className="flex items-center text-gray-600 text-sm space-x-4">
          <div className="flex items-center">
            <Award className="h-4 w-4 mr-1" />
            <span>{doctor.experience}</span>
          </div>
          <div className="flex items-center">
            <Star className="h-4 w-4 mr-1 text-yellow-500" />
            <span>{doctor.rating}</span>
          </div>
        </div>
      </div>

      {doctor.status === 'on-panel' && (
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center text-green-600 text-sm">
            <Clock className="h-4 w-4 mr-1" />
            <span>{getAvailableSlots()} slots available</span>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
            Book Now
          </button>
        </div>
      )}
    </div>
  );
};

export default DoctorCard;