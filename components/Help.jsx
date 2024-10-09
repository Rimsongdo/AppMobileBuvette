import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Pressable, TextInput, Alert } from 'react-native';
const ip='192.168.60.194'
// Get window dimensions
const { width, height } = Dimensions.get('window');

const Help = () => {
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');

    const sendEmail = async () => {
        try {
            const response = await fetch(`http://${ip}:5000/user/send-email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    message,
                }),
            });

            if (response.ok) {
                const data = await response.text();
                Alert.alert('Succès', data);
                // Réinitialiser les champs
                setEmail('');
                setMessage('');
            } else {
                throw new Error('Erreur lors de l\'envoi de l\'email');
            }
        } catch (error) {
            Alert.alert('Erreur', error.message);
        }
    };

    return (
        <View style={styles.containers}>
            <Text style={styles.text3}>Help?</Text>
            <Text style={styles.text0}>Complains?</Text>
            <Text style={styles.text0}>Recommendations?</Text>
            <Text style={styles.text1}>Let us know!</Text>
            <View style={styles.container}>
                <TextInput
                    style={[styles.input, styles.textColor, { height: height * 0.06 }]}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Your Email"
                    placeholderTextColor={'grey'}
                />
                <TextInput
                    style={[styles.input, styles.textColor, { height: height * 0.06 }]}
                    value={message}
                    onChangeText={setMessage}
                    placeholder="Your message"
                    placeholderTextColor={'grey'}
                />
                <View style={styles.view1}>
                    <Pressable style={styles.press1} onPress={sendEmail}>
                        <Text style={styles.text2}>Send</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    containers: {
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#c1ddf5',
        height: height,
    },
    text0: {
        textAlign: "center",
        fontFamily: "Georgia",
        fontSize: 20,
        color: '#1806a1',
        marginTop: 10,
    },
    text3: {
        textAlign: "center",
        fontFamily: "Georgia",
        fontSize: 20,
        color: '#1806a1',
        marginTop: 40,
    },
    text1: {
        textAlign: "center",
        fontFamily: "Georgia",
        fontSize: 20,
        color: '#503de0',
        marginTop: 20,
        marginBottom:25,
    },
    input: {
        height: 40,
        borderColor: 'black',
        borderWidth: 2,
        marginBottom: 25,
        paddingHorizontal: 8,
        width: 0.8 * width,
        borderRadius: 5,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 30,
    },
    textColor: {
        color: 'black',
        fontSize: 17,
    },
    view1: {
        flex: 1,
        alignItems: 'center',
        
    },
    press1: {
        borderColor: 'white',
        borderWidth: 1,
        width: 0.8 * width,
        height: 0.06 * height,
        backgroundColor: '#4CAF50',
        justifyContent: 'center',
        borderRadius: 5,
    },
    text2: {
        textAlign: 'center',
        fontSize: 20,
        color: 'white',
       
    },
});

export default Help;
