import React, { Fragment } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { deleteExperience } from "../../actions/profile";
import { connect } from "react-redux";

const Experience = ({ experience, deleteExperience }) => {
  const experiences = experience.map((exp) => {
    return (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td className="hide-sm">{exp.title}</td>
        <td>
          {exp.from ? dayjs(exp.from).format("YYYY/MM/DD") : "N/A"} -{" "}
          {exp.to === null
            ? "Now"
            : exp.to
            ? dayjs(exp.to).format("YYYY/MM/DD")
            : "N/A"}
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={(e) => deleteExperience(exp._id)}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  });
  return (
    <Fragment>
      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th classNAme="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </Fragment>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired,
};

export default connect(null, { deleteExperience })(Experience);
