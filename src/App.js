import './App.css';
import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './component/layout/Navbar';
import Landing from './component/layout/Landing';
import Login from './component/auth/Login';
import Register from './component/auth/Register';
import Alert from './component/layout/Alert';
import Dashboard from './component/dashboard/Dashboard';
import CreateProfile from './component/profile-forms/CreateProfile';
import EditProfile from './component/profile-forms/EditProfile';
import AddExperince from './component/profile-forms/AddExperince';
import AddEducation from './component/profile-forms/AddEducation';
import PrivateRoute from './component/routing/PrivateRoute';
import Profiles from './component/profiles/Profiles';
import Profile from './component/profile/Profile';
import Posts from './component/posts/Posts';
import store from './store';
import { loadedUser } from './actions/auth';
import setAuthToken from './untils/setToken';

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

const App = () => {
    useEffect(() => {
        store.dispatch(loadedUser());
    }, []);
    return (
        <Router>
            <Fragment>
                <Navbar />
                <Route exact path="/" component={Landing} />
                <section className="container">
                    <Alert />
                    <Switch>
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/profiles" component={Profiles} />
                        <Route exact path="/profile/:id" component={Profile} />
                        <PrivateRoute
                            exact
                            path="/dashboard"
                            component={Dashboard}
                        />
                        <PrivateRoute
                            exact
                            path="/create-profile"
                            component={CreateProfile}
                        />
                        <PrivateRoute
                            exact
                            path="/edit-profile"
                            component={EditProfile}
                        />
                        <PrivateRoute
                            exact
                            path="/add-experience"
                            component={AddExperince}
                        />
                        <PrivateRoute
                            exact
                            path="/add-education"
                            component={AddEducation}
                        />
                        <PrivateRoute exact path="/posts" component={Posts} />
                    </Switch>
                </section>
            </Fragment>
        </Router>
    );
};

export default App;
