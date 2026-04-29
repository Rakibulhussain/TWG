import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

// const API_URL = "https://tgwhrm.in/api";

const C = {
  primary: "#1B2A6B",
  accent: "#4F8EF7",
  success: "#22C55E",
  danger: "#EF4444",
};

export default function Attendance() {
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState(null);
  const [clockOutTime, setClockOutTime] = useState(null);
  const [timer, setTimer] = useState(0);

  // ✅ GET TOKEN (FIXED)
  const getToken = async () => {
    const data = await AsyncStorage.getItem("user");
    if (!data) return null;
    return JSON.parse(data).token;
  };

  useEffect(() => {
    fetchTodayStatus();
  }, []);

  const fetchTodayStatus = async () => {
    const token = await getToken();
    if (!token) return;

    try {
      const res = await fetch(`https://tgwhrm.in/api/attendance`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      const today = new Date().toISOString().slice(0, 10);
      const record = data.data?.find((d) => d.date === today);

      if (record) {
        setClockInTime(record.clock_in);

        if (record.clock_out === "00:00:00") {
          setIsClockedIn(true);

          // ✅ TIMER FIX
          const start = new Date(`${record.date}T${record.clock_in}`);
          const seconds = (new Date() - start) / 1000;
          setTimer(Math.floor(seconds));
        } else {
          setClockOutTime(record.clock_out);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    let interval;
    if (isClockedIn) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isClockedIn]);

  const format = (sec) => {
    const h = String(Math.floor(sec / 3600)).padStart(2, "0");
    const m = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  const handleClock = async () => {
    const token = await getToken();
    if (!token) {
      Alert.alert("Error", "Login required");
      return;
    }

    try {
      const url = isClockedIn ? "/clock-out" : "/clock-in";

      const res = await fetch(`https://tgwhrm.in/api${url}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.status) {
        if (!isClockedIn) {
          setIsClockedIn(true);
          setClockInTime(new Date().toLocaleTimeString());
          setTimer(0);
        } else {
          setIsClockedIn(false);
          setClockOutTime(new Date().toLocaleTimeString());
        }
      } else {
        Alert.alert("Error", data.message);
      }
    } catch (err) {
      Alert.alert("Error", "Server error");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={[styles.status, { color: isClockedIn ? C.success : C.danger }]}>
          {isClockedIn ? "● Working" : "● Not Clocked In"}
        </Text>

        <Text style={styles.timer}>{format(timer)}</Text>

        <View style={styles.row}>
          <View style={styles.box}>
            <Ionicons name="log-in-outline" size={18} color={C.accent} />
            <Text style={styles.label}>Clock In</Text>
            <Text style={styles.value}>{clockInTime || "--"}</Text>
          </View>

          <View style={styles.box}>
            <Ionicons name="log-out-outline" size={18} color={C.accent} />
            <Text style={styles.label}>Clock Out</Text>
            <Text style={styles.value}>{clockOutTime || "--"}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: isClockedIn ? C.danger : C.primary }]}
          onPress={handleClock}
        >
          <Ionicons
            name={isClockedIn ? "stop-circle" : "play-circle"}
            size={22}
            color="#fff"
          />
          <Text style={styles.buttonText}>
            {isClockedIn ? "Clock Out" : "Clock In"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B1220",
    padding: 20,
    justifyContent: "center",
  },

  screenTitle: {
    color: "#F1F5FF",
    fontSize: 24,
    fontWeight: "900",
    marginBottom: 20,
    textAlign: "center",
  },

  card: {
    backgroundColor: "#121A2B",
    padding: 24,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#1F2A44",
    elevation: 8,
  },

  status: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 12,
    fontWeight: "600",
  },

  timer: {
    color: "#22C55E",
    fontSize: 40,
    fontWeight: "900",
    textAlign: "center",
    marginVertical: 20,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  box: {
    backgroundColor: "#0F172A",
    width: "48%",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#1F2A44",
  },

  label: {
    color: "#94A3B8",
    fontSize: 12,
    marginTop: 4,
  },

  value: {
    color: "#F1F5FF",
    fontWeight: "700",
    fontSize: 14,
    marginTop: 4,
  },

  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    elevation: 4,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 16,
    marginLeft: 10,
  },
});