/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
// import type { Node } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import MyPage from './src/Listpage/listPage'
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

class App extends Component {

  render() {
    return (
      <View style={styles.container}>
         <StatusBar  />

        <MyPage />

      </View>
    );
  }
}

// class App extends React.Component {
//   render() {
//     return (
//       <View></View>
//     );
//   }
// }


const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});


export default App;


