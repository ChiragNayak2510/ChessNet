import { create } from 'zustand';

const currentUserStore = (set) => ({
  currentUser: null,
  setCurrentUser: (user) => {
    set({ currentUser: user });
  },
});

const useCurrentUserStore = create(currentUserStore);

export default useCurrentUserStore;
