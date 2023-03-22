import { twMerge } from "tailwind-merge";

export const Divider = () => (
  <div
    className={twMerge(
      "relative flex flex-row items-center text-center text-gray-400 text-sm py-2",
      "before:content-[''] before:flex-1 before:border-b-[1px] before:border-gray-300 before:mr-3",
      "after:content-[''] after:flex-1 after:border-b-[1px] after:border-gray-300 after:ml-3",
    )}
    role="separator"
  >
    lub
  </div>
);
