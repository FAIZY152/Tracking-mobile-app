import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function StackScreen1({ navigation }:any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stack Screen 1</Text>
      <Text style={styles.subtitle}>
        This is your entry screen. Clean, simple, functional.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('StackScreen2')}
      >
        <Text style={styles.buttonText}>Go to Screen 2</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#0f172a',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#94a3b8',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#3b82f6',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});