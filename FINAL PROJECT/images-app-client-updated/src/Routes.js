import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import AppliedRoute from "./components/AppliedRoute";
import ImagePortal from "./containers/ImagePortal";
import Dashboard from "./containers/Dashboard";
import Signup from "./containers/Signup";
import Seasons from './containers/Seasons'
import Cities from './containers/Cities'
import Designers from './containers/Designers'
import getallimages from './containers/getallimages'
import Category from './containers/Category'
export default ({ childProps }) =>
    <Switch>
        <AppliedRoute path="/" exact component={Home} props={childProps} />
        <AppliedRoute path="/Category" exact component={Category} props={childProps} />
        <AppliedRoute path="/ImagePortal" exact={true} component={ImagePortal} props={childProps} />
        <AppliedRoute path="/login" exact component={Login} props={childProps} />
        <AppliedRoute path="/Dashboard" exact component={Dashboard} props={childProps} />
        <AppliedRoute path="/signup" exact component={Signup} props={childProps} />
        <AppliedRoute path="/Seasons" exact component={Seasons} props={childProps} />
        <AppliedRoute path="/Cities" exact component={Cities} props={childProps} />
        <AppliedRoute path="/Designers" exact component={Designers} props={childProps} />
        <AppliedRoute path="/getallimages" exact component={getallimages} props={childProps} />
        { /* Finally, catch all unmatched routes */}
        <Route component={NotFound} />
    </Switch>