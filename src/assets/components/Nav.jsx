import Logo from '../images/Logo.svg';
import Dashboard from '../images/Dashboard.svg?react';
import Events from '../images/Events.svg?react';
import Bookings from '../images/Bookings.svg?react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import  SignOutIcon  from '../images/SignOut.svg';


const Nav = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <nav>
      <div className='logo-flex'>
        <img src={Logo} alt="Logo" />
        <h4 id='logo-text'>Ventixe</h4>
      </div>

      <div className='navlinks'>
        <NavLink to="/" className={({ isActive }) => isActive ? "navlink active" : "navlink"}>
          <Dashboard className="navlink-icon"/>
          <span className="navlink-label">Dashboard</span>
        </NavLink>

        <NavLink to="/events" className={({ isActive }) => isActive ? "navlink active" : "navlink"}>
           <Events className="navlink-icon"/>
          <span className="navlink-label">Events</span>
        </NavLink>

       
        {token && role === 'Admin' && (
          <NavLink to="/bookings" className={({ isActive }) => isActive ? "navlink active" : "navlink"}>
            <Bookings className="navlink-icon"/>
            <span className="navlink-label">Bookings</span>
          </NavLink>
        )}

        {!token ? (
          <>
            <Link to="/login" className="navlink">Login</Link>
            <Link to="/register" className="navlink">Register</Link>
          </>
        ) : (
          <button onClick={handleLogout} className="navlink btn-logout">
            <img src={SignOutIcon} alt="Signout"/>
           <span className="navlink-label">Sign out</span>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Nav;
