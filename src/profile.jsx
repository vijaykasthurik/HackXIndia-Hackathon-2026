import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const API_BASE_URL = 'http://localhost:5000/api';
const getAuthToken = () => localStorage.getItem('token');
const API_KEY = process.env.WEATHER_API_KEY; // Your OpenWeatherMap API Key

const Profile = () => { // Removed onNavigate prop
  const navigate = useNavigate(); // Initialize useNavigate hook

  const [fullName, setFullName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [location, setLocation] = useState('');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  
  // States for weather information
  const [weatherData, setWeatherData] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState('');

  // A ref to hold the debounce timer
  const debounceTimeout = useRef(null);

  // Effect to load initial user data from localStorage and then fetch from backend
  useEffect(() => {
    // 1. Load from localStorage for immediate display
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setFullName(user.name || '');
      setEmailAddress(user.email || '');
      setLocation(user.city || '');
      setEmailNotifications(user.emailNotifications || false);
    }

    // 2. Fetch fresh data from the backend
    const fetchUserProfile = async () => {
      try {
        const token = getAuthToken();
        if (!token) return;

        const response = await axios.get(`${API_BASE_URL}/profile`, {
          headers: { 'x-auth-token': token }
        });

        const user = response.data;
        setFullName(user.name || '');
        setEmailAddress(user.email || '');
        setLocation(user.city || '');
        setEmailNotifications(user.emailNotifications || false);

        // Update localStorage with the latest data
        localStorage.setItem('currentUser', JSON.stringify(user));
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchUserProfile();
  }, []);

  const fetchWeather = async (city) => {
    setWeatherLoading(true);
    setWeatherError('');
    try {
      const encodedCity = encodeURIComponent(city);
      const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodedCity}&appid=${API_KEY}&units=metric`;

      const response = await axios.get(weatherApiUrl);
      const data = response.data;

      if (data && data.weather && data.main) {
        setWeatherData({
          temperature: Math.round(data.main.temp),
          description: data.weather[0].description,
          icon: data.weather[0].icon,
          city: data.name,
        });
      } else {
        setWeatherError('Could not retrieve weather data for this location.');
        setWeatherData(null);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeatherError(error.response?.data?.message || 'Failed to fetch weather data. Please try a different location.');
      setWeatherData(null);
    } finally {
      setWeatherLoading(false);
    }
  };

  const saveProfileChanges = async (updates) => {
    try {
      const token = getAuthToken();
      if (!token) return;

      const response = await axios.put(`${API_BASE_URL}/profile`, updates, {
        headers: { 'x-auth-token': token }
      });

      // Update local storage with the new data from the response
      localStorage.setItem('currentUser', JSON.stringify(response.data));
    } catch (err) {
      console.error('Failed to save profile changes:', err);
    }
  };

  // Debounced effect to fetch weather and save location changes
  useEffect(() => {
    // Clear any previous timer
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    // Only proceed if location is not empty
    if (location) {
      // Set a new timer to fetch weather and save changes after 500ms
      debounceTimeout.current = setTimeout(() => {
        fetchWeather(location);
        saveProfileChanges({ city: location });
      }, 500);
    } else {
      setWeatherData(null);
    }

    // Cleanup function to clear the timer on component unmount or dependency change
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [location]);

  // Handle saving of the full name
  const handleFullNameChange = (e) => {
    const newName = e.target.value;
    setFullName(newName);
    // You can add a debounce here as well if you want
    saveProfileChanges({ name: newName });
  };
  
  // Handle email notification toggle
  const handleEmailNotificationsToggle = async () => {
    const newValue = !emailNotifications;
    setEmailNotifications(newValue);
    saveProfileChanges({ emailNotifications: newValue });
  };

  return (
    <div style={styles.profileContainer}>
      <style>
        {`
          /* Inline styles specific to this Profile page content */
          .form-label {
            font-weight: 500;
            color: #555;
          }
          .form-text {
            font-size: 0.85rem;
            color: #777;
          }
          .alert {
            border-radius: 8px;
            margin-bottom: 1.5rem;
          }
          .alert-success {
            background-color: #d4edda;
            color: #155724;
            border-color: #c3e6cb;
          }
          .alert-danger {
            background-color: #f8d7da;
            color: #721c24;
            border-color: #f5c6cb;
          }
          /* Custom styling for the Bootstrap switch toggle */
          .form-check-input:checked {
            background-color: #4CAF50; /* Green when checked */
            border-color: #4CAF50;
          }
          .form-check-input:focus {
            box-shadow: 0 0 0 0.25rem rgba(76, 175, 80, 0.25); /* Green focus ring */
          }
          /* Weather card hover animation */
          .weather-card:hover {
            transform: scale(1.02);
            box-shadow: 0 12px 24px rgba(0,0,0,0.12);
          }
        `}
      </style>

      <div className="container pt-2 pb-4 d-flex justify-content-center">
        <div className="card shadow-sm" style={styles.card}>
          <div className="card-body">
            {/* Header Section */}
            <div className="text-center mb-4">
              <i className="fas fa-cog fa-3x" style={styles.icon}></i>
              <h2 className="mt-3 mb-1" style={styles.headerText}>Manage Your Account</h2>
              <p className="text-muted mb-0">Update your profile information and notification preferences.</p>
            </div>

            <hr className="mb-4" />

            {/* Profile Settings Section */}
            <div className="mb-4">
              <h5 className="mb-2" style={styles.sectionHeader}>Profile Settings</h5>
              <p className="text-muted mb-3">Keep your information up to date.</p>

              {/* Full Name */}
              <div className="mb-3">
                <label htmlFor="fullName" className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="fullName"
                  value={fullName}
                   readOnly
                  onChange={handleFullNameChange}
                  style={styles.inputField}
                />
              </div>

              {/* Email Address - Remains read-only */}
              <div className="mb-3">
                <label htmlFor="emailAddress" className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  id="emailAddress"
                  value={emailAddress}
                  readOnly
                  style={styles.inputField}
                />
                <div className="form-text mt-1">
                  Your email address cannot be changed here.
                  <button
                    onClick={() => navigate('/contact')} // Changed to navigate('/contact')
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      color: styles.link.color,
                      textDecoration: 'none',
                      cursor: 'pointer',
                      display: 'inline',
                    }}
                  >
                    Contact support
                  </button> to change it.
                </div>
              </div>

              {/* Location - Now editable with debounced save */}
              <div className="mb-3">
                <label htmlFor="location" className="form-label">Location (City)</label>
                <input
                  type="text"
                  className="form-control"
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  style={styles.inputField}
                />
                <div className="form-text mt-1">
                  Enter a city to get a real-time weather update.
                </div>
              </div>
            </div>

            <hr className="mb-4" />

            {/* Weather Information Section */}
            <div className="mb-4">
              <h5 className="mb-2" style={styles.sectionHeader}>Current Weather</h5>
              <p className="text-muted mb-3">Get real-time weather updates for your location.</p>
              {weatherLoading ? (
                <div className="text-center">Loading weather...</div>
              ) : weatherError ? (
                <div className="alert alert-danger text-center" role="alert">{weatherError}</div>
              ) : weatherData ? (
                <div className="weather-card d-flex align-items-center justify-content-center" style={styles.weatherCard}>
                  <img
                    src={`http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
                    alt={weatherData.description}
                    style={{ width: '80px', height: '80px' }}
                  />
                  <div className="ms-4 text-center">
                    <h3 className="mb-0" style={{ color: styles.headerText.color, fontSize: '2.5rem' }}>
                      {weatherData.temperature}°C
                    </h3>
                    <p className="mb-0 text-muted" style={{ textTransform: 'capitalize', fontSize: '1rem' }}>
                      {weatherData.description}
                    </p>
                    <p className="mb-0 text-muted small">{weatherData.city}</p>
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted">No weather data available. Please enter a location.</div>
              )}
            </div>

            <hr className="mb-4" />

            {/* Notification Preferences Section */}
            <div className="mb-4">
              <h5 className="mb-2" style={styles.sectionHeader}>Notification Preferences</h5>

              {/* Email Notifications */}
              <div className="d-flex justify-content-between align-items-center mb-3 p-3 rounded" style={styles.notificationToggleContainer}>
                <div>
                  <h6 className="mb-1">Email Notifications</h6>
                  <p className="text-muted mb-0" style={styles.notificationDescription}>Receive important updates and plant care reminders via email.</p>
                </div>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="emailNotifications"
                    checked={emailNotifications}
                    onChange={handleEmailNotificationsToggle}
                    style={styles.toggleSwitch}
                  />
                  <label className="form-check-label" htmlFor="emailNotifications"></label>
                </div>
              </div>

              {/* Push Notifications */}
              <div className="d-flex justify-content-between align-items-center mb-3 p-3 rounded" style={styles.notificationToggleContainer}>
                <div>
                  <h6 className="mb-1">Push Notifications</h6>
                  <p className="text-muted mb-0" style={styles.notificationDescription}>Get instant alerts on your device (if app installed).</p>
                </div>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="pushNotifications"
                    checked={pushNotifications}
                    onChange={() => setPushNotifications(!pushNotifications)}
                    style={styles.toggleSwitch}
                  />
                  <label className="form-check-label" htmlFor="pushNotifications"></label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Inline styles for the component to match the image
const styles = {
  profileContainer: {
    minHeight: 'calc(100vh - 90px)',
    paddingTop: '20px',
    backgroundColor: 'var(--background)',
    fontFamily: '"Inter", sans-serif',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  card: {
    width: '100%',
    maxWidth: '600px',
    borderRadius: '15px',
    backgroundColor: '#FCF8E3',
    border: 'none',
    marginTop: '0.5rem',
    marginBottom: '2rem',
  },
  icon: {
    color: '#8BC34A',
  },
  headerText: {
    color: '#4CAF50',
  },
  sectionHeader: {
    color: '#689F38',
  },
  inputField: {
    backgroundColor: '#F9F7E8',
    borderRadius: '8px',
    border: '1px solid #E0E0E0',
    padding: '10px 15px',
  },
  link: {
    color: '#8BC34A',
    textDecoration: 'none',
  },
  notificationToggleContainer: {
    backgroundColor: '#F9F7E8',
    borderRadius: '10px',
    border: '1px solid #E0E0E0',
  },
  notificationDescription: {
    fontSize: '0.9rem',
  },
  toggleSwitch: {
    '--bs-form-switch-bg': 'url("data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%27-4 -4 8 8%27%3e%3ccircle r=%273%27 fill=%27%23fff%27/%3e%3c/svg%3e") !important',
    backgroundColor: '#D1E7DD',
    borderColor: '#28A745',
    width: '3.5rem',
    height: '2rem',
  },
  weatherCard: {
    background: 'linear-gradient(135deg, #f5f5dc 0%, #e6f4ea 100%)',
    backdropFilter: 'blur(5px)',
    borderRadius: '16px',
    padding: '20px 30px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.3s ease',
    border: '1px solid rgba(200,200,200,0.4)',
  }
};

export default Profile;