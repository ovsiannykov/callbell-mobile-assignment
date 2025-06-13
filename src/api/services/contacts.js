import { ApiClient } from "../client";

const apiClient = ApiClient.getInstance();

export const contactsService = {
  /**
   * Get contact details
   * @param {string} contactUUID
   * @returns {Promise<Object>}
   */
  getContact: async (contactUUID) => {
    try {
      const response = await apiClient.get(`/contacts/${contactUUID}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update contact details
   * @param {string} contactUUID
   * @param {Object} data
   * @returns {Promise<Object>}
   */
  updateContact: async (contactUUID, data) => {
    try {
      const response = await apiClient.patch(`/contacts/${contactUUID}`, data);
      return response;
    } catch (error) {
      throw error;
    }
  },
};
