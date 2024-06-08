import { create } from "zustand";

interface ProModalStore {
  isOpen: boolean; // Indicates whether the Pro modal is open or not
  onOpen: () => void; // Function to open the modal
  onClose: () => void; // Function to close the modal
}

export const useProModal = create<ProModalStore>((set) => ({
  isOpen: false, // Initialize the modal as closed by default
  onOpen: () => set({ isOpen: true }), // Define the function to open the modal
  onClose: () => set({ isOpen: false }), // Define the function to close the modal
}));
