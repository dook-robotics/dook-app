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
import { StyleSheet, Image, View, Alert } from 'react-native';
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
        Alert.alert(
                'Invalid Log In',
                [
                  {text: 'ok'},
                ],
                { cancelable: false }
              )
          }

  }
  render() {
    return (
      <Container style = {styles.sContainer}>
        <Image source={require('../assets/dook.png')} style = {styles.image}/>
        <Text style = {styles.textInput}> Welcome to the DOOK app! Please log in: </Text>
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
          <Text style={styles.txtCtr}> Need an account? Sign Up </Text>
        </Button>
        <Button hasText transparent >
          <Text>Forgot Password</Text>
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
    textAlign: 'center'
  },
  txtCtr: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'

  },
  image: {
    width: 300,
    height: 120,
    resizeMode: 'stretch'
  },
  textInput: {
    height: 40,
    fontSize:20,
    width: '90%',
    borderColor: '#9b9b9b',
    borderBottomWidth: 1,
    marginTop: 8,
    marginVertical: 15
  }
});
