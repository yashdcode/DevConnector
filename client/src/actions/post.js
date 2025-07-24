import axios from "axios";
import { setAlert } from "./alerts";
import {
  DELETE_POST,
  GET_POSTS,
  POST_ERRORS,
  UPDATE_LIKES,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from "./types";

export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/post");
    console.info("res", res);
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERRORS,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Add like to the Post
export const addLike = (id) => async (dispatch) => {
  console.log("add like", id);
  try {
    const res = await axios.put(`/api/post/like/${id}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERRORS,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Remove like from the Post
export const removeLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/post/unlike/${id}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERRORS,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/post/${id}`);
    dispatch({
      type: DELETE_POST,
      payload: id,
    });
    dispatch(setAlert(res.data.msg, "success"));
  } catch (err) {
    console.log("err", err);
    dispatch({
      type: POST_ERRORS,
      payload: { msg: err.response.msg, status: err.response.statusText },
    });
  }
};

//ADD POST

export const addPost = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post("/api/post", formData, config);
    console.log("res", res.data);
    dispatch({
      type: ADD_POST,
      payload: res.data,
    });
    dispatch(setAlert("Post has been created", "success"));
  } catch (error) {
    dispatch({
      type: POST_ERRORS,
      payload: { msg: err.response.msg, status: err.response.statusText },
    });
  }
};

//Get POST
export const getPost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/post/${id}`);
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERRORS,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// ADD COMMENT

export const addComment = (postId, formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(
      `/api/post/comment/${postId}`,
      formData,
      config
    );
    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });
    dispatch(setAlert("Comment added to the Post", "success"));
  } catch (error) {
    dispatch({
      type: POST_ERRORS,
      payload: { msg: err.response.msg, status: err.response.statusText },
    });
  }
};

//REMOVE COMMENT

export const deleteComment = (postId, commentId) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.delete(
      `/api/post/comment/${postId}/${commentId}`,
      config
    );
    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId,
    });
    dispatch(setAlert("Comment remove from post", "success"));
  } catch (error) {
    dispatch({
      type: POST_ERRORS,
      payload: { msg: err.response.msg, status: err.response.statusText },
    });
  }
};
