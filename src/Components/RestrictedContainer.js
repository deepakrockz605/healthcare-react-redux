import React from 'react'
import { Route, Switch } from 'react-router';
import HomePage from './HomePage';
import Dashboard from './Dashboard';
import PatientDetails from './PatientDetails';
import Login from './Login';
import PatientProfile from './PatientProfile'
import PublicRoute from './PublicRoute'
import PrivateRoute from './PrivateRoute'
import PageNotFound from './PageNotFound';
import Input from './Input';

function RestrictedContainer(props) {
    return (
        <Switch>
        <Route exact path="/input" component={Input} />
        <PublicRoute restricted={true} exact path="/" component={HomePage} history={props.history} />
        <PublicRoute restricted={true} exact path="/login" component={Login} />
        <PrivateRoute restricted={false} exact path="/dashboard" component={Dashboard} />
        <PrivateRoute restricted={false} exact path="/patient-details" component={PatientDetails} />
        <PrivateRoute restricted={false} exact path="/patient-profile" component={PatientProfile} />
        <Route path="*" component={PageNotFound} />
    </Switch>
    )
}

export default RestrictedContainer