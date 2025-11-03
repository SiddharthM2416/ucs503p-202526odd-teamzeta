import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'; // You'll need react-router for navigation
import { useNavigate } from 'react-router-dom';
function GoalsPage({ userId }) {
  const [goals, setGoals] = useState([]);
  const [category, setCategory] = useState('');
  const [limit, setLimit] = useState('');
  const isInitialMount = useRef(true);
  const navigate = useNavigate()
  // Load goals from localStorage when the component mounts or userId changes
  useEffect(() => {
    if (userId) {
      const storageKey = `goals_${userId}`;
      const savedGoals = localStorage.getItem(storageKey);
      if (savedGoals) {
        setGoals(JSON.parse(savedGoals));
      } else {
        setGoals([]);
      }
    }
  }, [userId]);

  // Save goals to localStorage whenever the goals list changes
  useEffect(() => {
    // Prevent saving on the initial render before goals are loaded
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (userId) {
      const storageKey = `goals_${userId}`;
      localStorage.setItem(storageKey, JSON.stringify(goals));
    }
  }, [goals, userId]);

  // Handle adding a new goal
  const handleAddGoal = () => {
    if (!category || !limit || isNaN(limit)) {
        alert('Please enter a valid category and a numeric limit.');
        return;
    }
    const newGoal = {
        id: Date.now(),
        category,
        limit: Number(limit)
    };
    setGoals([...goals, newGoal]);
    // Reset input fields
    setCategory('');
    setLimit('');
  };

  // Handle deleting a goal
  const handleDeleteGoal = (goalId) => {
    const updatedGoals = goals.filter(goal => goal.id !== goalId);
    setGoals(updatedGoals);
  };

  return (
    <div className='w-full min-h-screen bg-bgCustom font-inter p-6 text-customDarkText'>
      <div className="flex items-center mb-6">
        <Link to="/home" className="text-greenCustom text-lg font-semibold">← Back</Link>
        <h1 className="text-2xl font-bold text-center flex-grow">Set Spending Goals</h1>
      </div>

      {/* Form to add a new goal */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-3">Add New Goal</h2>
        <div className="space-y-3">
          <input
            className='input input-field'
            placeholder='Category (e.g., Food, Shopping)'
            value={category}
            onChange={e => setCategory(e.target.value)}
          />
          <input
            className='input input-field'
            placeholder='Spending Limit (e.g., 5000)'
            type='number'
            value={limit}
            onChange={e => setLimit(e.target.value)}
          />
          <button
            className="w-full bg-greenCustom text-white px-4 py-2 rounded font-semibold"
            onClick={handleAddGoal}
          >
            Add Goal
          </button>
        </div>
      </div>

      {/* List of current goals */}
      <div>
        <h2 className='font-semibold text-lg mb-3'>Your Goals</h2>
        {goals.length === 0 ? (
          <div className="text-center text-gray-500 italic mt-10">
            <p>You haven't set any goals yet.</p>
            <p>Add a category and a spending limit to start tracking.</p>
          </div>
        ) : (
          <ul className='space-y-2'>
            {goals.map((goal) => (
              <li key={goal.id} className='bg-white shadow p-3 rounded-md flex justify-between items-center'>
                <div>
                  <p className='font-semibold'>{goal.category}</p>
                  <p className='text-sm text-gray-600'>Limit: ₹{goal.limit.toFixed(2)}</p>
                </div>
                <button onClick={() => handleDeleteGoal(goal.id)} className="text-red-500 hover:text-red-700 text-xs bg-gray-100 px-2 py-1 rounded">
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default GoalsPage;