import Friends from './Friends/Friends'
import Add from './Add/Add'
import Settings from './Settings/Settings'
import Home from './Home/Home'
import Login from './Login'
import * as React from 'react'
import { StyleSheet, Text, View, StatusBar, YellowBox, AsyncStorage } from 'react-native'
import { TabNavigator, TabBarBottom, StackNavigator } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'
import PlantProfile from './PlantProfile/PlantProfile'
import jwtDecode from 'jwt-decode'

const client = new ApolloClient({
  // By default, this client will send queries to the
  //  `/graphql` endpoint on the same host
  // Pass the configuration option { uri: YOUR_GRAPHQL_API_URL } to the `HttpLink` to connect
  // to a different host
  link: new HttpLink({ uri: 'https://api.graph.cool/simple/v1/cjfjy3vcr0xqh0150dzseahxh' }),
  cache: new InMemoryCache(),
})

YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
  'Warning: componentWillReceiveProps',
  'Warning: componentWillUpdate is deprecated',
  'Module RCTImageLoader requires',
  'Setting a timer',
])

export const UserContext = React.createContext<any>()

export default class App extends React.Component<{}, any> {
  private async checkToken() {
    try {
      const token = await AsyncStorage.getItem('token')
      this.setState({token: token ? token : null, loading: false})
    } catch (error) {
      this.setState({token: null, loading: false})
    }
  }
  private async saveToken(token: string) {
    try {
      await AsyncStorage.setItem('token', token)
      this.setState({token: token})
    } catch (error) {
      this.setState({token: token})
    }
  }
  private async logOut() {
    try {
      await AsyncStorage.removeItem('token')
      this.setState({token: null})
    } catch (error) {
      this.setState({token: null})
    }
  }
  constructor(props: any) {
    super(props)
    this.state = {token: null, loading: true}
    this.checkToken()
  }
  render() {
    const providerValue = {
      token: this.state.token,
      user: this.state.token ? jwtDecode(this.state.token) : null,
      logOut: () => this.logOut()
    }
    const {loading, token} = this.state
    let content
    if (loading) {
      content  = <Text>loading</Text>
    } else if (!token) {
      content = <Login onLoginSuccess={token => this.saveToken( token )} />
    } else {
      content = <SNavigator/>
    }
    return (
      <UserContext.Provider value={providerValue}>
        <View style={{flex: 1}}>
          <StatusBar barStyle="light-content" />
            <ApolloProvider client={client}>
              {content}
            </ApolloProvider>
        </View>
      </UserContext.Provider>
    )
  }
}

const TNavigator = TabNavigator({
  Home: { 
    screen: Home
  },
  Add: { screen: Add },
  Friends: { screen: Friends },
  Settings: { screen: Settings },
}, {
  navigationOptions: ({ navigation }) => ({
    headerTitle: navigation.state.routeName,
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state
      let iconName = ''
      if (routeName === 'Home') {
        iconName = `ios-information-circle${focused ? '' : '-outline'}`
      } else if (routeName === 'Settings') {
        iconName = `ios-options${focused ? '' : '-outline'}`
      } else if (routeName === 'Add') {
        iconName = `ios-add-circle${focused ? '' : '-outline'}`
      }else if (routeName === 'Friends') {
        iconName = `ios-walk${focused ? '' : '-outline'}`
      }
      return iconName.length ? <Ionicons name={iconName} size={25} color={tintColor || ''} /> : null
    },
  }),
  tabBarOptions: {
    activeTintColor: '#40C29B',
    inactiveTintColor: '#67798C',
  },
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom',
  animationEnabled: false,
  swipeEnabled: true,
})
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
const SNavigator = StackNavigator({
  Home: {
    screen: TNavigator,
 },
 PlantProfile: {
   screen: PlantProfile
  },
  Friend: {
    screen: Home
  }
}, {
  navigationOptions: ({navigation}) => ({ 
    headerStyle: {
      backgroundColor: '#40C19A'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    }
  })
})