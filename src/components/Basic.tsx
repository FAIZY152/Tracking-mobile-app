import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
  Image,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigations/types';

type BasicProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Basic = ({ navigation }: BasicProps) => {
  const [email, setEmail] = useState('');

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://picsum.photos/200',
        }}
        style={styles.image}
      />
   
      {/* local import */}
      {/* <Image
        source={require('../assets/avatar.png')}
        style={styles.image}
      /> */}

      <Text style={styles.title}>Welcome Back</Text>

      <TextInput
        placeholder="Enter email"
        placeholderTextColor="#777"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.85}
        onPress={() => navigation.navigate('Products')}
      >
        <Text style={styles.buttonText}>View Products</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        activeOpacity={0.85}
        onPress={() => navigation.navigate('Profile')}
      >
        <Text style={styles.secondaryButtonText}>Open Profile</Text>
      </TouchableOpacity>

      <Pressable onPress={() => navigation.navigate('PressableDemo')}>
        <Text style={styles.link}>Try Pressable Demo</Text>
      </Pressable>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Product Name</Text>
        <Text style={styles.price}>$120</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#f7f7f8',
  },

  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
    marginBottom: 24,
    backgroundColor: '#e7e7e9',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 24,
    textAlign: 'center',
  },

  input: {
    width: '100%',
    height: 52,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d0d0d4',
    color: '#111',
    paddingHorizontal: 16,
    borderRadius: 10,
    marginBottom: 16,
    fontSize: 16,
  },

  button: {
    width: '100%',
    height: 52,
    backgroundColor: 'black',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  secondaryButton: {
    width: '100%',
    height: 52,
    marginTop: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#111111',
    alignItems: 'center',
    justifyContent: 'center',
  },

  secondaryButtonText: {
    color: '#111111',
    fontSize: 16,
    fontWeight: 'bold',
  },

  link: {
    color: '#1D4ED8',
    marginTop: 16,
    textAlign: 'center',
    fontWeight: '600',
  },

  card: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginTop: 24,
    marginBottom: 10,
    elevation: 3,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  price: {
    marginTop: 5,
    color: 'green',
  },
});

export default Basic;
