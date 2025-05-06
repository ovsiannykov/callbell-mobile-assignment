import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function ConversationsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Conversations List</Text>
      <Text style={styles.description}>
        This screen should display a list of conversations.
      </Text>
      <Text style={styles.description}>
        Each conversation should be clickable and navigate to the chat screen.
      </Text>
      <Link href="/chat" style={styles.link}>
        Go to Chat Screen
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
