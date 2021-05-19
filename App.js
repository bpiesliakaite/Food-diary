import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import { NativeRouter, Route, BackButton, useHistory } from 'react-router-native';
import { Container, Header, Content, Right, Button, Icon } from 'native-base';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { Provider, useDispatch } from 'react-redux';
import store, { accountLogout } from './src/redux/store'

import AuthorizedRoute from './src/components/AuthorizedRoute';
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
import MealForm from './src/MealForm';


const AppHeader = () => {

  const history = useHistory();
  const dispatch = useDispatch();

  const onLogoutClick = () => {
    dispatch(accountLogout());
    history.push('/');
  }

  return (
    <Header style={{ height: 60 }}>
      <Right style={{ marginTop: 20 }}>
        <Button transparent onPress={onLogoutClick}>
          <Icon type="MaterialIcons" name="logout" />
        </Button>
      </Right>
    </Header>
  );
}

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
            <AppHeader />
            <View style={{ flex: 1 }}>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/login" component={LoginForm} />
              <Route exact path="/create-account" component={CreateAccountForm} />
              <Route exact path="/remind-password" component={PasswordReminderForm} />
              <AuthorizedRoute exact path="/dashboard" component={Dashboard} />
              <AuthorizedRoute exact path="/meals" component={Meals} />
              <AuthorizedRoute exact path="/meals/create" component={MealForm} />
              <AuthorizedRoute exact path="/reports" component={Reports} />
              <AuthorizedRoute exact path="/profile" component={Profile} />
              <AuthorizedRoute exact path="/change-password" component={ChangePasswordForm} />
              <StatusBar style="auto" />
            </View>
            <Tabs />
          </Container>
        </BackButton>
      </NativeRouter>
    </Provider >
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },


});
