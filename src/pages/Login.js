import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, KeyboardAvoidingView, AsyncStorage } from 'react-native';

import api from '../services/api';

import logo from '../assets/logo.png';

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [referencias, setReferencias] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            if (user) {
                navigation.navigate('List');
            }
        });
    }, []);

    async function handleSubmit() {

        const response = await api.post('sessions', {
            email
        });

        const { _id } = response.data

        await AsyncStorage.setItem('user', _id);
        await AsyncStorage.setItem('referencias', referencias.toUpperCase());

        navigation.navigate('List');
    }

    return < KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Image source={logo} />

        <View style={styles.form}>
            <Text style={styles.label}>E-mail*</Text>
            <TextInput
                style={styles.input}
                placeholder="seu@emai.com.br"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                onChangeText={setEmail}
            />
        </View>

        <View style={styles.form}>
            <Text style={styles.label}>Referencias</Text>
            <TextInput
                style={styles.input}
                placeholder="ex: UFSC, UDESC, IFSC"
                placeholderTextColor="#999"
                autoCapitalize="words"
                autoCorrect={false}
                value={referencias}
                onChangeText={setReferencias}
            />

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Procurar!</Text>
            </TouchableOpacity>
        </View>
    </ KeyboardAvoidingView>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    form: {
        alignSelf: "stretch",
        paddingHorizontal: 30,

    },
    label: {
        fontWeight: "bold",
        color: '#444',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2,

    },
    button: {
        height: 42,
        backgroundColor: '#8B3694',
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 2,

    },
    buttonText: {
        color: '#fff',
        fontWeight: "bold",
        fontSize: 20,
    },
});