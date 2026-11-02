export interface User {
  id: string;
  email: string;
  role: 'admin' | 'professional';
  created_at: string;
}

export interface Client {
  id: string;
  name: string;
  phone: string;
  email?: string;
  notes?: string;
  created_at: string;
}

export interface Appointment {
  id: string;
  client_id: string;
  professional_id: string;
  date: string;
  start_time: string;
  end_time: string;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
}
