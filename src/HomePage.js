import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, } from 'react-native';
import { Container } from 'native-base';
import { Link, useHistory } from 'react-router-native';
import { accountAuthorize } from './redux/store';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomePage() {
    const dispatch = useDispatch();

    const isUserLoggedIn = useSelector(state => !!state.account.account);

    const history = useHistory();

    useEffect(() => {
        dispatch(accountAuthorize());
    }, [dispatch])

    const onBeginClick = () => {
        if (isUserLoggedIn) {
            history.push('/dashboard');
        } else {
            history.push('/login');
        }
    }


    return (
        <Container style={styles.container}>
            <LinearGradient colors={['#D0A38A', '#B5C99A']} style={styles.container}>
                {/* <Image style={styles.image} source={require("../assets/food_icon.png")} /> */}
                <StatusBar style="auto" />

                <Image source={require("../assets/giphy.gif")} style={{ width: "60%", height: "30%" }} />

                <Text style={{ textAlignVertical: "center", textAlign: "center", fontWeight: "bold", fontSize: 20 }} >
                    Welcome! 👋
                </Text>

                <Text style={{ textAlignVertical: "center", textAlign: "center", }} >
                    Monitor Your food easier
                </Text>

                <TouchableOpacity style={styles.createBtn} onPress={onBeginClick}>
                    <Text style={styles.loginText}>LET'S BEGIN!</Text>
                </TouchableOpacity>

            </LinearGradient >
        </Container >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },

    loginText: {
        color: "black",
        fontWeight: "bold",
    },

    image: {
        marginBottom: 100,
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
        marginLeft: 20,
    },

    forgot_button: {
        height: 30,
        marginBottom: 30,
    },

    loginBtn: {
        width: "100%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#264653",

    },
    linearGradient: {
        flex: 1,
        height: '100%',
        width: '100%',
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
