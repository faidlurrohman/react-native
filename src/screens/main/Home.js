import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-paper';
import {authSignOut} from '../../config/firebase/Auth';
import {color} from '../../css/Colors';
import Snack from '../../helper/Snackbar';

const Home = () => {
  const [snackData, setSnackData] = useState(null);

  // useEffect(() => {
  //   effect
  //   return () => {
  //     cleanup
  //   }
  // }, [input])

  return (
    <View>
      <Text>Home</Text>
      <Button
        theme={{
          colors: {
            primary: color.aqua,
            // text: COLOR.white,
          },
        }}
        mode="contained"
        onPress={() => authSignOut()}>
        Log out
      </Button>
      <Snack _data={snackData} />
    </View>
  );
};

export default Home;
