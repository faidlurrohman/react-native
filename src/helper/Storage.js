import AsyncStorage from '@react-native-async-storage/async-storage';
import {CMBReader} from 'cmbsdk-react-native';

const types = [
  {
    id: 0,
    name: 'Aztec',
    symbology: CMBReader.SYMBOLOGY.Azteccode,
    symbology_name: CMBReader.SYMBOLOGY_NAME.Azteccode,
    status: false,
  },
  {
    id: 1,
    name: 'Codabar',
    symbology: CMBReader.SYMBOLOGY.CodaBar,
    symbology_name: CMBReader.SYMBOLOGY_NAME.CodaBar,
    status: false,
  },
  {
    id: 2,
    name: 'Code 11',
    symbology: CMBReader.SYMBOLOGY.C11,
    symbology_name: CMBReader.SYMBOLOGY_NAME.C11,
    status: false,
  },
  {
    id: 3,
    name: 'Code 25',
    symbology: CMBReader.SYMBOLOGY.C25,
    symbology_name: CMBReader.SYMBOLOGY_NAME.C25,
    status: false,
  },
  {
    id: 4,
    name: 'Code 39',
    symbology: CMBReader.SYMBOLOGY.C39,
    symbology_name: CMBReader.SYMBOLOGY_NAME.C39,
    status: false,
  },
  {
    id: 5,
    name: 'Code 93',
    symbology: CMBReader.SYMBOLOGY.C93,
    symbology_name: CMBReader.SYMBOLOGY_NAME.C93,
    status: false,
  },
  {
    id: 6,
    name: 'Code 128',
    symbology: CMBReader.SYMBOLOGY.C25,
    symbology_name: CMBReader.SYMBOLOGY_NAME.C25,
    status: false,
  },
  {
    id: 7,
    name: 'Data Matrix',
    symbology: CMBReader.SYMBOLOGY.DataMatrix,
    symbology_name: CMBReader.SYMBOLOGY_NAME.DataMatrix,
    status: false,
  },
  {
    id: 8,
    name: 'DotCode',
    symbology: CMBReader.SYMBOLOGY.Dotcode,
    symbology_name: CMBReader.SYMBOLOGY_NAME.Dotcode,
    status: false,
  },
  {
    id: 9,
    name: 'GS1 DataBar (RSS)',
    symbology: CMBReader.SYMBOLOGY.Databar,
    symbology_name: CMBReader.SYMBOLOGY_NAME.Databar,
    status: false,
  },
  {
    id: 10,
    name: 'MaxiCode',
    symbology: CMBReader.SYMBOLOGY.Maxicode,
    symbology_name: CMBReader.SYMBOLOGY_NAME.Maxicode,
    status: false,
  },
  {
    id: 11,
    name: 'MSI Plessey',
    symbology: CMBReader.SYMBOLOGY.Msi,
    symbology_name: CMBReader.SYMBOLOGY_NAME.Msi,
    status: false,
  },
  {
    id: 12,
    name: 'PDF417',
    symbology: CMBReader.SYMBOLOGY.Pdf417,
    symbology_name: CMBReader.SYMBOLOGY_NAME.Pdf417,
    status: false,
  },
  {
    id: 13,
    name: 'Postal Codes',
    symbology: CMBReader.SYMBOLOGY.Postnet,
    symbology_name: CMBReader.SYMBOLOGY_NAME.Postnet,
    status: false,
  },
  {
    id: 14,
    name: 'QR Code',
    symbology: CMBReader.SYMBOLOGY.QR,
    symbology_name: CMBReader.SYMBOLOGY_NAME.QR,
    status: true,
  },
  {
    id: 15,
    name: 'UPC & EAN',
    symbology: CMBReader.SYMBOLOGY.UpcEan,
    symbology_name: CMBReader.SYMBOLOGY_NAME.UpcEan,
    status: false,
  },
];

const _storeData = async (_value) => {
  try {
    const firstStorage = ['@defaultTypes', JSON.stringify(types)];
    const secondStorage = ['@modifiedTypes', JSON.stringify(_value)];
    await AsyncStorage.multiSet([firstStorage, secondStorage]);
  } catch (e) {
    console.log('e', e);
  }
};

const _getData = async () => {
  try {
    const valueTypes = await AsyncStorage.multiGet([
      '@defaultTypes',
      '@modifiedTypes',
    ]);
    if (valueTypes) {
      return valueTypes;
    }
    return null;
  } catch (e) {
    console.log('e', e);
  }
};

const _clearData = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.log('e', e);
  }
};

export {_getData, _storeData, _clearData, types};
