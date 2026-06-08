import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AuthInput } from "../../components/auth/AuthInput";
type SignupScreenProps = {
  onNavigateToLogin: () => void;
  onSignupSuccess: () => void;
};

export default function SignupScreen({
  onNavigateToLogin,
  onSignupSuccess,
}: SignupScreenProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const isFormValid = useMemo(() => {
    const emailOk = /\S+@\S+\.\S+/.test(email.trim());
    const passwordOk = password.trim().length >= 6;
    const passwordsMatch = password === confirmPassword;
    return fullName.trim().length >= 2 && emailOk && passwordOk && passwordsMatch;
  }, [fullName, email, password, confirmPassword]);

  const handleSignup = () => {
    if (fullName.trim().length < 2) {
      Alert.alert("Invalid name", "Please enter your full name.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email.trim())) {
      Alert.alert("Invalid email", "Please enter a valid email address.");
      return;
    }

    if (password.trim().length < 6) {
      Alert.alert("Weak password", "Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Password mismatch", "Passwords do not match.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      onSignupSuccess();
    }, 1200);
  };

  return (
    <SafeAreaView style={signupStyles.screen}>
      <StatusBar barStyle="light-content" backgroundColor="#080B14" />
      <View style={signupStyles.orbTopLeft} pointerEvents="none" />
      <View style={signupStyles.orbTopRight} pointerEvents="none" />
      <View style={signupStyles.orbBottomRight} pointerEvents="none" />

      <KeyboardAvoidingView
        style={signupStyles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          style={signupStyles.flex}
          contentContainerStyle={signupStyles.contentContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={signupStyles.brandBlock}>
            <View style={signupStyles.logoBox}>
              <Text style={signupStyles.logoText}>S</Text>
            </View>
            <Text style={signupStyles.brandTitle}>Create account</Text>
            <Text style={signupStyles.brandSubtitle}>
              Start your workspace in a few seconds
            </Text>
          </View>

          <View style={signupStyles.card}>
            <Text style={signupStyles.cardTitle}>Join Synapse</Text>
            <Text style={signupStyles.cardSubtitle}>
              Create your account to continue
            </Text>

            <AuthInput
              label="Full name"
              value={fullName}
              onChangeText={setFullName}
              autoCapitalize="words"
            />

            <AuthInput
              label="Work email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />

            <AuthInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <AuthInput
              label="Confirm password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />

            <TouchableOpacity
              onPress={handleSignup}
              disabled={loading || !isFormValid}
              activeOpacity={0.85}
              style={[
                signupStyles.primaryButton,
                (!isFormValid || loading) && signupStyles.primaryButtonDisabled,
              ]}
            >
              {loading ? (
                <View style={signupStyles.buttonRow}>
                  <ActivityIndicator color="#FFFFFF" />
                  <Text style={signupStyles.primaryButtonText}>Creating account...</Text>
                </View>
              ) : (
                <Text style={signupStyles.primaryButtonText}>Create account</Text>
              )}
            </TouchableOpacity>
          </View>

          <View style={signupStyles.footerRow}>
            <Text style={signupStyles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={onNavigateToLogin}>
              <Text style={signupStyles.footerLink}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const signupStyles = StyleSheet.create({
  flex: { flex: 1 },
  screen: {
    flex: 1,
    backgroundColor: "#080B14",
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
    justifyContent: "center",
  },
  orbTopLeft: {
    position: "absolute",
    top: -80,
    left: -70,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: "#4F46E5",
    opacity: 0.18,
  },
  orbTopRight: {
    position: "absolute",
    top: 90,
    right: -60,
    width: 190,
    height: 190,
    borderRadius: 95,
    backgroundColor: "#7C3AED",
    opacity: 0.12,
  },
  orbBottomRight: {
    position: "absolute",
    bottom: 60,
    right: 0,
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: "#2563EB",
    opacity: 0.1,
  },
  brandBlock: {
    alignItems: "center",
    marginBottom: 28,
  },
  logoBox: {
    width: 56,
    height: 56,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
    backgroundColor: "#6366F1",
  },
  logoText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "700",
  },
  brandTitle: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "700",
  },
  brandSubtitle: {
    color: "#94A3B8",
    fontSize: 13,
    marginTop: 4,
  },
  card: {
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    backgroundColor: "rgba(255,255,255,0.04)",
  },
  cardTitle: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 6,
  },
  cardSubtitle: {
    color: "#94A3B8",
    fontSize: 14,
    marginBottom: 24,
  },
  primaryButton: {
    minHeight: 54,
    borderRadius: 16,
    backgroundColor: "#5B5FEF",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  primaryButtonDisabled: {
    opacity: 0.55,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  footerText: {
    color: "#64748B",
    fontSize: 14,
  },
  footerLink: {
    color: "#818CF8",
    fontSize: 14,
    fontWeight: "700",
  },
});