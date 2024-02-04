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
  Text,
} from 'tamagui';
import { ArrowRight, MapPin, CalendarClock, StickyNote } from '@tamagui/lucide-icons';
import { InlineContainer } from 'tamagui.config';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { GestureResponderEvent, NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';

interface EventFormValues {
  eventName: string;
  //TODO: type for date and time may not be string
  // startDate: string;
  // endDate?: string;
  // startTime: string;
  // endTime: string;
  // location: string;
  eventDetails?: string;
}

interface DescriptionInputGroupProps {
  value?: string;
  onChangeText?: ((text: string) => void) | undefined;
  onBlur?: ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void) | undefined;
  borderColor?: string | undefined;
  placeholderTextColor?: string | undefined;
  children?: React.ReactNode;
}

const ScheduleInput = () => {
  return (
    <YStack ai={'center'} jc={'center'} width={150} space={'$3'}>
      <Input ta={'center'} size={'$3'} placeholder="01/01/2024" />
      <Input ta={'center'} size={'$3'} placeholder="8:00AM" />
    </YStack>
  );
};

const DescriptionInputGroup = ({
  value,
  onChangeText,
  onBlur,
  borderColor,
  placeholderTextColor,
  children,
}: DescriptionInputGroupProps) => {
  return (
    <YStack space={'$2'}>
      <InlineContainer space={'$2'}>
        <StickyNote />
        <H6>Event details (optional)</H6>
      </InlineContainer>
      <TextArea
        placeholder="What is the event about? Rules? etc."
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        borderColor={borderColor}
        placeholderTextColor={placeholderTextColor}
      />
      {children}
    </YStack>
  );
};

//TODO: form validation
const Page = () => {
  const [status, setStatus] = useState<'off' | 'submitting' | 'submitted'>('off');

  const initialValues: EventFormValues = {
    eventName: '',
    //TODO: initial values for start and end date should be tomorrow (like samsung calender)
    eventDetails: '',
  };

  const validationSchema = Yup.object({
    eventName: Yup.string()
      .min(8, ({ min }) => `must be at least ${min} characters`)
      .required('Required'),
    eventDetails: Yup.string()
      .notRequired()
      .min(10, ({ min }) => `must be at least ${min} characters`),
  });

  const handleSubmit = (values: EventFormValues) => {
    console.log(values);
  };

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
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          {({ handleChange, handleBlur, handleSubmit, values, touched, errors }) => (
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
              paddingVertical="$6">
              <H4>Photo upload here</H4>

              <YStack width={300} space={'$3'}>
                <Input
                  size="$6"
                  placeholder="Enter event name"
                  value={values.eventName}
                  onChangeText={handleChange('eventName')}
                  onBlur={handleBlur('eventName')}
                  borderColor={touched.eventName && errors.eventName ? '$red10Light' : undefined}
                  placeholderTextColor={
                    touched.eventName && errors.eventName ? '$red10Light' : undefined
                  }
                />
                {errors.eventName && (
                  <Text ta={'right'} color={'$red10Light'}>
                    {errors.eventName}
                  </Text>
                )}

                {/* Datetime picker */}
                <InlineContainer space={'$2'}>
                  <CalendarClock />
                  <H6>Event schedule</H6>
                </InlineContainer>
                <XStack ai={'center'} jc={'center'}>
                  <ScheduleInput />
                  <ArrowRight />
                  <ScheduleInput />
                </XStack>

                {/* Location picker */}
                {/* TODO: when the user click on this, map should appear for location picking*/}
                <InlineContainer space={'$2'}>
                  <MapPin />
                  <Input flex={1} placeholder="Location" />
                </InlineContainer>
                <DescriptionInputGroup
                  value={values.eventDetails}
                  onChangeText={handleChange('eventDetails')}
                  onBlur={handleBlur('eventDetails')}
                  borderColor={touched.eventDetails && errors.eventDetails ? 'red' : undefined}
                  placeholderTextColor={touched.eventDetails && errors.eventDetails ? 'red' : undefined}>
                  {errors.eventDetails && (
                    <Text ta={'right'} color={'$red10Light'}>
                      {errors.eventDetails}
                    </Text>
                  )}
                </DescriptionInputGroup>
              </YStack>

              {/* Button to submit */}
              <Form.Trigger asChild disabled={status !== 'off'}>
                <Button
                  onPress={handleSubmit as (e?: GestureResponderEvent) => void}
                  icon={status === 'submitting' ? () => <Spinner /> : undefined}>
                  Submit
                </Button>
              </Form.Trigger>
            </Form>
          )}
        </Formik>
        <Separator />
      </YStack>
    </Theme>
  );
};

export default Page;
