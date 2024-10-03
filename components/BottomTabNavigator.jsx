import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import Home from './Home';
import Account from './Account';
import Help from './Help';

import HomeIcon from '../src/home.png';
import AccountIcon from '../src/account.png';
import HelpIcon from '../src/help.png';

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Image source={HomeIcon} style={{ width: size, height: size, tintColor: color }} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Image source={AccountIcon} style={{ width: size, height: size, tintColor: color }} />
          ),
        }}
      />
      <Tab.Screen
        name="Help"
        component={Help}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Image source={HelpIcon} style={{ width: size, height: size, tintColor: color }} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
