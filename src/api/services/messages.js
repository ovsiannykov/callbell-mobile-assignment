import { ApiClient } from "../client";

const apiClient = ApiClient.getInstance();

export const messagesService = {
  /**
   * Get messages for a conversation/contact
   * @param {string} contactUUID
   * @returns {Promise<Array>}
   */
  getMessages: async (contactUUID) => {
    try {
      const response = await apiClient.get(`/contacts/${contactUUID}/messages`);
      return response;
    } catch (error) {
      console.error(
        `Failed to fetch messages for contact ${contactUUID}`,
        error
      );
      throw error;
    }
  },
};
