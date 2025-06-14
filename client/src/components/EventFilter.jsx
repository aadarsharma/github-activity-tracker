import React from 'react';

const filterTypes = ['all', 'star', 'push', 'issue'];

const EventFilter = ({ activeFilter, setFilter }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-col sm:flex-row items-center justify-center gap-4">
      <p className="font-semibold text-gray-700">Filter by type:</p>
      <div className="flex flex-wrap gap-2">
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