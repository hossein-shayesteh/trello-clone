import { XCircle } from "lucide-react";

interface FormErrorsProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
}

const FormErrors = ({ id, errors }: FormErrorsProps) => {
  // Return null if there are no errors to display
  if (!errors) return null;

  return (
    // Container for the error messages, with ARIA attribute for accessibility
    <div
      id={`${id}-error`}
      aria-live={"polite"}
      className={"mt-2 text-xs text-rose-500"} // Styling for the error messages container
    >
      {/* Map over the errors for the specific field and render each error */}
      {errors?.[id]?.map((error) => (
        <div
          key={error}
          className={
            "flex items-center rounded-sm border border-rose-500 bg-rose-500/10 p-2 font-medium" // Styling for each error message
          }
        >
          <XCircle className={"mr-2 h-4 w-4"} /> {error}
        </div>
      ))}
    </div>
  );
};

export default FormErrors;
