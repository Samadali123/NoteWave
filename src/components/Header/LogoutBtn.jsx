// import React from 'react'
// import {useDispatch} from 'react-redux'
// import authService from '../../appwrite/auth'
// import {logout} from '../../store/authSlice'

// function LogoutBtn() {
//     const dispatch = useDispatch()
//     const logoutHandler = () => {
//         authService.logout().then(() => {
//             dispatch(logout())
//         })
//     }
//   return (
//     <button
//     className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
//     onClick={logoutHandler}
//     >Logout</button>
//   )
// }

// export default LogoutBtn



import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';

function LogoutBtn() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const logoutHandler = async () => {
        setLoading(true);
        try {
            await authService.logout();
            dispatch(logout());
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            className={`inline-flex items-center gap-2 px-6 py-2 rounded-full font-semibold transition-colors duration-200
                ${loading ? 'bg-blue-200 cursor-not-allowed' : 'bg-blue-100 hover:bg-blue-200'}
                text-blue-600
            `}
            onClick={logoutHandler}
            disabled={loading}
        >
            {loading ? (
                <div className="h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            ) : (
                'Logout'
            )}
        </button>
    );
}

export default LogoutBtn;
