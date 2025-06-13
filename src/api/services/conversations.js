import { ApiClient } from "../client";

const apiClient = ApiClient.getInstance();

export const conversationsService = {
  /**
   * Get list of conversations
   * @returns {Promise<Array>}
   */
  getConversations: async () => {
    try {
      const response = await apiClient.get("/conversations");
      return response;
    } catch (error) {
      console.error("Failed to fetch conversations", error);
      throw error;
    }
  },
};
