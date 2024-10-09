import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View, Image, FlatList, Dimensions, TouchableOpacity, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Get window dimensions
const ip='192.168.60.194'
const { width, height } = Dimensions.get('window');
const signout=require('../src/logout.webp')
const Account= ({navigation})=>{
    const [name,setName]=useState(null)
    const [balance,setBalance]=useState(null)
   
    useEffect(()=>{
        const fetchProducts = async () => {
            const userData = await AsyncStorage.getItem('userData');
            const userdata=JSON.parse(userData);
            const nom=userdata.name
            const id=userdata.carteID
            const response=await fetch(`http://${ip}:5000/user/amount`, {
                method: 'Post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({id}),
            });
            const data = await response.json(); // Récupérer les données JSON de la réponse
            setBalance(data.solde);
            setName(nom)
        }
          fetchProducts();
    },[])

    const handleSignOut=async ()=>{
        await AsyncStorage.removeItem('userData');
        navigation.navigate('Login')
    }
    
    return(
        <View style={styles.view0}>
            <Text style={styles.text1}>Welcome {name}</Text>
            <Text style={styles.text4}>Balance:  {balance} Dirhams</Text>
            <View style={styles.view3}>
             <Pressable style={styles.press1} onPress={()=>{navigation.navigate('Orders')}}>
             <Text style={styles.text3}>Orders</Text>
             </Pressable>
             <Pressable style={styles.press1} onPress={()=>{navigation.navigate('Notifs')}}>
             <Text style={styles.text3}>Notifications</Text>
             </Pressable> 
             <Pressable style={styles.press1} onPress={()=>{navigation.navigate('Password')}}>
             <Text style={styles.text3}>Change password</Text>
             </Pressable>
             <Pressable style={styles.press2} onPress={handleSignOut}>
             <Text style={styles.text5}>Logout</Text>
             </Pressable>       
            </View>           
        </View>
     


    )
}

const styles=StyleSheet.create({
    view0:{
        backgroundColor:'#c1ddf5',
        height:height
    },
    text0:{
        fontSize:30,
        color:"#4075de",
        fontFamily:"Edu AU VIC WA NT Guides"
    },
    text1:{
        fontSize:20,
        textAlign:'center',
        marginTop:80,
        marginBottom:60,
        color:'#27076b'
    },
    text4:{
        fontSize:20,
        textAlign:'center',
        marginBottom:60,
        color:'#190a38'
    },
    
    image1:{
        width:width*0.07,
        height:height*0.05
    },
    view1:{
       marginRight:5,
       marginLeft:20,
       marginTop:20,
        flexDirection:'row',
        justifyContent:'space-between',
        
    },
    text2:{
        textAlign:'center'
    },
    view2:{
        width:width*0.3,
        display:'flex',
        alignItems:'center',
        
    },
    press1:{
        width:0.6*width,
        borderWidth:1,
        borderColor:'white',
        height:0.06*height,
        marginBottom:20,
        backgroundColor:"#4CAF50",
        borderRadius:5,
        justifyContent:'center'
    },
    press2:{
        width:0.6*width,
        borderWidth:1,
        borderColor:'black',
        height:0.06*height,
        marginBottom:20,
        backgroundColor:"#4CAF50",
        borderRadius:5,
        justifyContent:'center'
    },
    view3:{
        flex:1,
        alignItems:'center'
    },
    text3:{
        color:"white",
        fontSize:20,
        textAlign:'center'
    },
    text5:{
        color:"black",
        fontSize:20,
        textAlign:'center'
    },
})

export default Account