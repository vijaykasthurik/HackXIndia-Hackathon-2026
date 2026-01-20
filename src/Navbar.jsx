import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const profileRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };
    if (showProfileDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfileDropdown]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const currentPagePath = location.pathname;

  const navClasses = [
    'navbar',
    'navbar-expand-lg',
    'py-3',
    'fixed-top',
    (scrolled || ['/my-garden', '/diagnose', '/auth'].includes(currentPagePath)) && 'scrolled',
    ['/my-garden', '/diagnose', '/auth'].includes(currentPagePath) && 'no-blur',
  ].filter(Boolean).join(' ');

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileNavbar = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={navClasses}>
        <div className="container">
          <Link className="navbar-brand p-0 border-0" to="/">
            <img src="logo1.png" alt="Growlify Logo" style={{ height: '80px', width: 'auto' }} />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse navbar-collapse ${mobileMenuOpen ? 'show' : ''}`} id="navbarNav">
            <ul className="navbar-nav navbar-nav-center">
              <li className="nav-item">
                <NavLink to="/" className="nav-link" end onClick={closeMobileNavbar}>Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/features" className="nav-link" onClick={closeMobileNavbar}>Features</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/about" className="nav-link" onClick={closeMobileNavbar}>About Us</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/shop" className="nav-link" onClick={closeMobileNavbar}>Shop</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/my-garden" className="nav-link" onClick={closeMobileNavbar}>My Garden</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/contact" className="nav-link" onClick={closeMobileNavbar}>Contact</NavLink>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto">
              <li className="nav-item profile-icon-container" ref={profileRef}>
                <button
                  className="nav-link"
                  onClick={() => setShowProfileDropdown(prev => !prev)}
                >
                  <i className="bi bi-person-circle" style={{ fontSize: '1.5rem' }}></i>
                </button>
                {showProfileDropdown && (
                  <div className="profile-dropdown">
                    <div className="dropdown-title">My Account</div>
                   <Link
  to="/profile"
  className="dropdown-item"
  onClick={() => {
    setShowProfileDropdown(false);
    closeMobileNavbar();
  }}
>
  Profile
</Link>

<Link
  to="/auth"
  className="dropdown-item"
  onClick={() => {
    setShowProfileDropdown(false);
    closeMobileNavbar();
  }}
>
  Login / Sign Up
</Link>

<Link
  to="/"
  className="dropdown-item"
  onClick={() => {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('signupCity');
    setShowProfileDropdown(false);
    closeMobileNavbar();
  }}
>
  Logout
</Link>

                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Your original styles are untouched */}
     
 <style>

        {`

          /* ... Your existing Navbar CSS ... */

          :root {

            --background: hsl(60, 56%, 91%);

            --foreground: hsl(0, 0%, 20%);

            --card: rgb(247,247,227);

            --border: hsl(60, 30%, 80%);

            --primary: hsl(120, 27%, 65%);

            --radius: 0.5rem;

          }




         .fixed-top {
  background-color: hsla(60, 56%, 93%, 0.8);
  box-shadow: 0 2px 4px rgba(0,0,0,.08);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}


          

          .fixed-top.no-blur {

            backdrop-filter: none;

            -webkit-backdrop-filter: none;

          }




          .navbar-nav-center {

            margin-left: auto;

            margin-right: auto;

            flex-grow: 1;

            justify-content: center;

          }

          @media (max-width: 991.98px) {

            .navbar-nav-center {

              justify-content: flex-start;

              margin-left: 0;

              margin-right: 0;

            }

          }




          .navbar-nav .nav-link {

              border-radius: var(--radius);

              font-size: 1.15rem;

              color: var(--foreground);

              font-weight: 400;

              padding: 0.5rem 0.75rem;

              transition: background-color 0.2s ease, color 0.2s ease;

          }

          .navbar-nav .nav-link.active {

              font-weight: 600;

              background-color: transparent;

              color: var(--primary);

          }

          .navbar-nav .nav-link:not(.active):hover {

            background-color: hsl(60, 30%, 80%);

            color: var(--foreground);

          }

          .navbar-nav .nav-link.active:hover {

             background-color: transparent;

             color: var(--primary);

          }




          .profile-icon-container {

            position: relative;

            margin-left: 1.5rem;

          }

          .profile-icon-container button.nav-link {

            cursor: pointer;

            transition: color 0.2s ease-in-out, background-color 0.2s ease;

            padding: 0.5rem 0.75rem;

            border-radius: var(--radius);

            color: var(--foreground);

            background-color: transparent;

          }

          .profile-icon-container button.nav-link:hover {

            background-color: hsl(60, 30%, 80%);

            color: var(--foreground);

          }

          .profile-dropdown {

            position: absolute;

            top: 100%;

            right: 0;

            background-color: var(--card);

            border: 1px solid var(--border);

            border-radius: var(--radius);

            box-shadow: 0 4px 8px rgba(0,0,0,.1);

            min-width: 160px;

            z-index: 1001;

            padding: 0;

            text-align: left;

            transform: translateY(5px);

          }

          .profile-dropdown .dropdown-item {

            display: block;

            padding: 0.5rem 1rem;

            color: var(--foreground);

            text-decoration: none;

            cursor: pointer;

            white-space: nowrap;

          }

          .profile-dropdown .dropdown-item:hover {

            background-color: hsl(0, 0%, 100%);

          }

          .profile-dropdown .dropdown-title {

            padding: 0.5rem 1rem;

            font-weight: 600;

            color: var(--foreground); 

            border-bottom: 1px solid var(--border);

            margin-bottom: 0.25rem;

          }




          .navbar-nav .nav-item {

            display: flex;

            align-items: center;

          }




          @media (max-width: 767.98px) {

            .navbar-nav .nav-link {

              font-size: 1rem;

              padding: 0.4rem 0.6rem;

            }




            .navbar-collapse {

              width: 100%;

            }




            .navbar-nav {

              flex-direction: column !important;

              margin-top: 0.5rem;

            }




            .navbar-nav .nav-item {

              width: 100%;

              text-align: center;

            }




            .navbar-nav .nav-link {

              display: block;

              padding: 0.75rem 1rem;

              border-bottom: 1px solid var(--border);

            }




            .navbar-nav .nav-link:last-child {

              border-bottom: none;

            }




            .profile-icon-container {

              margin-left: 0;

              width: 100%;

              text-align: center;

              margin-top: 0.5rem;

            }

            .profile-dropdown {

              position: static;

              width: 100%;

              border-top: 1px solid var(--border);

              box-shadow: none;

              transform: translateY(0);

            }

            .profile-dropdown .dropdown-title {

              border-bottom: none;

            }

          }
            .profile-dropdown .dropdown-item {
      font-weight: 600;
      transition: background-color 0.2s ease, color 0.2s ease;
    }

    .profile-dropdown .dropdown-item:hover {
      background-color: hsl(120, 30%, 85%);
      color: #000;
      font-weight: 700;
      border-radius: 0.3rem;
    }

        `}

      </style>
    </>
  );
};

export default Navbar;