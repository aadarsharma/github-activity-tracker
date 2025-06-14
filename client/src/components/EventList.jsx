import React from 'react';
import EventItem from './EventItem.jsx';

const EventList = ({ events }) => {
  if (!events || events.length === 0) {
    return (
      // Responsive Padding and Text:
      // - On mobile: Smaller padding (p-6) and text size (text-base).
      // - On sm screens and up: Larger padding (sm:p-12) and text size (sm:text-lg).
      <div className="text-gray-500 text-base sm:text-lg p-6 sm:p-12 bg-white rounded-lg shadow-md text-center">
        Waiting for GitHub events...
        <br />
        <span className="text-sm">Send a POST request to your webhook URL or use the form above!</span>
      </div>
    );
  }

  return (
    // Responsive Gap: Smaller gap on mobile, slightly larger on sm screens and up.
    <div className="flex flex-col gap-3 sm:gap-4">
      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventList;