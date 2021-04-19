import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, } from 'react-native';
import { Link } from 'react-router-native';
import { useSelector, useDispatch } from 'react-redux';
import { accountRegister } from './redux/store';


export default function CreateAccountForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const registered = useSelector(state => state.account.registered);
  const dispatch = useDispatch();
  const onSubmit = () => {
    console.log('pressed');
    dispatch(accountRegister({ email, password }))
  }
  console.log(registered);

  return (
    <View style={styles.container}>
      <Text>{registered}</Text>
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

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Repeat the password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          value={repeatPassword}
          onChangeText={(repeatPassword) => setRepeatPassword(repeatPassword)}
        />
      </View>

      <TouchableOpacity>
        <Link style={styles.login_button} to="/login">
          <Text style={styles.login_button}>I already have an account</Text>
        </Link>
      </TouchableOpacity>



      <TouchableOpacity style={styles.createBtn} onPress={onSubmit}>
        <Text style={styles.loginText}>CREATE AN ACCOUNT</Text>
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
    padding: 0,
    marginLeft: 0,
  },

  login_button: {
    height: 30,
    marginBottom: 30,
    color: "grey",
    backgroundColor: "white",
    borderRadius: 55,
  },

  createBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FF1493",
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
