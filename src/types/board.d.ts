// Interface for the state of the board form
interface BoardFormState {
  errors?: {
    title?: string[];
  };
  message?: string | null;
}
