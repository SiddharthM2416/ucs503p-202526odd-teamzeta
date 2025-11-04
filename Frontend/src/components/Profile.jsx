import React from 'react'
import icon from '../assets/close-icon.png';
import {auth} from '../firebase.js';

function Profile({onCloseProfile}) {
    const user = auth.currentUser;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center '>
        <div className="bg-gray-200 p-6 rounded-3xl w-[22rem] shadow-lg text-customDarkText">
            <div className='flex justify-between items-center'>
                <h2 className='font-inter font-bold text-2xl'>User Profile</h2>
                <button className='bg-transparent focus:outline-none' onClick={onCloseProfile}>
                    <img src={icon} alt='close' className='h-10 w-10'/>
                </button>
            </div>
            
            <div className='mt-5'>
                <label className='font-semibold text-lg'>Name:</label>
                <p className='text-gray-700 font-medium p-1'>{user?.displayName || 'N/A'}</p>
            </div>
            <div>
                <label className='font-semibold text-lg'>Email:</label>
                <p className='text-gray-700 font-medium p-1'>{user?.email || 'N/A'}</p>
            </div>
            
        </div>
    </div>
  )
}

export default Profile