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
    timeZoneName: 'short',
  };
  // Simplified timestamp format for mobile to save space
  const mobileFormattingOptions = {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  };

  const formattedTimestamp = event.timestamp?.toDate().toLocaleString('en-IN', formattingOptions) || 'No date';
  const mobileFormattedTimestamp = event.timestamp?.toDate().toLocaleString('en-IN', mobileFormattingOptions) || 'No date';


  const [isVisible, setIsVisible] = useState(event.isNew);

  useEffect(() => {
    if (event.isNew) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [event.isNew]);

  return (
    // Main Layout: Stacks vertically on mobile, row on larger screens.
    <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-transform duration-200 ease-in-out relative">

      {/* Icon: Slightly smaller on mobile */}
      <span className="text-2xl sm:text-3xl">{eventIcons?.[event.type] || '❓'}</span>

      {/* Details Section */}
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

      {/* Timestamp: Hidden on mobile (block), visible on larger screens (sm:block) */}
      <span className="hidden sm:block text-sm text-gray-500 whitespace-nowrap self-start">
        {formattedTimestamp.replace(' at', ',')}
      </span>
      
      {/* Mobile-only Timestamp: Visible only on mobile, at the end of the vertical stack */}
      <span className="block sm:hidden text-xs text-gray-500 w-full text-left mt-2 border-t pt-2">
        {mobileFormattedTimestamp.replace(' at', ',')}
      </span>


      {/* "New" Tag: Position remains the same relative to the parent div */}
      {isVisible && (
        <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-semibold rounded-full px-2 py-1 animate-fade-in">
          New
        </div>
      )}
    </div>
  );
};

export default EventItem;