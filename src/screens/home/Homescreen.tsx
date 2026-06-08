import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Button,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const actions = [
  { id: '1', title: 'Book', icon: '📚' },
  { id: '2', title: 'Library', icon: '💼' },
  { id: '3', title: 'Tools', icon: '⚙️' },
  { id: '4', title: 'Profile', icon: '👤' },
];

const recentActivities = [
  'Completed React Native Navigation',
  'Started Redux Toolkit',
  'Viewed DevOps Roadmap',
];

export default function HomeScreen({navigation}:{navigation:any}) {
  
  return (
    <SafeAreaProvider style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <>
            <Text style={styles.greeting}>👋 Good Morning</Text>
            <Text style={styles.name}>Muhammad Fayaz</Text>

            <TextInput
              placeholder="Search..."
              style={styles.searchBar}
            />

            <View style={styles.featureCard}>
              <Text style={styles.featureTitle}>
                Premium Feature
              </Text>
              <Text style={styles.featureDesc}>
                Learn React Native Faster
              </Text>

              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>
                  Explore
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.sectionTitle}>
              Quick Actions
            </Text>
          </>
        }
        data={actions}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate('StackScreen1', {id:item.id})}>
            <Text style={styles.icon}>
              {item.icon}
            </Text>
            <Text style={styles.actionText}>
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
        ListFooterComponent={
          <>
            <Text style={styles.sectionTitle}>
              Recent Activity
            </Text>

            {recentActivities.map((activity, index) => (
              <View
                key={index}
                style={styles.activityItem}
              >
                <Text>{activity}</Text>
              </View>
            ))}
          </>
        }
      />
      <Button title='Screen 1' onPress={() => navigation.navigate('StackNavigation')}/>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 20,
  },

  greeting: {
    fontSize: 18,
    color: '#64748B',
    marginTop: 10,
  },

  name: {
    fontSize: 30,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 20,
  },

  searchBar: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 14,
    marginBottom: 20,
    elevation: 2,
  },

  featureCard: {
    backgroundColor: '#2563EB',
    borderRadius: 20,
    padding: 20,
    marginBottom: 25,
  },

  featureTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
  },

  featureDesc: {
    color: '#E2E8F0',
    marginTop: 8,
    marginBottom: 15,
  },

  button: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
  },

  buttonText: {
    color: '#2563EB',
    fontWeight: '600',
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 15,
  },

  actionCard: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 8,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 2,
  },

  icon: {
    fontSize: 30,
  },

  actionText: {
    marginTop: 10,
    fontWeight: '600',
  },

  activityItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
});