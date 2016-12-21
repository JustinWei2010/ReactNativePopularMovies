'use strict'
import React, { Component } from 'react'
import { Image, ScrollView } from 'react-native'
import { Button, Container, Content, Header, Icon, List, ListItem, Title, Text, Radio } from 'native-base'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as constants from 'constants'
import * as settings from 'actions/Settings'
import PlatformStyleSheet from 'styles/PlatformStyleSheet'

const mostPopularFilter = constants.MOVIE_FILTERS.MOST_POPULAR
const highestRatedFilter = constants.MOVIE_FILTERS.HIGHEST_RATED


class SettingsScreen extends Component {

    render() {
        return (
            <Container style={styles.container}>
                <Header>
                    <Button transparent onPress={this._onClickBackButton}>
                        <Icon name='ios-arrow-back' />
                    </Button>
                    <Title>User Settings</Title>
                </Header>
                <Content scrollEnabled={false}>
                    <List>
                        <ListItem itemDivider>
                            <Text>Filter Movies By</Text>
                        </ListItem>                    
                        <ListItem >
                            <Radio selected={this._isSelectedMovieFilter(mostPopularFilter)} 
                                onPress={() => this._onSelectMovieFilter(mostPopularFilter)} />
                            <Text>Most Popular</Text>
                        </ListItem>
                        <ListItem>
                            <Radio selected={this._isSelectedMovieFilter(highestRatedFilter)} 
                                onPress={() => this._onSelectMovieFilter(highestRatedFilter)} />
                            <Text>Highest Rated</Text>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        )
    }

    _onClickBackButton = () => {
        this.props.navigateBack()
    }

    _isSelectedMovieFilter = (filter) => {
        return this.props.settings.movieFilter === filter
    }

    //Have to use arrow function to pass argument inline, might be limitation of ES6
    _onSelectMovieFilter = (filter) => {
        if (!this._isSelectedMovieFilter(filter)) {
            this.props.actions.saveSettings({
                ...this.props.settings,
                movieFilter: filter
            })
        }
    }

}

const styles = PlatformStyleSheet.create({

    container: {
        backgroundColor: 'white'
    }

})

export default connect(state => ({
        settings: state.settings
    }),
    (dispatch) => ({
        actions: bindActionCreators(settings, dispatch)
    })
)(SettingsScreen)
