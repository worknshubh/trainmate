import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Pressable,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Primarybtn from '../components/primarybtn';
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-toast-message';
const Signupscreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [useremail, setUseremail] = useState('');
  const [userpass, setUserpass] = useState('');
  const [cnfuserpass, setcnfUserpass] = useState('');
  function redirecttoLogin() {
    navigation.replace('LoginScreen');
  }

  function verifyandredirect() {
    if (username === '' || useremail === '' || userpass === '') {
      Toast.show({
        type: 'error',
        text1: 'Please fill all fields correctly!',
      });
    } else {
      createUserWithEmailAndPassword(getAuth(), useremail, userpass)
        .then(userCredentials => {
          userCredentials.user.sendEmailVerification();
          Toast.show({
            type: 'success',
            text1: 'Signup successful Kindly verify your email',
          });
          setTimeout(() => {
            navigation.replace('LoginScreen');
          }, 1500);
          firestore().collection('users').doc(userCredentials.user.uid).set({
            username: username,
            useremail: useremail,
            userpass: userpass,
          });
        })
        .catch(error => {
          Toast.show({
            type: 'error',
            text1: 'Failed to Signup right now',
          });
        });
    }
  }

  return (
    <View style={styles.mainScreen}>
      <View style={styles.logotextbox}>
        <Text style={styles.logotext}>Hurry!! Don't</Text>
        <Text style={styles.logotext}>Miss The</Text>
        <Text style={styles.logotext}>Train</Text>
      </View>

      <View
        style={{
          //   borderWidth: 2,
          padding: 8,
          marginHorizontal: wp('6%'),
        }}>
        <TextInput
          placeholder="Enter Your Name"
          style={styles.textinputstyle}
          value={username}
          onChangeText={text => setUsername(text)}></TextInput>
        <TextInput
          placeholder="Enter Your Email"
          style={styles.textinputstyle}
          value={useremail}
          onChangeText={text => setUseremail(text)}></TextInput>
        <TextInput
          placeholder="Enter Your Password"
          style={styles.textinputstyle}
          value={userpass}
          onChangeText={text => setUserpass(text)}></TextInput>
        <TextInput
          placeholder="Confirm Your Password"
          style={styles.textinputstyle}
          value={cnfuserpass}
          onChangeText={text => setcnfUserpass(text)}></TextInput>
      </View>
      <View
        style={{
          flexDirection: 'row',
          //   borderWidth: 1,
          marginLeft: 30,
          marginBottom: 20,
          marginTop: -25,
        }}>
        <Pressable onPress={redirecttoLogin} style={{flexDirection: 'row'}}>
          <Text style={{fontSize: 18, color: '#FCB454'}}>
            Already have an account?
          </Text>
          <Text style={{fontSize: 18, color: '#2E8B57'}}> Login</Text>
        </Pressable>
      </View>

      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Primarybtn name="Signup Now" redirect={verifyandredirect}></Primarybtn>
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
  logotextbox: {
    padding: 20,
    // borderWidth: 2,
    margin: wp('6%'),
  },
  logotext: {
    fontSize: 36,
    color: '#2E8B57',
    fontWeight: 'bold',
  },
  textinputstyle: {
    padding: 3,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    fontSize: 18,
    color: '#FCB454',
    marginBottom: 40,
  },
});
export default Signupscreen;
