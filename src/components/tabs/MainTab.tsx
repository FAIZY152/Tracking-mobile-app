import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function MainScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}> Main Screen</Text>
      <Text style={styles.subtitle}>
        Welcome to the Main Tab
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    marginTop: 10,
    fontSize: 16,
  },
});