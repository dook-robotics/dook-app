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
// Login.js
import React from 'react';
import { AppLoading } from 'expo';
import { Container, Text, Footer, Button, Form, Item, Input,Content, Label } from 'native-base';
import { StyleSheet, View, Alert } from 'react-native';
import {firebaseConfig} from '../Config';
import * as firebase from 'firebase';



export default class LogIn extends React.Component {
  constructor(props) {
      super(props)

      this.state=({
        email: '',
        password: ''
      })
  }



  loginUser = (email, password) => {
    try {
      firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) =>this.props.navigation.navigate('Main'))
    }
    catch(error) {
      console.log(error.toString())
    }
  }


  render() {
    return (
      <Container style = {styles.sContainer}>
        <Text> Welcome to the DOOK app! Please log in :) </Text>
        <Form style = {styles.usr}>
          <Item stackedLabel >
            <Label >E-mail</Label>
            <Input autocorrect={false}  onChangeText={(email) => this.setState({ email })}/>
          </Item>
          <Item stackedLabel last>
            <Label>Password</Label>
            <Input secureTextEntry={true} onChangeText={(password) => this.setState({ password })}/>
          </Item>
        </Form>
        <Button block success style={styles.btn} onPress={() => this.loginUser(this.state.email, this.state.password)}>
          <Text>Log In</Text>
        </Button>
        <Button bordered success style={styles.btn} onPress={() => this.props.navigation.navigate('SignUp')}>
          <Text> Need an account? Sign Up </Text>
        </Button>
      </Container>
    );
  }
}


const styles = StyleSheet.create({
  sContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
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
  txtCtr: {
    alignItems: 'center',
  }
});
