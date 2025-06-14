import React from 'react';
import EventItem from './EventItem.jsx';

const EventList = ({ events }) => {
  if (!events || events.length === 0) {
    return (
      <div className="text-gray-500 text-lg p-12 bg-white rounded-lg shadow-md">
        Waiting for GitHub events... Send a POST request to your webhook URL!
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventList;