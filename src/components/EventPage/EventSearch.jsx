import React, { useState, useRef, useEffect } from 'react';
import { Search, Filter, X, ChevronDown } from 'lucide-react';

const EventSearch = ({ 
  searchTerm, 
  handleSearch, 
  sortBy, 
  handleSort, 
  isMobileFiltersOpen, 
  setIsMobileFiltersOpen, 
  allTags,
  selectedTag,
  handleTagFilter
}) => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsSortOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const sortOptions = [
    { label: 'Sort by Date', value: 'date' },
    { label: 'Sort by Price', value: 'price' },
    { label: 'Sort by Capacity', value: 'capacity' },
  ];

  return (
    <div className="mb-8 relative px-4 sm:px-0">
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        {/* Search Input */}
        <div className="relative flex-1 w-full max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
          <input
            type="text"
            placeholder="Search event packages..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-colors duration-300"
          />
        </div>

        {/* Sort and Filter Buttons - Side by Side */}
        <div className="flex items-center gap-3 w-full lg:w-auto">
          {/* Custom Sort Dropdown */}
          <div className="relative flex-1 sm:flex-none" ref={dropdownRef}>
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="w-full sm:w-auto px-4 py-3 rounded-lg border border-gray-200 flex items-center justify-between gap-2 bg-white cursor-pointer focus:outline-none hover:border-indigo-600"
            >
              <span>
                {sortOptions.find(opt => opt.value === sortBy)?.label || 'Sort'}
              </span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {isSortOpen && (
              <ul className="absolute z-10 mt-2 bg-white border border-gray-200 rounded-lg shadow-md w-full sm:w-38">
                {sortOptions.map((option) => (
                  <li
                    key={option.value}
                    onClick={() => {
                      handleSort(option.value);
                      setIsSortOpen(false);
                    }}
                    className={`px-4 py-2 cursor-pointer hover:bg-indigo-50 ${
                      sortBy === option.value ? 'bg-indigo-100 font-semibold' : ''
                    }`}
                  >
                    {option.label}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Filter Button - Only visible on mobile */}
          <button
            onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
            className="lg:hidden p-3 rounded-lg border border-gray-200 hover:border-indigo-600 transition-colors duration-300 flex items-center gap-2"
            aria-label={isMobileFiltersOpen ? "Close filters" : "Open filters"}
          >
            {isMobileFiltersOpen ? (
              <X className="h-5 w-5 text-gray-700" />
            ) : (
              <Filter className="h-5 w-5 text-gray-700" />
            )}
            <span className="hidden sm:inline">Filters</span>
          </button>
        </div>
      </div>

      {/* Tag Filters - Always visible on desktop, toggleable on mobile */}
      <div className={`
        mt-4 gap-2 
        ${isMobileFiltersOpen ? 'flex' : 'hidden lg:flex'}
        flex-wrap lg:flex-row
        transition-all duration-300 ease-in-out
        overflow-x-auto
        pb-2
      `}>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => handleTagFilter(tag)}
            className={`
              px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300
              ${selectedTag === tag
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-indigo-100'}
            `}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EventSearch;