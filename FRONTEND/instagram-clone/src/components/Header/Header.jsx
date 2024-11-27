import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { GoHomeFill, GoHome } from "react-icons/go";
import {
  IoPersonCircleOutline,
  IoSearchOutline,
  IoPaperPlaneOutline,
} from "react-icons/io5";
import { FaRegCompass, FaRegHeart, FaThreads } from "react-icons/fa6";
import { BiMoviePlay } from "react-icons/bi";
import { RxHamburgerMenu } from "react-icons/rx";
import { FiInstagram, FiPlusSquare, FiSun } from "react-icons/fi";
import { LuPlaySquare } from "react-icons/lu";
import { MdVideocam } from "react-icons/md";
import { SlGraph } from "react-icons/sl";
import Popup from "reactjs-popup";
import { RxCross2 } from "react-icons/rx";
import { RxCrossCircled } from "react-icons/rx";
import { RiSettings2Line, RiMessengerLine } from "react-icons/ri";
import { LuActivitySquare } from "react-icons/lu";
import { TbMessageReport } from "react-icons/tb";

import "./header.css";

const Header = () => {
  const navigate = useNavigate();

  const [showSearch, setShowSearch] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [post, setPost] = useState("");

  useEffect(() => {
    initiateUploadPostApi();
  }, [post]);

  // Upload API should be implemented tomorrow
  const initiateUploadPostApi = () => {
    const preset = "insta-project";
    const cloudName = "dmui27xl3";
    const postData = new FormData();
    postData.append("file", post);
    postData.append("upload_preset", preset);
    postData.append("cloud_name", cloudName);
    const apiUrl = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
  };

  // Logout
  const onLogoutHandle = () => {
    Cookies.remove("jwt_token");
    navigate("/login");
  };

  // Search popup
  const renderSearchContainer = () => (
    <div
      className={`search-bg-container ${
        showSearch ? "" : "expand-search-container"
      }`}
    >
      <div className="search-input-container">
        <h1 className="search-input-text">Search</h1>
        <div className="input-and-clear-button-container">
          <input className="search-input" type="text" placeholder="Search" />
          <button className="clear-result-button">
            <RxCrossCircled className="clear-result-icon" />
          </button>
        </div>
      </div>
      <div className="search-results-container">
        <h1 className="search-results-recent-text">Recent</h1>
        <div className="search-results">
          <h1 className="no-search-results-text">No recent searches.</h1>
        </div>
      </div>
    </div>
  );

  // Search
  const onHeaderChange = () => {
    setShowSearch(!showSearch);
  };

  //
  const handleFileInput = (event) => {
    setPost(event.target.files[0]);
  };

  // create post Popup
  const onClickCreatePost = () => (
    <Popup
      trigger={
        <button className="post-create-button">
          Post
          <LuPlaySquare className="post-icon" />
        </button>
      }
      modal
      onClick={onHandleCreatePopup}
    >
      {(close) => (
        <div className="post-popup-modal-container">
          <button className="post-popup-close-button" onClick={() => close()}>
            <RxCross2 className="popup-icon" />
          </button>
          <div className="upload-post-container">
            <div className="create-new-post-text-container">
              <p className="create-new-post-text">Create new post</p>
            </div>
            <div className="upload-create-post-container">
              <img
                src="https://res.cloudinary.com/dmui27xl3/image/upload/v1732557089/LOGOS/Group_7_11zon_julzr8.png"
                alt="post icon"
                className="upload-image"
              />
              <p className="upload-post-text">Drag photos and videos here</p>
              <label htmlFor="uploadingImage" className="file-input-label">
                Select from computer
              </label>
              <input
                id="uploadingImage"
                type="file"
                className="file-input"
                onChange={handleFileInput}
              />
            </div>
          </div>
        </div>
      )}
    </Popup>
  );

  const renderCreatePost = () => (
    <div className={`create-post-popup ${showCreate ? "create-popup" : ""}`}>
      {onClickCreatePost()}
      <button className="post-create-button" onClick={onHandleCreatePopup}>
        <p>Live</p>
        <MdVideocam className="post-icon" />
      </button>
      <button className="post-create-button">
        <p>Ad</p>
        <SlGraph className="post-icon" />
      </button>
    </div>
  );

  // More popup
  const onHandleMoreOptions = () => {
    setShowMore(!showMore);
  };

  const renderMoreOptions = () => (
    <div className="more-options-bg-container">
      <div className="more-options-container">
        <div className="more-options-top-container">
          <button type="button" className="more-option-buttons">
            <RiSettings2Line className="more-options-icons" />
            Settings
          </button>
          <button type="button" className="more-option-buttons">
            <LuActivitySquare className="more-options-icons" />
            Your activity
          </button>
          <button type="button" className="more-option-buttons">
            <img
              src="https://res.cloudinary.com/dmui27xl3/image/upload/v1732603244/LOGOS/Rectangle_black_1_ro1y7h.png"
              alt="saved"
              className="saved-more-options-icon"
            />
            Saved
          </button>
          <button type="button" className="more-option-buttons">
            <FiSun className="more-options-icons" />
            Switch appearance
          </button>
          <button type="button" className="more-option-buttons">
            <TbMessageReport className="more-options-icons" />
            Report a problem
          </button>
        </div>
        <div className="more-options-center-container">
          <button type="button" className="more-option-buttons">
            <FaThreads className="more-options-icons" />
            Threads
          </button>
        </div>
        <div className="more-options-center-container">
          <button type="button" className="more-option-buttons">
            switch accounts
          </button>
        </div>
        <div className="more-options-bottom-container">
          <button className="more-option-buttons" onClick={onLogoutHandle}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );

  // Post
  const onHandleCreatePopup = () => {
    setShowCreate(!showCreate);
  };

  const onClickCreate = () => {
    setShowCreate(!showCreate);
  };

  const header = () => (
    <div className={`side-header ${showSearch ? "expanded" : ""}`}>
      <Link className="logo-nav-item-container links" to="/">
        <div className="item">
          {showSearch ? (
            <img
              src="https://res.cloudinary.com/dmui27xl3/image/upload/v1713177035/LOGOS/insta_logo_png_black_n2b04f.png"
              alt="instagram logo"
              className="header-instagram-logo"
            />
          ) : (
            <FiInstagram className="nav-icons" />
          )}
        </div>
      </Link>
      <Link className="nav-item-container links" to="/">
        <div className="item">
          {showSearch ? (
            <GoHomeFill className="nav-icons" />
          ) : (
            <GoHome className="nav-icons" />
          )}
          <span className="search-text">Home</span>
        </div>
      </Link>
      <button
        className="nav-search-button nav-item-container"
        onClick={onHeaderChange}
      >
        <div className="item">
          <IoSearchOutline className="nav-icons" />
          <span className="search-text">Search</span>
        </div>
      </button>
      {renderSearchContainer()}
      <Link className="nav-item-container links" to="/explore">
        <div className="item">
          <FaRegCompass className="nav-icons" />
          <span className="search-text">Explore</span>
        </div>
      </Link>
      <Link className="nav-item-container links" to="/reels">
        <div className="item">
          <BiMoviePlay className="nav-icons" />
          <span className="search-text">Reels</span>
        </div>
      </Link>
      <Link className="nav-item-container links" to="/">
        <div className="item">
          <RiMessengerLine className="nav-icons" />
          <span className="search-text">Messages</span>
        </div>
      </Link>
      <button className="nav-item-container create-button">
        <div>
          <div className="item">
            <FaRegHeart className="nav-icons" />
            <span className="search-text">Notifications</span>
          </div>
        </div>
      </button>
      <button
        className="nav-item-container create-button"
        onClick={onClickCreate}
      >
        <div className="item">
          <FiPlusSquare className="nav-icons" />
          <span className="search-text">Create</span>
        </div>
      </button>
      {renderCreatePost()}
      <Link className="nav-item-container links" to="/user-profile">
        <div className="item">
          <IoPersonCircleOutline className="nav-icons" />
          <span className="search-text">Profile</span>
        </div>
      </Link>
      <button
        className="nav-item-container more-options-button"
        onClick={onHandleMoreOptions}
      >
        <div className="item">
          <RxHamburgerMenu className="nav-icons" />
          <span className="search-text">More</span>
        </div>
      </button>
      {showMore && renderMoreOptions()}
    </div>
  );

  return <>{header()}</>;
};

export default Header;
