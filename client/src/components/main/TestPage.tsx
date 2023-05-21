// EditProfile.tsx
import { Box, Button, FormControl, Input, ScrollView, useToast } from 'native-base';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { DailyGoalService } from '../../service/StorageService';
import JWDatePicker from '../util/JWDatePicker';

const TestPage = () => {
  const toast = useToast();
  const [newDailyGoalDate, setNewDailyGoalDate] = useState<Date>(new Date());


  const deleteAllDailyGoals = () => {
    DailyGoalService.deleteAllDailyGoals().then(res => {
      toast.show({
        title: 'testTitle',
        description: 'testDesc'
      });
    });
  }

  const formatDate = (date: Date): string => {
    console.log(date);
    const dateString = date.toISOString().split('T')[0];
    return `dailyGoal-${dateString}`;
  }


  return (
    <ScrollView style={styles.container}>
      <Box mb="5" mt="1">
        <FormControl.Label>날짜</FormControl.Label>
        <Input value={formatDate(newDailyGoalDate)} isDisabled />
        <JWDatePicker value={newDailyGoalDate} onChange={setNewDailyGoalDate} />
      </Box>
      <Button mb="3">데일리 목표 생성</Button>
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
