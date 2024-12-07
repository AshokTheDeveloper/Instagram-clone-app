import React from "react";
import { IoPersonCircle } from "react-icons/io5";
import { Link } from "react-router-dom";
import "./suggestionitem.css";

const SuggestionItem = (props) => {
  const { userDetails, followUser } = props;
  const { id, username } = userDetails;

  const onClickFollow = () => {
    followUser(id);
  };
  return (
    <li className="suggestion-item-bg-container">
      <div className="suggestion-item-switch-user-container">
        <div className="suggestion-item-user-icon-container">
          <IoPersonCircle className="suggestion-item-person-icon" />
          <div className="suggestion-item-profile-link-container">
            <Link className="suggestion-item-profile-link">{username}</Link>
            <p className="suggestion-item-username">suggested</p>
          </div>
        </div>
        <button
          className="suggestion-item-follow-button"
          onClick={onClickFollow}
        >
          follow
        </button>
      </div>
    </li>
  );
};

export default SuggestionItem;
