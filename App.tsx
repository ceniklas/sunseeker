import Schedule from './Schedule/Schedule'
import Add from './Add/Add'
import Settings from './Settings/Settings'
import Home from './Home/Home'
import Login from './Login'
import * as React from 'react'
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import { TabNavigator, TabBarBottom, StackNavigator } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'

export default class App extends React.Component<{}> {
  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar barStyle="light-content" /> 
        <Login/>
      </View>
    )
  }
}

const TNavigator = TabNavigator({
  Home: { screen: Home },
  Settings: { screen: Settings },
  Add: { screen: Add },
  Schedule: { screen: Schedule }
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
      }else if (routeName === 'Schedule') {
        iconName = `ios-calendar${focused ? '' : '-outline'}`
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