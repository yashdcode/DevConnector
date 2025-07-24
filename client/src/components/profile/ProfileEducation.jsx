import React from "react";
import dayjs from "dayjs";
import PropTypes from "prop-types";

const ProfileEducation = ({
  experience: { school, degree, fieldofstudy, to, from, description },
}) => {
  return (
    <div>
      <h3 className="text-dark">{school}</h3>
      <p>
        {from ? dayjs(from).format("YYYY/MM/DD") : "N/A"} -{" "}
        {to === null ? "Now" : to ? dayjs(to).format("YYYY/MM/DD") : "N/A"}
      </p>
      <p>
        <strong>Degree:</strong> {degree}
      </p>
      <p>
        <strong>Field of study:</strong> {fieldofstudy}
      </p>
      <p>
        <strong>Description:</strong> {description}
      </p>
    </div>
  );
};

ProfileEducation.propTypes = {
  education: PropTypes.array.isRequired,
};

export default ProfileEducation;
