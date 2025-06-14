import React from 'react';

const filterTypes = ['all', 'star', 'push', 'issue'];

const EventFilter = ({ activeFilter, setFilter }) => {
  return (
    // Responsive Gaps and Alignment:
    // - On mobile (flex-col), items are centered with a smaller gap.
    // - On small screens and up (sm:flex-row), items are in a row with a larger gap.
    <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
      
      {/* Add flex-shrink-0 to prevent this text from being squished on small screens */}
      <p className="font-semibold text-gray-700 flex-shrink-0">
        Filter by type:
      </p>

      {/* Center the buttons on mobile */}
      <div className="flex flex-wrap gap-2 justify-center">
        {filterTypes.map((type) => (
          <button
            key={type}
            className={`
              px-4 py-2 rounded-md text-sm font-medium transition-colors capitalize
              ${activeFilter === type
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }
            `}
            onClick={() => setFilter(type)}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EventFilter;