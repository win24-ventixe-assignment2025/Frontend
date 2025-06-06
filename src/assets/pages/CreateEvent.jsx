import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateEvent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    eventDate: '',
    location: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    try {
      const res = await fetch('https://ventixe-event-c8grb5ecg0cqgeh2.swedencentral-01.azurewebsites.net/api/Events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        navigate('/events');
      } else {
        console.error("Failed to create event");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <form className="create-event-form" onSubmit={handleSubmit}>
      <button className="cancel-event cancel-btn" onClick={() => navigate(-1)}>🗙</button>
      <h2>Create Event</h2>
      <div className="form-input-group">
        <label>Title</label>
        <input className="input-text" name="title" value={formData.title} onChange={handleChange} required />
      </div>
      <div className="form-input-group">
        <label>Description</label>
        <textarea className="input-text" name="description" value={formData.description} onChange={handleChange} required />
      </div>
       <div className="form-input-group">
        <label>Date</label>
     <input className ="input-text" type="datetime-local" name="eventDate" value={formData.eventDate} onChange={handleChange}/>
     </div>
      <div className="form-input-group">
        <label>Location</label>
        <input className="input-text" name="location" value={formData.location} onChange={handleChange} required />
      </div>
      <button className="submit-btn" type="submit">Create Event</button>
    </form>
  );
};

export default CreateEvent;
