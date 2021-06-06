import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import { NativeRouter, Route, BackButton, useHistory, useLocation } from 'react-router-native';
import { Container, Header, Content, Right, Button, Icon, Left, StyleProvider } from 'native-base';
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store, { accountLogout } from './src/redux/store'
import Tooltip from 'react-native-walkthrough-tooltip';

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

const InfoTextContent = {
  ['/dashboard']: <Text>{`Here you can track your diet. More information:
  \n   1. Navigate between different dates to review your food consumption.
  \n   2. Add favourite meals by clicing + button and and selecting meal icon.
  \n   3. Add food items by clicking + button and selecting food item icon.`}</Text>,

  ['/meals']: <Text>{`Here you can create your favourite meals to make food journaling easier. More information:
  \n   1. To create new meal, click + button and create new meal by entering information about it - name, information, add food items.
  \n   2. To edit existing meal, swipe on the meal to the right side and click button [Edit].
  \n   3. To delete existing meal, swipe on the meal to the left side and click button [Delete].
  \n   4. If a meal has been edited, it's conposition will change in the food diary.`}</Text>,

  ['/reports']: <Text>{`Here you can track your diet. More information:
  \n   1. Navigate between different dates to review your food consumption reports.`}</Text>,

  ['/profile']: <Text>{`Here You can review your profile, edit personal information and change your account password. More information:
  \n    1. If you wish to save your edited your profile information, just edit any entry fields and click button [SAVE CHANGES].
  \n    2. If you do not wish to save changes that were made during editing, they won't be saved if button [SAVE CHANGES] is not clicked.`}</Text>
}

const PathNameText = {
  ['/dashboard']: <Text>Food diary</Text>,
  ['/meals']: <Text>Favourite meals</Text>,
  ['/reports']: <Text>Reports</Text>,
  ['/profile']: <Text>Your profile</Text>,
}


const AppHeader = () => {



  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();

  const appearsOn = ['/dashboard', '/meals', '/reports', '/profile']

  const isLoggedIn = useSelector(state => !!state.account.account);

  const onLogoutClick = () => {
    dispatch(accountLogout());
  }

  useEffect(() => {
    if (!isLoggedIn) {
      history.push('/');
    }
  }, [isLoggedIn])

  const [isInfoTooltipVisible, setInfoTootlipVisible] = useState(false);

  if (!appearsOn.includes(location.pathname)) {
    return null;
  }

  return isLoggedIn ? (
    <Header style={{ backgroundColor: "#BF805F", alignItems: 'center', justifyContent: 'space-between', height: 80, paddingTop: 25 }}>

      <View >
        <Tooltip
          isVisible={isInfoTooltipVisible}
          content={InfoTextContent[location.pathname]}
          placement="bottom"
          onClose={() => setInfoTootlipVisible(false)}
          topAdjustment={Platform.OS === 'android' ? -25 : 0}
        >
          <Button transparent onPress={() => setInfoTootlipVisible(true)}>
            <Icon type="MaterialIcons" name="info-outline"></Icon>
          </Button>
        </Tooltip>
      </View>


      <View >
        <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white' }}>{PathNameText[location.pathname]}</Text>
      </View>


      <View >
        <Button transparent onPress={onLogoutClick}>
          <Icon type="MaterialIcons" name="logout" />
        </Button>
      </View>
    </Header >
  ) : null;
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
          <StyleProvider style={getTheme()}>
            <Container >
              <AppHeader />
              <View style={{ flex: 1 }}>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/login" component={LoginForm} />
                <Route exact path="/create-account" component={CreateAccountForm} />
                <Route exact path="/remind-password" component={PasswordReminderForm} />
                <AuthorizedRoute exact path="/dashboard" component={Dashboard} />
                <AuthorizedRoute exact path="/meals" component={Meals} />
                <AuthorizedRoute exact path="/meals/create" component={MealForm} />
                <AuthorizedRoute exact path="/meals/edit" component={MealForm} />
                <AuthorizedRoute exact path="/reports" component={Reports} />
                <AuthorizedRoute exact path="/profile" component={Profile} />
                <AuthorizedRoute exact path="/change-password" component={ChangePasswordForm} />
                <StatusBar style="auto" />
              </View>
              <Tabs />
            </Container>
          </StyleProvider>
        </BackButton>
      </NativeRouter>
    </Provider >
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },


});
