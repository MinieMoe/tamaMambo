import { YStack, XStack, H4, H6, Text, Image, Button, Paragraph } from 'tamagui';
import { CalendarDays, Clock, MapPin } from '@tamagui/lucide-icons';
import { InlineContainer } from 'tamagui.config';

export default function EventInfo() {
  return (
    <XStack p={'$2.5'} space={'$2'} backgroundColor={'red'} flex={1} fw={'wrap'}>
      <YStack flex={1} ai="flex-start" jc="flex-start" space={'$2'} width={'70%'}>
        <H4 fontWeight={'bold'}ta={'left'} width={'100%'}>
          Event name
        </H4>
        <InlineContainer space={'$2'}>
          <InlineContainer>
            <CalendarDays />
            <Text fontSize={'$5'}>Date to Date</Text>
          </InlineContainer>
          <InlineContainer>
            <Clock />
            <Text fontSize={'$5'}>Hour</Text>
          </InlineContainer>
        </InlineContainer>
        <InlineContainer>
          <MapPin />
          <Text fontSize={'$5'}>Location</Text>
        </InlineContainer>
      </YStack>
      <YStack width={'30%'}>
        <Button theme={'active'}>RSVP</Button>
      </YStack>
      <YStack width={'100%'}>
        <H6 fontWeight={'bold'}>About</H6>
        <Paragraph>About blah blah</Paragraph>
      </YStack>
    </XStack>
  );
}
