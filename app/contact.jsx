import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function ContactScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contact Details</Text>
      <Text style={styles.description}>
        This screen should display contact information such as:
      </Text>
      <Text style={styles.description}>- Contact name</Text>
      <Text style={styles.description}>- Contact notes</Text>
      <Text style={styles.description}>- Other relevant metadata</Text>
      <Link href="/" style={styles.link}>
        Back to Conversations
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
