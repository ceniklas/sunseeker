import Friends from './Friends/Friends'
import Add from './Add/Add'
import Settings from './Settings/Settings'
import Home from './Home/Home'
import Login from './Login'
import * as React from 'react'
import { StyleSheet, Text, View, StatusBar, YellowBox } from 'react-native'
import { TabNavigator, TabBarBottom, StackNavigator } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'

YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
  'Warning: componentWillUpdate is deprecated',
  'Module RCTImageLoader requires',
  'Setting a timer',
])

export const UserContext = React.createContext<any>()

export default class App extends React.Component<{}> {
  state = { user: null }

  render() {
    const providerValue = {
      user: this.state.user,
      logOut: () => this.setState({user: null})
    }
    return (
      <UserContext.Provider value={providerValue}>
        <View style={{flex: 1}}>
          <StatusBar barStyle="light-content" />
          {this.state.user ? <SNavigator/> : <Login onLoginSuccess={user => this.setState({ user })} />}
        </View>
      </UserContext.Provider>
    )
  }
}

const TNavigator = TabNavigator({
  Home: { screen: Home },
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
    navigationOptions: { 
      title: 'Header title', 
      headerStyle: {
        backgroundColor: '#40C19A'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      }
    }
 }
})