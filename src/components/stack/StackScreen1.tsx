import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function StackScreen1({ navigation,route }:any) {
    const user = {
    id: 1,
    name: 'Muhammad Fayaz',
    role: 'Full Stack Developer',
  };

  const { id } = route.params || {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stack Screen 1</Text>
      <Text style={styles.subtitle}>
        your ID is: {id}
      </Text>

      {/* <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('StackScreen2')}
      >
        <Text style={styles.buttonText}>Go to Screen 2</Text>
      </TouchableOpacity> */}
       <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('StackScreen2', {
            user,
            message: 'Hello from Screen 1',
          })
        }
      > 
        <Text style={styles.buttonText}>Go to Screen 2 with Data</Text>
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