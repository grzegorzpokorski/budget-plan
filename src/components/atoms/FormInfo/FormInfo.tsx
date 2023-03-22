import { twMerge } from "tailwind-merge";

type Props = {
  content: string;
  error: boolean;
  id?: string;
  withMarginBottom?: boolean;
  withMarginTop?: boolean;
  textCenter?: boolean;
};

export const FormInfo = ({
  content,
  error,
  id,
  withMarginBottom,
  withMarginTop,
  textCenter,
}: Props) => (
  <p
    id={id}
    className={twMerge(
      "rounded p-3 text-sm",
      error ? "bg-red-200 text-red-900" : "bg-green-200 text-green-900",
      withMarginBottom && "mb-3",
      withMarginTop && "mt-3",
      textCenter && "text-center",
    )}
  >
    {content}
  </p>
);
