import { useEffect, useState } from 'react';
import EventItem from './EventItem';

const EventList = ({ showDeleteButton = false, onDelete = null }) => {
  const [events, setEvents] = useState([]);

  const getEvents = async () => {
    const res = await fetch("https://ventixe-event-c8grb5ecg0cqgeh2.swedencentral-01.azurewebsites.net/api/Events");
    if (res.ok) {
      const response = await res.json();
      setEvents(response.result);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <section className="event-grid">
      {events.map(event => (
        <EventItem
          key={event.id}
          item={event}
          showDeleteButton={showDeleteButton}
          onDelete={onDelete}
        />
      ))}
    </section>
  );
};

export default EventList;
