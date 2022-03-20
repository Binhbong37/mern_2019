import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
    const [formLogin, setFormLogin] = useState({
        email: '',
        password: '',
    });
    const { email, password } = formLogin;
    // Set DATA IN FORM
    const onChange = (e) => {
        setFormLogin({
            ...formLogin,
            [e.target.name]: e.target.value,
        });
    };

    // GET DATA FROM Login
    const onSubmit = (e) => {
        e.preventDefault();

        login(email, password);
    };

    // check LOGIN And rederict if PASSS
    if (isAuthenticated) {
        return <Redirect to="/dashboard" />;
    }
    return (
        <Fragment>
            {/* <div className="alert alert-danger">Invalid credentials</div> */}
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead">
                <i className="fas fa-user"></i> Sign into Your Account
            </p>
            <form
                className="form"
                action="dashboard.html"
                onSubmit={(e) => onSubmit(e)}
            >
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={email}
                        onChange={(e) => onChange(e)}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={(e) => onChange(e)}
                        minLength="6"
                    />
                </div>
                <input
                    type="submit"
                    className="btn btn-primary"
                    value="Login"
                />
            </form>
            <p className="my-1">
                Don't have an account? <Link to="register">Sign Up</Link>
            </p>
        </Fragment>
    );
};

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    };
};

export default connect(mapStateToProps, { login })(Login);
