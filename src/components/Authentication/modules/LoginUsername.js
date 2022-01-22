import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {get} from 'lodash';
import * as actions from '../actions';
import translation from '../translations/fa.json';
import Form from '../../../UI-Components/Form/Form';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {P} from '../../../UI-Components/react-native-override';
import * as constants from '../constants';

class LoginUsername extends Component {
  constructor(props) {
    super(props);
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
    }
    _keyboardDidShow = () => {
        this.setState({
            keyboardShown: true,
        })
    }
    _keyboardDidHide = () => {
        this.setState({
            keyboardShown: false,
        })
    }
    handleLoginUsername =  value => {
        const {loginAction} = this.props;
        const data = {
            ...value,
        }
        console.log('do you come?', data);
        loginAction(data);
  };

  render() {
    const {navigation} = this.props;
    const {keyboardShown} = this.state;
    return (
      <ScrollView
        scrollEnabled={keyboardShown}
        keyboardShouldPersistTaps="handled">
        <View style={styles.mainContainer}>
          <View style={styles.headerContainer}>
            <P.Bold style={styles.title} size={32}>
              {translation['loginPhonenumber.header.title']}
            </P.Bold>
          </View>
          <View
            style={
              keyboardShown
                ? {...styles.formContainer, minHeight: '100%'}
                : {...styles.formContainer}
            }>
            <ScrollView keyboardShouldPersistTaps="handled">
              <Form
                navigation={navigation}
                fields={{
                  username: {
                    name: 'username',
                    label: translation['form.phoneNumber.label'],
                    type: 'input',
                    size: 'large',
                    placeholder: translation['form.phoneNumber.placeholder'],
                  },
                  password: {
                    name: 'password',
                    label: translation['form.password.label'],
                    type: 'input',
                    size: 'large',
                    textAlign: 'left',
                    placeholder: translation['form.password.placeholder'],
                    secureTextEntry: true,
                  },
                }}
                submitButton={{
                  loading: {url: constants.AUTH_URL, requestType: 'post'},
                  text: translation['form.confirmLogin'],
                  submitHandler: value => this.handleLoginUsername(value),
                  style: {marginBottom: hp('6.2%')},
                }}
                clearDataAfterSubmit={true}
              />
            </ScrollView>
          </View>
          <View style={{...styles.formFooter}}>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <P.Bold size={18} style={{...styles.formFooterLink}}>
                {translation['loginPhoneNumber.formFooter.link']}
              </P.Bold>
            </TouchableOpacity>
            <P size={18} style={{...styles.formFooterDesc}}>
              {translation['loginPhoneNumber.formFooter.desc']}
            </P>
          </View>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    height: Dimensions.get('window').width < 380 ? hp('96%') : hp('100%'),
  },
  headerContainer: {
    justifyContent: 'center',
    marginTop: hp('10.7%'),
    marginBottom: hp('7.1%'),
  },
  title: {
    textAlign: 'center',
    color: '#3245E3',
  },
  description: {
    marginTop: wp('1%'),
    textAlign: 'center',
    color: '#9597AB',
  },
  formContainer: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
  },
  formFooter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    borderTopColor: '#9597ab33',
    borderTopWidth: 1,
    paddingTop: hp('4%'),
    paddingBottom: hp('6%'),
    width: '100%',
  },
  formFooterLink: {
    marginRight: 8,
    color: '#3245E3',
    padding: 10,
  },
  formFooterDesc: {
    color: '#9597AB',
    padding: 10,
  },
  middleTextContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: hp('5%'),
    marginBottom: hp('6%'),
  },
  middleTextLink: {
    color: '#5D5E70',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      loginAction: actions.Login,
    },
    dispatch,
  );
}
const mapStateToProps = state => ({
  token: get(state, 'authReducer.token', ''),
});
export default connect(mapStateToProps, mapDispatchToProps)(LoginUsername);
