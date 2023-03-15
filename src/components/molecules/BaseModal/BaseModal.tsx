"use client";

import { Button } from "@/components/atoms/Button/Button";
import { ReactNode, useId } from "react";
import { FaPlus } from "react-icons/fa";

type Props = {
  title: string;
  closeModal: () => void;
  readonly children: ReactNode;
};

export const BaseModal = ({ title, children, closeModal }: Props) => {
  const id = useId();

  return (
    <div
      id={id}
      role="dialog"
      className="fixed top-0 left-0 h-full w-full p-3 z-50 overflow-y-auto bg-black/60 animate-[opacity_.15s_ease-in-out]"
      onClick={() => closeModal()}
      aria-modal
      aria-labelledby={`${id}-title`}
    >
      <div className="m-auto flex min-h-full w-full items-center">
        <div
          className="relative flex flex-col p-6 mx-auto max-w-xl w-full bg-white rounded-md overflow-auto shadow-lg animate-[scale_.15s_ease-in-out]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-row justify-between border-b-2 pb-3 mb-3">
            <h2 id={`${id}-title`} className="font-bold text-lg mt-1">
              {title}
            </h2>
            <Button
              size="square"
              className="self-start"
              onClick={() => closeModal()}
            >
              <span className="sr-only">zamnij modal</span>
              <FaPlus className="rotate-45" />
            </Button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};
