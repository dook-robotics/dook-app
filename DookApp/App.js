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
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View, Alert } from 'react-native';
import LogIn from './app/LogIn';
import Loading from './app/Loading';
import Main from './app/Main';
import SignUp from './app/SignUp';
import { SwitchNavigator } from 'react-navigation'


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <Container style = {styles.container}>
        <LogIn/>
      </Container>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
