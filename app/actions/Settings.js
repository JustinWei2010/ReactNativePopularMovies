'use strict'
import * as types from 'actions/ActionTypes'

//Used to update display related to setting changes
export const updateSettings = (settings) => {
    return {
        type: types.UPDATE_SETTINGS,
        settings: settings
    }
}

//Used to save settings to local storage
export const saveSettings = (settings) => {
    return {
        type: types.SAVE_SETTINGS,
        settings: settings
    }
}

//Used to load settings from local storage
export const loadSettings = () => {
    return {
        type: types.LOAD_SETTINGS
    }
}