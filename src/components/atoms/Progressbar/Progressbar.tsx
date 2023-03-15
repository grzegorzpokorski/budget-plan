import { twMerge } from "tailwind-merge";

export const Progressbar = ({ progress }) => {
  return (
    <div
      className={twMerge(
        "my-2 w-full bg-transparent border-2 rounded",
        progress > 100 ? "border-red-500" : "border-blue-500",
      )}
    >
      <div
        className={twMerge(
          "h-2",
          progress > 100 ? "bg-red-500" : "bg-blue-500",
        )}
        style={{ width: `${progress > 100 ? 100 : progress}%` }}
      ></div>
    </div>
  );
};
