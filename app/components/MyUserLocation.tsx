import React, { useState, useEffect } from 'react';
import * as ExpoLocation from 'expo-location';
import { Location } from '@rnmapbox/maps';
import { UserLocation } from '@rnmapbox/maps';

//TODO: what if the user deny location access

type MyUserLocationProps = {
    onGetLocation: (location: Location) => void
}

export default function MyUserLocation({onGetLocation}: MyUserLocationProps) {
  const [errorMsg, setErrorMsg] = useState<String>('');

  useEffect(() => {
    (async () => {
      let { status } = await ExpoLocation.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      //ask user to turn on gps to get location
      await ExpoLocation.getCurrentPositionAsync({});
    })();
  }, []);

  return (
    <UserLocation
      visible={true}
      androidRenderMode="normal"
      onUpdate={(location) => {
        onGetLocation(location)
      }}
    />
  );
}
