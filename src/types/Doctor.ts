export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface DaySchedule {
  day: string;
  slots: TimeSlot[];
}

export interface Doctor {
  id: string;
  name: string;
  photo: string;
  degree: string;
  specialization: string;
  status: 'on-panel' | 'on-holiday';
  experience: string;
  rating: number;
  schedule: DaySchedule[];
}