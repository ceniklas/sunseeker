import { UserContext } from '../App';
import * as React from 'react';
import gql from 'graphql-tag'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { Query } from 'react-apollo'

const GET_FRIENDS = gql`
query getFriends($auth0UserId: String!){
  User(auth0UserId: $auth0UserId) {
    id
    friends {
      id
      nickname
    }
  }
}
`

export default class Schedule extends React.Component<any> {
  render(){
    let listData: any[] = []
    return (
      <UserContext.Consumer>
        {({user}) => {
          return(
            <Query query={GET_FRIENDS} variables={{auth0UserId: user.sub}}>
              {({data, loading}) => {
                if (loading) {
                  return <Text>Loading...</Text>
                }
                if (!data || !data.User || !data.User.friends) {
                  return <Text>You haven't added any friends yet :(</Text>
                }
                // listData = data.User.friends.map((friend: any) => ({...friend, key: friend.nickname}))
                listData.splice(0, listData.length)
                for(let friend of data.User.friends) {
                  listData.push({key: friend.nickname, ...friend})
                }
                return (
                  <FlatList data={listData} renderItem={({item}) => {
                    return (
                      <TouchableOpacity onPress={() => this.props.navigation.push('Friend', {userId: item.id})}>
                        <View style={styles.friendContainer}>
                          <Text>{item.nickname}</Text>
                        </View>
                      </TouchableOpacity>
                    )
                  }}/>
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
  friendContainer: {
    height: 30,
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingLeft: 10
  },
})