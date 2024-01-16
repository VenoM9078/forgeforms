import { create } from "zustand";
import axiosInstance from "./api/axiosInstance";

const useUserStore = create((set, get) => ({
  user: null,
  userId: "",
  setUserId: (id) => set({ userId: id }),
  setUser: (user) => set({ user }),
  fetchUser: async (userId) => {
    try {
      const response = await axiosInstance.get(`/apikey/getUser/${userId}`);
      set({ user: response.data.data });
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  },
  hasReviewed: () => {
    return document.cookie
      .split(";")
      .some((item) => item.trim().startsWith("reviewed_text_2_sql=true"));
  },
}));

export default useUserStore;
