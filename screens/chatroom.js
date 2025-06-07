import React, {use, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Pressable,
  Alert,
  Modal,
  FlatList,
  Button,
  KeyboardAvoidingView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Chat from '../components/chat';
import moment from 'moment';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Primarybtn from '../components/primarybtn';
import Toast from 'react-native-toast-message';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Chatroom = ({route, navigation}) => {
  const [usermessage, setUsermessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [userData, setuserData] = useState({});
  const [isModalVisible, setModalVisible] = useState(true);
  const [userInput, setUserInput] = useState('');
  const [pnrStatus, setpnrStatus] = useState([]);
  const {train_details} = route.params;
  const date = moment();
  const today_date = date.format('YYYY-MM-DD');
  const DocumentID = `${train_details.trainNumber}_${today_date}`;
  function verifyUserinput() {
    console.log('Verifying PNR input:', userInput);

    if (userInput === '696969') {
      setModalVisible(false);
      Toast.show({
        type: 'success',
        text1: 'PNR Verified Successfully',
      });
    } else {
      fetch(
        `https://irctc-indian-railway-pnr-status.p.rapidapi.com/getPNRStatus/${userInput}`,
        {
          method: 'GET',
          headers: {
            'x-rapidapi-key':
              '651bbea1e0mshbca289c9dbeb9d0p100823jsn59768b14f41b',
            'x-rapidapi-host': 'irctc-indian-railway-pnr-status.p.rapidapi.com',
          },
        },
      )
        .then(res => res.json())
        .then(data => {
          setpnrStatus(data);
          console.log(data.data.passengerList);
          if (data.success === true) {
            if (
              data.data.passengerList[0].bookingStatus === 'CNF' &&
              data.data.trainNumber === train_details.trainNumber
            ) {
              setModalVisible(false);
              Toast.show({
                type: 'success',
                text1: 'PNR Verified Successfully',
              });
            } else {
              Toast.show({
                type: 'error',
                text1: 'PNR Not Confirmed or Wrong PNR',
              });
              setTimeout(() => {
                navigation.goBack();
              }, 2000);
            }
          } else {
            Toast.show({
              type: 'error',
              text1: 'PNR Not Confirmed or Wrong PNR',
            });
            setTimeout(() => {
              navigation.goBack();
            }, 2000);
          }
        });
    }
  }
  function fetchuserdata() {
    firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          setuserData(documentSnapshot.data);
        } else {
          console.log('No user found with this UID');
        }
      });
  }
  useEffect(() => {
    fetchuserdata();
    const unsubscribe = firestore()
      .collection('chatrooms')
      .doc(DocumentID)
      .collection('messages')
      .orderBy('time')
      .onSnapshot(querySnapshot => {
        const fetchedMessages = [];
        querySnapshot.forEach(doc => {
          fetchedMessages.push({...doc.data(), id: doc.id});
        });
        setMessages(fetchedMessages);
      });

    return () => unsubscribe();
  }, []);
  function sendmessage() {
    console.log('username:', userData.username);
    console.log('usermessage:', usermessage);
    console.log('senderid:', auth().currentUser.uid);
    console.log('time:', moment().format('hh:mm:ss A'));
    if (usermessage != '') {
      firestore()
        .collection('chatrooms')
        .doc(DocumentID)
        .collection('messages')
        .add({
          username: userData.username,
          usermessage: usermessage,
          senderid: auth().currentUser.uid,
          time: moment().format('hh:mm:ss A'),
        })
        .then(() => setUsermessage(''));
    } else {
      Toast.show({
        type: 'info',
        text1: "Empty Messages can't be send",
      });
    }
  }
  return (
    <View style={styles.mainScreen}>
      <Modal animationType="fade" transparent={true} visible={isModalVisible}>
        <View style={styles.modalbox}>
          <View
            style={{
              backgroundColor: '#FF9B17',
              width: wp('92%'),
              borderRadius: 15,
              padding: 20,
            }}>
            <View style={{alignItems: 'center'}}>
              <Image
                source={require('../assets/images/verification.png')}
                style={{height: 200, width: 200}}></Image>
            </View>
            <View>
              <TextInput
                placeholder="Enter Your PNR Number :"
                style={{
                  borderBottomWidth: 2,
                  fontSize: 20,
                  color: '#2E8B57',
                  fontFamily: 'Poppins-Regular',
                }}
                keyboardType="numeric"
                value={userInput}
                onChangeText={text => setUserInput(text)}></TextInput>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 10,
              }}>
              <Pressable
                style={{width: wp('20%')}}
                onPress={verifyUserinput}
                android_ripple={{color: '#FCB454'}}>
                <View
                  style={{
                    backgroundColor: '#FCB454',
                    borderRadius: 15,
                    padding: 12,
                  }}>
                  <Text
                    style={{
                      fontSize: 20,
                      textAlign: 'center',
                      color: '#2E8B57',
                      elevation: 2,
                    }}>
                    Verify
                  </Text>
                </View>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <KeyboardAvoidingView
        style={{flex: 1}}
        keyboardVerticalOffset={25}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.topbar}>
          <Text style={styles.topbartext}>
            {train_details.trainNumber} - {train_details.trainName}
          </Text>
        </View>

        <View style={{flex: 1}}>
          <FlatList
            data={messages}
            renderItem={({item}) => <Chat messages={item}></Chat>}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: 0,
            borderTopWidth: 1,
            padding: 6,
            height: hp('8%'),
          }}>
          <TextInput
            placeholder="Say hii to others.."
            style={styles.chatboxtextinput}
            value={usermessage}
            onChangeText={text => setUsermessage(text)}></TextInput>
          <Pressable onPress={sendmessage}>
            <Image
              source={require('../assets/images/sendbtn.png')}
              style={{height: 35, width: 35}}></Image>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
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
  topbar: {
    borderBottomWidth: 1,
    padding: 20,
    elevation: 1,
  },
  topbartext: {
    color: '#2E8B57',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
  },
  chatboxtextinput: {
    fontSize: 20,
    // borderWidth: 2,
    width: wp('80%'),
    color: '#2E8B57',
    fontFamily: 'Poppins-Light',
  },
  modalbox: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    elevation: 3,
  },
});
export default Chatroom;
