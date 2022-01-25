import React, { Component, Children } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { P } from '../react-native-override';

class CustomPicker extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { errorMessage } = this.props;
    return (
      <View>
        <View
          style={
            errorMessage ? ErrorStyles.container : passiveStyles.container
          }>
          <View>
            {/* <Picker
              textStyle={{ fontSize: wp('4%') }}
              style={{ height: wp('13%') }}
              {...this.props}>
              {this.props.children}
            </Picker> */}
          </View>
        </View>
        {errorMessage ? (
          <P style={ErrorStyles.message}>{errorMessage}</P>
        ) : null}
      </View>
    );
  }
}

const passiveStyles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 12,
    borderStyle: 'solid',
    borderColor: '#9597ab59',
    borderWidth: 1,
  },
});

const ErrorStyles = StyleSheet.create({
  container: {
    ...passiveStyles.container,
    borderColor: '#D23821',
    borderWidth: 2,
  },
  message: {
    color: '#D23821',
    fontSize: 15,
    marginTop: hp('1.6%'),
    textAlign: 'right',
    paddingRight: wp('6%'),
  },
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CustomPicker);
