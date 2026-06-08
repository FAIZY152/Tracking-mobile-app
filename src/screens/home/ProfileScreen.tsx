import React from 'react';
import { View,  StyleSheet } from 'react-native';
import Basic3 from '../../components/Basic3';

const ProductsPage = () => {
  return (
    <View style={styles.container}>
      <Basic3/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    fontSize: 24,
  },
});

export default ProductsPage;