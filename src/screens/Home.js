import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  NativeEventEmitter,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {CMBReader, cmbComponent} from 'cmbsdk-react-native';
import {Button, Header} from 'react-native-elements';
import {_getData, _storeData} from '../helper/Storage';

const scannerListener = new NativeEventEmitter(cmbComponent);
const deviceClass = CMBReader.DEVICE_TYPE.Camera;
const cameraMode = CMBReader.CAMERA_MODE.NoAimer;

const Home = ({navigation}) => {
  const [checkPermiss, setCheckPermiss] = useState(true);
  const [barcodeActive, setBarcodeActive] = useState(null);

  const _setPreview = () => {
    cmbComponent.setPreviewContainerFullScreen();
    cmbComponent.setPreviewOptions(CMBReader.CAMERA_PREVIEW_OPTION.NoZoomBtn);
    // cmbComponent.setPreviewOptions(
    //   CMBReader.CAMERA_PREVIEW_OPTION.NoZoomBtn ||
    //     CMBReader.CAMERA_PREVIEW_OPTION.NoIllumBtn,
    // );
  };

  const _getDevicesType = () => {
    if (Platform.OS === 'android' && Platform.Version >= 23) {
      _requestPermission();
    } else {
      _createReader();
    }
  };

  const _requestPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera permission is required',
          message:
            'You need to allow permission to use the Camera to be able to scan barcodes',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('CMB - You can use the camera');
        setCheckPermiss(false);
        // _createReader();
      } else {
        setCheckPermiss(true);
        console.log('CMB - Camera permission denied');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const _createReader = () => {
    cmbComponent.setCameraMode(cameraMode);
    cmbComponent.loadScanner(deviceClass).then(() => {
      _connectReader();
    });
  };

  const _connectReader = () => {
    cmbComponent
      .getAvailability()
      .then((response) => {
        if (response == CMBReader.AVAILABILITY.Available) {
          cmbComponent
            .connect()
            .then((connectMethodResult) => {
              _configureReader();
              _openScanner();
            })
            .catch((failure) => {
              console.log(
                'CMB - connectReader failed: ' + JSON.stringify(failure),
              );
            });
        }
      })
      .catch((rejecter) => {
        console.log(
          'CMB - getAvailability failed: ' + JSON.stringify(rejecter),
        );
      });
  };

  //----------------------------------------------------------------------------
  // This is an example of configuring the device. In this sample application, we
  // configure the device every time the connection state changes to connected (see
  // the connectionStateChanged event below), as this is the best
  // way to garentee it is setup the way we want it. Not only does this garentee
  // that the device is configured when we initially connect, but also covers the
  // case where an MX reader has hibernated (and we're reconnecting)--unless
  // setting changes are explicitly saved to non-volatile memory, they can be lost
  // when the MX hibernates or reboots.
  //
  // These are just example settings; in your own application you will want to
  // consider which setting changes are optimal for your application. It is
  // important to note that the different supported devices have different, out
  // of the box defaults:
  //
  //    * MX-1xxx Mobile Terminals have the following symbologies enabled by default:
  //        - Data Matrix
  //        - UPC/EAN
  //        - Code 39
  //        - Code 93
  //        - Code 128
  //        - Interleaved 2 of 5
  //        - Codabar
  //    * MX-100 (iOS ONLY) Barcode Reader has the following symbologies enabled by default:
  //        - UPC/EAN
  //        - Code 39
  //        - Code 128
  //        - GS1 Databar
  //        - PDF417
  //        - QR Code
  //    * camera reader has NO symbologies enabled by default
  //
  // For the best scanning performance, it is recommended to only have the barcode
  // symbologies enabled that your application actually needs to scan. If scanning
  // with an MX-1xxx, that may mean disabling some of the defaults (or enabling
  // symbologies that are off by default).
  //
  // Keep in mind that this sample application works with all three types of devices,
  // so in our example below we show explicitly enabling symbologies as well as
  // explicitly disabling symbologies (even if those symbologies may already be on/off
  // for the device being used).
  //
  // We also show how to send configuration commands that may be device type
  // specific--again, primarily for demonstration purposes.
  //----------------------------------------------------------------------------
  const _configureReader = () => {
    _getData().then((res) => {
      const configDefault = JSON.parse(res[0][1]);
      const configModified = JSON.parse(res[1][1]);
      if (configModified.length === 0) {
        configDefault.map((item) => {
          if (item.status) {
            cmbComponent.setSymbology(
              item.symbology,
              item.status,
              item.symbology_name,
            );
          }
        });
      } else {
        configModified.map((item) => {
          if (item.status) {
            cmbComponent.setSymbology(
              item.symbology,
              item.status,
              item.symbology_name,
            );
          }
        });
      }
    });

    //----------------------------------------------
    // Explicitly enable the symbologies we need
    //----------------------------------------------
    // cmbComponent.setSymbology(
    //   CMBReader.SYMBOLOGY.DataMatrix,
    //   true,
    //   CMBReader.SYMBOLOGY_NAME.DataMatrix,
    // );

    //---------------------------------------------------------------------------
    // Below are examples of sending DMCC commands and
    // getting the response in the CMBReader.EVENT.CommandCompleted event
    //---------------------------------------------------------------------------
    // cmbComponent.sendCommand('GET DEVICE.TYPE', 'DEVICE.TYPE');
    // cmbComponent.sendCommand('GET DEVICE.FIRMWARE-VER', 'DEVICE.FIRMWARE-VER');
    cmbComponent.sendCommand(
      'SET DECODER.MAX-SCAN-TIMEOUT 120',
      'DECODER.MAX-SCAN-TIMEOUT',
    );

    //---------------------------------------------------------------------------
    // We are going to explicitly turn off image results (although this is the
    // default). The reason is that enabling image results with an MX-1xxx
    // scanner is not recommended unless your application needs the scanned
    // image--otherwise scanning performance can be impacted.
    //---------------------------------------------------------------------------
    cmbComponent
      .enableImage(true)
      .then((resolve) => {
        console.log('resolve', resolve);
      })
      .catch((failure) => {
        console.log('CMB - enableImage failed: ' + JSON.stringify(failure));
      });

    cmbComponent
      .enableImageGraphics(false)
      .then((resolve) => {})
      .catch((failure) => {
        console.log(
          'CMB - enableImageGraphics failed: ' + JSON.stringify(failure),
        );
      });

    // Do not interrupt scan if application rotates
    cmbComponent.setStopScannerOnRotate(false);

    // //---------------------------------------------------------------------------
    // // Device specific configuration examples
    // //---------------------------------------------------------------------------

    if (deviceClass == CMBReader.DEVICE_TYPE.Camera) {
      //---------------------------------------------------------------------------
      // Phone/tablet/MX-100
      //---------------------------------------------------------------------------

      // Set the SDK's decoding effort to level 3
      cmbComponent.sendCommand('SET DECODER.EFFORT 3', 'DECODER.EFFORT');
    } else if (deviceClass == CMBReader.DEVICE_TYPE.MXReader) {
      //---------------------------------------------------------------------------
      // MX-1xxx
      //---------------------------------------------------------------------------

      //---------------------------------------------------------------------------
      // Save our configuration to non-volatile memory (on an MX-1xxx; for the
      // MX-100/phone, this has no effect). However, if the MX hibernates or is
      // rebooted, our settings will be retained.
      //---------------------------------------------------------------------------
      cmbComponent.sendCommand('CONFIG.SAVE', 'CONFIG.SAVE');
    }

    // cmbComponent.sendCommand(
    //   'GET DEVICE.TYPE',
    //   new Date().getTime().toString(),
    // );
  };

  const _openScanner = () => {
    cmbComponent
      .startScanning()
      .then((resolver) => {
        _eventListener();
      })
      .catch((rejecter) => {});
  };

  const _eventListener = () => {
    //read result
    scannerListener.addListener(
      CMBReader.EVENT.ReadResultReceived,
      (result) => {
        if (result.readResults[0].goodRead) {
          console.log('read result', result);
        }
      },
    );
    //command complete
    scannerListener.addListener(CMBReader.EVENT.CommandCompleted, (result) =>
      console.log('command complete', result),
    );
    //availabilty changed
    scannerListener.addListener(
      CMBReader.EVENT.AvailabilityChanged,
      (result) => {
        console.log('availability changed', result);
      },
    );
    //state change
    scannerListener.addListener(
      CMBReader.EVENT.ConnectionStateChanged,
      (result) => console.log('connection state', result),
    );
  };

  useEffect(() => {
    _getData().then((res) => {
      console.log('res', res);
      if (!res[1][1]) {
        _storeData([]);
      }
    });
    _setPreview();
    _getDevicesType();
    return () => {
      cmbComponent.disconnect();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Header
        containerStyle={{
          elevation: 1,
          backgroundColor: '#ffffff',
          justifyContent: 'space-around',
        }}
        leftComponent={
          <Button
            onPress={() => {
              navigation.navigate('Settings');
            }}
            type="solid"
            buttonStyle={{borderRadius: 100, backgroundColor: '#ffffff'}}
            icon={<Feather name="settings" size={26} color="#738990" />}
          />
        }
        rightComponent={
          <Button
            onPress={() => {
              navigation.navigate('Settings');
            }}
            type="solid"
            buttonStyle={{borderRadius: 100, backgroundColor: '#ffffff'}}
            icon={<Feather name="archive" size={26} color="#738990" />}
          />
        }
      />
      <View style={{padding: 10}}>
        <Button
          disabled={checkPermiss}
          onPress={() => _createReader()}
          title={checkPermiss ? 'Waiting Permission' : 'Start Scan'}
          titleStyle={{
            color: '#ffffff',
            fontSize: 16,
            textTransform: 'uppercase',
          }}
          buttonStyle={
            checkPermiss ? styles.scan_btn_disabled : styles.scan_btn
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  scan_btn: {
    borderRadius: 6,
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: '#738990',
  },
  scan_btn_disabled: {
    borderRadius: 6,
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: '#9eadb2',
  },
});

export default Home;
