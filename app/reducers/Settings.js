'use strict'
import * as types from 'actions/ActionTypes'

const _initialState = {}

const settings = (state = _initialState, action = {}) => {
    switch (action.type) {
        case types.REFRESH_SETTINGS:
            return action.settings
        default:
            return state;
    }
}

export default settings