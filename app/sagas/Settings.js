'use strict'
import { takeLatest } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import * as constants from 'constants'
import * as types from 'actions/ActionTypes'
import * as LocalStorage from 'api/LocalStorage'
import * as Settings from 'actions/Settings'

function* _saveSettings(action) {
    try {
        yield call(LocalStorage.setItem, constants.STORAGE_KEY.SETTINGS, action.settings)
        yield put(Settings.refreshSettings(action.settings))
    } catch (error) {
        console.log("Couldn't save settings to local storage")
        console.log(error)
    }
}

export function* loadSettings() {
    try {
        return yield call(LocalStorage.getItem, constants.STORAGE_KEY.SETTINGS)
    } catch (error) {
        console.log("Couldn't load settings from local storage")
        console.log(error)
    }
}

export function* watchForSaveSettings() {
    yield takeLatest(types.SAVE_SETTINGS, _saveSettings);
}