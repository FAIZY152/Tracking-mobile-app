import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type AuthInputProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
};

export function AuthInput({
  label,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = "default",
  autoCapitalize = "none",
}: AuthInputProps) {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const animation = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: focused || value ? 1 : 0,
      duration: 180,
      useNativeDriver: false,
    }).start();
  }, [animation, focused, value]);

  const labelTop = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [18, 7],
  });

  const labelSize = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [15, 11],
  });

  return (
    <View style={[styles.wrapper, focused && styles.wrapperFocused]}>
      <Animated.Text
        style={[
          styles.label,
          {
            top: labelTop,
            fontSize: labelSize,
            color: focused || value ? "#818CF8" : "#94A3B8",
          },
        ]}
      >
        {label}
      </Animated.Text>

      <View style={styles.inputRow}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          secureTextEntry={secureTextEntry && !showPassword}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={false}
          selectionColor="#6366F1"
          placeholder=" "
          placeholderTextColor="transparent"
          style={styles.input}
        />

        {secureTextEntry ? (
          <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)}>
            <Text style={styles.toggleText}>{showPassword ? "Hide" : "Show"}</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.05)",
    marginBottom: 16,
  },
  wrapperFocused: {
    borderColor: "#818CF8",
    shadowColor: "#6366F1",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
    elevation: 3,
  },
  label: {
    position: "absolute",
    left: 16,
    zIndex: 1,
    fontWeight: "500",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 15,
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 12,
  },
  toggleText: {
    color: "#818CF8",
    fontSize: 13,
    fontWeight: "600",
    paddingRight: 16,
  },
});