import * as React from 'react'
import { AuthSession, WebBrowser, Constants } from 'expo'
import { Text, View, TouchableOpacity, Alert, StyleSheet, ImageBackground, Linking, } from 'react-native'

async function logIn() {
  
}
const auth0ClientId = 'xTnZz0tK0K3EslBH72Wfdb4BrZ9Wm_oF'
const auth0Domain = 'https://sunseeker.eu.auth0.com'
export const redirect_uri = `${Constants.linkingUri}/redirect`
const toQueryString = (params: any) => {
  return '?' + Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
}

namespace Login {
  export interface Props {
    onLoginSuccess: (user: any) => void
  }
}
export default class Login extends React.Component<Login.Props, any> {
  constructor(props:any) {
    super(props)
    const { onLoginSuccess } = this.props
    this.state = {result: null}
    // this.loginWithAuth0()
  }

  loginWithAuth0 = async () => {
    const redirectUrl = AuthSession.getRedirectUrl();
    console.log(`Redirect URL (add this to Auth0): ${redirectUrl}`);
    const result = await AuthSession.startAsync({
      authUrl: `${auth0Domain}/authorize` + toQueryString({
        client_id: auth0ClientId,
        response_type: 'code',
        scope: 'openid name',
        redirect_uri: redirectUrl,
      }),
    });

    console.log(result);
    if (result.type === 'success') {
      this.handleParams(result.params);
    }
  }
  handleParams = (responseObj: any) => {
    if (responseObj.error) {
      Alert.alert('Error', responseObj.error_description
        || 'something went wrong while logging in');
      return;
    }
    this.setState({result: responseObj})
    const encodedToken = responseObj.id_token;
    
    
  }
  render() {
    this.loginWithAuth0()
    return (
      <ImageBackground source={require('./loginBackground.png')} style={{width: '100%', flex: 1}}>
        <View style={{ position: 'absolute', bottom: 100, width: '100%', alignItems: 'center', justifyContent: 'flex-end'}}>
          <Text>{JSON.stringify(this.state.result)}</Text>
          <TouchableOpacity onPress={() => logIn()} style={styles.loginButton}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 17
  },
  loginButton: {
    backgroundColor: 'white',
    width: 220,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center'
  },
})