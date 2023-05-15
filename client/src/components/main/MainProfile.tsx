import React from 'react';
import { TouchableOpacity, Text, Image, View } from 'react-native';
import { styles } from './MainProfile.styles';

type MainProfileProps = {};

const MainProfile = () => {
  return (
    <View style={styles.profileContainer}>
      <Image
        style={styles.profileImage}
        source={require('../../assets/image/test-profile.jpg')}
      />
      <Text style={styles.profileName}>이쭈냥이오</Text>
    </View>
  );
};

export default MainProfile;
