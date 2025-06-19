import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { contactsService } from "../../api/services/contacts";
import { messagesService } from "../../api/services/messages";

export const useChatStore = create()(
  devtools(
    (set, get) => ({
      user: null,
      messages: [],
      loading: false,
      error: null,

      fetchChatData: async (id) => {
        if (get().loading) return;

        set({ loading: true, error: null });
        try {
          const contactData = await contactsService.getContact(id);
          if (!contactData?.contact?.uuid) throw new Error("Contact not found");

          const contact = contactData.contact;
          const messagesData = await messagesService.getMessages(contact.uuid);
          if (!messagesData) throw new Error("Messages not found");

          set({
            user: contact,
            messages: messagesData.messages || [],
            loading: false,
          });
        } catch (e) {
          set({ error: e.message || "Unknown error", loading: false });
        }
      },

      clearError: () => set({ error: null }),

      reset: () =>
        set({
          user: null,
          messages: [],
          loading: false,
          error: null,
        }),
    }),
    { name: "ChatStore" }
  )
);
