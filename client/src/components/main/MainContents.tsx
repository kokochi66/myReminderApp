import React from 'react';
import { TouchableOpacity, Text, Image, View } from 'react-native';
import { styles } from './MainContents.styles';

type MainContentsProps = {};

const MainContents = () => {
  return (
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
  );
};

export default MainContents;
