import React, { useRef } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  Dimensions,
  Animated,
  ListRenderItem,
} from 'react-native';
import { Product, products } from '../utils/products';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.75;
const CARD_HEIGHT = 500;
const SPACING = 20;

const ProductSeparator = () => <View style={styles.separator} />;

const ProductCard = ({ item, scale }: any) => (
  <Animated.View style={[styles.card, { transform: [{ scale }] }]}>
    <Pressable
      onPress={() => console.log('Open product ' + item.title)}
      style={styles.pressable}
    >
      <View style={styles.imageBox}>
        <Image
          source={{ uri: item.image }}
          style={styles.productImage}
          resizeMode="contain"
        />
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Premium</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>

        <View style={styles.infoRow}>
          <Text style={styles.rating}>⭐ {item.rating}</Text>
          <Text style={styles.stock}>{item.stock}</Text>
        </View>

        <View style={styles.bottomRow}>
          <View>
            <Text style={styles.priceLabel}>Price</Text>
            <Text style={styles.price}>{item.price}</Text>
          </View>

          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Buy Now</Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  </Animated.View>
);

const Basic3 = () => {
  const scrollX = useRef(new Animated.Value(0)).current;

  const renderProduct: ListRenderItem<Product> = ({ item, index }) => {
    const inputRange = [
      (index - 1) * (CARD_WIDTH + SPACING),
      index * (CARD_WIDTH + SPACING),
      (index + 1) * (CARD_WIDTH + SPACING),
    ];
    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.9, 1, 0.9],
      extrapolate: 'clamp',
    });

    return <ProductCard item={item} scale={scale} />;
  };

  return (
    <View style={styles.container}>
      <Animated.FlatList
        style={styles.list}
        data={products}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + SPACING}
        decelerationRate="fast"
        bounces={false}
        contentContainerStyle={styles.listContent}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true },
        )}
        scrollEventThrottle={16}
        renderItem={renderProduct}
        ItemSeparatorComponent={ProductSeparator}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#F4F1EA',
    justifyContent: 'center',
    paddingVertical: 40,
  },

  list: {
    flexGrow: 0,
  },

  listContent: {
    alignItems: 'center',
    paddingHorizontal: SPACING / 2,
  },

  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 8,
  },

  pressable: {
    height: '100%',
  },

  separator: {
    width: SPACING,
  },

  imageBox: {
    height: 220,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  productImage: {
    width: '90%',
    height: '90%',
  },

  badge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#0F0F0F',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },

  content: {
    padding: 16,
  },

  category: {
    fontSize: 12,
    color: '#9A7B4F',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },

  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111111',
    marginBottom: 6,
  },

  description: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    marginBottom: 12,
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  rating: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111111',
  },

  stock: {
    fontSize: 14,
    color: '#1E8E3E',
    fontWeight: '700',
  },

  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  priceLabel: {
    fontSize: 12,
    color: '#999999',
    marginBottom: 4,
  },

  price: {
    fontSize: 24,
    fontWeight: '900',
    color: '#0F0F0F',
  },

  button: {
    backgroundColor: '#0F0F0F',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 16,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
});

export default Basic3;
