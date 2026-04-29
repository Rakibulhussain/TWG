import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";

const C = {
  bg: "#0B1220",
  card: "#121A2B",
  border: "#1F2A44",

  text: "#F1F5FF",
  sub: "#94A3B8",

  accent: "#4F8EF7",
};

export default function Holidays() {

  const holidays = [
    {
      id: 1,
      name: "New Year",
      date: "01 Jan 2026",
    },
    {
      id: 2,
      name: "Republic Day",
      date: "26 Jan 2026",
    },
    {
      id: 3,
      name: "Holi",
      date: "14 Mar 2026",
    },
    {
      id: 4,
      name: "Independence Day",
      date: "15 Aug 2026",
    },
    {
      id: 5,
      name: "Diwali",
      date: "08 Nov 2026",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}></Text>

      {holidays.map((item) => (
        <View key={item.id} style={styles.card}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.date}>📅 {item.date}</Text>
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

  card: {
    backgroundColor: C.card,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: C.border,
    marginBottom: 12,
  },

  name: {
    color: C.text,
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 6,
  },

  date: {
    color: C.sub,
    fontSize: 13,
  },
});