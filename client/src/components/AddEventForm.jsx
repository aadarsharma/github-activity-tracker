import React, { useState } from 'react';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const AddEventForm = () => {
  const [repo, setRepo] = useState('');
  const [actor, setActor] = useState('');
  const [type, setType] = useState('star');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!repo.trim() || !actor.trim()) {
      setError('Repository and Actor names cannot be empty.');
      return;
    }

    setIsLoading(true);
    setError('');

    const newEvent = {
      repo,
      actor,
      type,
      timestamp: Timestamp.now(),
      details: `Manually added ${type} event`,
    };

    try {
      await addDoc(collection(db, 'events'), newEvent);
      setRepo('');
      setActor('');
      setType('star');
    } catch (err) {
      console.error("Error adding document: ", err);
      setError('Failed to add event. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Responsive Padding: smaller on mobile (p-4), larger on small screens and up (sm:p-6)
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-6">
      {/* Responsive Text: larger on mobile (text-xl), even larger on small screens and up (sm:text-2xl) */}
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800">Add Event Manually</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="repo" className="block text-sm font-medium text-gray-700 text-left mb-1">
            Repository Name
          </label>
          <input
            id="repo"
            type="text"
            value={repo}
            onChange={(e) => setRepo(e.target.value)}
            placeholder="e.g., my-new-project"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-base"
          />
        </div>

        <div>
          <label htmlFor="actor" className="block text-sm font-medium text-gray-700 text-left mb-1">
            Actor / Username
          </label>
          <input
            id="actor"
            type="text"
            value={actor}
            onChange={(e) => setActor(e.target.value)}
            placeholder="e.g., code-enthusiast"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-base"
          />
        </div>

        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700 text-left mb-1">
            Event Type
          </label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-base"
          >
            <option value="star">Star ⭐</option>
            <option value="push">Push 🚀</option>
            <option value="issue">Issue 📝</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400"
        >
          {isLoading ? 'Adding...' : 'Add Event'}
        </button>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default AddEventForm;