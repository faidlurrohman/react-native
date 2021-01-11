import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {Button, Header, ListItem, Divider} from 'react-native-elements';
import AwesomeAlert from 'react-native-awesome-alerts';
import {_clearData, _getData, _storeData} from '../helper/Storage';
import {showMessage, hideMessage} from 'react-native-flash-message';

const Settings = ({navigation}) => {
  const [showReset, setShowReset] = useState(false);

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
          text: 'SETTINGS',
          style: {
            color: '#738990',
            fontSize: 16,
            fontWeight: 'bold',
          },
        }}
      />
      <ListItem
        onPress={() => {
          navigation.navigate('BarcodeTypes');
        }}>
        <ListItem.Content>
          <ListItem.Title
            style={{color: '#738990', fontWeight: 'bold', fontSize: 16}}>
            Barcode Types
          </ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron color="#738990" />
      </ListItem>
      <Divider style={{backgroundColor: '#e0e5e7'}} />
      <ListItem>
        <ListItem.Content>
          <ListItem.Title
            style={{color: '#738990', fontWeight: 'bold', fontSize: 16}}>
            Scanner Settings
          </ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron color="#738990" />
      </ListItem>
      <View style={{backgroundColor: '#e0e5e7', height: 6}}></View>
      <ListItem>
        <ListItem.Content>
          <ListItem.Title
            style={{color: '#738990', fontWeight: 'bold', fontSize: 16}}>
            Scan Images
          </ListItem.Title>
          <ListItem.Subtitle style={{color: '#738990'}}>
            Scan Image from gallery
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
      <View style={{backgroundColor: '#e0e5e7', height: 6}}></View>
      <ListItem onPress={() => setShowReset(!showReset)}>
        <ListItem.Content>
          <ListItem.Title
            style={{color: '#738990', fontWeight: 'bold', fontSize: 16}}>
            Reset Default Settings
          </ListItem.Title>
        </ListItem.Content>
      </ListItem>
      <AwesomeAlert
        cancelButtonStyle={{backgroundColor: '#9eadb2'}}
        messageStyle={{color: '#738990'}}
        show={showReset}
        showProgress={false}
        message="Reset Default Settings?"
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="Cancel"
        confirmText="Reset"
        confirmButtonColor="#DD6B55"
        onCancelPressed={() => {
          setShowReset(!showReset);
        }}
        onConfirmPressed={() => {
          _clearData().then(() => {
            _getData().then((res) => {
              if (!res[1][1]) {
                _storeData([]).then(() => {
                  setShowReset(!showReset);
                  showMessage({
                    position: 'bottom',
                    message: 'Reset Default Settings',
                    description: 'Success!',
                    type: 'default',
                    backgroundColor: '#738990',
                    color: '#ffffff',
                  });
                });
              }
            });
          });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    elevation: 1,
  },
});
export default Settings;
