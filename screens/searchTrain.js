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
import Traincard from '../components/traincard';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';

const Seachtrain = ({navigation}) => {
  const [trainName, setTrainname] = useState(null);
  const [traindata, setTraindata] = useState([]);

  function searchTrain() {
    fetch(
      `https://indian-railway-irctc.p.rapidapi.com/api/trains-search/v1/train/${trainName}?isH5=tr`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-key':
            'b668c93063msh80f07aa94e8e855p156fe9jsnff3f9108835d',
          'x-rapidapi-host': 'indian-railway-irctc.p.rapidapi.com',
          'x-rapid-api': 'rapid-api-database',
        },
      },
    )
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setTraindata(data.body[0].trains);
      });
  }

  function redirecttochatroom(train_details) {
    const train_number = train_details.trainNumber;
    const date = moment();
    const today_date = date.format('YYYY-MM-DD');
    const DocumentID = `${train_number}_${today_date}`;
    const chatRef = firestore().collection('chatrooms').doc(DocumentID);

    // Calculate expiry based on last station schedule
    const schedule = train_details.schedule;
    if (!schedule || schedule.length === 0) {
      console.log('🚨 Train schedule is missing or empty');
      return;
    }

    const lastStation = schedule[schedule.length - 1];
    const arrivalTime = lastStation.arrivalTime; // e.g. "23:45"
    const dayCount = parseInt(lastStation.dayCount); // e.g. 1 or 2 (if next day arrival)

    const journeyDate = moment().add(dayCount - 1, 'days');
    const fullDateTime = moment(
      `${journeyDate.format('YYYY-MM-DD')} ${arrivalTime}`,
      'YYYY-MM-DD HH:mm',
    );

    const expireTime = firestore.Timestamp.fromDate(fullDateTime.toDate());

    chatRef
      .get()
      .then(docSnapshot => {
        if (docSnapshot.exists && docSnapshot.data()) {
          console.log('Chatroom exists');
          navigation.navigate('chatRoom', {train_details});
        } else {
          console.log('Creating new chatroom with expiry');
          const newData = {
            createdAt: firestore.FieldValue.serverTimestamp(),
            trainNumber: train_number,
            trainName: train_details.trainName || '',
            date: today_date,
            expiresAt: expireTime,
          };
          chatRef.set(newData).then(() => {
            navigation.navigate('chatRoom', {train_details});
          });
        }
      })
      .catch(error => {
        console.error('Error checking/creating document:', error);
      });
  }

  return (
    <View style={styles.mainScreen}>
      {/* //navbar */}
      <View style={styles.navbar}>
        <Text style={styles.logo}>Train Mate</Text>
      </View>
      {/* //searchbar */}

      <View style={styles.searcharea}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 1,
              width: wp('60%'),
              marginLeft: 3,
            }}>
            <TextInput
              placeholder="Train Name/Number"
              style={styles.inputfield}
              value={trainName}
              onChangeText={text => {
                setTrainname(text);
              }}></TextInput>
          </View>

          <View style={styles.seachiconbox}>
            <Pressable onPress={searchTrain}>
              <Image
                source={require('../assets/images/searchicon.png')}
                style={styles.icons}></Image>
            </Pressable>
          </View>
        </View>
      </View>

      <FlatList
        data={traindata}
        renderItem={({item}) => (
          <Traincard
            train={item}
            redirect={() => {
              redirecttochatroom(item);
            }}
          />
        )}></FlatList>
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
    borderBottomWidth: 2,
  },
  logo: {
    color: '#2E8B57',
    fontSize: 30,
    marginLeft: hp('7%'),
    fontWeight: 'bold',
    fontFamily: 'poppins',
    // borderWidth:2
    marginBottom: 8,
  },
  searcharea: {
    margin: 30,
    borderColor: '#FCB454',
    borderWidth: 2,
    borderRadius: 15,
    padding: 6,
  },
  inputfield: {
    color: '#FCB454',
    fontSize: 20,
  },
  seachiconbox: {
    backgroundColor: '#2E8B57',
    padding: 8,
    borderRadius: 10,
  },
  icons: {
    width: 35,
    height: 35,
  },
});
export default Seachtrain;
