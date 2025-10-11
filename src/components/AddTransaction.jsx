import React, {useState} from 'react';

function AddTransaction({ onClose, onSave }) {
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('');
    const [type, setType] = useState('expense');

    const handleSubmit = () => {
        if (!title || !amount || !date || !category) return;
        onSave({title, amount: Number(amount), date, category, type});
        onClose();
    };
  return (
    <div className='fixed inset-0 bg-black bg-opacity-30 flex items-end justify-center z-50'>
        <div className="bg-gray-200 p-6 rounded-3xl w-[22rem] shadow-lg">
            <h2>Add Transaction</h2>
            <div className='p-3'>
                <input className='input input-field' placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} />

                <input className='input input-field' placeholder='Amount' type='number' value={amount} onChange={e => setAmount(e.target.value)} />

                <input className='input input-field' placeholder='Date' type='date' value={date} onChange={e => setDate(e.target.value)} />

                <input className='input input-field' placeholder='Category' type='category' value={category} onChange={e => setCategory(e.target.value)} />

                <select className='input input-field' value={type} onChange={e => setType(e.target.value)}>
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
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

export default AddTransaction