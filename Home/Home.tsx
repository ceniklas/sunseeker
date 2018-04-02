import Plant from './Plant';
import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native'
import firebase from 'firebase';

interface IPlant {
  id: number
  name: string
  uri: string
  shared?: boolean
}

export default class Home extends React.Component<{}> {
  state: any = { plants: {} }

  constructor(props) {
    super(props);

    const userId = firebase.auth().currentUser.uid
    const ref = firebase.database().ref(`/${userId}/plants`)
    ref.on('value', plants => this.setState({ plants: plants.val() }))
  }

  addPlant = () => {
    const userId = firebase.auth().currentUser.uid
    const ref = firebase.database().ref(`/${userId}/plants`)
    const res = ref.push(
    {
      name: 'Petrus',
    })

    const ref2 = firebase.database().ref(`/${userId}/plants/${res.key}/images`)
    const res2 = ref2.push(
    {
      uri: "https://i.imgur.com/ijtflEi.png"
    })
  }

  render() {
    const plants = []
    for (let prop in this.state.plants) {
      const plant = this.state.plants[prop]
      plants.push(<Plant key={plant.id} name={plant.name} uri={plant.images[Object.keys(plant.images)[0]].uri} shared={plant.shared}/>)
    }
    return (
      this.state.plants !== [] ? 
      <View style={styles.container}>
        {plants} 
        <Plant onPress={() => this.addPlant()}/>
      </View> 
      : 
      <View style={styles.containerLoading}/>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#fff',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  containerLoading: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    alignItems: 'center',
  }
})