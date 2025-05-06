import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Conversations",
        }}
      />
      <Stack.Screen
        name="chat"
        options={{
          title: "Chat",
        }}
      />
      <Stack.Screen
        name="contact"
        options={{
          title: "Contact Details",
        }}
      />
    </Stack>
  );
}
