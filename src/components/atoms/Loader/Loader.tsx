import { FaSpinner } from "react-icons/fa";

export const Loader = () => (
  <span
    role="status"
    className="flex flex-row items-center justify-center gap-2 mt-3 h-9"
  >
    Ładowanie <FaSpinner className="animate-spin" />
  </span>
);
