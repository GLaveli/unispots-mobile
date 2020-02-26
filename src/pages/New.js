import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, KeyboardAvoidingView, AsyncStorage, ScrollView, Alert } from 'react-native';

import api from '../services/api';

import logo from '../assets/logo.png';

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [referencias, setReferencias] = useState('');

    useEffect(() => {

    }, []);

    async function handleSubmit() {
        /*
                const response = await api.post('sessions', {
                    email
                });
        
                const { _id } = response.data
        
                await AsyncStorage.setItem('user', _id);
                await AsyncStorage.setItem('referencias', referencias.toUpperCase());
        
                navigation.navigate('List');
                */
        Alert.alert('Te Amo!');
    }

    function handleCancel() {
        navigation.navigate('Login');
    }

    return (< KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Image style={styles.logo} source={logo} />
        <Text style={styles.labelLogo}>Parece que você é novo por aqui!</Text>

        <ScrollView>
            <View style={styles.form}>
                <Text style={styles.label}>Nome completo</Text>
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
                <Text style={styles.label}>Email</Text>
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
                <Text style={styles.label}>Telefone (contato)</Text>
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
                <Text style={styles.label}>Senha</Text>
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
                <Text style={styles.label}>Estudante?</Text>
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
                <Text style={styles.label}>Curso</Text>
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
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Registrar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.buttonCancel]} onPress={handleCancel}>
                    <Text style={[styles.buttonText, styles.TextCancel]}>Voltar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    </ KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",

    },
    logo: {
        height: 50,
        resizeMode: "contain",
        alignSelf: "center",
        marginTop: 50,
    },
    form: {
        alignSelf: "stretch",
        paddingHorizontal: 30,

    },
    labelLogo: {
        fontSize: 20,
        alignSelf: "center",
        fontWeight: "bold",
        color: '#444',
        marginBottom: 35,
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
        marginBottom: 15,

    },
    buttonText: {
        color: '#fff',
        fontWeight: "bold",
        fontSize: 20,
    },
    buttonCancel: {
        backgroundColor: '#ccc',
    },
});