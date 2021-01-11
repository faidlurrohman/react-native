// import React, {useState} from 'react';
// import {View, ScrollView} from 'react-native';
// import {TextInput, Button, Text} from 'react-native-paper';
// import {SIGNIN} from '../../css/Style';
// import {color} from '../../css/Colors';
// import {authLogin} from '../../config/firebase/Auth';
// import Snack from '../../helper/Snackbar';

// const SignIn = ({navigation}) => {
//   const [loginData, setLoginData] = useState(null);
//   const [loginAction, setLoginAction] = useState(false);
//   const [snackData, setSnackData] = useState(null);
//   const [secureEntry, setSecureEntry] = useState(true);

//   const _loginUser = () => {
//     setLoginAction(true);
//     authLogin(loginData).then((res) => {
//       console.log('res', res);
//       setLoginAction(false);
//       if (res.code === 'auth/invalid-email') {
//         setSnackData({
//           ...snackData,
//           show: true,
//           message: 'The email address is badly formatted.',
//         });
//       }
//       if (res.code === 'auth/wrong-password') {
//         setSnackData({
//           ...snackData,
//           show: true,
//           message:
//             'The password is invalid or the user does not have a password.',
//         });
//       }
//       if (res.code === 'auth/too-many-requests') {
//         setSnackData({
//           ...snackData,
//           show: true,
//           message:
//             'We have blocked all requests from this device due to unusual activity. Try again later.',
//         });
//       }
//     });
//   };

//   return (
//     <View style={SIGNIN.container}>
//       <ScrollView keyboardShouldPersistTaps="handled">
//         <TextInput
//           disabled={loginAction ? true : false}
//           autoCapitalize="none"
//           dense={true}
//           selectionColor={color.aqua}
//           theme={{
//             colors: {
//               primary: color.aqua,
//               underlineColor: 'transparent',
//               text: color.grey,
//             },
//           }}
//           mode="outlined"
//           label="Email or Username"
//           onChangeText={(text) =>
//             setLoginData({...loginData, emailUsername: text})
//           }
//         />
//         <TextInput
//           disabled={loginAction ? true : false}
//           autoCapitalize="none"
//           dense={true}
//           secureTextEntry={secureEntry}
//           selectionColor={color.aqua}
//           theme={{
//             colors: {primary: color.aqua, underlineColor: color.transparent},
//           }}
//           mode="outlined"
//           label="Password"
//           onChangeText={(text) => setLoginData({...loginData, password: text})}
//           right={
//             <TextInput.Icon
//               disabled={loginAction ? true : false}
//               name={secureEntry ? 'eye-off' : 'eye'}
//               color={secureEntry ? color.grey : color.aqua}
//               onPress={() => setSecureEntry(!secureEntry)}
//             />
//           }
//         />
//         <Button
//           theme={{colors: {primary: color.aqua}}}
//           style={SIGNIN.btnSignIn}
//           labelStyle={{
//             color:
//               loginData !== null
//                 ? loginData.emailUsername === '' || loginData.password === ''
//                   ? color.grey
//                   : color.white
//                 : color.grey,
//           }}
//           disabled={
//             loginData !== null
//               ? loginData.emailUsername === '' || loginData.password === ''
//                 ? true
//                 : false
//               : true
//           }
//           mode="contained"
//           loading={loginAction}
//           onPress={loginAction ? null : () => _loginUser()}>
//           Log In
//         </Button>
//       </ScrollView>
//       <View style={SIGNIN.containerFooter}>
//         <Text>Dont have account yet? </Text>
//         <Text
//           style={SIGNIN.btnSignUp}
//           onPress={() => navigation.navigate('SignUp')}>
//           Register!
//         </Text>
//       </View>
//       <Snack _data={snackData} />
//     </View>
//   );
// };

// export default SignIn;
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  UIManager,
  LayoutAnimation,
} from 'react-native';
import {color} from '../../css/Colors';
import {scale, font} from '../../css/Style';

UIManager.setLayoutAnimationEnabledExperimental(true);

const SignIn = ({navigation}) => {
  const [signInAction, setSignInAction] = useState(false);

  const userSignIn = () => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(200, 'linear', 'opacity'),
    );
    setSignInAction((prev) => !prev);
    setTimeout(() => {
      setSignInAction((prev) => !prev);
      LayoutAnimation.configureNext(
        LayoutAnimation.create(200, 'linear', 'opacity'),
      );
    }, 3000);
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: color.aqua,
        padding: scale(18),
      }}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Bla Bla Bla</Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        disabled={signInAction ? true : false}
        style={{
          paddingVertical: signInAction ? scale(13) : scale(18),
          alignItems: 'center',
          alignSelf: 'center',
          backgroundColor: color.white,
          elevation: 1,
          borderRadius: signInAction ? 100 : scale(5),
          width: signInAction ? scale(58) : '100%',
        }}
        onPress={userSignIn}>
        <Text
          style={{
            fontSize: scale(16),
            fontFamily: font('bold'),
            letterSpacing: 1,
            color: color.aqua,
          }}>
          {signInAction ? (
            <ActivityIndicator size={scale(30)} color={color.aqua} />
          ) : (
            'SIGN IN'
          )}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignIn;
