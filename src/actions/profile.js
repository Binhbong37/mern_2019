import axios from 'axios';
import { PROFILE_ERR, GET_PROFILE } from '../actions/types';

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
