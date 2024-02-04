import { YStack, XStack, H5, H6, Text, Image, Button, Paragraph } from 'tamagui';
import { CalendarDays, Clock, MapPin } from '@tamagui/lucide-icons';
import { InlineContainer } from 'tamagui.config';

const eventName = `Capitol Hill Cupid's Valentine`
const description = `blah blah blah
Rules:
- Don't be a party pooper 
- Must be 18+ (eww no babies) 🔞
`;
const date = `02/14/24-02/15/24`
const hour = `9:00PM`
const location = `123 High  St, Seattle, WA 98189`
const attendances = `69/100`

//TODO: add photos, add location coordinates
export default function EventInfo() {
  return (
    <XStack p={'$2.5'} space={'$2'} flex={1} fw={'wrap'}>
      <YStack flex={1} ai="flex-start" jc="flex-start" space={'$2'} width={'70%'}>
        <H5 fontWeight={'bold'} width={'100%'}>
          {eventName}
        </H5>

        {/* Datetime picker */}
        <InlineContainer space={'$5'}>
          <InlineContainer width={100}>
            <CalendarDays />
            <Text fontSize={'$4'}>{date}</Text>
          </InlineContainer>
          <InlineContainer width={'50%'}>
            <Clock />
            <Text fontSize={'$4'}>{hour}</Text>
          </InlineContainer>
        </InlineContainer>

        
        <InlineContainer>
          <MapPin />
          <Text fontSize={'$4'}>{location}</Text>
        </InlineContainer>
      </YStack>
      <YStack width={'25%'} space={'$2'}>
        <Button theme={'active'}>RSVP</Button>
        <Text ta={'center'} color={'$blue10Light'}>{attendances} are going</Text>
      </YStack>
      <YStack width={'100%'} mt={'$2'}>
        <H6 fontWeight={'bold'}>About</H6>
        <Paragraph>{description}</Paragraph>
      </YStack>
    </XStack>
  );
}
