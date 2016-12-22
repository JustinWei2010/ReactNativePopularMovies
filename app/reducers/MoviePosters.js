'use strict'
import * as types from 'actions/ActionTypes'
import * as constants from 'constants'

const _formatMoviePosterJson = (movieJson) => {
    var posterList = _.map(movieJson.results, function(json, index) {
        return { 'uri': constants.MOVIE_API.POSTER_BASE_URI + json.poster_path }
    })
    return _.chunk(posterList, 2)
}

const _initialState = {
    posterSourceList: [],
    lastUpdated: null
}

const moviePosters = (state = _initialState, action = {}) => {
    switch (action.type) {
        case types.REFRESH_MOVIE_POSTERS:
            return {
                posterSourceList: _formatMoviePosterJson(action.json),
                lastUpdated: action.receivedAt
            }

        default:
            return state;
    }
}

export default moviePosters