import React, { useState, useEffect, useRef } from 'react';
import AddTransaction from './AddTransaction';

function Transactions({ userId, onTotalsUpdate }) {
  const [transactions, setTransactions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (userId) {
      const storageKey = `transactions_${userId}`;
      const saved = localStorage.getItem(storageKey);

      if (saved) {
        setTransactions(JSON.parse(saved));
      } else {
        setTransactions([]);
      }
    }
  }, [userId]);   // re-renders when user id changes

  // Controls visibility of the Add Transaction modal.

  // Update totals for header
  const updateTotals = (txList) => {
    const income = txList.filter(tx => tx.type === 'income')
                         .reduce((sum, tx) => sum + tx.amount, 0);
    const expense = txList.filter(tx => tx.type === 'expense')
                          .reduce((sum, tx) => sum + tx.amount, 0);
    onTotalsUpdate({ income, expense });
  };

  // Save to localStorage whenever transactions change
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (userId) {
      const storageKey = `transactions_${userId}`;
      localStorage.setItem(storageKey, JSON.stringify(transactions));
      updateTotals(transactions);
    }
    
  }, [transactions]);

  const addTransaction = (newTx) => {
    const transWithId = {...newTx, id: Date.now()};
    // const updated = [...transactions, newTx];
    setTransactions([...transactions, transWithId]);
    // updateTotals(updated);
  };

  const handleDelete = (transactionId) => {
    const updatedTransactions = transactions.filter(tx => tx.id !== transactionId);
    setTransactions(updatedTransactions);
  };

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
              <li key={tx.id}className='bg-white shadow p-3 rounded-md'>
                <div className='flex justify-between'>
                  <div>
                    <p className='font-semibold'>{tx.title}</p>
                    <p className='text-sm text-gray-500'>{tx.date}</p>
                  </div>
                  <div>
                    <p className={`font-semibold ${tx.type === 'income' ? 'text-green-600' : 'text-red-500'}`}>
                      {tx.type === 'income' ? '+' : '-'}${tx.amount.toFixed(2)}
                    </p>
                    <button onClick={() => handleDelete(tx.id)} className="text-red-500 hover:text-red-700 text-xs ml-2 bg-gray"> Delete </button>
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
          onSave={addTransaction}
        />
      )}
    </div>
  );
}

export default Transactions;
