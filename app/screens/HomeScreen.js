'use strict'
import _ from 'lodash'
import React, { Component } from 'react'
import { Image, ScrollView } from 'react-native'
import { Button, Container, Header, Icon, Title } from 'native-base'
import { Col, Row, Grid } from 'react-native-easy-grid'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Constants from 'constants'
import * as MovieDB from 'actions/MovieDB'
import PlatformStyleSheet from 'styles/PlatformStyleSheet'

class HomeScreen extends Component {

    componentDidMount() {
        //Refresh poster data every 5 minutes
        this._refreshMoviePosters()
        this._refreshMoviePostersInterval = setInterval(
            this._refreshMoviePosters, 
            Constants.TIMERS_MS.REFRESH_MOVIE_POSTERS
        )
    }

    componentWillUnmount() {
        clearInterval(this._refreshMoviePostersInterval);
    }

    render() {
        return (
            <Container style={styles.container}>
                <Header>
                    <Button transparent onPress={this._onMenuButtonPress}>
                        <Icon name='ios-menu' />
                    </Button>
                    <Title>Popular Movies</Title>
                    <Button transparent onPress={this._onRefreshButtonPress}>
                        <Icon name='ios-refresh' />
                    </Button>
                </Header>

                <ScrollView>
                    {this._renderMoviePosters(this.props.posterSrcList)}
                </ScrollView>
            </Container>
        )
    }

    _refreshMoviePosters = () => {
        this.props.actions.fetchMoviePosters(this.props.movieFilter)
    }

    _onMenuButtonPress = () => {
        this.props.openDrawer()
    }

    _onRefreshButtonPress = () => {
        this._refreshMoviePosters()
    }

    _renderMoviePosters = (moviePosters) => {
        return (
            <Grid> 
                { _.map(moviePosters, (posterRow, rowIndex) => {
                    return (                   
                        <Row key={rowIndex} style={styles.posterRow}>
                            { _.map(posterRow, (image, posterIndex) => {
                                return (
                                    <Col key={posterIndex}>
                                        <Image style={styles.poster} source={image} />
                                    </Col>
                                )
                            })}
                        </Row>
                    )
                })}                   
            </Grid>
        )
    }

}

export default connect(state => ({
        movieFilter: state.settings.movieFilter,
        posterSrcList: state.moviePosters.posterSrcList
    }),
    (dispatch) => ({
        actions: bindActionCreators(MovieDB, dispatch)
    })
)(HomeScreen)

const styles = PlatformStyleSheet.create({

    container: {
        backgroundColor: 'white'
    },

    posterRow: {
        height: 250
    },

    poster: {
        flex:1,
        height: null,
        width: null,
        resizeMode:'cover'
    }

})