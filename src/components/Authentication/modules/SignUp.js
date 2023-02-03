import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { get } from 'lodash';
import * as actions from '../actions';
import translation from '../translations/fa.json';
import Form from '../../../UI-Components/Form/Form';
import { P } from '../../../UI-Components/react-native-override';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import * as constants from '../constants';
import Input from '../../../UI-Components/Input/Input';

class SignUp extends Component {
  mounted = React.createRef();

  constructor(props) {
    super(props);

    this.mounted.current = true;
    this.state = {
      keyboardShown: false,
    };
  }

  async componentDidMount() {
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide,
    );
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide,
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
    this.mounted.current = false;
  }

  _keyboardDidShow = () => {
    if (!this.mounted.current) return;
    this.setState({
      keyboardShown: true,
    });
  };

  _keyboardDidHide = () => {
    if (!this.mounted.current) return;
    this.setState({
      keyboardShown: false,
    });
  };

  handleSignUp = values => {
    const { signUp } = this.props;
    signUp(values);
  };

  handleSuceessSuccessOTP = async data => {};

  render() {
    const { navigation } = this.props;
    const { keyboardShown } = this.state;
    return (
      <ScrollView
        scrollEnabled={keyboardShown}
        keyboardShouldPersistTaps="handled">
        <View style={styles.mainContainer}>
          <View style={styles.headerContainer}>
            <P.Bold style={{ ...styles.title, fontSize: 32 }}>
              {translation['signup.header.title']}
            </P.Bold>
          </View>
          <View
            style={
              keyboardShown
                ? { ...styles.formContainer, minHeight: '100%' }
                : { ...styles.formContainer }
            }>
            <ScrollView keyboardShouldPersistTaps="handled">
              <Form
                navigation={navigation}
                fields={{
                  email: {
                    name: 'email',
                    label: translation['form.phoneNumber.label'],
                    type: 'input',
                    size: 'large',
                    placeholder: translation['form.phoneNumber.placeholder'],
                  },
                  firstName: {
                    name: 'firstName',
                    label: translation['firstName'],
                    type: 'input',
                    size: 'large',
                    placeholder: translation['firstName'],
                  },
                  lastName: {
                    name: 'lastName',
                    label: translation['familyName'],
                    type: 'input',
                    size: 'large',
                    placeholder: translation['familyName'],
                  },
                  password: {
                    name: 'password',
                    label: translation['password'],
                    type: 'input',
                    size: 'large',
                    placeholder: translation['password'],
                  },
                  gender: {
                    name: 'gender',
                    label: translation['gender'],
                    type: 'input',
                    size: 'large',
                    placeholder: translation['gender'],
                  },
                  bloodType: {
                    name: 'bloodType',
                    label: translation['bloodType'],
                    type: 'input',
                    size: 'large',
                    placeholder: translation['bloodType'],
                  },
                  age: {
                    name: 'age',
                    label: translation['age'],
                    type: 'input',
                    size: 'large',
                    keyboardType: 'numeric',
                    placeholder: translation['age'],
                  },
                  height: {
                    name: 'height',
                    label: translation['height'],
                    type: 'input',
                    size: 'large',
                    keyboardType: 'numeric',
                    placeholder: translation['height'],
                  },
                  weight: {
                    name: 'weight',
                    label: translation['weight'],
                    type: 'input',
                    size: 'large',
                    keyboardType: 'numeric',
                    placeholder: translation['weight'],
                  },
                }}
                submitButton={{
                  loading: {
                    url: constants.REQUEST_OTP_URL,
                    requestType: 'post',
                  },
                  text: translation['form.confirmSignUp'],
                  submitHandler: value => this.handleSignUp(value),
                }}
                clearDataAfterSubmit={true}
              />
            </ScrollView>
            <View
              style={{
                ...styles.formFooter,
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('LoginUsername')}>
                <P.Bold size={18} style={styles.formFooterLink}>
                  {translation['signup.formFooter.link']}
                </P.Bold>
              </TouchableOpacity>
              <P
                size={18}
                style={{
                  ...styles.formFooterDesc,
                }}>
                {translation['signup.formFooter.desc']}
              </P>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    height: Dimensions.get('window').width < 380 ? hp('96%') : hp('100%'),
    backgroundColor: '#FFF',
  },
  headerContainer: {
    marginTop: hp('10.7%'),
    justifyContent: 'center',
    marginBottom: hp('7.1%'),
  },
  title: {
    textAlign: 'center',
    color: '#3245E3',
  },
  formContainer: {
    flex: 1,
    width: '90%',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  formFooter: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: hp('3.5%'),
  },
  formFooterLink: {
    marginRight: 8,
    padding: 5,
    color: '#3245E3',
  },
  formFooterDesc: {
    color: '#9597AB',
    padding: 5,
  },
  mainFooter: {
    borderTopColor: '#9597ab33',
    borderTopWidth: 1,
    justifyContent: 'center',
    width: '100%',
    paddingTop: hp('3.2%'),
    paddingBottom: hp('5.3%'),
    justifyContent: 'center',
    alignSelf: 'center',
  },
  mainFooterText: {
    textAlign: 'center',
    color: '#ADAEB2',
    justifyContent: 'center',
  },
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      signUp: actions.signUp,
    },
    dispatch,
  );
}

const mapStateToProps = state => ({
  token: get(state, 'authReducer.token', ''),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
