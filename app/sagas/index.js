'use strict'
import * as Facebook from 'sagas/Facebook'
import * as MovieDB from 'sagas/MovieDB'
import * as Settings from 'sagas/Settings'

export default function* rootSaga() {
    yield [
        Facebook.watchForLogin(),
        Facebook.watchForLogout(),
        MovieDB.watchForFetchMoviePosters(),
        Settings.watchForSaveSettings(),
        Settings.watchForLoadSettings()
    ]
}