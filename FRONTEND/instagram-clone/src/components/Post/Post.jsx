import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LuDot } from "react-icons/lu";
import { BsThreeDots } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { FiMessageCircle } from "react-icons/fi";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { CiFaceSmile } from "react-icons/ci";
import EmojiPicker from "emoji-picker-react";
import "./post.css";


const Post = (props) => {
  const [commentInput, setCommentInput] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const onHandleComment = (event) => {
    setCommentInput(event.target.value);
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

  const { postDetails } = props;
  const { username, imageUrl, caption } = postDetails;
  return (
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
              <p className="post-username">{username}</p>
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
          <button className="post-bottom-section-button">
            <FaRegHeart className="posts-icons" />
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
        <p className="posts-likes-counter">{200} likes</p>
      </div>
      <div className="username-caption-container">
        <Link className="post-caption-username">{username}</Link>
        <span className="post-caption">{caption}</span>
      </div>
      <div className="post-comments-container">
        <input
          placeholder="Add a comment..."
          value={commentInput}
          className="comment-input"
          onChange={onHandleComment}
        />
        {commentInput.trim().length > 0 && (
          <button
            className="posts-post-button"
            onClick={() => setCommentInput("")}
          >
            Post
          </button>
        )}
        {emojiPicker()}
      </div>
    </li>
  );
};

export default Post;
