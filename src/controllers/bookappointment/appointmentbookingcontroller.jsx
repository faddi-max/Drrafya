import axios from 'axios';

const API_BASE = 'http://localhost:8000';

export const getAvailability = async (doctorId, date) => {
  const response = await axios.get(
    `${API_BASE}/api/doctors/${doctorId}/availability`,
    {
      params: { date },
      withCredentials: true,
    }
  );

  return response.data;
};

export const bookAppointment = async (payload) => {
  const response = await axios.post(
    `${API_BASE}/api/appointments/book`,
    payload,
    {
      withCredentials: true,
    }
  );

  return response.data;
};