import React, { useState, useEffect } from 'react';
import { eventsData } from '../data/eventsData';
import Navbar from '../components/common/Navbar';
import EventCard from '../components/Event/EventCard';
import EventsHeader from '../components/Event/EventsHeader';
import EventsFilter from '../components/Event/EventsFilter';
import Loading from '../components/common/Loading';
import NoEvents from '../components/Event/NoEvents';
import Pagination from '../components/Event/Pagination';
import BaseFooter from '../components/common/BaseFooter'; 

const EventsPage = () => {
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const eventsPerPage = 12;

  const [filters, setFilters] = useState({
    searchTerm: '',
    tags: [],
    priceRange: [0, 20000]
  });

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      applyFilters();
      setLoading(false);
    }, 500);
  }, [filters, currentPage]);

  const applyFilters = () => {
    let result = [...eventsData];

    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      result = result.filter(event =>
        event.title.toLowerCase().includes(searchLower) ||
        event.description.toLowerCase().includes(searchLower) ||
        event.location.toLowerCase().includes(searchLower) ||
        event.theme.toLowerCase().includes(searchLower)
      );
    }

    if (filters.tags.length > 0) {
      result = result.filter(event =>
        event.tags.some(tag => filters.tags.includes(tag))
      );
    }

    result = result.filter(
      event => event.price >= filters.priceRange[0] && event.price <= filters.priceRange[1]
    );

    setTotalPages(Math.ceil(result.length / eventsPerPage));
    const startIndex = (currentPage - 1) * eventsPerPage;
    const paginatedEvents = result.slice(startIndex, startIndex + eventsPerPage);
    setFilteredEvents(paginatedEvents);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentPage(page);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-45 max-w-7xl">
        <EventsHeader />
        <EventsFilter onFilterChange={handleFilterChange} />

        {/* Event Count */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-semibold text-gray-800">
            {loading ? (
              <div className="flex items-center">
                <Loading text="Loading events..." />
              </div>
            ) : (
              <>
                Showing <span className="text-indigo-600">{filteredEvents.length}</span> of{' '}
                <span className="text-indigo-600">
                  {
                    eventsData.filter(
                      event => event.price >= filters.priceRange[0] && event.price <= filters.priceRange[1]
                    ).length
                  }
                </span>{' '}
                events
              </>
            )}
          </h2>
        </div>

        {/* Event Grid or States */}
        {loading ? (
          <Loading text="Loading exciting events..." />
        ) : filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mb-12">
            {filteredEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <NoEvents onReset={() => handleFilterChange({ searchTerm: '', tags: [], priceRange: [0, 20000] })} />
        )}

        {/* Pagination */}
        {!loading && filteredEvents.length > 0 && totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
      <BaseFooter/>
    </>
  );
};

export default EventsPage;
