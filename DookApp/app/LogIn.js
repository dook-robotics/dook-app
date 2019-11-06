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

PURPOSE:
  a Login screen where an existing user can login or choose to sign up
*/
// App.js
import React from 'react';
import { AppLoading } from 'expo';
import { Container, Text, Footer, Button, Form, Item, Input,Content, Label } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View, Alert } from 'react-native';
import Config from '../Config.js'


export default class App extends React.Component {

  render() {
    return (
      <Container style = {styles.container}>
        <Text> DOOK </Text>
        <Form style = {styles.usr}>
          <Item stackedLabel >
            <Label >Username</Label>
            <Input />
          </Item>
          <Item stackedLabel last>
            <Label>Password</Label>
            <Input />
          </Item>
        </Form>
        <Button block success style={styles.btn}>
          <Text>Log In</Text>
        </Button>
        <Button bordered success style={styles.btn}>
          <Text> Need an account? Sign Up </Text>
        </Button>
      </Container>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '80%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  usr: {
    width: '100%',
  },
  btn: {
    width: '100%',
    marginTop: 10,
    alignItems: 'center',
  },
});
