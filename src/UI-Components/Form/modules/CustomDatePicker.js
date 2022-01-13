import React from 'react';
import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker';
import CustomModal from "../../../containers/modal/CustomModal";
import Input from '../../Input/Input';
import moment from 'moment-jalaali';
import { Keyboard } from 'react-native';

export default class CustomDatePicker extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        modalVisible: false,
        selectedDate: this.props.placeholder.search('-') !== -1 ? this.props.placeholder : '',
      }
    }

  onHandleFocus = () => {
    Keyboard.dismiss();
    this.setState({
        modalVisible: true
    });
  };

  handleDateChange = (newDate) => {
    const { setValue } = this.props;
    this.setState({modalVisible: false, selectedDate: getFormatedDate(newDate, 'YYYY-MM-DD')});
    if(setValue) {
      // convert jalali to gregorian
      setValue(moment(newDate,'jYYYY-jMM-jDD').format('YYYY-MM-DD'));
    }
  }

  handleClose = () => {
    this.setState({
      modalVisible: false
    });
    Keyboard.dismiss();
  }

    render () {
        const { modalVisible, selectedDate } = this.state;
        const { minimumDate, maximumDate, placeholder, errorMessage } = this.props;
        return (
          <>
            <Input
              onFocus={this.onHandleFocus}
              placeholder={placeholder}
              value={selectedDate}
              withoutLabel
              errorMessage={errorMessage}
            />
            <CustomModal onRequestClose={this.handleClose}  modalVisible={modalVisible}>
              <DatePicker
                options={{
                  mainColor: '#3245E3',
                  defaultFont: 'YekanBakh-Medium'
                }}
                isGregorian={false}
                selected={selectedDate}
                current={selectedDate}
                mode="calendar"
                onDateChange={(newDate) => this.handleDateChange(newDate)}
                minimumDate={minimumDate}
                maximumDate={maximumDate}
              />
            </CustomModal>
          </>
        );
    }
};