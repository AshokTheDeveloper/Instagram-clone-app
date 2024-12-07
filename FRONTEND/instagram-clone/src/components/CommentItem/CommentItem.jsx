import React from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import "./commentitem.css";

const CommentItem = (props) => {
  const { commentDetails } = props;
  const { content, username, createdAt } = commentDetails;
  console.log(commentDetails);
  const profile = username[0].toUpperCase();

  const convertToRelativeTime = (dateString) => {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  const convertedDate = convertToRelativeTime(createdAt);
  console.log(convertedDate);

  return (
    <li className="comment-list-item">
      <p className="comments-user-profile">{profile}</p>
      <div className="username">
        <p className="comment-text">
          <Link to={`/${username}`} className="comment-commented-username">{username}</Link>
          {content}
        </p>
        <p className="commented-date">{convertedDate}</p>
      </div>
    </li>
  );
};

export default CommentItem;
