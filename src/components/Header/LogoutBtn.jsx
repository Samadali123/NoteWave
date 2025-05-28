
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';

function LogoutBtn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const logoutHandler = async () => {
        setLoading(true);
        try {
            await authService.logout();
            dispatch(logout());
            navigate("/");
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
