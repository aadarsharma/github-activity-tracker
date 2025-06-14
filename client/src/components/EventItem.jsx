import React, { useState, useEffect } from 'react';

const eventIcons = {
  star: '⭐',
  push: '🚀',
  issue: '📝',
};

const typeStyles = {
  star: 'bg-yellow-100 text-yellow-800',
  push: 'bg-blue-100 text-blue-800',
  issue: 'bg-red-100 text-red-800',
};

const EventItem = ({ event }) => {
  const formattingOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
    timeZoneName: 'short',
  };
  const formattedTimestamp = event.timestamp?.toDate().toLocaleString('en-IN', formattingOptions) || 'No date';

  const [isVisible, setIsVisible] = useState(event.isNew);

  useEffect(() => {
    if (event.isNew) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000); // Fade out after 3 seconds
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false); // Ensure it's not visible if not new
    }
  }, [event.isNew]);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-transform duration-200 ease-in-out relative"> {/* Add relative for absolute positioning */}
      <span className="text-3xl">{eventIcons?.[event.type] || '❓'}</span>

      <div className="flex-grow text-left">
        <p className="font-bold text-gray-900">{event.repo}</p>

        <p className="text-sm text-gray-600 mt-1">
          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold uppercase ${typeStyles?.[event.type] || 'bg-gray-100 text-gray-800'}`}>
            {event.type}
          </span>
          <span className="mx-1">by</span>
          <strong className="text-gray-800">{event.actor}</strong>
        </p>

        {event.details && <p className="text-sm italic text-gray-500 mt-2">{event.details}</p>}
      </div>

      <span className="text-sm text-gray-500 whitespace-nowrap self-start">{formattedTimestamp.replace(' at', ',')}</span>

      {/* Conditional rendering for the "New" tag with fade animation */}
      {isVisible && (
        <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-semibold rounded-full px-2 py-1 animate-fade-in">
          New
        </div>
      )}
    </div>
  );
};

export default EventItem;