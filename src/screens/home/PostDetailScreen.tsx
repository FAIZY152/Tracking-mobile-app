import { Text, View } from "react-native";

export default function PostDetailsScreen({ route }:{ route: any }) {
  const { postId } = route.params;

  return (
    <View>
      <Text>Post Details Screen</Text>
      <Text>Post ID: {postId}</Text>
    </View>
  );
}