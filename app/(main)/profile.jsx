import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

export default function Profile() {

  // ✅ Dummy UI data
  const user = {
    name: "RAKIBUL HUSSAIN",
    email: "rakibulhussain1100@gmail.com",
    type: "Company",
    plan: "Basic",
    avatar: "https://i.pravatar.cc/150?img=3", // dummy image
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        
        {/* AVATAR */}
        <Image
          source={{ uri: user.avatar }}
          style={styles.avatar}
        />

        {/* NAME */}
        <Text style={styles.name}>{user.name}</Text>

        {/* DETAILS */}
        <Text style={styles.info}>📧 {user.email}</Text>
        <Text style={styles.info}>👤 {user.type}</Text>
        <Text style={styles.info}>📦 Plan: {user.plan}</Text>

        {/* LOGOUT (UI only) */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B1220",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  card: {
    backgroundColor: "#121A2B",
    padding: 28,
    borderRadius: 24,
    alignItems: "center",
    width: "100%",
    borderWidth: 1,
    borderColor: "#1F2A44",
    elevation: 8,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: "#4F8EF7",
  },

  name: {
    fontSize: 22,
    fontWeight: "800",
    color: "#F1F5FF",
    marginBottom: 10,
  },

  info: {
    color: "#94A3B8",
    marginBottom: 6,
    fontSize: 14,
  },

  button: {
    marginTop: 20,
    backgroundColor: "#EF4444",
    padding: 14,
    borderRadius: 12,
    width: "100%",
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 15,
  },
});