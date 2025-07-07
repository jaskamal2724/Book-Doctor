import React from 'react';
import DoctorCard from '../components/DoctorCard';
import type { Doctor } from '../types/Doctor';

interface DoctorsPageProps {
  doctors: Doctor[];
  onDoctorSelect: (doctor: Doctor) => void;
}

const DoctorsPage: React.FC<DoctorsPageProps> = ({ doctors, onDoctorSelect }) => {
  const onPanelDoctors = doctors.filter(doctor => doctor.status === 'on-panel');
  const onHolidayDoctors = doctors.filter(doctor => doctor.status === 'on-holiday');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Our Medical Experts
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our panel of experienced doctors across various specializations. 
            Book your appointment with just a few clicks.
          </p>
        </div>

        {/* Available Doctors */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
            Available Doctors ({onPanelDoctors.length})
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {onPanelDoctors.map((doctor) => (
              <DoctorCard
                key={doctor.id}
                doctor={doctor}
                onClick={() => onDoctorSelect(doctor)}
              />
            ))}
          </div>
        </div>

        {/* Doctors on Holiday */}
        {onHolidayDoctors.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="w-3 h-3 bg-red-500 rounded-full mr-3"></span>
              Currently on Holiday ({onHolidayDoctors.length})
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {onHolidayDoctors.map((doctor) => (
                <DoctorCard
                  key={doctor.id}
                  doctor={doctor}
                  onClick={() => onDoctorSelect(doctor)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorsPage;