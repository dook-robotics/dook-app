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
  a SignUp screen where the user can create an account
*/
import React from 'react';
import { AppLoading } from 'expo';
import { Container, Text, Footer, Button, Form, Item, Input,Content, Label } from 'native-base';
import { StyleSheet, View, Alert } from 'react-native';
import Config from '../Config.js'


export default class SignUp extends React.Component {
  constructor(props) {
      super(props)

      this.state=({
        email: '',
        password: ''
      })
  }


  signUpUser = (email, password) => {
    try {
      if(this.state.password.length<6)
      {
        alert("Please enter at least 6 characters")
        return;
      }
      firebase.auth().createUserWithEmailAndPassword(email, password)
        alert("Congratulations, your account has been setup")
    }
    catch(error){
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
            <Input />
          </Item>
          <Item stackedLabel last>
            <Label>Password</Label>
            <Input />
          </Item>
        </Form>
        <Button bordered success style={styles.btn}>
          <Text> Complete registration! </Text>
        </Button>
        <Button hasText transparent onPress={() => this.props.navigation.navigate('LogIn')}>
          <Text>Go Back</Text>
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
});
