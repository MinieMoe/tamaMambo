import { Ionicons } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';

const DrawerLayout = () => (
  <Drawer>
    <Drawer.Screen
      name="index"
      options={{
        headerTitle: 'Home',
        drawerLabel: 'Home',
        headerShown:false,
        drawerIcon: ({ size, color }) => <Ionicons name="home-outline" size={size} color={color} />,
        drawerType: 'front'
      }}
    />
    <Drawer.Screen
      name="create"
      options={{
        headerTitle: 'Create a new event',
        drawerLabel: 'Form',
        drawerIcon: ({ size, color }) => (
          <Ionicons name="newspaper-outline" size={size} color={color} />
        ),
      }}
    />
  </Drawer>
);

export default DrawerLayout;
