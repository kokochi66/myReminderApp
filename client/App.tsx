import React from 'react';
import {
  ScrollView,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import MainProfile from './src/components/main/MainProfile';
import MainContents from './src/components/main/MainContents';
import MainTab from './src/components/main/MainTab';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* 프로필 영역 */}
        <MainProfile></MainProfile>

        {/* 버튼 영역 */}
        <MainTab></MainTab>

        {/* 콘텐츠 영역 */}
        <MainContents></MainContents>        
        
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});


export default App;
