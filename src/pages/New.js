import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, KeyboardAvoidingView, AsyncStorage, ScrollView, Alert } from 'react-native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';


import api from '../services/api';

import logo from '../assets/logo.png';

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [course, setCourse] = useState('');
    const [cellPhone, setcellPhone] = useState('');
    const [passWord, setpassWord] = useState('');
    const [confirmpassWord, setConfirmpassWord] = useState('');

    //Itens referente a icones e estados especificos de campos
    const [secureEntry, setSecureEntry] = useState(true);
    const [passWordView, setpassWordView] = useState('eye');
    const [reviewText, setReviewText] = useState('Revelar Senha');

    useEffect(() => {
        AsyncStorage.getItem('userEmail').then(uEmail => {
            setEmail(uEmail);
        });
    }, []);

    function onIconPress() {

        if (passWordView === "eye") {
            setpassWordView("eye-off");
            setReviewText("Esconder Senha ");
            setSecureEntry(false);
        } else {
            setpassWordView("eye");
            setReviewText("Revelar Senha ");
            setSecureEntry(true);
        }

    }

    async function createUser() {

        const response = await api.post('create', {
            email,
            name,
            course,
            cellPhone,
            passWord
        });

        const { _id, message } = response.data

        if (message) {
            Alert.alert(response.data.message);
        } else {
            await AsyncStorage.setItem('user', _id);

            
            navigation.navigate('List');
        }
    }

    function handleSubmit() {
        //validation
        if (name.length < 3 || name.length === '') {
            Alert.alert("O campo Nome \nprecisa de no minimo 3 digitos");

        } else if (email.length < 4 || email.length === '') {
            Alert.alert("O campo Senha \nprecisa de no minimo 4 digitos");

        } else if (cellPhone.length < 11 || cellPhone.length === '') {
            Alert.alert("O campo Telefone \nPrecisa ser valido!");

        } else if (passWord.length < 4 || passWord.length === '') {
            Alert.alert("O campo Senha \nprecisa de no minimo 4 digitos");

        } else if (passWord != confirmpassWord) {
            Alert.alert("Os campos Senha e Confirmar Senha\nSão diferentes");

        } else {
            createUser();
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
        <Text style={styles.labelLogo}>Facilite</Text>
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
                    value={cellPhone}
                    onChangeText={setcellPhone}
                />
                <Text style={styles.label}>Senha*</Text>
                <TextInput
                    style={styles.input}
                    placeholder="******"
                    placeholderTextColor="#999"
                    keyboardType="name-phone-pad"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={passWord}
                    onChangeText={setpassWord}
                    secureTextEntry={secureEntry}
                />

                <TouchableOpacity style={styles.passIconbutton} onPress={onIconPress}>
                    <Text style={styles.passIconText}>{reviewText}</Text>
                    <Icon name={passWordView} style={styles.passIcon} />
                </TouchableOpacity>

                <Text style={styles.label}>Confirmar Senha*</Text>
                <TextInput
                    style={styles.input}
                    placeholder="******"
                    placeholderTextColor="#999"
                    keyboardType="name-phone-pad"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={confirmpassWord}
                    onChangeText={setConfirmpassWord}
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
    passIconbutton: {
        flexDirection: "row",
        position: "absolute",
        alignItems: "center",
        top: 356,
        right: 40,
        zIndex: 1

    },
    passIconText: {
        fontSize: 15,
        fontWeight: "bold"

    },
    passIcon: {
        fontSize: 24,
        color: "#8B3694"
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