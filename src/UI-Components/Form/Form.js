import React, {Component} from 'react';
import {View, StyleSheet, Picker} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {get} from 'lodash';
import Input from '../Input/Input';
import Button from '../../UI-Components/Button';
import PartitionInput from './modules/PartitionInput';
import CustomPicker from '../customPicker/CustomPicker';
import CustomDatePicker from '../../UI-Components/Form/modules/CustomDatePicker';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {P} from '../react-native-override';
import * as formActions from '../Form/actions';
import getLanguage from '../../utils/detectLanguage';
import Message from '../message/Message';
import translations from './translations/fa.json';
class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const {navigation, clearDataAfterSubmit = false} = this.props;
    if (navigation) {
      this.unsubscribeFocus = navigation.addListener('focus', () => {
        this.clearErrors();
      });
      this.unsubscribeBlur = navigation.addListener('blur', () => {
        this.clearErrors();
        // clear sensitive data after use that (MSTG-STORAGE‑10)
        if (clearDataAfterSubmit) {
          const {fields} = this.props;
          // fill all inputs with empty string even user didnt touch the input
          let Data = {};
          Object.keys(fields).map(key => {
            if (key === 'doubleFields') {
              Object.keys(fields.doubleFields).map(dkey => {
                Data[dkey] = '';
              });
            } else {
              Data[key] = '';
            }
          });
          Data = {...Data, ...this.state};

          Object.keys(Data).map(keyElement => {
            this.setState({[keyElement]: ''});
          });
        }
      });
    }
  }

  componentWillUnmount() {
    const {navigation} = this.props;
    if (navigation) {
      this.unsubscribeFocus();
      this.unsubscribeBlur();
    }
    this.clearErrors();
  }

  componentWillReceiveProps(nextProps) {
    Object.keys(nextProps.fields).map(key => {
      const newDefaultValue = nextProps.fields[key]?.defaultValue;
      const oldDefaultValue = this.props.fields[key]?.defaultValue;

      if (newDefaultValue && oldDefaultValue !== newDefaultValue) {
        this.handleInputs(newDefaultValue, key);
      }
    });
  }

  clearErrors = () => {
    const {setErrors} = this.props;
    setErrors([], {});
  };

  // set the inputs value in form state, base on input name
  handleInputs = (value, filedName) => {
    if (filedName === 'mobile') {
      if (String(value).length <= 11) {
        // prevent insert more than 11 numbers in 'mobile' fileds
        this.setState({
          [filedName]: value,
        });
      }
    } else if (filedName === 'username' || filedName === 'email') {
      if (getLanguage(value[value.length - 1]) === 'en') {
        this.setState({
          [filedName]: value,
        });
      }
    } else {
      this.setState({
        [filedName]: value,
      });
    }
  };

  // send all inputs data to the parent submit handler
  handleSubmit = () => {
    const {submitButton, fields} = this.props;
    // fill all inputs with empty string even user didnt touch the input
    let canSubmit = true;
    let Data = {};
    Object.keys(fields).map(key => {
      if (key === 'doubleFields') {
        Object.keys(fields.doubleFields).map(dkey => {
          Data[dkey] = '';
        });
      } else {
        Data[key] = '';
      }
    });
    Data = {...Data, ...this.state};
    const reportedErrors = [];
    const errorDetails = {};
    Object.keys(fields).map(key => {
      if (key === 'doubleFields') {
      } else {
        if (fields[key].name === 'phone') {
          const phoneRegex = /^09[0-9]{9}$/;
          if (!phoneRegex.test(this.state[key])) {
            canSubmit = false; // prevent to execute submit of parent

            reportedErrors.push(key);
            errorDetails[key] = translations['form.phoneFormat.error'];
          }
        } else if (fields[key].name === 'email') {
          const emailRegex =
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})\s*)$/;
          if (!fields[key].nonRequirement || this.state[key]) {
            if (!emailRegex.test(this.state[key])) {
              canSubmit = false; // prevent to execute submit of parent

              reportedErrors.push(key);
              errorDetails[key] = translations['form.emailFormat.error'];
            }
          }
        }
      }
    });
    this.props.setErrors(reportedErrors, errorDetails);
    if (canSubmit) {
      this.props.setErrors([], {});
      submitButton.submitHandler(Data);
    }
  };

  render() {
    const {
      fields,
      doubleButtons,
      submitButton,
      cancelButton,
      middleText,
      formStyle,
      backendErrorDetail,
    } = this.props;
    // disable button when any field be empty
    if (Object.keys(this.state).length === 0) {
      submitButton.disableButton = true;
    } else {
      for (const [key, value] of Object.entries(fields)) {
        submitButton.disableButton = false;
        if (key === 'doubleFields') {
          for (const [key, value] of Object.entries(fields.doubleFields)) {
            submitButton.disableButton = false;
            if (!this.state[key] && !fields.doubleFields[key].nonRequirement) {
              submitButton.disableButton = true;
            }
          }
        } else if (!this.state[key] && !fields[key].nonRequirement) {
          submitButton.disableButton = true;
        }
      }
    }

    return (
      <View style={{...formStyle}}>
        <View>
          {/* <KeyboardAwareScrollView> */}
          <RenderInputs
            fields={fields}
            handleInputs={this.handleInputs}
            backendErrorDetail={backendErrorDetail}
            {...this.state}
          />
          {backendErrorDetail.non_field_errors ? (
            <P size={15} style={styles.errorMessage}>
              {backendErrorDetail.non_field_errors}
            </P>
          ) : null}
          {/* </KeyboardAwareScrollView> */}
        </View>
        {middleText ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flexGrow: 1,
            }}>
            {middleText}
          </View>
        ) : null}
        <RenderSubmit
          doubleButtons={doubleButtons}
          submitButton={submitButton}
          cancelButton={cancelButton}
          handleSubmit={this.handleSubmit}
        />
      </View>
    );
  }
}

