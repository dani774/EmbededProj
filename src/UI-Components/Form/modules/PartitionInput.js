import React from 'react';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {SafeAreaView, Text, StyleSheet} from 'react-native';
import {
  CodeField,
  Cursor,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { Keyboard } from 'react-native';

const styles = StyleSheet.create({
  codeFieldRoot: {
    marginTop: 35,
    justifyContent: 'center',
  },
  cell: {
    width: wp('12.5%'),
    height: wp('17.3%'),
    marginRight: 3.5,
    marginLeft: 3.5,
    lineHeight: 38,
    fontSize: 24,
    fontFamily: 'YekanBakhFaNum-Bold',
    borderWidth: 1,
    borderColor: '#9597ab59',
    textAlign: 'center',
    borderRadius: 7,
    textAlignVertical: 'center',
  },
  focusCell: {
    borderColor: '#ffcc00',
  },
});

const PartitionInput = props => {
  const {value, setValue, cellCount, secureTextEntry} = props;

  const [newProps, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    <SafeAreaView style={styles.root}>
      <CodeField
        {...newProps}
        autoFocus={true}
        value={value}
        onChangeText={(value) => {value.length === cellCount && Keyboard.dismiss();setValue(value)}}
        cellCount={cellCount}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol ? secureTextEntry ? '*' : isFocused ? <Cursor /> : symbol : null}
          </Text>
        )}
      />
    </SafeAreaView>
  );
};

export default PartitionInput;
