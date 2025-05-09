import React from 'react';

const NoEvents = ({ onReset }) => (
  <div className="min-h-[60vh] flex items-center justify-center bg-gray-50 rounded-xl">
    <div className="text-center p-8">
      <h3 className="text-xl font-semibold mb-2 text-gray-800">No Events Found</h3>
      <p className="text-gray-600 mb-6">
        We couldn't find any events matching your filters. Try adjusting your search criteria.
      </p>
      <button 
        onClick={onReset}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
      >
        Reset Filters
      </button>
    </div>
  </div>
);

export default NoEvents;
