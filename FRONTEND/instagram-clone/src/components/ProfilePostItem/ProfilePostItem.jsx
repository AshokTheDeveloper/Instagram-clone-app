import React from "react";
import { IoMdHeart } from "react-icons/io";
import { BiSolidMessageRounded } from "react-icons/bi";
import "./profilepostitem.css";

const ProfilePostItem = (props) => {
  const { postDetails } = props;
  const { image_url } = postDetails;
  return (
    <li className="post-item-container">
      <img src={image_url} alt="post_image" className="post-item-image" />
      <div className="post-item-overlay-container">
        <div className="profile-post-likes-container">
          <IoMdHeart className="profile-icons" />
          <p className="profile-likes-comments-count-text">1.5K</p>
        </div>
        <div className="profile-post-likes-container">
          <BiSolidMessageRounded className="profile-icons" />
          <p className="profile-likes-comments-count-text">10K</p>
        </div>
      </div>
    </li>
  );
};

export default ProfilePostItem;
