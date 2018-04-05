import * as React from 'react'
import {View, Text} from 'react-native'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { Camera, Permissions } from 'expo'

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
export default class AddPlant extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {hasCameraPermission: false}
  }
  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }
  render() {
    const {navigation: {state: {params: {userId}}}} = this.props
    if (!this.state.hasCameraPermission) {
      return <Text>Waiting for camera permission</Text>;
    }
    return (
      <Mutation mutation={CREATE_PLANT} refetchQueries={() => ['getPlants']}>
        {(createPlant, {data: plantData}) => {
          const addPlant = () => {
            createPlant({variables: { 
              name: 'Pedro', 
              moments: [{description: 'Plant created! Hurray!'}],
              userId: userId
            }})
          }
          return (
            <Camera style={{ flex: 1 }}/>
            )
      }}
    </Mutation>
      )
    }
}