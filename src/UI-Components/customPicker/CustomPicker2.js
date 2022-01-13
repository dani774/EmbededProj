import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RNPickerSelect from 'react-native-picker-select';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {P} from "../react-native-override";


class CustomPicker2 extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        const { errorMessage } = this.props;
        const items=[];
        Object.keys(this.props.data).map((item)=>items.push({ label: this.props.data[item], value: item}))
        return (
            <View>
                <View style={errorMessage ? ErrorStyles.container : passiveStyles.container}>
                    <View>
                        <RNPickerSelect
                            onValueChange={(value, index) => this.props.onValueChange(value, index)}
                            placeholder={this.props.label ?{ label: this.props.label, value: null } : {}}
                            items={items}
                            useNativeAndroidPickerStyle={false}
                            style={pickerStyle}
                            value={this.props.selectedValue}
                            Icon={() => {
                                return (
                                    <View style={{ width: wp('30%')}}>
                                    </View>

                                );
                            }}
                        />
                    </View>
                </View>
                {
                    errorMessage
                        ? (
                            <P style={ErrorStyles.message}>
                                {errorMessage}
                            </P>
                        ) : null
                }
            </View>
        );
    }

}
const pickerStyle = {
    inputIOS: {
        color: '#9597AB',
    },
    inputAndroid: {
        color: '#9597AB',
        fontSize: 16,
        paddingRight: 10,
        fontFamily: 'YekanBakhFaNum-Medium',
        fontWeight: 'unset',
    },
    placeholderColor: 'white',
    underline: { borderTopWidth: 0 },
};

const passiveStyles = StyleSheet.create({
    container: {

        paddingHorizontal: 5,
        borderRadius: 12,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'rgba(173,174,178,0.32)',
    },
})

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
})

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
    }, dispatch);
}


const mapStateToProps = state => ({
});



export default connect(mapStateToProps, mapDispatchToProps)(CustomPicker2);
