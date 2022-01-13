import React from 'react';
import { View, StyleSheet, TouchableOpacity, Switch} from 'react-native';
import { widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { P} from "src/UI-Components/react-native-override";

const ListItems = props => {
  const {ItemsConfig = []} = props;
  const items = [];
  let listStyle = styles.list;
  let itemStyle = styles.item;

  if (props.style) {
    listStyle = {...listStyle, ...props.style}
  }
  if (!props.transparent) {
    listStyle = {...listStyle, ...styles.list2}
    itemStyle = {...itemStyle, ...styles.item2}
  }


  ItemsConfig.forEach((element, index) => {
    items.push(
      <TouchableOpacity
        onPress={() => element.onPress()}
        style={ItemsConfig.length !== index +1 ? itemStyle : {...itemStyle, borderBottomWidth: 0 }} // for remove divider for last item
      >
        {
          element.itemImage &&
        <View style={styles.itemIcon}>
          {element.itemImage}
        </View>
        }
        <View style={styles.itemText}>
          <P.Bold style={{...styles.itemTitle, ...element.textStyle}}>{element.itemName}</P.Bold>
          {element.itemDesc && <P style={styles.itemDescription}>{element.itemDesc}</P>}
        </View>
      </TouchableOpacity>,
    );
  });
  return <View style={listStyle}>{items}</View>;
};

const styles = StyleSheet.create({
  list: {
    marginVertical: wp('5%'),
  },
  itemRight: {
    flexDirection: 'row-reverse',
  },
  itemIcon: {
    marginLeft: wp('5%'),
  },
  itemText: {
    flexDirection: 'column',
  },
  itemTitle: {
    textAlign: 'right',
    color: '#383947',
  },
  itemDescription: {
    fontSize: 14,
    maxWidth: wp('50%'),
    marginTop: 10,
    textAlign: 'right',
    color: '#C0C2D5',
  },
  list2: {
    width: wp('88.5%'),
    alignSelf: 'center',
    backgroundColor: '#FFF',
    borderRadius: 16,
    shadowOpacity: 0.1,
    elevation: 10,
    shadowRadius: 16,
  },
  item: {
    width: wp('96%'),
    paddingVertical: wp('6%'),
    paddingHorizontal: wp('10%'),
    alignSelf: 'center',
    borderRadius: wp('6%'),
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  item2: {
    borderBottomColor: '#9597ab59',
    borderBottomWidth: 1,
  },
  arrowLeft: {
    width: wp('2%'),
    height: wp('3%'),
  },
});

export default ListItems;
