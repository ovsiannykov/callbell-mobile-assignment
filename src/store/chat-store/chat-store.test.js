import { act } from "@testing-library/react-native";
import { contactsService } from "../../api/services/contacts";
import { messagesService } from "../../api/services/messages";
import { useChatStore } from "./chat-store";

jest.mock("../../api/services/contacts");
jest.mock("../../api/services/messages");

describe("useChatStore", () => {
  beforeEach(() => {
    useChatStore.getState().reset();
    jest.clearAllMocks();
  });

  it("initializes with correct default state", () => {
    const state = useChatStore.getState();
    expect(state.user).toBeNull();
    expect(state.messages).toEqual([]);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  it("successfully loads chat data", async () => {
    const mockContact = { uuid: "contact-1", name: "John Doe" };
    const mockMessages = [{ uuid: "msg-1", text: "Hello" }];

    contactsService.getContact.mockResolvedValue({ contact: mockContact });
    messagesService.getMessages.mockResolvedValue({ messages: mockMessages });

    await act(async () => {
      await useChatStore.getState().fetchChatData("contact-1");
    });

    const state = useChatStore.getState();
    expect(state.user).toEqual(mockContact);
    expect(state.messages).toEqual(mockMessages);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  it("sets error if contact not found", async () => {
    contactsService.getContact.mockResolvedValue({ contact: null });

    await act(async () => {
      await useChatStore.getState().fetchChatData("invalid-id");
    });

    const state = useChatStore.getState();
    expect(state.user).toBeNull();
    expect(state.messages).toEqual([]);
    expect(state.loading).toBe(false);
    expect(state.error).toBe("Contact not found");
  });

  it("sets error if messages not found", async () => {
    const mockContact = { uuid: "contact-1", name: "John Doe" };

    contactsService.getContact.mockResolvedValue({ contact: mockContact });
    messagesService.getMessages.mockResolvedValue(null);

    await act(async () => {
      await useChatStore.getState().fetchChatData("contact-1");
    });

    const state = useChatStore.getState();
    expect(state.user).toBeNull();
    expect(state.messages).toEqual([]);
    expect(state.loading).toBe(false);
    expect(state.error).toBe("Messages not found");
  });

  it("does not fetch if already loading", async () => {
    useChatStore.setState({ loading: true });

    await act(async () => {
      await useChatStore.getState().fetchChatData("contact-1");
    });

    expect(contactsService.getContact).not.toHaveBeenCalled();
    expect(messagesService.getMessages).not.toHaveBeenCalled();
  });

  it("clears error with clearError", () => {
    useChatStore.setState({ error: "Some error" });
    useChatStore.getState().clearError();
    expect(useChatStore.getState().error).toBeNull();
  });

  it("resets state with reset", () => {
    useChatStore.setState({
      user: { uuid: "contact-1", name: "John" },
      messages: [{ uuid: "msg-1", text: "hi" }],
      loading: true,
      error: "Error",
    });

    useChatStore.getState().reset();

    const state = useChatStore.getState();
    expect(state.user).toBeNull();
    expect(state.messages).toEqual([]);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });
});
