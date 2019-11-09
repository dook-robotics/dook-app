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
import * as firebase from 'firebase';


export default class SignUp extends React.Component {
  constructor(props) {
      super(props)

      this.state=({
        email: '',
        password: '',
        vPassword:'',
        vEmail:''
      })
  }


  signUpUser = (email, password) => {
    try {
      if(this.state.password.length<6)
      {
        alert("Please enter at least 6 characters for the password")
        return;
      }
      if(this.state.email != this.state.vEmail){
        alert("Emails do not match!")
        return;
      }
      if(this.state.password != this.state.vPassword){
        alert("Passwords do not match!")
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
        <Text> Create your account </Text>
        <Form style = {styles.usr}>
          <Item stackedLabel >
            <Label >E-mail</Label>
            <Input onChangeText={email => this.setState({ email })} />
          </Item>
          <Item stackedLabel >
            <Label >Verify E-mail</Label>
            <Input onChangeText={vEmail => this.setState({ vEmail })} />
          </Item>
          <Item stackedLabel last>
            <Label>Password</Label>
            <Input onChangeText={password => this.setState({ password })} secureTextEntry={true}/>
          </Item>
          <Item stackedLabel last>
            <Label>Verify Password</Label>
            <Input onChangeText={vPassword => this.setState({ vPassword })} secureTextEntry={true}/>
          </Item>
        </Form>
        <Button bordered success style={styles.btn} onPress={() => this.signUpUser(this.state.email, this.state.password)}>
          <Text> Complete registration! </Text>
        </Button>
        <Button hasText transparent onPress={() => this.props.navigation.navigate('LogIn')}>
          <Text>Already have an account? Login</Text>
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
});
