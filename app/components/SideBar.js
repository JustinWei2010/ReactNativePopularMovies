'use strict'
import React, { Component } from 'react';
import { Image, Platform, StyleSheet, Dimensions } from 'react-native';
import { LoginManager } from 'react-native-fbsdk'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Content, Text, List, ListItem, Icon, View } from 'native-base';

import * as constants from 'constants'
import * as Login from 'actions/Login'
import * as Navigation from 'actions/Navigation'

const drawerCover = require('resources/drawer-cover.png');
const drawerImage = require('resources/logo-kitchen-sink.png');
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

class SideBar extends Component {

    render() {
        return (
            <Content style={styles.sidebar}>
                <Image source={drawerCover} style={styles.drawerCover}>
                    <Image square style={styles.drawerImage} source={drawerImage}/>
                </Image>
                <List>   
                    <ListItem button iconLeft onPress={this._onPressSettingsButton}>
                        <View style={styles.listItemContainer}>
                            <View style={[styles.iconContainer, { backgroundColor: '#0209D8', paddingLeft: 14 }]}>
                                <Icon name="ios-phone-portrait-outline" style={styles.sidebarIcon} />
                            </View>
                            <Text style={styles.text}>Settings</Text>
                        </View>
                    </ListItem>
                    <ListItem button iconLeft onPress={this._onPressLogoutButton}>
                        <View style={styles.listItemContainer}>
                            <View style={[styles.iconContainer, { backgroundColor: '#4DCAE0', paddingLeft: 14 }]}>
                                <Icon name="md-power" style={styles.sidebarIcon} />
                            </View>
                            <Text style={styles.text}>Logout</Text>
                        </View>
                    </ListItem>
                </List>
            </Content>
        )
    }

    _onPressSettingsButton = () => {
        this.props.closeDrawer()
        this.props.actions.navigateTo(constants.SCREENS.SETTINGS)
    }

    _onPressLogoutButton = () => {
        this.props.closeDrawer()
        this.props.actions.logout()
    }

}

export default connect(state => ({}),
    (dispatch) => ({
        actions: bindActionCreators({ ...Login, ...Navigation }, dispatch)
    })
)(SideBar)

const styles = StyleSheet.create({

    sidebar: {
        flex: 1,
        backgroundColor: '#fff'
    },

    drawerCover: {
        alignSelf: 'stretch',
        height: deviceHeight / 3.5,
        width: null,
        position: 'relative',
        marginBottom: 10,
    },
    drawerImage: {
        position: 'absolute',
        left: (Platform.OS === 'android') ? deviceWidth / 10 : deviceWidth / 9,
        top: (Platform.OS === 'android') ? deviceHeight / 13 : deviceHeight / 12,
        width: 210,
        height: 75,
        resizeMode: 'cover',
    },

    listItemContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },

    iconContainer: {
        width: 37,
        height: 37,
        borderRadius: 18,
        marginRight: 12,
        paddingLeft: 11,
        paddingTop: (Platform.OS === 'android') ? 7 : 5
    },

    sidebarIcon: {
        fontSize: 21,
        color: '#fff',
        lineHeight: (Platform.OS === 'android') ? 21 : 25,
        backgroundColor: 'transparent'
    },

    text: {
        fontWeight: '500',
        fontSize: 16
    }

})