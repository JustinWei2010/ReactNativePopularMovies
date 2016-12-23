'use strict'
import * as Facebook from 'sagas/Facebook'
import * as MoviePosters from 'sagas/MoviePosters'
import * as Settings from 'sagas/Settings'

export default function* rootSaga() {
    yield [
        Facebook.watchForLogin(),
        Facebook.watchForLogout(),
        MoviePosters.watchForFetchMoviePosters(),
        Settings.watchForSaveSettings(),
        Settings.watchForLoadSettings()
    ]
}