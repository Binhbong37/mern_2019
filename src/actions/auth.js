import axios from 'axios';
import {
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    USER_LOADED,
    AUTH_ERR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_PROFILE,
} from '../actions/types';
import { setAlert } from './alert';
import setAuthToken from '../untils/setToken';

// LOADED USER
export const loadedUser = () => async (dispatch) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try {
        const res = await axios.get('http://localhost:5000/api/auth');
        dispatch({
            type: USER_LOADED,
            payload: res.data,
        });
    } catch (error) {
        console.log('VAO ERR: ', error);
        dispatch({
            type: AUTH_ERR,
        });
    }
};

// Register User
export const register =
    ({ name, email, password }) =>
    async (dispatch) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const body = JSON.stringify({ name, email, password });

        try {
            const res = await axios.post(
                'http://localhost:5000/api/users',
                body,
                config
            );
            console.log('TOKEN: ', res.data);

            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data,
            });

            dispatch(loadedUser());
        } catch (error) {
            const errors = error.response.data.errors;
            console.log('ERR action auth: ', errors);
            if (errors) {
                errors.forEach((err) => dispatch(setAlert(err.msg, 'danger')));
            }

            dispatch({
                type: REGISTER_FAIL,
            });
        }
    };

// LOGIN User
export const login = (email, password) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post(
            'http://localhost:5000/api/auth',
            body,
            config
        );
        console.log('TOKEN: ', res.data);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
        });
        dispatch(loadedUser());
    } catch (error) {
        const errors = error.response.data.errors;
        console.log('ERR action auth: ', errors);
        if (errors) {
            errors.forEach((err) => dispatch(setAlert(err.msg, 'danger')));
        }

        dispatch({
            type: LOGIN_FAIL,
        });
    }
};

// LOGOUT / Clear Profile
export const logout = () => (dispatch) => {
    dispatch({
        type: CLEAR_PROFILE,
    });
    dispatch({
        type: LOGOUT,
    });
};
