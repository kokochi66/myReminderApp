interface Goal {
    goalType: string;
    startDate: Date;
    endDate: Date;
    criteria: string;
    description: string;
  }
  
  interface SleepCriteria {
    sleepTime: string; // "HH:MM" 형식
    wakeUpTime: string; // "HH:MM" 형식
  }
  
  interface TimeCriteria {
    hours: number; // 1 ~ 20
  }