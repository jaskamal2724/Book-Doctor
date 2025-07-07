import type { Doctor } from "../types/Doctor";

const generateTimeSlots = (startHour: number, endHour: number): string[] => {
  const slots = [];
  for (let hour = startHour; hour < endHour; hour++) {
    slots.push(`${hour.toString().padStart(2, '0')}:00`);
    slots.push(`${hour.toString().padStart(2, '0')}:30`);
  }
  return slots;
};

const createDaySchedule = (day: string, startHour: number, endHour: number, availabilityRate: number = 0.7) => ({
  day,
  slots: generateTimeSlots(startHour, endHour).map(time => ({
    time,
    available: Math.random() < availabilityRate
  }))
});

export const doctorsData: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    photo: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=400',
    degree: 'MBBS, MD',
    specialization: 'Cardiology',
    status: 'on-panel',
    experience: '15 years',
    rating: 4.8,
    schedule: [
      createDaySchedule('Monday', 9, 17),
      createDaySchedule('Tuesday', 9, 17),
      createDaySchedule('Wednesday', 9, 17),
      createDaySchedule('Thursday', 9, 17),
      createDaySchedule('Friday', 9, 17),
      createDaySchedule('Saturday', 9, 13),
      createDaySchedule('Sunday', 10, 14, 0.3)
    ]
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    photo: 'https://images.pexels.com/photos/6815657/pexels-photo-6815657.jpeg?auto=compress&cs=tinysrgb&w=400',
    degree: 'MBBS, MS',
    specialization: 'Orthopedics',
    status: 'on-panel',
    experience: '12 years',
    rating: 4.7,
    schedule: [
      createDaySchedule('Monday', 10, 18),
      createDaySchedule('Tuesday', 10, 18),
      createDaySchedule('Wednesday', 10, 18),
      createDaySchedule('Thursday', 10, 18),
      createDaySchedule('Friday', 10, 18),
      createDaySchedule('Saturday', 9, 13),
      createDaySchedule('Sunday', 0, 0, 0)
    ]
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    photo: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=400',
    degree: 'MBBS, DM',
    specialization: 'Dermatology',
    status: 'on-panel',
    experience: '8 years',
    rating: 4.9,
    schedule: [
      createDaySchedule('Monday', 9, 16),
      createDaySchedule('Tuesday', 9, 16),
      createDaySchedule('Wednesday', 9, 16),
      createDaySchedule('Thursday', 9, 16),
      createDaySchedule('Friday', 9, 16),
      createDaySchedule('Saturday', 9, 12),
      createDaySchedule('Sunday', 0, 0, 0)
    ]
  },
  {
    id: '4',
    name: 'Dr. David Wilson',
    photo: 'https://images.pexels.com/photos/6129507/pexels-photo-6129507.jpeg?auto=compress&cs=tinysrgb&w=400',
    degree: 'MBBS, MD',
    specialization: 'Pediatrics',
    status: 'on-holiday',
    experience: '20 years',
    rating: 4.6,
    schedule: [
      createDaySchedule('Monday', 0, 0, 0),
      createDaySchedule('Tuesday', 0, 0, 0),
      createDaySchedule('Wednesday', 0, 0, 0),
      createDaySchedule('Thursday', 0, 0, 0),
      createDaySchedule('Friday', 0, 0, 0),
      createDaySchedule('Saturday', 0, 0, 0),
      createDaySchedule('Sunday', 0, 0, 0)
    ]
  },
  {
    id: '5',
    name: 'Dr. Lisa Thompson',
    photo: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=400',
    degree: 'MBBS, MS',
    specialization: 'Gynecology',
    status: 'on-panel',
    experience: '18 years',
    rating: 4.8,
    schedule: [
      createDaySchedule('Monday', 9, 17),
      createDaySchedule('Tuesday', 9, 17),
      createDaySchedule('Wednesday', 9, 17),
      createDaySchedule('Thursday', 9, 17),
      createDaySchedule('Friday', 9, 17),
      createDaySchedule('Saturday', 9, 13),
      createDaySchedule('Sunday', 0, 0, 0)
    ]
  },
  {
    id: '6',
    name: 'Dr. James Anderson',
    photo: 'https://images.pexels.com/photos/6234309/pexels-photo-6234309.jpeg?auto=compress&cs=tinysrgb&w=400',
    degree: 'MBBS, MD',
    specialization: 'Neurology',
    status: 'on-panel',
    experience: '22 years',
    rating: 4.9,
    schedule: [
      createDaySchedule('Monday', 8, 16),
      createDaySchedule('Tuesday', 8, 16),
      createDaySchedule('Wednesday', 8, 16),
      createDaySchedule('Thursday', 8, 16),
      createDaySchedule('Friday', 8, 16),
      createDaySchedule('Saturday', 8, 12),
      createDaySchedule('Sunday', 0, 0, 0)
    ]
  }
];