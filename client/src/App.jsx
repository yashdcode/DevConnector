import { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Alert from "./components/layout/Alert";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import CreateProfile from "./components/profile-form/CreateProfile";
import { setAuthToken } from "./util/setAuthToken";
import "./App.css";
import Profile from "./components/profile/Profile";
import Profiles from "./components/profiles/Profiles";
import { loadUser } from "./actions/auth";
import PrivateRoute from "./components/routing/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import EditProfile from "./components/profile-form/EditProfile";
import AddExperience from "./components/profile-form/AddExperience";
import AddEducation from "./components/profile-form/AddEducation";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <section className="container">
            <Alert />
            <Routes>
              <Route exact path="/" element={<Landing />} />
              <Route exact path="/register" element={<Register />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/profiles" element={<Profiles />}></Route>
              <Route exact path="/profile/:id" element={<Profile />}></Route>
              <Route
                exact
                path="/dashboard"
                element={<PrivateRoute element={<Dashboard />} />}
              />
              <Route
                exact
                path="/create-profile"
                element={<PrivateRoute element={<CreateProfile />} />}
              />
              <Route
                exact
                path="/edit-profile"
                element={<PrivateRoute element={<EditProfile />} />}
              />
              <Route
                exact
                path="/add-experience"
                element={<PrivateRoute element={<AddExperience />} />}
              />
              <Route
                exact
                path="/add-education"
                element={<PrivateRoute element={<AddEducation />} />}
              />
            </Routes>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
