import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, TextInput, FlatList, Text, StyleSheet, Image, Dimensions, Pressable,TouchableOpacity,Alert } from 'react-native';
const { width, height } = Dimensions.get('window');
const closeIcon = require('../src/cross.png');
const ip='192.168.80.34'
const Filter = () => {
  const [filter, setFilter] = useState('');
  const [fruits, setFruits] = useState([]);
  const [filteredFruits, setFilteredFruits] = useState([]);
  const [selectedFruit, setSelectedFruit] = useState(null); // State for selected fruit
  const product=useSelector((state) => state.product.selectedItemId)
  useEffect(() => {
    const fetchFruits = async () => {
      try {
        const response = await fetch(`http://${ip}:5000/user/products`);
        const data = await response.json();
        setFruits(data);
        setFilteredFruits(data); // Initialize filtered fruits
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchFruits();
  }, []);

  useEffect(() => {
    const filtered = fruits.filter(item =>
      item.name.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredFruits(filtered);
  }, [filter, fruits]);
  const handleAddCart=async ()=>{
    const userData = await AsyncStorage.getItem('userData');
    const userdata=JSON.parse(userData);
    const a=userdata.carteID
      await fetch(`http://${ip}:5000/user/addtocart`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId:a, produitId:product }),
  });
  
    Alert.alert("Product added to your cart")

  }
  const handleImagePress = (item) => {
    setSelectedFruit(item); // Set the selected fruit
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, styles.textColor, { width: 0.95 * width, height: height * 0.06 }]}
        placeholder="Search"
        value={filter}
        onChangeText={setFilter}
        placeholderTextColor="grey"
      />         
      <FlatList
        data={filteredFruits}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <>
          <View style={styles.view0}>
          <Pressable onPress={() => handleImagePress(item)}>
              <Image source={{ uri: `http://${ip}:5000/${item.image}` }} style={styles.image1} />
            </Pressable>
            <Text style={styles.item}>{item.name} {item.price} Dirhams</Text>
          </View>
          </>
        )}
      />
      {selectedFruit && (
        <View style={styles.overlay}>
          <View style={styles.modal}>
          <TouchableOpacity onPress={() => setSelectedFruit(null)} style={styles.closeButton}>
                  <Image source={closeIcon} style={styles.closeButtonImage} />
          </TouchableOpacity>
          <Image source={{ uri: `http://${ip}:5000/${selectedFruit.image}` }} style={styles.fullscreenImage} />
          <Text style={styles.priceText}>{selectedFruit.name}</Text>
          <Text style={styles.priceText}>Price: {selectedFruit.price} Dirhams</Text>
          <Pressable style={styles.pres0} onPress={handleAddCart}>
              <Text style={styles.presText}> Add to Cart </Text>
          </Pressable>
          </View>
          
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#c1ddf5'
  },
  input: {
    alignItems: 'center',
    backgroundColor: '#e6edf2',
    borderWidth: 2,
    borderRadius: 5,
    borderColor: 'black',
    flexDirection: 'row',
    fontSize: 20,
    marginBottom:40,
  },
  item: {
    padding: 10,
    fontSize: 18,
    color:'black'
  },
  pres0: {
    borderColor: 'black',
    borderWidth: 3,
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  presText: {
    textAlign: 'center',
    color: 'red',
    fontSize: 24,
    marginLeft: 4,
    marginRight: 4,
  },
  image1: {
    width: 0.4 * width,
    height: height * 0.15,
    marginTop: 15,
    borderRadius: 7,
    borderColor: 'black',
    borderWidth: 3
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  modal: {
    width: width * 0.85,
    height: height * 0.55,
    position: 'absolute',
    backgroundColor: '#b0d5f5',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2, // Assurez-vous que le modal est au-dessus de l'overlay
    borderRadius: 10,
    borderWidth: 4,
    borderColor: 'black',
  },
  closeButton: {
    position: 'absolute',
    top: -24,
    right: -15,
    padding: 0,
    borderRadius: 15,
    backgroundColor: 'transparent',
  },
  closeButtonImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  closeText: {
    color: 'black',
    fontSize: 16,
  },
  fullscreenImage: {
    width: width * 0.6,
    height: height * 0.3,
    resizeMode: 'contain',
    borderWidth: 4,
    borderRadius: 10,
    marginBottom: 0,
  },
  priceText: {
    color: 'red',
    fontSize: 24,
    marginTop: 5,
    fontWeight: 'bold',
    fontFamily:'cursive'
  },
  textColor:{
    color:'black',
    fontFamily:'Georgia',
    fontSize:17
  },
  view0:{
    flex:1,
    marginBottom:35,
    borderColor:'black',
    borderWidth:4,
    borderRadius:6,
    alignItems:'center',
    backgroundColor:"#e7f2e6"
},
});

export default Filter;
