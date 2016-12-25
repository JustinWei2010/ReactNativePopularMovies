'use strict'
import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import { fetchMoviePosters } from 'api/MovieDB'
import * as constants from 'constants'
import * as types from 'actions/ActionTypes'
import * as LocalStorage from 'api/LocalStorage'
import * as MovieDB from 'actions/MovieDB'

function* _saveMoviePosters (moviePosters) {
    try {
        yield LocalStorage.setItem(constants.STORAGE_KEY.MOVIE_POSTERS, moviePosters)
    } catch (error) {
        console.log("Error while saving movie posters to local storage")
        console.log(error)
    }
}

function* _loadMoviePosters () {
    try {
        return yield call(LocalStorage.getItem, constants.STORAGE_KEY.MOVIE_POSTERS)
    } catch (error) {
        console.log("Error while loading movie posters from local storage")
        console.log(error)
        return '[]'
    }
}

function* _fetchMoviePosters(action) {
    var json = '[]'
    try {
        json = yield call(fetchMoviePosters, action.filter)
        yield call(_saveMoviePosters, json)
    } catch (error) {
        // Error fetching posters from api
        console.log("Couldn't fetch moviePosters from MovieDB api")
        console.log(error)
    }
 
    // Fetch from local storage if no json retrieved from api during internet issues. Images are not saved.
    if (json === '[]') {
        json = yield call(_loadMoviePosters)
    }

    yield put(MovieDB.refreshMoviePosters(json))
}

export function* watchForFetchMoviePosters() {
    yield takeEvery(types.FETCH_MOVIE_POSTERS, _fetchMoviePosters);
} 