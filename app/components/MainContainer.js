'use strict'
import React, { Component } from 'react'
import SideBar from 'components/SideBar'
import AppNavigator from 'navigation/AppNavigator'
import Drawer from 'react-native-drawer'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Navigation from 'actions/Navigation'

class MainContainer extends Component {

    render() {
        const drawerActions = {
            openDrawer: this._openDrawer,
            closeDrawer: this._closeDrawer
        }
        return (
            <Drawer
                ref={(ref) => { this._drawer = ref; }}
                type="static"
                content={
                    <SideBar 
                        closeDrawer={this._closeDrawer}
                        {...this.props.navigateActions} />
                }
                tapToClose={true}
                openDrawerOffset={100}>
                <AppNavigator 
                    drawerActions={drawerActions}
                    navigateActions={this.props.navigateActions}
                    currentScreen={this.props.currentScreen}
                    backStack={this.props.backStack} />
            </Drawer>
        )
    }

    _openDrawer = () => {
        this._drawer.open()
    }

    _closeDrawer = () => {
        this._drawer.close()
    }
}

export default connect(state => ({
        currentScreen: state.navigation.currentScreen,
        backStack: state.navigation.backStack
    }),
    (dispatch) => ({
        navigateActions: bindActionCreators(Navigation, dispatch)
    })
)(MainContainer)