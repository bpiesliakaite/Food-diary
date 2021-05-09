import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import { NativeRouter, Route, BackButton } from 'react-router-native';
import { Container, Header, Content } from 'native-base';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { Provider } from 'react-redux';
import store from './src/redux/store'

import HomePage from './src/HomePage';
import LoginForm from './src/LoginForm';
import Tabs from './src/Tabs';
import CreateAccountForm from './src/CreateAccountForm';
import PasswordReminderForm from './src/PasswordReminderForm';
import Dashboard from './src/Dashboard';
import Meals from './src/Meals';
import Reports from './src/Reports';
import Profile from './src/ProfileForm';
import ChangePasswordForm from './src/ChangePasswordForm';

export default function App() {

  const [isReady, setReady] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    }).then(() => setReady(true));
  }, [])

  if (!isReady) {
    return <AppLoading />;
  }

  return (
    <Provider store={store}>
      <NativeRouter>
        <BackButton>
          <Container>
            <Header />
            <View style={{ flex: 1 }}>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/login" component={LoginForm} />
              <Route exact path="/create-account" component={CreateAccountForm} />
              <Route exact path="/remind-password" component={PasswordReminderForm} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/meals" component={Meals} />
              <Route exact path="/reports" component={Reports} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/change-password" component={ChangePasswordForm} />
              <StatusBar style="auto" />
            </View>
            <Tabs />
          </Container>
        </BackButton>
      </NativeRouter>
    </Provider>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },


});
