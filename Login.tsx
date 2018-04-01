import * as React from 'react'
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import firebase from 'firebase';
import { Facebook } from 'expo';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDujWsYdKDZZ-zUdO_ZVzh5lf8aR9N-Jf8",
  authDomain: "sunseeker-firebase.firebaseapp.com",
  databaseURL: "https://sunseeker-firebase.firebaseio.com",
  projectId: "sunseeker-firebase",
  storageBucket: "sunseeker-firebase.appspot.com",
  messagingSenderId: "721552557682"
};

firebase.initializeApp(firebaseConfig);



async function logIn() {
  const { type, token } = await Facebook.logInWithReadPermissionsAsync(
    '2041975362707985',
    { permissions: ['public_profile'] },
  );

  if (type === 'success' && token) {
    // Build Firebase credential with the Facebook access token.
    const credential = firebase.auth.FacebookAuthProvider.credential(token);

    // Sign in with credential from the Facebook user.
    firebase.auth().signInWithCredential(credential).catch((error) => {
      console.error(error);
    });


    // Get the user's name using Facebook's Graph API
    const response = await fetch(
      `https://graph.facebook.com/me?access_token=${token}`
    );
    
    Alert.alert(
      'Logged in!',
      `Hi ${(await response.json()).name}!`,
    );
  }
}

namespace Login {
  export interface Props {
    onLoginSuccess: (user: any) => void
  }
}
export default class Login extends React.Component<Login.Props> {
  state = { isAuthenticated: 'darkred' }

  constructor(props:any) {
    super(props)
    const { onLoginSuccess } = this.props

    // Listen for authentication state to change.
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        this.setState({ isAuthenticated: 'green' })
        onLoginSuccess(user)
      }
    });
  }

  render() {
    return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: this.state.isAuthenticated }}>
      <TouchableOpacity onPress={() => logIn()}>
        <Text>Login breh</Text>
      </TouchableOpacity>
    </View>
  }
}