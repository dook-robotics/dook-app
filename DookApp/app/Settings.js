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
  a setting screen of our application that we only show to an authenticated user. Allows for log-outs
*/
// Settings.js
import React, {Component} from 'react'
import { StyleSheet, Platform, Image, View,TouchableOpacity, TextInput, Alert,TouchableWithoutFeedback } from 'react-native'
import { Container, Header, Content, Button, Icon,Text, Body, Title, Right, Left,Tabs , Footer, FooterTab, ListItem} from 'native-base';
import * as firebase from 'firebase';
import AnimatedProgressWheel from 'react-native-progress-wheel';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import {Helmet} from "react-helmet";
import ProgressiveImage from 'react-progressive-image';

export default class Settings extends React.Component {
  state = {
      currentUser: null,
    }
    componentDidMount() {
      const { currentUser } = firebase.auth()
      this.setState({ currentUser })
    }

    signOutUser = () => {
      firebase.auth().signOut().then(function (user){
      }).catch(function(error) {
        console.log(error)
      });
    }

  render() {
    const { currentUser } = this.state;


    return (
            <Container>
              <View>
                <Header style = {styles.colorz}>
                  <Body style={{marginLeft:"35%"}}>
                    <Image
                      style={{width: 200, height: 50}}
                      source={require('../assets/dook2.png')}
                    />
                  </Body>
                </Header>
                <Button light hasText  onPress={() => this.signOutUser()}>
                  <Text>Sign Out</Text>
                </Button>
                <Footer>
                  <FooterTab>
                    <Button active onPress={() => this.props.navigation.navigate('Settings')}>
                      <Text>Settings</Text>
                    </Button>
                    <Button  onPress={() => this.props.navigation.navigate('Main')}>
                      <Text >Home</Text>
                    </Button>
                    <Button>
                      <Text>Schedule</Text>
                    </Button>
                  </FooterTab>
                </Footer>
              </View>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50
  },
  colorz: {
    backgroundColor:'green',
    textAlign:'center'
  },
  headerWord: {
    textAlign: 'center'
  },
  myButton:{
    padding: 5,
    height: 300,
    width: 300,  //The Width must be the same as the height
    borderRadius:600, //Then Make the Border Radius twice the size of width or Height
    backgroundColor:'green'

  },
  myButton2:{
    padding: 5,
    height: 300,
    width: 300,  //The Width must be the same as the height
    borderRadius:600, //Then Make the Border Radius twice the size of width or Height
    backgroundColor:'red',

  }
})
