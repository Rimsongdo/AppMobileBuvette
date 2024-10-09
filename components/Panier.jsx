import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, FlatList, Dimensions, Pressable, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');
const ip='192.168.60.194';

const Panier = () => {
    const [panier, setPanier] = useState([]);
    const [total, setTotal] = useState(null);
    const [trigger, setTrigger] = useState(false);
    const productId = useSelector((state) => state.product.selectedItemId);

    useEffect(() => {
        const fetchProducts = async () => {
            const userData = await AsyncStorage.getItem('userData');
            const userdata = JSON.parse(userData);
            const a = userdata.carteID;
            const response = await fetch(`http://${ip}:5000/user/yourcart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: a }),
            });
            const dataPanier = await response.json();
            const sum = dataPanier.reduce((accumulator, current) => accumulator + current.price, 0);
            setPanier(dataPanier);
            setTotal(sum);
        };
        fetchProducts();
    }, [trigger]);

    const handleDelete = async (productId) => {
        const userData = await AsyncStorage.getItem('userData');
        const userdata = JSON.parse(userData);
        const a = userdata.userId;
        await fetch(`http://${ip}:5000/user/deleteelement`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: a, produitId: productId }),
        });
        setTrigger(prev => !prev);
    };

    const handleOrder = async () => {
        const userData = await AsyncStorage.getItem('userData');
        const userdata = JSON.parse(userData);
        const a = userdata.userId;
        await fetch(`http://${ip}:5000/user/order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ _id: a, amount: total }),
        });
        Alert.alert("Your order has been processed");
        setTrigger(prev => !prev);
    };

    const renderItem = ({ item }) => (
        <View style={styles.view1}>
            <Image source={{ uri: `http://${ip}:5000/${item.image}` }} style={styles.image1} />
            <Text style={styles.text2}>{item.name}   {item.price} Dhs</Text>
            <View style={styles.view2}>
                <Pressable style={styles.myBut1} onPress={() => handleDelete(item._id)}>
                    <Text style={styles.text3}>Delete</Text>
                </Pressable>
            </View>
        </View>
    );

    return (
        <View style={styles.view0}>
            {panier.length === 0 ? (
                <Text style={styles.emptyCartText}>Your cart is empty</Text>
            ) : (
                <FlatList
                    data={panier}
                    renderItem={renderItem}
                    keyExtractor={item => item._id}
                    ListHeaderComponent={
                        <Text style={styles.text1}>Your Cart</Text>
                    }
                    ListFooterComponent={
                        <View style={styles.view3}>
                            <Pressable style={styles.myBut} onPress={handleOrder}>
                                <Text style={styles.text4}>Order: {total} Dirhams</Text>
                            </Pressable>
                        </View>
                    }
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    view0: {
        backgroundColor: '#c1ddf5',
        height: height,
    },
    image1: {
        width: 0.4 * width,
        height: height * 0.15,
        marginTop: 15,
        borderRadius: 7,
        borderColor: 'black',
        borderWidth: 3,
    },
    text1: {
        fontFamily: "cursive",
        textAlign: 'center',
        fontSize: 40,
        color: 'blue',
        marginTop: 15,
        marginBottom: 15,
    },
    view1: {
        flex: 1,
        marginBottom: 35,
        borderColor: 'black',
        borderWidth: 4,
        borderRadius: 6,
        alignItems: 'center',
        backgroundColor: "#e7f2e6",
    },
    text2: {
        fontFamily: "cursive",
        fontSize: 20,
        color: 'black',
    },
    myBut: {
        backgroundColor: '#4CAF50',
        borderWidth: 1,
        borderColor: 'white',
        width: 0.7 * width,
        height: 0.06 * height,
        borderRadius: 5,
        marginBottom: 15,
        justifyContent: 'center',
    },
    myBut1: {
        borderWidth: 1,
        borderColor: 'white',
        backgroundColor: '#f2746d',
        borderRadius: 5,
        marginBottom: 5,
    },
    text3: {
        fontFamily: "cursive",
        fontSize: 18,
        color: 'white',
    },
    view2: {
        flex: 1,
        flexDirection: 'row',
        gap: 16,
    },
    text4: {
        fontFamily: "system-ui",
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
    },
    view3: {
        flex: 1,
        alignItems: 'center',
        marginBottom: 40,
    },
    emptyCartText: {
        fontFamily: "cursive",
        fontSize: 30,
        textAlign: 'center',
        marginTop: 50,
        color: 'red',
    },
});

export default Panier;
