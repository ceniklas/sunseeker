import { uploadFile } from './UploadImage';
import TakePicture from './TakePicutre'
import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

namespace AddPlant {
  export interface Props {
    navigation?: any
  }
  export interface State {
    takePicture: boolean
  }
}
export default class AddPlant extends React.Component<AddPlant.Props, AddPlant.State> {
  constructor(props: AddPlant.Props) {
    super(props)
    this.state = {takePicture: true}
  }
  render() {
    const {navigation: {state: {params: {userId}}}} = this.props
    const pictureTaken = (picture: any) => {
      let now = new Date().getTime()
      uploadFile(picture.base64, `${userId}${now}`)
      this.setState({takePicture: false})
    }
    let component
    if (this.state.takePicture) {
      component = <TakePicture onPictureTaken={pictureTaken} />
    } else {
      component = "uploading"
    }
    return component
    }
}

