import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Image, TextInput, Button, TouchableOpacity, BackHandler, Alert } from 'react-native';
import { View } from 'native-base';
import { Link, useHistory } from 'react-router-native';
import { useDispatch, useSelector } from 'react-redux';
import { accountLogin } from './redux/store';

BackHandler.addEventListener('hardwareBackPress', function () {
  return true;
})


export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const account = useSelector(state => state.account.account);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!!account) {
      history.push('/dashboard');
    }
  }, [account]);



  const onSubmit = () => {
    dispatch(accountLogin({ email, password }));
  }

  return (

    <View style={styles.container}>

      <Image style={styles.image} source={require("../assets/food_icon.png")} />
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          value={email}
          onChangeText={(email) => setEmail(email)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          value={password}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <TouchableOpacity>
        <Link style={styles.forgot_button} to="/remind-password">
          <Text style={styles.forgot_button}>Forgot Password?</Text>
        </Link>
      </TouchableOpacity>

      <TouchableOpacity onPress={onSubmit}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Link style={styles.create_button} to="/create-account">
          <Text style={styles.create_button}>Don't have an account? Create one!</Text>
        </Link>
      </TouchableOpacity>

    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%"
  },

  image: {
    marginBottom: 40,
    width: 80,
    height: 80,
  },

  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,

    alignItems: "center",
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 0,
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
    color: "grey",
    backgroundColor: "white",
    borderRadius: 55,
  },

  loginBtn: {
    width: 300,
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FF1493",

  },

  create_button: {
    height: 30,
    marginBottom: 30,
    color: "grey",
    backgroundColor: "white",
    borderRadius: 55,
  },

});

// export default class App extends React.Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Image source={require("./assets/food_icon.png")} />
//       </View>
//     );
//   }
// }


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   image: {
//     marginBottom: 40
//   }
// });
