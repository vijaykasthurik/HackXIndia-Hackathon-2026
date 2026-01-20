import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-body-tertiary py-4 mt-auto">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <p className="mb-0 text-muted">&copy; 2025 Growlify. All rights reserved.</p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <ul className="nav justify-content-center justify-content-md-end">
              <li className="nav-item">
                <a className="nav-link text-muted" href="#privacy">Privacy Policy</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-muted" href="#terms">Terms of Service</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;