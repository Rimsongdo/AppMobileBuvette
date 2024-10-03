import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const ip='192.168.80.34'
const Password = () => {
    const [id, setId] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleChangePassword = async () => {
        try {
            const response = await fetch(`http:${ip}:5000/user/change-password`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id,
                    oldPassword,
                    newPassword,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                Alert.alert('Success', data.message);
            } else {
                Alert.alert('Error', data.message);
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Something went wrong. Please try again later.');
        }
    };

    return (
        <View style={styles.containers}>
            <Text style={styles.title}>Change Your Password</Text>

            <TextInput
                style={styles.input}
                placeholder="CarteID"
                value={id}
                onChangeText={setId}
                placeholderTextColor={'black'}
            />
            <TextInput
                style={styles.input}
                placeholder="Old Password"
                secureTextEntry
                value={oldPassword}
                onChangeText={setOldPassword}
                placeholderTextColor={'black'}
            />
            <TextInput
                style={styles.input}
                placeholder="New Password"
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
                placeholderTextColor={'black'}
            />

            <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
                <Text style={styles.buttonText}>Change Password</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    containers: {
        padding: 16,
       
        alignItems: 'center',
        backgroundColor: '#c1ddf5',
        height: height,
    },
    title: {
        marginTop:60,
        fontSize: 20,
        marginBottom: 40,
        color:'#25084F',
        
    },
    input: {
        height: 50,
        width: width * 0.8,
        borderColor: '#000',
        borderWidth: 2,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        width: width * 0.8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default Password;
