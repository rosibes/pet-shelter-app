// app/_layout.tsx
import React from 'react';
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SecureStore from 'expo-secure-store';
import { ClerkProvider } from '@clerk/clerk-expo';

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
if (!publishableKey) {
  throw new Error(
    'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
  );
}

const tokenCache = {
  async getToken(key) {
    try {
      const item = await SecureStore.getItemAsync(key);
      if (item) {
        console.log(`${key} was used 🔐 \n`);
      } else {
        console.log('No values stored under key: ' + key);
      }
      return item;
    } catch (error) {
      console.error('SecureStore get item error: ', error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export default function RootLayout() {
  useFonts({
    'robonto': require('./../assets/fonts/Roboto-Regular.ttf'),
    'robonto_medium': require('./../assets/fonts/Roboto-Medium.ttf'),
    'robonto_bold': require('./../assets/fonts/Roboto-Bold.ttf'),
    'PTMono': require('./../assets/fonts/PTMono-Regular.ttf'),
    'euclid_bold' : require('./../assets/fonts/Euclid Circular B Bold.ttf'),
    'euclid_reg' : require('./../assets/fonts/Euclid Circular B Regular.ttf'),
    'euclid_medium' : require('./../assets/fonts/Euclid Circular B Medium.ttf')


  });

  return (
    <ClerkProvider 
      tokenCache={tokenCache}
      publishableKey={publishableKey}>
      <Stack>
        <Stack.Screen name="index" /> {/* Main entry point */}
        <Stack.Screen name="(tabs)"
          options={{
            headerShown:false     //dispare acel 'tabs' din header
          }}/>
        <Stack.Screen name="login/index" /> {/* Login Screen */}
        <Stack.Screen name="home" /> {/* Home Screen */}

      </Stack>
    </ClerkProvider>
  );
}
