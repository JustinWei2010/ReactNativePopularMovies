'use strict'
import { takeLatest } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import * as constants from 'constants'
import * as types from 'actions/ActionTypes'
import * as Facebook from 'api/Facebook'
import * as Login from 'actions/Login'
import * as Navigation from 'actions/Navigation'

const fbReadPermissions = [
    constants.FB_PERMISSIONS.FRIENDS
]

function* _login(action) {
    var fbToken
    try {
        fbToken = yield call(Facebook.login, fbReadPermissions)
        yield put(Login.loginSuccess(fbToken))
    } catch (error) {
        console.log('Error during login process: ' + error)
        yield put(Login.loginFailed(error))
    }

    if (fbToken) {
        yield put(Navigation.navigateTo(constants.SCREENS.HOME))
    }
}

function* _logout(action) {
    yield [
        call(Facebook.logout),
        put(Navigation.navigateTo(constants.SCREENS.LOGIN)),
        put(Navigation.clearNavigateStack())
    ]
}

export function* watchForLogin() {
    yield takeLatest(types.LOGIN, _login);
}

export function* watchForLogout() {
    yield takeLatest(types.LOGOUT, _logout);
}