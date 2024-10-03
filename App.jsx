// App.js
import * as React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './components/BottomTabNavigator';
import Login from './components/Login';
import Sign from './components/Sign';
import Panier from './components/Panier';
import store from './store/store';
import Orders from './components/Orders';
import Notifications from './components/Notifications';
import Password from './components/password';
import Filter from './components/Search';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
         <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ headerShown: false }}  
        />
        <Stack.Screen 
          name="Sign" 
          component={Sign} 
          options={{ headerShown: false }}  
        />
        <Stack.Screen 
          name="Panier" 
          component={Panier} 
          options={{ headerShown: false }}  
        />
         <Stack.Screen 
          name="Orders" 
          component={Orders} 
          options={{ headerShown: false }}  
        />
        <Stack.Screen 
          name="Notifs" 
          component={Notifications} 
          options={{ headerShown: false }}  
        />
        <Stack.Screen 
          name="Password" 
          component={Password} 
          options={{ headerShown: false }}  
        />
        <Stack.Screen 
          name="Main" 
          component={BottomTabNavigator} 
          options={{ headerShown: false }}  
        />
        <Stack.Screen 
          name="Filter" 
          component={Filter} 
          options={{ headerShown: false }}  
        />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
    
  );
}
