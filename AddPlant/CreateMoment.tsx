import * as React from 'react'
import { Mutation } from 'react-apollo'
import {View} from 'react-native'
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
    const {userId} = this.props
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
          return <View/>
        }}
      </Mutation>
    ) 
  }
}