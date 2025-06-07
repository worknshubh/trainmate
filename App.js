import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Seachtrain from './screens/searchTrain';
import Loginscreen from './screens/loginScreen';
import Getstarted from './screens/getStarted';
import Signupscreen from './screens/signupScreen';
import Chatroom from './screens/chatroom';
import Toast from 'react-native-toast-message';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Maintab from './screens/maintabs';
import Profile from './screens/profile';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="getStarted"
          component={Getstarted}
          options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen
          name="LoginScreen"
          component={Loginscreen}
          options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen
          name="signUpScreen"
          component={Signupscreen}
          options={{headerShown: false}}></Stack.Screen>
        {/* <Stack.Screen
          name="searchTrain"
          component={Seachtrain}
          options={{headerShown: false}}></Stack.Screen> */}
        <Stack.Screen
          name="chatRoom"
          component={Chatroom}
          options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen
          name="MainTab"
          component={Maintab}
          options={{headerShown: false}}></Stack.Screen>
        {/* <Stack.Screen
          name="Profile"
          component={Profile}
          options={{headerShown: false}}></Stack.Screen> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});
export default App;
