import React, { useState, useEffect, useRef } from 'react';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from './firebaseConfig.js';
import EventList from './components/EventList.jsx';
import EventFilter from './components/EventFilter.jsx';
import AddEventForm from './components/AddEventForm.jsx';

function App() {
  const [events, setEvents] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const lastUpdateTime = useRef(Date.now()); // Ref to store the last update time

  useEffect(() => {
    const q = query(collection(db, "events"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const now = Date.now();
      const newEventsData = [];
      querySnapshot.forEach((doc) => {
        newEventsData.push({ id: doc.id, ...doc.data(), isNew: doc.data().timestamp?.toDate().getTime() > lastUpdateTime.current - 5000 }); // Consider events within the last 5 seconds as new
      });
      setEvents(newEventsData);
      lastUpdateTime.current = now;
    });
    return () => unsubscribe();
  }, []);

  const filteredEvents = events.filter(event => {
    if (activeFilter === 'all') return true;
    return event.type === activeFilter;
  });

  return (
    <div className="bg-gray-100 min-h-screen font-sans text-gray-800 pb-12">
      <div className="text-center">
        <header className="bg-gray-800 text-white p-6 mb-8 shadow-lg">
          <h1 className="text-3xl md:text-4xl font-bold">📦 GitHub Webhook Activity Tracker</h1>
          <p className="text-gray-300 mt-1">Events are updated in real-time from Firestore.</p>
        </header>
        <main className="max-w-4xl mx-auto px-4">
          <AddEventForm />
          <EventFilter activeFilter={activeFilter} setFilter={setActiveFilter} />
          <EventList events={filteredEvents} />
        </main>
      </div>
    </div>
  );
}

export default App;