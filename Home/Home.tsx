import Plant from './Plant';
import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native'
interface IPlant {
  id: number
  name: string
  uri: string
}
const plants: IPlant[] = [
  {id: 0, name: 'Charlie', uri: 'https://flowermag.com/wp-content/uploads/2017/08/dahlia.jpg'},
  {id: 1, name: 'Charlie', uri: 'https://flowermag.com/wp-content/uploads/2017/08/dahlia.jpg'},
  {id: 2, name: 'Charlie', uri: 'https://flowermag.com/wp-content/uploads/2017/08/dahlia.jpg'},
  {id: 3, name: 'Charlie', uri: 'https://flowermag.com/wp-content/uploads/2017/08/dahlia.jpg'},
  {id: 4, name: 'Charlie', uri: 'https://flowermag.com/wp-content/uploads/2017/08/dahlia.jpg'},
]

export default class Home extends React.Component<{}> {
  render(){
    return (
      <View style={styles.container}>
        {plants.map(plant => (<Plant key={plant.id} name={plant.name} uri={plant.uri}/>))}
        <Text>Home</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
})