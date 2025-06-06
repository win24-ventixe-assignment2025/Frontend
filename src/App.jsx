import { Routes, Route } from 'react-router-dom';
import './assets/styles/App.css';
import PortalLayout from './assets/layouts/PortalLayout';
import CenterLayout from './assets/layouts/CenterLayout';
import Dashboard from './assets/pages/Dashboard';
import EventDetailsPage from './assets/pages/EventDetailsPage';
import EventPage from './assets/pages/EventPage';
import BookingEvent from './assets/pages/BookingEvent';
import BookingsPage from './assets/pages/BookingsPage';
import Login from './assets/pages/Login';
import Register from './assets/pages/Register';
import CreateEvent from './assets/pages/CreateEvent';
import ManageBookings from './assets/pages/ManageBookings';
import ManageEvents from './assets/pages/ManageEvents';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PortalLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="/events" element={<EventPage />} />
        <Route path="/events/:id" element={<EventDetailsPage />} />        
        <Route path="/bookings" element={<BookingsPage />} />
        <Route path="/manage-bookings" element={<ManageBookings />} />
        <Route path="/manage-events" element={<ManageEvents />} />
      </Route>

      <Route element={<CenterLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/events/create" element={<CreateEvent />} />
        <Route path="/events/booking/:id" element={<BookingEvent />} />
       
      </Route>
    </Routes>
  );
}
