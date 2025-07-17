import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addExperience } from "../../actions/profile";
import PropTypes from "prop-types";

const AddExperience = ({ addExperience }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });
  const [toDateDisabled, toggleDisabled] = useState(false);

  const { company, title, location, from, to, description, current } = formData;
  const handleOnChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const handleOnSubmit = (e) => {
    e.preventDefault();
    addExperience(formData, navigate);
  };

  return (
    <Fragment>
      <h1 class="large text-primary">Add An Experience</h1>
      <p class="lead">
        <i class="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form class="form" onSubmit={handleOnSubmit}>
        <div class="form-group">
          <input
            type="text"
            placeholder="* Job Title"
            name="title"
            value={title}
            onChange={handleOnChange}
            required
          />
        </div>
        <div class="form-group">
          <input
            type="text"
            placeholder="* Company"
            name="company"
            required
            value={company}
            onChange={handleOnChange}
          />
        </div>
        <div class="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={handleOnChange}
          />
        </div>
        <div class="form-group">
          <h4>From Date</h4>
          <input
            type="date"
            name="from"
            value={from}
            onChange={handleOnChange}
          />
        </div>
        <div class="form-group">
          <p>
            <input
              type="checkbox"
              name="current"
              value={current}
              checked={current}
              onChange={() => {
                setFormData({
                  ...formData,
                  current: !current,
                });
                toggleDisabled(!toDateDisabled);
              }}
            />{" "}
            Current Job
          </p>
        </div>
        <div class="form-group">
          <h4>To Date</h4>
          <input
            type="date"
            name="to"
            value={to}
            onChange={handleOnChange}
            disabled={toDateDisabled ? "disabled" : ""}
          />
        </div>
        <div class="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
            value={description}
            onChange={handleOnChange}
          ></textarea>
        </div>
        <input type="submit" class="btn btn-primary my-1" />
        <Link class="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
};

export default connect(null, { addExperience })(AddExperience);
