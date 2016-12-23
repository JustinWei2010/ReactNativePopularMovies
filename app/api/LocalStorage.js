'use strict'
import { AsyncStorage } from 'react-native'

const MAIN_STORE_NAME = '@MainStore'

export const setItem = async(key, value) => {
    var json = JSON.stringify(value)
    await AsyncStorage.setItem(MAIN_STORE_NAME + ':' + key, json)
}

export const getItem = async(key) => {
    var json = await AsyncStorage.getItem(MAIN_STORE_NAME + ':' + key)
    var value = await JSON.parse(json)
    return value
}