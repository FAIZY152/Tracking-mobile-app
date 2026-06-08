import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const Basic2 = () => {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => console.log('Pressed')}
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.buttonPressed : undefined,
        ]}
      >
        <Text style={styles.text}>Press Me</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    backgroundColor: '#111111',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 10,
  },

  buttonPressed: {
    backgroundColor: '#6B7280',
  },

  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Basic2;
