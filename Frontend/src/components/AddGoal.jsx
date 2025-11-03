import React from 'react'

function AddGoal({onClose, onSave}) {
  const handleSubmit =()=>{
    
  }
  return (
    <div className='fixed inset-0 bg-black bg-opacity-30 flex items-end justify-center z-50'>
      <div className='bg-gray-200 flex flex-col'>
        <p>You can add this income to your budget goals</p>
        <input type="text" />
        <button></button>
      </div>
      <div className="flex justify-between mt-4">
        <button className="text-gray-500" onClick={onClose}>Cancel</button>
        <button className="bg-greenCustom text-white px-4 py-2 rounded" onClick={handleSubmit}>Save</button>
      </div>
    </div>
  )
}

export default AddGoal