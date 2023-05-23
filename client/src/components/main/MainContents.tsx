import React, { useEffect, useState } from 'react';
import { Box, FlatList, HStack, Heading, Avatar, VStack, Text, Spacer, ScrollView, Button, Center, Modal, FormControl, Input } from 'native-base';
import { StyleSheet } from 'react-native';
import { NavigationContainer, useIsFocused, useNavigation } from '@react-navigation/native';
import { DailyGoalService } from '../../service/StorageService';
import { DailyGoalStatus, DailyGoal } from '../../interface/GoalInfo';

type MainContentsProps = {};

const MainContents = () => {

  const images: { [key: string]: any, FAILED: any, SUCCESS: any, IN_PROGRESS: any } = {
    FAILED: require('../../assets/icon/fail.jpg'),
    SUCCESS: require('../../assets/icon/success.png'),
    IN_PROGRESS: require('../../assets/icon/process.png'),
    // 다른 이미지들...
  };

  const [dailyGoals, setDailyGoals] = useState<DailyGoal[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const today = new Date();
    DailyGoalService.createDailyGoal(DailyGoalStatus.IN_PROGRESS, today).then(todayDailyGoalRes => {
      console.log('todayailyGoal = ', todayDailyGoalRes);
      DailyGoalService.createPreviousDailyGoals().then(prevDailyGoalRes => {
        console.log('prev = ', prevDailyGoalRes);
        DailyGoalService.getDailyGoals(1).then(dailyGoalResult => {
          console.log('res', dailyGoalResult);
          setDailyGoals(dailyGoalResult);
        }).catch(error => {
          console.log('error', error);
        });
      });

    });

    // DailyGoalService.deleteAllDailyGoals();

  }, []);

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




  return (
    <Box>
      <FlatList pt="5" style={styles.container} data={dailyGoals} renderItem={({
        item
      }) =>
        <Button onPress={() => setShowModal(true)} variant="outline" _dark={{ borderColor: "muted.50" }} borderColor="muted.800" pl={["0", "4"]} pr={["0", "5"]} py="2" mb="1">
          <HStack space={[2, 3]}>
            <Center size="12" w="20">
              <Avatar size="48px" source={images[item.dailyGoalStatus.toString()]} />
            </Center>
            <Center w="40">
              <VStack>
                <Text _dark={{
                  color: "warmGray.50"
                }} color="coolGray.800" bold>
                  {item.dailyGoalStatus}
                </Text>
                <Text color="coolGray.600" _dark={{
                  color: "warmGray.200"
                }}>
                  {item.streakCount} 연승/연패
                </Text>
              </VStack>
            </Center>
            <Center w="20">
              <Text fontSize="xs" _dark={{
                color: "warmGray.50"
              }} color="coolGray.800" alignSelf="flex-start">
                {formatDate(item.dailyGoalDate)}
              </Text>
            </Center>

          </HStack>
        </Button>
      } keyExtractor={item => formatDate(item.dailyGoalDate)} />

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>목표 정보</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Name</FormControl.Label>
              <Input />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Email</FormControl.Label>
              <Input />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                setShowModal(false);
              }}>
                Cancel
              </Button>
              <Button onPress={() => {
                setShowModal(false);
              }}>
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Box>

  );



};

export const styles = StyleSheet.create({

  container: {
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },

});


export default MainContents;
