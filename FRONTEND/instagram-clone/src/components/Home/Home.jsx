import React, { useEffect } from "react";
import "./home.css";
import Header from "../Header/Header";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import Post from "../Post/Post";

function Home() {
  const jwtToken = Cookies.get("jwt_token");
  if (jwtToken === undefined) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const apiUrl = "http://localhost:3002/users";
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
      console.log(data);
    } catch (error) {
      console.log("Response error: ", error.message);
    }
  };

  return (
    <>
      <div className="home-bg-container">
        <Header />
        <div className="home-container">
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
        </div>
      </div>
    </>
  );
}

export default Home;
