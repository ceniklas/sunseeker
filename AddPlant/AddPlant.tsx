import TakePicture from './TakePicutre';
import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export default class AddPlant extends React.Component<any, any> {

  render() {
    const {navigation: {state: {params: {userId}}}} = this.props
    return (
        <TakePicture/>
      )
    }
}

