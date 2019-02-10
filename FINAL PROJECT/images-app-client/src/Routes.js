import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import AppliedRoute from "./components/AppliedRoute";
import ImagePortal from "./containers/ImagePortal";
import Dashboard from "./containers/Dashboard";
import Signup from "./containers/Signup";
import NewImage from "./containers/NewImage";


export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <Route path="/ImagePortal" exact={true}component={ImagePortal} />
    <AppliedRoute path="/login" exact component={Login} props={childProps} />
    <AppliedRoute path="/Dashboard" exact component={Dashboard} props={childProps} />
    <AppliedRoute path="/signup" exact component={Signup} props={childProps} />
    <AppliedRoute path="/images/new" exact component={NewImage} props={childProps} />
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;