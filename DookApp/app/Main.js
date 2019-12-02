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
import { StyleSheet, Platform, Image, View,TouchableOpacity, TextInput, Alert,TouchableWithoutFeedback, Animated, Easing } from 'react-native'
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
      powerLevel: 32
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
    firebase.database().ref('PowerButton/').on('value',(data)=>{
      console.log(data.toJSON())
    })
    this.setState({ isItOn: true });
  }

  powerButton2 = (temp) => {
    this.setState({ isItOn: false });

  }

  postDate(){
    var db = firebase.database();
    var newPostKey = firebase.database().ref().child('posts').push().key;
    var postData = {
      power: this.state.isItOn
    };
    firebase.database().ref('/PowerButton/Machine/').update(postData)
  }

  powerPercentage(){
    //get firebase JSON tree
    //Max voltage is 43.5... Let us make this at 43
    //voltage warning of 31
    //if voltage > 43 then we good to run
    //Don't let user run if less than 31.... So check if less than 31
    //GotVoltage - 31
    //this.setState({powerLevel:30});
    if(this.state.powerLevel < 31){
      return(
        <Container>
          <View >
            <Header style = {styles.colorz}>
              <Body style={{marginLeft:"5%"}}>
                <Image
                  style={{width: 200, height: 50, alignItems:'center'}}
                  source={require('../assets/dookie.png')}
                />
              </Body>
            </Header>
          </View>
          <View>
            <Body style={{marginLeft:"35%"}}>
              <Image
                style={{width: 200, height: 400,alignItems: 'center', marginRight:'50%',marginTop:'30%' }}
                source={require('../assets/Batteries.png')}
              />
            </Body>
            <View>
              <Text style={{textAlign: 'center',color:'black', marginTop:'130%'}}>Battery is low</Text>
              <Text style={{textAlign: 'center',color:'black', marginTop:'3%'}}>Please charge now</Text>
            </View>
            <View style={{marginTop:'34%'}}>
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
          </View>
        </Container>
      )
    }

  }

  RunningButton(){
    var db = firebase.database();
    var ref = db.ref("voltage");
    ref.orderByChild("height").on("child_added", function(snapshot) {
      console.log(snapshot.key + " was " + snapshot.val().height + " meters tall");
    });


    //-----------------------------------------------------------------------------------------------
    if((this.state.isItOn == false || this.state.isItOn == null) && this.state.powerLevel > 31){
      return(
        <Container>
          <View >
          <Header style = {styles.colorz}>
            <Body style={{marginLeft:"5%"}}>
              <Image
                style={{width: 200, height: 50, alignItems:'center'}}
                source={require('../assets/dookie.png')}
              />
            </Body>
          </Header>
          <Text style={{textAlign: 'center',color:'#a39f9e', marginTop:20 }}>Ready to clean</Text>
          <Text style={{textAlign: 'center',color:'#a39f9e', marginTop:2 }}>Press clean to start</Text>
          <View style = {styles.container}>
            <TouchableOpacity style ={styles.myButton} onPress = {() => this.setState({ isItOn: true })}>
              <Image
                style={{marginTop:'25%',width:400, height: 200,  resizeMode: 'stretch', marginRight:'80%'}}
                source={require('../assets/clean.png')}
              />
            </TouchableOpacity>
            <View style = {styles.container}>
              <View style={{flexDirection:"row"}}>
              </View>
              <View style={{flexDirection:"row"}}>
                <View style={{flexDirection:"col",marginRight:"15%"}}>
                  <Text style={{fontWeight:'bold',marginBottom:"20%",textAlign:"center"}}>Waste</Text>
                  <AnimatedProgressWheel
                    size={120}
                    width={25}
                    progress={this.state.powerLevel}
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
          <View>
            <Image
            style={{width: 500, height: 150, alignItems:'center',resizeMode:'stretch',opacity: 0.2}}
            source={require('../assets/landscape.png')}
            />
          </View>
          <View >
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
    //-----------------------------------------------------------------------------------------------
    if(this.state.isItOn == true && this.state.powerLevel > 31){
      return(
        <Container>
          <View >
          <Header style = {styles.colorz}>
            <Body style={{marginLeft:"5%"}}>
              <Image
                style={{width: 200, height: 50, alignItems:'center'}}
                source={require('../assets/dookie.png')}
              />
            </Body>
          </Header>
          <Text style={{textAlign: 'center',color:'#a39f9e', marginTop:20 }}>Now running for 30 minutes</Text>
          <Text style={{textAlign: 'center',color:'#a39f9e', marginTop:2 }}>Press button to force stop</Text>
          <View style = {styles.container}>
            <TouchableOpacity style ={styles.myButton3} onPress = {() => this.setState({ isItOn: false })}>
              <Image
                style={{marginTop:'25%',width:400, height: 200,  resizeMode: 'stretch', marginRight:'80%'}}
                source={require('../assets/clean.png')}
              />
            </TouchableOpacity>
            <View style = {styles.container}>
              <View style={{flexDirection:"row"}}>
              </View>
              <View style={{flexDirection:"row"}}>
                <View style={{flexDirection:"col",marginRight:"15%"}}>
                  <Text style={{fontWeight:'bold',marginBottom:"20%",textAlign:"center"}}>Waste</Text>
                  <AnimatedProgressWheel
                    size={120}
                    width={25}
                    progress={this.state.powerLevel}
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
          <View>
            <Image
            style={{width: 500, height: 150, alignItems:'center',resizeMode:'stretch',opacity: 0.2}}
            source={require('../assets/landscape.png')}
            />
          </View>
          <View >
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
  }

  render() {
    const { currentUser } = this.state;
    return (
      <Container style={{flex:1,justifyContent: 'center'}}>
        {this.powerPercentage()}
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
    marginTop: 30
  },
  container2: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    marginTop: 50
  },
  colorz: {
    backgroundColor:'green',
    textAlign:'center',
    height: 75
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
    backgroundColor:'white',

  },
  myButton3:{
    padding: 5,
    height: 300,
    width: 300,  //The Width must be the same as the height
    borderRadius:600, //Then Make the Border Radius twice the size of width or Height
    backgroundColor:'red'

  },
})
