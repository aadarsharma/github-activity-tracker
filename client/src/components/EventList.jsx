import React from 'react';
import EventItem from './EventItem.jsx'; // Note the .jsx extension

const EventList = ({ events }) => {
  if (!events || events.length === 0) {
    return <div className="no-events-message">Waiting for GitHub events... Send a POST request to your webhook URL!</div>;
  }

  return (
    <div className="event-list">
      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventList;