import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Attendance from "./attendance";

// 🎨 Colors
const C = {
  bg: "#0B1220",
  card: "#121A2B",
  border: "#1F2A44",

  primary: "#1B2A6B",
  accent: "#4F8EF7",

  text: "#F1F5FF",
  sub: "#94A3B8",

  success: "#22C55E",
  danger: "#EF4444",
};

export default function Dashboard() {
  const [user, setUser] = useState(null);

  // 🔄 Load user (FIXED)
  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");

        if (userData) {
          const parsed = JSON.parse(userData);

          // ✅ FIX: direct user object set
          setUser(parsed.user);
        }
      } catch (err) {
        console.log("User load error:", err);
      }
    };

    loadUser();
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      {/* 👤 USER INFO */}
      <View style={styles.userCard}>
        <Text style={styles.welcome}>Welcome back</Text>

        <Text style={styles.name}>
          {user?.name || "User"}
        </Text>

        <Text style={styles.role}>
          {user?.type || "-"}
        </Text>
      </View>

      {/* ⏱️ Attendance */}
      <Attendance />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: C.bg,
    padding: 20,
  },

  userCard: {
    backgroundColor: C.card,
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },

  welcome: {
    color: C.sub,
    fontSize: 13,
  },

  name: {
    color: C.text,
    fontSize: 24,
    fontWeight: "800",
  },

  role: {
    color: C.sub,
    marginTop: 4,
  },
});