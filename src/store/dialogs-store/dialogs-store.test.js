import { act } from "react-test-renderer";

import { conversationsService } from "../../api/services/conversations";
import { useDialogsStore } from "./dialogs-store";

jest.mock("../../api/services/conversations", () => ({
  conversationsService: {
    getContacts: jest.fn(),
  },
}));

describe("useDialogsStore", () => {
  beforeEach(() => {
    useDialogsStore.setState({
      dialogs: [],
      page: 1,
      hasMore: true,
      loading: false,
      error: null,
    });
  });

  it("fetches first page of dialogs successfully", async () => {
    const mockData = [{ uuid: "1" }, { uuid: "2" }];
    conversationsService.getContacts.mockResolvedValueOnce(mockData);

    await act(async () => {
      await useDialogsStore.getState().fetchDialogs(false);
    });

    const state = useDialogsStore.getState();
    expect(state.dialogs).toEqual(mockData);
    expect(state.page).toBe(1);
    expect(state.hasMore).toBe(true);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  it("fetches next page and appends dialogs", async () => {
    useDialogsStore.setState({
      dialogs: [{ uuid: "1" }],
      page: 1,
      hasMore: true,
    });

    const newDialogs = [{ uuid: "2" }];
    conversationsService.getContacts.mockResolvedValueOnce(newDialogs);

    await act(async () => {
      await useDialogsStore.getState().fetchDialogs(true);
    });

    const state = useDialogsStore.getState();
    expect(state.dialogs).toEqual([{ uuid: "1" }, { uuid: "2" }]);
    expect(state.page).toBe(2);
    expect(state.hasMore).toBe(true);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  it("does not fetch next page if hasMore is false", async () => {
    useDialogsStore.setState({ hasMore: false, loading: false });

    await act(async () => {
      await useDialogsStore.getState().fetchDialogs(true);
    });

    const state = useDialogsStore.getState();
    expect(state.loading).toBe(false);
  });

  it("sets error and loading false on fetch failure", async () => {
    conversationsService.getContacts.mockRejectedValueOnce(new Error("Oops"));

    await act(async () => {
      await useDialogsStore.getState().fetchDialogs(false);
    });

    const state = useDialogsStore.getState();
    expect(state.error).toBe("Failed to fetch dialogs");
    expect(state.loading).toBe(false);
  });

  it("does nothing if already loading", async () => {
    useDialogsStore.setState({ loading: true });

    await act(async () => {
      await useDialogsStore.getState().fetchDialogs(false);
    });

    const state = useDialogsStore.getState();
    expect(state.loading).toBe(true);
  });
});
