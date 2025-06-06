import { useEffect, useState } from 'react';
import { usePageTitle } from '../../contexts/PageTitleContext';

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);

  const { setTitle } = usePageTitle();

  useEffect(() => {
    setTitle('Manage Bookings');
  }, []);

  useEffect(() => {
    const fetchBookings = async () => {
      const res = await fetch('https://ventixe-booking-cuevcuawd8hna3h4.swedencentral-01.azurewebsites.net/api/Bookings', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data = await res.json();

      const enrichedBookings = await Promise.all( //ChatGPT hjälpte mig här för jag krånglade som en galning med att försöka få så att jag kunde se vilket event det var man bokade istället för eventid. Promise representerar att ett async event har gått igenom.
        data.map(async (b) => {
          try {
            const eventRes = await fetch(`https://ventixe-event-c8grb5ecg0cqgeh2.swedencentral-01.azurewebsites.net/api/Events/${b.eventId}`);
            const eventData = await eventRes.json();
            return {
              ...b,
              event: eventData.result,
            };
          } catch {
            return {
              ...b,
              event: null,
            };
          }
        })
      );

      setBookings(enrichedBookings);
    };

    fetchBookings();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm('Delete this booking?');
    if (!confirm) return;

    const res = await fetch(`https://ventixe-booking-cuevcuawd8hna3h4.swedencentral-01.azurewebsites.net/api/Bookings/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (res.ok) {
      setBookings(prev => prev.filter(b => b.id !== id));
    } else {
      console.error('Failed to delete booking');
    }
  };

  return ( 
    <section id="manage-bookings"> 
      <ul className="manage-bookings-list">
        {bookings.map((b) => (
          <li key={b.id}>
            <strong>{b.bookingOwner?.firstName} {b.bookingOwner?.lastName}</strong> booked <strong>{b.ticketQuantity}</strong> ticket(s)  
            {b.event ? (
              <> for <strong>{b.event.title}</strong> on <em>{new Date(b.event.eventDate).toLocaleString()}</em></>
            ) : (
              <> for Event ID: {b.eventId} (event not found)</>
            )}
            <button className="delete-btn" onClick={() => handleDelete(b.id)}>Delete</button> 
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ManageBookings;
