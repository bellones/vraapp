/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import auth from '@react-native-firebase/auth';
import { useEffect, useState } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { Endereco } from '../model';

export interface IuseAddressModal {
  selecionado: Endereco | undefined;
}

const useAddressModal = ({selecionado}: IuseAddressModal) => {
  navigator.geolocation = require('react-native-geolocation-service');
  const [user, setUser] = useState('');
  const [endereco, setEndereco] = useState<Endereco>();
  const [location, setLocation] = useState({
    longitude: 0,
    latitude: 0,
  });

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        let granted;
        if (Platform.OS === 'android') {
          granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Acesso a Localização',
              message:
                'Precisamos do acesso a sua localização para nossas entregas',
              buttonNeutral: 'Me pergunte depois',
              buttonNegative: 'Cancelar',
              buttonPositive: 'OK',
            },
          );
        } else {
          granted = Geolocation.requestAuthorization('whenInUse');
        }

        if (granted === 'granted') {
          return true;
        } else {
          return false;
        }
      } catch (err) {
        return false;
      }
    };

    const getLocation = () => {
      const result = requestLocationPermission();
      result.then(res => {
        if (res) {
          Geolocation.getCurrentPosition(
            position => {
              setLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              });
            },
            error => {
              // See error code charts below.
              console.log(error.code, error.message);
              setLocation({latitude: 0, longitude: 0});
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
          );
        }
      });
      console.log(location);
    };

    const loadData = async () => {
      getLocation();
      if (selecionado) {
        setEndereco(selecionado);
      }
      const userData = await auth().currentUser?.uid;
      if (userData) {
        setUser(userData);
      }
    };
    loadData();
  }, []);

  return {
    user,
    endereco,
    location,
    showForm,
    setShowForm,
    setEndereco,
  };
};
export default useAddressModal;
