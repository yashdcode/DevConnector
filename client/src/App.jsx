import { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/register";
import Login from "./components/auth/login";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Fragment>
        <Navbar />
        <section className="container">
          <Routes>
            <Route exact path="/" Component={Landing} />
            <Route exact path="/register" Component={Register} />
            <Route exact path="/login" Component={Login} />
          </Routes>
        </section>
      </Fragment>
    </Router>
  );
};

export default App;
