'use strict'
import * as types from 'actions/ActionTypes'

//Used to update display related to setting changes
export const refreshSettings = (settings) => {
    return {
        type: types.REFRESH_SETTINGS,
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