import React from 'react';
import Navbar from '../components/Navbar';
import EventCardList from '../components/EventPage/EventCardList';
import BaseFooter from '../components/BaseFooter';
  const EventsPage = () => {
    return (
    <div className="min-h-screen pt-14 bg-gray-50">
      <Navbar />
      <main className="pt-20 pb-16">
        <EventCardList />
      </main>
      <BaseFooter/>
    </div>
  );
};

export default EventsPage;