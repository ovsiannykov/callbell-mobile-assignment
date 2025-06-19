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

const resetMock = jest.fn();
const fetchChatDataMock = jest.fn();
const clearErrorMock = jest.fn();

jest.mock("../../store/chat-store/chat-store", () => {
  return {
    useChatStore: jest.fn(),
  };
});

jest.spyOn(Alert, "alert").mockImplementation(jest.fn());

describe("ChatScreen", () => {
  const back = jest.fn();
  const useChatStore =
    require("../../store/chat-store/chat-store").useChatStore;

  beforeEach(() => {
    jest.clearAllMocks();
    useRouter.mockReturnValue({ back });
  });

  it("renders loading indicator initially", () => {
    contactsService.getContact.mockReturnValue(new Promise(() => {}));

    useChatStore.mockReturnValue({
      user: { uuid: "contact-uuid", name: "John Doe" },
      messages: [],
      loading: true,
      error: null,
      fetchChatData: fetchChatDataMock,
      clearError: clearErrorMock,
      reset: resetMock,
    });

    const { getByTestId } = render(<ChatScreen id="123" />);
    expect(getByTestId("flatlist")).toBeTruthy();
  });

  it("fetches and displays chat data", async () => {
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

    contactsService.getContact.mockResolvedValue({
      contact: { uuid: "contact-uuid", name: "John Doe" },
    });
    messagesService.getMessages.mockResolvedValue({ messages });

    useChatStore.mockReturnValue({
      user: { uuid: "contact-uuid", name: "John Doe" },
      messages,
      loading: false,
      error: null,
      fetchChatData: fetchChatDataMock,
      clearError: clearErrorMock,
      reset: resetMock,
    });

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

    useChatStore.mockReturnValue({
      user: null,
      messages: [],
      loading: false,
      error: "fail",
      fetchChatData: fetchChatDataMock,
      clearError: clearErrorMock,
      reset: resetMock,
    });

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
    contactsService.getContact.mockResolvedValue({
      contact: { uuid: "contact-uuid", name: "John Doe" },
    });
    messagesService.getMessages.mockResolvedValue({ messages: [] });

    useChatStore.mockReturnValue({
      user: { uuid: "contact-uuid", name: "John Doe" },
      messages: [],
      loading: false,
      error: null,
      fetchChatData: fetchChatDataMock,
      clearError: clearErrorMock,
      reset: resetMock,
    });

    const { getByTestId } = render(<ChatScreen id="123" />);

    await waitFor(() => expect(fetchChatDataMock).toHaveBeenCalled());

    fireEvent(getByTestId("flatlist"), "refresh");

    await waitFor(() => {
      expect(fetchChatDataMock).toHaveBeenCalledTimes(2);
    });
  });

  it("calls reset on unmount to clear store", () => {
    useChatStore.mockReturnValue({
      user: { uuid: "contact-uuid", name: "John Doe" },
      messages: [],
      loading: false,
      error: null,
      fetchChatData: fetchChatDataMock,
      clearError: clearErrorMock,
      reset: resetMock,
    });

    const { unmount } = render(<ChatScreen id="123" />);
    unmount();
    expect(resetMock).toHaveBeenCalled();
  });
});
