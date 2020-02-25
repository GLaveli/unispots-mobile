import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView, TouchableOpacity, ScrollView, Image, StyleSheet, AsyncStorage } from 'react-native';

import SpotList from '../components/SpotList';

import logo from '../assets/logo.png';

export default function List({ navigation }) {
    const [referencias, setReferencias] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('referencias').then(storagereferencias => {
            const referenciasArray = storagereferencias.split(',').map(refs => refs.trim());
            setReferencias(referenciasArray);
        })
    }, []);

    async function handleLogout() {

        await AsyncStorage.setItem('user', '');
        await AsyncStorage.setItem('referencias', '');

        navigation.navigate('Login');
    }

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} source={logo} />



            <ScrollView>
                {referencias.map(refs => <SpotList key={refs} reference={refs} />)}
            </ScrollView>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleLogout}>
                <Text style={styles.buttonText}>Sair</Text>
            </TouchableOpacity>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    logo: {
        height: 50,
        resizeMode: "contain",
        alignSelf: "center",
        marginTop: 50,
    },
    button: {
        height: 42,
        backgroundColor: '#c22d19',
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