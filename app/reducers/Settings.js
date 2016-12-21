'use strict'
import * as types from 'actions/ActionTypes'
import * as constants from 'constants'

const _initialState = {}

const settings = (state = _initialState, action = {}) => {
    switch (action.type) {
        case types.UPDATE_SETTINGS:
            return action.settings
        default:
            return state;
    }
}

export default settings