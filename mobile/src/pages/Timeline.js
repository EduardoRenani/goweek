import React, { Component } from 'react';

import { View, StyleSheet } from 'react-native';

// import styles from './styles';

export default class Timeline extends Component {
  render() {
    return <View style={styles.container}/>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  }
});
