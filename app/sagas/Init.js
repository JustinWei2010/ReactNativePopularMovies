'use strict'
import { call, put } from 'redux-saga/effects'
import * as constants from 'constants'
import * as Navigation from 'actions/Navigation'
import * as Settings from 'actions/Settings'
import { fetchFBProfile, loadFBToken } from 'sagas/Facebook'
import { loadSettings } from 'sagas/Settings'

const _defaultSettings = {
    movieFilter: constants.MOVIE_FILTERS.MOST_POPULAR
}

//Load app settings, use default if undefined
function* _initAppSettings() {
    var settings = yield call(loadSettings) 
    if (!settings) {
        settings = _defaultSettings
    }
    yield put(Settings.refreshSettings(settings))
}

//Load facebook login metadata
function* _initFBLogin() {
    const fbToken = yield call(loadFBToken)
    if (fbToken) {
        try {
            yield put(Navigation.navigateTo(constants.SCREENS.HOME))
            yield call(fetchFBProfile)
        } catch (error) {
            console.log("Error while fetching facebook profile")
            console.log(error)
        }
    } else {
        yield put(Navigation.navigateTo(constants.SCREENS.LOGIN))
    }
}

//Initialize app with data stored in local storage
export function* initApp() {
    yield [
        call(_initFBLogin),
        call(_initAppSettings)
    ]
}