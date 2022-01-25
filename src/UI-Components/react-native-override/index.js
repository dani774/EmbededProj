import React from 'react';
import { Text, StyleSheet, Image, View } from 'react-native';
import getLanguage from '../../utils/detectLanguage';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

// Override Text Component from react native
export function P(props) {
  let fontWeight = 'YekanBakhFaNum-Medium';
  let size = wp('4.5%');
  if (props.autoFont) {
    fontWeight =
      getLanguage(props.children) === 'en'
        ? 'ProductSans-Regular'
        : 'YekanBakhFaNum-Medium';
  }
  if (props.size) {
    size =
      props.size === 'small'
        ? wp('4%')
        : props.size === 'large'
        ? wp('5%')
        : props.size;
  }
  return (
    <Text
      style={{
        ...styles.p,
        fontFamily: fontWeight,
        fontSize: size,
        ...props.style,
      }}
      ellipsizeMode={props.ellipsizeMode || 'tail'}
      numberOfLines={props.numberOfLines}>
      {props.children}
    </Text>
  );
}
P.Bold = function Bold(props) {
  let fontWeight = 'YekanBakhFaNum-Bold';
  let size = wp('4.5%');
  if (props.autoFont) {
    fontWeight =
      getLanguage(props.children) === 'en'
        ? 'YekanBakhFaNum-Bold'
        : 'YekanBakhFaNum-Bold';
  }
  if (props.size) {
    size =
      props.size === 'small'
        ? wp('4%')
        : props.size === 'large'
        ? wp('5%')
        : props.size;
  }
  return (
    <Text
      style={{
        ...styles.bold,
        fontFamily: fontWeight,
        fontSize: size,
        ...props.style,
      }}
      ellipsizeMode={props.ellipsizeMode || 'tail'}
      numberOfLines={props.numberOfLines}>
      {props.children}
    </Text>
  );
};
P.Regular = function Bold(props) {
  let fontWeight = 'YekanBakhFaNum-Regular';
  let size = wp('4.5%');
  if (props.autoFont) {
    fontWeight =
      getLanguage(props.children) === 'en'
        ? 'ProductSans-Regular'
        : 'YekanBakhFaNum-Regular';
  }
  if (props.size) {
    size =
      props.size === 'small'
        ? wp('4%')
        : props.size === 'large'
        ? wp('5%')
        : props.size;
  }
  return (
    <Text
      style={{
        ...styles.bold,
        fontFamily: fontWeight,
        fontSize: size,
        ...props.style,
      }}
      ellipsizeMode={props.ellipsizeMode || 'tail'}
      numberOfLines={props.numberOfLines}>
      {props.children}
    </Text>
  );
};
P.Heavy = function Heavy(props) {
  let fontWeight = 'YekanBakhFaNum-Heavy';
  let size = wp('4.5%');
  if (props.autoFont) {
    fontWeight =
      getLanguage(props.children) === 'en'
        ? 'YekanBakhFaNum-Heavy'
        : 'YekanBakhFaNum-Heavy';
  }
  if (props.size) {
    size =
      props.size === 'small'
        ? wp('4%')
        : props.size === 'large'
        ? wp('5%')
        : props.size;
  }
  return (
    <Text
      style={{
        ...styles.bold,
        fontFamily: fontWeight,
        fontSize: size,
        ...props.style,
      }}
      ellipsizeMode={props.ellipsizeMode || 'tail'}
      numberOfLines={props.numberOfLines}>
      {props.children}
    </Text>
  );
};
// Override Image Component from react native
export function Icon64(props) {
  return (
    <Image style={{ ...styles.icon64, ...props.style }} source={props.source} />
  );
}
export function Icon24(props) {
  return (
    <Image style={{ ...styles.icon24, ...props.style }} source={props.source} />
  );
}
export function Icon16(props) {
  return (
    <Image style={{ ...styles.icon16, ...props.style }} source={props.source} />
  );
}

export function Item(props) {
  return (
    <View style={{ flexDirection: 'row-reverse' }}>
      {props.icon ? props.icon : null}
      <Icon24 source={props.IconSrc} />
      <View>
        <P.Bold size="large">{props.title}</P.Bold>
        {props.des ? <P size="small">{props.des}</P> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  p: {
    fontSize: wp('4%'),
    color: '#C0C2D5',
  },
  bold: {
    fontSize: wp('5%'),
    color: '#383947',
  },
  icon24: {
    width: wp('8%'),
    height: wp('8%'),
    margin: wp('3%'),
  },
  icon16: {
    width: wp('6%'),
    height: wp('5%'),
    marginLeft: wp('2%'),
    marginRight: wp('2%'),
  },
  icon64: {
    width: wp('14%'),
    height: wp('14%'),
    margin: wp('4%'),
  },
});
