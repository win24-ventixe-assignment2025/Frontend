import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePageTitle } from '../../contexts/PageTitleContext';
import Beacon from '../images/MapPin.svg';
import Check from '../images/Check.svg';

const EventDetailsPage = () => {
  const { setTitle } = usePageTitle();
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState({});
  const [packages, setPackages] = useState([]);

  const desiredOrder = [   //Förstod inte varför mina paket inte var i ordern jag ville även fast jag gjorde en for loop i min backend som skulle räkna upp 1-8 och jag hade lagt dem i denna ordning i min databas, frågade chatgpt om det fannns en lösning.
    "General Admission Package",
    "Silver Package",
    "Gold Package",
    "Platinum Package",
    "Diamond Package",
    "VIP Lounge Package",
    "Artist Meet-and-Greet Package",
    "Ultimate Access Package"
  ];

  useEffect(() => {
    setTitle('Event Details');
  }, []);

  useEffect(() => {
    const getEvent = async () => {
      const res = await fetch(`https://ventixe-event-c8grb5ecg0cqgeh2.swedencentral-01.azurewebsites.net/api/Events/${id}`);
      if (res.ok) {
        const data = await res.json();
        setEvent(data.result);
      }
    };
    getEvent();
  }, [id]);

  useEffect(() => {
    const getPackages = async () => {
      const res = await fetch(`https://ventixe-event-c8grb5ecg0cqgeh2.swedencentral-01.azurewebsites.net/api/Events/${id}/packages`);
      if (res.ok) {
        const data = await res.json();
        setPackages(data);
      }
    };
    getPackages();
  }, [id]);

  const handlePackageSelect = (pkg) => {
    navigate(`/events/booking/${id}`, {
      state: { selectedPackage: pkg.package }
    });
  };

  return (
    <section id="details-page">
      <div className="details-layout">
        <div className="event-info">
          <div className="details-image">{event.image}</div>

          <div className="details-text-container">
            <h1 className="details-title">{event.title}</h1>
            <div className="card-date">
              {new Date(event.eventDate).toLocaleDateString('en-US', {month: 'long', day:'numeric',year: 'numeric'})} 
              – 
              {new Date(event.eventDate).toLocaleTimeString('en-US', {hour: 'numeric', minute:'2-digit', hour12: true })}
            </div>
            <div className="details-location">
              <img id="pin" src={Beacon} alt="Pin" />
              {event.location}
            </div>

            <div className="details-description-field">
              <p>About Event</p>
              <h6>{event.description}</h6>
            </div>
          </div>
        </div>

        <div className="package-section">
          <h3>Packages – Press a package to go to booking!</h3>
          <div className="packages-grid">
            {[...packages]
              .sort((a, b) =>
                desiredOrder.indexOf(a.package.title) - desiredOrder.indexOf(b.package.title)
              )
              .map((pkg) => (
                <div key={pkg.packageId} className="package-card" onClick={() => handlePackageSelect(pkg)}>
                  <div className="package-info">
                    <h4>{pkg.package.title}</h4>
                    <div className="seating-info">
                      <p><img src={Check} /> {pkg.package.seatingArrangement}</p>
                      <p><img src={Check} /> {pkg.package.placement}</p>
                    </div>
                  </div>
                  <div className="package-price">
                    <h5>${pkg.package.price}</h5>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetailsPage;
