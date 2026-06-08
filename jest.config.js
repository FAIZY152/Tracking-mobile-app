module.exports = {
  preset: 'react-native',
  setupFiles: ['./jest/setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|@react-navigation|nativewind|react-native-css-interop|react-native-reanimated|react-native-worklets|react-native-screens|react-native-safe-area-context)/)',
  ],
};
