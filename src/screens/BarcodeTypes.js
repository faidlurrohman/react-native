import React, {useEffect, useState} from 'react';
import {View, Switch, StyleSheet, ScrollView} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {Button, Divider, Header, ListItem} from 'react-native-elements';
import {_getData, _storeData, types} from '../helper/Storage';

const BarcodeTypes = ({navigation}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [listTypes, setListTypes] = useState(types);

  const toggleSwitch = (_value, _item, _index) => {
    _getData().then((res) => {
      const configModified = JSON.parse(res[1][1]);
      if (configModified.length >= 0) {
        listTypes.map((data) => {
          if (data.id === _item.id) {
            data.status = _value;
          }
        });
        setIsEnabled((previousState) => !previousState);
        setListTypes(listTypes);
        _storeData(listTypes);
      }
    });
  };

  useEffect(() => {
    _getData().then((res) => {
      const configModified = JSON.parse(res[1][1]);
      if (configModified.length > 0) {
        console.log('ada');
        setListTypes(configModified);
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <Header
        placement="left"
        containerStyle={{
          elevation: 1,
          backgroundColor: '#ffffff',
          justifyContent: 'space-around',
        }}
        leftComponent={
          <Button
            onPress={() => {
              navigation.goBack();
            }}
            type="solid"
            buttonStyle={{borderRadius: 100, backgroundColor: '#ffffff'}}
            icon={<Feather name="arrow-left" size={26} color="#738990" />}
          />
        }
        centerComponent={{
          text: 'BARCODE TYPES',
          style: {
            color: '#738990',
            fontSize: 16,
            fontWeight: 'bold',
          },
        }}
      />
      <ScrollView>
        {listTypes.map((item, index) => (
          <View key={index}>
            <ListItem>
              <ListItem.Content>
                <ListItem.Title
                  style={{color: '#738990', fontWeight: 'bold', fontSize: 16}}>
                  {item.name}
                </ListItem.Title>
              </ListItem.Content>
              <Switch
                trackColor={{false: '#9eadb2', true: '#738990'}}
                thumbColor={item.status ? '#9eadb2' : '#e0e5e7'}
                // ios_backgroundColor="#3e3e3e"
                onValueChange={(value) => toggleSwitch(value, item, index)}
                value={item.status}
              />
            </ListItem>
            <Divider style={{backgroundColor: '#e0e5e7'}} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default BarcodeTypes;
