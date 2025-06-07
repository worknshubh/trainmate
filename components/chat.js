import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import auth from '@react-native-firebase/auth';
const Chat = props => {
  return (
    <View
      style={[
        styles.container,
        {
          flexDirection: 'row',
          justifyContent:
            props.messages.senderid === auth().currentUser.uid
              ? 'flex-end'
              : 'flex-start',
        },
      ]}>
      <View style={styles.messageBox}>
        <Text style={{fontWeight: 'bold', marginVertical: 4}}>
          {props.messages.username}
        </Text>
        <Text style={{fontSize: 18, fontFamily: 'Poppins-Regular'}}>
          {props.messages.usermessage}
        </Text>
        <Text
          style={{
            alignSelf: 'flex-end',
            marginVertical: 4,
            fontFamily: 'Poppins-Light',
          }}>
          {props.messages.time}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    padding: 10,
  },
  messageBox: {
    alignSelf: 'flex-start',
    backgroundColor: '#FCB454',
    padding: 8,
    borderRadius: 8,
    elevation: 2,
  },
});

export default Chat;
