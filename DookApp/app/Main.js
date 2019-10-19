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
// app/Main.js
// after all imports
//<Header title={headerTitle} />

import React from 'react';
import Header from './components/Header';
import { StyleSheet, Text, View, Button, Image } from 'react-native';

const headerTitle = '';

// after status bar, replace the <Text> with
export default class Main extends React.Component {
  render() {
    return (
      <View style={styles.centered}>
        <Header title ={headerTitle} />
        <Image
         //Show image from you project directory like below
         source={require('../assets/dook_header.png')}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  centered: {
    backgroundColor: '#64a70b',
    alignItems: 'center'
  }
});
