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
import { StyleSheet, Platform, Image, View,TouchableOpacity, TextInput, Alert,TouchableWithoutFeedback } from 'react-native'
import { Container, Header, Content, Button, Text, Body, Title, Right, Left, Icon } from 'native-base';
import * as firebase from 'firebase';
import AnimatedProgressWheel from 'react-native-progress-wheel';


export default class Main extends React.Component {
  state = {
    currentUser: null,
    isItOn: null
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

  powerButton = (temp) => {
    var db = firebase.database();
    var newPostKey = firebase.database().ref().child('posts').push().key;
    if (this.state.isItOn == null || this.state.isItOn == false){
      this.setState({ isItOn: true });
      //this.state.isItOn = true;
    }
    else {
      this.setState({isItOn: false});
      //this.state.isItOn = false;
    }
    var postData = {
      power: this.state.isItOn
    };
    var updates = {};
    updates['/posts/' + newPostKey] = postData;
    firebase.database().ref().update(updates)
  }


  render() {
    const { currentUser } = this.state;

    if (this.state.isItOn == false || this.state.isItOn == null) {
      button = <TouchableOpacity style ={styles.myButton} onPress = {() => this.powerButton(this.state.isItOn)}/>;
    } else {
      button = <TouchableOpacity style ={styles.myButton2} onPress = {() => this.powerButton(this.state.isItOn)}/>;
    }

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
              {/*<TouchableOpacity style ={styles.myButton} onPress = {() => this.powerButton(this.state.isItOn)}>*/}
              {button}
              <View style = {styles.container}>
                <View style={{flexDirection:"row"}}>
                     {/*<View style={{flex:1}}>
                         <Text placeholder="Test" style={{justifyContent: 'flex-start',color:'black'}} >
                         T1
                         </Text>
                     </View>
                     <View style={{flex:1}}>
                         <Text placeholder="Test" style={{justifyContent: 'flex-end',color:'black'}} >
                         T2
                         </Text>
                     </View>*/}
                </View>
                <View style={{flexDirection:"row"}}>
                  <View style={{flexDirection:"col",marginRight:"15%"}}>
                    <Text style={{fontWeight:'bold'}}>Waste</Text>
                  </View>
                  <View style={{flexDirection:"col", marginLeft:"20%"}}>
                    <Text style={{fontWeight:'bold',marginBottom:"20%"}}>Battery</Text>
                    <AnimatedProgressWheel
                      size={80}
                      width={15}
                      progress={80}
                      animateFromValue={0}
                      duration={5000}
                      color={'white'}
                      fullColor={'red'}
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
    height: 300,
    width: 300,  //The Width must be the same as the height
    borderRadius:600, //Then Make the Border Radius twice the size of width or Height
    backgroundColor:'green',

  },
  myButton2:{
    padding: 5,
    height: 300,
    width: 300,  //The Width must be the same as the height
    borderRadius:600, //Then Make the Border Radius twice the size of width or Height
    backgroundColor:'red',

  }
})
