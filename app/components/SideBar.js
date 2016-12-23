'use strict'
import React, { Component } from 'react';
import { Image, Platform, StyleSheet, Dimensions } from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Content, Text, List, ListItem, Icon, Thumbnail, View } from 'native-base';

import * as constants from 'constants'
import * as Facebook from 'actions/Facebook'
import * as Navigation from 'actions/Navigation'

class SideBar extends Component {

    render() {
        return (
            <Content style={styles.sidebar}>
                <View style={styles.profileContainer}>
                    <View style={styles.profileIcon}>
                        <Thumbnail size={60} source={this.props.profile.src} />
                    </View>
                    <View style={styles.profileInfo}>
                        <Text style={styles.profileName}>{this.props.profile.name}</Text>
                        <Text style={styles.profileViewEvents}>View events</Text>
                    </View>
                </View>
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
        this.props.actions.fbLogout()
    }

}

export default connect(state => ({
    profile: state.profile
    }),
    (dispatch) => ({
        actions: bindActionCreators({ ...Facebook, ...Navigation }, dispatch)
    })
)(SideBar)

const styles = StyleSheet.create({

    sidebar: {
        flex: 1,
        backgroundColor: '#fff'
    },

    profileContainer: {
        flexDirection: 'row',
        paddingVertical: 30
    },

    profileIcon: {
        paddingHorizontal: 10,
    },

    profileInfo: {
        paddingTop: 10,
        paddingLeft: 10,
        flexDirection: 'column'
    },

    profileName: {
        fontSize: 18
    },

    profileViewEvents: {
        fontSize: 14,
        color: 'grey'
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