import { useLocalSearchParams, useRouter } from "expo-router";

import { ChatScreen as Content } from "../src/screens/chat-screen/chat-screen";

export default function ChatScreen() {
  const router = useRouter();
  const { contactUUID } = useLocalSearchParams();

  if (!contactUUID || typeof contactUUID !== "string") {
    router.back();
    return null;
  }

  return <Content id={contactUUID} />;
}
