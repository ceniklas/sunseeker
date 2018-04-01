import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default class Schedule extends React.Component<{}> {
  render(){
    return <View style={styles.container}><Text>Schedule</Text></View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})