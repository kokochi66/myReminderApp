import React from 'react';
import { TouchableOpacity, Text, Image, View } from 'react-native';
import { styles } from './MainTab.styles';

type MainTabProps = {};

const MainTab = () => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.createTabButton}>
        <Text style={styles.buttonText}>목표 설정</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.editProfileButton}>
        <Text style={styles.buttonText}>프로필 수정</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MainTab;
