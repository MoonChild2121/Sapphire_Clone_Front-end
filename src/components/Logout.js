import React from 'react';

const Logout = ({ user, onLogout }) => {
    return (
        <div className="sign">
            <div className="account">Hello, {user.name}!</div>
            <div>Do you wish to log out?</div>
            <div className="account-btn">
                <button onClick={onLogout}>LOG OUT</button>
            </div>
        </div>
    );
};

export default Logout;
