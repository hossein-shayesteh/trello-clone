import { create } from "zustand";

interface CardModalStore {
  id?: string;
  isOpen: boolean; // Indicates whether the Card modal is open or not
  onOpen: (id: string) => void; // Function to open the modal
  onClose: () => void; // Function to close the modal
}

export const useCardModal = create<CardModalStore>((set) => ({
  id: undefined,
  isOpen: false, // Initialize the sidebar as closed by default
  onOpen: (id: string) => set({ isOpen: true, id }), // Define the function to open the modal
  onClose: () => set({ isOpen: false, id: undefined }), // Define the function to close the modal
}));
