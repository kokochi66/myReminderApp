// EditProfile.tsx
import { Button, ScrollView, useToast } from 'native-base';
import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { DailyGoalService } from '../../service/StorageService';

const TestPage = () => {
  const toast = useToast();


  const deleteAllDailyGoals = () => {
    DailyGoalService.deleteAllDailyGoals().then(res => {
      toast.show({
        title: 'testTitle',
        description: 'testDesc'
      });
    });
  }
  return (
    <ScrollView style={styles.container}>
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
