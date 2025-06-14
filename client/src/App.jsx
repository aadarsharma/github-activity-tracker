import React, { useState, useEffect } from 'react';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from './firebaseConfig.js'; // Ensure correct path
import EventList from './components/EventList.jsx'; // Ensure correct path
import './App.css';

function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "events"), orderBy("timestamp", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const eventsData = [];
      querySnapshot.forEach((doc) => {
        eventsData.push({ id: doc.id, ...doc.data() });
      });
      setEvents(eventsData);
      console.log("Live data updated:", eventsData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>📦 GitHub Webhook Activity Tracker</h1>
        <p>Events are updated in real-time from Firestore.</p>
      </header>
      <main>
        <EventList events={events} />
      </main>
    </div>
  );
}

export default App;