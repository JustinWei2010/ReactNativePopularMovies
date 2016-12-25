'use strict'

export const SCREENS = {
    LOGIN: 'Login',
    HOME: 'Home',
    SETTINGS: 'Settings'
}

export const TIMERS_MS = {
    REFRESH_MOVIE_POSTERS: 300000 //5 min
}

export const STORAGE_KEY = {
    SETTINGS: 'Settings',
    MOVIE_POSTERS: 'MoviePosters',
    FB_TOKEN: 'FBToken'
}

export const MOVIE_API = {
    API_KEY: '', //INSERT API key
    POSTER_BASE_URI: 'https://image.tmdb.org/t/p/w185/',
    BASE_URI: "https://api.themoviedb.org/3/movie",
    POPULAR_MOVIES_PATH: '/popular',
    HIGHEST_RATED_PATH: '/top_rated'
}

export const MOVIE_FILTERS = {
    MOST_POPULAR: 'MostPopular',
    HIGHEST_RATED: 'HighestRated'
}

export const FB_PERMISSIONS = {
    FRIENDS: 'user_friends'
}