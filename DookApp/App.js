/*
AUTHORS:
   Mikian Musser      - https://github.com/mm909
   Eric Becerril-Blas - https://github.com/lordbecerril
   Zoyla Orellana     - https://github.com/ZoylaO
   Austin Janushan    - https://github.com/Janushan-Austin
   Giovanny Vazquez   - https://github.com/giovannyVazquez
   Ameera Essaqi      - https://github.com/AmeeraE
   Brandon Herrera    - herrer10@unlv.nevada.edu
   Esdras Morales     - morale2@unlv.nevada.edu

ORGANIZATION:
   Dook Robotics - https://github.com/dook-robotics
*/
// App.js
import React from 'react';
import { AppLoading } from 'expo';
import { Container, Text, Footer } from 'native-base';
// below was old one
//import { StyleSheet, View, Alert } from 'react-native';
import { StyleSheet, Platform, Image, View } from 'react-native'

//import the different screens
import LogIn from './app/LogIn';
import Loading from './app/Loading';
import Main from './app/Main';
import SignUp from './app/SignUp';
import Settings from './app/Settings';
import Running from './app/Running';
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation'
import * as firebase from 'firebase';
import {firebaseConfig} from './Config';

firebase.initializeApp(firebaseConfig);

// create our app's navigation stack
const RootStack = createSwitchNavigator(
  {
    Loading: Loading,
    SignUp: SignUp,
    LogIn: LogIn,
    Main: Main,
    Settings: Settings,
    Running: Running
  },
  {
    initialRouteName: 'Loading'
  }
)


const App = createAppContainer(RootStack);


export default App;
