import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { conversationsService } from "../api/services/conversations";

export const useDialogsStore = create()(
  devtools(
    (set, get) => ({
      dialogs: [],
      page: 1,
      hasMore: true,
      loading: false,
      error: null,

      setDialogs: (payload) => set({ dialogs: payload }),

      fetchDialogs: async (isNextPage = false) => {
        const { page, dialogs, loading, hasMore } = get();
        if (loading || (isNextPage && !hasMore)) return;

        set({ loading: true, error: null });

        try {
          const newPage = isNextPage ? page + 1 : 1;
          const fetched = await conversationsService.getContacts({
            page: newPage,
          });

          set({
            dialogs: isNextPage ? [...dialogs, ...fetched] : fetched,
            page: newPage,
            hasMore: fetched.length > 0,
            loading: false,
          });
        } catch {
          set({ error: "Failed to fetch dialogs", loading: false });
        }
      },
    }),
    { name: "DialogsStore" }
  )
);
