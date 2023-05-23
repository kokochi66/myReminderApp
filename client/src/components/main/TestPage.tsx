// EditProfile.tsx
import { Box, Button, FormControl, Input, Radio, ScrollView, Stack, useToast } from 'native-base';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { DailyGoalService } from '../../service/StorageService';
import JWDatePicker from '../util/JWDatePicker';
import { DailyGoalStatus } from '../../interface/GoalInfo';

const TestPage = () => {
  const toast = useToast();
  const [newDailyGoalDate, setNewDailyGoalDate] = useState<Date>(new Date());
  const [newDailyGoalStatus, setNewDailyGoalStatus] = useState<DailyGoalStatus>(DailyGoalStatus.IN_PROGRESS);


  const deleteAllDailyGoals = () => {
    DailyGoalService.deleteAllDailyGoals().then(res => {
      toast.show({
        description: '삭제가 완료되었습니다.'
      });
    });
  }

  const formatDate = (input?: string | Date): string => {
    if (!input) {
      return "";
    }

    let date: Date;

    // 입력값이 문자열인지 확인하고, 문자열이면 Date 객체로 변환
    if (typeof input === 'string') {
      date = new Date(input);
      if (isNaN(date.getTime())) { // 유효한 Date 객체인지 확인
        return "";
      }
    } else if (input instanceof Date) {
      date = input;
    } else {
      return "";
    }

    const dateString = date.toISOString().split('T')[0];
    return dateString;
  }

  const createTestDailyGoal = () => {
    DailyGoalService.createDailyGoal(newDailyGoalStatus, newDailyGoalDate).then(res => {
      toast.show({
        description: '생성이 완료되었습니다.'
      });
    });
  }


  return (
    <ScrollView style={styles.container}>
      <Box mb="5" mt="1">
        <Box mb="5">
          <FormControl.Label>목표 타입</FormControl.Label>
          <Radio.Group name="goalStatus" defaultValue={newDailyGoalStatus} onChange={value => {
                  // `DailyGoalStatus` enum에서 문자열에 해당하는 값을 찾습니다.
                  const status = DailyGoalStatus[value as keyof typeof DailyGoalStatus];
                  console.log('status = ', status);
                  setNewDailyGoalStatus(status || DailyGoalStatus.FAILED);
                }}>
            <Stack direction={{
              base: "row",
              md: "row"
            }} alignItems={{
              base: "flex-start",
              md: "center"
            }} space={4} w="75%" maxW="300px">
              <Radio value={DailyGoalStatus.SUCCESS} colorScheme="red" size="sm" my={1}>
                성공
              </Radio>
              <Radio value={DailyGoalStatus.FAILED} colorScheme="red" size="sm" my={1}>
                실패
              </Radio>
              <Radio value={DailyGoalStatus.IN_PROGRESS} colorScheme="red" size="sm" my={1}>
                진행중
              </Radio>
            </Stack>
          </Radio.Group>
        </Box>
        <FormControl.Label>날짜</FormControl.Label>
        <Input value={formatDate(newDailyGoalDate)} isDisabled />
        <JWDatePicker value={newDailyGoalDate} onChange={setNewDailyGoalDate} />
      </Box>
      <Button onPress={createTestDailyGoal} mb="3">데일리 목표 생성</Button>
      <Button mb="3">데일리 목표 상태값 변경</Button>
      <Button mb="3" onPress={deleteAllDailyGoals}>모든 데일리 목표 제거</Button>
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

export default TestPage;
