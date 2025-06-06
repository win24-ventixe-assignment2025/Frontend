import { Link } from 'react-router-dom';

const EventItem = ({ item, showDeleteButton = false, onDelete = null }) => {
  return (
    <div className="event-card-wrapper">
      <Link to={`/events/${item.id}`} className="event-card-link">
        <div className="event-card">
          <div className="card-image"></div>

          <p className="card-date">
            {new Date(item.eventDate).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })} – {new Date(item.eventDate).toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: '2-digit',
              hour12: true
            })}
          </p>

          <h6 className="card-title">{item.title}</h6>
          <p className="card-location">{item.location}</p>
        </div>
      </Link>

      {showDeleteButton && (
        <button
          className="delete-btn"
          onClick={() => onDelete && onDelete(item.id)}
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default EventItem;
