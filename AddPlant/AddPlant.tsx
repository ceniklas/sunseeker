import { uploadFile } from './UploadImage';
import TakePicture from './TakePicutre'
import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import CreateMoment from './CreateMoment'
import {Mutation} from 'react-apollo'
import gql from 'graphql-tag'

namespace AddPlant {
  export interface Props {
    navigation?: any
  }
  export interface State {
    takePicture: boolean
    loading: boolean
    url: string
  }
}
const CREATE_PLANT = gql`
mutation createNewPlant($moments: [PlantmomentsMoment!], $name: String!, $userId: ID!) {
  createPlant(moments: $moments, name: $name, userId: $userId) {
    id
    moments {
      id
    }
  }
}
`
export default class AddPlant extends React.Component<AddPlant.Props, AddPlant.State> {
  constructor(props: AddPlant.Props) {
    super(props)
    this.state = {takePicture: true, loading: false, url: ''}
  }
  render() {
    return (
    <Mutation mutation={CREATE_PLANT} refetchQueries={() => ['getPlants']}>
    {(createPlant, {data: plantData}) => {
      const createPlantWithMoment = (url: string, id: string) => {
        createPlant({
          variables: { 
            name: 'Pedro', 
            moments: [{description: 'Plant created! Hurray!', imageUri: url}],
            userId: id,
            }
          }
        )
      }
      const {navigation: {state: {params: {userId}}}} = this.props
      const pictureTaken = async (picture: any) => {
        let now = new Date().getTime()
        this.setState({takePicture: false, loading: true})
        const url = await uploadFile('data:image/jpg;base64,' + picture.base64, `${userId}${now}`)
        await createPlantWithMoment(url, userId)
        console.log(url)
        this.setState({loading: false, url})
      }
      let component
      if (this.state.takePicture) {
        component = <TakePicture onPictureTaken={pictureTaken} />
      } else if(this.state.loading){
        component = <Text>Uploading image</Text>
      } else {
        component = <Text>Plant added</Text>
      }
      return component
      }
    }
    </Mutation>
    )
  }
}

