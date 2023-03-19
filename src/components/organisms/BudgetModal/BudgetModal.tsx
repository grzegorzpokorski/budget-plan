"use client";

import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { budgetFormSchema } from "@/shemas/forms";
import { Modal } from "@/components/molecules/Modal/Modal";
import { Button } from "@/components/atoms/Button/Button";
import { Input } from "@/components/molecules/Input/Input";
import { FormInfo } from "@/components/atoms/FormInfo/FormInfo";
import { Loader } from "@/components/molecules/Loader/loader";
import { useBudgetModal } from "@/hooks/useBudgetModal";
import { useCreateBudget } from "@/hooks/useCreateBudget";
import { useUpdateBudget } from "@/hooks/useUpdateBudget";
import { useDeleteBudget } from "@/hooks/useDeleteBudget";

type InputsType = z.infer<typeof budgetFormSchema>;

export const BudgetModal = () => {
  const {
    modalData,
    closeModal,
    success,
    setSuccessMessage,
    error,
    setErrorMessage,
    loading,
    setLoading,
  } = useBudgetModal();

  const createBudget = useCreateBudget();
  const updateBudget = useUpdateBudget();
  const deleteBudget = useDeleteBudget();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsType>({
    resolver: zodResolver(budgetFormSchema),
  });

  const onSubmit: SubmitHandler<InputsType> = (data) => {
    setLoading(true);

    if (!modalData) {
      createBudget.mutate(
        { budget: data },
        {
          onSuccess: () => {
            setSuccessMessage(`Pomyślnie dodano nowy budżet: "${data.name}"`);
          },
          onError: () => {
            setErrorMessage(
              `Coś poszło nie tak. Spróbuj ponownie póżniej. Upewnij się, czy podany budżet już nie istnieje.`,
            );
          },
          onSettled: () => setLoading(false),
        },
      );
    }

    if (modalData) {
      updateBudget.mutate(
        { id: modalData.id, budget: data },
        {
          onSuccess: () => {
            setSuccessMessage(`Pomyślnie zaktualizowano budżet.`);
          },
          onError: () => {
            setErrorMessage(`Coś poszło nie tak. Spróbuj ponownie póżniej.`);
          },
          onSettled: () => setLoading(false),
        },
      );
    }
  };

  return (
    <Modal
      title={modalData ? "Edytuj budżet" : "Dodaj nowy budżet"}
      closeModal={closeModal}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col pt-6">
        <fieldset disabled={Boolean(error) || Boolean(success)}>
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
                  const confirmed = confirm(
                    `Usunięcie budżetu spowoduje również usunięcie powiązanych z nim wydatków. Czy potwierdzasz usunięcie budżetu ${modalData.name}?`,
                  );

                  if (!confirmed) return;

                  setLoading(true);
                  deleteBudget.mutate(
                    { id: modalData.id },
                    {
                      onSuccess: () => {
                        setSuccessMessage(
                          `Pomyślnie usunięto budżet "${modalData.name}"`,
                        );
                      },
                      onError: () => {
                        setErrorMessage(
                          `Coś poszło nie tak. Spróbuj ponownie póżniej.`,
                        );
                      },
                      onSettled: () => setLoading(false),
                    },
                  );
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
        {success && <FormInfo content={success} error={false} />}
        {error && <FormInfo content={error} error={true} />}
        {loading && (
          <div className="mt-4">
            <Loader />
          </div>
        )}
      </form>
    </Modal>
  );
};
