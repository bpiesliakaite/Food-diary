import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, } from 'react-native';
import { Link } from 'react-router-native';


export default function PasswordReminderForm() {
    const [email, setEmail] = useState("");
    

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require("../assets/food_icon.png")} />
            <StatusBar style="auto" />
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Email"
                    placeholderTextColor="#003f5c"
                    onChangeText={(email) => setEmail(email)}
                />
            </View>

            <TouchableOpacity>
                <Link style={styles.login_button} to="/login">
                    <Text style={styles.login_button}>Go back to login page</Text>
                </Link>
            </TouchableOpacity>

            <TouchableOpacity style={styles.createBtn}>
                <Text style={styles.loginText}>SEND A PASSWORD REMINDER</Text>
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

