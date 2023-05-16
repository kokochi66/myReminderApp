import React, { useState } from 'react';
import { Box, Text, FormControl, Input, Divider, Button, View, ScrollView, Radio, Stack, Select, CheckIcon } from 'native-base';
import { StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import JWDatePicker from '../util/JWDatePicker';

const AddGoal = () => {
  const [goalType, setGoalType] = useState<string>('study');
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [displayDate, setDisplayDate] = useState<Date>(new Date());
  const [criteria, setCriteria] = useState<string>('1');
  const [description, setDescription] = useState<string>('');

  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  let selectedDateType: string = 'start';

  const saveGoal = () => {
    const goal: Goal = { goalType, startDate, endDate, criteria, description };
    console.log(goal);
    // TODO: goal 객체를 서버로 전송하거나, 로컬 저장소에 저장하는 등의 작업을 수행합니다.
  };

  const onSetDate = (event: Event, selectedDate?: Date) => {
    console.log('1', showDatePicker);
    if (selectedDate && selectedDateType === 'start') {
      setStartDate(selectedDate);
    } else if (selectedDate && selectedDateType === 'end') {
      setEndDate(selectedDate);
    }
    console.log('2', showDatePicker);
    setShowDatePicker(false);
    console.log('3', showDatePicker);
  };

  const showStartDateTimePicker = () => {
    console.log('showStartDateTimePicker');
    selectedDateType = 'start';
    setDisplayDate(startDate);
    setShowDatePicker(true);
  };

  const showEndDateTimePicker = () => {
    console.log('showEndDateTimePicker');
    selectedDateType = 'end';
    setDisplayDate(endDate);
    setShowDatePicker(true);
  };

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }


  return (
    <ScrollView style={styles.container}>
      <Box mb="5">
        <FormControl.Label>목표 타입</FormControl.Label>
        <Radio.Group name="goalType" defaultValue={goalType} onChange={value => setGoalType(value || "study")}>
          <Stack direction={{
            base: "row",
            md: "row"
          }} alignItems={{
            base: "flex-start",
            md: "center"
          }} space={4} w="75%" maxW="300px">
            <Radio value="study" colorScheme="red" size="sm" my={1}>
              공부
            </Radio>
            <Radio value="sleep" colorScheme="red" size="sm" my={1}>
              숙면
            </Radio>
            <Radio value="excercise" colorScheme="red" size="sm" my={1}>
              운동
            </Radio>
          </Stack>
        </Radio.Group>
      </Box>
      <Divider/>

      <Box mb="5" mt="1">
        <FormControl.Label>시작일</FormControl.Label>
        <Input value={formatDate(startDate)} isDisabled/>
        <JWDatePicker value={startDate} onChange={setStartDate} />
      </Box>
      <Divider/>


      <Box mb="5" mt="1">
        <FormControl.Label>종료일</FormControl.Label>
        <Input value={formatDate(endDate)} isDisabled/>
        <JWDatePicker value={endDate} onChange={setEndDate} />
      </Box>
      <Divider/>

      <Box mb="5" mt="1">
        <FormControl.Label>달성기준</FormControl.Label>
        <Select selectedValue={criteria} mt={1} onValueChange={itemValue => setCriteria(itemValue)}>
          <Select.Item label="1시간" value="1" />
          <Select.Item label="2시간" value="2" />
          <Select.Item label="3시간" value="3" />
          <Select.Item label="4시간" value="4" />
          <Select.Item label="5시간" value="5" />
          <Select.Item label="6시간" value="6" />
          <Select.Item label="7시간" value="7" />
          <Select.Item label="8시간" value="8" />
          <Select.Item label="9시간" value="9" />
          <Select.Item label="10시간" value="10" />
        </Select>
      </Box>
      <Divider/>

      <Box mb="5" mt="1">
        <FormControl.Label>설명</FormControl.Label>
        <Input placeholder="설명 문구 입력" />
      </Box>

      <Button onPress={saveGoal}>저장</Button>
    </ScrollView>
  );
};

export const styles = StyleSheet.create({

  container: {
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },

});

export default AddGoal;
