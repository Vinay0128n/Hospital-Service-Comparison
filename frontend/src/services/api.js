import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Service API
export const getAllServices = () => api.get('/services');

export const getServiceById = (id) => api.get(`/services/${id}`);

export const searchServices = (keyword) => api.get(`/services/search?keyword=${keyword}`);

// Hospital API
export const searchHospitals = (serviceId, city, area = '', latitude = null, longitude = null, radius = 50) => {
  let url = `/hospitals/search?serviceId=${serviceId}&city=${encodeURIComponent(city)}`;

  if (area) {
    url += `&area=${encodeURIComponent(area)}`;
  }

  if (latitude && longitude) {
    url += `&latitude=${latitude}&longitude=${longitude}`;
  }

  if (radius) {
    url += `&radius=${radius}`;
  }

  return api.get(url);
};

export const compareHospitals = (serviceId, hospitalIds) => {
  const ids = hospitalIds.join(',');
  return api.get(`/hospitals/compare?serviceId=${serviceId}&hospitalIds=${ids}`);
};

// Appointment API
export const bookAppointment = (appointmentData) => api.post('/appointments', appointmentData);

export const getAppointmentById = (id) => api.get(`/appointments/${id}`);

export const getAppointmentsByPhone = (phone) => api.get(`/appointments/patient/${phone}`);

export const getAppointmentsByUserId = (userId) => api.get(`/appointments/user/${userId}`);

// Review API
export const getReviewsByHospital = (hospitalId) => api.get(`/reviews/hospital/${hospitalId}`);

export const getHospitalRatingStats = (hospitalId) => api.get(`/reviews/hospital/${hospitalId}/stats`);

// Geocoding API
export const reverseGeocode = (lat, lon) => api.get(`/hospitals/reverse-geocode?latitude=${lat}&longitude=${lon}`);

// Auth API
export const login = (data) => api.post('/auth/login', data);
export const register = (data) => api.post('/auth/register', data);

export default api;
