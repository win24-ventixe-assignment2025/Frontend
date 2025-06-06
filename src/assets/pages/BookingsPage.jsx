import { useEffect, useState } from 'react';
import { usePageTitle } from '../../contexts/PageTitleContext';

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch("https://ventixe-booking-cuevcuawd8hna3h4.swedencentral-01.azurewebsites.net/api/Bookings", {
      headers: {
       Authorization: `Bearer ${localStorage.getItem("token")}`
  }
});

      const data = await res.json();
      setBookings(data);
    };
    fetchBookings();
  }, []);

     const {setTitle} = usePageTitle();
        
        useEffect(() => {
          setTitle('Bookings')
        }, []);

  return (
  <section id="bookingspage">
  <div className="bookings-grid">
    {bookings.map((b, i) => (
      <div className="booking-card" key={i}>
        <h4>{b.bookingOwner?.firstName} {b.bookingOwner?.lastName}</h4>
        <p>Event ID: <code>{b.eventId}</code></p>
        <p>Tickets: <strong>{b.ticketQuantity}</strong></p>
      </div>
    ))}
  </div>
</section>

  );
};

export default BookingsPage;
