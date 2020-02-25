import React, { useState } from 'react';
import { View, Image, Alert, Text, TextInput, StyleSheet, SafeAreaView, TouchableOpacity, AsyncStorage } from 'react-native';

import api from '../services/api';

import logo from '../assets/messageLogo.png';

export default function Book({ navigation }) {
    const [date, setDate] = useState('');
    const id = navigation.getParam('id');




    async function handleSubmit() {

        const user_id = await AsyncStorage.getItem('user');

        console.log("id Storage: " + id + " idUser: " + user_id);
        await api.post(`/spots/${id}/bookings`, {
            date
        }, {
            headers: { user_id }
        })

        Alert.alert('Enviado! \n Agora é só aguardar');

        navigation.navigate('List');
    }

    function handleCancel() {
        navigation.navigate('List');
    }

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} source={logo} />
            <Text style={styles.logoLabel}>Enviar uma mensagem ao proprietario</Text>


            <Text style={styles.label}>Enviar uma mensagem ao proprietario</Text>
            <TextInput
                style={styles.input}
                placeholder="ex: gostaria ver a casa no dia 24 de setembro as 16:00h, pode ser ?"
                placeholderTextColor="#999"
                autoCapitalize="words"
                autoCorrect={false}
                value={date}
                onChangeText={setDate}
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Solicitar reserva!</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
                <Text style={styles.buttonText}>Voltar aos Spots!</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 20,
    },
    logo: {
        height: 70,
        resizeMode: "contain",
        alignSelf: "center",
        marginTop: 50,
    },
    logoLabel: {
        alignSelf: "center",
        fontWeight: "bold",
        color: '#444',
        marginBottom: 50,
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
    cancelButton: {
        backgroundColor: '#ccc',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: "bold",
        fontSize: 20,
    },
});