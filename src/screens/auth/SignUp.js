// import React, {useState} from 'react';
// import {View, ScrollView} from 'react-native';
// import {TextInput, Button, Text, HelperText} from 'react-native-paper';
// import {SIGNUP} from '../../css/Style';
// import {color} from '../../css/Colors';
// import {authCreate} from '../../config/firebase/Auth';

// const SignUp = ({navigation}) => {
//   const [registerData, setRegisterData] = useState(null);
//   const [registerAction, setRegisterAction] = useState(false);
//   const [secPass, setSecPass] = useState(true);
//   const [secRePass, setSecRepass] = useState(true);

//   console.log('registerData', registerData);

//   const _registerUser = () => {
//     setRegisterAction(true);
//     authCreate(registerData).then((resolve) => {
//       console.log('resolve', resolve);
//       setRegisterAction(false);
//     });
//   };

//   const _hasErrors = (_exc) => {
//     if (registerData !== null) {
//       if (_exc === 'email') {
//         if (registerData.email) {
//           return !registerData.email.includes('@');
//         }
//       }
//       if (_exc === 'password') {
//         if (registerData.password) {
//           if (registerData.password.length < 6) return true;
//           else return false;
//         }
//       }
//       if (_exc === 'repassword') {
//         if (registerData.repassword && registerData.password) {
//           if (registerData.repassword !== registerData.password) return true;
//           else return false;
//         }
//       }
//     }
//   };

//   return (
//     <View style={SIGNUP.container}>
//       <ScrollView keyboardShouldPersistTaps="handled">
//         <TextInput
//           autoCapitalize="none"
//           disabled={registerAction ? true : false}
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
//           label="Username"
//           onChangeText={(text) =>
//             setRegisterData({...registerData, username: text})
//           }
//         />
//         <TextInput
//           autoCapitalize="none"
//           disabled={registerAction ? true : false}
//           error={_hasErrors('email')}
//           keyboardType="email-address"
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
//           label="Email"
//           onChangeText={(text) =>
//             setRegisterData({...registerData, email: text})
//           }
//         />
//         <HelperText
//           type="error"
//           visible={_hasErrors('email')}
//           style={{display: _hasErrors('email') ? 'flex' : 'none'}}>
//           Email address is invalid!
//         </HelperText>
//         <TextInput
//           autoCapitalize="none"
//           disabled={registerAction ? true : false}
//           error={_hasErrors('password')}
//           dense={true}
//           secureTextEntry={secPass}
//           selectionColor={color.aqua}
//           theme={{
//             colors: {primary: color.aqua, underlineColor: color.transparent},
//           }}
//           mode="outlined"
//           label="Password"
//           onChangeText={(text) =>
//             setRegisterData({...registerData, password: text})
//           }
//           right={
//             <TextInput.Icon
//               disabled={registerAction ? true : false}
//               name={secPass ? 'eye-off' : 'eye'}
//               color={secPass ? color.grey : color.aqua}
//               onPress={() => setSecPass(!secPass)}
//             />
//           }
//         />
//         <HelperText
//           type="error"
//           visible={_hasErrors('password')}
//           style={{display: _hasErrors('password') ? 'flex' : 'none'}}>
//           Min 6 Characters!
//         </HelperText>
//         <TextInput
//           autoCapitalize="none"
//           disabled={registerAction ? true : false}
//           error={_hasErrors('repassword')}
//           dense={true}
//           secureTextEntry={secRePass}
//           selectionColor={color.aqua}
//           theme={{
//             colors: {primary: color.aqua, underlineColor: color.transparent},
//           }}
//           mode="outlined"
//           label="Re-Enter Password"
//           onChangeText={(text) =>
//             setRegisterData({...registerData, repassword: text})
//           }
//           right={
//             <TextInput.Icon
//               disabled={registerAction ? true : false}
//               name={secRePass ? 'eye-off' : 'eye'}
//               color={secRePass ? color.grey : color.aqua}
//               onPress={() => setSecRepass(!secRePass)}
//             />
//           }
//         />
//         <HelperText
//           type="error"
//           visible={_hasErrors('repassword')}
//           style={{display: _hasErrors('repassword') ? 'flex' : 'none'}}>
//           Password does not match!
//         </HelperText>
//       </ScrollView>
//       <View style={SIGNUP.containerFooter}>
//         <View style={SIGNUP.containerCaption}>
//           <Text>Already have account? </Text>
//           <Text
//             style={SIGNUP.btnSignIn}
//             onPress={() => navigation.navigate('SignIn')}>
//             Login!
//           </Text>
//         </View>
//         <Button
//           theme={{colors: {primary: color.aqua}}}
//           style={SIGNUP.btnSignUp}
//           labelStyle={{
//             color:
//               registerData !== null
//                 ? registerData.username === '' ||
//                   registerData.password === '' ||
//                   registerData.password === '' ||
//                   registerData.respassword === ''
//                   ? color.grey
//                   : color.white
//                 : color.grey,
//           }}
//           disabled={
//             registerData !== null
//               ? registerData.username === '' ||
//                 registerData.email === '' ||
//                 registerData.password === '' ||
//                 registerData.respassword === ''
//                 ? true
//                 : false
//               : true
//           }
//           mode="contained"
//           loading={registerAction}
//           onPress={() => _registerUser()}>
//           Register
//         </Button>
//       </View>
//     </View>
//   );
// };

// export default SignUp;

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

const SignUp = ({navigation}) => {
  const [signUpAction, setSignUpAction] = useState(false);

  const userSignUp = () => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(200, 'linear', 'opacity'),
    );
    setSignUpAction((prev) => !prev);
    setTimeout(() => {
      setSignUpAction((prev) => !prev);
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
        disabled={signUpAction ? true : false}
        style={{
          paddingVertical: signUpAction ? scale(13) : scale(18),
          alignItems: 'center',
          alignSelf: 'center',
          backgroundColor: color.white,
          elevation: 1,
          borderRadius: signUpAction ? 100 : scale(5),
          width: signUpAction ? scale(58) : '100%',
        }}
        onPress={userSignUp}>
        <Text
          style={{
            fontSize: scale(16),
            fontFamily: font('bold'),
            letterSpacing: 1,
            color: color.aqua,
          }}>
          {signUpAction ? (
            <ActivityIndicator size={scale(30)} color={color.aqua} />
          ) : (
            'SIGN UP'
          )}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;
