import Toast from 'react-native-toast-message';
import split from 'lodash/split';
import {View} from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import {P} from "../react-native-override";
import React from "react";


const Message = (type, message, slow)=> {
    let wordNum = split(message, ' ').length;
    let messageDuration;
    if (!slow) {
         messageDuration = Math.max(wordNum / 3, 3);
    } else {
         messageDuration = Math.max(wordNum / 2, 7);
    }
    Toast.show({
        type: type, // 'success | error | info'
        position: 'bottom', // 'top | bottom'
        bottomOffset: hp('5%'),
        visibilityTime: messageDuration * 1000,
        text1: message,
    });
}
export default Message;

 export const toastConfig = {
     normal: (internalState) => (
         <View style={{ maxWidth: '90%', backgroundColor: 'rgba(56,57,71,0.8)', color: '#FFFFFF',  borderRadius: 10, paddingHorizontal: wp('7%'), paddingVertical: wp('3.5%')}}>
             <P style={{color: '#FFFFFF'}} size={16}>{internalState.text1}</P>
         </View>
     ),
 };
