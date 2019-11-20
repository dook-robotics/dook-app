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
  a Main screen of our application that we only show to an authenticated user.
*/
// Main.js
import React from 'react'
import { StyleSheet, Platform, Image, View,TouchableOpacity, TextInput } from 'react-native'
import { Container, Header, Content, Button, Text, Body, Title, Right, Left, Icon } from 'native-base';
import * as firebase from 'firebase';
import AnimatedProgressWheel from 'react-native-progress-wheel';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import {Helmet} from "react-helmet";
import ProgressiveImage from 'react-progressive-image';


export default class Main extends React.Component {
  state = { currentUser: null }


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
    const { currentUser } = this.state
    return (
          <View >
            <Header style = {styles.colorz}>
              <Body>
                <Title >DOOK</Title>
              </Body>
              <Right>
                <Button light hasText transparent onPress={() => this.signOutUser()}>
                  <Text>Sign Out</Text>
                </Button>
              </Right>
            </Header>
            <View style = {styles.container}>
              <TouchableOpacity style ={styles.myButton}>
              </TouchableOpacity>
              <View style = {styles.container}>
                <View style={{flexDirection:"row"}}>
                </View>
                <View style={{flexDirection:"row"}}>
                  <View style={{flexDirection:"col",marginRight:"20%"}}>
                    <Text style={{fontWeight:'bold',marginBottom:"20%"}}>Waste</Text>
                    <AnimatedProgressWheel
                      size={80}
                      width={15}
                      progress={100}
                      animateFromValue={0}
                      duration={5000}
                      color={'#daa520'}
                      fullColor={'#8b4513'}
                      />
                  </View>
                  <View style={{flexDirection:"col", marginLeft:"20%"}}>
                    <Text style={{fontWeight:'bold',marginBottom:"20%"}}>Battery</Text>
                    <AnimatedProgressWheel
                      size={80}
                      width={15}
                      progress={80}
                      animateFromValue={0}
                      duration={5000}
                      color={'red'}
                      fullColor={'green'}
                      />
                  </View>
                </View>
              </View>
            </View>
          </View>

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
    height: 250,
    width: 250,  //The Width must be the same as the height
    borderRadius:600, //Then Make the Border Radius twice the size of width or Height
    backgroundColor:'green'

  }
})
