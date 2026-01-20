import React from 'react';

function About({ onNavigate }) {
  return (
    <div className="min-h-screen font-sans">
      <style>
        {`
        :root {
            --main-bg: hsl(60, 56%, 91%);
            --section-bg: #F0EFEA;
            --text-dark: #1f1f1f;
            --text-medium: #333333;
            --text-light: #5A5A5A;
            --primary-accent: #4CAF50;
            --light-accent: #E6F0E6;
            --border-light: #EAEAEA;
            --hover-box: #fffde7;
            --mission-bg-color: var(--hover-box);
        }

        h1, h2, h3, h4, h5, h6 {
            color: var(--text-dark);
            font-weight: 600;
        }

        .lead {
            color: var(--text-medium);
        }

        .btn-custom {
            background-color: var(--primary-accent);
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 0.5rem;
            transition: all 0.3s ease;
        }

        .btn-custom:hover {
            background-color: #388E3C;
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.15);
        }

        .icon-circle {
            width: 70px;
            height: 70px;
            border-radius: 50%;
            background-color: var(--light-accent);
            display: flex;
            justify-content: center;
            align-items: center;
            color: var(--primary-accent);
            margin: 0 auto 1.5rem auto;
            font-size: 2rem;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .icon-circle:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 12px rgba(0,0,0,0.1);
        }

        .img-fluid-rounded {
            border-radius: 10px;
            transition: transform 0.3s ease;
        }

        .img-fluid-rounded:hover {
            transform: scale(1.03);
        }

        .mission-section {
            background: var(--mission-bg-color);
            border-radius: 16px;
            padding: 4rem 2rem;
            box-shadow: 0 8px 20px rgba(0,0,0,0.05);
        }

        .text-secondary {
            color: var(--text-light);
            font-size: 1.125rem;
        }

        .fw-bold {
            font-weight: 700;
        }

        .fs-3 {
            font-size: 1.75rem;
        }

        .fs-2 {
            font-size: 2rem;
        }

        .display-5 {
            font-size: 2.75rem;
        }

        @media (min-width: 768px) {
          .mission-section {
            padding: 5rem 3rem;
          }
        }
        `}
      </style>

      <div className="container my-5 px-4">
        {/* Why We Built UrbanGrow */}
        <section id="home" className="text-center my-5 py-5">
          <div className="icon-circle">
            <i className="bi bi-info-circle"></i>
          </div>
          <h1 className="display-5 fw-bold">Why We Built Growlify</h1>
          <p className="lead mx-auto" style={{ maxWidth: '700px' }}>
            Our journey to simplify urban farming for everyone.
          </p>
        </section>

        {/* Challenge Section */}
        <section id="features" className="row align-items-center my-5 py-4">
          <div className="col-md-6 mb-4 mb-md-0">
            <img src="abt1.png" alt="City Gardening Challenge" className="img-fluid img-fluid-rounded" />
          </div>
          <div className="col-md-6">
            <h2 className="fs-3 fw-bold">The Challenge of City Gardening</h2>
            <p className="text-secondary">
              Millions of people in urban areas dream of growing their own food, cultivating vibrant plants, or simply adding a touch of green to their concrete surroundings. However, many don't know where to start. Limited space, lack of traditional gardening knowledge, and the unique challenges of an urban environment can feel overwhelming.
            </p>
            <p className="text-secondary">
              That's where Growlify AI comes in. We believe that everyone deserves the joy and benefits of gardening—no matter where they live.
            </p>
          </div>
        </section>

        {/* Smart Solution */}
        <section className="row align-items-center my-5 py-4 flex-md-row-reverse">
          <div className="col-md-6 mb-4 mb-md-0">
            <img src="abt2.png" alt="Smart Solution" className="img-fluid img-fluid-rounded" />
          </div>
          <div className="col-md-6">
            <h2 className="fs-3 fw-bold">Our Smart Solution</h2>
            <p className="text-secondary">
              Growlify makes gardening easy and smart. We leverage AI to guide you through your urban farming journey. From selecting plants suited for your sunlight to diagnosing diseases with a photo, we simplify it all.
            </p>
            <p className="text-secondary">
              Personalized schedules, weather-aware watering reminders, and a supportive community (coming soon!) help your plants thrive.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section id="about-us-section" className="my-5 mission-section text-center">
          <div className="mb-4">
            <span role="img" aria-label="target-emoji" style={{ fontSize: '4.5rem' }}>🎯</span>
          </div>
          <h2 className="fs-2 fw-bold mt-3">Our Mission</h2>
          <p className="lead fw-bold mx-auto mt-3" style={{ maxWidth: '700px', color: 'var(--text-dark)', fontSize: '1.3rem' }}>
            To bring sustainable food-growing skills to every balcony, window, and rooftop—fostering greener cities and healthier communities.
          </p>
        </section>

        {/* Community Join */}
        <section id="my-garden-section" className="text-center my-5 py-4">
          <div className="icon-circle">
            <i className="bi bi-people"></i>
          </div>
          <h2 className="fs-2 fw-bold">Join Our Growing Community</h2>
          <p className="text-secondary">
            Whether you're a seasoned gardener or just starting out, Growlify AI is your perfect companion. Let’s grow together!
          </p>
        </section>
      </div>
    </div>
  );
}

export default About;
