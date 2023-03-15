import { Button } from "@/components/atoms/Button/Button";
import { Container } from "@/components/atoms/Container/Container";
import {
  FaMoneyCheck,
  FaMoneyCheckAlt,
  FaPlus,
  FaPowerOff,
} from "react-icons/fa";

export const MainHeader = () => {
  return (
    <header className="fixed top-0 left-0 w-full h-16 bg-white flex flex-row">
      <Container className="flex flex-row items-center justify-between">
        <p className="font-bold flex flex-row gap-2 items-center">
          <FaMoneyCheckAlt className="text-2xl" />
          Budget <span className="font-normal">Plan</span>
        </p>
        <div className="flex flex-row gap-2">
          <Button variant="outline">
            <span className="hidden md:inline" aria-hidden="true">
              Nowy wydatek
            </span>
            <span className="sr-only">Nowy wydatek</span>
            <FaPlus />
          </Button>
          <Button variant="outline">
            <span className="hidden md:inline" aria-hidden="true">
              Nowy budżet
            </span>
            <span className="sr-only">Nowy budżet</span>
            <FaMoneyCheck />
          </Button>
          <Button>
            <span className="hidden md:inline" aria-hidden="true">
              Wyloguj
            </span>
            <span className="sr-only">Wyloguj</span>
            <FaPowerOff />
          </Button>
        </div>
      </Container>
    </header>
  );
};
