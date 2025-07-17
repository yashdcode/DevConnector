import {
  GET_PROFILE,
  PROFILE_ERROR,
  ACCOUNT_DELETED,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  GET_PROFILES,
  GET_REPOS,
} from "./types";
import { setAlert } from "./alerts";
import axios from "axios";

//GET ALL PROFILES

export const getProfiles = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile");
    dispatch({ type: GET_PROFILES, payload: res.data });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
// GET PROFILE BY ID

export const getProfileById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/user/${userId}`);
    console.info("res", res.data);
    dispatch({ type: GET_PROFILE, payload: res.data });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// GET ALL GITHUB REPOS

export const getGithubRepos = (username) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/github/${username}`);
    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
//GET PROFILE
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("api/profile/me");
    dispatch({ type: GET_PROFILE, payload: res.data });
  } catch (err) {
    console.log("err", err);
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const createProfile =
  (formData, navigate, edit = false) =>
  async (dispatch) => {
    console.log("formData", formData);
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    console.log("formData", formData);
    try {
      const res = await axios.post("api/profile", formData, config);
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
      dispatch(
        setAlert(edit ? "Profile Updated" : "Profile Created", "success")
      );
      navigate("/");
    } catch (err) {
      const errors = err.response.data.errors;
      errors.forEach((error) => {
        setAlert(error.msg, "danger");
      });
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

export const addExperience = (formData, navigate) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  console.log("formData", formData);
  try {
    const res = await axios.put("api/profile/experience", formData, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("experience added", "success"));
    navigate("/");
  } catch (err) {
    const errors = err.response.data.errors;
    errors.forEach((error) => {
      setAlert(error.msg, "danger");
    });
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addEducation = (formData, navigate) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  console.log("formData", formData);
  try {
    const res = await axios.put("api/profile/education", formData, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("experience added", "success"));
    navigate("/");
  } catch (err) {
    const errors = err.response.data.errors;
    errors.forEach((error) => {
      setAlert(error.msg, "danger");
    });
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`api/profile/education/${id}`);
    dispatch({ type: UPDATE_PROFILE, payload: res.data });
    dispatch(setAlert("Education removed", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`api/profile/experience/${id}`);
    dispatch({ type: UPDATE_PROFILE, payload: res.data });
    dispatch(setAlert("Experience removed", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deleteAccount = () => async (dispatch) => {
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    try {
      const res = await axios.delete("/api/profile/");
      dispatch({
        type: CLEAR_PROFILE,
      });
      dispatch({
        type: ACCOUNT_DELETED,
      });
      dispatch(setAlert("Your account has been permanantly deleted"));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
