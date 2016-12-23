'use strict'
import * as types from 'actions/ActionTypes'

export const fbLogin = () => {
    return {
        type: types.FB_LOGIN
    }
}

export const fbLoginSuccess = (fbToken) => {
    return {
        type: types.FB_LOGIN_SUCCESS,
        fbToken
    }
}

export const fbLoginFailed = (error) => {
    return {
        type: types.FB_LOGIN_FAILED,
        error
    }
}

export const fbLogout = () => {
    return {
        type: types.FB_LOGOUT
    }
}

export const fbFetchProfile = () => {
    return {
        type: types.FB_FETCH_PROFILE
    }
}

export const fbRefreshProfile = (name, src) => {
    return {
        type: types.FB_REFRESH_PROFILE,
        name: name,
        src: src
    }
}