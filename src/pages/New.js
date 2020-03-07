import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, KeyboardAvoidingView, AsyncStorage, ScrollView, Alert } from 'react-native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';


import api from '../services/api';

import logo from '../assets/logo.png';

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [course, setCourse] = useState('');
    const [tell, setTell] = useState('');
    const [password, setPassWord] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    //Itens referente a icones e estados especificos de campos
    const [secureEntry, setSecureEntry] = useState(true);
    const [passwordView, setPasswordView] = useState('eye');


    let a = React.createRef();

    useEffect(() => {

        AsyncStorage.getItem('userEmail').then(uEmail => {
            setEmail(uEmail);
        });
    }, []);

    function onIconPress() {

        if (passwordView === "eye") {
            setPasswordView("eye-off");
            setSecureEntry(false);
        } else {
            setPasswordView("eye");
            setSecureEntry(true);
        }

    }

    async function handleSubmit() {
        //validation
        if (name.length < 3 || name.length === '') {
            Alert.alert("O campo Nome \nprecisa de no minimo 3 digitos");
        }
        else if (email.length < 4 || email.length === '') {
            Alert.alert("O campo Senha \nprecisa de no minimo 4 digitos");
        }
        else if (tell.length < 11 || tell.length === '') {
            Alert.alert("O campo Telefone \nPrecisa ser valido!");
        }
        else if (password.length < 4 || password.length === '') {
            Alert.alert("O campo Senha \nprecisa de no minimo 4 digitos");
        }
        else if (password != confirmPassword) {
            Alert.alert("Os campos Senha e Confirmar Senha\nSão diferentes");
        }


    }

    async function handleCancel() {
        await AsyncStorage.setItem('user', '');
        await AsyncStorage.setItem('referencias', '');
        await AsyncStorage.setItem('userEmail', '');

        navigation.navigate('Login');
    }

    return (< KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Image style={styles.logo} source={logo} />
        <Text style={styles.labelLogo}>Parece que você é novo por aqui!</Text>
        <Text style={styles.subLabelLogo}>Tendo um cadastro podem entrar em contato com você.</Text>

        <ScrollView>
            <View style={styles.form}>
                <Text style={styles.label}>Nome completo*</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Guilherme Laveli"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={name}
                    onChangeText={setName}
                    onSel
                />
                <Text style={styles.label}>Email*</Text>
                <TextInput
                    style={styles.input}
                    placeholder="seu@email.aqui"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={email}
                    onChangeText={setEmail}
                />
                <Text style={styles.label}>Telefone para contato*</Text>
                <TextInput
                    style={styles.input}
                    placeholder="(xx) x xxxx-xxxx"
                    placeholderTextColor="#999"
                    keyboardType="decimal-pad"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={tell}
                    onChangeText={setTell}
                />
                <Text style={styles.label}>Senha*</Text>
                <TextInput
                    style={styles.input}
                    placeholder="******"
                    placeholderTextColor="#999"
                    keyboardType="name-phone-pad"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={password}
                    onChangeText={setPassWord}
                    secureTextEntry={secureEntry}
                />

                <TouchableOpacity style={styles.passIcon} onPress={onIconPress}>
                    <Icon name={passwordView} style={styles.passIconText} />
                </TouchableOpacity>

                <Text style={styles.label}>Confirmar Senha*</Text>
                <TextInput
                    style={styles.input}
                    placeholder="******"
                    placeholderTextColor="#999"
                    keyboardType="name-phone-pad"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={true}
                    secureTextEntry={secureEntry}
                />
                <Text style={styles.label}>Curso (caso estudante) (opcional)</Text>
                <TextInput
                    style={styles.input}
                    placeholder="direito, medicina, estetica, sistemas"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={course}
                    onChangeText={setCourse}
                />

            </View>

            <View style={styles.form}>
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Registrar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.buttonCancel]} onPress={handleCancel}>
                    <Text style={[styles.buttonText, styles.TextCancel]}>Cancelar</Text>
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
        marginBottom: 4,
    },
    subLabelLogo: {
        fontSize: 15,
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
    passIcon: {
        position: "absolute",
        top: 310,
        right: 50,

    },
    passIconText: {
        fontSize: 24,
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