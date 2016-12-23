'use strict'
import { AccessToken, LoginManager, GraphRequest, GraphRequestManager } from 'react-native-fbsdk'

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

export const getUserProfile = () => {
    return new Promise((resolve, reject) => {
        const responseCallback = (error, result) => {
            if (error) {
                console.log(error)
                reject(error)
            } else {
                resolve(result)
            }
        }

        const eventInfoRequest = new GraphRequest(
            '/me', {
                parameters: {
                    fields: {
                        string: 'id,name,email,picture.width(100).height(100)',
                    },
                },
            },
            responseCallback
        )

        new GraphRequestManager().addRequest(eventInfoRequest).start();
    })

}