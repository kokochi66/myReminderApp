export interface Goal {
  goalType: string;
  startDate: Date;
  endDate: Date;
  criteria: string;
  description: string;
}

export interface DailyGoal {
  goalList: Goal[];
  dailyGoalDate: Date;
  dailyGoalStatus: DailyGoalStatus;
  streakCount: number;
}

interface SleepCriteria {
  sleepTime: string; // "HH:MM" 형식
  wakeUpTime: string; // "HH:MM" 형식
}

interface TimeCriteria {
  hours: number; // 1 ~ 20
}

export enum DailyGoalStatus {
  FAILED = 'FAILED',
  SUCCESS = 'SUCCESS',
  IN_PROGRESS = 'IN_PROGRESS',
}