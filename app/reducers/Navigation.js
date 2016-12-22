'use strict'
import * as types from 'actions/ActionTypes'
import * as constants from 'constants'

const _initialState = {
    currentScreen: constants.SCREENS.LOGIN,
    backStack: [constants.SCREENS.LOGIN]
}

const navigation = (state = _initialState, action = {}) => {
    switch (action.type) {
        case types.NAVIGATE_TO:
            return {
                currentScreen: action.name,
                backStack: [...state.backStack, action.name]
            }

        case types.NAVIGATE_BACK:
            const newStack = state.backStack.slice(0, state.backStack.length-1)
            return {
                currentScreen: newStack[newStack.length-1],
                backStack: newStack
            }

        case types.CLEAR_NAVIGATE_STACK:
            return _initialState

        default:
            return state;
    }
}

export default navigation