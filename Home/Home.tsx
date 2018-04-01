import Plant from './Plant';
import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native'
interface IPlant {
  id: number
  name: string
  uri: string
  shared?: boolean
}
const plants: IPlant[] = [
  {id: 0, name: 'Charlie', uri: 'https://i.imgur.com/ijtflEi.png'},
  {id: 1, name: 'Steven', uri: 'https://i.imgur.com/ijtflEi.png', shared: true},
  {id: 2, name: 'Sven', uri: 'https://i.imgur.com/ijtflEi.png'},
  {id: 3, name: 'Torsken', uri: 'https://i.imgur.com/ijtflEi.png'},
  {id: 4, name: 'Laxen', uri: 'https://i.imgur.com/ijtflEi.png'},
]

export default class Home extends React.Component<{}> {
  render(){
    return (
      <View style={styles.container}>
        {plants.map(plant => (<Plant key={plant.id} name={plant.name} uri={plant.uri} shared={plant.shared}/>))}
        <Plant/>
      </View>
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
})