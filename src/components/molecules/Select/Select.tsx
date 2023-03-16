"use client";

import { FormInfo } from "@/components/atoms/FormInfo/FormInfo";
import { Label } from "@/components/atoms/Label/Label";
import { ChangeEvent, forwardRef, InputHTMLAttributes, useId } from "react";
import { twMerge } from "tailwind-merge";

type Option = {
  label: string;
  value: string;
};

type Props = {
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  isError: boolean;
  label: string;
  errormessage: string;
  disabled?: boolean;
} & Omit<InputHTMLAttributes<HTMLSelectElement>, "value" | "type">;

export const Select = forwardRef<HTMLSelectElement, Props>(
  (
    { label, required, disabled, options, isError, errormessage, ...rest },
    ref,
  ) => {
    const id = useId();

    return (
      <>
        <Label htmlFor={id}>
          {label}
          {required && <span aria-hidden="true">*</span>}
        </Label>
        <select
          id={id}
          ref={ref}
          required={required}
          disabled={disabled}
          className={twMerge(
            "appearance-none block w-full bg-white text-gray-700 border-2 border-zinc-300 focus:border-blue-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ",
            isError && "border-red-500 focus:border-red-500",
          )}
          aria-describedby={isError ? `${id}-hint` : undefined}
          {...rest}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {isError && (
          <FormInfo
            id={`${id}-hint`}
            content={errormessage}
            error={true}
            withMarginBottom
          />
        )}
      </>
    );
  },
);

Select.displayName = "Select";
