import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteEducation } from "../../actions/profile";
import dayjs from "dayjs"; // ✅ Missing import added

const Education = ({ education, deleteEducation }) => {
  const educations = education.map((edu) => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td className="hide-sm">{edu.degree}</td>
      <td>
        {edu.from ? dayjs(edu.from).format("YYYY/MM/DD") : "N/A"} -{" "}
        {edu.to === null
          ? "Now"
          : edu.to
          ? dayjs(edu.to).format("YYYY/MM/DD")
          : "N/A"}
      </td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => deleteEducation(edu._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th> {/* ✅ Typo fixed */}
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </Fragment>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(Education);
