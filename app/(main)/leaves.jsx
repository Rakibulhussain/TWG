import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

const C = {
  bg: "#0B1220",
  card: "#121A2B",
  border: "#1F2A44",

  text: "#F1F5FF",
  sub: "#94A3B8",

  primary: "#1B2A6B",
  success: "#22C55E",
  warning: "#F59E0B",
  danger: "#EF4444",
};

export default function Attendance() {

  // ✅ Dummy Attendance Data
  const data = [
    { id: 1, date: "2026-04-01", status: "Present" },
    { id: 2, date: "2026-04-02", status: "Absent" },
    { id: 3, date: "2026-04-03", status: "Late" },
    { id: 4, date: "2026-04-04", status: "Present" },
  ];

  const getStatusColor = (status) => {
    if (status === "Present") return C.success;
    if (status === "Late") return C.warning;
    return C.danger;
  };

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.title}>Attendance</Text>

      {/* ✅ Summary Card */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryText}>Present: 18</Text>
        <Text style={styles.summaryText}>Absent: 2</Text>
        <Text style={styles.summaryText}>Late: 3</Text>
      </View>

      {/* ✅ Mark Attendance Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Mark Today</Text>
      </TouchableOpacity>

      {/* ✅ Attendance List */}
      {data.map((item) => (
        <View key={item.id} style={styles.card}>

          <Text style={styles.date}>📅 {item.date}</Text>

          <Text
            style={[
              styles.status,
              { color: getStatusColor(item.status) },
            ]}
          >
            ● {item.status}
          </Text>

        </View>
      ))}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: C.bg,
    padding: 20,
  },

  title: {
    color: C.text,
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 20,
  },

  summaryCard: {
    backgroundColor: C.card,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: C.border,
    marginBottom: 15,
  },

  summaryText: {
    color: C.sub,
    fontSize: 14,
    marginBottom: 4,
  },

  button: {
    backgroundColor: C.primary,
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },

  card: {
    backgroundColor: C.card,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: C.border,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  date: {
    color: C.sub,
    fontSize: 13,
  },

  status: {
    fontSize: 13,
    fontWeight: "600",
  },
});