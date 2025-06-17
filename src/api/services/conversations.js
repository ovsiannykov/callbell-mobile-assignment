import { ApiClient } from "../client";

const apiClient = ApiClient.getInstance();

export const conversationsService = {
  /**
   * Получение контактов с параметрами
   * @param {Object} params - параметры запроса
   * @returns {Promise<Array>}
   */
  getContacts: async (params = {}) => {
    try {
      const queryParams = new URLSearchParams();

      if (params.page) queryParams.append("page", params.page.toString());
      if (params.source) queryParams.append("source", params.source);
      if (params.tags) queryParams.append("tags", params.tags.join(","));
      if (params.team_uuid) queryParams.append("team_uuid", params.team_uuid);

      const response = await apiClient.get(
        `/contacts?${queryParams.toString()}`
      );
      return response.contacts;
    } catch (error) {
      console.error("Failed to fetch contacts", error);
      throw error;
    }
  },
};
