import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import CommentItem from "../CommentItem/CommentItem";
import { IoClose } from "react-icons/io5";
import "./comments.css";

const Comments = (props) => {
  const { postDetails } = props;
  const { id, imageUrl } = postDetails;
  const [comments, setComments] = useState([]);
  const [openComments, setOpenComments] = useState(false);

  useEffect(() => {
    getComments();
  }, []);

  const convertToCamelCase = (comment) => {
    const convertedComment = comment.map((eachComment) => ({
      content: eachComment.content,
      createdAt: eachComment.created_at,
      email: eachComment.email,
      fullname: eachComment.fullname,
      id: eachComment.id,
      postId: eachComment.post_id,
      updatedAt: eachComment.updated_at,
      userId: eachComment.user_id,
      username: eachComment.username,
    }));
    setComments(convertedComment);
  };

  const getComments = async () => {
    const apiUrl = `http://localhost:3002/users/posts/comments/${id}`;
    const jwtToken = Cookies.get("jwt_token");
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
        if (data.comments.length !== 0) {
          convertToCamelCase(data.comments);
        }
      }
    } catch (error) {
      console.log("Response error: ", error.message);
    }
  };

  const popupHandler = () => {
    setOpenComments((prevState) => !prevState);
  };

  const commentsCount = comments.length;
  const renderCommentsCountButton = () =>
    commentsCount > 0 && (
      <button
        type="button"
        className="comments-view-comments-button"
        onClick={popupHandler}
      >
        View all {commentsCount} comments
      </button>
    );

  const renderCommentsPopup = () => (
    <>
      <div className="comments-popup-bg-container" onClick={popupHandler}>
        <div
          className="comments-popup-container"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="comments-popup-post-container">
            <img
              src={imageUrl}
              alt="comment_post"
              className="comment-post-image"
            />
          </div>
          <ul className="comments-container">
            {comments.map((eachComment) => (
              <CommentItem key={eachComment.id} commentDetails={eachComment} />
            ))}
          </ul>
        </div>
      </div>
      <button
        type="button"
        className="comments-popup-close-button"
        onClick={popupHandler}
      >
        <IoClose className="comment-popup-icon" />
      </button>
    </>
  );

  return (
    <div className="comments-bg-container">
      {renderCommentsCountButton()} {openComments && renderCommentsPopup()}
    </div>
  );
};

export default Comments;
