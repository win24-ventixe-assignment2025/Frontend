import { useEffect } from 'react';
import { usePageTitle } from '../../contexts/PageTitleContext';
import EventList from '../components/EventList';

const ManageEvents = () => {
  const { setTitle } = usePageTitle();

  useEffect(() => {
    setTitle('Manage Events');
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm('Delete this event?');
    if (!confirm) return;

    const res = await fetch(`https://ventixe-event-c8grb5ecg0cqgeh2.swedencentral-01.azurewebsites.net/api/Events/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!res.ok) {
      console.error('Failed to delete event');
    }
  };

  return (
    <section id="manage-events">
      <EventList showDeleteButton={true} onDelete={handleDelete} />
    </section>
  );
};

export default ManageEvents;
