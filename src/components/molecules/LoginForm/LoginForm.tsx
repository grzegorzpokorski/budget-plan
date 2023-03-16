import { Button } from "@/components/atoms/Button/Button";
import { FaGithub, FaMoneyCheckAlt, FaSpinner } from "react-icons/fa";

export const LoginForm = () => {
  return (
    <div className="max-w-xs w-full bg-white shadow py-14 px-8 m-auto rounded">
      <div className="flex flex-col items-center">
        <h1 className="font-bold flex flex-row items-center">
          <FaMoneyCheckAlt className="text-2xl mr-2" />
          Budget<span className="font-normal">Plan</span>
        </h1>
        <p className="text-center text-base mt-2">
          Trzymaj swój budżet pod kontrolą.
        </p>
        <div className="mt-5">
          {0 ? (
            <p className="flex flex-row gap-2 items-center text-sm">
              Ładowanie <FaSpinner className="animate-spin" />
            </p>
          ) : (
            <Button>
              Zaloguj się Githubem
              <FaGithub />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
