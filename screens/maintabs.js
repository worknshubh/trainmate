import React from 'react';
import {View, Text, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Seachtrain from './searchTrain';
import Profile from './profile';
import Report from './report';
const Tab = createBottomTabNavigator();
const Maintab = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFF085',
          fontFamily: 'Poppins-SemiBold',
        },
        tabBarActiveTintColor: '#2E8B57',
        tabBarLabelStyle: {
          marginTop: 4,
        },
        tabBarIcon: ({focused}) => {
          if (route.name === 'searchTrain') {
            return (
              <Image
                source={
                  focused
                    ? require('../assets/images/search_highlighted.png')
                    : require('../assets/images/search.png')
                }
                style={{height: 30, width: 30}}></Image>
            );
          } else if (route.name === 'Profile') {
            return (
              <Image
                source={
                  focused
                    ? require('../assets/images/profile_highlighted.png')
                    : require('../assets/images/profile.png')
                }
                style={{height: 30, width: 30}}></Image>
            );
          } else if (route.name === 'Report') {
            return (
              <Image
                source={
                  focused
                    ? require('../assets/images/Warning_highlighted.png')
                    : require('../assets/images/Warning.png')
                }
                style={{height: 30, width: 30}}></Image>
            );
          }
        },
      })}>
      <Tab.Screen
        name="searchTrain"
        component={Seachtrain}
        options={{
          headerShown: false,
          tabBarLabel: 'Search',
          tabBarStyle: {backgroundColor: '#FFF085'},
        }}></Tab.Screen>
      <Tab.Screen name="Report" component={Report}></Tab.Screen>
      <Tab.Screen name="Profile" component={Profile}></Tab.Screen>
    </Tab.Navigator>
  );
};

export default Maintab;
