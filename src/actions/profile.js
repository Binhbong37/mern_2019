import axios from 'axios';
import { PROFILE_ERR, GET_PROFILE } from '../actions/types';
import { setAlert } from './alert';

export const getCurrentProfile = () => async (dispatch) => {
    try {
        const res = await axios.get('http://localhost:5000/api/profile/me');

        dispatch({
            type: GET_PROFILE,
            payload: res.data,
        });
    } catch (error) {
        dispatch({
            type: PROFILE_ERR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status,
            },
        });
    }
};

// CREATE PROFILE AND UPDATE PROFILE
export const createProfile =
    (formData, history, edit = false) =>
    async (dispatch) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const res = await axios.post(
                'http://localhost:5000/api/profile',
                formData,
                config
            );

            dispatch({
                type: GET_PROFILE,
                payload: res.data,
            });
            dispatch(
                setAlert(
                    edit ? 'Profile Updated' : 'Created Profile',
                    'success'
                )
            );
            if (!edit) {
                history.push('/dashboard');
            }
        } catch (error) {
            const errors = error.response.data.errors;
            console.log('ERR action create Profile: ', errors);
            if (errors) {
                errors.forEach((err) => dispatch(setAlert(err.msg, 'danger')));
            }
            dispatch({
                type: PROFILE_ERR,
                payload: {
                    msg: error.response.statusText,
                    status: error.response.status,
                },
            });
        }
    };
