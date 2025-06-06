import { useState } from 'react';
import { usePageTitle } from '../../contexts/PageTitleContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MdChevronLeft } from 'react-icons/md';
import Logo from '../images/Logo.svg';

const MobileNav = () => {
  const { title } = usePageTitle();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isDashboard = location.pathname === '/';

  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="mobile-nav-wrapper">
      <div className="mobile-nav">
        {isDashboard ? (
          <img src={Logo} alt="Ventixe Logo" className="logo-icon" />
        ) : (
          <button className="back-btn" onClick={() => navigate(-1)} aria-label="Go back">
            <MdChevronLeft size={24} />
          </button>
        )}

        <h1 className="mobile-title">{title}</h1>

        <button className="dropdown-btn" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
      </div>

      {menuOpen && (
        <div className="mobile-dropdown">
          <Link to="/" className="navlink" onClick={() => setMenuOpen(false)}>Dashboard</Link>
          <Link to="/events" className="navlink" onClick={() => setMenuOpen(false)}>Events</Link>

          {token && role === 'Admin' && (
            <Link to="/bookings" className="navlink" onClick={() => setMenuOpen(false)}>Bookings</Link>
          )}

          {!token ? (
            <>
              <Link to="/login" className="navlink" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/register" className="navlink" onClick={() => setMenuOpen(false)}>Register</Link>
            </>
          ) : (
            <button className="btn-logout-mobile navlink" onClick={handleLogout}>Sign out</button>
          )}
        </div>
      )}
    </div>
  );
};

export default MobileNav;
