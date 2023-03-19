"use client";

import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { budgetFormSchema } from "@/shemas/forms";
import { Modal } from "@/components/molecules/Modal/Modal";
import { Button } from "@/components/atoms/Button/Button";
import { Input } from "@/components/molecules/Input/Input";
import { FormInfo } from "@/components/atoms/FormInfo/FormInfo";
import { useBudgetModal } from "@/hooks/useBudgetModal";

type InputsType = z.infer<typeof budgetFormSchema>;

export const BudgetModal = () => {
  const {
    isOpen,
    closeModal,
    modalData,
    create,
    resetQueries,
    remove,
    update,
  } = useBudgetModal();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsType>({
    resolver: zodResolver(budgetFormSchema),
  });

  const onCloseModal = () => {
    closeModal();
    reset();
    resetQueries();
  };

  const onAfterSubmitForm = () => {
    reset();
    resetQueries();
  };

  const onSubmit: SubmitHandler<InputsType> = (data) => {
    console.log(data);
    if (modalData) {
      update({ id: modalData.id, budget: data });
      onAfterSubmitForm();
      return;
    }

    create({ budget: data });
    onAfterSubmitForm();
  };

  if (!isOpen) return null;

  return (
    <Modal
      title={modalData ? "Edytuj budżet" : "Dodaj nowy budżet"}
      closeModal={onCloseModal}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col pt-6">
        <fieldset>
          <div className="w-full">
            <Input
              type="text"
              label="Nazwa budżetu"
              {...register("name")}
              isError={Boolean(errors.name)}
              errormessage={errors.name?.message || ""}
              required
              defaultValue={modalData?.name}
            />
          </div>
          <div className="w-full">
            <Input
              type="number"
              label="Docelowa wartość"
              {...register("maxAmount")}
              isError={Boolean(errors.maxAmount)}
              errormessage={errors.maxAmount?.message || ""}
              required
              step={0.01}
              min={0.01}
              defaultValue={modalData?.maxAmount}
            />
          </div>
          <div className="flex flex-row gap-2 justify-end">
            {modalData ? (
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => {
                  remove({ id: modalData.id });
                  onAfterSubmitForm();
                }}
              >
                Usuń
              </Button>
            ) : (
              <Button type="reset" variant="outline" className="w-full">
                Reset
              </Button>
            )}
            <Button type="submit" className="w-full">
              {modalData ? "Aktualizuj" : "Dodaj"}
            </Button>
          </div>
        </fieldset>
        {/* <FormInfo
          content="Wystąpił nieoczekiwany błąd. Spróbuj ponownie póżniej."
          error={true}
          textCenter
        /> */}
      </form>
    </Modal>
  );
};
