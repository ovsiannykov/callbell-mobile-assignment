import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { useRouter } from "expo-router";
import { Alert } from "react-native";

import { contactsService } from "../../api/services/contacts";
import { messagesService } from "../../api/services/messages";
import { ChatScreen } from "./chat-screen";

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../api/services/contacts");
jest.mock("../../api/services/messages");

jest.spyOn(Alert, "alert").mockImplementation(jest.fn());

describe("ChatScreen", () => {
  const back = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useRouter.mockReturnValue({ back });
  });

  it("renders loading indicator initially", () => {
    contactsService.getContact.mockReturnValue(new Promise(() => {}));

    const { getByTestId } = render(<ChatScreen id="123" />);
    expect(getByTestId("flatlist")).toBeTruthy();
  });

  it("fetches and displays chat data", async () => {
    const contact = {
      uuid: "contact-uuid",
      name: "John Doe",
    };
    const messages = [
      {
        uuid: "msg-1",
        created_at: "2023-01-01T00:00:00Z",
        status: "sent",
        text: "Hello",
        from: "me",
      },
      {
        uuid: "msg-2",
        created_at: "2023-01-02T00:00:00Z",
        status: "received",
        text: "Hi!",
        from: "them",
      },
    ];

    contactsService.getContact.mockResolvedValue({ contact });
    messagesService.getMessages.mockResolvedValue({ messages });

    const { getAllByText, getByText } = render(<ChatScreen id="123" />);

    await waitFor(() => {
      const userNames = getAllByText("John Doe");
      expect(userNames.length).toBeGreaterThan(0);
      expect(getByText("Hello")).toBeTruthy();
      expect(getByText("Hi!")).toBeTruthy();
    });
  });

  it("handles error when fetching data fails", async () => {
    contactsService.getContact.mockRejectedValue(new Error("Fail"));
    messagesService.getMessages.mockResolvedValue({ messages: [] });

    render(<ChatScreen id="123" />);

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        "Error",
        "Failed to fetch chat data"
      );
      expect(back).toHaveBeenCalled();
    });
  });

  it("calls getDataHandler on pull to refresh", async () => {
    const contact = { uuid: "contact-uuid", name: "John Doe" };
    const messages = [];
    contactsService.getContact.mockResolvedValue({ contact });
    messagesService.getMessages.mockResolvedValue({ messages });

    const { getByTestId } = render(<ChatScreen id="123" />);

    await waitFor(() => expect(contactsService.getContact).toHaveBeenCalled());

    fireEvent(getByTestId("flatlist"), "refresh");

    await waitFor(() => {
      expect(contactsService.getContact).toHaveBeenCalledTimes(2);
    });
  });
});
