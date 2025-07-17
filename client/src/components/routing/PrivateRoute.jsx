import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
const PrivateRoute = ({ element, auth: { isAuthenticated, loading } }) => {
  if (loading) {
    // Optionally, return a loading spinner
    return null; // Don't render anything until loading is complete
  }

  return isAuthenticated ? element : <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(PrivateRoute);
