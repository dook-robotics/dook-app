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
// app/components/Header.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
const Header = ({ title }) => (
  <View style={styles.headerContainer}>
    <Text style={styles.headerText}>{title.toUpperCase()}</Text>
  </View>
);
const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 60
  },
  headerText: {
    color: 'white',
    fontSize: 25,
    fontWeight: '500'
  }
});
export default Header;
