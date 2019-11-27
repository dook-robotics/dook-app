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
import React, {Component} from 'react'
import { StyleSheet, Platform, Image, View,TouchableOpacity, TextInput, Alert,TouchableWithoutFeedback } from 'react-native'
import { Container, Header, Content, Button, Icon,Text, Body, Title, Right, Left,Tabs , Footer, FooterTab, ListItem, Spinner} from 'native-base';
import * as firebase from 'firebase';
import AnimatedProgressWheel from 'react-native-progress-wheel';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import {Helmet} from "react-helmet";
import ProgressiveImage from 'react-progressive-image';
import AwesomeButton from "react-native-really-awesome-button";



export default class Main extends React.Component {

  state = {
      currentUser: null,
      isItOn: null,
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
    this.setState({ isItOn: true });
    //this.props.navigation.navigate('Running')
    //this.props.navigation.navigate('Running')
    //this.state.isItOn = true;

    var postData = {
      power: this.state.isItOn
    };
    var updates = {};
    updates['/posts/' + newPostKey] = postData;
    firebase.database().ref().update(updates)
  }

  powerButton2 = (temp) => {
    var db = firebase.database();
    var newPostKey = firebase.database().ref().child('posts').push().key;
    this.setState({ isItOn: false });
    //this.props.navigation.navigate('Running')
    //this.props.navigation.navigate('Running')
    //this.state.isItOn = true;

    var postData = {
      power: this.state.isItOn
    };
    var updates = {};
    updates['/posts/' + newPostKey] = postData;
    firebase.database().ref().update(updates)
  }

  postDate(){
    var db = firebase.database();
    var newPostKey = firebase.database().ref().child('posts').push().key;
    var postData = {
      power: this.state.isItOn
    };
    var updates = {};
    updates['/posts/' + newPostKey] = postData;
    firebase.database().ref().update(updates)
  }


  RunningButton(){
    var db = firebase.database();
    var ref = db.ref("voltage");
    ref.orderByChild("height").on("child_added", function(snapshot) {
      console.log(snapshot.key + " was " + snapshot.val().height + " meters tall");
    });
    if(this.state.isItOn == false || this.state.isItOn == null){
      return(
        <Container>
          <View >
          <Header style = {styles.colorz}>
            <Body style={{marginLeft:"35%"}}>
              <Image
                style={{width: 200, height: 50}}
                source={require('../assets/dook2.png')}
              />
            </Body>
          </Header>
          <View style = {styles.container}>
            <TouchableOpacity style ={styles.myButton} onPress = {() => this.setState({ isItOn: true })}/>
            {/*this.RunningButton()*/}
            <View style = {styles.container}>
              <View style={{flexDirection:"row"}}>
              </View>
              <View style={{flexDirection:"row"}}>
                <View style={{flexDirection:"col",marginRight:"15%"}}>
                  <Text style={{fontWeight:'bold',marginBottom:"20%",textAlign:"center"}}>Waste</Text>
                  <AnimatedProgressWheel
                    size={120}
                    width={25}
                    progress={100}
                    animateFromValue={0}
                    duration={5000}
                    color={'#daa520'}
                    fullColor={'#8b4513'}
                    />
                </View>
                <View style={{flexDirection:"col", marginLeft:"15%"}}>
                  <Text style={{fontWeight:'bold',marginBottom:"20%",textAlign:"center"}}>Battery</Text>
                    <AnimatedProgressWheel
                      size={120}
                      width={25}
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
          <View style={{marginTop:"40%"}}>
          <Footer>
            <FooterTab>
              <Button onPress={() => this.props.navigation.navigate('Settings')}>
                <Text>Settings</Text>
              </Button>
              <Button active>
                <Text >Home</Text>
              </Button>
              <Button onPress={() => this.props.navigation.navigate('Scheduler')}>
                <Text>Schedule</Text>
              </Button>
            </FooterTab>
          </Footer>
          </View>
        </Container>
      )
    }
    else{
      return(
      <Container style = {styles.container2}>
        <Content>
          <Spinner color='white' />
          <Button onPress={() => this.setState({ isItOn: false })}>
            <Text>Stop Dook</Text>
          </Button>
        </Content>
      </Container>
      )
    }
  }

  render() {
    const { currentUser } = this.state;

    return (
      <Container style={{flex:1}}>
        {this.RunningButton()}
        {this.postDate()}
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
  container2: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
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
