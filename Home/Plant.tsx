import * as React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
namespace Plant {
  export interface Props{
    name: string
    uri: string
  }
}
export default class Plant extends React.Component<Plant.Props, any> {
  render(){
    const {name, uri} = this.props
    return (
      <View style={styles.container}>
        <Image
          style={styles.picture}
          source={{uri}}
        />
        <Text style={styles.name}>{name}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  name: {
    color: '#122C49'
  },
  picture: {
    height: 80,
    width: 80,
    backgroundColor: '#97D9DB',
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#122C49'
  },
  container: {
    alignItems: 'center',
  },
})