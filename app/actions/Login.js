'use strict'
import * as types from 'actions/ActionTypes'

export const login = () => {
    return {
        type: types.LOGIN
    }
}

export const loginSuccess = (fbToken) => {
    return {
        type: types.LOGIN_SUCCESS,
        fbToken
    }
}

export const loginFailed = (error) => {
    return {
        type: types.LOGIN_FAILED,
        error
    }
}

export const logout = () => {
    return {
        type: types.LOGOUT
    }
}