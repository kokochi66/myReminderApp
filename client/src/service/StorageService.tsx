import AsyncStorage from '@react-native-async-storage/async-storage';
import { DailyGoalStatus, DailyGoal, Goal } from '../interface/GoalInfo';

const storeData = async (key: string, value: any) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
        // saving error
        console.error(e);
    }
}

const getData = async (key: string) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        // error reading value
        console.error(e);
    }
}

export const GoalService = {
    saveGoal: async (goal: Goal) => {
        // Save goal
        await storeData(`goal-${goal.goalType}`, goal);

        // Update DailyGoal if status is 'IN_PROGRESS' or 'NOT_YET'
        const today = new Date();
        const todayStr = today.toISOString().split('T')[0];
        const dailyGoalKey = `dailyGoal-${todayStr}`;
        const dailyGoal = await getData(dailyGoalKey);

        if (dailyGoal && (dailyGoal.dailyGoalStatus === 'IN_PROGRESS' || dailyGoal.dailyGoalStatus === 'NOT_YET')) {
            const savedGoal = dailyGoal.goalList.filter((g: Goal) => g.goalType === goal.goalType);
            if (savedGoal.length) {
                dailyGoal.goalList = dailyGoal.goalList.map((g: Goal) =>
                    g.goalType === goal.goalType ? goal : g
                );
            } else {
                dailyGoal.goalList.push(goal);
            }

            // Save updated DailyGoal
            await storeData(dailyGoalKey, dailyGoal);
        }
    },
    getGoal: (goalType: string) => getData(`goal-${goalType}`),
    getAllGoals: async () => {
        const keys = await AsyncStorage.getAllKeys();
        const goalKeys = keys.filter((key) => key.startsWith('goal-'));

        const goalPromises = goalKeys.map((key) => getData(key));
        const goals = await Promise.all(goalPromises);

        return goals as Goal[];
    },
}

export const DailyGoalService = {
    saveDailyGoal: async (dailyGoal: DailyGoal) => {
        const dateString = dailyGoal.dailyGoalDate.toISOString().split('T')[0]; // converting to YYYY-MM-DD format
        await storeData(`dailyGoal-${dateString}`, dailyGoal);
    },
    getDailyGoal: (date: Date) => {
        const dateString = date.toISOString().split('T')[0];
        return getData(`dailyGoal-${dateString}`);
    },
    getDailyGoals: async (page: number): Promise<DailyGoal[]> => {
        const keys = await AsyncStorage.getAllKeys();
        const dailyGoalKeys = keys.filter(key => key.startsWith('dailyGoal-'));
        // console.log('keys', dailyGoalKeys);

        const sortedKeys = dailyGoalKeys.sort((a, b) => b.localeCompare(a)); // Sort the keys in descending order (latest first)
        const start = (page - 1) * 10;
        const end = start + 100;
        const paginatedKeys = sortedKeys.slice(start, end); // get the keys for the requested page
        // console.log('pageKeys', paginatedKeys);

        const dailyGoals = await Promise.all(paginatedKeys.map(key => getData(key))); // fetch all the dailyGoals for the page
        return dailyGoals;
    },
    createDailyGoal: async (status: DailyGoalStatus, date: Date): Promise<any> => {
        const dateString = date.toISOString().split('T')[0]; // Get YYYY-MM-DD string
        const dailyGoalKey = `dailyGoal-${dateString}`;

        const existingDailyGoal = await getData(dailyGoalKey);
        if (existingDailyGoal) {
            // If a dailyGoal already exists for today, do nothing
            return;
        }

        const goals = await GoalService.getAllGoals();
        const copiedGoals = JSON.parse(JSON.stringify(goals)); // Deep copy the goals

        const newDailyGoal: DailyGoal = {
            goalList: copiedGoals,
            dailyGoalDate: date,
            dailyGoalStatus: status,
            streakCount: status === DailyGoalStatus.IN_PROGRESS ? 0 : 1,
        }

        return await storeData(dailyGoalKey, newDailyGoal);
    },
    createPreviousDailyGoals: async () => {
        const today = new Date();
        let dayBefore = new Date(today);
        dayBefore.setDate(dayBefore.getDate() - 1);
    
        const goals = await GoalService.getAllGoals();
        const copiedGoals = JSON.parse(JSON.stringify(goals)); // Deep copy the goals
    
        // Get the date of the latest DailyGoal
        const keys = await AsyncStorage.getAllKeys();
        const dailyGoalKeys = keys.filter(key => key.startsWith('dailyGoal-'));
        const sortedKeys = dailyGoalKeys.sort((a, b) => b.localeCompare(a)); // Sort the keys in descending order (latest first)

        
        if (sortedKeys.length < 2) {
            return;
        }
        console.log(sortedKeys.length);
        console.log('sortedKeys = ', sortedKeys);
        const latestDailyGoalKey = sortedKeys[1];
        const latestDailyGoal = await getData(latestDailyGoalKey);

        let streakCnt = 1;
        if (latestDailyGoal.status === DailyGoalStatus.FAILED) {
            streakCnt = latestDailyGoal.streakCount;
        }
    
        console.log('latestDailyGoalKey = ', latestDailyGoalKey);
        const dateParts = latestDailyGoalKey.split('-').slice(1); // [yyyy, MM, dd]
        const year = parseInt(dateParts[0], 10);
        const month = parseInt(dateParts[1], 10) - 1; // JavaScript months are 0-based
        const day = parseInt(dateParts[2], 10);
        const latestDailyGoalDate = new Date(year, month, day + 1);
        latestDailyGoalDate.setDate(latestDailyGoalDate.getDate());
        console.log('latestDaily', latestDailyGoalDate);
        
        while (latestDailyGoalDate.toISOString().split('T')[0] < today.toISOString().split('T')[0]) {
          const dateString = latestDailyGoalDate.toISOString().split('T')[0]; // Get YYYY-MM-DD string
          const dailyGoalKey = `dailyGoal-${dateString}`;
          console.log('new DailyGoalKey = ', dailyGoalKey);
    
          const newDailyGoal: DailyGoal = {
            goalList: copiedGoals,
            dailyGoalDate: new Date(latestDailyGoalDate),  // set the date of the newDailyGoal to latestDailyGoalDate
            dailyGoalStatus: DailyGoalStatus.FAILED,  // mark the missed dailyGoals as FAILED
            streakCount: streakCnt++,
          }
    
          // Save the new dailyGoal
          await storeData(dailyGoalKey, newDailyGoal);
    
          // Increment the latestDailyGoalDate by one day
          latestDailyGoalDate.setDate(latestDailyGoalDate.getDate() + 1);
        }
      },
      deleteAllDailyGoals: async () => {
        const keys = await AsyncStorage.getAllKeys();
        const dailyGoalKeys = keys.filter(key => key.startsWith('dailyGoal-'));
        
        await Promise.all(dailyGoalKeys.map(key => AsyncStorage.removeItem(key)));
    },
}
