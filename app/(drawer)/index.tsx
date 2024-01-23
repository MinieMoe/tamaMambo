import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { YStack, H2, Separator, Theme } from 'tamagui';
import MapboxGL from '@rnmapbox/maps';
import { PointAnnotation, Camera, Location } from '@rnmapbox/maps';
import { SearchBar, MyUserLocation, SlideupPanel } from 'app/components';
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
        <View style={{ flex: 1, ...StyleSheet.absoluteFillObject }}>
          <MapboxGL.MapView style={styles.map} logoEnabled={false} scaleBarEnabled={false}>
            <Camera ref={camera} />
            <PointAnnotation id="test_marker" coordinate={[-122.335167, 47.608013]} />
            <MyUserLocation onGetLocation={setUserLocation} />
          </MapboxGL.MapView>
          <SlideupPanel />
        </View>
        <SearchBar />
        <Separator />
      </YStack>
    </Theme>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default Page;
