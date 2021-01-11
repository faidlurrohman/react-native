import React, {useState} from 'react';
import {View, Text, FlatList, StyleSheet, Image, Pressable} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {WIDTH} from '../../css/style';
import {colors} from '../../css/color';
import ButtonAdd from '../Component/ButtonAdd';

const DATA = [
  {
    id: '1',
    title: 'Honda Jazz',
    price: '20',
    image: 'https://learn.getgrav.org/system/images/media/thumb-jpg.png',
  },
  {
    id: '2',
    title: 'Motor Mio',
    price: '20',
    image: 'https://learn.getgrav.org/system/images/media/thumb-jpg.png',
  },
  {
    id: '3',
    title: 'Apartment',
    price: '20',
    image: 'https://learn.getgrav.org/system/images/media/thumb-jpg.png',
  },
  {
    id: '4',
    title: 'Hotel',
    price: '20',
    image: 'https://learn.getgrav.org/system/images/media/thumb-jpg.png',
  },
  {
    id: '5',
    title: 'Rumah',
    price: '20',
    image: 'https://learn.getgrav.org/system/images/media/thumb-jpg.png',
  },
  {
    id: '6',
    title: 'Honda Jazz',
    price: '20',
    image: 'https://learn.getgrav.org/system/images/media/thumb-jpg.png',
  },
  {
    id: '7',
    title: 'Motor Mio',
    price: '20',
    image: 'https://learn.getgrav.org/system/images/media/thumb-jpg.png',
  },
  {
    id: '8',
    title: 'Apartment',
    price: '20',
    image: 'https://learn.getgrav.org/system/images/media/thumb-jpg.png',
  },
  {
    id: '9',
    title: 'Hotel',
    price: '20',
    image: 'https://learn.getgrav.org/system/images/media/thumb-jpg.png',
  },
  {
    id: '10',
    title: 'Rumah',
    price: '20',
    image: 'https://learn.getgrav.org/system/images/media/thumb-jpg.png',
  },
];

const DashboardList = ({navigation}) => {
  const [iconChange, setIcon] = useState(false);

  return (
    <View style={{flex: 1, overflow: 'hidden'}}>
      <View
        style={{
          backgroundColor: colors.white,
          paddingBottom: 5,
          elevation: 1,
        }}>
        <View
          style={{
            flexDirection: 'row',
            paddingTop: 10,
            justifyContent: 'space-between',
          }}>
          <View>
            <Pressable
              onPress={() => {
                console.log('more');
              }}
              style={{paddingLeft: 10}}
              activeOpacity={0.5}>
              <Feather name="more-vertical" size={WIDTH / 14} color="#000000" />
            </Pressable>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Pressable
              onPress={() => {
                console.log('search');
              }}
              style={{paddingRight: 10}}
              activeOpacity={0.5}>
              <Feather name="search" size={WIDTH / 14} color="#000000" />
            </Pressable>
            <Pressable
              onPress={() => {
                setIcon(!iconChange);
              }}
              style={{paddingRight: 10}}
              activeOpacity={0.5}>
              <Feather
                name={iconChange ? 'grid' : 'list'}
                size={WIDTH / 14}
                color="#000000"
              />
            </Pressable>
          </View>
        </View>
        <View style={{paddingHorizontal: 10}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <Text style={{fontSize: WIDTH / 20, fontWeight: 'bold'}}>
              Jumlah Asset
            </Text>
            <Text style={{fontSize: WIDTH / 20, fontWeight: 'bold'}}>10</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <Text style={{fontSize: WIDTH / 20, fontWeight: 'bold'}}>
              Nilai Asset
            </Text>
            <Text style={{fontSize: WIDTH / 20, fontWeight: 'bold'}}>
              500 JT
            </Text>
          </View>
        </View>
      </View>
      <FlatList
        key={iconChange ? 'grid' : 'list'}
        data={DATA}
        keyExtractor={(item) => item.id}
        numColumns={iconChange ? 2 : 1}
        renderItem={({item}) => {
          return iconChange ? (
            <Pressable
              style={[styles.grid, {}]}
              onPress={() =>
                navigation.push('DashboardDetails', {dataAssets: item})
              }>
              <Image
                style={{
                  resizeMode: 'contain',
                  width: WIDTH / 2 - 20,
                  height: WIDTH / 2 - 20,
                }}
                source={{
                  uri: item.image,
                }}
              />
              <View style={[styles.gridText, {}]}>
                <Text style={styles.title}>{item.title}</Text>
              </View>
            </Pressable>
          ) : (
            <Pressable
              style={styles.item}
              onPress={() =>
                navigation.push('DashboardDetails', {dataAssets: item})
              }>
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
      <ButtonAdd />
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
  grid: {
    flex: 1,
    backgroundColor: colors.white,
    elevation: 1,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  gridText: {
    position: 'absolute',
    bottom: 10,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: WIDTH / 20,
    fontWeight: 'bold',
  },
});

export default DashboardList;
