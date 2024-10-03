import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, useWindowDimensions, Pressable, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox';
const ip='192.168.80.34'
const validationSchema = Yup.object().shape({
  id: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
  rememberMe: Yup.boolean(),
});

const Login = ({ navigation }) => {
  const { width } = useWindowDimensions();
  
  const [initialValues, setInitialValues] = useState({ id: '', password: '', rememberMe: true });

  const loadCredentials = async () => {
    const savedCredentials = await AsyncStorage.getItem('userCredentials');
    if (savedCredentials) {
      const credentials = JSON.parse(savedCredentials);
      setInitialValues(credentials);
    }
  };

  useEffect(() => {
    loadCredentials();
  }, []);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await fetch(`http://${ip}:5000/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          carteID: values.id,
          password: values.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const userInfo = data.user;
        await AsyncStorage.setItem('userData', JSON.stringify(userInfo));
        if (values.rememberMe) {
          await AsyncStorage.setItem('userCredentials', JSON.stringify(values));
        } else {
          await AsyncStorage.removeItem('userCredentials');
        }
        resetForm();
        navigation.navigate('Main');
      } else {
        Alert.alert('Login Failed', data.message || 'Invalid credentials');
      }
    } catch (error) {
      Alert.alert('Login Failed', 'An error occurred. Please try again.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
          <View>
            <Text style={[styles.Text2, { fontSize: 0.15 * width }]}>Welcome</Text>
            <Text style={[styles.Text0, { fontSize: 0.1 * width }]}>Login</Text>
            
            <TextInput
              style={[styles.input, styles.textColor, { width: 0.7 * width }]}
              onChangeText={handleChange('id')}
              onBlur={handleBlur('id')}
              value={values.id}
              placeholder="Enter your id"
              placeholderTextColor='grey'
              accessibilityLabel="User ID"
            />
            {touched.id && errors.id && <Text style={styles.errorText}>{errors.id}</Text>}

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

            <View style={styles.rememberMeContainer}>
              <CheckBox
                value={values.rememberMe}
                onValueChange={() => {
                  setFieldValue('rememberMe', !values.rememberMe);
                }}
              />
              <Text style={styles.rememberMeText}>Remember Me</Text>
            </View>

            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

  

            <View style={styles.myView}>
              <Text style={styles.mesText}>Don't have an account? </Text>
              <Pressable onPress={() => navigation.navigate('Sign')}>
                <Text style={styles.Text1}>Sign Up</Text>
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
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  rememberMeText: {
    marginLeft: 8,
    color: 'black',
  },
  forgotPassword: {
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: 'blue',
  },
});

export default Login;
