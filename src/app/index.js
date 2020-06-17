import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.scss";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import PrivateRoute from "./components/PrivateRoute";

import Login from "./pages/Login/Login";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Content from "./pages/Content/Content";
import Movie from "./pages/Movie";

import store from "./state";

const App = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/content">
              <Content />
            </PrivateRoute>
            <Route exact path="/content/:movieId">
              <Movie />
            </Route>
            <Route exact path="*" component={NotFound} />
          </Switch>
        </Router>
        <Footer />
      </Provider>
    </div>
  );
};

export default App;
