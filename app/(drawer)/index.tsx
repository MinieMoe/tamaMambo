import React, { useState, useEffect, useRef } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import { YStack, H2, Separator, Theme } from 'tamagui';
import MapboxGL from '@rnmapbox/maps';
import { PointAnnotation, Camera, Location } from '@rnmapbox/maps';
import { SearchBar, MyUserLocation } from 'app/components';
import { Coordinate } from 'app/types/Coordinate';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoibWluaWVtb2UiLCJhIjoiY2xsMTh3YmY3MGhseDNsdWpoengyM3RqMyJ9.1O5i2XPiGY76VhkbVVbdrA'
);
// MapboxGL.setConnected(true);

const Page = () => {
  const [userLocation, setUserLocation] = useState<Location | undefined>(undefined);
  const [focusLocation, setFocusLocation] = useState<Coordinate>([-122.335167, 47.608013]);

  const camera = useRef<Camera>(null);

  useEffect(() => {
    camera.current?.setCamera({
      centerCoordinate: focusLocation,
      zoomLevel: 12,
      animationMode: 'flyTo',
    });
  }, [focusLocation]);

  return (
    <Theme name="light">
      <YStack flex={1} alignItems="center" justifyContent="center">
        <MapboxGL.MapView style={styles.map} logoEnabled={false} scaleBarEnabled={false}>
          <Camera ref={camera} />
          <PointAnnotation id="test_marker" coordinate={[-122.335167, 47.608013]} />
          <MyUserLocation onGetLocation={setUserLocation} />
        </MapboxGL.MapView>
        <SearchBar />
        {/* <Separator /> */}
      </YStack>
    </Theme>
  );
};

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: 720,//TODO: hacky, different devices have different height and the map may not cover the top screen without screwing up drawer
  },
});

export default Page;
