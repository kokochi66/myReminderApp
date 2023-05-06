import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StyleSheet,
} from 'react-native';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* 프로필 영역 */}
        <View style={styles.profileContainer}>
          <Image
            style={styles.profileImage}
            source={require('./src/assets/image/test-profile.jpg')}
          />
          <Text style={styles.profileName}>이쭈냥이오</Text>
        </View>

        {/* 버튼 영역 */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.createTabButton}>
            <Text style={styles.buttonText}>목표 설정</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.editProfileButton}>
            <Text style={styles.buttonText}>프로필 수정</Text>
          </TouchableOpacity>
        </View>

        {/* 콘텐츠 영역 */}
        <View style={styles.contentContainer}>
          {/* 콘텐츠 항목 */}
          <View style={styles.contentItem}>
            <View style={[styles.contentResult, {backgroundColor: 'red'}]}>
              <Text style={styles.resultText}>패배</Text>
              <View style={styles.separatorLine} />
              <Text style={styles.streakText}>연승 3</Text>
            </View>
            <View style={styles.contentTitle}>
              <Text style={styles.titleText}>핵심 목표</Text>
              <Text style={styles.dateText}>2023년 5월 3일</Text>
            </View>
          </View>
          <View style={styles.contentItem}>
            <View style={[styles.contentResult]}>
              <Text style={styles.resultText}>승리</Text>
              <View style={styles.separatorLine} />
              <Text style={styles.streakText}>연승 3</Text>
            </View>
            <View style={styles.contentTitle}>
              <Text style={styles.titleText}>핵심 목표</Text>
              <Text style={styles.dateText}>2023년 5월 3일</Text>
            </View>
          </View>
          <View style={styles.contentItem}>
            <View style={[styles.contentResult]}>
              <Text style={styles.resultText}>승리</Text>
              <View style={styles.separatorLine} />
              <Text style={styles.streakText}>연승 3</Text>
            </View>
            <View style={styles.contentTitle}>
              <Text style={styles.titleText}>핵심 목표</Text>
              <Text style={styles.dateText}>2023년 5월 3일</Text>
            </View>
          </View>
          <View style={styles.contentItem}>
            <View style={[styles.contentResult]}>
              <Text style={styles.resultText}>승리</Text>
              <View style={styles.separatorLine} />
              <Text style={styles.streakText}>연승 3</Text>
            </View>
            <View style={styles.contentTitle}>
              <Text style={styles.titleText}>핵심 목표</Text>
              <Text style={styles.dateText}>2023년 5월 3일</Text>
            </View>
          </View>
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  profileName: {
    marginLeft: 12,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  createTabButton: {
    backgroundColor: 'blue',
    paddingHorizontal: 50,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  editProfileButton: {
    backgroundColor: 'gray',
    paddingHorizontal: 50,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
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


export default App;
