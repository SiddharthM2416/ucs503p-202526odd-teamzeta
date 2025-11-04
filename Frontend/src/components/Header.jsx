import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import icon from '../assets/profile-icon.png';
import Profile from './Profile';
import { auth } from '../firebase.js';
// import bell from './assets/bell 1.png'

function Header({income, expense, displayName}) {
    const navigate2= useNavigate();
    const [showProfile, setShowProfile] = useState(false);
    const user = auth.currentUser;
    const balance = income - expense;
  return (
    <div>
        <div className='bg-gradient-to-b from-card via-greenCustom to-bgCustom flex flex-col w-full h-[35rem] px-10 py-20'>

            <div className='flex items-center justify-between'>
                <div>
                <p className='text-customLightText text-lg font-medium font-inter p-0.5'>Hello,</p>
                <p className=' text-customLightText text-4xl font-semibold font-inter p-0.5'>{displayName || 'User'}</p>
                </div>
                    <button className='bg-card' onClick={()=>{
                        navigate2('/goals')
                    }}>Goals</button>
                    <button className='bg-card ' onClick={()=>{
                        navigate2('/dashboard')
                    }}>Dashboard</button>
                <button className='bg-transparent focus:outline-none focus:ring-2 focus:ring-white rounded-full' onClick={() => setShowProfile(true)}><img src={icon} className='w-10 h-10 rounded-full' /></button>
                {showProfile && <Profile onCloseProfile={()=> setShowProfile(false)}/>}
            </div>
            
            {/*<img src={bell} className='h-[23.33px] w-[23.33px]'/> */}
            <div className='bg-card h-[16rem] mt-16 border border-none rounded-3xl shadow-lg'>
                <div className='py-6 px-10 text-customLightText font-inter'>
                    <p className='text-base font-semibold p-1'>Total Balance</p>
                    <p className='text-4xl font-bold p-0.5'>₹{balance}</p>
                </div>

                <div className='flex items-center justify-between px-10 py-5 mt-6 font-inter'>
                    <div className=''>
                        <p className='font-medium p-1'>Income</p>
                        <p className='font-semibold text-xl p-1'>₹{income}</p>
                    </div>

                    <div className=''>
                        <p className='font-medium p-1'>Expenditure</p>
                        <p className='font-semibold text-xl p-1'>₹{expense}</p>
                    </div>
                </div>

            </div>
        </div>
        
    </div>
  )
}

export default Header