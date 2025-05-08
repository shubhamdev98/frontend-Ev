import React, { useState } from 'react';
import EventSearch from './EventSearch';
import EventCard from './EventCard';
import EventModal from './EventModal';
import Pagination from './Pagination';
import BookingFlow from '../Booking/BookingFlow';
import { eventsData } from '../../data/eventsData';

const EventCardList = () => {
  const [events, setEvents] = useState(eventsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [bookmarkedEvents, setBookmarkedEvents] = useState({});
  const [bookings, setBookings] = useState({});
  const [sortBy, setSortBy] = useState('date');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showBookingFlow, setShowBookingFlow] = useState(false);

  const eventsPerPage = 6;

  const allTags = [...new Set(events.flatMap(event => event.tags))];

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleTagFilter = (tag) => {
    setSelectedTag(prev => (prev === tag ? '' : tag));
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

    setBookings(prev => ({
      ...prev,
      [eventId]: !prev[eventId]
    }));

    setSelectedEvent(event);
    setShowBookingFlow(true);
  };

  const handleMoreInfo = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseBookingFlow = () => {
    setShowBookingFlow(false);
  };

  const filteredEvents = events
    .filter(event =>
      (event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!selectedTag || event.tags.includes(selectedTag))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price': return a.price - b.price;
        case 'capacity': return b.capacity - a.capacity;
        case 'date': return new Date(a.date) - new Date(b.date);
        default: return 0;
      }
    });

  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  const indexOfLast = currentPage * eventsPerPage;
  const indexOfFirst = indexOfLast - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirst, indexOfLast);

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div className="container mx-auto px-4 py-8">
      <EventSearch
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        sortBy={sortBy}
        handleSort={handleSort}
        allTags={allTags}
        selectedTag={selectedTag}
        handleTagFilter={handleTagFilter}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
        {currentEvents.map(event => (
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

      {filteredEvents.length === 0 && (
        <p className="text-center text-gray-500 py-12">No event packages found matching your criteria</p>
      )}

      {filteredEvents.length > 0 && (
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

      {showBookingFlow && selectedEvent && (
        <BookingFlow event={selectedEvent} onClose={handleCloseBookingFlow} />
      )}
    </div>
  );
};

export default EventCardList;
