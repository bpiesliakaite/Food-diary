import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Image, TextInput, Button, TouchableOpacity, BackHandler, Alert, } from 'react-native';
import { View } from 'native-base';
import { Link, useHistory } from 'react-router-native';
import { useDispatch, useSelector } from 'react-redux';
import { accountLogin } from './redux/store';
import { LinearGradient } from 'expo-linear-gradient';

BackHandler.addEventListener('hardwareBackPress', function () {
  return true;
})


export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const account = useSelector(state => state.account.account);
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const loginError = useSelector(state => state.account.loginError);

  useEffect(() => {
    if (!!account) {
      history.push('/dashboard');
    }
  }, [account]);

  const onSubmit = () => {
    dispatch(accountLogin({ email, password }));
    const errors = {};
    let hasErrors = false;

    if (!email) {
      hasErrors = true;
      errors.email = 'Enter email value';
    }
    if (!password) {
      hasErrors = true;
      errors.password = 'Enter password value';
    }
    if (hasErrors) {
      setErrors(errors);
    } else {
      dispatch(accountLogin({ email, password }))
    }
  }

  useEffect(() => {
    setErrors({});
  }, []);

  return (

    <View style={styles.container}>
      <LinearGradient colors={['#D0A38A', '#B5C99A']} style={styles.container}>

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
          {errors.email ? <Text style={{ color: 'red', fontSize: 9 }}>{errors.email}</Text> : null}
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
          {errors.password ? <Text style={{ color: 'red', fontSize: 9 }}>{errors.password}</Text> : null}
        </View>
        {loginError ? <Text style={{ color: 'red', fontSize: 9, paddingBottom: 20 }}>{loginError}</Text> : null}

        {/* <TouchableOpacity> */}
        <Link component={TouchableOpacity} style={styles.create_button} to="/create-account">
          <Text style={styles.create_button}>Don't have an account? Create one!</Text>
        </Link>
        {/* </TouchableOpacity> */}

        <TouchableOpacity style={styles.createBtn} onPress={onSubmit}>
          <Text style={color = "white"}>LOGIN</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity style={styles.createBtn} onPress={onSubmit}>
        <Text style={styles.loginText}>CREATE AN ACCOUNT</Text>
      </TouchableOpacity> */}


      </LinearGradient>
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
    backgroundColor: "#FFFCF7",
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
    color: "#264653",
    borderRadius: 55,

  },

  createBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#E07A5F",
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

