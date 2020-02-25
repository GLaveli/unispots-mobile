import React, { useEffect, useState } from 'react';
import { withNavigation } from 'react-navigation';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

import api from '../services/api';

function SpotList({ reference, navigation }) {
    const [spots, setSpots] = useState([]);

    useEffect(() => {
        async function loadSpots() {
            const response = await api.get('/spots', {
                params: { reference }
            })

            setSpots(response.data);

        }
        loadSpots();
    }, []);

    function handleNavigation(id) {
        navigation.navigate('Book', { id });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Spots proximos a: <Text style={styles.bold}>{reference} ({spots.length})</Text> </Text>

            <FlatList
                style={styles.list}
                data={spots}
                keyExtractor={spot => spot._id}
                horizontal
                showsHorizontalScrollIndicator={true}
                renderItem={({ item }) => (
                    <View style={styles.listItem}>
                        <Image style={styles.thumbnail} source={{ uri: item.thumbnail_url }} />
                        <Text style={styles.SpotType}>{item.type}</Text>
                        <Text style={styles.valor}>{item.valor ? `R$${item.valor}` : `R$: Não informado`}</Text>
                        <TouchableOpacity onPress={() => handleNavigation(item._id)} style={styles.button}>
                            <Text style={styles.buttonText}>Ver {item.type}</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>

    )

}

const styles = StyleSheet.create({

    container: {
        marginTop: 30,
    },
    title: {
        fontSize: 20,
        color: "#444",
        paddingHorizontal: 20,
        marginBottom: 15,
    },
    bold: {
        fontWeight: "bold",
        fontSize: 25,
        color: "#757"
    },
    list: {
        paddingHorizontal: 20,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },
    listItem: {
        marginRight: 25,

    },
    thumbnail: {
        width: 200,
        height: 120,
        resizeMode: "cover",
        borderRadius: 5,
    },
    SpotType: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
        marginTop: 10,
    },
    valor: {
        fontSize: 15,
        color: "#999",
        marginTop: 5,
    },
    button: {
        height: 32,
        backgroundColor: "#8B3694",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        marginTop: 15,
        marginBottom: 15,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 15,
    }
});

export default withNavigation(SpotList);