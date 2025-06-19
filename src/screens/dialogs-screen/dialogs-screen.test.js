import { fireEvent, render } from "@testing-library/react-native";
import { useRouter } from "expo-router";
import { Alert } from "react-native";
import { useDialogsStore } from "../../store/dialogs-store/dialogs-store";
import DialogsScreen from "./dialogs-screen";

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("./components/dialog-item/dialog-item", function () {
  const React = require("react");
  const { TouchableOpacity, Text } = require("react-native");

  return {
    DialogItem: ({ item, onClick }) =>
      React.createElement(
        TouchableOpacity,
        {
          testID: `dialog-${item.uuid}`,
          onPress: () => onClick(item.uuid),
        },
        React.createElement(Text, null, `Dialog ${item.uuid}`)
      ),
  };
});

describe("DialogsScreen", () => {
  const push = jest.fn();

  beforeEach(() => {
    useRouter.mockReturnValue({ push });
    jest.spyOn(Alert, "alert").mockImplementation(() => {});
    useDialogsStore.setState({
      dialogs: [],
      loading: false,
      fetchDialogs: jest.fn(),
      hasMore: false,
      error: null,
    });
  });

  it("should call push when dialog item is pressed", () => {
    useDialogsStore.setState({ dialogs: [{ uuid: "42" }] });
    const { getByTestId } = render(<DialogsScreen />);
    fireEvent.press(getByTestId("dialog-42"));
    expect(push).toHaveBeenCalledWith({
      pathname: "/chat",
      params: { contactUUID: "42" },
    });
  });
});
