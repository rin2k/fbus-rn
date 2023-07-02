import React from "react";
import { Modal, StyleSheet, View } from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";
import Header from "./header";

const QRCodeScannerPopup = (props) => {
  const { visible, setVisible, onBarCodeRead } = props;

  const handleClose = () => {
    setVisible(false);
  };
  return (
    <Modal
      visible={visible}
      statusBarTranslucent
      onRequestClose={handleClose}
      animationType={"slide"}
    >
      <View style={styles.container}>
        <Header title={"Scanner Qr Code"} onBackPress={handleClose} />
        <QRCodeScanner
          onRead={(data) => {
            onBarCodeRead?.(data);
          }}
          showMarker
          reactivate
          reactivateTimeout={1000}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
  },
});

export default QRCodeScannerPopup;
