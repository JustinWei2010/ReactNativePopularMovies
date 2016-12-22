'use strict'
import { AccessToken, LoginManager } from 'react-native-fbsdk'

export const login = async(readPermissions) => {
    const response = await LoginManager.logInWithReadPermissions(readPermissions)
    if (response.isCancelled) {
        throw new Error('Login cancelled');
    } else if (await response.deniedPermissions) {
        console.log("Missing permissions: " + response.deniedPermissions)
        throw new Error('We need the requested permissions')
    } else {
        const token = await AccessToken.getCurrentAccessToken()
        return token
    }
}

export const logout = () => {
    LoginManager.logOut()
}