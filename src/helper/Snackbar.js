import React, {useState, useEffect} from 'react';
import {Snackbar} from 'react-native-paper';

const Snack = (props) => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState(null);

  const onDismissSnack = () => {
    setShow((prev) => !prev);
  };

  useEffect(() => {
    if (props._data) {
      setShow(props._data.show);
      setMessage(props._data.message);
    }
  }, [props._data]);

  return (
    // <></>
    <Snackbar visible={show} onDismiss={onDismissSnack} duration={500}>
      {message}
    </Snackbar>
  );
};

export default Snack;
