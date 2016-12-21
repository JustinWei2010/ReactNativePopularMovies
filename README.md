#ReactNativePopularMovies
This project was started to showcase some basic redux principles on a simple movie app. 

----
##Project Setup

###Setup react-native:

```
brew install node
brew install watchman
npm install -g react-native-cli
```

###Run code:

```
git clone https://github.com/JustinWei2010/ReactNativeTutorial.git
cd ReactNativeTutorial
npm install
react-native link react-native-vector-icons
react-native run-ios
react-native run-android
```

> Fix android [bug]((http://stackoverflow.com/questions/36293577/syntaxerror-strict-mode-does-not-allow-function-declarations-in-a-lexically-nes)) before running app on android

>Make sure to fill in the API key in app/constants/index.js before running the app.

----
##Useful links:
1. [Facebook react-native tutorial](https://facebook.github.io/react-native/docs/getting-started.html)
2. [Redux videos](https://egghead.io/courses/getting-started-with-redux)
3. [Redux documentation](http://redux.js.org/docs/introduction/)
4. [Redux saga documentation](http://yelouafi.github.io/redux-saga/docs/introduction/index.html)
5. [Redux with redux-saga example](http://joelhooks.com/blog/2016/03/20/build-an-image-gallery-using-redux-saga/)
6. [Redux grocery list example](https://github.com/bruz/react-native-redux-groceries)
7. [NativeBase](http://nativebase.io/)
8. [ES6](http://es6-features.org/#Constants)

