import { Button, Input, XStack, Avatar } from 'tamagui';
import { Search } from '@tamagui/lucide-icons'
import { StyleProp, StyleSheet } from 'react-native';

type SearchBarProps = {
  styles: StyleProp<React.CSSProperties>//TODO: check the type. idk which one
}

export default function SearchBar() {
  return (
    <XStack style={styles.container} alignItems='center' space={"$2"}>
      <Avatar circular>
        <Avatar.Image src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"/>
        <Avatar.Fallback backgroundColor={"$blue10"}/>
      </Avatar>
      <Input placeholder={"Look for events nearby..."} width={'65%'}/>
      <Button icon={Search}/>
    </XStack>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 40,//TODO: maybe use the height of the status bar of the device instead
  },
});
