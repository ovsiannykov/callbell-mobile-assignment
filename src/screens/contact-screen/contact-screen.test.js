import { render, waitFor } from "@testing-library/react-native";
import { useRouter } from "expo-router";
import { Alert } from "react-native";

import { contactsService } from "../../api/services/contacts";
import { ContactScreen } from "./contact-screen";

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../api/services/contacts", () => ({
  contactsService: {
    getContact: jest.fn(),
  },
}));

jest.spyOn(Alert, "alert").mockImplementation(() => {});

describe("ContactScreen", () => {
  const back = jest.fn();

  beforeEach(() => {
    useRouter.mockReturnValue({ back });
    jest.clearAllMocks();
  });

  it("renders loading indicator initially", () => {
    contactsService.getContact.mockReturnValue(new Promise(() => {}));
    const { getByTestId } = render(<ContactScreen id="123" />);
    expect(getByTestId("loading-indicator")).toBeTruthy();
  });

  it("fetches and displays contact data", async () => {
    const contact = {
      uuid: "123",
      name: "John Doe",
      phoneNumber: "1234567890",
      createdAt: "2023-06-19",
      source: "Facebook",
      tags: ["friend", "vip"],
      team: { name: "Support" },
    };
    contactsService.getContact.mockResolvedValue({ contact });

    const { getByText, queryByTestId } = render(<ContactScreen id="123" />);

    await waitFor(() => {
      expect(queryByTestId("loading-indicator")).toBeNull();
    });

    expect(getByText(contact.name)).toBeTruthy();
    expect(getByText(contact.uuid)).toBeTruthy();
    expect(getByText(`Phone: ${contact.phoneNumber}`)).toBeTruthy();
    expect(getByText(`Created at: ${contact.createdAt}`)).toBeTruthy();
    expect(getByText(`Source: ${contact.source}`)).toBeTruthy();
    expect(getByText(`Tags: ${contact.tags.join(", ")}`)).toBeTruthy();
    expect(getByText(`Team: ${contact.team.name}`)).toBeTruthy();
  });

  it("shows alert and navigates back if fetch fails", async () => {
    contactsService.getContact.mockRejectedValue(new Error("Failed to fetch"));

    render(<ContactScreen id="123" />);

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        "Error",
        "Failed to fetch contact data"
      );
      expect(back).toHaveBeenCalled();
    });
  });

  it("shows alert and navigates back if contact is invalid", async () => {
    contactsService.getContact.mockResolvedValue({ contact: { uuid: "" } });

    render(<ContactScreen id="123" />);

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        "Error",
        "Failed to fetch contact data"
      );
      expect(back).toHaveBeenCalled();
    });
  });
});