// component that return all inputs of form
const RenderInputs = props => {
  const {fields, handleInputs, backendErrorDetail, handleSubmit} = props;
  let inputs = [];
  let list = [];
  const switcher = (obj, key) => {
    switch (obj[key].type) {
      case 'input':
        return (
          <View style={styles.inputContainer}>
            <Input
              {...obj[key]}
              onChangeText={value => handleInputs(value, key)}
              value={props[key]}
              errorMessage={backendErrorDetail[key]}
            />
          </View>
        );

      case 'partitionInput':
        return (
          <View style={styles.inputContainer}>
            <PartitionInput
              handleSubmit={handleSubmit}
              setValue={value => handleInputs(value, key)}
              value={props[key]}
              defaultValue={obj[key]?.defaultValue}
              {...obj[key]}
            />
          </View>
        );

      case 'datePicker':
        return (
          <View style={styles.inputContainer}>
            <CustomDatePicker
              errorMessage={backendErrorDetail[key]}
              setValue={value => handleInputs(value, key)}
              {...obj[key]}
            />
          </View>
        );

      case 'select':
        return (
          <View style={styles.inputContainer}>
            <CustomPicker
              style={{height: wp('10%') + 10}}
              mode="dropdown"
              errorMessage={backendErrorDetail[key]}
              onValueChange={(value, index) => handleInputs(value, key)}
              selectedValue={props[key] ? props[key] : obj[key].defaultValue}>
              {
                (Object.keys(obj[key].data).map(dkey => {
                  list.push(
                    <Picker.Item label={obj[key].data[dkey]} value={dkey} />,
                  );
                }),
                list)
              }
            </CustomPicker>
          </View>
        );
      default:
        break;
    }
  };

  const handleInputWidth = obj => {
    let doubleFields = [];
    Object.keys(obj).map(key => {
      if (key === 'doubleFields') {
        Object.keys(fields.doubleFields).map(dkey => {
          doubleFields.push(
            <View style={{width: '45%'}}>
              {switcher(fields.doubleFields, dkey)}
            </View>,
          );
        });

        inputs.push(
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            {doubleFields}
          </View>,
        );
      } else {
        inputs.push(switcher(fields, key));
      }
    });
  };

  handleInputWidth(fields);
  return inputs;
};

// component of Submit buttons of form
const RenderSubmit = props => {
  const {doubleButtons, submitButton, cancelButton, handleSubmit} = props;
  const {disableButton = false} = submitButton;
  return doubleButtons ? (
    <View style={styles.doubleSubmitContainer}>
      <Button
        icon={submitButton.icon ? submitButton.icon : null}
        style={{...styles.doubleButtonSubmit, ...submitButton.style}}
        loading={submitButton.loading}
        textStyle={{
          color:
            submitButton.style && submitButton.style.color
              ? submitButton.style.color
              : '#3245E3',
          ...styles.doubleButtonsText,
        }}
        onPress={!disableButton ? handleSubmit : null}>
        {submitButton.text}
      </Button>
      <Button
        icon={cancelButton.icon ? submitButton.icon : null}
        loading={submitButton.loading}
        style={{...styles.doubleButtonCancel, ...cancelButton.style}}
        textStyle={{color: '#9597AB', ...styles.doubleButtonsText}}
        onPress={cancelButton.cancelHandler}>
        {cancelButton.text}
      </Button>
    </View>
  ) : (
    <View style={styles.submitContainer}>
      <Button
        icon={submitButton.icon ? submitButton.icon : null}
        style={{
          backgroundColor: disableButton ? 'rgba(149,151,171,0.32)' : '#ffcc00',
          ...styles.singleButton,
          ...submitButton.style,
        }}
        textStyle={{
          color:
            submitButton.style && submitButton.style.color
              ? submitButton.style.color
              : disableButton
              ? 'white'
              : '#181923',
        }}
        onPress={
          !disableButton
            ? handleSubmit
            : () => {
                Message('normal', translations['form.fillTheBlank'], true);
              }
        }
        loading={submitButton.loading}>
        {submitButton.text}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: hp('1.6%'),
    marginBottom: hp('1.6%'),
  },
  submitContainer: {
    marginTop: hp('5.3%'),
    marginBottom: hp('1%'),
  },
  singleButton: {
    alignSelf: 'center',
    width: '100%',
    height: wp('15%'),
  },
  doubleSubmitContainer: {
    width: '100%',
    flexDirection: 'row',
    marginTop: hp('5.3%'),
    marginBottom: hp('1%'),
    justifyContent: 'flex-start',
    paddingLeft: 20,
  },
  doubleButtonSubmit: {
    backgroundColor: 'transparent',
    right: 20,
    flex: 0,
  },
  doubleButtonCancel: {
    backgroundColor: 'transparent',
    flex: 0,
  },
  doubleButtonsText: {
    alignSelf: 'flex-start',
  },
  errorMessage: {
    color: '#D23821',
    fontSize: 15,
    marginTop: hp('1.3%'),
    textAlign: 'right',
    paddingRight: wp('6%'),
  },
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setErrors: formActions.setErrors,
    },
    dispatch,
  );
}

const mapStateToProps = state => ({
  token: get(state, 'authReducer.token', ''),
  backendErrors: get(state.FormReducer, 'errors', []),
  backendErrorDetail: get(state.FormReducer, 'errorDetail', []),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
