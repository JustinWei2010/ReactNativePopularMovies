'use strict'
import _ from 'lodash'
import { takeEvery, takeLatest } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import * as constants from 'constants'
import * as types from 'actions/ActionTypes'
import * as LocalStorage from 'api/LocalStorage'
import * as Settings from 'actions/Settings'

const _initialSettings = {
    movieFilter: constants.MOVIE_FILTERS.MOST_POPULAR
}

function* _saveSettings(action) {
    try {
        yield call(LocalStorage.setItem, constants.STORAGE_KEY.SETTINGS, action.settings)
        yield put(Settings.updateSettings(action.settings))
    } catch (error) {
        // Error saving settings
        console.log("Couldn't save settings to local storage")
    }
}

function* _loadSettings(action) {
    var settings = {}
    try {
        settings = yield call(LocalStorage.getItem, constants.STORAGE_KEY.SETTINGS)
    } catch (error) {
        console.log("Couldn't load settings from local storage")
    }

    //If no load exists or error occurs then use initial settings
    if (_.isEmpty(settings)) {
        settings = _initialSettings
    }
    yield put(Settings.updateSettings(settings))
}

export function* watchForSaveSettings() {
    yield takeLatest(types.SAVE_SETTINGS, _saveSettings);
}

export function* watchForLoadSettings() {
    yield takeEvery(types.LOAD_SETTINGS, _loadSettings);
}