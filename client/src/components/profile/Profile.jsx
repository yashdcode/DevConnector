import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import Spinner from "../layout/spinner";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileGithub from "./ProfileGithub";
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
      <div class="profile-grid my-1">
        <ProfileTop profile={profile} />
        <ProfileAbout profile={profile} />
        <div className="profile-exp bg-white p-2">
          <h2 className="text-primary">Experince</h2>
          {profile.experience.length > 0 ? (
            <Fragment>
              {profile.experience.map((experience) => (
                <ProfileExperience
                  key={experience.id}
                  experience={experience}
                />
              ))}
            </Fragment>
          ) : (
            <h4>No experience credetials</h4>
          )}
        </div>
        <div className="profile-edu bg-white p-2">
          <h2 className="text-primary">Education</h2>
          {profile.education.length > 0 ? (
            <Fragment>
              {profile.education.map((education) => (
                <ProfileEducation key={education.id} experience={education} />
              ))}
            </Fragment>
          ) : (
            <h4>No education credetials</h4>
          )}
        </div>
        {profile.githubusername && (
          <ProfileGithub username={profile.githubusername} />
        )}
      </div>
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
