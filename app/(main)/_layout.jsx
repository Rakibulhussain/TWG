import { Drawer } from "expo-router/drawer";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

function CustomHeader({ title }) {
  const navigation = useNavigation();
  const router = useRouter();

  return (
    <SafeAreaView style={styles.headerSafe}>
      <View style={styles.header}>
        
        {/* MENU */}
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={26} color="#fff" />
        </TouchableOpacity>

        {/* TITLE */}
        <Text style={styles.title}>{title || "Dashboard"}</Text>

        {/* PROFILE */}
        <TouchableOpacity onPress={() => router.push("/profile")}>
          <Ionicons name="person-circle-outline" size={28} color="#fff" />
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

export default function Layout() {
  return (
   <Drawer
  screenOptions={{
    header: ({ route, options }) => (
      <CustomHeader title={options.title} />
    ),
  }}
>
  <Drawer.Screen name="dashboard" options={{ title: "Dashboard" }} />
  <Drawer.Screen name="attendance" options={{ title: "Attendance" }} />
  <Drawer.Screen name="leaves"  options={{ title: "Leaves" }} />
  <Drawer.Screen name="holidays" options={{ title: "Holidays" }} />
  <Drawer.Screen name="profile" options={{ title: "Profile" }} />
  <Drawer.Screen name="expense" options={{ title: "Expense" }} />

</Drawer>
  );
}

const styles = StyleSheet.create({
  headerSafe: {
    backgroundColor: "#0F1F5C",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 14,
    backgroundColor: "#0F1F5C",
  },

  title: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});