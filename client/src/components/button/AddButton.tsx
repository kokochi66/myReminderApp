import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from './AddButton.styles';

type AddButtonProps = {
  onPress: () => void;
};

const AddButton = ({ onPress }: AddButtonProps) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
         <Icon name="plus" size={24} color="#fff" />
    </TouchableOpacity>
  );
};

export default AddButton;
