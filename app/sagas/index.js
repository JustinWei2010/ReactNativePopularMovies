'use strict'
import * as Login from 'sagas/Login'
import * as MoviePosters from 'sagas/MoviePosters'
import * as Settings from 'sagas/Settings'

export default function* rootSaga() {
    yield [
        Login.watchForLogin(),
        Login.watchForLogout(),
        MoviePosters.watchForFetchMoviePosters(),
        Settings.watchForSaveSettings(),
        Settings.watchForLoadSettings()
    ]
}