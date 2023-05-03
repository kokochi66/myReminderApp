import React from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';
import { styles } from './AddButton.styles';

type AddButtonProps = {
  onPress: () => void;
};

const AddButton = ({ onPress }: AddButtonProps) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Image
        source={require('./../../assets/image/plus-button.png')} // 이미지 파일 경로를 입력하세요.
        style={styles.buttonImage}
      />
    </TouchableOpacity>
  );
};

export default AddButton;
