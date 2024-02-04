import { useState } from 'react';
import { XStack, YStack, Button, Text } from 'tamagui';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { ArrowRight } from '@tamagui/lucide-icons';

export default function MyDatetimePicker() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [mode, setMode] = useState<string>('date');
  const [show, setShow] = useState(false);
  const [dateType, setDateType] = useState<'start' | 'end'>('start');

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate;
    setShow(false);
    if (dateType === 'start') {
      setStartDate(currentDate!);
    } else {
      setEndDate(currentDate!);
    }
  };

  const showMode = (currentMode: string) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = (dateType: 'start' | 'end') => {
    showMode('date');
    setDateType(dateType);
  };

  const showTimepicker = (dateType: 'start' | 'end') => {
    showMode('time');
    setDateType(dateType);
  };

  return (
    <XStack ai={'center'} jc={'center'}>
      <YStack ai={'center'} jc={'center'} width={150} space={'$3'}>
        <Button onPress={() => showDatepicker('start')}>{startDate.toLocaleDateString()}</Button>
        <Button onPress={() => showTimepicker('start')}>{startDate.toLocaleTimeString()}</Button>
      </YStack>
      <ArrowRight />
      <YStack ai={'center'} jc={'center'} width={150} space={'$3'}>
        <Button onPress={() => showDatepicker('end')}>{endDate.toLocaleDateString()}</Button>
        <Button onPress={() => showTimepicker('end')}>{endDate.toLocaleTimeString()}</Button>
      </YStack>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={dateType === 'start' ? startDate : endDate}
          //@ts-ignore
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}
    </XStack>
  );
}
