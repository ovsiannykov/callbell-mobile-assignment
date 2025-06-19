import { useLocalSearchParams, useRouter } from "expo-router";

import { ContactScreen as Content } from "../src/screens/contact-screen/contact-screen";

export default function ContactScreen() {
  const router = useRouter();
  const { contactUUID } = useLocalSearchParams();

  if (!contactUUID || typeof contactUUID !== "string") {
    router.back();
    return null;
  }

  return <Content id={contactUUID} />;
}
