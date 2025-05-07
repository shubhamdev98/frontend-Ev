import React, { useState } from 'react';
import EventSearch from './EventSearch';
import EventCard from './EventCard';
import EventModal from './EventModal';
import Pagination from './Pagination';
import { eventsData } from '../../data/eventsData';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const EventCardList = () => {
  const [events, setEvents] = useState(eventsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [bookings, setBookings] = useState({});
  const [bookmarkedEvents, setBookmarkedEvents] = useState({});
  const [sortBy, setSortBy] = useState('date');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 6;

  const allTags = [...new Set(events.flatMap(event => event.tags))];

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleTagFilter = (tag) => {
    setSelectedTag(tag === selectedTag ? '' : tag);
    setIsMobileFiltersOpen(false);
    setCurrentPage(1);
  };

  const handleSort = (criteria) => {
    setSortBy(criteria);
    setCurrentPage(1);
  };

  const handleBookmark = (eventId, e) => {
    e.stopPropagation();
    setBookmarkedEvents(prev => ({
      ...prev,
      [eventId]: !prev[eventId]
    }));
  };

  const handleBook = (eventId) => {
    const event = events.find(e => e.id === eventId);
    if (!event) return;

    setEvents(prevEvents => 
      prevEvents.map(e => {
        if (e.id === eventId) {
          const newAttendees = bookings[eventId] ? e.attendees - 1 : e.attendees + 1;
          return { ...e, attendees: newAttendees };
        }
        return e;
      })
    );

    setBookings(prev => ({
      ...prev,
      [eventId]: !prev[eventId]
    }));
  };

  const handleMoreInfo = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const filteredAndSortedEvents = events
    .filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTag = !selectedTag || event.tags.includes(selectedTag);
      return matchesSearch && matchesTag;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'capacity':
          return b.capacity - a.capacity;
        case 'date':
          return new Date(a.date) - new Date(b.date);
        default:
          return 0;
      }
    });

  const totalPages = Math.ceil(filteredAndSortedEvents.length / eventsPerPage);
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredAndSortedEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <EventSearch 
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        sortBy={sortBy}
        handleSort={handleSort}
        isMobileFiltersOpen={isMobileFiltersOpen}
        setIsMobileFiltersOpen={setIsMobileFiltersOpen}
        allTags={allTags}
        selectedTag={selectedTag}
        handleTagFilter={handleTagFilter}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 mt-8">
        {currentEvents.map((event) => (
          <EventCard 
            key={event.id} 
            event={event}
            isBookmarked={bookmarkedEvents[event.id]}
            isBooked={bookings[event.id]}
            onBookmark={handleBookmark}
            onBook={handleBook}
            onMoreInfo={handleMoreInfo}
            selectedTag={selectedTag}
            handleTagFilter={handleTagFilter}
          />
        ))}
      </div>
      
      {filteredAndSortedEvents.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No event packages found matching your criteria</p>
        </div>
      ) : (
        <div className="mt-8">
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            siblingCount={1}
            boundaryCount={1}
          />
        </div>
      )}

      <EventModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        event={selectedEvent}
      />
    </div>
  );
};

export default EventCardList;