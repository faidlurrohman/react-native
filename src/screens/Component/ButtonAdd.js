import React, {useState} from 'react';
import {View, Text, Pressable} from 'react-native';
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {WIDTH, btnAdd} from '../../css/style';
import {colors} from '../../css/color';
import AddAssets from '../Dashboard/Add';

const ButtonAdd = () => {
  const [modalAdd, setShow] = useState(false);

  const showModal = (_val) => {
    setShow(_val);
  };

  return (
    <View style={btnAdd.container}>
      <Pressable
        onPress={() => showModal(!modalAdd)}
        activeOpacity={0.5}
        style={btnAdd.btn}>
        <Ionicons name="add" size={WIDTH / 12} color={colors.white} />
      </Pressable>
      <Modal
        hasBackdrop={false}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        animationInTiming={300}
        animationOutTiming={300}
        isVisible={modalAdd}
        style={{margin: 0}}
        onBackButtonPress={() => showModal(!modalAdd)}>
        <AddAssets showAdd={showModal} />
      </Modal>
    </View>
  );
};

export default ButtonAdd;
