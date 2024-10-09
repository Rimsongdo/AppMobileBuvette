import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, FlatList, Dimensions, TouchableOpacity, Pressable, TextInput, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
const { width, height } = Dimensions.get('window');
const closeIcon = require('../src/cross.png');
const cart = require('../src/panier.png');
import { setProductId } from '../store/cartSlice';

const Home = ({ navigation }) => {
  const [foods, setFoods] = useState([]);
  const [bevarages,setBeverages]=useState([])
  const [others,setOthers]=useState([])
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  const ip='192.168.60.194'
  const product=useSelector((state) => state.product.selectedItemId)
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(`http://${ip}:5000/user/beverages`);
      const dataBeverages = await response.json();
      const response1=await fetch(`http://${ip}:5000/user/foods`)
      const dataFoods=await response1.json()
      const response2=await fetch(`http://${ip}:5000/user/others`)
      const dataOthers=await response2.json()
      setBeverages(dataBeverages);
      setFoods(dataFoods)
      setOthers(dataOthers)
    };
    fetchProducts();
  }, []);
  const dispatch = useDispatch();
  const handlePress = (product) => {
    setSelectedProduct(product);
    dispatch(setProductId(product._id))
   
  };

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

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
        <TouchableOpacity onPress={() => handlePress(item)} style={styles.touch1}>
            <Image source={{ uri: `http://${ip}:5000/${item.image}` }} style={styles.image} />
            <Text style={styles.text3}>{item.name}</Text>
        </TouchableOpacity>
    </View>
);


  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.view1}>
          <View style={styles.contentContainer}>
            <View style={styles.view2}>
              <TextInput
                style={[styles.input, styles.textColor, { width: 0.8 * width, height: height * 0.06 }]}
                placeholder="Search"
                placeholderTextColor="grey"
                onFocus={() => navigation.navigate('Filter')}
              />
              <Pressable onPress={() => navigation.navigate('Panier')}>
                <Image source={cart} style={styles.panier} />
              </Pressable>
            </View>
            <View style={[styles.products0, { width: width, height: height * 0.06 }]}>
              <Text style={[styles.myText1, { fontSize: width * 0.06 }]}>Our Products</Text>
            </View>
            <View style={[styles.products1, { width: width, height: height * 0.05 }]}>
              <Text style={[styles.myText1, { fontSize: width * 0.06 }]}>Beverages</Text>
            </View>
            <View style={[styles.products2, { width: width, height: height * 0.19 }]}>
              <FlatList
                data={bevarages}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                bounces={false}
              />
            </View>
            <View style={[styles.products3, { width: width, height: height * 0.05 }]}>
              <Text style={[styles.myText1, { fontSize: width * 0.06 }]}>Moroccan Foods</Text>
            </View>
            <View style={[styles.products4, { width: width, height: height * 0.19 }]}>
              <FlatList
                data={foods}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                bounces={false}
              />
            </View>
            <View style={[styles.products5, { width: width, height: height * 0.05 }]}>
              <Text style={[styles.myText1, { fontSize: width * 0.06 }]}>Others</Text>
            </View>
            <View style={[styles.products6, { width: width, height: height * 0.19 }]}>
              <FlatList
                data={others}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                bounces={false}
              />
            </View>
          </View>

          {selectedProduct && (
            <>
              <View style={styles.overlay} />
              <View style={styles.modal}>
                <TouchableOpacity onPress={() => setSelectedProduct(null)} style={styles.closeButton}>
                  <Image source={closeIcon} style={styles.closeButtonImage} />
                </TouchableOpacity>
                <Image source={{ uri: `http://${ip}:5000/${selectedProduct.image}` }} style={styles.fullscreenImage} />
                <Text style={styles.priceText}>{selectedProduct.name}</Text>
                <Text style={styles.priceText}>Price: {selectedProduct.price} Dirhams</Text>
                <Pressable style={styles.pres0} onPress={handleAddCart}>
                  <Text style={styles.presText}> Add to Cart </Text>
                </Pressable>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  scrollContainer: {
    flex: 1,
  },
  view1: {
    backgroundColor: '#c1ddf5',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Couleur semi-transparente
    zIndex: 1, // Assurez-vous que l'overlay est au-dessus du contenu
  },
  view2:{
    flex:0.1,
    flexDirection:'row',
    marginBottom:15,
    justifyContent:'space-between',
    marginLeft:5,
    marginRight:5,
    
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
  myText1: {
    fontWeight: 'bold',
    fontFamily:"cursive",
    color: 'black',
    marginLeft: 15,
    
  },
  input: {
    alignItems: 'center',
    backgroundColor: '#e6edf2',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderRadius: 5,
    borderColor: 'black',
    flexDirection: 'row',
    fontSize: 20,
  },
  products0: {
    flex: 0.08,
    backgroundColor: '#e6edf2',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 15,
    borderColor: '#e6edf2',
  },
  products1: {
    flex: 0.08,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 15,
    borderColor: 'white',
    marginTop: 15,
  },
  products2: {
    backgroundColor: 'white',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 15,
    borderColor: 'white',
    marginTop: 3,
  },
  products3: {
    flex: 0.08,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 15,
    borderColor: 'white',
    marginTop: 15,
  },
  products4: {
    flex: 0.33,
    backgroundColor: 'white',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 15,
    borderColor: 'white',
    marginTop: 3,
  },
  products5: {
    flex: 0.08,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 15,
    borderColor: 'white',
    marginTop: 15,
  },
  products6: {
    flex: 0.33,
    backgroundColor: 'white',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 15,
    borderColor: 'white',
    marginTop: 3,
  },
  slide: {
    backgroundColor: '#e7f2e6',
    width: width * 0.4,
    height: height * 0.33,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  touch1: {
    width: '80%',
    height: '40%',
    borderRadius: 5,
    marginLeft: 10,
    marginTop: 20,
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
  panier: {
    width: width * 0.1,
    height: height * 0.05,
  },
  textColor: {
    color: 'black',
  },
  text3:{
    textAlign:'center',
    
    
    fontSize:15,
    color:'black'
  }
});

export default Home;
