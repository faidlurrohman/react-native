import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const userStore = firestore().collection('user');

const authLogin = async (_user) => {
  try {
    const SWEAP = await auth().signInWithEmailAndPassword(
      _user.emailUsername,
      _user.password,
    );
    if (SWEAP) {
      return SWEAP;
    }
  } catch (error) {
    // console.log('error', error);
    return error;
  }
  // auth()
  //   .signInWithEmailAndPassword(_user.emailUsername, _user.password)
  //   .then((authRes) => {
  //     return authRes;
  //   })
  //   .catch((error) => {
  //     console.log('eeeee', error);
  //     return error;
  //     // if (error.code === 'auth/email-already-in-use') {
  //     //   console.log('That email address is already in use!');
  //     // }

  //     // if (error.code === 'auth/invalid-email') {
  //     //   console.log('That email address is invalid!');
  //     //   return 'That email address is invalid!';
  //     // }
  //     // return false;
  //   });
};

const authCreate = (_user) => {
  auth()
    .createUserWithEmailAndPassword(_user.email, _user.password)
    .then((authRes) => {
      storeUser(authRes, _user);
    })
    .catch((error) => {
      console.error(error);
      // if (error.code === 'auth/email-already-in-use') {
      //   console.log('That email address is already in use!');
      // }

      // if (error.code === 'auth/invalid-email') {
      //   console.log('That email address is invalid!');
      // }
    });
};

const storeUser = async (_auth, _user) => {
  try {
    const storeNewUser = await userStore.doc(_auth.user._user.uid).set({
      email: _auth.user._user.email,
      username: _user.username,
      emailVerified: _auth.user._user.emailVerified,
      fullname: null,
      firstname: null,
      middlename: null,
      lastname: null,
      phoneNumber: null,
      photoUrl: null,
      address: null,
      birth: null,
    });
    console.log('storeNewUser', storeNewUser);
  } catch (e) {
    console.error(e);
  }
};

const authSignOut = () => {
  auth()
    .signOut()
    .then(() => {
      console.log('auth sign out');
    });
};

export {authLogin, authCreate, authSignOut};
