import React, { Fragment } from "react";

import PropTypes from "prop-types";

const ProfileAbout = ({
  profile: {
    bio,
    skills,
    user: { name },
  },
}) => {
  console.log("skills", skills);
  return (
    <div class="profile-about bg-light p-2">
      {bio && (
        <Fragment>
          <h2 class="text-primary">{name.trim().split(" ")[0]}s Bio</h2>
          <p>{bio}</p>
          <div class="line"></div>
        </Fragment>
      )}
      <h2 class="text-primary">Skill Set</h2>
      {skills.map((skill, index) => {
        return (
          <div class="p-1" key={index}>
            <i class="fas fa-check"></i> {skill}
          </div>
        );
      })}
      <div class="skills"></div>
    </div>
  );
};

export default ProfileAbout;

ProfileAbout.propTypes = {};
