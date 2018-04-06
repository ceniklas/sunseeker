import * as React from 'react'
import { AuthSession, WebBrowser, Constants } from 'expo'
import { Text, View, TouchableOpacity, Alert, StyleSheet, ImageBackground, Linking, } from 'react-native'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const background = require('./loginBackground.png')
async function logIn() {
  
}
const auth0ClientId = 'xTnZz0tK0K3EslBH72Wfdb4BrZ9Wm_oF'
const auth0Domain = 'https://sunseeker.eu.auth0.com'

export const redirect_uri = `${Constants.linkingUri}/redirect`

const CREATE_USER = gql`
mutation createUser($idToken: String!) {
  createUser(authProvider:{auth0:{idToken: $idToken}}){
    auth0UserId
  }
}
`

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
  private _token: string
  constructor(props:any) {
    super(props)
    const { onLoginSuccess } = this.props
    this.state = {token: null}
  }
  loginWithAuth0 = async () => {
    const redirectUrl = AuthSession.getRedirectUrl()
    console.log(`Redirect URL (add this to Auth0): ${redirectUrl}`)
    const result = await AuthSession.startAsync({
      authUrl: `${auth0Domain}/authorize` + toQueryString({
        client_id: auth0ClientId,
        response_type: 'token',
        scope: 'openid name',
        redirect_uri: redirectUrl,
      }),
    });

    if (result.type === 'success') {
      return this.handleParams(result.params);
    }
  }
  handleParams = (responseObj: any) => {
    if (responseObj.error) {
      Alert.alert('Error', responseObj.error_description
        || 'something went wrong while logging in');
      return;
    }
    const encodedToken = responseObj.id_token
    return encodedToken
  }
  render() {
    return (
      <ImageBackground source={background} style={{width: '100%', flex: 1}}>
        <Mutation 
          mutation={CREATE_USER} 
          onCompleted={data => this.props.onLoginSuccess(this._token)}
          onError={error => this.props.onLoginSuccess(this._token)}>
          {(createPlant, {error, data}) => {
            const login = async () => {
              this._token = await this.loginWithAuth0()
              createPlant({variables: {idToken: this._token}})
            }
            return (
              <View style={{ position: 'absolute', bottom: 100, width: '100%', alignItems: 'center', justifyContent: 'flex-end'}}>
                <TouchableOpacity onPress={() => login()} style={styles.loginButton}>
                  <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
              </View>
            )
          }}
        </Mutation>
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