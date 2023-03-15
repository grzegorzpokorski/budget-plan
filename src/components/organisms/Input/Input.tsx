"use client";

import { ChangeEvent, forwardRef, InputHTMLAttributes, useId } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type: "text" | "number";
  isError: boolean;
  label: string;
  errormessage: string;
  disabled?: boolean;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "type">;

export const Input = forwardRef<HTMLInputElement, Props>(
  (
    { label, type, required, disabled, isError, errormessage, ...rest },
    ref,
  ) => {
    const id = useId();

    return (
      <>
        <label
          htmlFor={id}
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        >
          {label}
        </label>
        <input
          id={id}
          ref={ref}
          type={type}
          required={required}
          disabled={disabled}
          className={twMerge(
            "appearance-none block w-full bg-white text-gray-700 border-2 border-zinc-300 focus:border-blue-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ",
            isError && "border-red-500 focus:border-red-500",
          )}
          aria-describedby={isError ? `${id}-hint` : undefined}
          {...rest}
        />
        <p
          id={`${id}-hint`}
          className="block tracking-wide text-red-500 text-xs font-bold mb-3"
        >
          {errormessage}
        </p>
      </>
    );
  },
);

Input.displayName = "Input";
