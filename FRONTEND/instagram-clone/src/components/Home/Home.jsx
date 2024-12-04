import React, { useEffect, useState } from "react";
import "./home.css";
import Header from "../Header/Header";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import Post from "../Post/Post";
import Suggestions from "../Suggestions/Suggestions";

function Home() {
  const [postsData, setPostsData] = useState([]);

  useEffect(() => {
    getHomePosts();
  }, []);

  const jwtToken = Cookies.get("jwt_token");
  if (jwtToken === undefined) {
    return <Navigate to="/login" />;
  }

  const convertToCamelCase = (posts) => {
    const newData = posts.map((eachPost) => ({
      id: eachPost.post_id,
      userId: eachPost.user_id,
      username: eachPost.username,
      imageUrl: eachPost.image_url,
      fullName: eachPost.full_name,
      caption: eachPost.caption,
      createdAt: eachPost.created_at,
    }));

    setPostsData(newData);
  };

  const getHomePosts = async () => {
    const jwtToken = Cookies.get("jwt_token");
    const apiUrl = "http://localhost:3002/users/home-posts";
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      credentials: "include",
    };

    try {
      const response = await fetch(apiUrl, options);
      const data = await response.json();
      if (response.ok) {
        convertToCamelCase(data.posts);
      }
    } catch (error) {
      console.log("Response error: ", error.message);
    }
  };

  return (
    <>
      <div className="home-bg-container">
        <Header />
        <div className="home-container">
          {postsData.map((eachPost) => (
            <Post key={eachPost.id} postDetails={eachPost} />
          ))}
        </div>
        <Suggestions />
      </div>
    </>
  );
}

export default Home;
