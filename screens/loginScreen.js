import React, {use, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Pressable,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import auth from '@react-native-firebase/auth';
import Primarybtn from '../components/primarybtn';
import Toast from 'react-native-toast-message';

const Loginscreen = ({navigation}) => {
  const [user, setUser] = useState(null);
  const [useremail, setUseremail] = useState('');
  const [userpass, setUserpass] = useState('');

  function verifyandredirect() {
    if (useremail === '' || userpass === '') {
      Toast.show({
        type: 'error',
        text1: 'Please fill all fields to Login',
      });
    } else {
      auth()
        .signInWithEmailAndPassword(useremail, userpass)
        .then(() => {
          setUser(auth().currentUser);
        })
        .catch(error => {
          Toast.show({
            type: 'error',
            text1: 'Incorrect useremail or passowrd',
          });
        });
    }
  }
  useEffect(() => {
    if (user) {
      if (user.emailVerified && auth().currentUser) {
        user.reload();
        navigation.reset({
          index: 0,
          routes: [{name: 'MainTab'}],
        });
        Toast.show({
          type: 'success',
          text1: 'Logged in successfully ',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Email not verified yet!',
        });
      }
    }
  }, [user]);

  function redirecttoSignup() {
    navigation.replace('signUpScreen');
  }
  return (
    <View style={styles.mainScreen}>
      <View style={styles.textbox}>
        <Text style={styles.textstyle}>Welcome</Text>
        <Text style={styles.textstyle}>Back</Text>
      </View>

      <View style={styles.loginlogobox}>
        <Image
          source={require('../assets/images/loginlogo.png')}
          style={styles.loginlogo}></Image>
      </View>

      <View
        style={{
          //   borderWidth: 2,
          padding: 8,
          margin: wp('6%'),
          position: 'relative',
          top: -100,
        }}>
        <TextInput
          placeholder="Enter your Email"
          style={styles.textinputstyle}
          value={useremail}
          onChangeText={text => setUseremail(text)}></TextInput>
        <TextInput
          placeholder="Enter Your Password"
          style={styles.textinputstyle}
          value={userpass}
          onChangeText={text => setUserpass(text)}></TextInput>
      </View>

      <View
        style={{
          flexDirection: 'row',
          //   borderWidth: 1,
          margin: wp('6%'),
          position: 'absolute',
          top: hp('61%'),
          marginLeft: 30,
        }}>
        <Pressable onPress={redirecttoSignup} style={{flexDirection: 'row'}}>
          <Text
            style={{
              fontSize: 18,
              color: '#FCB454',
              fontFamily: 'Poppins-SemiBold',
            }}>
            Don't have an account?
          </Text>
          <Text
            style={{
              fontSize: 18,
              color: '#2E8B57',
              fontFamily: 'Poppins-SemiBold',
            }}>
            Sign up
          </Text>
        </Pressable>
      </View>

      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Primarybtn name="Login Now" redirect={verifyandredirect} />
      </View>
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  mainScreen: {
    backgroundColor: '#FFF085',
    paddingTop: hp('0%'),
    flex: 1,
  },
  textbox: {
    // borderWidth: 2,
    padding: wp('6%'),
    marginHorizontal: wp('6%'),
    marginTop: wp('1%'),
  },
  textstyle: {
    color: '#2E8B57',
    fontSize: 37,
    fontWeight: 'bold',
    fontFamily: 'Poppins-SemiBold',
  },
  loginlogobox: {
    // borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginlogo: {
    height: hp('40%'),
    width: wp('70%'),
    // borderWidth: 3,
    position: 'relative',
    top: -50,
  },
  textinputstyle: {
    padding: 3,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    fontSize: 18,
    color: '#FCB454',
    marginBottom: 40,
    fontFamily: 'Poppins-Regular',
  },
});

export default Loginscreen;
