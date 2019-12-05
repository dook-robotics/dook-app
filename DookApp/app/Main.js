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
import { Container, Header, Content, Button, Icon,Text, Body, Title, Right, Left,Tabs , Footer, FooterTab, ListItem} from 'native-base';
import * as firebase from 'firebase';
import AnimatedProgressWheel from 'react-native-progress-wheel';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import {Helmet} from "react-helmet";
import ProgressiveImage from 'react-progressive-image';
//import AwesomeButton from "react-native-really-awesome-button";

var flag=false;

export default class Main extends React.Component {
  constructor() {
      super()
      this.state = {
          reservas: [],
          currentUser: null,
          isItOn: 0,
          weight: 0,
          time:'',
      }
  }


//  state = {
  //    currentUser: null,
//      isItOn: null,
  //    powerLevel: 34
    //}

  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
    const readDookData = ()=> {
      const piRef =  firebase.database().ref('Pi')
      piRef.on('value', (snapshot)=> {
        const state = snapshot.val()
        this.setState({reservas:state}) })
  }
  readDookData();
  if(flag == true){
    var postData = {
      Power: true
    };
    firebase.database().ref('/Pi/').update(postData)
  }
//  var hours = new Date().getHours(); //Current Hours
//  var min = new Date().getMinutes(); //Current Minutes
//  this.setState({
    //Setting the value of the date time
//    time:
//      hours + ':' + min,
  //});
  }


  signOutUser = () => {
    firebase.auth().signOut().then(function (user){
    }).catch(function(error) {
      console.log(error)
    });
  }

  loadCellReset(){
    this.setState({isItOn:0})

    var postData = {
      loadCell: -1
    };
    firebase.database().ref('/Pi/').update(postData)

  }

  powerButton = (temp) => {
    firebase.database().ref('/Pi/Power/').on('value',(data)=>{
      console.log(data.toJSON())
    })
    this.setState({ isItOn: 1 });
    flag = true;
    var postData = {
      Power: true
    };
    firebase.database().ref('/Pi/').update(postData)
  }

  powerButton2 = (temp) => {
    firebase.database().ref('/Pi/Power/').on('value',(data)=>{
      console.log(data.toJSON())
    })
    flag = false;
    this.setState({ isItOn: 0 });
    var postData = {
      Power: false
    };
    firebase.database().ref('/Pi/').update(postData)

  }

  postPowerStatus(){
    if(flag == true){
      flag = false
    }
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
    if(this.state.reservas.Voltage <= 34){
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
              </FooterTab>
            </Footer>
            </View>
          </View>
        </Container>
      )
    }
  }


  itIsFullHomie(){
    //((this.state.reservas.loadCell) * 100)/300 < 100
    if(((this.state.reservas.loadCell) * 100)/300 >= 100){
      flag = true;
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
                style={{width: 320, height: 400,alignItems: 'center', marginRight:'50%',marginTop:'30%',resizeMode:'stretch' }}
                source={require('../assets/waste.jpg')}
              />
            </Body>
            <View>
              <Text style={{textAlign: 'center',color:'black', marginTop:'130%'}}>Dook is full</Text>
              <Text style={{textAlign: 'center',color:'black', marginTop:'3%'}}>Please empty out now</Text>
              <Button  onPress={() => this.loadCellReset()} ><Text style={{textAlign: 'center', marginLeft:'24%'}}>Press Me When Emptied</Text></Button>
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
              </FooterTab>
            </Footer>
            </View>
          </View>
        </Container>
      )
    }
  }




  RunningButton(){
    if(this.state.reservas == {}){
      return(
        <Container>
          <Text>No connection to internet</Text>
        </Container>
      )
    }
    if (this.state.reservas.loadCell == -1 || this.state.reservas.loadCell == 0 ) {
      percent = <Text style={{ marginTop:'5%',fontSize: 20, color: 'black'}}>Dook is currently empty</Text>;
    } else {
      percent = <Text style={{ marginTop:'5%',fontSize: 20, color: 'black'}}>{parseInt(((this.state.reservas.loadCell) * 100)/300,10)}% full</Text>;
    }
    //-----------------------------------------------------------------------------------------------
    // && this.state.reservas.Power == false might be needed
    if((this.state.isItOn == false || this.state.isItOn == null) && this.state.reservas.Voltage > 34 && ((this.state.reservas.loadCell) * 100)/300 < 100 ){
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
          <View>
            <TouchableOpacity style ={styles.myButton}  onPress = {() => this.setState({ isItOn: 1 })}>
            <Image
              style={styles.Clean}
              source={require('../assets/clean2.png')}
            />
            </TouchableOpacity>

           </View>
            <View style = {styles.container}>
              <View style={{flexDirection:"row"}}>
              </View>
              <View style={{flexDirection:"row"}}>
                <View style={{flexDirection:"col",marginRight:"15%"}}>
                  <Text style={{fontWeight:'bold',marginBottom:"20%",textAlign:"center"}}>Waste</Text>
                  <AnimatedProgressWheel
                    size={120}
                    width={25}
                    progress={((this.state.reservas.loadCell) * 100)/300}
                    animateFromValue={0}
                    duration={5000}
                    color={'#daa520'}
                    fullColor={'#8b4513'}
                    />
                    {/*<Text style={{ fontSize: 25, color: 'black'}}>{parseInt(((this.state.reservas.loadCell) * 100)/300,10)}% full</Text>*/}
                </View>
                <View style={{flexDirection:"col", marginLeft:"15%"}}>
                  <Text style={{fontWeight:'bold',marginBottom:"20%",textAlign:"center"}}>Battery</Text>
                    <AnimatedProgressWheel
                      size={120}
                      width={25}
                      progress={((this.state.reservas.Voltage)-31)*10}
                      animateFromValue={0}
                      duration={5000}
                      color={'red'}
                      fullColor={'green'}
                      />
                </View>
              </View>
              <Text style={{ marginTop:'5%',fontSize: 20, color: 'black'}}>{parseInt(((this.state.reservas.Voltage)-31)*10,10)}% battery life remaining</Text>
              {percent}
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
              {
              /*<Button onPress={() => this.props.navigation.navigate('Scheduler')}>
                <Text>Schedule</Text>
              </Button>*/
            }
            </FooterTab>
          </Footer>
          </View>
        </Container>
      )
    }
    //-----------------------------------------------------------------------------------------------
    // if Pi still is not on and button is pressed
