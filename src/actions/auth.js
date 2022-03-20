import axios from 'axios';
import {
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    USER_LOADED,
    AUTH_ERR,
} from '../actions/types';
import { setAlert } from './alert';
import setAuthToken from '../untils/setToken';

// LOADED USER
export const loadedUser = () => async (dispatch) => {
    console.log('Toi day chua: ', localStorage.token);
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try {
        const res = await axios.get('http://localhost:5000/api/auth');
        console.log('GET USER: ', res.data);
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
