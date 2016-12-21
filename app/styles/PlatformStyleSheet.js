'use strict'
import { Platform, StyleSheet } from 'react-native';
 
/*
 * Used to simplify styling for different platforms
 */
const PlatformStyleSheet = {
    create(styles) {
        const styleKeys = Object.keys(styles);
        const keptStyles = {};
 
        styleKeys.forEach((key) => {
            const { ios, android, ...style } = styles[key];
     
            keptStyles[key] = { ...style, ...Platform.select({ ios, android }) };
        });
 
        return StyleSheet.create(keptStyles);
    },
};

export default PlatformStyleSheet