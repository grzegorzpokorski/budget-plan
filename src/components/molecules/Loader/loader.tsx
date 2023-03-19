import { FaSpinner } from "react-icons/fa";

export const Loader = () => (
  <div role="status" className="flex flex-row items-center justify-center">
    <FaSpinner className="animate-spin" />
  </div>
);
