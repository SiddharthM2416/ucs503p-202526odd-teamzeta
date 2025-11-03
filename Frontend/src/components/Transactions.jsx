import React, { useState, useEffect, useCallback } from 'react';
import AddTransaction from './AddTransaction';
import apiClient from '../axios/api'; // We now use this for all API calls

function Transactions({ userId, onTotalsUpdate }) {
  const [transactions, setTransactions] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // 1. Fetch all transactions from the backend
  const fetchTransactions = useCallback(async () => {
    try {
      // Use apiClient.get()
      // No token or headers are needed here; the interceptor handles it.
      const response = await apiClient.get('/transactions');
      
      // Axios returns data in the .data property
      setTransactions(response.data); 
    } catch (err) {
      console.error("Error fetching transactions:", err);
    }
  }, []);

  // 2. Fetch data when the component loads (or userId changes)
  useEffect(() => {
    if (userId) {
      fetchTransactions();
    }
  }, [userId, fetchTransactions]);

  // 3. Update totals (This logic doesn't change)
  useEffect(() => {
    const income = transactions
      .filter(tx => tx.type === 'income')
      .reduce((sum, tx) => sum + tx.amount, 0);
    
    const expense = transactions
      .filter(tx => tx.type === 'expense')
      .reduce((sum, tx) => sum + tx.amount, 0);
      
    onTotalsUpdate({ income, expense });
  }, [transactions, onTotalsUpdate]);

  // 4. Add a new transaction
  const addTransaction = async (newTx) => {
    try {
      // Use apiClient.post()
      // The second argument (newTx) is automatically sent as the JSON body.
      await apiClient.post('/transactions', newTx);

      // Refresh the list from the server
      fetchTransactions();
      setShowModal(false); // Close modal on success
    } catch (err) {
      console.error("Error adding transaction:", err);
    }
  };

  // 5. Delete a transaction
  const handleDelete = async (transactionId) => {
    if (!window.confirm('Are you sure you want to delete this transaction?')) {
      return;
    }

    try {
      // Use apiClient.delete()
      await apiClient.delete(`/transactions/${transactionId}`);
      
      // On success, refresh the list
      fetchTransactions();
    } catch (err) {
      console.error("Error deleting transaction:", err);
    }
  };

  // --- JSX remains exactly the same ---
  return (
    <div className='text-customDarkText pb-24 font-inter'>
      <div className='p-6 font-inter'>
        <p className='font-semibold text-lg'>Transaction History</p>
      </div>

      <div className='px-6'>
        {transactions.length === 0 ? (
          <div className="text-center text-gray-500 italic mt-10">
            <p>No transactions yet.</p>
            <p>Click <span className="font-semibold text-greenCustom">+ Add Transaction</span> to begin.</p>
          </div>
        ) : (
          <ul className='space-y-2'>
            {transactions.map((tx) => (
              <li key={tx._id} className='bg-white shadow p-3 rounded-md'>
                <div className='flex justify-between'>
                  <div>
                    <p className='font-semibold'>{tx.title}</p>
                    <p className='text-sm text-gray-500'>{new Date(tx.date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className={`font-semibold ${tx.type === 'income' ? 'text-green-600' : 'text-red-500'}`}>
                      {tx.type === 'income' ? '+' : '-'}${tx.amount.toFixed(2)}
                    </p>
                    <button onClick={() => handleDelete(tx._id)} className="text-red-500 hover:text-red-700 text-xs ml-2 bg-gray"> Delete </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        className='fixed bottom-6 right-6 bg-greenCustom text-customLightText px-6 py-3 rounded-full shadow-lg font-semibold'
        onClick={() => setShowModal(true)}
      >
        + Add Transaction
      </button>

      {showModal && (
        <AddTransaction
          onClose={() => setShowModal(false)}
          onSave={addTransaction} // This now calls the API version
        />
      )}
    </div>
  );
}

export default Transactions;

// // components/Transactions.js

// import React, { useState, useEffect, useCallback } from 'react';
// import AddTransaction from './AddTransaction';
// import { getAuth } from 'firebase/auth'; // Import getAuth
// import apiClient from '../axios/api';
// // This URL should be in your .env file
// const API_URL = 'http://localhost:3001/api'; 

// function Transactions({ userId, onTotalsUpdate }) {
//   const [transactions, setTransactions] = useState([]);
//   const [showModal, setShowModal] = useState(false);

//   // Helper function to get the auth token
//   const getToken = async () => {
//     const auth = getAuth();
//     if (!auth.currentUser) return null;
//     return await auth.currentUser.getIdToken();
//   };

//   // 1. Fetch all transactions from the backend
//   const fetchTransactions = useCallback(async () => {
//     const token = await getToken();
//     if (!token) return; // Not logged in

//     try {
//       const res = await fetch(`${API_URL}/transactions`, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
//       if (!res.ok) throw new Error('Failed to fetch');
      
//       const data = await res.json();
//       setTransactions(data);
//     } catch (err) {
//       console.error("Error fetching transactions:", err);
//     }
//   }, []); // No dependencies, it's stable

//   // 2. Fetch data when the component loads (or userId changes)
//   useEffect(() => {
//     if (userId) {
//       fetchTransactions();
//     }
//   }, [userId, fetchTransactions]);

//   // 3. Update totals whenever transactions state changes
//   useEffect(() => {
//     const income = transactions
//       .filter(tx => tx.type === 'income')
//       .reduce((sum, tx) => sum + tx.amount, 0);
    
//     const expense = transactions
//       .filter(tx => tx.type === 'expense')
//       .reduce((sum, tx) => sum + tx.amount, 0);
      
//     onTotalsUpdate({ income, expense });
//   }, [transactions, onTotalsUpdate]);

//   // 4. Add a new transaction
//   const addTransaction = async (newTx) => {
//     const token = await getToken();
//     if (!token) return;

//     try {
//       const res = await fetch(`${API_URL}/transactions`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(newTx)
//       });
//       if (!res.ok) throw new Error('Failed to add transaction');

//       // Refresh the list from the server to get the new item
//       fetchTransactions();
//       setShowModal(false); // Close modal on success
//     } catch (err) {
//       console.error("Error adding transaction:", err);
//     }
//   };

//   // 5. Delete a transaction
//   const handleDelete = async (transactionId) => {
//     if (!window.confirm('Are you sure you want to delete this transaction?')) {
//       return;
//     }

//     const token = await getToken();
//     if (!token) return;

//     try {
//       const res = await fetch(`${API_URL}/transactions/${transactionId}`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       if (!res.ok) throw new Error('Failed to delete transaction');
      
//       // On success, refresh the list
//       fetchTransactions();
//     } catch (err) {
//       console.error("Error deleting transaction:", err);
//     }
//   };

//   // --- JSX remains the same ---
//   return (
//     <div className='text-customDarkText pb-24 font-inter'>
//       <div className='p-6 font-inter'>
//         <p className='font-semibold text-lg'>Transaction History</p>
//       </div>

//       <div className='px-6'>
//         {transactions.length === 0 ? (
//           <div className="text-center text-gray-500 italic mt-10">
//             <p>No transactions yet.</p>
//             <p>Click <span className="font-semibold text-greenCustom">+ Add Transaction</span> to begin.</p>
//           </div>
//         ) : (
//           <ul className='space-y-2'>
//             {transactions.map((tx) => (
//               <li key={tx._id} className='bg-white shadow p-3 rounded-md'> {/* Use tx._id from MongoDB */}
//                 <div className='flex justify-between'>
//                   <div>
//                     <p className='font-semibold'>{tx.title}</p>
//                     <p className='text-sm text-gray-500'>{new Date(tx.date).toLocaleDateString()}</p> {/* Format date */}
//                   </div>
//                   <div>
//                     <p className={`font-semibold ${tx.type === 'income' ? 'text-green-600' : 'text-red-500'}`}>
//                       {tx.type === 'income' ? '+' : '-'}${tx.amount.toFixed(2)}
//                     </p>
//                     <button onClick={() => handleDelete(tx._id)} className="text-red-500 hover:text-red-700 text-xs ml-2 bg-gray"> Delete </button>
//                   </div>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       <button
//         className='fixed bottom-6 right-6 bg-greenCustom text-customLightText px-6 py-3 rounded-full shadow-lg font-semibold'
//         onClick={() => setShowModal(true)}
//       >
//         + Add Transaction
//       </button>

//       {showModal && (
//         <AddTransaction
//           onClose={() => setShowModal(false)}
//           onSave={addTransaction} // This now calls the API version
//         />
//       )}
//     </div>
//   );
// }

// export default Transactions;
// import React, { useState, useEffect, useRef } from 'react';
// import AddTransaction from './AddTransaction';

// function Transactions({ userId, onTotalsUpdate }) {
//   const [transactions, setTransactions] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [showGoal, setShowGoal] = useState(false);
//   const isInitialMount = useRef(true);

//   useEffect(() => {
//     if (userId) {
//       const storageKey = `transactions_${userId}`;
//       const saved = localStorage.getItem(storageKey);

//       if (saved) {
//         setTransactions(JSON.parse(saved));
//       } else {
//         setTransactions([]);
//       }
//     }
//   }, [userId]);   // re-renders when user id changes

//   // Controls visibility of the Add Transaction modal.

//   // Update totals for header
//   const updateTotals = (txList) => {
//     const income = txList.filter(tx => tx.type === 'income')
//                          .reduce((sum, tx) => sum + tx.amount, 0);
//     const expense = txList.filter(tx => tx.type === 'expense')
//                           .reduce((sum, tx) => sum + tx.amount, 0);
//     onTotalsUpdate({ income, expense });
//   };

//   // Save to localStorage whenever transactions change
//   useEffect(() => {
//     if (isInitialMount.current) {
//       isInitialMount.current = false;
//       return;
//     }
//     if (userId) {
//       const storageKey = `transactions_${userId}`;
//       localStorage.setItem(storageKey, JSON.stringify(transactions));
//       updateTotals(transactions);
//     }
    
//   }, [transactions]);

//   const addTransaction = (newTx) => {
//     const transWithId = {...newTx, id: Date.now()};
//     // const updated = [...transactions, newTx];
//     setShowGoal(true);
//     setTransactions([...transactions, transWithId]);
//     {showGoal&& newTx.type==='Income' &&
//       <AddGoal
//         onClose= {()=> setShowGoal(false)}
//       />

//     }
//     // updateTotals(updated);
//   };

//   const handleDelete = (transactionId) => {
//     const updatedTransactions = transactions.filter(tx => tx.id !== transactionId);
//     setTransactions(updatedTransactions);
//   };

//   return (
//     <div className='text-customDarkText pb-24 font-inter'>
//       <div className='p-6 font-inter'>
//         <p className='font-semibold text-lg'>Transaction History</p>
//       </div>

//       <div className='px-6'>
//         {transactions.length === 0 ? (
//         <div className="text-center text-gray-500 italic mt-10">
//           <p>No transactions yet.</p>
//           <p>Click <span className="font-semibold text-greenCustom">+ Add Transaction</span> to begin.</p>
//         </div>
//           ) : (
//           <ul className='space-y-2'>
//             {transactions.map((tx) => (
//               <li key={tx.id}className='bg-white shadow p-3 rounded-md'>
//                 <div className='flex justify-between'>
//                   <div>
//                     <p className='font-semibold text-2xl'>{tx.category}</p>
//                     <p className='text-sm'>{tx.title}</p>
//                     <p className='text-sm text-gray-500'>{tx.date}</p>
//                   </div>
//                   <div className=' flex flex-col justify-end'>
//                     <p className={`font-semibold text-4xl ${tx.type === 'income' ? 'text-green-600' : 'text-red-500'}`}>
//                       {tx.type === 'income' ? '+' : '-'}₹{tx.amount.toFixed(2)}
//                     </p>
//                     <button onClick={() => handleDelete(tx.id)} className="text-red-500 hover:text-red-700 text-xs ml-2 bg-gray"> Delete </button>
//                   </div>
                  
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       <button
//         className='fixed bottom-6 right-6 bg-greenCustom text-customLightText px-6 py-3 rounded-full shadow-lg font-semibold'
//         onClick={() => setShowModal(true)}
//       >
//         + Add Transaction
//       </button>

//       {showModal && (
//         <AddTransaction
//           onClose={() => setShowModal(false)}
//           onSave={addTransaction}
//         />
//       )}
//     </div>
//   );
// }

// export default Transactions;
