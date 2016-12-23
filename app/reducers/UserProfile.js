'use strict'
import * as types from 'actions/ActionTypes'

const _initialState = {
    name: 'Not Logged in',
    src: require("resources/profile.png") 
}

const profile = (state = _initialState, action = {}) => {
    switch (action.type) {
        case types.FB_REFRESH_PROFILE:
            return {
                name: action.name,
                src: {
                    uri: action.src
                }
            }

        default:
            return state;
    }
}

export default profile