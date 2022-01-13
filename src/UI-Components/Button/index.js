import React from 'react';
import {TouchableOpacity, StyleSheet, ActivityIndicator} from 'react-native';
import {P} from '../../UI-Components/react-native-override';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {get} from 'lodash';
import {connect} from 'react-redux';

const Button = props => {
  let style = styles.buttonStyle;
  let textStyle = {...styles.textStyle};
  const {loading, inlineLoading} = props;
  const textColor=  props.textStyle && props.textStyle.color
      ? props.textStyle.color
      : '#181923';
  if (typeof props.style !== 'undefined') {
    style = {...style, ...props.style};
  }
  if (props.size && props.size === 'small') {
    style = {...style, ...styles.buttonStyleSmall};
    textStyle = {...textStyle, fontSize: 16};
  }
  if (props.rounded) {
    style={...style, borderRadius: 32 }
  }
  if (props.Shady){
    style={...style, shadowColor: '#3245E352', shadowOpacity: 0.3, elevation: 10, shadowOffset: { width: 0, height: 10 } }
  }
  if (typeof props.textStyle !== 'undefined') {
    textStyle = {...textStyle, ...props.textStyle};
  }
  if (props.icon){
    textStyle = {...textStyle, marginRight: wp('3%')};
  }
  if (props.iconReverse){
    textStyle = {...textStyle, marginLeft: wp('3%')};
  }

  return (
    <TouchableOpacity onPress={props.onPress} style={style}>
      {loading && inlineLoading[loading.url] !== undefined &&
      inlineLoading[loading.url].showLoader && inlineLoading[loading.url].requestType === loading.requestType ? (
        <ActivityIndicator
          size="small"
          color={textColor}
        />
      ) : null}
      {props.icon && props.icon}
      {props.fontWeightMedium
          ? <P style={{marginRight: 5,color:textColor, ...textStyle}} numberOfLines={1}>{props.children}</P>
          :<P.Bold style={{marginRight: 5,color:textColor, ...textStyle}} numberOfLines={1}>{props.children}</P.Bold>
      }
      {props.iconReverse && props.iconReverse}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    alignSelf: 'center',
    fontSize: 18,
  },
  buttonStyle: {
    paddingHorizontal: wp('6%'),
    paddingVertical: wp('3%'),
    backgroundColor: '#ffcc00',
    color: '#000',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row-reverse',
    textAlign: 'center',
    marginLeft: 5,
    marginRight: 5,

  },
  buttonStyleSmall: {
    paddingHorizontal: wp('3%'),
    paddingVertical: wp('1.5%'),
    borderRadius: 5,
  },
});

const mapStateToProps = state => ({
  inlineLoading: get(state, 'loadingReducer.inlineLoading', ''),
});

export default connect(mapStateToProps)(Button);
