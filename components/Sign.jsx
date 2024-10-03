import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, useWindowDimensions, Pressable, TouchableOpacity,Dimensions } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
const ip='192.168.80.34'
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  username: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
  filiere: Yup.string().required('Required'),
  carteID: Yup.string().required('Required'),
});
const { width, height } = Dimensions.get('window');
const Sign = ({ navigation }) => {
  
  
  const handleSubmit = async (values) => {
    try {
      const response = await fetch(`http://${ip}:5000/user/signUp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name:values.name,
          username:values.username,
          password:values.password,
          filiere:values.filiere,
          carteID:values.carteID
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('You are now registered', data.message);
        navigation.navigate('Login');
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred.');
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ name: '', username: '', password: '', filiere: '', carteID: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.view0}>
            <Text style={[styles.Text2, { fontSize: 0.15 * width }]}>Welcome</Text>
            <Text style={[styles.Text0, { fontSize: 0.1 * width }]}>Create an Account</Text>

            <TextInput
              style={[styles.input, styles.textColor, { width: 0.7 * width }]}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
              placeholder="Enter your name"
              placeholderTextColor='grey'
              accessibilityLabel="Name"
            />
            {touched.name && errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

            <TextInput
              style={[styles.input, styles.textColor, { width: 0.7 * width }]}
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
              placeholder="Enter your username"
              placeholderTextColor='grey'
              accessibilityLabel="Username"
            />
            {touched.username && errors.username && <Text style={styles.errorText}>{errors.username}</Text>}

            <TextInput
              style={[styles.input, styles.textColor, { width: 0.7 * width }]}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              placeholder="Enter your password"
              placeholderTextColor='grey'
              secureTextEntry
              accessibilityLabel="Password"
            />
            {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

            <TextInput
              style={[styles.input, styles.textColor, { width: 0.7 * width }]}
              onChangeText={handleChange('filiere')}
              onBlur={handleBlur('filiere')}
              value={values.filiere}
              placeholder="Enter your studies field"
              placeholderTextColor='grey'
              accessibilityLabel="Filiere"
            />
            {touched.filiere && errors.filiere && <Text style={styles.errorText}>{errors.filiere}</Text>}

            <TextInput
              style={[styles.input, styles.textColor, { width: 0.7 * width }]}
              onChangeText={handleChange('carteID')}
              onBlur={handleBlur('carteID')}
              value={values.carteID}
              placeholder="Enter your card ID"
              placeholderTextColor='grey'
              accessibilityLabel="Carte ID"
            />
            {touched.carteID && errors.carteID && <Text style={styles.errorText}>{errors.carteID}</Text>}

            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <View style={styles.myView}>
              <Text style={styles.mesText}>Already have an account? </Text>
              <Pressable onPress={() => navigation.navigate('Login')}>
                <Text style={styles.Text1}>Login</Text>
              </Pressable>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  view0:{
    alignItems:'center'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 2,
    marginBottom: 3,
    marginTop: 20,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  textColor: {
    color: 'black',
  },
  errorText: {
    color: 'red',
  },
  mesText: {
    color: 'black',
  },
  Text0: {
    fontSize: 40,
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 40,
  },
  myView: {
    flexDirection: 'row',
  },
  Text1: {
    color: 'red',
  },
  button: {
    backgroundColor: '#2795f5',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
    width:0.7*width,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  Text2: {
    color: 'blue',
    marginTop: 30,
    textAlign:'center',
    fontFamily:'cursive'
  },
});

export default Sign;
