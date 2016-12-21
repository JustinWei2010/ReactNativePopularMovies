'use strict'
import { takeEvery, takeLatest } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import { fetchMoviePosters } from 'api/MovieDB'
import * as constants from 'constants'
import * as types from 'actions/ActionTypes'
import * as MoviePosters from 'actions/MoviePosters'

const _saveMoviePosters = async(moviePosters) => {
    await setItem(constants.STORAGE_KEY.MOVIE_POSTERS, moviePosters)
}

const _loadMoviePosters = async() => {
    const moviePosters = await getItem(constants.STORAGE_KEY.MOVIE_POSTERS)
    return moviePosters
}

function* _fetchMoviePosters(action) {
    var json = '[]'
    try {
        json = yield call(fetchMoviePosters, action.filter)
        yield call(_saveMoviePosters, json)
    } catch (error) {
        // Error fetching posters from api
        console.log("Couldn't fetch moviePosters from MovieDB api or save it in local storage")
    }
 
    // Fetch from local storage if no json retrieved from api. Images not saved only api call.
    if (json === '[]') {
        try {
            json = yield call(_loadMoviePosters)
        } catch (error) {
            console.log("Couldn't load moviePosters from local storage")
        }
    }

    yield put(MoviePosters.refreshMoviePosters(json))
}

export function* watchForFetchMoviePosters() {
    yield takeEvery(types.FETCH_MOVIE_POSTERS, _fetchMoviePosters);
} 