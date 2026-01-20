import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import { HomePageContent } from './first';
import Navbar from './Navbar';
import Footer from './Footer';
import Features from './features';
import Contact from './contact';
import MainAppContent from './Page';
import GardenPage from './garden';
import About from './about';
import SignupLogin from './signupLogin';
import Profile from './profile';
import Diagnose from './diagnose';
function App() {
const showNavbar = true;
  const mainContentPaddingTop = showNavbar ? '90px' : '2rem';

  return (
    
    <Router>
      <div className="App flex flex-col min-h-screen">
        {/* The Navbar will now use <Link> components for navigation */}
   {showNavbar && <Navbar />}
        {/* Main content area */}
        <main className="flex-grow flex flex-col items-center justify-start px-4" style={{ paddingTop: mainContentPaddingTop, paddingBottom: '2rem' }}>
          <Routes>
            <Route path="/" element={<HomePageContent />} />
            <Route path="/features" element={<Features />} />
             <Route path="/contact" element={<Contact />} />
                  <Route path="/shop" element={<MainAppContent />} />
                   <Route path="/my-garden" element={<GardenPage />} />
                    <Route path="/about" element={<About />} />
                      <Route path="/auth" element={<SignupLogin />} />
                        <Route path="/profile" element={<Profile />} />
                                   <Route path="/diagnose" element={<Diagnose />} />
           
            {/* A default "not found" route can be added like this: */}
            {/* <Route path="*" element={<NotFoundPage />} /> */}
          </Routes>
        </main>

        <Footer />
        {/* Global CSS and other links remain the same */}
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
        <style>
          {`
            /* Your custom CSS variables and global styles */
            /* Note: Bootstrap CDN links are ideally in public/index.html */
            @import url("https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css");
            @import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css");
            @import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css");

            /* ... (all your existing CSS styles) ... */

            :root {
              --background: hsl(60, 56%, 91%); /* Beige (#F5F5DC) */
              --foreground: hsl(0, 0%, 20%); /* Dark Gray */

              --card: rgb(247,247,227); /* Changed to original footer color */
              --card-foreground: hsl(0, 0%, 20%);

              --popover: hsl(60, 56%, 93%);
              --popover-foreground: hsl(0, 0%, 20%);

              --primary: hsl(120, 27%, 65%); /* Natural Green (#8FBC8F) */
              --primary-foreground: hsl(0, 0%, 10%); /* Dark text for contrast on primary */

              --secondary: hsl(0, 0%, 100%); /* Changed to White for card hover */
              --secondary-foreground: hsl(0, 0%, 20%);

              --muted: hsl(60, 30%, 88%); /* Even lighter beige */
              --muted-foreground: hsl(0, 0%, 35%); /* Slightly lighter gray */

              --accent: hsl(34, 44%, 70%); /* Warm Tan (#D2B48C) */
              --accent-foreground: hsl(0, 0%, 10%); /* Dark text for contrast on accent */
              --accent-hover: hsl(34, 44%, 60%); /* Darker tan/brown for hover effect */

              --destructive: hsl(0, 84.2%, 60.2%);
              --destructive-foreground: hsl(0, 0%, 98%);

              --border: hsl(60, 30%, 80%); /* Slightly darker beige for borders */
              --input: hsl(60, 30%, 80%);
              --ring: hsl(120, 27%, 55%); /* Darker shade of primary for focus rings */
              --radius: 0.5rem;

              --chart-1: hsl(120, 27%, 65%);
              --chart-2: hsl(34, 44%, 70%);
              --chart-3: hsl(60, 56%, 80%);
              --chart-4: hsl(120, 27%, 55%);
              --chart-5: hsl(34, 44%, 60%);

              /* Sidebar colors - can be distinct or inherit. For now, slightly adjusted from main theme. */
              --sidebar-background: hsl(60, 50%, 88%); /* Lighter beige for sidebar */
              --sidebar-foreground: hsl(0, 0%, 15%);
              --sidebar-primary: hsl(120, 27%, 60%); /* Slightly adjusted primary for sidebar accents */
              --sidebar-primary-foreground: hsl(0, 0%, 5%);
              --sidebar-accent: hsl(34, 44%, 65%); /* Slightly adjusted accent */
              --sidebar-accent-foreground: hsl(0, 0%, 5%);
              --sidebar-border: hsl(60, 30%, 75%);
              --sidebar-ring: hsl(120, 27%, 50%);
            }

            body {
                font-family: "Inter", sans-serif;
                background-color: var(--background);
                color: var(--foreground);
            }

            /* Fixed Navbar (No longer needed here, moved to Navbar.jsx) */

            /* Override Bootstrap's default bg-body-tertiary to match card color (for footer mostly) */
            .bg-body-tertiary {
              background-color: var(--card) !important;
            }

            .bg-light-green {
                background-color: var(--primary) !important;
            }

            .text-dark-green {
                color: var(--primary-foreground) !important;
            }

            .btn-custom-green {
                background-color: var(--primary);
                border-color: var(--primary);
                color: var(--primary-foreground);
                border-radius: var(--radius);
                padding: 0.75rem 1.5rem;
            }

            .btn-custom-green:hover {
                background-color: var(--ring);
                border-color: var(--ring);
            }

            .btn-outline-custom {
                border-color: var(--primary);
                color: var(--primary);
                border-radius: var(--radius);
                padding: 0.75rem 1.5rem;
            }

            .btn-outline-custom:hover {
                background-color: var(--primary);
                color: var(--primary-foreground);
            }

            /* Card Styling & Hover Effect - NEW */
            .card {
                border: none;
                box-shadow: 0 4px 8px rgba(0,0,0,.05);
                border-radius: 1rem;
                background-color: var(--card); /* Uses the updated --card variable */
                color: var(--card-foreground);
                transition: transform 0.3s ease, box-shadow 0.3s ease;
            }

            .card:hover {
                /* Removed background-color property to prevent color change on hover */
                transform: translateY(-5px);
                box-shadow: 0 8px 16px rgba(0,0,0,.15);
            }

            .section-padding {
                padding-top: 80px;
                padding-bottom: 80px;
            }

            /* Emoji styling within cards */
            .card-emoji {
                font-size: 3rem;
                line-height: 1;
                margin-bottom: 1rem;
                display: inline-block;
            }

            .image-placeholder {
                background-color: var(--muted);
                display: flex;
                justify-content: center;
                align-items: center;
                height: 250px;
                color: var(--muted-foreground);
                font-size: 1.25rem;
                border-top-left-radius: 1rem;
                border-top-right-radius: 1rem;
                overflow: hidden;
            }
            .image-placeholder img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }

            .cta-section h2, .cta-section p {
                color: white;
            }
            .cta-section p {
                opacity: 0.9;
            }

            /* Navbar centering (now consolidated in Navbar.jsx) */

            /* Original navbar state (now consolidated in Navbar.jsx) */
          `}
        </style>
      </div>
    </Router>
  );
}

export default App;
