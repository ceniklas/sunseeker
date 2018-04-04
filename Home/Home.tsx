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
  query getPlants($auth0UserId: String!){
    User(auth0UserId: $auth0UserId) {
      id
      plants{
        id
        name
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

namespace Home {
  export interface State {
    plants:PlantClass[]
  }
}
export default class Home extends React.Component<{}, Home.State> {
  constructor(props: any) {
    super(props);
    this.state = { plants: [] }
  }

  render() {
    const plants: PlantClass[] = []
    return (
      <UserContext.Consumer>
        {({user}) => {
          return(
          <Query query={GET_PLANTS} variables={{auth0UserId: user.sub}}>
              {({ loading, error, data }) => {
                if(data && data.User) {
                  plants.splice(0, plants.length)
                  data.User.plants.map((plant: any) => {
                    plants.push(new PlantClass(plant))
                  })
                }
                return (
                  <Mutation mutation={CREATE_PLANT} refetchQueries={() => ['getPlants']}>
                    {(createPlant, {data: plantData}) => {
                      console.log(plantData)
                      const addPlant = () => {
                        createPlant({variables: { 
                          name: 'Pedro', 
                          moments: [{description: 'Plant created! Hurray!'}],
                          userId: data.User.id
                        }})
                      }
                      return (
                        <PlantList plants={plants} addPlant={addPlant} onSelect={()=>{ /**/ }}/>
                      )
                    }}
                  </Mutation>
                )
              }}
            
          </Query>
        )}}
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