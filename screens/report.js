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
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Picker} from '@react-native-picker/picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Toast from 'react-native-toast-message';
import {Linking} from 'react-native';
const Report = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const [userEmail, setUseremail] = useState('');
  const [trainNum, settrainNum] = useState('');
  const [coachnum, setCoachNum] = useState('');
  const [pnrnum, setPNRnum] = useState('');
  const [desc, setDesc] = useState('');
  const reportCategories = [
    'Cleanliness Issue',
    'AC not working ',
    'No Water in Coach',
    'Charging Port Not Working',
    'Loud Noise or Unwanted Behavior',
    ' Smoking Inside Coach',
    'Bedroll Issue',
    'Poor Food Quality',
    'TTE/Staff Misbehavior',
  ];
  function imgupload() {
    launchImageLibrary({mediaType: 'mixed'}, data => {
      console.log(data);
      if (data.didCancel) {
        Toast.show({
          type: 'error',
          text1: 'Failed to upload',
        });
      } else {
        Toast.show({
          type: 'success',
          text1: 'Uploaded Successfully',
        });
      }
    });
  }

  function send_report() {
    const rail_madad = 'railmadad@rb.railnet.gov.in';
    const subject = `TrainMate Complaint - ${selectedValue}`;
    const body = `Hello Railmadad Team\n\n I would like to report the following issue : \n\n Train Number : ${trainNum} PNR Number : ${pnrnum}\n\n Coach : ${coachnum} \n\n Issue : ${desc} \n\n Please look into this matter.\n\nThank you.`;
    const mailtourl = `mailto:${rail_madad}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    Linking.openURL(mailtourl).catch(err => {
      console.error('Failed to open email client:', err);
      Alert.alert('Error', 'Could not open email app.');
    });
  }
  return (
    <ScrollView style={styles.mainScreen}>
      <View style={styles.navbar}>
        <Text style={styles.logo}>Report</Text>
      </View>

      <View
        style={{
          padding: 10,
          borderRadius: 30,
          borderColor: '#FCB454',
          borderWidth: 2,
          margin: 20,
        }}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedValue(itemValue);
          }}>
          <Picker.Item label="Select Issue" value=""></Picker.Item>
          {reportCategories.map((item, index) => (
            <Picker.Item
              key={index}
              label={item}
              value={item}
              style={{color: '#2E8B57', fontSize: 18}}
            />
          ))}
        </Picker>
      </View>

      <View style={{marginHorizontal: 20}}>
        <View style={styles.textinp_box}>
          <TextInput
            placeholder="Enter Your Email"
            style={styles.text_input}
            value={userEmail}
            onChangeText={text => {
              setUseremail(text);
            }}></TextInput>
        </View>
        <View style={styles.textinp_box}>
          <TextInput
            placeholder="Enter Train Number"
            style={styles.text_input}
            keyboardType="number-pad"
            value={trainNum}
            onChangeText={text => {
              settrainNum(text);
            }}></TextInput>
        </View>
        <View style={styles.textinp_box}>
          <TextInput
            placeholder="Enter Coach Number"
            style={styles.text_input}
            value={coachnum}
            onChangeText={text => {
              setCoachNum(text);
            }}></TextInput>
        </View>
        <View style={styles.textinp_box}>
          <TextInput
            placeholder="Enter PNR Number"
            style={styles.text_input}
            keyboardType="number-pad"
            value={pnrnum}
            onChangeText={text => {
              setPNRnum(text);
            }}></TextInput>
        </View>
        <View style={[styles.textinp_box, {height: 150}]}>
          <TextInput
            placeholder="Description"
            style={styles.text_input}
            multiline
            value={desc}
            onChangeText={text => {
              setDesc(text);
            }}></TextInput>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <View style={{overflow: 'hidden', borderRadius: 30}}>
            <Pressable
              style={{
                backgroundColor: '#FF9B17',
                padding: 20,
                width: 180,
                borderRadius: 30,
              }}
              onPress={imgupload}
              android_ripple={{color: '#FCB454'}}>
              <View>
                <Text
                  style={{fontSize: 18, textAlign: 'center', color: '#2E8B57'}}>
                  Upload Proof
                </Text>
              </View>
            </Pressable>
          </View>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              marginVertical: 10,
              borderRadius: 30,
              overflow: 'hidden',
            }}>
            <Pressable
              style={{
                backgroundColor: '#FF9B17',
                padding: 20,
                width: 180,
                borderRadius: 30,
              }}
              onPress={send_report}
              android_ripple={{color: '#FCB454'}}>
              <View>
                <Text
                  style={{fontSize: 18, textAlign: 'center', color: '#2E8B57'}}>
                  Report
                </Text>
              </View>
            </Pressable>
          </View>
          <View style={{height: 50}}></View>
        </View>
      </View>
      <Toast />
    </ScrollView>
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
  text_input: {
    fontSize: 20,
    color: '#2E8B57',
  },
  textinp_box: {
    marginVertical: 5,
    borderRadius: 20,
    borderColor: '#FCB454',
    borderWidth: 2,
    padding: 10,
    marginBottom: 15,
  },
});
export default Report;
