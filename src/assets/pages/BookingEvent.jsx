import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { usePageTitle } from '../../contexts/PageTitleContext';


const BookingEvent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const selectedPackage = location.state?.selectedPackage;

      const {setTitle} = usePageTitle();
      
        useEffect(() => {
          setTitle('Booking')
        }, []);

  const [event, setEvent] = useState({});
  const [formData, setFormData] = useState({
    eventId: id,
    firstName: '',
    lastName: '',
    email: '',
    streetName: '',
    postalCode: '',
    city: '',
    ticketQuantity: 1
  });



  const getEvents = async () => {
    const res = await fetch(`https://ventixe-event-c8grb5ecg0cqgeh2.swedencentral-01.azurewebsites.net/api/Events/${id}`);
    if (res.ok) {
      const response = await res.json();
      setEvent(response.result);
    }
  };

  const postBooking = async () => {
    try {
      const res = await fetch(`https://ventixe-booking-cuevcuawd8hna3h4.swedencentral-01.azurewebsites.net/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        console.error("Booking failed");
      } else {
        console.log("Booking successful");
        navigate('/');
      }
    } catch (err) {
      console.error("Error submitting booking", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await postBooking();
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div>
           <button className="cancel-btn" onClick={() => navigate(-1)}>🗙</button>
      {selectedPackage && (
      <div className="selected-package">
        <p>Selected Package:</p>
        <h4>{selectedPackage.title} – {selectedPackage.currency}{selectedPackage.price}</h4>
      </div>
)}
      <h4 className="booking-title">Book Event - {event.title}</h4>
      <form className="booking-form" onSubmit={handleSubmit} noValidate>
        <div className="form-input-group">
          <label>First Name</label>
          <input className="input-text" type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
        </div>
        <div className="form-input-group">
          <label>Last Name</label>
          <input className="input-text" type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
        </div>
        <div className="form-input-group">
          <label>Email</label>
          <input className="input-text" type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
      <div className="form-input-group">
          <label>Street Name</label>
          <input className="input-text" type="text" name="streetName" value={formData.streetName} onChange={handleChange} />
          
        </div>

        <div className="form-input-group">
          <label>Postal Code</label>
          <input className="input-text" type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} />
        </div>
        <div className="form-input-group">
          <label>City</label>
          <input className="input-text" type="text" name="city" value={formData.city} onChange={handleChange} />
        </div>
           <div className="form-input-group">
          <label>Ticket Quantity</label>
          <select className="input-text" type="select" name="ticketQuantity" value={formData.ticketQuantity} onChange={handleChange} >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            </select>
          
        </div>
        <button className="submit-btn" type="submit">Book</button>
      </form>
    </div>
  );
};

export default BookingEvent;
