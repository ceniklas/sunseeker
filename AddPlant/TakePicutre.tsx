import * as React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {View, Text, StyleSheet} from 'react-native'
import { Camera, Permissions, CameraObject } from 'expo'
import { Mutation } from 'react-apollo'

export default class TakePicture extends React.Component<any, any> {
  private _camera: any
  constructor(props: any) {
    super(props)
    this.state = {hasCameraPermission: false}
  }
  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }
  render() {
    
    if (!this.state.hasCameraPermission) {
      return <Text>Waiting for camera permission</Text>;
    }
    
    const snap = async () => {let picture = await this._camera.takePictureAsync()}
    return (
      <Camera style={styles.camera} ref={(ref: any) => { this._camera = ref }}>
        <View style={styles.snapButtonContainer}>
          <MaterialIcons onPress={snap} name={'camera'} size={55} color={'#40C19A'}/>
        </View>
      </Camera>
      )
    }
}
const styles = StyleSheet.create({
  camera: {
    flex: 1
  },
  snapButtonContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
})