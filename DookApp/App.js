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
*/
// App.js
import React, { Component } from 'react'
import Main from './app/Main';
import DateTimePicker from "react-native-modal-datetime-picker";
import { View,
        Text,
        StyleSheet,
        Button,
        TouchableOpacity,
        Image,
        Alert
       } from 'react-native';

const readyToServeText = 'Press button to Activate'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { count: 0,
     isDateTimePickerVisible: false
   };
  }


  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  handleDatePicked = date => {
    console.log("A date has been picked: ", date);
    this.hideDateTimePicker();
  };

  onPress = () => {
    this.setState({
      count: this.state.count+1
    })
  }

  render() {
    return(
      <View >
        <Main />
        <View style = {styles.daCenterer}>
          <Text style={styles.serveText}>{readyToServeText}</Text>
        </View>
        <View style = {styles.container}>
          <TouchableOpacity style={styles.myButton} onPress={() => Alert.alert('Dook is not connected')}>
            <Image
             //Show image from you project directory like below
             source={require('./assets/reduced.png')}
             //Image Style
             style={styles.ImageIconStyle}
            />
          </TouchableOpacity>
        </View>
        <View style = {styles.padder}>
        <View style = {styles.scheduleButton}>
          <Button
            title="Set Schedule"
            color="#fff"
            onPress={this.showDateTimePicker}
            //onPress={() => Alert.alert('set schedule')}
          />
          </View>
          <DateTimePicker
            mode = "time"
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this.handleDatePicked}
            onCancel={this.hideDateTimePicker}
          />
          <Text style={styles.serveText}>Total Charge Left: %</Text>
          <Text style={styles.serveText}>Is it full?: </Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    marginTop: 150,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  myButton:{
    padding: 5,
    height: 200,
    width: 200,  //The Width must be the same as the height
    borderRadius:400, //Then Make the Border Radius twice the size of width or Height
    backgroundColor:'#64a70b',
  },
  ImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 180,
    width: 180,
    resizeMode: 'stretch',
  },
  serveText: {
    color: 'gray',
    fontSize: 25,
    fontWeight: '500',
  },
  daCenterer: {
    marginTop:60,
    alignItems: 'center',
  },
  padder:{
    marginTop:180,
    alignItems: 'center',
  },
  scheduleButton:{
    backgroundColor:'#64a70b'
  }
});
