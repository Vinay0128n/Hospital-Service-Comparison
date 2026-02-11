// Hospital Service Comparison - Production Build
// This file will be replaced by npm run build
console.log('Hospital Service Comparison - Production Build');
console.log('Backend URL: https://hospital-service-comparison.onrender.com/api');

// API Configuration
window.API_BASE_URL = 'https://hospital-service-comparison.onrender.com/api';

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
  const root = document.getElementById('root');
  if (root) {
    root.innerHTML = `
      <div style="display: flex; justify-content: center; align-items: center; height: 100vh; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
        <div style="text-align: center; color: white;">
          <h1>Hospital Service Comparison</h1>
          <p>Frontend is ready for deployment</p>
          <p style="font-size: 0.9rem; opacity: 0.8;">Backend API: https://hospital-service-comparison.onrender.com/api</p>
        </div>
      </div>
    `;
  }
});
