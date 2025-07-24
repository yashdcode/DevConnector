import React from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const Navbar = ({ isAuthenticated, logout, loading }) => {
  console.log("APP RUNNNING");
  const guestLinks = () => {
    return (
      <>
        <li>
          <Link to="/profiles">Developers</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </>
    );
  };
  const authLinks = () => {
    return (
      <>
        <li>
          <Link to="/profiles">Developers</Link>
        </li>
        <li>
          <Link to="/posts">Posts</Link>
        </li>
        <li>
          <Link to="/dashboard">
            <i className="fas fa-user" />{" "}
            <span className="hide-sm">Dashboard</span>
          </Link>
        </li>
        <li>
          <a
            onClick={(e) => {
              e.preventDefault();
              logout();
            }}
            href="#!"
          >
            <i className="fas fa-sign-out-alt" />{" "}
            <span className="hide-sm">Logout</span>
          </a>
        </li>
      </>
    );
  };
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i> DevConnector
        </Link>
      </h1>
      <ul>{!loading && isAuthenticated ? authLinks() : guestLinks()}</ul>
    </nav>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
});
Navbar.propTypes = {
  isAuthenticated: PropTypes.bool,
  logout: PropTypes.func,
  loading: PropTypes.bool,
};
export default connect(mapStateToProps, { logout })(Navbar);
