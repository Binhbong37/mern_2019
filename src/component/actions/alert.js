// import {uuid} from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

export const setAlert =
    (msg, alertType, timOut = 5000) =>
    (dispatch) => {
        const id = Math.random().toString();
        dispatch({
            type: SET_ALERT,
            payload: { id, msg, alertType },
        });

        setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timOut);
    };
