import {
    GET_PROFILE,
    PROFILE_ERR,
    CLEAR_PROFILE,
    UPDATE_PROFILE,
    GET_PROFILES,
} from '../actions/types';

const initialState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {},
};

const profile = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_PROFILE:
        case UPDATE_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false,
            };
        case GET_PROFILES:
            return {
                ...state,
                profiles: payload,
                loading: false,
            };
        case PROFILE_ERR:
            return {
                ...state,
                error: payload,
                loading: false,
            };
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                repos: [],
                loading: false,
            };
        default:
            return state;
    }
};

export default profile;
