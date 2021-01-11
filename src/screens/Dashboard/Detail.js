import React from 'react';
import {View, Text, Pressable, FlatList, Image, StyleSheet} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {colors} from '../../css/color';
import {WIDTH} from '../../css/style';

const DATA = [
  {
    id: '1',
    title: '01 November 2020',
    price: '100 JT (3 Gambar)',
    image: 'https://learn.getgrav.org/system/images/media/thumb-jpg.png',
  },
  {
    id: '2',
    title: '01 November 2020',
    price: '100 JT (3 Gambar)',
    image: 'https://learn.getgrav.org/system/images/media/thumb-jpg.png',
  },
  {
    id: '3',
    title: '01 November 2020',
    price: '100 JT (3 Gambar)',
    image: 'https://learn.getgrav.org/system/images/media/thumb-jpg.png',
  },
  {
    id: '4',
    title: '01 November 2020',
    price: '100 JT (3 Gambar)',
    image: 'https://learn.getgrav.org/system/images/media/thumb-jpg.png',
  },
  {
    id: '5',
    title: '01 November 2020',
    price: '100 JT (3 Gambar)',
    image: 'https://learn.getgrav.org/system/images/media/thumb-jpg.png',
  },
  {
    id: '6',
    title: '01 November 2020',
    price: '100 JT (3 Gambar)',
    image: 'https://learn.getgrav.org/system/images/media/thumb-jpg.png',
  },
];

const DashboardDetails = ({route, navigation}) => {
  const dataAssets = route.params.dataAssets;
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          backgroundColor: colors.white,
          padding: 10,
          elevation: 1,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View>
            <Pressable
              onPress={() => navigation.goBack()}
              style={{paddingLeft: 10}}
              activeOpacity={0.5}>
              <Feather name="arrow-left" size={WIDTH / 14} color="#000000" />
            </Pressable>
          </View>
          <View style={{paddingHorizontal: 20}}>
            <Text style={styles.title}>{dataAssets.title}</Text>
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 10,
            paddingTop: 10,
            backgroundColor: colors.white,
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize: WIDTH / 20, fontWeight: 'bold'}}>Nama</Text>
            <Text style={{fontSize: WIDTH / 20, fontWeight: 'bold'}}>
              Abcdef
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize: WIDTH / 20, fontWeight: 'bold'}}>
              Kategori
            </Text>
            <Text style={{fontSize: WIDTH / 20, fontWeight: 'bold'}}>
              Abcdef
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize: WIDTH / 20, fontWeight: 'bold'}}>
              Catatan
            </Text>
            <Text style={{fontSize: WIDTH / 20, fontWeight: 'bold'}}>
              Abcdef
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize: WIDTH / 20, fontWeight: 'bold'}}>Tag</Text>
            <Text style={{fontSize: WIDTH / 20, fontWeight: 'bold'}}>
              Abcdef
            </Text>
          </View>
        </View>
      </View>
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => {
          return (
            <Pressable disabled={true} style={styles.item}>
              <Image
                style={{
                  resizeMode: 'contain',
                  width: WIDTH / 6,
                  height: WIDTH / 6,
                  borderRadius: 1000,
                }}
                source={{
                  uri: item.image,
                }}
              />
              <View style={{paddingHorizontal: 10}}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.title}>{item.price} JT</Text>
              </View>
            </Pressable>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: colors.white,
    elevation: 1,
    padding: 20,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  title: {
    fontSize: WIDTH / 20,
    fontWeight: 'bold',
  },
});

export default DashboardDetails;
