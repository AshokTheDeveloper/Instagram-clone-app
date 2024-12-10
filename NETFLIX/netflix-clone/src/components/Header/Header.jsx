import React from "react";
import logo from "../../assets/logo.png";
import search from "../../assets/search_icon.svg";
import bellIcon from "../../assets/bell_icon.svg";
import profileImage from "../../assets/profile_img.png";
import caratIcon from "../../assets/caret_icon.svg";
import "./Header.css";

const Header = () => {
  return (
    <>
      <div className="header-container">
        <div className="header-logo-container">
          <img src={logo} alt="Netflix Logo" className="netflix-logo" />
          <ul>
            <li>Home</li>
            <li>TV Shows</li>
            <li>New & Popular</li>
            <li>My List</li>
            <li>Browse by Language</li>
          </ul>
        </div>
        <div className="header-right-section">
          <img src={search} alt="search_icon" className="icons" />
          <p>children</p>
          <img src={bellIcon} alt="bell_icon" className="icons" />
          <div className="profile-container">
            <img
              src={profileImage}
              alt="profile_image"
              className="profile-icon"
            />
            <img src={caratIcon} alt="caret_image" />
            <div className="dropdown">
              <p>Sign out of netflix</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
