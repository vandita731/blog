import React from 'react';
import { useDispatch } from 'react-redux';
import authService from '../../appwriter/Auth';
import { logout } from '../../store/authSlice';

function LogoutBtn() {
    const dispatch = useDispatch();

    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout());
        });
    };

    return (
        <button
            onClick={logoutHandler}
            className="px-5 py-2 rounded-full bg-red-500 text-white font-medium
                       hover:bg-red-600 transition duration-300 ease-in-out"
        >
            Logout
        </button>
    );
}

export default LogoutBtn;
