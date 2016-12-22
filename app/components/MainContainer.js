'use strict'
import React, { Component } from 'react'
import Drawer from 'react-native-drawer'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as Settings from 'actions/Settings'
import SideBar from 'components/SideBar'
import AppNavigator from 'navigation/AppNavigator'

class MainContainer extends Component {

    constructor(props) {
        super(props)
        //Load settings for rest of app, works if first page does not depend on settings
        props.actions.loadSettings()
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
                <AppNavigator 
                    openDrawer={this._openDrawer} />
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

export default connect(state => ({}),
    (dispatch) => ({
        actions: bindActionCreators(Settings, dispatch)
    })
)(MainContainer)