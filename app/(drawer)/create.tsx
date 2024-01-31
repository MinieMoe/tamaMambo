import { useEffect, useState } from 'react';
import {
  YStack,
  XStack,
  H4,
  H6,
  Separator,
  Theme,
  Form,
  Button,
  Spinner,
  Input,
  TextArea,
} from 'tamagui';

const ScheduleInputGroup = (props: { label: string }) => {
  return (
    <XStack space={'$4'}>
      <H6>{props.label}</H6>
      <Input flex={1} size={'$2'} placeholder="Date" />
      <Input flex={1} size={'$2'} placeholder="Hour" />
    </XStack>
  );
};

const DescriptionInputGroup = () => {
  return (
    <YStack>
      <H6>Event details (optional)</H6>
      <TextArea placeholder='What is the event about? Rules? etc.'/>
    </YStack>
  );
};

//TODO: form validation
const Page = () => {
  const [status, setStatus] = useState<'off' | 'submitting' | 'submitted'>('off');

  useEffect(() => {
    if (status === 'submitting') {
      const timer = setTimeout(() => setStatus('off'), 2000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [status]);

  return (
    <Theme name="light">
      <YStack flex={1} alignItems="center" justifyContent="center">
        <Form
          alignItems="center"
          minWidth={300}
          gap="$2"
          onSubmit={() => setStatus('submitting')}
          borderWidth={1}
          borderRadius="$4"
          backgroundColor="$background"
          borderColor="$borderColor"
          paddingHorizontal="$4"
          paddingVertical="$6"
          >
          <H4>Photo upload here</H4>

          <YStack width={300} space={'$2'}>
            <Input size="$6" placeholder="Enter event name" />
            <ScheduleInputGroup label="Start" />
            <ScheduleInputGroup label="End  " />
            {/* TODO: when the user click on this, map should appear for location picking*/}
            <Input placeholder="Location" />
            <DescriptionInputGroup />
          </YStack>
          <Form.Trigger asChild disabled={status !== 'off'}>
            <Button icon={status === 'submitting' ? () => <Spinner /> : undefined}>Submit</Button>
          </Form.Trigger>
        </Form>
        <Separator />
      </YStack>
    </Theme>
  );
};

export default Page;
