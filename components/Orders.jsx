import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

const ip = '192.168.80.34';
const { width, height } = Dimensions.get('window');

const Orders = () => {
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
                setOrders(data.order);
            } catch (error) {
                console.error('Failed to fetch orders:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const generatePDF = async () => {
        const html = `
            <h1>Your Orders</h1>
            <table style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr>
                        <th style="border: 1px solid #000; padding: 8px;">Name</th>
                        <th style="border: 1px solid #000; padding: 8px;">Price</th>
                        <th style="border: 1px solid #000; padding: 8px;">Date</th>
                        <th style="border: 1px solid #000; padding: 8px;">Status</th>
                    </tr>
                </thead>
                <tbody>
                    ${orders.map(order => `
                        <tr>
                            <td style="border: 1px solid #000; padding: 8px;">${order.name}</td>
                            <td style="border: 1px solid #000; padding: 8px;">${order.price} Dhs</td>
                            <td style="border: 1px solid #000; padding: 8px;">${order.date}</td>
                            <td style="border: 1px solid #000; padding: 8px;">${order.status}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;

        const options = {
            html: html,
            fileName: 'Orders',
            directory: 'Documents',
        };

        let file = await RNHTMLtoPDF.convert(options);
        console.log(file.filePath);
    };

    const renderItem = ({ item }) => (
        <View style={styles.row}>
            <Text style={styles.cell}>{item.name}</Text>
            <Text style={styles.cell}>{item.price} Dhs</Text>
            <Text style={styles.cell}>{item.date}</Text>
            <Text style={styles.cell}>{item.status}</Text>
        </View>
    );

    const TableHeader = () => (
        <View style={styles.header}>
            <Text style={styles.headerCell}>Name</Text>
            <Text style={styles.headerCell}>Price</Text>
            <Text style={styles.headerCell}>Date</Text>
            <Text style={styles.headerCell}>Status</Text>
        </View>
    );

    if (loading) {
        return <Text>Loading...</Text>;
    }

    return (
        <View>
          <FlatList
            data={orders}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            ListHeaderComponent={() => (
                <View style={styles.containers}>
                    <Text style={styles.text0}>Your Orders</Text>
                    <TableHeader />
                </View>
            )}
            ListEmptyComponent={<Text>No orders found.</Text>}
           
        />
        <View style={styles.view0}>
        <Pressable
            style={styles.press1}
            onPress={generatePDF}
            accessibilityLabel="Download your orders as a PDF"
            accessibilityRole="button"
        >
            <Text style={styles.text1}>Download PDF</Text>
        </Pressable>
    </View>
        </View>
        
    );
};

const styles = StyleSheet.create({
    containers: {
        padding: 16,
        alignItems: 'center',
        backgroundColor: '#c1ddf5',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#f1f1f1',
        borderBottomWidth: 2,
        borderBottomColor: '#00',
        width: '100%',
    },
    headerCell: {
        flex: 1,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'black',
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
        color: 'black',
    },
    text0: {
        fontFamily: 'Georgia',
        fontSize: 30,
        marginTop: 20,
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
});

export default Orders;
