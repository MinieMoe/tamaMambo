import { useState } from 'react';
import { XStack, YStack, Button, Text } from 'tamagui';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { ArrowRight } from '@tamagui/lucide-icons';

/* TODO: date time logics implementation
  - Initially: start and end date are the same, but hours are 1 hour apart
  - Make sure start date <= end date
  - If start and end date are same, make sure start hour < end hour by at least 1 hour
  - If hour get set to midnight, move the date forward by 1 day
*/

export default function MyDatetimePicker() {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(() => {
    var currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 1);
    return currentDate;
  });
  const [mode, setMode] = useState<string>('date');
  const [show, setShow] = useState(false);
  const [dateType, setDateType] = useState<'start' | 'end'>('start');

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate;
    setShow(false);
    if (dateType === 'start') {
      setStartDate(currentDate!);
      if (currentDate!.getTime() > endDate.getTime()) {
        var newEndDate = new Date(currentDate!.getTime());
        newEndDate.setHours(newEndDate.getHours() + 1);
        setEndDate(newEndDate);
      }
    } else {
      setEndDate(currentDate!);
      if (startDate.getTime() > currentDate!.getTime()) {
        var newStartDate = new Date(currentDate!.getTime());
        newStartDate.setHours(newStartDate.getHours() - 1);
        setStartDate(newStartDate);
      }
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
        <Button onPress={() => showTimepicker('start')}>
          {startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Button>
      </YStack>
      <ArrowRight />
      <YStack ai={'center'} jc={'center'} width={150} space={'$3'}>
        <Button onPress={() => showDatepicker('end')}>{endDate.toLocaleDateString()}</Button>
        <Button onPress={() => showTimepicker('end')}>
          {endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Button>
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
