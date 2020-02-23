import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, AsyncStorage } from 'react-native';
import api from '../services/api';

import logo from '../assets/logo.png';

export default function Login({ navigation }) {

    const [email, setEmail] = useState('');
    const [references, setReferences] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            if (user) {
                navigation.navigate('List');
            }
        });
    }, [])

    async function handleSubmit() {
        const response = await api.post('/sessions', {
            email,
        });

        const { _id } = response.data;

        if (_id) {
            await AsyncStorage.setItem('user', _id);
            await AsyncStorage.setItem('references', references);

            navigation.navigate('List');
        } else {
            navigation.navigate('New');
        }


        console.log(_id);



    }


    return <KeyboardAvoidingView behavior="padding" style={styles.container}>

        <Image source={logo} />

        <View style={styles.form}>
            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
                placeholder="Seu@e-mail.aqui"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                onChangeText={text => setEmail(text)}
            />

            <Text style={styles.label}>Senha</Text>
            <TextInput
                style={styles.input}
                placeholder="Seu@e-mail.aqui"
                placeholderTextColor="#999"
                autoCapitalize="words"
                autoCorrect={false}
                value={references}
                onChangeText={text => setReferences(text)}
            />

            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Encontrar um Spot</Text>
            </TouchableOpacity>
        </View>


    </KeyboardAvoidingView>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30,
    },
    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 50,
        marginBottom: 20,
        borderRadius: 2,

    },
    button: {
        height: 42,
        backgroundColor: '#8B3694',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,

    },
    buttonText: {
        color: '#fff',
        fontWeight: "bold",
        fontSize: 20,
    }

})