import * as React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { auth } from 'firebase'

export default class Settings extends React.Component<{}> {
  signOut = () => {
    auth().signOut();
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.signOut()}>
          <Text>Log out</Text>
        </TouchableOpacity>
      </View>
    )
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