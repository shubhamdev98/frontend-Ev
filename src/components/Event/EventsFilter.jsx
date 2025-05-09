import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';

const EventsFilter = ({ onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [showFilters, setShowFilters] = useState(false);

  const commonTags = [
    'Wedding', 'Corporate', 'Birthday', 'Charity', 
    'Anniversary', 'Graduation', 'Fashion', 'New Year',
    'Festival', 'Conference', 'Technology'
  ];

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    applyFilters(value, selectedTags, priceRange);
  };

  const handleTagToggle = (tag) => {
    const updatedTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    
    setSelectedTags(updatedTags);
    applyFilters(searchTerm, updatedTags, priceRange);
  };

  const handlePriceChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setPriceRange([0, value]);
    applyFilters(searchTerm, selectedTags, [0, value]);
  };

  const applyFilters = (search, tags, price) => {
    onFilterChange({
      searchTerm: search,
      tags: tags,
      priceRange: price
    });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTags([]);
    setPriceRange([0, 20000]);
    applyFilters('', [], [0, 20000]);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 mb-8">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        {/* Search input */}
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={handleSearch}
            className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          />
        </div>

        {/* Filter toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 transition-colors"
        >
          <Filter size={18} />
          <span>Filters</span>
          {(selectedTags.length > 0 || priceRange[1] < 20000) && (
            <span className="inline-flex items-center justify-center w-5 h-5 ml-1 text-xs font-bold text-white bg-indigo-600 rounded-full">
              {selectedTags.length + (priceRange[1] < 20000 ? 1 : 0)}
            </span>
          )}
        </button>

        {/* Clear filters */}
        {(searchTerm || selectedTags.length > 0 || priceRange[1] < 20000) && (
          <button
            onClick={clearFilters}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X size={18} />
            <span>Clear</span>
          </button>
        )}
      </div>

      {/* Expanded filters */}
      {showFilters && (
        <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tags filter */}
          <div>
            <h3 className="font-medium text-gray-700 mb-3">Event Type</h3>
            <div className="flex flex-wrap gap-2">
              {commonTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => handleTagToggle(tag)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    selectedTags.includes(tag)
                      ? 'bg-indigo-100 text-indigo-800 border border-indigo-200'
                      : 'bg-gray-100 text-gray-700 border border-transparent hover:border-gray-200'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Price range filter */}
          <div>
            <div className="flex justify-between mb-2">
              <h3 className="font-medium text-gray-700">Price Range</h3>
              <span className="text-gray-500 text-sm">
                Up to ${priceRange[1].toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="20000"
              step="500"
              value={priceRange[1]}
              onChange={handlePriceChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="flex justify-between mt-1 text-xs text-gray-500">
              <span>$0</span>
              <span>$5,000</span>
              <span>$10,000</span>
              <span>$15,000</span>
              <span>$20,000</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsFilter;