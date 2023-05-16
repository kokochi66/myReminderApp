import React from 'react';
import { Button, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

type JWDatePickerProps = {
  value: Date,
  onChange: (newDate: Date) => void
};

const JWDatePicker: React.FC<JWDatePickerProps> = ({ value, onChange }) => {
  const [show, setShow] = React.useState(false);

  const handleChange = (event: Event, selectedDate?: Date) => {
    setShow(false);
    if (selectedDate) {
      onChange(selectedDate);
    }
  };

  const handlePress = () => {
    setShow(true);
  };

  return (
    <View>
      <Button title="선택" onPress={handlePress} />
      {show && (
        <DateTimePicker
          value={value}
          mode="date"
          display="default"
          onChange={handleChange}
        />
      )}
    </View>
  );
};

export default JWDatePicker;
