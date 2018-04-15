import * as React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
namespace Plant {
  export interface Props{
    name?: string
    uri?: string
    shared?: boolean
    onPress?: () => void
  }
}
const size = 90
export default class Plant extends React.Component<Plant.Props, any> {
  render(){
    setTimeout(()=>{this.setState({a: 1})}, 1000)
    const {name, uri, onPress, shared} = this.props
    return name || uri ? (
       
        <View style={styles.container}>
          <TouchableOpacity style={styles.pictureContainer} onPress={onPress}>
            <Image
              style={styles.picture}
              source={{uri}}
            />
          </TouchableOpacity>
          {shared ? <View style={styles.shared}><Ionicons name='ios-person' size={15} color='#ffffff' /></View> : null}
          <Text
            style={styles.name}
            numberOfLines={2}
          >
            {name}
          </Text>
        </View>
      
    ) : (
      
        <View style={styles.container}>
          <TouchableOpacity onPress={onPress}> 
            <View style={styles.add}>
              <Ionicons name='ios-add' size={45} color='#97D9DB' />
            </View>
          </TouchableOpacity> 
          <Text style={styles.name}>{name}</Text>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  shared: {
    position: 'absolute',
    top: 0,
    left: size/10,
    borderWidth: 1,
    borderColor: '#26405A',
    backgroundColor: '#F98D91',
    height: 20,
    width: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  name: {
    color: '#122C49',
    textAlign: 'center',
    marginTop: 8
  },
  pictureContainer: {
    backgroundColor: '#26405A',
    borderRadius: size/2,
    borderWidth: 2,
    borderColor: '#26405A',
  },
  picture: {
    height: size,
    width: size,
    borderRadius: size/2,
  },
  add: {
    height: size,
    width: size,
    borderRadius: size/2,
    borderWidth: 2,
    borderColor: '#26405A',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: size+size/6,
    height: size+size/4,
    margin: size/6,
    alignItems: 'center',
  },
})
