import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Image,
  Pressable,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Primarybtn = props => {
  return (
    <View style={{overflow: 'hidden', borderRadius: 30}}>
      <Pressable
        style={{
          backgroundColor: '#FCB454',
          padding: 20,
          width: 180,
          height: 50,
          borderRadius: 30,
          elevation: 3,
          justifyContent: 'center',
        }}
        onPress={props.redirect}
        android_ripple={{color: '#FF9B17'}}>
        <Text
          style={{
            fontSize: 24,
            height: 40,
            color: '#2E8B57',
            textAlign: 'center',
            textAlignVertical: 'center',
            //   borderWidth: 2,
          }}>
          {props.name}
        </Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({});
export default Primarybtn;
