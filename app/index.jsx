import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated } from "react-native";

const { width } = Dimensions.get("window");

// 🎯 PROFESSIONAL COLOR SYSTEM
const PRIMARY_BLUE    = "#1B2A6B";
const ACCENT_GOLD     = "#D4A017";
const SECONDARY_GREEN = "#2E7D32";
const ACCENT_ORANGE   = "#F57C00";

const BG_DARK   = "#0D0D0D";
const BG_CARD   = "#141414";
const TEXT_MUTED = "#7A8A8B";

export default function Home() {
  const router = useRouter();

  const fade   = useRef(new Animated.Value(0)).current;
  const slideY = useRef(new Animated.Value(40)).current;
  const scale  = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.timing(slideY, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        tension: 50,
        friction: 6,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Background Glow */}
      <View style={[styles.bgGlow, { backgroundColor: PRIMARY_BLUE + "20", top: -80, right: -80 }]} />
      <View style={[styles.bgGlow, { backgroundColor: ACCENT_ORANGE + "15", bottom: 80, left: -60 }]} />

      {/* Logo */}
      <Animated.View style={[styles.logoWrapper, { opacity: fade, transform: [{ scale }] }]}>
        <Image
          source={require("../assets/images/icon.png")}
          style={styles.logo}
        />
      </Animated.View>

      {/* Brand Name */}
      <Animated.View style={{ opacity: fade, transform: [{ translateY: slideY }] }}>
        <Text style={styles.brandMain}>IndiaTalent</Text>
        <Text style={styles.brandAccent}>Hub</Text>

        <View style={styles.underline} />
      </Animated.View>

      {/* Tagline */}
      <Text style={styles.tagline}>
        Powered by <Text style={{ color: ACCENT_GOLD }}>Techflora Global Workforce Pvt Ltd</Text>
      </Text>

      {/* Stats */}
      <View style={styles.stats}>
        {[
          ["10K+", "Candidates", ACCENT_ORANGE],
          ["500+", "Companies", PRIMARY_BLUE],
          ["98%", "Success", SECONDARY_GREEN],
        ].map(([num, label, color]) => (
          <View key={label} style={styles.statBox}>
            <Text style={[styles.statNum, { color }]}>{num}</Text>
            <Text style={styles.statLabel}>{label}</Text>
          </View>
        ))}
      </View>

      {/* Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/login")}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>

      <Text style={styles.signin}>
        Already have an account?{" "}
        <Text style={{ color: ACCENT_GOLD }}>Sign In</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_DARK,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },

  bgGlow: {
    position: "absolute",
    width: 300,
    height: 300,
    borderRadius: 200,
  },

  logoWrapper: {
    marginBottom: 20,
    shadowColor: ACCENT_GOLD,
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },

  logo: {
    width: 90,
    height: 90,
    borderRadius: 20,
  },

  brandMain: {
    fontSize: 34,
    fontWeight: "900",
    color: PRIMARY_BLUE,
    textAlign: "center",
  },

  brandAccent: {
    fontSize: 34,
    fontWeight: "900",
    color: ACCENT_GOLD,
    textAlign: "center",
  },

  underline: {
    width: 80,
    height: 3,
    backgroundColor: ACCENT_GOLD,
    alignSelf: "center",
    marginTop: 6,
    borderRadius: 2,
  },

  tagline: {
    color: TEXT_MUTED,
    fontSize: 13,
    marginTop: 10,
    marginBottom: 25,
  },

  stats: {
    flexDirection: "row",
    backgroundColor: BG_CARD,
    borderRadius: 14,
    overflow: "hidden",
    marginBottom: 30,
  },

  statBox: {
    flex: 1,
    padding: 16,
    alignItems: "center",
  },

  statNum: {
    fontSize: 20,
    fontWeight: "800",
  },

  statLabel: {
    fontSize: 11,
    color: TEXT_MUTED,
    marginTop: 2,
  },

  button: {
    backgroundColor: PRIMARY_BLUE,
    paddingVertical: 14,
    width: "100%",
    borderRadius: 12,
    alignItems: "center",
    shadowColor: ACCENT_GOLD,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  signin: {
    marginTop: 16,
    color: TEXT_MUTED,
    fontSize: 13,
  },
});