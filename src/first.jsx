import React from 'react';
import { Link } from 'react-router-dom'; // Import the Link component

// New component for the original GrowlifyApp's main content (Hero, Features, etc.)
const HomePageContent = () => { // Removed the onNavigate prop
  
  return (
    <>
      {/* Hero Section */}
      <header className="container text-center py-5 section-padding" id="home">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-8">
            <div className="d-flex justify-content-center align-items-center mb-4">
              <i className="bi bi-tree text-dark-green me-3" style={{ fontSize: '3rem' }}></i>
              <h1 className="display-4 fw-bold mb-0">Grow Smarter, Live Greener</h1>
            </div>
            <p className="lead mb-4">
              Growlify helps city residents grow their own vegetables, herbs, and plants at home using AI-based personalized tips, care schedules, and plant health support.
            </p>
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
              {/* Use Link component for navigation */}
              <Link to="/my-garden" className="btn btn-lg btn-custom-green">Get Started</Link>
              <Link to="/about" className="btn btn-lg btn-outline-custom">Learn How It Works</Link>
            </div>
          </div>
        </div>
      </header>

      {/* Why Urban Farming? Section */}
      <section className="container text-center py-5 section-padding" id="why-urban-farming">
        <h2 className="mb-5 display-5 fw-bold">Why Urban Farming?</h2>
        <div className="row justify-content-center g-4">
          <div className="col-md-4">
            <div className="card h-100 p-4">
              <div className="card-body">
                <span className="card-emoji" role="img" aria-label="leaf-emoji">🍃</span>
                <h5 className="card-title fw-bold">Fresher Food</h5>
                <p className="card-text">
                  Enjoy nutritious, pesticide-free produce grown by you.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 p-4">
              <div className="card-body">
                <span className="card-emoji" role="img" aria-label="city-emoji">🏙️</span>
                <h5 className="card-title fw-bold">Greener Cities</h5>
                <p className="card-text">
                  Contribute to a more sustainable urban environment.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 p-4">
              <div className="card-body">
                <span className="card-emoji" role="img" aria-label="heart-emoji">💖</span>
                <h5 className="card-title fw-bold">Mindful Hobby</h5>
                <p className="card-text">
                  Connect with nature and reduce stress through gardening.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Powerful Features Section */}
      <section className="container text-center py-5 section-padding" id="features-section">
        <h2 className="mb-5 display-5 fw-bold">Powerful Features at Your Fingertips</h2>
        <div className="row justify-content-center g-4">
          <div className="col-md-4">
            <div className="card h-100">
              <div className="image-placeholder">
                <img src="img1.jpg" alt="AI Plant Diagnosis" />
              </div>
              <div className="card-body">
                <h5 className="card-title fw-bold">AI Plant Diagnosis</h5>
                <p className="card-text">
                  Upload a photo and get instant health insights.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100">
              <div className="image-placeholder">
                <img src="img2.jpg" alt="Personalized Care" />
              </div>
              <div className="card-body">
                <h5 className="card-title fw-bold">Personalized Care</h5>
                <p className="card-text">
                  Tailored advice for your specific plants and space.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100">
              <div className="image-placeholder">
                <img src="img4.png" alt="Watering Reminders" />
              </div>
              <div className="card-body">
                <h5 className="card-title fw-bold">Watering Reminders</h5>
                <p className="card-text">
                  Never miss a watering session again.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 d-flex justify-content-center">
          {/* Use Link for "See All Features" */}
          <Link to="/features" className="btn btn-link text-success text-decoration-none fw-bold">See All Features &rarr;</Link>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container text-center py-5 section-padding" id="testimonials">
        <h2 className="mb-5 display-5 fw-bold">Loved by Urban Gardeners</h2>
        <div className="row justify-content-center g-4">
          <div className="col-md-6">
            <div className="card h-100 p-4">
              <div className="card-body d-flex align-items-start text-start">
                <i className="bi bi-chat-quote-fill text-success me-3" style={{ fontSize: '1.5rem', opacity: 0.7 }}></i>
                <div>
                  <p className="lead mb-2">
                    "Growlify made my balcony garden thrive! The AI diagnosis is a lifesaver."
                  </p>
                  <p className="fw-bold mb-0">- Sarah L.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card h-100 p-4">
              <div className="card-body d-flex align-items-start text-start">
                <i className="bi bi-chat-quote-fill text-success me-3" style={{ fontSize: '1.5rem', opacity: 0.7 }}></i>
                <div>
                  <p className="lead mb-2">
                    "Finally, a gardening app that understands city living. Highly recommend!"
                  </p>
                  <p className="fw-bold mb-0">- Mike P.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action (CTA) Section */}
      <section className="bg-light-green py-5 section-padding text-center cta-section rounded-4" id="call-to-action">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-10 col-lg-8">
              <h2 className="mb-4 display-5 fw-bold">Ready to Start Your Urban Garden?</h2>
              <p className="lead mb-5">
                Join Growlify today and transform your urban space into a green oasis.
              </p>
              {/* Use Link for "Sign Up" */}
              <Link
  to="/auth"
  className="btn rounded-pill fw-semibold"
  style={{
    backgroundColor: '#28a745',
    color: '#fff',
    padding: '10px 24px',
    fontSize: '16px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    border: 'none',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
    display: 'inline-block'
  }}
  onMouseEnter={(e) => {
    e.target.style.backgroundColor = '#218838';
    e.target.style.boxShadow = '0 4px 12px rgba(0, 128, 0, 0.2)';
  }}
  onMouseLeave={(e) => {
    e.target.style.backgroundColor = '#28a745';
    e.target.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)';
  }}
>
  Sign Up Now
</Link>


            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// Main GrowlifyApp component now acts as a content wrapper, NOT a layout provider.
// It previously imported Navbar and Footer, which are now moved to App.js.
// It also contained all the global CSS, which is now moved to App.js.
const GrowlifyAppContent = ({ children }) => { // Renamed from GrowlifyApp to GrowlifyAppContent
  return (
    // Only renders its children. No Navbar, Footer, or global CSS here anymore.
    // The main content area's padding-top will be handled in App.js.
    <>{children}</>
  );
};

export default GrowlifyAppContent; // Export the renamed component
export { HomePageContent };