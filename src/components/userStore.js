import axios from "axios";
import { create } from "zustand";

const useUserStore = create((set, get) => ({
  user: null,
  userId: "",
  userAPIKey: "",
  setUserId: (id) => set({ userId: id }),
  setUserAPIKey: (key) => set({ userAPIKey: key }),
  setUser: (user) => set({ user }),
  fetchUser: async (userId) => {
    try {
      const response = await axios.get(
        `https://fyp.roushan.me/api/v1/apikey/getUser/${userId}`
      );
      set({ user: response.data.data });
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  },
  decrementCredits: async (userId) => {
    try {
      const response = await axios.post(
        "https://fyp.roushan.me/api/v1/apikey/decrement-credits",
        { userId }
      );

      // Given the response structure, it's better to fetch the user again
      if (response.data.success) {
        await get().fetchUser(userId);
      } else {
        console.error("Error decrementing credits:", response.data.message);
      }
    } catch (error) {
      console.error("Error decrementing credits:", error);
    }
  },
}));

export default useUserStore;
