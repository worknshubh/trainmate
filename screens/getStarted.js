import React from 'react';
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
import auth from '@react-native-firebase/auth';
import Primarybtn from '../components/primarybtn';

const Getstarted = ({navigation}) => {
  const user = auth().currentUser;
  function redirecttoscreen() {
    if (user) {
      user.reload();
      if (user.emailVerified) {
        navigation.reset({
          index: 0,
          routes: [{name: 'searchTrain'}],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{name: 'LoginScreen'}],
        });
      }
    } else {
      navigation.navigate('LoginScreen');
    }
  }
  return (
    <View style={styles.mainScreen}>
      <View style={styles.getstartedlogobox}>
        <Image
          source={require('../assets/images/getstarted.png')}
          style={{width: wp('68%'), height: hp('35%')}}></Image>
        <Text style={{color: '#2E8B57', fontSize: 34, fontWeight: 'bold'}}>
          Train Mate
        </Text>
      </View>

      <View style={styles.punchline}>
        <Text style={styles.punchlinetext}>Where Every Train Ride</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.punchlinetext}>Has a </Text>
          <Text style={[styles.punchlinetext, {color: '#2E8B57'}]}>Voice</Text>
        </View>
      </View>

      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Primarybtn name="Get Started" redirect={redirecttoscreen} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainScreen: {
    backgroundColor: '#FFF085',
    paddingTop: hp('0%'),
    flex: 1,
  },
  getstartedlogobox: {
    // borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
  },
  punchline: {
    // borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 60,
  },
  punchlinetext: {
    fontSize: 24,
    color: '#FCB454',
    textAlign: 'center',
  },
});
export default Getstarted;
