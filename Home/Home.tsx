import { UserContext } from '../App';
import PlantList from './PlantList'
import Plant from './Plant'
import PlantClass from '../Classes/Plant'
import * as React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import firebase from 'firebase'
import { Chance } from 'chance'
import gql from 'graphql-tag'
import { Query, Mutation } from 'react-apollo'

const GET_PLANTS = gql`
  query getPlants($auth0UserId: String, $userId: ID){
    User(auth0UserId: $auth0UserId, id: $userId) {
      id
      auth0UserId
      plants{
        id
        name
        public
        sharedUsers{
          id
        }
        moments{
          imageUri
          description
          tags
        }
      }
    }
  }
`


namespace Home {
  export interface State {
    plants:PlantClass[]
  }
}
export default class Home extends React.Component<any, Home.State> {
  constructor(props: any) {
    super(props);
    this.state = { plants: [] }
  }

  render() {
    const plants: PlantClass[] = []
    const {navigation: {state: {params}}} = this.props
    return (
      <UserContext.Consumer>
        {({user}) => {
          const variables =  (params && params.userId) ? {userId: params.userId} : {auth0UserId: user.sub}
          return (
          <Query query={GET_PLANTS} variables={variables}>
            {({ loading, error, data }) => {
              if (loading) {
                return <Text>Loading...</Text>
              }
              if(data && data.User) {
                plants.splice(0, plants.length)
                data.User.plants
                .filter((plant: any) => data.User.auth0UserId !== user.sub ? plant.public : true)
                .map((plant: any) => {
                  plants.push(new PlantClass(plant))
                })
              }
              return (
                <PlantList
                  addButton={data.User.auth0UserId !== user.sub ? false : true} 
                  plants={plants} 
                  addPlant={() => this.props.navigation.push('AddPlant', {userId: data.User.id})} 
                  onSelect={(plantId)=>{ this.props.navigation.push('PlantProfile', {plantId}) }}/>
              )
            }}
          </Query>
                )
              }}
      </UserContext.Consumer>
      
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