import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, Pressable, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
const ip='192.168.80.34'
const { width, height } = Dimensions.get('window');

const Notifications = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const userData = await AsyncStorage.getItem('userData');
                const userdata = JSON.parse(userData);
                const id = userdata.carteID;
                const response = await fetch(`http://${ip}:5000/user/amount`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id }),
                });
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setOrders(data.notifications);
            } catch (error) {
                console.error('Failed to fetch orders:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

   

    const renderItem = ({ item }) => (
        <View style={styles.row}>
            <Text style={styles.cell}>{item.message}</Text>
            <Text style={styles.cell}>{item.date}</Text>
        </View>
    );


    if (loading) {
        return <Text>Loading...</Text>;
    }

    return (
        <ScrollView>
            <View style={styles.containers}>
                <Text style={styles.text0}>Your Notifications</Text>
               
                {orders.length === 0 ? (
                    <Text style={styles.text2}>No Notifications found.</Text>
                ) : (
                    <FlatList
                        data={orders}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    containers: {
        padding: 16,
        alignItems: 'center',
        backgroundColor: '#c1ddf5',
        height: height,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        width: '100%',
    },
    cell: {
        flex: 1,
        textAlign: 'center',
    },
    text0: {
        fontFamily: 'Georgia',
        fontSize: 30,
        marginTop: 50,
        marginBottom: 20,
        color: '#15023d',
    },
    press1: {
        width: width * 0.7,
        height: height * 0.06,
        borderColor: 'black',
        borderWidth: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    view0: {
        marginBottom: 30,
    },
    text1: {
        fontFamily: 'Georgia',
        fontSize: 25,
        color: 'black',
    },
    text2:{
        fontSize:20,
        color:'black'
    }
});

export default Notifications;
