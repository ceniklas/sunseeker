import * as React from 'react';
import { Mutation } from 'react-apollo'
import {View, Text} from 'react-native'
import gql from 'graphql-tag'

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
export default class CreateMoment extends React.Component<any, any> {
  render() {
    const {userId, url} = this.props
    return (
      <Mutation mutation={CREATE_PLANT} refetchQueries={() => ['getPlants']}>
        {(createPlant, {data: plantData}) => {
          createPlant({variables: { 
            name: 'Pedro', 
            moments: [{description: 'Plant created! Hurray!'}],
            userId: userId,
            imageUri: url
          }})
          return <View><Text>Plant added!</Text></View>
        }}
      </Mutation>
    ) 
  }
}