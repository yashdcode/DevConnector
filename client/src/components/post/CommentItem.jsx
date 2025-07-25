import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import dayjs from "dayjs";
import { deleteComment } from "../../actions/post";
import PropTypes from "prop-types";

const CommentItem = ({
  deleteComment,
  postId,
  comment: { _id, text, name, avatar, user, date },
  auth,
}) => {
  return (
    <div class="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img class="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p class="my-1">{text}</p>
        <p class="post-date">{dayjs(date).format("YYYY/MM/DD")}</p>
        {!auth.loading && user === auth.user._id && (
          <button
            onClick={(e) => deleteComment(postId, _id)}
            className="btn btn-danger"
            type="button"
          >
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  );
};
CommentItem.propsType = {
  postId: PropTypes.number.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { deleteComment })(CommentItem);
