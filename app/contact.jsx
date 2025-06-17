import { useLocalSearchParams } from "expo-router";

import { ContactScreen as Content } from "../src/screens/contact-screen/contact-screen";

export default function ContactScreen() {
  const { contactUUID } = useLocalSearchParams();

  return <Content id={contactUUID} />;
}
