import React, { useEffect } from 'react'
import { usePageTitle } from '../../contexts/PageTitleContext'
import {useNavigate} from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("role") === "Admin";
  const {setTitle} = usePageTitle();

  useEffect(() => {
    setTitle('Dashboard')
  }, []);
  
  return (
    <section id="dashboard">
      {isAdmin ? (
        <div>
          <p>Welcome, Admin!</p>
          <p>Creating events and managing bookings are done from the dashboard.</p>
          <div className="dashboard-buttons">
          <button className="submit-btn" onClick={() => navigate('/events/create')}>Create Event</button>
          <button className="submit-btn" onClick={() => navigate('/manage-events')}>Manage Events</button>
          <button className="submit-btn" onClick={() => navigate('/manage-bookings')}>Manage Bookings</button>
          </div>
        </div>
      ) : (
        <p>Welcome! Feel free to browse our upcoming events and book a ticket if it's something for you!</p>
      )}
    </section>
  );
};

export default Dashboard