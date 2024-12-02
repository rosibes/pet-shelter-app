// app/login/index.jsx
import { View, Text, Image, Pressable, StyleSheet, Alert } from 'react-native';
import React, { useCallback, useEffect } from 'react';
import Colors from '../../constants/Colors';
import * as WebBrowser from 'expo-web-browser';
import { useOAuth, useUser } from '@clerk/clerk-expo';
import * as Linking from 'expo-linking';
import { SafeAreaView } from 'react-native-safe-area-context';
import Logo from "@/assets/images/logo_site2.png";

// Custom hook to warm up the browser for better UX
export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    // Redirect to home if user is already signed in
    if (isSignedIn) {
      Linking.openURL(Linking.createURL('/home', { scheme: 'myapp' }));
    }
  }, [isSignedIn]);

  const onPress = useCallback(async () => {
    try {
      // Prevent login flow if user is already signed in
      if (isSignedIn) {
        Linking.openURL(Linking.createURL('/home'));

        return;
      }

      const { createdSessionId, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL('/home', { scheme: 'myapp' }),
      });

      if (createdSessionId) {
        await setActive({ session: createdSessionId });
        Linking.openURL(Linking.createURL('/home', { scheme: 'myapp' })); // Redirect to home screen after setting session
      } else {
        Alert.alert('Login Error', 'Failed to log in. Please try again.');
      }
    } catch (err) {
      console.error('OAuth error', err);
      Alert.alert('Login Error', 'An error occurred during login. Please try again.');
    }
  }, [isSignedIn]);

  return (
    <View style={styles.container}>
            <Text style={styles.title}>Pet Shelter</Text>

      <Image
        source={Logo}style={styles.image}
      />
      <Text style={styles.subtitle}>
Looking to own a pet?      </Text>

      <Pressable onPress={onPress} style={styles.button}>
        <Text style={styles.buttonText}>Get started</Text>
      </Pressable>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 10,
  },
  title: {
    color: '#3C3C3B',
    fontFamily: 'PTMono',
    fontSize: 40,
    textAlign: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  subtitle: {
    fontFamily: 'PTMono',
    fontSize: 15,
    textAlign: 'center',
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 10,
    color: Colors.VIOLET,
  },
  button: {
    padding: 14,
    backgroundColor: Colors.SALMON,
    width: '80%',
    borderRadius: 14,
    marginBottom: 100,
  },
  buttonText: {
    fontFamily: 'PTMono',
    color: 'white',
    textAlign: 'center',
    fontSize: 20
  },
});
