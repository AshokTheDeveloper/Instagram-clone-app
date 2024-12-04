import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { IoPersonCircle } from "react-icons/io5";
import { FaRegCopyright } from "react-icons/fa";
import "./suggestions.css";
import SuggestionItem from "../SuggestionItem/SuggestionItem";
import SuggestionsFooter from "../SuggestionsFooter/SuggestionsFooter";

const Suggestions = () => {
  const [usersData, setUsersData] = useState([]);
  const [profileUser, setProfileUser] = useState("");

  useEffect(() => {
    getUsers();
    getProfileUser();
  }, []);

  const getUsers = async () => {
    const jwtToken = Cookies.get("jwt_token");
    const apiUrl = "http://localhost:3002/users";
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      },
      credentials: "include",
    };
    try {
      const response = await fetch(apiUrl, options);
      const data = await response.json();
      if (response.ok) {
        setUsersData(data.users);
      }
    } catch (error) {
      console.log("Response error: ", error.message);
    }
  };

  const getProfileUser = async () => {
    const apiUrl = "http://localhost:3002/users/profile-user";
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    };
    try {
      const response = await fetch(apiUrl, options);
      const data = await response.json();
      if (response.ok) {
        setProfileUser(data.profile_user);
      }
    } catch (error) {
      console.log("Response error: ", error.message);
    }
  };

  const onClickFollowUser = async (id) => {
    const jwtToken = Cookies.get("jwt_token");
    const apiUrl = "http://localhost:3002/users/follow-user";

    const newUser = {
      userId: id,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(newUser),
      credentials: "include",
    };

    try {
      const response = await fetch(apiUrl, options);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log("Response error: ", error.message);
    }
  };

  const { username, fullname } = profileUser;

  return (
    <div className="suggestions-bg-container">
      <div className="suggestions-container">
        <div className="suggestions-switch-user-container">
          <div className="suggestions-user-icon-container">
            <IoPersonCircle className="suggestions-person-icon" />
            <div className="suggestions-profile-link-container">
              <Link to="/user-profile" className="suggestions-profile-link">
                {username}
              </Link>
              <p className="suggestions-username">{fullname}</p>
            </div>
          </div>
          <button className="suggestions-switch-button">switch</button>
        </div>
        <div className="suggestions">
          <div className="suggestions-view-all-button-container">
            <p className="suggestion-suggested-text">suggested for you</p>
            <button type="button" className="suggestions-view-all-button">
              See All
            </button>
          </div>
          <ul className="suggestions-items">
            {usersData.map((eachUser) => (
              <SuggestionItem
                key={eachUser.id}
                userDetails={eachUser}
                followUser={onClickFollowUser}
              />
            ))}
          </ul>
        </div>
        <div className="suggestions-footer">
          <SuggestionsFooter />
        </div>
        <div className="copyright-info-container">
          <FaRegCopyright className="copyright-icon" />
          <p className="copyright-text">2024 INSTAGRAM FROM META</p>
        </div>
      </div>
    </div>
  );
};

export default Suggestions;
