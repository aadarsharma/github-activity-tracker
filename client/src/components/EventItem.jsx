import React from 'react';

const eventIcons = {
  star: '⭐',
  push: '🚀',
  issue: '📝',
};

const EventItem = ({ event }) => {
  const formattedTimestamp = event.timestamp.toDate().toLocaleString();

  return (
    <div className="event-item">
      <span className="event-icon">{eventIcons[event.type] || '❓'}</span>
      <div className="event-details">
        <p>
          <strong>{event.repo}</strong>
        </p>
        <p className="event-actor">
          <span className={`event-type event-type-${event.type}`}>{event.type}</span>
          by <strong>{event.actor}</strong>
        </p>
        {event.details && <p className="event-extra-details">{event.details}</p>}
      </div>
      <span className="event-timestamp">{formattedTimestamp}</span>
    </div>
  );
};

export default EventItem;