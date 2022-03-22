import axios from 'axios';
import {
    PROFILE_ERR,
    GET_PROFILE,
    UPDATE_PROFILE,
    CLEAR_PROFILE,
    DELETE_ACCOUNT,
    GET_PROFILES,
} from '../actions/types';
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

// GET ALL PROFILE
export const getAllProfile = () => async (dispatch) => {
    dispatch({ type: CLEAR_PROFILE });
    try {
        const res = await axios.get('http://localhost:5000/api/profile');

        dispatch({
            type: GET_PROFILES,
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

// GET PROFILE with ID
export const getProfileById = (userId) => async (dispatch) => {
    try {
        const res = await axios.get(
            `http://localhost:5000/api/profile/user/${userId}`
        );

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

// Add Experience
export const addExperience = (formData, history) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const res = await axios.put(
            'http://localhost:5000/api/profile/experience',
            formData,
            config
        );

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data,
        });
        dispatch(setAlert('Experience Added', 'success'));
        history.push('/dashboard');
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

// Add Education
export const addEducation = (formData, history) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const res = await axios.put(
            'http://localhost:5000/api/profile/education',
            formData,
            config
        );

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data,
        });
        dispatch(setAlert('Education Added', 'success'));
        history.push('/dashboard');
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

// Delete Experience
export const deleteExp = (id) => async (dispatch) => {
    try {
        const res = await axios.delete(
            `http://localhost:5000/api/profile/experience/${id}`
        );

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data,
        });

        dispatch(setAlert('Exp Removed', 'success'));
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

// Delete Education
export const deleteEducation = (id) => async (dispatch) => {
    try {
        const res = await axios.delete(
            `http://localhost:5000/api/profile/education/${id}`
        );

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data,
        });

        dispatch(setAlert('Education Removed', 'success'));
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

// Delete Account & profile
export const deleteAccount = () => async (dispatch) => {
    if (window.confirm('Are you sure to delete, this will be undon')) {
        try {
            const res = await axios.delete(`http://localhost:5000/api/profile`);

            dispatch({
                type: CLEAR_PROFILE,
            });
            dispatch({
                type: DELETE_ACCOUNT,
            });

            dispatch(setAlert('Your account has been deleted!!!'));
        } catch (error) {
            dispatch({
                type: PROFILE_ERR,
                payload: {
                    msg: error.response.statusText,
                    status: error.response.status,
                },
            });
        }
    }
};
