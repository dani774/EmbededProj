import React, { Component } from 'react';
import {
    Modal,
    StyleSheet,
    View,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { get, } from 'lodash';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

class CustomModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: this.props.modalVisible || false
        }
    };

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }

    componentWillReceiveProps(nextprops) {
        if(this.state.modalVisible !== nextprops.modalVisible) {
            this.setState({ modalVisible : nextprops.modalVisible})
        }
    }

    render() {
        const { modalVisible } = this.state;
        const { onRequestClose } = this.props;
        if (modalVisible){
            return (
                <View style={styles.centeredView}>

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => onRequestClose()}
                    >
                        <View style={styles.centeredView}>
                            <View style={{...styles.modalView,...this.props.style}}>
                                {this.props.children}
                            </View>
                        </View>
                    </Modal>
                </View>
            );
        }
       return null
    }

}

const styles = StyleSheet.create({
    centeredView: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: '#18192352',
        top:0,
        right:0,
        left:0,
        bottom:0,
        position: 'absolute',
    },
    modalView: {
        marginVertical: hp('3%'),
        width: wp('94%'),
        backgroundColor: "white",
        borderRadius: 15,
        padding: 15,
        // padding: 20,
        // alignItems: "center",
        shadowColor: "#000",
        // shadowOffset: {
        // width: 0,
        // height: 2
        // },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
  });

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
    }, dispatch);
}


const mapStateToProps = state => ({
    token: get(state, 'authReducer.token', ''),
});



export default connect(mapStateToProps, mapDispatchToProps)(CustomModal);
