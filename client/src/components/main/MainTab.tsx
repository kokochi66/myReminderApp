import React from 'react';
import { View, Button } from 'react-native';
import { styles } from './MainTab.styles';

interface MainTabProps {
  setSelectedTab: (tabName: string) => void;
}


const MainTab: React.FC<MainTabProps> = ({ setSelectedTab }) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
      <Button title="Main" onPress={() => setSelectedTab('MainContents')} />
      <Button title="Edit Goal" onPress={() => setSelectedTab('EditGoal')} />
      <Button title="Add Goal" onPress={() => setSelectedTab('AddGoal')} />
      <Button title="Edit Profile" onPress={() => setSelectedTab('EditProfile')} />
    </View>
  );
};

export default MainTab;
