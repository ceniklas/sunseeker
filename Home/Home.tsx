import Plant from './Plant';
import PlantClass from '../Classes/Plant'
import * as React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import firebase from 'firebase';
import { Chance } from 'chance';

namespace Home {
  export interface State {
    plants:PlantClass[]
  }
}
export default class Home extends React.Component<{}, Home.State> {
  constructor(props) {
    super(props);
    this.state = { plants: [] }
    
    this.fetchPlantData()
  }

  fetchPlantData = () => {
    const userId = firebase.auth().currentUser.uid
    const ref = firebase.database().ref(`/${userId}/plants`)
    ref.on('value', plants => {
      if(!plants) {
        return
      }
      const plantData: PlantClass[] = []
      const plantObject = plants.val()
      for (let item in plantObject) {
        plantData.push(new PlantClass({...plantObject[item], id: item}))
      }
      this.setState({ plants: plantData })
    })
  }

  addPlant = () => {
    const name = new Chance().name_prefix() + " " + new Chance().animal() + " " + new Chance().name_suffix()
    const userId = firebase.auth().currentUser.uid
    const ref = firebase.database().ref(`/${userId}/plants`)
    const res = ref.push(
    {
      name
    })

    const ref2 = firebase.database().ref(`/${userId}/plants/${res.key}/images`)
    const res2 = ref2.push(
    {
      uri: "https://i.imgur.com/ijtflEi.png"
    })
  }

  render() {
    return (
      this.state.plants !== [] ? 
      <ScrollView>
        <View style={styles.container}> 
          {this.state.plants.map(plant => (<Plant key={plant.id} name={plant.name} uri={plant.coverPhotoUri} shared={plant.shared}/>))}
          <Plant onPress={() => this.addPlant()}/>
        </View> 
      </ScrollView>
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