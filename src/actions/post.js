import axios from 'axios';
import { GET_POSTS, POST_ERROR } from '../actions/types';
import { setAlert } from './alert';

// GET POST
export const getPosts = () => async (dispatch) => {
    try {
        const res = await axios.get('http://localhost:5000/api/posts');
        console.log('GET POST: ', res.data);

        dispatch({
            type: GET_POSTS,
            payload: res.data,
        });
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status,
            },
        });
    }
};
