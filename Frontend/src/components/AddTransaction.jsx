import React, { useState, useEffect } from 'react';

// --- Category Lists ---
const expenseCategories = [
  'Food',
  'Transport',
  'Utilities',
  'Rent',
  'Shopping',
  'Entertainment',
  'Other',
];

const incomeCategories = [
  'Salary',
  'Bonus',
  'Gift',
  'Investment',
  'Other',
];

function AddTransaction({ onClose, onSave }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState('expense');
  
  // Set initial category based on default type
  const [category, setCategory] = useState(expenseCategories[0]); 
  
  // Determine which category list to show
  const categoriesToShow = type === 'expense' ? expenseCategories : incomeCategories;

  // --- Effect to reset category when type changes ---
  useEffect(() => {
    // When type changes, reset category to the first one in the new list
    setCategory(categoriesToShow[0]);
  }, [type, categoriesToShow]); // Dependency array

  const handleSubmit = () => {
    if (!title || !amount || !date || !category) return;
    onSave({ title, amount: Number(amount), date, category, type });
    onClose();
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-30 flex items-end justify-center z-50'>
      <div className="bg-gray-200 p-6 rounded-3xl w-[22rem] shadow-lg">
        <h2>Add Transaction</h2>
        <div className='p-3'>
          <input 
            className='input input-field' 
            placeholder='Title' 
            value={title} 
            onChange={e => setTitle(e.target.value)} 
          />

          <input 
            className='input input-field' 
            placeholder='Amount' 
            type='number' 
            value={amount} 
            onChange={e => setAmount(e.target.value)} 
          />

          <input 
            className='input input-field' 
            placeholder='Date' 
            type='date' 
            value={date} 
            onChange={e => setDate(e.target.value)} 
          />
          
          {/* --- Type Dropdown --- */}
          <label className="text-sm font-medium text-gray-700">Type</label>
          <select 
            className='input input-field' 
            value={type} 
            onChange={e => setType(e.target.value)}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>

          {/* --- Category Dropdown (Dynamic) --- */}
          <label className="text-sm font-medium text-gray-700">Category</label>
          <select 
            className='input input-field' 
            value={category} 
            onChange={e => setCategory(e.target.value)}
          >
            {categoriesToShow.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <div className="flex justify-between mt-4">
            <button className="text-gray-500" onClick={onClose}>Cancel</button>
            <button className="bg-greenCustom text-white px-4 py-2 rounded" onClick={handleSubmit}>Save</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddTransaction;
// import React, {useState} from 'react';

// function AddTransaction({ onClose, onSave }) {
//     const [title, setTitle] = useState('');
//     const [amount, setAmount] = useState('');
//     const [date, setDate] = useState('');
//     const [category, setCategory] = useState('');
//     const [type, setType] = useState('expense');

//     const handleSubmit = () => {
//         if (!title || !amount || !date || !category) return;
//         onSave({title, amount: Number(amount), date, category, type});
//         onClose();
//     };
//   return (
//     <div className='fixed inset-0 bg-black bg-opacity-30 flex items-end justify-center z-50'>
//         <div className="bg-gray-200 p-6 rounded-3xl w-[22rem] shadow-lg">
//             <h2>Add Transaction</h2>
//             <div className='p-3'>
//                 <input className='input input-field' placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} />

//                 <input className='input input-field' placeholder='Amount' type='number' value={amount} onChange={e => setAmount(e.target.value)} />

//                 <input className='input input-field' placeholder='Date' type='date' value={date} onChange={e => setDate(e.target.value)} />

//                 <input className='input input-field' placeholder='Category' type='category' value={category} onChange={e => setCategory(e.target.value)} />
//                 {/* <select className='input input-field' value={type} onChange={e => setType(e.target.value)}>
//                     <option value="Food">Food</option>
//                     <option value="income">Income</option>
//                 </select> */}
//                 <select className='input input-field' value={type} onChange={e => setType(e.target.value)}>
//                     <option value="expense">Expense</option>
//                     <option value="income">Income</option>
//                 </select>

//                 <div className="flex justify-between mt-4">
//                     <button className="text-gray-500" onClick={onClose}>Cancel</button>
//                     <button className="bg-greenCustom text-white px-4 py-2 rounded" onClick={handleSubmit}>Save</button>
//                 </div>
//             </div>
            
//         </div>
//     </div>
//   )
// }

// export default AddTransaction