//    if (this.state.isItOn == true && this.state.reservas.Power == false){
      //Show a "Dook is powering on page"
//      return(
//        <Container style ={{backgroundColor:'green'}}>
//          <Text> Dook is powering on</Text>
//        </Container>
//      )
//    }

    //&& this.state.reservas.Power == true  would also be needed
    //-----------------------------------------------------------------------------------------------
    if(this.state.isItOn == true && this.state.reservas.Voltage > 34 && ((this.state.reservas.loadCell) * 100)/300 < 100){
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
          <Text style={{textAlign: 'center',color:'#a39f9e', marginTop:20 }}>Dook is now running</Text>
          <Text style={{textAlign: 'center',color:'#a39f9e', marginTop:2 }}>Press button to force stop</Text>
          <View style = {styles.container}>
            <View>
            <TouchableOpacity style ={styles.myButton3} onPress = {() => this.setState({ isItOn: 0 })}>
            <Image
              style={styles.Clean2}
              source={require('../assets/Stop.png')}
            />
            </TouchableOpacity>
            </View>
            <View style = {styles.container}>
              <View style={{flexDirection:"row"}}>
              </View>
              <View style={{flexDirection:"row"}}>
                <View style={{flexDirection:"col",marginRight:"15%"}}>
                  <Text style={{fontWeight:'bold',marginBottom:"20%",textAlign:"center"}}>Waste</Text>
                  <AnimatedProgressWheel
                    size={120}
                    width={25}
                    progress={((this.state.reservas.loadCell) * 100)/300}
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
                      progress={((this.state.reservas.Voltage)-31)*10}
                      animateFromValue={0}
                      duration={5000}
                      color={'red'}
                      fullColor={'green'}
                      />
                </View>
              </View>
              <Text style={{ marginTop:'5%',fontSize: 20, color: 'black'}}>{parseInt(((this.state.reservas.Voltage)-31)*10,10)}% battery life remaining</Text>
              {percent}
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
        {console.log(this.state.reservas)}
        {console.log(this.state.reservas.Voltage)}
        {console.log(this.state.weight)}
        {this.powerPercentage()}
        {this.itIsFullHomie()}
        {this.RunningButton()}
        {this.postPowerStatus()}
      </Container>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    position:'relative'

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
    backgroundColor:'green',
    justifyContent:'center',
    alignItems:'center'

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
  Clean:{
    width: 350,
    height: 200,
    marginTop: '18%',
    position: 'absolute',
    justifyContent:'center',
    alignItems:'center',
    resizeMode: 'center',

  },
  Clean2:{
    width: 320,
    height: 200,
    marginTop: '18%',
    position: 'absolute',
    justifyContent:'center',
    alignItems:'center',
    resizeMode: 'center',

  }
})
