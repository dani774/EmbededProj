import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { get } from 'lodash';
import * as actions from '../actions';
import translation from '../translations/fa.json';
import Form from '../../../UI-Components/Form/Form';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {
  P,
  Icon64,
  Icon24,
  Icon16,
} from '../../../UI-Components/react-native-override';
import * as constants from '../constants';

class DataLabeling extends Component {
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

  render() {
    const { navigation } = this.props;
    const { keyboardShown } = this.state;
    return (
      <ScrollView
        scrollEnabled={keyboardShown}
        keyboardShouldPersistTaps="handled">
        <View style={styles.mainContainer}>
          <View style={styles.headerContainer}>
            <Icon64
              source={require('../assets/images/iot.png')}
              style={styles.middleIcon}
            />
            {/* <P.Bold style={styles.title} size={32}>
              {translation['dataLabeling.test']}
            </P.Bold> */}
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
                  activityLabel: {
                    name: 'activityLabel',
                    label: translation['activityLabel'],
                    type: 'select',
                    defaultValue: 1,
                    data: {
                      1: 'test',
                      2: 'hello',
                      3: 'hi',
                    },
                    size: 'large',
                    mode: 'dialog',
                  },
                }}
                submitButton={{
                  loading: { url: constants.TEST, requestType: 'post' },
                  text: translation['dataLabeling.test'],
                  submitHandler: value => {
                    console.log(value);
                  },
                  style: { marginBottom: hp('6.2%') },
                }}
                clearDataAfterSubmit={true}
              />
            </ScrollView>
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
    marginTop: hp(3),
  },
  middleIcon: {
    alignSelf: 'center',
    width: wp(40),
    height: hp(20),
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
  return bindActionCreators({}, dispatch);
}

const mapStateToProps = state => ({
  //   token: get(state, 'authReducer.token', ''),
});

export default connect(mapStateToProps, mapDispatchToProps)(DataLabeling);
