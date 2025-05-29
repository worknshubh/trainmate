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

const Traincard = props => {
  return (
    <View style={styles.cardmaiinarea}>
      <Pressable onPress={props.redirect}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={styles.cardmainareatext}>{props.train.trainNumber}</Text>
          <Text style={styles.cardmainareatext}>{props.train.trainName}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            backgroundColor: '#FF9B17',
            padding: 5,
            marginTop: 10,
            borderRadius: 10,
            alignItems: 'center',
          }}>
          <Text>{props.train.origin}</Text>
          <Image
            source={require('../assets/images/arrow.png')}
            style={{height: 18, width: 35}}></Image>
          <Text>{props.train.destination}</Text>
        </View>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  cardmaiinarea: {
    backgroundColor: '#FCB454',
    padding: hp('3%'),
    marginHorizontal: hp('4%'),
    marginVertical: 8,
    borderRadius: 15,
    elevation: 3,
  },
  cardmainareatext: {
    fontSize: hp('2%'),
    color: '#2E8B57',
  },
});
export default Traincard;
