import React, { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    emailAddress: '',
    message: ''
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    const API_BASE_URL = "http://localhost:5000"; // Corrected API base URL

    try {
      const response = await fetch(`${API_BASE_URL}/contact`, { // Corrected endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      if (response.ok) {
        setStatus("Message sent successfully! ✅");
        setFormData({ fullName: '', emailAddress: '', message: '' });
      } else {
        setStatus(result.message || "Failed to send message ❌");
      }
    } catch (error) {
      console.error(error);
      setStatus("Error sending message ❌");
    }
  };

  return (
    <>
      <style>
        {`
          .min-vh-100 {
            min-height: 100vh;
          }

          .bg-overall-yellowish-green {
            background-color: hsl(60, 56%, 91%) !important;
          }

          .text-dark-green {
            color: #4CAF50;
          }

          .card {
            border: none;
            border-radius: 1rem;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          .card:hover {
            transform: scale(1.02);
            box-shadow: 0 1rem 1.5rem rgba(0, 0, 0, 0.15);
          }

          .rounded-lg {
            border-radius: 1rem !important;
          }

          .custom-input {
            border: 2px solid #a0a0a0;
            background-color: hsl(60, 56%, 91%) !important;
            font-size: 0.95rem;
            transition: all 0.3s ease;
          }

          .custom-input:focus {
            border-color: #8BC34A;
            box-shadow: 0 0 0 0.25rem rgba(139, 195, 74, 0.25);
          }

          .btn-success {
            background-color: #6c8d5c;
            border-color: #6c8d5c;
            font-weight: 600;
            transition: all 0.3s ease;
          }

          .btn-success:hover {
            background-color: #5a7a4a;
            border-color: #5a7a4a;
            transform: translateY(-2px);
          }

          .hover-shadow-btn:hover {
            box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
          }

          .social-icons a {
            transition: transform 0.3s ease, color 0.3s ease;
          }

          .hover-scale-icon:hover {
            transform: scale(1.2);
          }

          .text-instagram {
            color: #C13584;
          }

          .text-twitter {
            color: #1DA1F2;
          }

          .text-youtube {
            color: #FF0000;
          }

          .text-whatsapp {
            color: #25D366;
            right:5px;
          }

          .compact-card {
            padding: 1.5rem !important;
            flex-grow: 0 !important;
            height: fit-content;
          }

          .contact-card {
            background-color: #f1f8e9 !important;
          }

          .follow-card {
            background-color: #f1f8e9 !important;
          }

          .form-container-col .card {
            width: 90%;
            margin: auto;
            padding: 1.5rem 2rem !important;
            background-color: #f1f8e9 !important;
          }

          @media (max-width: 768px) {
            .display-5 {
              font-size: 2.5rem;
            }
            .lead {
              font-size: 1rem;
            }
            .btn-lg {
              font-size: 1rem;
              padding: 0.75rem 1.25rem;
            }
            .form-container-col {
              width: 100%;
            }
            .form-container-col .card {
              width: 100%;
            }
          }
        `}
      </style>

      <div className="d-flex flex-column justify-content-center align-items-center py-5 bg-overall-yellowish-green">
        <div className="container">
          {/* Get in Touch Header */}
          <section className="text-center mb-5">
            {/* Centered Font Awesome Message Icon */}
            <div
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundColor: '#c5e1a5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
              }}
            >
              <i className="fas fa-comment-dots fa-2x text-dark-green"></i>
            </div>

            <h1 className="display-5 fw-bold text-dark-green mb-3">Get in Touch</h1>
            <p className="lead text-muted px-4 px-md-0 mx-auto" style={{ maxWidth: '600px' }}>
              Have a question, suggestion, or just want to say hello? We'd love to hear from you!
            </p>
          </section>

          {/* Contact Form & Info Section */}
          <section className="row justify-content-center">
            {/* Form Section */}
            <div className="col-lg-5 mb-4 form-container-col">
              <div className="card shadow-sm p-4 rounded-lg">
                <div className="card-body">
                  <h5 className="card-title fw-bold mb-3 text-dark-green">✉ Send Us a Message</h5>
                  <p className="card-text text-muted mb-4">
                    Fill out the form and we'll get back to you ASAP! 🚀
                  </p>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="fullName" className="form-label text-muted">👤 Full Name</label>
                      <input
                        type="text"
                        className="form-control rounded-pill py-2 px-3 custom-input"
                        id="fullName"
                        placeholder="Your name"
                        value={formData.fullName}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="emailAddress" className="form-label text-muted">📧 Email Address</label>
                      <input
                        type="email"
                        className="form-control rounded-pill py-2 px-3 custom-input"
                        id="emailAddress"
                        placeholder="you@example.com"
                        value={formData.emailAddress}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="message" className="form-label text-muted">📝 Message</label>
                      <textarea
                        className="form-control rounded-lg py-2 px-3 custom-input"
                        id="message"
                        rows="5"
                        placeholder="Tell us how we can help..."
                        value={formData.message}
                        onChange={handleChange}
                      ></textarea>
                    </div>

                    <button type="submit" className="btn btn-success btn-lg rounded-pill w-100 hover-shadow-btn">
                      🚀 Send Message
                    </button>

                    {/* Optional status message */}
                    {status && (
                      <p className="text-center mt-3 text-muted">{status}</p>
                    )}
                  </form>
                </div>
              </div>
            </div>

            {/* Contact Info + Socials */}
            <div className="col-lg-4">
              <div className="d-flex flex-column h-100">
                {/* Contact Info Card */}
                <div className="card shadow-sm p-4 mb-4 rounded-lg compact-card contact-card">
                  <div className="card-body">
                    <h5 className="card-title fw-bold mb-3 text-dark-green">📞 Contact Information</h5>
                    <p className="card-text">
                      <i className="fas fa-envelope me-2 text-danger"></i>
                      <a href="mailto:growlifyai@gmail.com" className="text-decoration-none text-muted">growlifyai@gmail.com</a>
                    </p>
                  </div>
                </div>

                {/* Follow Us Card */}
                <div className="card shadow-sm p-4 rounded-lg compact-card follow-card">
                  <div className="card-body">
                    <h5 className="card-title fw-bold mb-3 text-dark-green">🌐 Follow Us</h5>
                    <div className="d-flex social-icons justify-content-center">
                      <a href="https://www.instagram.com/growlifyai?igsh=MWpjZ21wMGhmNDk0bA==" target="_blank" rel="noopener noreferrer" className="me-3 hover-scale-icon text-instagram">
                        <i className="fab fa-instagram fa-2x"></i>
                      </a>
                      <a href="https://twitter.com/growlify" target="_blank" rel="noopener noreferrer" className="me-3 hover-scale-icon text-twitter">
                        <i className="fab fa-twitter fa-2x"></i>
                      </a>
                      <a href="https://youtube.com/@growlify-ai?si=gTwtJLPJzGciOVll" target="_blank" rel="noopener noreferrer" className="me-3 hover-scale-icon text-youtube">
                        <i className="fab fa-youtube fa-2x"></i>
                      </a>
                      <a href="https://wa.me/918056107634" target="_blank" rel="noopener noreferrer" className="hover-scale-icon text-whatsapp">
                        <i className="fab fa-whatsapp fa-2x"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default Contact;