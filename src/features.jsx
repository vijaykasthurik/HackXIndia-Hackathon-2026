import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Bot, CloudRain, Clock, Camera, BookOpen, Users, Search } from 'lucide-react';
import { Link } from 'react-router-dom'; // Import Link

const Features = () => {
  const newBackgroundColor = '#F5F5DB';

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const commonStyles = {
    fontFamily: 'Inter, sans-serif',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
  };

  const greenIconBg = {
    backgroundColor: '#d1fae5',
    padding: '0.75rem',
    borderRadius: '9999px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const featureCardBaseStyle = {
    backgroundColor: newBackgroundColor,
    padding: '2rem',
    borderRadius: '0.75rem',
    boxShadow: '0 8px 16px -4px rgba(0, 0, 0, 0.15), 0 4px 8px -2px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    position: 'relative',
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, background-color 0.3s ease-in-out',
    border: '1px solid #d1d5db',
  };

  const comingSoonBadgeStyle = {
    position: 'absolute',
    bottom: '1rem',
    right: '1rem',
    backgroundColor: '#fef3c7',
    color: '#92400e',
    fontSize: '0.75rem',
    fontWeight: '600',
    padding: '0.25rem 0.625rem',
    borderRadius: '9999px',
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: newBackgroundColor, ...commonStyles }}>
      {/* Hero Section */}
      <header style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '8rem',
        paddingBottom: '5rem',
        paddingLeft: '1rem',
        paddingRight: '1rem',
        textAlign: 'center'
      }}>
        <div style={{ ...greenIconBg, marginBottom: '1.5rem' }}>
          <Search size={40} color="#10b981" />
        </div>
        <h1 style={{
          fontSize: '2.75rem',
          fontWeight: '900',
          color: '#000000',
          marginBottom: '1.5rem',
          maxWidth: '42rem'
        }}>
          Smart Features to Support Your Plants
        </h1>
        <p style={{
          fontSize: '1.25rem',
          color: '#4b5563',
          maxWidth: '48rem',
          lineHeight: '1.625',
          fontWeight: '500'
        }}>
          UrbanGrow AI is packed with intelligent tools designed to make your urban
          gardening journey successful and enjoyable.
        </p>
      </header>

      {/* Top Row: 3 Cards */}
      <section style={{ maxWidth: '100rem', margin: '0 auto', padding: '2rem 2rem 0' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          <FeatureCard
            icon={<Bot size={40} color="#10b981" />}
            title="Personalized Plant Care"
            description="AI-driven recommendations based on your home space, plant types, and local climate data."
            greenIconBg={greenIconBg}
            featureCardBaseStyle={featureCardBaseStyle}
            comingSoonBadgeStyle={comingSoonBadgeStyle}
            aos="fade-up"
            to="/features/personalized-care" // Example route
          />
          <FeatureCard
            icon={<CloudRain size={40} color="#10b981" />}
            title="Weather Alerts"
            description="Smart alerts to skip watering when rain is expected, conserving water and protecting plants."
            greenIconBg={greenIconBg}
            featureCardBaseStyle={featureCardBaseStyle}
            comingSoonBadgeStyle={comingSoonBadgeStyle}
            aos="fade-up"
            to="/features/weather-alerts" // Example route
          />
          <FeatureCard
            icon={<Clock size={40} color="#10b981" />}
            title="Watering Reminders"
            description="Timely notifications based on individual plant needs and environmental conditions."
            greenIconBg={greenIconBg}
            featureCardBaseStyle={featureCardBaseStyle}
            comingSoonBadgeStyle={comingSoonBadgeStyle}
            aos="fade-up"
            to="/features/watering-reminders" // Example route
          />
        </div>
      </section>

      {/* Bottom Row: 3 Cards */}
      <section style={{ maxWidth: '100rem', margin: '0 auto', padding: '2rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          <FeatureCard
            icon={<Camera size={40} color="#10b981" />}
            title="AI Plant Diagnosis"
            description="Upload a photo of your plant, and our AI will analyze it to detect potential issues and offer solutions."
            greenIconBg={greenIconBg}
            featureCardBaseStyle={featureCardBaseStyle}
            comingSoonBadgeStyle={comingSoonBadgeStyle}
            aos="fade-up"
            to="/features/plant-diagnosis" // Example route
          />
          <FeatureCard
            icon={<BookOpen size={40} color="#10b981" />}
            title="Growth Logbook"
            description="Track your plants' progress with notes, pictures, and key milestones."
            greenIconBg={greenIconBg}
            featureCardBaseStyle={featureCardBaseStyle}
            comingSoonBadgeStyle={comingSoonBadgeStyle}
            aos="fade-up"
            to="/features/growth-logbook" // Example route
          />
          <FeatureCard
            icon={<Users size={40} color="#10b981" />}
            title="Community Tips"
            description="Share your successes and learn from other urban farmers in a supportive community."
            comingSoon={true}
            greenIconBg={greenIconBg}
            featureCardBaseStyle={featureCardBaseStyle}
            comingSoonBadgeStyle={comingSoonBadgeStyle}
            aos="fade-up"
            // If it's "Coming Soon", you might not want it to be navigable yet
            // or you could link to a "Coming Soon" page.
            // For now, I'm intentionally not adding 'to' prop if comingSoon is true.
          />
        </div>
      </section>
    </div>
  );
};

// -----------------------------------------------------------------------------

const FeatureCard = ({
  icon,
  title,
  description,
  comingSoon,
  greenIconBg,
  featureCardBaseStyle,
  comingSoonBadgeStyle,
  aos = 'fade-up',
  to // Prop to receive the route path
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const currentFeatureCardStyle = {
    ...featureCardBaseStyle,
    transform: isHovered ? 'translateY(-6px) scale(1.03)' : 'translateY(0) scale(1)',
    boxShadow: isHovered
      ? '0 16px 30px -10px rgba(0, 0, 0, 0.2), 0 8px 16px -4px rgba(0, 0, 0, 0.1)'
      : featureCardBaseStyle.boxShadow,
    backgroundColor: isHovered ? '#fefce8' : featureCardBaseStyle.backgroundColor,
    cursor: to && !comingSoon ? 'pointer' : 'default', // Make it pointer if it's navigable
  };

  // Wrap the content in a div to provide a single root element for Link
  const cardContent = (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%' }}>
      <div style={{ ...greenIconBg, marginBottom: '1rem' }}>
        {icon}
      </div>
      <h3 style={{
        fontSize: '1.375rem',
        fontWeight: '800',
        color: '#111827',
        marginBottom: '0.75rem'
      }}>{title}</h3>
      <p style={{
        color: '#374151',
        fontSize: '1rem',
        fontWeight: '500',
        lineHeight: '1.75'
      }}>{description}</p>
      {comingSoon && (
        <span style={comingSoonBadgeStyle}>Coming Soon</span>
      )}
    </div>
  );

  return (
    <div
      style={currentFeatureCardStyle}
      data-aos={aos}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {to && !comingSoon ? (
        <Link to={to} style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
          {cardContent} {/* Now passing the single div as a child of Link */}
        </Link>
      ) : (
        cardContent
      )}
    </div>
  );
};

export default Features;