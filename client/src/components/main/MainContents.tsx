import React, { useEffect, useState } from 'react';
import { Box, FlatList, HStack, Heading, Avatar, VStack, Text, Spacer, ScrollView, Button } from 'native-base';
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

  const data = [{
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    fullName: "Aafreen Khan",
    timeStamp: "12:47 PM",
    recentText: "Good Day!",
    avatarUrl: "../../assets/icon/fail.jpg"
  }, {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    fullName: "Sujitha Mathur",
    timeStamp: "11:11 PM",
    recentText: "Cheer up, there!",
    avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU"
  }, {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    fullName: "Anci Barroco",
    timeStamp: "6:22 PM",
    recentText: "Good Day!",
    avatarUrl: "https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg"
  }, {
    id: "68694a0f-3da1-431f-bd56-142371e29d72",
    fullName: "Aniket Kumar",
    timeStamp: "8:56 PM",
    recentText: "All the best",
    avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU"
  }, {
    id: "28694a0f-3da1-471f-bd96-142456e29d72",
    fullName: "Kiara",
    timeStamp: "12:47 PM",
    recentText: "I will call today.",
    avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU"
  }];

  const [dailyGoals, setDailyGoals] = useState<DailyGoal[]>([]);

  useEffect(() => {
    const today = new Date();
    DailyGoalService.createTodayDailyGoal(DailyGoalStatus.IN_PROGRESS, today).then(todayDailyGoalRes => {
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

  const formatDate = (date?: Date): string => {
    if (!date) {
      return "";
    }
    const dateString = date.toISOString().split('T')[0];
    return `dailyGoal-${dateString}`;
  }
  



  return (
    <FlatList pt="5" style={styles.container} data={dailyGoals} renderItem={({
      item
    }) =>
      <Button variant="outline" _dark={{ borderColor: "muted.50" }} borderColor="muted.800" pl={["0", "4"]} pr={["0", "5"]} py="2" mb="1">
        <HStack space={[2, 3]} justifyContent="space-between">
          <Avatar size="48px" source={images[item.dailyGoalStatus.toString()]} />
          <VStack>
            <Text _dark={{
              color: "warmGray.50"
            }} color="coolGray.800" bold>
              {item.dailyGoalStatus}
            </Text>
            <Text color="coolGray.600" _dark={{
              color: "warmGray.200"
            }}>
              {item.streakCount}
            </Text>
          </VStack>
          <Spacer />
          <Text fontSize="xs" _dark={{
            color: "warmGray.50"
          }} color="coolGray.800" alignSelf="flex-start">
            {formatDate(item.dailyGoalDate)}
          </Text>
        </HStack>
      </Button>
    } keyExtractor={item => String(item.dailyGoalDate)} />
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
