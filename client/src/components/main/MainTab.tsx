import React from 'react';
import { View, Button } from 'react-native';
import { styles } from './MainTab.styles';

interface MainTabProps {
  setSelectedTab: (tabName: string) => void;
}


const MainTab: React.FC<MainTabProps> = ({ setSelectedTab }) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
      <Button title="메인" onPress={() => setSelectedTab('MainContents')} />
      <Button title="목표 추가" onPress={() => setSelectedTab('AddGoal')} />
      <Button title="테스트" onPress={() => setSelectedTab('TestPage')} />
    </View>
  );
};

export default MainTab;
