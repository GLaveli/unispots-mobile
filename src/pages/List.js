import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, AsyncStorage, SafeAreaView, Platform } from 'react-native';

import logo from '../assets/logo.png';


export default function List() {
    const [references, setReferences] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('references').then(storageReferences => {
            const referencesArray = storageReferences.split(',').map(ref => ref.trim());

            setReferences(referencesArray);
        })
    })

    return (
        <SafeAreaView style={Styles.droidSafeArea}>
            <Image style={Styles.logo} source={logo} />
        </ SafeAreaView>
    )
}

const Styles = StyleSheet.create({
    droidSafeArea: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 45 : 0
    },
    container: {
        flex: 1,
    },
    logo: {
        height: 40,
        resizeMode: "contain",
        alignSelf: "center",
        marginTop: 10,
    }
})