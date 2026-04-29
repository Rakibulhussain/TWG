import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { useState } from "react";

const C = {
    bg: "#0B1220",
    card: "#121A2B",
    border: "#1F2A44",

    text: "#F1F5FF",
    sub: "#94A3B8",

    primary: "#1B2A6B",
    success: "#22C55E",
};

export default function Expense() {
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [remarks, setRemarks] = useState("");
    const [expenses, setExpenses] = useState([]);

    const addExpense = () => {
        if (!title || !amount) return;

        const newExpense = {
            id: Date.now(),
            title,
            amount,
            remarks,
            date: new Date().toLocaleDateString(),
        };

        setExpenses([newExpense, ...expenses]);

        setTitle("");
        setAmount("");
        setRemarks("");
    };
    const removeExpense = (id) => {
        const updated = expenses.filter((item) => item.id !== id);
        setExpenses(updated);
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Add Expense</Text>

            {/* FORM */}
            <View style={styles.card}>
                <TextInput
                    placeholder="Expense Name"
                    placeholderTextColor="#888"
                    style={styles.input}
                    value={title}
                    onChangeText={setTitle}
                />

                <TextInput
                    placeholder="Amount"
                    placeholderTextColor="#888"
                    style={styles.input}
                    keyboardType="numeric"
                    value={amount}
                    onChangeText={setAmount}
                />

                <TextInput
                    placeholder="Remarks"
                    placeholderTextColor="#888"
                    style={[styles.input, { height: 80 }]}
                    multiline
                    value={remarks}
                    onChangeText={setRemarks}
                />

                <TouchableOpacity style={styles.button} onPress={addExpense}>
                    <Text style={styles.buttonText}>Add Expense</Text>
                </TouchableOpacity>
            </View>

            {/* LIST */}
            <Text style={styles.subtitle}>My Expenses</Text>

            {expenses.map((item) => (
                <View key={item.id} style={styles.listCard}>

                    <View>
                        <View style={styles.rowBetween}>
                            <Text style={styles.name}>{item.title}</Text>
                        </View>

                        <Text style={styles.amount}>₹ {item.amount}</Text>
                        <Text style={styles.date}>📅 {item.date}</Text>
                    </View>

                    {item.remarks ? (
                        <Text style={styles.remarks}>📝 {item.remarks}</Text>
                    ) : null}

                    <View>
                        <TouchableOpacity
                            style={[styles.button, { marginTop: 10 }]}
                            onPress={() => removeExpense(item.id)}
                        >
                            <Text style={styles.buttonText}>Remove</Text>
                        </TouchableOpacity>
                    </View>

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
        marginBottom: 15,
    },

    subtitle: {
        color: C.text,
        fontSize: 18,
        fontWeight: "700",
        marginVertical: 15,
    },

    card: {
        backgroundColor: C.card,
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: C.border,
    },

    input: {
        backgroundColor: "#0F172A",
        color: "#fff",
        padding: 12,
        borderRadius: 10,
        marginBottom: 12,
    },

    button: {
        backgroundColor: C.primary,
        padding: 14,
        borderRadius: 12,
    },

    buttonText: {
        color: "#fff",
        textAlign: "center",
        fontWeight: "700",
    },

    listCard: {
        backgroundColor: C.card,
        padding: 14,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: C.border,
        marginBottom: 10,
    },

    name: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "700",
    },

    amount: {
        color: C.success,
        fontSize: 16,
        fontWeight: "800",
        marginTop: 4,
    },

    date: {
        color: C.sub,
        fontSize: 12,
        marginTop: 4,
    },

    remarks: {
        color: C.sub,
        fontSize: 12,
        marginTop: 4,
    },
    rowBetween: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
});