'use strict'
import * as types from 'actions/ActionTypes'
import * as constants from 'constants'

export const refreshMoviePosters = (json) => {
    return {
        type: types.REFRESH_MOVIE_POSTERS,
        json: json,
        receivedAt: Date.now()
    }
}

export const fetchMoviePosters = (filter) => {
    return {
        type: types.FETCH_MOVIE_POSTERS,
        filter: filter
    }
}