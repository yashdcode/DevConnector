import React from "react";
import dayjs from "dayjs";
import PropTypes from "prop-types";

const ProfileExperience = ({
  experience: { company, title, to, from, description },
}) => {
  return (
    <div>
      <h3 className="text-dark">{company}</h3>
      <p>
        {from ? dayjs(from).format("YYYY/MM/DD") : "N/A"} -{" "}
        {to === null ? "Now" : to ? dayjs(to).format("YYYY/MM/DD") : "N/A"}
      </p>
      <p>
        <strong>Position:</strong> {title}
      </p>
      <p>
        <strong>Description:</strong> {description}
      </p>
    </div>
  );
};

ProfileExperience.propTypes = {
  experience: PropTypes.array.isRequired,
};

export default ProfileExperience;
