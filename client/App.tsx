import React, { useState } from 'react';
import {
  ScrollView,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import MainProfile from './src/components/main/MainProfile';
import MainContents from './src/components/main/MainContents';
import MainTab from './src/components/main/MainTab';
import EditGoal from './src/components/main/EditGoal';
import AddGoal from './src/components/main/AddGoal';
import EditProfile from './src/components/main/EditProfile';
import { NativeBaseProvider } from 'native-base';

const App = () => {
  const [selectedTab, setSelectedTab] = useState<string>('MainContents');

  const renderContent = () => {
    console.log(selectedTab);
    switch (selectedTab) {
      case 'MainContents':
        return <MainContents />;
      case 'EditGoal':
        return <EditGoal />;
      case 'AddGoal':
        return <AddGoal />;
      case 'EditProfile':
        return <EditProfile />;
      default:
        return <MainContents />;
    }
  };

  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          {/* 프로필 영역 */}
          <MainProfile></MainProfile>

          {/* 버튼 영역 */}
          <MainTab setSelectedTab={setSelectedTab}></MainTab>

          {/* 콘텐츠 영역 */}
          {renderContent()}

        </ScrollView>
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});


export default App;
