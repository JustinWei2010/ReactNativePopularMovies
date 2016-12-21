'use strict'
import React, { Component } from 'react'
import { BackAndroid, Text } from 'react-native'
import * as constants from 'constants'
import HomeScreen from 'screens/HomeScreen'
import LoginScreen from 'screens/LoginScreen'
import SettingsScreen from 'screens/SettingsScreen'

export default class AppNavigator extends Component {

    render() {
        return (
            this._renderScene()
        )
    }    

    //Mount Callback for popping back stack when back button is pressed on android
    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', this._handleBackAction)    
    }

    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress', this._handleBackAction);
    }

    //Render scene and pass in necessary global actions
    _renderScene = () => {
        switch(this.props.currentScreen) {
            case constants.SCREENS.HOME:
                return (
                    <HomeScreen
                        {...this.props.drawerActions} />
                )

            case constants.SCREENS.SETTINGS:
                return (
                    <SettingsScreen 
                        {...this.props.navigateActions} />
                )

            case constants.SCREENS.LOGIN:
                return (
                    <LoginScreen
                        {...this.props.navigateActions} />
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

        this.props.navigateActions.navigateBack()
        return true
    }
}    



