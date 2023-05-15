import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
  contentContainer: {
    padding: 10,
  },
  contentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,

    borderColor: '#ccc',
    borderWidth: 1,
  },
  contentResult: {
    borderRightWidth: 1,
    borderRightColor: '#ccc',
    width: 60,
    height: '100%',
    backgroundColor: 'blue',
  },
  resultText: {
    fontSize: 16,
    color: 'white', // 글자색 변경
    textAlign: 'center',
  },
  streakText: {
    fontSize: 14,
    color: 'white', // 글자색 변경
    textAlign: 'center',
  },
  separatorLine: {
    width: '100%',
    height: 5,
    borderColor: 'white',
  },
  contentTitle: {
    flex: 1,
    marginLeft: 16,
  },
  titleText: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 4,
  },
  dateText: {
    fontSize: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 4,
  },
});