import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaSearch, FaUserCircle, FaCompass } from 'react-icons/fa'

export const Navbar = ({ connectWallet, account, state }) => {
    const { provider, signer, contract } = state;
    const location = useLocation();
    const [searchQuery, setSearchQuery] = useState('');

    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
    }

    return (
        <nav className="navbar">
            <div className="nav-brand">
                <Link to="/">
                    <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Pinterest-logo.png" 
                        alt="D-Pinterest" 
                        className="logo"
                    />
                </Link>
            </div>

            <div className="search-container">
  <FaSearch className="search-icon" />
  <input
    type="text"
    placeholder="Search for pins..."
    value={searchQuery}
    onChange={(e) => {
      console.log("Input value:", e.target.value); // Debugging line
      setSearchQuery(e.target.value);
    }}
    className="search-input"
  />
</div>

            <div className="nav-links">
                <Link to="/explore" className={`nav-link ${isActive('/explore')}`}>
                    <FaCompass className="nav-icon" />
                    <span>Explore</span>
                </Link>
                <Link to="/profile" className={`nav-link ${isActive('/profile')}`}>
                    <FaUserCircle className="nav-icon" />
                    <span>Profile</span>
                </Link>
                <button 
                    onClick={connectWallet}
                    className={`connect-button ${account ? 'connected' : ''}`}
                >
                    {account ? `${account.slice(0,6)}...${account.slice(-4)}` : 'Connect Wallet'}
                </button>
            </div>
        </nav>
    )
}


