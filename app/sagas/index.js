'use strict'
import * as MoviePosters from 'sagas/MoviePosters'
import * as Settings from 'sagas/Settings'

export default function* rootSaga() {
    yield [
        MoviePosters.watchForFetchMoviePosters(),
        Settings.watchForSaveSettings(),
        Settings.watchForLoadSettings()
    ]
}