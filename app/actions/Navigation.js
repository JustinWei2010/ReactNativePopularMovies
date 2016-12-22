'use strict'
import * as types from 'actions/ActionTypes'

export const navigateTo = (name) => {
    return {
        type: types.NAVIGATE_TO,
        name: name
    }
}

export const navigateBack = () => {
    return {
        type: types.NAVIGATE_BACK
    }
}

export const clearNavigateStack = () => {
    return {
        type: types.CLEAR_NAVIGATE_STACK
    }
}