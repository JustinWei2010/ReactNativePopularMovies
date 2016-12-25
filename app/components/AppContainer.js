'use strict'
import React, { Component } from 'react'
import Drawer from 'react-native-drawer'
import { BackAndroid, Text } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as constants from 'constants'
import * as Navigation from 'actions/Navigation'
import SideBar from 'components/SideBar'
import HomeScreen from 'screens/HomeScreen'
import LoginScreen from 'screens/LoginScreen'
import SettingsScreen from 'screens/SettingsScreen'

class AppContainer extends Component {

    componentDidMount() {
        //Mount Callback for popping back stack when back button is pressed on android
        BackAndroid.addEventListener('hardwareBackPress', this._handleBackAction)    
    }

    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress', this._handleBackAction);
    }

    render() {
        return (
            <Drawer
                ref={(ref) => { this._drawer = ref; }}
                type="static"
                content={
                    <SideBar 
                        closeDrawer={this._closeDrawer} />
                }
                tapToClose={true}
                openDrawerOffset={100}>
                { this._renderScene() }
            </Drawer>
        )
    }

    _renderScene = () => {
        switch(this.props.currentScreen) {
            case constants.SCREENS.HOME:
                return (
                    <HomeScreen
                        openDrawer={this._openDrawer} />
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

    _openDrawer = () => {
        this._drawer.open()
    }

    _closeDrawer = () => {
        this._drawer.close()
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
        currentScreen: state.navigation.currentScreen,
        backStack: state.navigation.backStack
    }),
    (dispatch) => ({
        actions: bindActionCreators(Navigation, dispatch)
    })
)(AppContainer)
