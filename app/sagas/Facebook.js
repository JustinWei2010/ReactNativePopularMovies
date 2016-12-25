'use strict'
import { takeLatest } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import * as constants from 'constants'
import * as types from 'actions/ActionTypes'
import * as fbAPI from 'api/Facebook'
import * as Facebook from 'actions/Facebook'
import * as LocalStorage from 'api/LocalStorage'
import * as Navigation from 'actions/Navigation'

const readPermissions = [
    constants.FB_PERMISSIONS.FRIENDS
]

function* _handleFBGraphError() {
    yield put(Navigation.clearNavigateStack())
    yield put(Navigation.navigateTo(constants.SCREENS.LOGIN))
}

function* _saveFBToken(token) {
    try {
        yield call(LocalStorage.setItem, constants.STORAGE_KEY.FB_TOKEN, token)
    } catch (error) {
        console.log("Couldn't save facebook token to local storage")
        console.log(error)
    }
}

function* _login(action) {
    var token
    try {
        token = yield call(fbAPI.login, readPermissions)
        yield put(Facebook.fbLoginSuccess(token))
    } catch (error) {
        console.log("Error during login process")
        console.log(error)
        yield put(Facebook.fbLoginFailed(error))
    }

    //Treat defined token as login success
    if (token) {
        try {
            yield call(fetchFBProfile)
            //Only navigate to home and save token if profile fetch is successful
            yield [
                put(Navigation.navigateTo(constants.SCREENS.HOME)),
                call(_saveFBToken, token)
            ]
        } catch(error) {
            console.log("Error while fetching facebook profile")
            console.log(error)
        }
    }
}

function* _logout(action) {
    yield put(Navigation.clearNavigateStack())
    yield [
        call(fbAPI.logout),
        put(Navigation.navigateTo(constants.SCREENS.LOGIN))
    ]
    try {
        yield call(LocalStorage.removeItem, constants.STORAGE_KEY.FB_TOKEN)
    } catch (error) {
        console.log("Couldn't remove token from local storage")
        console.log(error)
    }
}

export function* loadFBToken() {
    try {
        return yield call(LocalStorage.getItem, constants.STORAGE_KEY.FB_TOKEN)
    } catch (error) {
        console.log("Couldn't get facebook token from local storage")
    }
}

export function* fetchFBProfile() {
    try {
        const profile = yield call(fbAPI.getUserProfile)
        yield put(Facebook.fbRefreshProfile(profile.name, profile.picture.data.url))
    } catch (error) {
        yield call(_handleFBGraphError)

        //Let callee know there was an error
        throw new Error(error)
    }
}

export function* watchForLogin() {
    yield takeLatest(types.FB_LOGIN, _login)
}

export function* watchForLogout() {
    yield takeLatest(types.FB_LOGOUT, _logout)
}