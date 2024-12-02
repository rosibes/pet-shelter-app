// useWarmUpBrowser.js
import React from 'react';
import { Platform } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

export const useWarmUpBrowser = () => {
    React.useEffect(() => {
        // Only warm up browser on Android
        if (Platform.OS === 'android') {
            void WebBrowser.warmUpAsync();
        }
        return () => {
            if (Platform.OS === 'android') {
                void WebBrowser.coolDownAsync();
            }
        };
    }, []);
};
