import  { useState } from 'react';
import HomePage from './pages/HomePage';
import Navigation from './components/Navigation';
import Toast from './components/Toast';
import type { Doctor } from './types/Doctor';
import { doctorsData } from './data/doctorData';
import DoctorDetailPage from './pages/DoctorDetailsPage';
import DoctorsPage from './pages/DoctorPage';

type Page = 'home' | 'doctors' | 'doctor-detail';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleDoctorSelect = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setCurrentPage('doctor-detail');
  };

  const handleBookSlot = (doctorName: string, day: string, time: string) => {
    setToast({
      message: `Appointment confirmed with Dr. ${doctorName} on ${day} at ${time}. Please be on time!`,
      type: 'success'
    });
    setTimeout(() => setToast(null), 5000);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onBookSlot={() => setCurrentPage('doctors')} />;
      case 'doctors':
        return (
          <DoctorsPage
            doctors={doctorsData}
            onDoctorSelect={handleDoctorSelect}
          />
        );
      case 'doctor-detail':
        return selectedDoctor ? (
          <DoctorDetailPage
            doctor={selectedDoctor}
            onBack={() => setCurrentPage('doctors')}
            onBookSlot={handleBookSlot}
          />
        ) : null;
      default:
        return <HomePage onBookSlot={() => setCurrentPage('doctors')} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="pt-16">
        {renderPage()}
      </main>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default App;