import { Button, Input, XStack, Avatar } from 'tamagui';
import { Search } from '@tamagui/lucide-icons'

export default function SearchBar() {
  return (
    <XStack alignItems='center' space={"$2"}>
      <Avatar circular>
        <Avatar.Image src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"/>
        <Avatar.Fallback backgroundColor={"$blue10"}/>
      </Avatar>
      <Input placeholder={"Look for events nearby..."} width={'65%'}/>
      <Button icon={Search}/>
    </XStack>
  );
}
