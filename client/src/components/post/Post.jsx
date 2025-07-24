import React, { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPost } from "../../actions/post";
import { Link } from "react-router-dom";
import PostItem from "../posts/PostItem";
import { connect } from "react-redux";
import Spinner from "../layout/spinner";
import PropTypes from "prop-types";
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";

const Post = ({ getPost, post: { post, loading } }) => {
  const { id } = useParams();
  useEffect(() => {
    getPost(id);
  }, [getPost]);
  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to="/posts" className="btn">
        Back To Posts
      </Link>
      <PostItem post={post} showActions={false} />
      <CommentForm postId={id} />
      <div className="comments">
        {post.comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} postId={post._id} />
        ))}
      </div>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  post: state.post,
});

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, { getPost })(Post);
