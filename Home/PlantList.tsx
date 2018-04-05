import Plant from './Plant';
import PlantClass from '../Classes/Plant'
import { ScrollView, StyleSheet } from 'react-native'
import * as React from 'react';
import {View} from 'react-native'

namespace PlantList {
  export interface Props {
    addPlant: () => void
    plants: PlantClass[]
    onSelect: (plantId: string) => void
    addButton: boolean
  }
}
export default class PlantList extends React.Component<PlantList.Props, any> {

  render() {
    const {plants, onSelect, addPlant, addButton} = this.props
    return (
      plants ? 
      <ScrollView>
        <View style={styles.container}> 
          {plants.map(plant => (<Plant key={plant.id} name={plant.name} uri={plant.coverPhotoUri} shared={plant.shared} onPress={() => onSelect(plant.id)}/>))}
          {addButton ? <Plant onPress={() => addPlant()}/> : null}
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