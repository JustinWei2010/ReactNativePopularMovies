'use strict'
import React, { Component } from 'react'
import { Image, ScrollView } from 'react-native'
import { Container, Text, View } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PlatformStyleSheet from 'styles/PlatformStyleSheet'
import * as constants from 'constants'
import * as settings from 'actions/Settings'

class LoginScreen extends Component {

    constructor(props) {
        super(props)
        //Load settings for rest of app, assumes this is always first page
        props.actions.loadSettings()
    }

    render() {
        return (
            <Container style={styles.mainContainer}>
                <View scrollEnabled={false} style={styles.content}>
                    <View style={styles.logo}>
                        <Text>
                            App Logo
                        </Text>
                    </View>
                    <Icon.Button 
                        name='facebook'
                        backgroundColor='#2196F3'
                        onPress={this._loginWithFacebook}>
                        Login with Facebook
                    </Icon.Button>
                </View>
            </Container>
        )
    }

    _loginWithFacebook = () => {
        this.props.navigateTo(constants.SCREENS.HOME)
    }

}

const styles = PlatformStyleSheet.create({

    mainContainer: {
        backgroundColor: 'white'
    },

    content: {
        flex: 1,
        margin: 30
    },

    logo: {
        flex: 1,
        backgroundColor: '#F6F7F8',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    }

})

export default connect(state => ({
    }),
    (dispatch) => ({
        actions: bindActionCreators(settings, dispatch)
    })
)(LoginScreen)