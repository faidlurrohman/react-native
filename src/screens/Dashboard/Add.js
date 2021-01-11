import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  Platform,
  ScrollView,
} from 'react-native';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import ImagePicker from 'react-native-image-crop-picker';
import Feather from 'react-native-vector-icons/Feather';
import {colors} from '../../css/color';
import {HEIGHT, WIDTH} from '../../css/style';

const AddAssets = (props) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [datePickerVisible, setDatePicker] = useState(false);
  const [cameraVisible, setCamera] = useState(false);
  const [fileVisible, setFile] = useState(false);

  // useEffect(() => {
  //   var date = new Date().getDate();
  //   var month = new Date().getMonth() + 1;
  //   var year = new Date().getFullYear();
  //   setCurrentDate(`${date} ${month} ${year}`);
  // }, []);

  const _changeDatePicker = (event, selectedDate) => {
    console.log('selectedDate', selectedDate);
    console.log('event', event);
    const value = selectedDate || currentDate;
    setDatePicker(Platform.OS === 'ios');
    setCurrentDate(value);
  };

  const _openCamera = (cropping, mediaType = 'photo') => {
    ImagePicker.openCamera({
      cropping: cropping,
      width: 500,
      height: 500,
      includeExif: true,
      mediaType,
    })
      .then((image) => {
        console.log('received camera image', image);
        // this.setState({
        //   photosModal: false,
        //   createImage: {
        //     uri: image.path,
        //     width: image.width,
        //     height: image.height,
        //     mime: image.mime,
        //   },
        // });
        setCamera(!cameraVisible);
      })
      .catch(() => setCamera(!cameraVisible));
  };

  const _openFile = (cropit, circular = false) => {
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: cropit,
      cropperCircleOverlay: circular,
      sortOrder: 'none',
      compressImageMaxWidth: 1000,
      compressImageMaxHeight: 1000,
      compressImageQuality: 1,
      compressVideoPreset: 'MediumQuality',
      includeExif: true,
    })
      .then((image) => {
        console.log('received file image', image);
        // this.setState({
        //   photosModal: false,
        //   createImage: {
        //     uri: image.path,
        //     width: image.width,
        //     height: image.height,
        //     mime: image.mime,
        //   },
        // });
        setFile(!fileVisible);
      })
      .catch(() => setFile(!fileVisible));
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      <View
        style={{
          paddingHorizontal: 10,
          paddingVertical: 14,
          elevation: 1,
          backgroundColor: colors.white,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View>
          <Pressable
            style={{paddingLeft: 10}}
            activeOpacity={0.5}
            onPress={() => props.showAdd(false)}>
            <Feather name="arrow-left" size={WIDTH / 14} color="#000000" />
          </Pressable>
        </View>
        <View style={{paddingHorizontal: 20}}>
          <Text style={styles.titleHeader}>Add Asset</Text>
        </View>
      </View>
      <ScrollView>
        <View style={{flex: 1, padding: WIDTH / 20}}>
          <View style={{marginBottom: 10}}>
            <Text style={styles.titleInput}>Tanggal</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Feather
                name="calendar"
                size={WIDTH / 18}
                color={colors.black}
                style={{flex: 0, paddingRight: 10}}
              />
              <Pressable
                style={{flex: 1}}
                onPress={() => setDatePicker(!datePickerVisible)}>
                <TextInput
                  editable={false}
                  value={moment(currentDate).format('DD MMMM YYYY')}
                  style={styles.dateInput}
                />
              </Pressable>
            </View>
          </View>
          <View style={{marginBottom: 10}}>
            <Text style={styles.titleInput}>Nilai</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Feather
                name="dollar-sign"
                size={WIDTH / 18}
                color={colors.black}
                style={{flex: 0, paddingRight: 10}}
              />
              <TextInput
                placeholder="Nilai"
                keyboardType="numeric"
                style={styles.inputText}
              />
            </View>
          </View>
          <View style={{marginBottom: 10}}>
            <Text style={styles.titleInput}>Gambar</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Feather
                name="camera"
                size={WIDTH / 18}
                color={colors.black}
                style={{flex: 0, paddingRight: 10}}
              />
              <Pressable
                style={{flex: 1}}
                onPress={() => _openCamera(!cameraVisible)}>
                <TextInput
                  editable={false}
                  value="Ambil Gambar"
                  style={styles.dateInput}
                />
              </Pressable>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Feather
                name="image"
                size={WIDTH / 18}
                color={colors.black}
                style={{flex: 0, paddingRight: 10}}
              />
              <Pressable
                style={{flex: 1}}
                onPress={() => _openFile(!fileVisible)}>
                <TextInput
                  editable={false}
                  value="Pilih Gambar"
                  style={styles.dateInput}
                />
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          flex: 0,
          elevation: 1,
          backgroundColor: colors.black,
          padding: 30,
        }}>
        <Pressable
          style={{
            borderRadius: 5,
            flex: 1,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              textAlign: 'center',
              letterSpacing: 1,
              color: colors.white,
              fontSize: WIDTH / 20,
            }}>
            Add
          </Text>
        </Pressable>
      </View>
      {datePickerVisible && (
        <DateTimePicker
          value={currentDate}
          mode="date"
          display="spinner"
          onChange={_changeDatePicker}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  titleHeader: {
    fontSize: WIDTH / 20,
    fontWeight: 'bold',
  },
  titleInput: {
    fontSize: WIDTH / 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  dateInput: {
    fontSize: WIDTH / 22,
    fontWeight: 'bold',
    color: colors.black,
  },
  inputText: {
    flex: 1,
    fontSize: WIDTH / 22,
    fontWeight: 'bold',
    color: colors.black,
  },
});

export default AddAssets;
