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

type LoginScreenProps = {
  onNavigateToSignUp: () => void;
  onLoginSuccess: () => void;
};

export default function LoginScreen({
  onNavigateToSignUp,
  onLoginSuccess,
}: LoginScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const isFormValid = useMemo(() => {
    const emailOk = /\S+@\S+\.\S+/.test(email.trim());
    return emailOk && password.trim().length >= 6;
  }, [email, password]);

  const handleLogin = () => {
    if (!/\S+@\S+\.\S+/.test(email.trim())) {
      Alert.alert("Invalid email", "Please enter a valid email address.");
      return;
    }

    if (password.trim().length < 6) {
      Alert.alert("Invalid password", "Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      onLoginSuccess();
    }, 1200);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor="#080B14" />
      <View style={styles.orbTopLeft} pointerEvents="none" />
      <View style={styles.orbTopRight} pointerEvents="none" />
      <View style={styles.orbBottomLeft} pointerEvents="none" />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          style={styles.flex}
          contentContainerStyle={styles.contentContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.brandBlock}>
            <View style={styles.logoBox}>
              <Text style={styles.logoText}>S</Text>
            </View>
            <Text style={styles.brandTitle}>Synapse</Text>
            <Text style={styles.brandSubtitle}>INTELLIGENCE PLATFORM</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Welcome back</Text>
            <Text style={styles.cardSubtitle}>
              Sign in to continue to your workspace
            </Text>

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

            <TouchableOpacity style={styles.alignEnd}>
              <Text style={styles.linkText}>Forgot password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleLogin}
              disabled={loading || !isFormValid}
              activeOpacity={0.85}
              style={[
                styles.primaryButton,
                (!isFormValid || loading) && styles.primaryButtonDisabled,
              ]}
            >
              {loading ? (
                <View style={styles.buttonRow}>
                  <ActivityIndicator color="#FFFFFF" />
                  <Text style={styles.primaryButtonText}>Signing in...</Text>
                </View>
              ) : (
                <Text style={styles.primaryButtonText}>Sign in</Text>
              )}
            </TouchableOpacity>

            <View style={styles.dividerRow}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>or continue with</Text>
              <View style={styles.divider} />
            </View>

            <View style={styles.socialRow}>
              {[
                { label: "Google", icon: "G" },
                { label: "GitHub", icon: "GH" },
                { label: "SSO", icon: "SSO" },
              ].map((provider) => (
                <TouchableOpacity
                  key={provider.label}
                  style={styles.socialButton}
                  activeOpacity={0.8}
                >
                  <Text style={styles.socialIcon}>{provider.icon}</Text>
                  <Text style={styles.socialLabel}>{provider.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Don&apos;t have an account? </Text>
            <TouchableOpacity onPress={onNavigateToSignUp}>
              <Text style={styles.footerLink}>Create one free</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.badgesRow}>
            {["SOC 2", "GDPR", "ISO 27001"].map((badge) => (
              <View key={badge} style={styles.badgeItem}>
                <Text style={styles.badgeCheck}>✓</Text>
                <Text style={styles.badgeText}>{badge}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  },
  orbTopLeft: {
    position: "absolute",
    top: -80,
    left: -70,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: "#4F46E5",
    opacity: 0.18,
  },
  orbTopRight: {
    position: "absolute",
    top: 110,
    right: -50,
    width: 190,
    height: 190,
    borderRadius: 95,
    backgroundColor: "#7C3AED",
    opacity: 0.12,
  },
  orbBottomLeft: {
    position: "absolute",
    bottom: 110,
    left: 10,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#2563EB",
    opacity: 0.1,
  },
  brandBlock: {
    alignItems: "center",
    marginBottom: 36,
  },
  logoBox: {
    width: 56,
    height: 56,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
    backgroundColor: "#6366F1",
    shadowColor: "#6366F1",
    shadowOpacity: 0.4,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 7,
  },
  logoText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "700",
  },
  brandTitle: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "700",
    letterSpacing: -0.5,
  },
  brandSubtitle: {
    color: "#94A3B8",
    fontSize: 12,
    marginTop: 4,
    letterSpacing: 2,
  },
  card: {
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    backgroundColor: "rgba(255,255,255,0.04)",
    shadowColor: "#000000",
    shadowOpacity: 0.25,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 12 },
    elevation: 10,
  },
  cardTitle: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 6,
  },
  cardSubtitle: {
    color: "#94A3B8",
    fontSize: 14,
    marginBottom: 24,
  },
  alignEnd: {
    alignSelf: "flex-end",
    marginBottom: 20,
    marginTop: -2,
  },
  linkText: {
    color: "#818CF8",
    fontSize: 13,
    fontWeight: "600",
  },
  primaryButton: {
    minHeight: 54,
    borderRadius: 16,
    backgroundColor: "#5B5FEF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#6366F1",
    shadowOpacity: 0.35,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 7,
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
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  dividerText: {
    color: "#64748B",
    fontSize: 12,
    paddingHorizontal: 12,
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  socialButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    backgroundColor: "rgba(255,255,255,0.04)",
    marginHorizontal: 4,
  },
  socialIcon: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
  socialLabel: {
    color: "#94A3B8",
    fontSize: 10,
    marginTop: 4,
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 28,
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
  badgesRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 18,
  },
  badgeItem: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 8,
  },
  badgeCheck: {
    color: "#4ADE80",
    fontSize: 10,
    marginRight: 4,
  },
  badgeText: {
    color: "#475569",
    fontSize: 10,
    fontWeight: "600",
  },
});