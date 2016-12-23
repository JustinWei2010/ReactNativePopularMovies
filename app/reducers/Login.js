'use strict'
import * as types from 'actions/ActionTypes'

const _initialState = {
    authenticating: false,
    fbToken: null,
    error: null
}

//Will need a way of reauthenticating token if it expires
const login = (state = _initialState, action = {}) => {
    switch (action.type) {
        case types.FB_LOGIN:
            return {
                ...state,
                authenticating: true
            }

        case types.FB_LOGIN_SUCCESS:
            return {
                ...state,
                authenticating: false,
                fbToken: action.fbToken
            }

        case types.FB_LOGIN_FAILED:
            return {
                ...state,
                authenticating: false,
                error: action.error
            }

        case types.FB_LOGOUT:
            return _initialState

        default:
            return state;
    }
}

export default login