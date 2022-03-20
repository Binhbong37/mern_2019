import axios from 'axios';
import { REGISTER_FAIL, REGISTER_SUCCESS } from '../actions/types';
import { setAlert } from './alert';

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
