'use strict'
import { takeEvery, takeLatest } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import * as constants from 'constants'
import * as types from 'actions/ActionTypes'
import * as fbAPI from 'api/Facebook'
import * as Facebook from 'actions/Facebook'
import * as Navigation from 'actions/Navigation'

const readPermissions = [
    constants.FB_PERMISSIONS.FRIENDS
]

function* _login(action) {
    var token
    try {
        token = yield call(fbAPI.login, readPermissions)
        yield put(Facebook.fbLoginSuccess(token))
    } catch (error) {
        console.log('Error during login process: ' + error)
        yield put(Facebook.fbLoginFailed(error))
    }

    if (token) {
        yield put(Navigation.navigateTo(constants.SCREENS.HOME))
        //Fetch facebook profile picture
        try {
            const profile = yield call(fbAPI.getUserProfile)
            yield put(Facebook.fbRefreshProfile(profile.name, profile.picture.data.url))
        } catch (error) {
            console.log('Error fetching fb profile: ' + error)
        }
    }
}

function* _logout(action) {
    yield [
        call(fbAPI.logout),
        put(Navigation.navigateTo(constants.SCREENS.LOGIN)),
        put(Navigation.clearNavigateStack())
    ]
}

export function* watchForLogin() {
    yield takeLatest(types.FB_LOGIN, _login);
}

export function* watchForLogout() {
    yield takeLatest(types.FB_LOGOUT, _logout);
}