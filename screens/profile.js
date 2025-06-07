import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Image,
  Pressable,
  Alert,
  FlatList,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Primarybtn from '../components/primarybtn';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-toast-message';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const Profile = ({navigation}) => {
  const [username, setUsername] = useState(null);
  const [useremail, setUseremail] = useState(null);
  const [userpic, setUserpic] = useState(
    require('../assets/images/profile.png'),
  );
  function changeImage() {
    Toast.show({
      text1: 'Pressed',
      type: 'info',
    });
    launchImageLibrary(
      {mediaType: 'photo', maxHeight: 800, maxWidth: 800},
      data => {
        console.log(data);

        if (!data.didCancel) {
          const photo = data.assets[0].uri;
          // setUserpic({uri: data.assets[0].uri});
          const cloudnaryUpload = photo => {
            const data = new FormData();
            data.append('file', {
              uri: photo,
              type: 'image/jpeg',
              name: 'upload.jpg',
            });
            data.append('upload_preset', 'userprofile');
            data.append('cloud_name', 'drjbxyfr6');
            fetch('https://api.cloudinary.com/v1_1/drjbxyfr6/upload', {
              method: 'post',
              headers: {
                'Content-Type': 'multipart/form-data',
              },
              body: data,
            })
              .then(res => res.json())
              .then(output => {
                console.log(output);
                firestore().collection('users').doc(auth().currentUser.uid).set(
                  {
                    userpic: output.secure_url,
                  },
                  {merge: true},
                );
                setUserpic({uri: output.secure_url});
              })
              .catch(err => {
                console.log(err);
              });
          };
          cloudnaryUpload(photo);
        }
      },
    );
  }

  function logout() {
    auth().signOut();
    navigation.reset({
      index: 0,
      routes: [{name: 'LoginScreen'}],
    });
  }
  function fetch_details() {
    if (auth().currentUser) {
      firestore()
        .collection('users')
        .doc(auth().currentUser.uid)
        .get()
        .then(data => {
          if (data.exists) {
            console.log(data);
            setUseremail(data._data.useremail);
            setUsername(data._data.username);
            if (data._data.userpic) {
              setUserpic({uri: data._data.userpic});
            } else {
              setUserpic(require('../assets/images/profile.png'));
            }
          }
        });
    }
  }
  useEffect(() => {
    fetch_details();
  }, []);
  return (
    <View style={styles.mainScreen}>
      <View style={styles.navbar}>
        <Text style={styles.logo}>Profile</Text>
      </View>

      <View style={styles.profile_container}>
        <Pressable onPress={changeImage}>
          <Image source={userpic} style={styles.profile_pic}></Image>
        </Pressable>
        <Text style={styles.maintext}>{username}</Text>
      </View>

      <View style={styles.email_container}>
        <Text style={styles.maintext}>Email</Text>
        <Text style={styles.subtext}>{useremail}</Text>
      </View>

      <View style={styles.journey_container}>
        <Text style={styles.maintext}>Total Journeys</Text>
        <Text style={styles.subtext}>0</Text>
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Primarybtn name="Log Out" redirect={logout}></Primarybtn>
      </View>
      <Toast />
    </View>
  );
};
const styles = StyleSheet.create({
  mainScreen: {
    backgroundColor: '#FFF085',
    paddingTop: hp('3%'),
    flex: 1,
  },
  navbar: {
    borderBottomWidth: 1,
    borderColor: '#969693',
  },
  logo: {
    color: '#2E8B57',
    fontSize: 30,
    marginLeft: hp('7%'),
    // fontWeight: 'bold',
    fontFamily: 'Poppins-SemiBold',
    // borderWidth:2
    marginBottom: 8,
  },
  profile_container: {
    // borderWidth: 2,
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profile_pic: {
    height: 180,
    width: 180,
    marginBottom: 8,
    borderRadius: 100,
  },
  maintext: {
    fontFamily: 'Poppins-SemiBold',
    color: '#FCB454',
    fontSize: 18,
  },
  subtext: {
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    marginHorizontal: 10,
    color: '#2E8B57',
  },
  email_container: {
    marginHorizontal: 40,
    marginBottom: 10,
    flexDirection: 'row',
  },
  journey_container: {
    marginHorizontal: 40,
    flexDirection: 'row',
    marginBottom: 30,
  },
});
export default Profile;
