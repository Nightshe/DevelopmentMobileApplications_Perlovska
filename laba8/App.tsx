import React, { useState, useEffect } from 'react'; //side effects
import { View, Text, Button, Modal, StyleSheet, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import Toast from 'react-native-toast-message';

export default function App() {
  //creating and managing component state for all modal windows
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const [loadingVisible, setLoadingVisible] = useState(false);

  const showToast = () => {
    Toast.show({
      type: 'success', //also possible error and info
      text1: 'Something happened!',
      position: 'bottom',
      visibilityTime: 3000, //length of time
      autoHide: true, //the toast will automatically disappear
    });
  };

  const handleFetchData = () => {
    setLoadingVisible(true);
    setTimeout(() => {
      setLoadingVisible(false);
    }, 3000);
  }; //how long the download

  return (
    <View style={styles.container}>
      <Button title="Confirm Action" onPress={() => setConfirmVisible(true)} />
      <Button title="Show Error" onPress={() => setErrorVisible(true)} />
      <Button title="Toast Message" onPress={showToast} />
      <Button title="Fetch Data..." onPress={handleFetchData} />

      {/*Confirm Modal. The modal window will appear and disappear smoothly*/}
      <Modal visible={confirmVisible} transparent animationType="fade"> 
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text>Are you sure?</Text>
            <View style={styles.buttonRow}>
              <Button title="Yes" onPress={() => setConfirmVisible(false)} />
              <Button title="No" onPress={() => setConfirmVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>

      {/*Error Modal*/}
      <Modal visible={errorVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: '#ffdddd' }]}>
            <Text style={{ color: 'red', fontWeight: 'bold' }}>An error occurred!</Text>
            <View style={styles.buttonRow}>
              <Button title="Fix it" onPress={() => setErrorVisible(false)} color="red" />
              <Button title="Ignore it" onPress={() => setErrorVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>

      {/*Loading Modal*/}
      <Modal visible={loadingVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={{ marginTop: 10 }}>Loading...</Text>
          </View>
        </View>
      </Modal>

      {/*add*/}
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 20,
    justifyContent: 'center',
    gap: 12,            //distance between child elements
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    minWidth: '70%',
    alignItems: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 10,
  },
});
