'use strict'
import React, { Component } from 'react'
import { BackAndroid, Text } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as constants from 'constants'
import * as Navigation from 'actions/Navigation'
import HomeScreen from 'screens/HomeScreen'
import LoginScreen from 'screens/LoginScreen'
import SettingsScreen from 'screens/SettingsScreen'

//May need to authenticate user is logged in, if not then push someone back to loginscreen or rehydrate the token
class AppNavigator extends Component {

    render() {
        return (
            this._renderScene()
        )
    }    

    componentDidMount() {
        //Mount Callback for popping back stack when back button is pressed on android
        BackAndroid.addEventListener('hardwareBackPress', this._handleBackAction)    
    }

    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress', this._handleBackAction);
    }

    _renderScene = () => {
        switch(this.props.currentScreen) {
            case constants.SCREENS.HOME:
                return (
                    <HomeScreen
                        openDrawer={this.props.openDrawer} />
                )

            case constants.SCREENS.SETTINGS:
                return (
                    <SettingsScreen />
                )

            case constants.SCREENS.LOGIN:
                return (
                    <LoginScreen />
                )

            default:
                return (
                    <Text>{`No page defined, internal error ${this.props.currentScreen}`}</Text>
                )
        }
    }

    _handleBackAction = () => {
        // If on first screen and back is pressed then exit app
        if (this.props.backStack.length === 1) {
            return false
        }

        this.props.actions.navigateBack()
        return true
    }
}    

export default connect(state => ({
        ...state.navigation
    }),
    (dispatch) => ({
        actions: bindActionCreators(Navigation, dispatch)
    })
)(AppNavigator)



