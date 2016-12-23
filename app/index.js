'use strict'
import React, { Component } from 'react'
import { applyMiddleware, createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'

import * as reducers from 'reducers'
import rootSaga from 'sagas'
import AppContainer from 'components/AppContainer'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
    combineReducers(reducers),
    applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(rootSaga)

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <AppContainer />
            </Provider>
        )
    }
}