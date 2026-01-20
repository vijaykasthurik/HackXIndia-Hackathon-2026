import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useNavigate} from 'react-router-dom';

const API_BASE_URL = 'http://localhost:5000/api';

function SignupLogin({ defaultTab = "signup" }) {
    const navigate = useNavigate();


    const [isLoginView, setIsLoginView] = useState(defaultTab === "login");

    const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(false);
    const [showResetPasswordForm, setShowResetPasswordForm] = useState(false);
    const [resetEmail, setResetEmail] = useState('');
    const [form, setForm] = useState({
        name: '', email: '', password: '', confirmPassword: '',
        pincode: '', country: '', state: '', district: '', otp: ''
    });
    const [dropdowns, setDropdowns] = useState({ countries: [], states: [], districts: [] });
    const [showSignupOTPPage, setShowSignupOTPPage] = useState(false);
    const [message, setMessage] = useState('');
    const [resendCooldown, setResendCooldown] = useState(0);

    const [weatherData, setWeatherData] = useState(null);
    const [userCity, setUserCity] = useState('');

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('currentUser'));
        const city = storedUser?.city || localStorage.getItem('signupCity');
        if (city) {
            setUserCity(city);
            const fetchWeather = async () => {
                try {
                    const apiKey = process.env.WEATHER_API_KEY;
                    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
                    const { temp } = response.data.main;
                    const description = response.data.weather[0].description;
                    setWeatherData({ temp, description });
                } catch (err) {
                    setWeatherData({ temp: 'N/A', description: 'Could not fetch weather' });
                }
            };
            fetchWeather();
        }
    }, []);

    useEffect(() => {
        if (resendCooldown > 0) {
            const timer = setInterval(() => {
                setResendCooldown(prev => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [resendCooldown]);

    const handleChange = (e) => {
        setMessage('');
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleResetEmailChange = (e) => {
        setMessage('');
        setResetEmail(e.target.value);
    };
    const handlePincode = async () => {
        if (form.pincode.length !== 6) {
            setDropdowns({ countries: [], states: [], districts: [] });
            return;
        }
        try {
            const { data } = await axios.get(`https://api.postalpincode.in/pincode/${form.pincode}`);
            const apiResponse = data[0];
            if (apiResponse.Status === 'Success') {
                const postOffice = apiResponse.PostOffice[0];
                const uniqueDistricts = [...new Set(apiResponse.PostOffice.map(p => p.District))];
                setForm(prev => ({
                    ...prev,
                    country: postOffice.Country,
                    state: postOffice.State,
                    district: postOffice.District
                }));
                setDropdowns({
                    countries: [postOffice.Country],
                    states: [postOffice.State],
                    districts: uniqueDistricts
                });
            } else {
                setMessage('Invalid PIN Code');
                setDropdowns({ countries: [], states: [], districts: [] });
            }
        } catch (err) {
            setMessage('Error fetching location details. Please check the PIN code.');
        }
    };

    // --- START OF MODIFIED sendSignupOTP FUNCTION ---
    const sendSignupOTP = async () => {
        if (!form.email) {
            setMessage('Please enter your email address first.');
            return false; // Indicate failure
        }
        try {
            setMessage('Sending OTP for signup...');
            const { data } = await axios.post(`${API_BASE_URL}/send-otp`, { email: form.email });
            setMessage(data.message);
            setResendCooldown(30);
            return true; // Indicate success
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Failed to send OTP. Please try again later.';
            setMessage(errorMsg);
            return false; // Indicate failure
        }
    };
    // --- END OF MODIFIED sendSignupOTP FUNCTION ---

    const sendResetOTP = async () => {
        if (!resetEmail) {
            setMessage('Please enter your email address for password reset.');
            return;
        }
        try {
            setMessage('Sending password reset OTP...');
            const { data } = await axios.post(`${API_BASE_URL}/send-reset-otp`, { email: resetEmail });
            setMessage(data.message);
            setResendCooldown(30);
            setShowResetPasswordForm(true);
            setShowForgotPasswordForm(false);
        } catch (err) {
            setMessage(err.response?.data?.message || 'Failed to send reset OTP. Please try again later.');
        }
    };
    const handleSignup = async () => {
        if (form.password !== form.confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }
        if (!form.name || !form.email || !form.password || !form.confirmPassword || !form.pincode || !form.district || !form.state || !form.country || !form.otp) {
            setMessage('Please fill all fields and enter the OTP.');
            return;
        }
        try {
            setMessage('Registering account...');
            const { data } = await axios.post(`${API_BASE_URL}/signup`, {
                name: form.name,
                email: form.email,
                password: form.password,
                confirmPassword: form.confirmPassword,
                city: form.district,
                state: form.state,
                pincode: form.pincode,
                otp: form.otp
            });
            setMessage(data.message || "Signup successful!");
            const registeredEmail = form.email;
            localStorage.setItem('signupCity', form.district);
            resetFormStates();
            setIsLoginView(true);
            setForm(prev => ({ ...prev, email: registeredEmail }));
            setMessage("✅ Signup successful! Please log in to continue."); // FIX 1 applied here
        } catch (err) {
            setMessage(err.response?.data?.message || "An unexpected error occurred during signup.");
        }
    };
    const handleLogin = async () => {
        if (!form.email || !form.password) {
            setMessage("Please enter both email and password.");
            return;
        }
        try {
            setMessage('Logging in...');
            const { data } = await axios.post(`${API_BASE_URL}/login`, { email: form.email, password: form.password });
            setMessage(data.message + " Redirecting to dashboard...");
            localStorage.setItem('token', data.token);
            localStorage.setItem('currentUser', JSON.stringify(data.user));
            navigate('/'); // FIX 2: Standard react-router-dom navigation.
                               // If you are using a custom navigation function like 'onNavigate',
                               // replace 'navigate('/home')' with 'onNavigate('home')'.
        } catch (err) {
            setMessage(err.response?.data?.message || "Login failed. Please check your email and password.");
        }
    };
    const handleResetPassword = async () => {
        if (form.password !== form.confirmPassword) {
            setMessage("New passwords do not match.");
            return;
        }
        if (!form.otp || !form.password || !form.confirmPassword) {
            setMessage("Please enter OTP and your new password.");
            return;
        }
        try {
            setMessage('Resetting password...');
            const { data } = await axios.post(`${API_BASE_URL}/reset-password`, {
                email: resetEmail,
                otp: form.otp,
                newPassword: form.password
            });
            setMessage(data.message + " Your password has been reset. You can now log in.");
            setShowResetPasswordForm(false);
            setIsLoginView(true);
            setForm({ name: '', email: '', password: '', confirmPassword: '', pincode: '', country: '', state: '', district: '', otp: '' });
            setResetEmail('');
        } catch (err) {
            setMessage(err.response?.data?.message || "Failed to reset password. Please try again.");
        }
    };
    const resetFormStates = () => {
        setForm({ name: '', email: '', password: '', confirmPassword: '', pincode: '', country: '', state: '', district: '', otp: '' });
        setDropdowns({ countries: [], states: [], districts: [] });
        setShowSignupOTPPage(false);
        setShowForgotPasswordForm(false);
        setShowResetPasswordForm(false);
        setResetEmail('');
        setResendCooldown(0);
    };

    const renderCurrentForm = () => {
        if (showForgotPasswordForm) return renderForgotPasswordForm();
        if (showResetPasswordForm) return renderResetPasswordForm();
        return isLoginView ? renderLoginForm() : renderSignupForm();
    };

    const renderLoginForm = () => (
        <div className="form-content">
            <h4 className="form-title">Welcome Back!</h4>
            <p className="form-subtitle">Log in to access your garden dashboard.</p>

            <div className="form-group-full">
                <label className="form-label">Email</label>
                <input
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    className="form-input"
                    onChange={handleChange}
                    value={form.email}
                />
            </div>

            <div className="form-group-full">
                <label className="form-label">Password</label>
                <input
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    className="form-input"
                    onChange={handleChange}
                    value={form.password}
                />
            </div>

            <button
                className="form-button"
                onClick={handleLogin}
            >
                Log In
            </button>

            <div className="form-footer">
                <button className="form-link"
                    onClick={(e) => {
                        e.preventDefault();
                        setShowForgotPasswordForm(true);
                        setIsLoginView(false);
                        setMessage('');
                        setForm(prev => ({ ...prev, email: '', password: '' }));
                    }}
                >
                    Forgot Password?
                </button>
            </div>
        </div>
    );
    const renderSignupForm = () => (
        <>
            {showSignupOTPPage ? renderSignupOTPForm() : (
                <div className="form-content">
                    <h4 className="form-title">Create an Account</h4>
                    <p className="form-subtitle">Join Growlify AI to start your smart garden.</p>

                    <div className="form-group-full">
                        <label className="form-label">Full Name</label>
                        <input
                            name="name"
                            placeholder="Enter your full name"
                            className="form-input"
                            onChange={handleChange}
                            value={form.name}
                        />
                    </div>
                    <div className="form-group-full">
                        <label className="form-label">Email</label>
                        <input
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            className="form-input"
                            onChange={handleChange}
                            value={form.email}
                        />
                    </div>
                    <div className="form-grid">
                        <div className="form-group">
                            <label className="form-label">Password</label>
                            <input
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                className="form-input"
                                onChange={handleChange}
                                value={form.password}
                            />
                            {form.password && (() => {
                                const { label, color } = getPasswordStrength(form.password);
                                return (
                                    <div style={{
                                        color,
                                        fontSize: '0.85rem',
                                        marginTop: '0.25rem',
                                        textAlign: 'left'
                                    }}>
                                        Password strength: <strong>{label}</strong>
                                    </div>
                                );
                            })()}
                        </div>
                        <div className="form-group">
                            <label className="form-label">Confirm Password</label>
                            <input
                                name="confirmPassword"
                                type="password"
                                placeholder="••••••••"
                                className="form-input"
                                onChange={handleChange}
                                value={form.confirmPassword}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">PIN Code</label>
                            <input
                                name="pincode"
                                placeholder="6-digit PIN"
                                className="form-input"
                                onChange={handleChange}
                                onBlur={handlePincode}
                                maxLength="6"
                                value={form.pincode}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">District</label>
                            <select
                                name="district"
                                className="form-input"
                                value={form.district}
                                onChange={handleChange}
                            >
                                <option value="">Select District</option>
                                {dropdowns.districts.map(d => <option key={d} value={d}>{d}</option>)}
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label">State</label>
                            <select
                                name="state"
                                className="form-input"
                                value={form.state}
                                onChange={handleChange}
                                disabled
                            >
                                <option value="">Select State</option>
                                {dropdowns.states.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Country</label>
                            <select
                                name="country"
                                className="form-input"
                                value={form.country}
                                onChange={handleChange}
                                disabled
                            >
                                <option value="">Select Country</option>
                                {dropdowns.countries.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* --- START OF MODIFIED BUTTON LOGIC --- */}
                    <button
                        className="form-button"
                        onClick={async () => { // Made async to await sendSignupOTP
                            if (form.name && form.email && form.password && form.confirmPassword && form.pincode && form.district && form.password === form.confirmPassword) {
                                const success = await sendSignupOTP(); // Await OTP send result
                                if (success) {
                                    setShowSignupOTPPage(true); // Only proceed if OTP sent successfully
                                }
                            } else {
                                setMessage('Please fill all required fields and ensure passwords match before proceeding.');
                            }
                        }}
                    >
                        Proceed to Verification
                    </button>
                    {/* --- END OF MODIFIED BUTTON LOGIC --- */}
                </div>
            )}
        </>
    );
    const renderSignupOTPForm = () => (
        <div className="form-content">
            <h5 className="form-title">Email Verification</h5>
            <p className="form-subtitle">Enter the 6-digit OTP sent to <br /><b className="form-strong">{form.email}</b></p>

            <div className="form-group-full">
                <label className="form-label">Enter OTP</label>
                <input
                    name="otp"
                    placeholder="• • • • • •"
                    className="form-input otp-input"
                    onChange={handleChange}
                    maxLength="6"
                    value={form.otp}
                />
            </div>

            <button
                className="form-button"
                onClick={handleSignup}
            >
                Verify & Create Account
            </button>

            <div className="form-footer-multi">
                <button
                    className="form-link"
                    disabled={resendCooldown > 0}
                    onClick={sendSignupOTP}
                >
                    {resendCooldown > 0 ? `Resend OTP in ${resendCooldown}s` : 'Resend OTP'}
                </button>
                <button
                    className="form-link-secondary"
                    onClick={() => setShowSignupOTPPage(false)}
                >
                    Back to Signup
                </button>
            </div>
        </div>
    );
    const renderForgotPasswordForm = () => (
        <div className="form-content">
            <h5 className="form-title">Forgot Password?</h5>
            <p className="form-subtitle">Enter your email to receive a password reset OTP.</p>

            <div className="form-group-full">
                <label className="form-label">Email</label>
                <input
                    name="resetEmail"
                    type="email"
                    placeholder="you@example.com"
                    className="form-input"
                    onChange={handleResetEmailChange}
                    value={resetEmail}
                />
            </div>

            <button
                className="form-button"
                onClick={sendResetOTP}
            >
                Send Reset OTP
            </button>

            <div className="form-footer">
                <button
                    className="form-link-secondary"
                    onClick={() => {
                        setShowForgotPasswordForm(false);
                        setIsLoginView(true);
                        setMessage('');
                        setResetEmail('');
                    }}
                >
                    Back to Login
                </button>
            </div>
        </div>
    );
    const renderResetPasswordForm = () => (
        <div className="form-content">
            <h5 className="form-title">Reset Your Password</h5>
            <p className="form-subtitle">Enter the OTP sent to <br /><b className="form-strong">{resetEmail}</b> and your new password.</p>

            <div className="form-group-full">
                <label className="form-label">Enter OTP</label>
                <input
                    name="otp"
                    placeholder="• • • • • •"
                    className="form-input otp-input"
                    onChange={handleChange}
                    maxLength="6"
                    value={form.otp}
                />
            </div>

            <div className="form-group-full">
                <label className="form-label">New Password</label>
                <input
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    className="form-input"
                    onChange={handleChange}
                    value={form.password}
                />
            </div>

            <div className="form-group-full">
                <label className="form-label">Confirm New Password</label>
                <input
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    className="form-input"
                    onChange={handleChange}
                    value={form.confirmPassword}
                />
            </div>

            <button
                className="form-button"
                onClick={handleResetPassword}
            >
                Reset Password
            </button>

            <div className="form-footer-multi">
                <button
                    className="form-link"
                    disabled={resendCooldown > 0}
                    onClick={sendResetOTP}
                >
                    {resendCooldown > 0 ? `Resend OTP in ${resendCooldown}s` : 'Resend OTP'}
                </button>
                <button
                    className="form-link-secondary"
                    onClick={() => {
                        setShowResetPasswordForm(false);
                        setShowForgotPasswordForm(true);
                        setForm(prev => ({ ...prev, otp: '', password: '', confirmPassword: '' }));
                    }}
                >
                    Back
                </button>
            </div>
        </div>
    );

    const getPasswordStrength = (password) => {
        if (!password) return { label: '', color: '' };

        const lengthOK = password.length >= 8;
        const hasUpper = /[A-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecial = /[@$!%*?&]/.test(password);

        const passedChecks = [lengthOK, hasUpper, hasNumber, hasSpecial].filter(Boolean).length;

        if (passedChecks <= 1) return { label: 'Weak', color: 'red' };
        if (passedChecks === 2 || passedChecks === 3) return { label: 'Fair', color: 'orange' };
        if (passedChecks === 4) return { label: 'Strong', color: 'green' };

        return { label: '', color: '' };
    };

    return (
        <div className="signup-login-container">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

                :root {
                    --bg-page: #F5F5DC; /* Changed page background to beige */
                    --bg-card: #f7f7e3; /* Kept card background white */
                    --bg-input: rgb(219,219,189);
                    --brand-green: #3B873E;
                    --brand-green-darker: #306C32;
                    --text-dark: #3A3A3A;
                    --text-light: #6B7280;
                    --border-color: #E5E7EB;
                    --radius: 0.75rem;
                    --error-bg: #FEE2E2;
                    --error-text: #B91C1C;
                    --success-bg: #D1FAE5;
                    --success-text: #065F46;
                }

                .signup-login-container {
                    font-family: 'Inter', sans-serif;
                    background-color: var(--bg-page);
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 1rem;
                }
                .card-wrapper {
                    background-color: var(--bg-card);
                    padding: 2.5rem;
                    border-radius: 1.25rem;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
                    width: 100%;
                    max-width: 32rem;
                }
                .tab-switcher {
                    display: flex;
                    border-bottom: 2px solid var(--border-color);
                    margin-bottom: 2.5rem;
                }
                .tab-button {
                    flex: 1;
                    padding-bottom: 1rem;
                    text-align: center;
                    font-weight: 500;
                    font-size: 1.125rem;
                    color: var(--text-light);
                    border-bottom: 3px solid transparent;
                    cursor: pointer;
                    transition: all 0.2s;
                    background: none;
                    border-top: none;
                    border-left: none;
                    border-right: none;
                }
                .tab-button.active {
                    color: var(--brand-green);
                    font-weight: 600;
                    border-bottom-color: var(--brand-green);
                }
                .form-content {
                    text-align: center;
                }
                .form-title {
                    font-size: 1.75rem;
                    font-weight: 700;
                    color: var(--text-dark);
                    margin-bottom: 0.5rem;
                }
                h5.form-title {
                    font-size: 1.5rem;
                }
                .form-subtitle {
                    color: var(--text-light);
                    margin-bottom: 2rem;
                    line-height: 1.5;
                }
                .form-group, .form-group-full {
                    margin-bottom: 1.25rem;
                    text-align: left;
                }
                .form-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1rem;
                    text-align: left;
                    margin-bottom: 1.25rem;
                }
                .form-label {
                    display: block;
                    margin-bottom: 0.5rem;
                    font-size: 0.875rem;
                    color: #444;
                    font-weight: 500;
                }
                .form-input {
                    width: 100%;
                    padding: 0.75rem 1rem;
                    background-color: var(--bg-input);
                    border: 1px solid var(--bg-input);
                    border-radius: var(--radius);
                    color: var(--text-dark);
                    transition: border-color 0.2s, box-shadow 0.2s;
                    -webkit-appearance: none;
                    appearance: none;
                    font-size: 1rem;
                    box-sizing: border-box;
                }
                .form-input::placeholder {
                    color: #9CA3AF;
                }
                .form-input:focus {
                    outline: none;
                    border-color: var(--brand-green);
                    box-shadow: 0 0 0 2px rgba(59, 135, 62, 0.2);
                }
                .form-input:disabled {
                    background-color:rgb(219,219,189);
                    cursor: not-allowed;
                }
                select.form-input {
                    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
                    background-position: right 0.5rem center;
                    background-repeat: no-repeat;
                    background-size: 1.5em 1.5em;
                }
                .otp-input {
                    text-align: center;
                    letter-spacing: 0.5em;
                }
                .form-button {
                    width: 100%;
                    background-color: var(--brand-green);
                    color: white;
                    padding: 0.875rem;
                    border-radius: var(--radius);
                    font-weight: 600;
                    font-size: 1rem;
                    margin-top: 1.5rem;
                    transition: background-color 0.2s;
                    border: none;
                    cursor: pointer;
                }
                .form-button:hover {
                    background-color: var(--brand-green-darker);
                }
                .form-footer {
                    text-align: center;
                    margin-top: 1rem;
                }
                .form-footer-multi {
                    text-align: center;
                    margin-top: 1rem;
                    display: flex;
                    justify-content: center;
                    gap: 1.5rem;
                }
                .form-link, .form-link-secondary {
                    color: var(--brand-green);
                    font-weight: 500;
                    font-size: 0.875rem;
                    text-decoration: none;
                    background: none;
                    border: none;
                    cursor: pointer;
                    padding:0;
                }
                .form-link:hover, .form-link-secondary:hover {
                    text-decoration: underline;
                }
                .form-link:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }
                .form-link-secondary {
                    color: var(--text-light);
                }
                .form-strong {
                    color: var(--text-dark);
                    font-weight: 600;
                }
                .message-alert {
                    padding: 1rem;
                    border-radius: 0.5rem;
                    margin-bottom: 1.5rem;
                    text-align: center;
                    font-weight: 500;
                }

                .message-alert.error {
                    background-color: var(--error-bg);
                    color: var(--error-text);
                }

                .message-alert.success {
                    background-color: var(--success-bg);
                    color: var(--success-text);
                }
                @media (max-width: 600px) {
                    .card-wrapper {
                        padding: 1.5rem;
                    }
                    .form-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>

            <div className="card-wrapper mt-4">

                {/* 🌦️ Weather Display */}
                {userCity && weatherData && (
                    <div style={{
                        marginBottom: '1rem',
                        padding: '0.75rem',
                        backgroundColor: '#E6FFE6',
                        borderRadius: '0.75rem',
                        textAlign: 'center',
                        color: '#065F46',
                        fontWeight: '500',
                        fontSize: '0.95rem'
                    }}>
                        🌤️ Weather in <b>{userCity}</b>: {weatherData.temp}°C, {weatherData.description}
                    </div>
                )}

                {/* Tab Switcher */}
                {!showForgotPasswordForm && !showResetPasswordForm && (
                    <div className="tab-switcher">
                        <button
                            className={`tab-button ${!isLoginView ? 'active' : ''}`}
                            onClick={() => { setIsLoginView(false); resetFormStates(); }}
                        >
                            Sign Up
                        </button>
                        <button
                            className={`tab-button ${isLoginView ? 'active' : ''}`}
                            onClick={() => { setIsLoginView(true); resetFormStates(); }}
                        >
                            Log In
                        </button>
                    </div>
                )}

                {/* Message Display */}
                {message && (
                  <div className={`message-alert ${
                    /(fail|invalid|error|already|not match|please|required|expired|incorrect|exist)/i.test(message)
                      ? 'error'
                      : 'success'
                  }`}>
                    {message}
                  </div>
                )}

                {/* Render Form */}
                {renderCurrentForm()}
            </div>
        </div>
    );
}
export default SignupLogin;