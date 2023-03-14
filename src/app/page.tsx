import { Button } from "@/components/atoms/Button/Button";

export default function Home() {
  return (
    <div className="max-w-2xl mx-auto px-3 mt-24">
      <Button>Dodaj wydatek / przychód</Button>
      <hr className="my-6" />
      <Button size="large">Dodaj wydatek / przychód</Button>
    </div>
  );
}
