import { create } from "zustand";

interface MobileSidebarStore {
  isOpen: boolean; // Indicates whether the mobile sidebar is open or not
  onOpen: () => void; // Function to open the mobile sidebar
  onClose: () => void; // Function to close the mobile sidebar
}

export const useMobileSidebar = create<MobileSidebarStore>((set) => ({
  isOpen: false, // Initialize the sidebar as closed by default
  onOpen: () => set({ isOpen: true }), // Define the function to open the mobile sidebar
  onClose: () => set({ isOpen: false }), // Define the function to close the mobile sidebar
}));
