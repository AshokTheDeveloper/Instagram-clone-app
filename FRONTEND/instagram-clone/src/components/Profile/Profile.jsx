import React from "react";
import "./profile.css";
import Header from "../Header/Header";
import { PiGearSixLight } from "react-icons/pi";
import { GoPlus } from "react-icons/go";
import { AiOutlineLink } from "react-icons/ai";
import { BiGrid, BiMoviePlay, BiUserPin } from "react-icons/bi";

function Profile() {
  return (
    <>
      <Header />
      <div className="profile-bg-container">
        <div className="user-profile">
          <div className="profile-user-details-container">
            <div className="profile">
              <div className="profile-pic-container">
                <div className="profile-gradient-container">
                  <img
                    src="https://res.cloudinary.com/dmui27xl3/image/upload/v1732606674/MY%20API%20IMAGES/girl_pass_photo_fdkcrv.jpg"
                    alt="user profile"
                    className="profile-picture"
                  />
                </div>
              </div>
              <div className="user-profile-details">
                <div className="profile-user-name-container">
                  <button className="profile-username">AsDev.</button>
                  <button type="button" className="profile-user-buttons">
                    Edit profile
                  </button>
                  <button type="button" className="profile-user-buttons">
                    View archive
                  </button>
                  <button
                    type="button"
                    className="profile-user-settings-button"
                  >
                    <PiGearSixLight className="user-profile-icons" />
                  </button>
                </div>
                <ul className="user-profile-followers-container">
                  <li className="user-profile-followers-item">{100} posts</li>
                  <li className="user-profile-followers-item">
                    {10} followers
                  </li>
                  <li className="user-profile-followers-item">{8} following</li>
                </ul>
                <div className="profile-user-bio-container">
                  <p className="profile-bio-username">Dwayne Johnson</p>
                  <ul className="profile-bio-item-container">
                    <li className="profile-bio-item">builder of stuff</li>
                    <li className="profile-bio-item">tequila sipper</li>
                    <li className="profile-bio-item">og girl dad 💕</li>
                  </ul>
                  <a href="#" className="profile-media-links">
                    <AiOutlineLink className="profile-media-link-icon" />
                    therock.komi.io
                  </a>
                </div>
              </div>
            </div>
            <div className="profile-user-stories-container">
              <div className="story-input-container">
                <button className="stories-adding-button">
                  <div className="stories-icons-container">
                    <GoPlus className="user-profile-stories-icon" />
                  </div>
                </button>
                <p className="new-story-text">New</p>
              </div>
            </div>
          </div>
          <div className="profile-user-posts-container">
            <div className="posts-tabs-container">
              <button className="profile-post-tab-button">
                <BiGrid className="profile-posts-icons" />
                POSTS
              </button>
              <button className="profile-post-tab-button">
                <BiMoviePlay className="profile-posts-icons" />
                REELS
              </button>
              <button className="profile-post-tab-button">
                <BiUserPin className="profile-posts-icons" />
                TAGGED
              </button>
            </div>
            <div className="profile-posts">

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
