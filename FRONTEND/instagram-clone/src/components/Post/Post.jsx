import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { LuDot } from "react-icons/lu";
import { BsThreeDots } from "react-icons/bs";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { FiMessageCircle } from "react-icons/fi";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { CiFaceSmile } from "react-icons/ci";
import EmojiPicker from "emoji-picker-react";
import Comments from "../Comments/Comments";
import "./post.css";

const Post = (props) => {
  const { postDetails } = props;
  const { username, imageUrl, caption, id } = postDetails;

  const [commentInput, setCommentInput] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    getLikesCount();
  }, []);

  const onHandleComment = (event) => {
    setCommentInput(event.target.value);
  };

  const onCommentApiHandle = async () => {
    const newComment = {
      postId: id,
      content: commentInput,
    };

    const jwtToken = Cookies.get("jwt_token");
    const apiUrl = "http://localhost:3002/users/post/comment";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      credentials: "include",
      body: JSON.stringify(newComment),
    };

    try {
      const response = await fetch(apiUrl, options);
      const data = await response.json();
      if (response.ok) {
        console.log(data);
      }
    } catch (error) {
      console.log("Response error: ", error.message);
    }

    setCommentInput("");
  };

  const handleEmojiClick = (emojiData) => {
    setCommentInput((prev) => prev + emojiData.emoji);
    setShowEmojiPicker((prev) => !prev);
  };

  const handleEmojiPicker = () => {
    setShowEmojiPicker((prev) => !prev);
  };

  const emojiPicker = () => (
    <div className="emoji-input-container">
      <button
        onClick={handleEmojiPicker}
        className="post-emoji-button"
        type="button"
      >
        <CiFaceSmile className="emoji-icon" />
      </button>
      {showEmojiPicker && (
        <div className="emoji-container">
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </div>
  );

  const onLikePostHandle = async () => {
    const newLike = {
      postId: id,
    };

    const jwtToken = Cookies.get("jwt_token");
    const apiUrl = "http://localhost:3002/users/post/like";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      credentials: "include",
      body: JSON.stringify(newLike),
    };

    try {
      const response = await fetch(apiUrl, options);
      const data = await response.json();
      if (response.ok) {
        setHasLiked(true);
        setLikesCount((prevLikesCount) => prevLikesCount + 1);
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log("Response error: ", error.message);
    }
  };

  // Likes count handle
  const getLikesCount = async () => {
    const jwtToken = Cookies.get("jwt_token");
    const apiUrl = `http://localhost:3002/users/post/likes/${id}`;
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
        if (data.likesCount.likes_count !== 0) {
          setLikesCount(data.likesCount.likes_count);
        }
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log("Error on likes count: ", error.message);
    }
  };

  // console.log(likesCount);

  const renderPost = () => (
    <li className="post-bg-container">
      <div className="post-top-section-container">
        <div className="post-profile-and-username-container">
          <div className="post-profile-gradient-container">
            <div className="post-profile-container">
              <img
                src="https://res.cloudinary.com/dmui27xl3/image/upload/v1732606674/MY%20API%20IMAGES/girl_pass_photo_fdkcrv.jpg"
                alt="post profile pic"
                className="post-profile-picture"
              />
            </div>
          </div>
          <div className="username-nation-status-container">
            <div className="post-username-nation">
              <Link to={`/${username}`} className="post-username-link">
                {username}
              </Link>
              <p className="post-user-nation">India</p>
            </div>
            <LuDot />
            <p className="post-posted-time">1h</p>
            <LuDot />
            <p className="post-followed-status">followed</p>
          </div>
        </div>
        <button type="button" className="post-top-edit-button">
          <BsThreeDots className="post-three-dots-icon" />
        </button>
      </div>
      <div className="post-container">
        <img src={imageUrl} alt="post image" className="posts-post-image" />
      </div>
      <div className="post-like-comment-share-icons-container">
        <div>
          <button
            className="post-bottom-section-button"
            onClick={onLikePostHandle} // Like post handle
          >
            {hasLiked ? (
              <GoHeartFill className="posts-icons liked-heart-icon" />

            ) : (
              <GoHeart className="posts-icons" />
            )}
          </button>
          <button className="post-bottom-section-button">
            <FiMessageCircle className="posts-icons" />
          </button>
          <button className="post-bottom-section-button">
            <IoPaperPlaneOutline className="posts-icons" />
          </button>
        </div>
        <button className="post-bottom-section-button saved-button">
          <img
            src="https://res.cloudinary.com/dmui27xl3/image/upload/v1732603244/LOGOS/Rectangle_black_1_ro1y7h.png"
            alt="post saved image"
            className="posts-saved-image"
          />
        </button>
      </div>
      <div className="post-likes-count-container">
        {likesCount > 0 && ( // likes count
          <p className="posts-likes-counter">{likesCount} likes</p>
        )}
      </div>
      <div className="username-caption-container">
        <Link to={`/${username}`} className="post-caption-username">
          {username}
        </Link>
        <span className="post-caption">{caption}</span>
      </div>
      <div className="post-comments">
        {<Comments postDetails={postDetails} />}
      </div>
      <div className="post-comments-container">
        <input
          placeholder="Add a comment..."
          value={commentInput}
          className="comment-input"
          onChange={onHandleComment}
        />
        {commentInput.trim().length > 0 && (
          <button className="posts-post-button" onClick={onCommentApiHandle}>
            Post
          </button>
        )}
        {emojiPicker()}
      </div>
    </li>
  );

  return <>{renderPost()}</>;
};

export default Post;
