import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import Spinner from "../layout/spinner";
import { getProfileById } from "../../actions/profile";

const Profile = ({ profile: { profile, loading }, auth, getProfileById }) => {
  const { id } = useParams();
  useEffect(() => {
    getProfileById(id);
    console.log("profile", profile);
  }, []);
  return profile === null || loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to="/profiles" className="btn btn-light">
        Back To Profiles{" "}
      </Link>
      {auth.isAuthenticated &&
        auth.loading === false &&
        auth.user._id === profile.user._id && (
          <Link to="/edit-profile" className="btn btn-dark">
            Edit Profile
          </Link>
        )}
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, { getProfileById })(Profile);
