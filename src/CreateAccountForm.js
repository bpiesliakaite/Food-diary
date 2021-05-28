import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Modal, TouchableOpacity, } from 'react-native';
import { Link } from 'react-router-native';
import { useSelector, useDispatch } from 'react-redux';
import { accountRegister } from './redux/store';
import { LinearGradient } from 'expo-linear-gradient';


export default function CreateAccountForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errors, setErrors] = useState({});
  const registerError = useSelector(state => state.account.registerError);
  // const isOpen = useSelector(state => state.repeatPassword);

  const registered = useSelector(state => state.account.registered);
  const dispatch = useDispatch();
  const onSubmit = () => {
    console.log('pressed');
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
    if (!repeatPassword) {
      hasErrors = true;
      errors.repeatPassword = 'Enter Repeat Password value';
    }
    if (password !== repeatPassword) {
      hasErrors = true;
      errors.passwordMatching = 'Passwords do not match';
    }
    // if (password.length <= 6 || repeatPassword.length >= 6) {
    //   hasErrors = true;
    //   errors.passwordLenght = 'Password must contain at least 6 symbols'
    // }

    if (hasErrors) {
      setErrors(errors);
    } else {


      dispatch(accountRegister({ email, password }))

    }
  }
  errors.SuccessfullRegistration = 'Registration successfull! Please log in.';

  useEffect(() => {
    setErrors({});
  }, []);

  return (
    //<Modal visible={isOpen} onDismiss={onFormDismiss} transparent>
    <View style={styles.container}>
      <LinearGradient colors={['#FFFCF7', '#E4F0D0', '#81B29A', '#2A9D8F']} style={styles.container}>
        <Text>{registered}</Text>
        <Image style={styles.image} source={require("../assets/food_icon.png")} />
        <StatusBar style="auto" />
        <View style={styles.inputView}>
          {/* <View style={{ ...styles.inputView, borderColor: errors.email ? 'red' : 'transparent' }}> */}
          <TextInput
            style={styles.TextInput}
            placeholder="Email"
            placeholderTextColor="#003f5c"
            value={email}
            onChangeText={(email) => setEmail(email)}
          />
          {errors.email ? <Text style={{ color: 'red', fontSize: 9 }}>{errors.email}</Text> : null}
        </View >

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

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Repeat the password"
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            value={repeatPassword}
            onChangeText={(repeatPassword) => setRepeatPassword(repeatPassword)}
          />
          {errors.repeatPassword ? <Text style={{ color: 'red', fontSize: 9 }}>{errors.repeatPassword}</Text> : null}
        </View>
        {errors.passwordMatching ? <Text style={{ color: 'red', fontSize: 9, paddingBottom: 20 }}>{errors.passwordMatching}</Text> : null}
        {/* {errors.passwordLenght ? <Text style={{ color: 'red', fontSize: 9, paddingBottom: 20 }}>{errors.passwordLenght}</Text> : null} */}
        {registerError ? <Text style={{ color: registerError === 'Account successfully created' ? 'green' : 'red', fontSize: 9, paddingBottom: 20 }}>{registerError}</Text> : null}
        <Link component={TouchableOpacity} style={styles.create_button} to="/login">
          <Text style={styles.create_button}>I already have an account</Text>
        </Link>

        <TouchableOpacity style={styles.createBtn} onPress={onSubmit}>
          <Text style={styles.loginText}>CREATE AN ACCOUNT</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
    //</Modal >
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

  login_button: {
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
