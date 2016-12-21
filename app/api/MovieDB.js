'use strict'
import * as constants from 'constants'

const _buildURL = (filter) => {
    var path = ''
    switch (filter) {
        case constants.MOVIE_FILTERS.MOST_POPULAR:
            path = constants.MOVIE_API.POPULAR_MOVIES_PATH
            break
        case constants.MOVIE_FILTERS.HIGHEST_RATED:
            path = constants.MOVIE_API.HIGHEST_RATED_PATH
            break
    }
    return constants.MOVIE_API.BASE_URI + path + '?api_key=' + constants.MOVIE_API.API_KEY
}

export const fetchMoviePosters = async(filter) => {
    const response = await fetch(_buildURL(filter));
    const json = await response.json();
    return json
}
