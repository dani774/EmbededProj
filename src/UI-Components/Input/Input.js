import React, {Component} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {P} from '../react-native-override';
import getLanguage from '../../utils/detectLanguage';

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      secureText: props.secureTextEntry,
    };
  }

  onHandleFocus = () => {
    const {onFocus} = this.props;
    this.setState({
      isActive: true,
    });
    if (onFocus) {
      onFocus();
    }
  };

  onHandleBlur = () => {
    const {onBlur} = this.props;
    this.setState({
      isActive: false,
    });
    if (onBlur) {
      onBlur();
    }
  };

  render() {
    const {isActive} = this.state;
    const {
      placeholder,
      label,
      backColor,
      onChangeText,
      secureTextEntry,
      keyboardType,
      value = '',
      errorMessage,
      size,
      textAlign,
      helpMessage,
      editable,
    } = this.props;
    return (
      <View>
        <View
          style={[
            errorMessage
              ? ErrorStyles.container
              : isActive
              ? activeStyles.container
              : passiveStyles.container,
          ]}>
          {
            label ? (
              <P
                style={{
                  ...(errorMessage
                    ? ErrorStyles.label
                    : isActive
                    ? activeStyles.label
                    : value !== '' && value
                    ? passiveStyles.label
                    : {display: 'none'}),
                  backgroundColor: backColor ? backColor : 'white',
                }}>
                {label}
              </P>
            ) : null
          }
          <View>
            <TouchableOpacity
              onPress={() =>
                this.setState({secureText: !this.state.secureText})
              }
              style={{
                ...passiveStyles.eyeIcon,
                display: secureTextEntry ? 'flex' : 'none',
              }}>
            </TouchableOpacity>
            <TextInput
              style={{
                ...(errorMessage
                  ? ErrorStyles.inputStyle
                  : isActive
                  ? activeStyles.inputStyle
                  : passiveStyles.inputStyle),
                textAlign: !textAlign ? getLanguage(value || placeholder) === 'fa' ? 'right' : 'left' : isActive || value !== '' ? textAlign : 'right', // when secureTextEntry is true and use dynamic textalign , first character not show until user enter second character
                fontSize: size === 'large' ? 20 : 18,
                fontFamily: 'YekanBakhFaNum-Medium',
                padding: size === 'large' ? wp('3.2%') : wp('1.6%'),
                backgroundColor: backColor ? backColor : 'white',
              }}
              onBlur={this.onHandleBlur}
              onFocus={this.onHandleFocus}
              secureTextEntry={this.state.secureText}
              keyboardType={keyboardType}
              placeholder={!isActive ? placeholder : null}
              onChangeText={onChangeText}
              value={value !== placeholder ? value : ''}
              editable={editable}
              placeholderTextColor="#9597AB"
            />
          </View>
        </View>
        {errorMessage ? (
          <P size={15} style={ErrorStyles.message}>
            {errorMessage}
          </P>
        ) : helpMessage ? (
          <P size={15} style={activeStyles.message}>
            {helpMessage}
          </P>
        ) : null}
      </View>
    );
  }
}

const passiveStyles = StyleSheet.create({
  container: {
    paddingTop: 2,
    paddingBottom: 5,
    paddingHorizontal: 5,
    borderRadius: 12,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'rgba(173,174,178,0.32)',
  },
  label: {
    position: 'absolute',
    right: '10%',
    top: -16, // container padding + container borderWidth
    zIndex: 1,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: 'white',
    color: '#9597AB',
    fontSize: 16,
  },
  inputStyle: {
    backgroundColor: 'white',
    fontFamily: 'YekanBakhFaNum-Medium',
    color: '#181923',
  },
  eyeIcon: {
    position: 'absolute',
    top: wp('4%'),
    right: wp('4%'),
    zIndex: 20,
  },
});

const activeStyles = StyleSheet.create({
  container: {
    ...passiveStyles.container,
    borderColor: '#ffcc00',
    borderWidth: 2,
  },
  label: {
    ...passiveStyles.label,
    color: '#ffcc00',
    top: -14, // container padding + container borderWidth
    fontSize: 16,
  },
  inputStyle: {
    ...passiveStyles.inputstyle,
    textAlign: 'left',
    fontFamily: 'YekanBakhFaNum-Medium',
  },
  message: {
    color: '#ADAEB2',
    marginTop: hp('1.6%'),
    textAlign: 'right',
    fontSize: 15,
    paddingRight: wp('5%'),
  },
});

const ErrorStyles = StyleSheet.create({
  container: {
    ...passiveStyles.container,
    borderColor: '#D23821',
    borderWidth: 2,
  },
  label: {
    ...activeStyles.label,
    color: '#D23821',
  },
  inputStyle: {
    ...activeStyles.inputstyle,
  },
  message: {
    color: '#D23821',
    marginTop: hp('1.6%'),
    textAlign: 'right',
    paddingRight: wp('6%'),
    fontSize: 15,
  },
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Input);
