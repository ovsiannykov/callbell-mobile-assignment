import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function ChatScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat Screen</Text>
      <Text style={styles.description}>
        This screen should display the conversation messages.
      </Text>
      <Text style={styles.description}>
        It should allow sending new messages and display the conversation
        history.
      </Text>
      <Link href="/contact" style={styles.link}>
        Go to Contact Details
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  link: {
    marginTop: 20,
    color: "blue",
    fontSize: 16,
  },
});
